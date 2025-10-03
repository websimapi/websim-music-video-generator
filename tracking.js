import { PoseLandmarker, FaceLandmarker, HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export class TrackingRecorder {
  constructor(videoElement, canvasElement) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.poseLandmarker = null;
    this.faceLandmarker = null;
    this.handLandmarker = null;
    this.isRecording = false;
    this.trackingData = [];
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.startTime = null;
    this.settings = {};
    this.lastTimestamp = -1;
    this.baseTimestamp = 0;
    this.lastPose = null; this.lastFace = null; this.lastHands = [];
  }

  async initialize(settings = {}) {
    this.settings = settings;
    this.lastTimestamp = -1;
    this.baseTimestamp = performance.now();
    
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    // Use the more accurate Heavy model instead of Lite
    this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/1/pose_landmarker_heavy.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numPoses: 1,
      minPoseDetectionConfidence: 0.5,
      minPosePresenceConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numFaces: 1,
      minFaceDetectionConfidence: 0.5,
      minFacePresenceConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    // Add hand tracking
    this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numHands: 2,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    // Setup canvas
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
  }

  startRecording() {
    this.isRecording = true;
    this.trackingData = [];
    this.recordedChunks = [];
    this.startTime = performance.now();
    this.lastTimestamp = -1;
    this.baseTimestamp = performance.now();

    // Setup video recording
    const stream = this.canvas.captureStream(30);
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8',
      videoBitsPerSecond: 2500000
    });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.start();
    this.processFrame();
  }

  async processFrame() {
    if (!this.isRecording) return;

    const timestamp = this.video.currentTime * 1000;
    
    // Ensure monotonically increasing timestamps
    if (timestamp <= this.lastTimestamp) {
      requestAnimationFrame(() => this.processFrame());
      return;
    }
    this.lastTimestamp = timestamp;

    // Draw video frame first
    if (this.canvas.width !== this.video.videoWidth || this.canvas.height !== this.video.videoHeight) {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
    }
    
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    const poseResults = this.poseLandmarker.detectForVideo(this.video, timestamp);
    const faceResults = this.faceLandmarker.detectForVideo(this.video, timestamp);
    const handResults = this.handLandmarker.detectForVideo(this.video, timestamp);

    const pose = poseResults.landmarks?.[0] ?? this.lastPose ?? null;
    const face = faceResults.faceLandmarks?.[0] ?? this.lastFace ?? null;
    const hands = handResults.landmarks?.length ? handResults.landmarks : (this.lastHands ?? []);
    this.lastPose = pose; this.lastFace = face; this.lastHands = hands;
    this.trackingData.push({ timestamp, pose, face, faceBlendshapes: faceResults.faceBlendshapes?.[0] || null, hands });

    // Draw landmarks based on settings
    this.drawLandmarks(poseResults, faceResults, handResults);

    requestAnimationFrame(() => this.processFrame());
  }

  drawLandmarks(poseResults, faceResults, handResults) {
    // Draw pose landmarks if enabled
    if (this.settings.showPoseTracking && poseResults.landmarks?.[0]) {
      const landmarks = poseResults.landmarks[0];
      
      this.ctx.fillStyle = '#00ff00';
      this.ctx.strokeStyle = '#00ff00';
      this.ctx.lineWidth = 4;
      
      // Draw all landmarks with larger visibility
      landmarks.forEach(landmark => {
        const x = landmark.x * this.canvas.width;
        const y = landmark.y * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 8, 0, 2 * Math.PI);
        this.ctx.fill();
      });

      // Draw connections with improved visibility
      const connections = [
        [11, 13], [13, 15], [12, 14], [14, 16], // Arms
        [15, 17], [15, 19], [15, 21], // Left hand
        [16, 18], [16, 20], [16, 22], // Right hand
        [11, 12], [11, 23], [12, 24], [23, 24], // Torso
        [23, 25], [25, 27], [27, 29], [29, 31], // Left leg
        [24, 26], [26, 28], [28, 30], [30, 32]  // Right leg
      ];
      
      connections.forEach(([i, j]) => {
        const p1 = landmarks[i];
        const p2 = landmarks[j];
        if (p1 && p2) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x * this.canvas.width, p1.y * this.canvas.height);
          this.ctx.lineTo(p2.x * this.canvas.width, p2.y * this.canvas.height);
          this.ctx.stroke();
        }
      });
    }

    // Draw face landmarks if enabled
    if (this.settings.showFaceTracking && faceResults.faceLandmarks?.[0]) {
      this.ctx.fillStyle = '#ff00ff';
      faceResults.faceLandmarks[0].forEach(landmark => {
        const x = landmark.x * this.canvas.width;
        const y = landmark.y * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
        this.ctx.fill();
      });
    }

    // Draw hand landmarks if enabled
    if (this.settings.showHandTracking && handResults.landmarks) {
      this.ctx.fillStyle = '#ffff00';
      this.ctx.strokeStyle = '#ffff00';
      this.ctx.lineWidth = 3;
      
      handResults.landmarks.forEach(hand => {
        // Draw hand connections
        const connections = [
          [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
          [0, 5], [5, 6], [6, 7], [7, 8], // Index
          [0, 9], [9, 10], [10, 11], [11, 12], // Middle
          [0, 13], [13, 14], [14, 15], [15, 16], // Ring
          [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
          [5, 9], [9, 13], [13, 17] // Palm
        ];
        
        connections.forEach(([i, j]) => {
          const p1 = hand[i];
          const p2 = hand[j];
          if (p1 && p2) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x * this.canvas.width, p1.y * this.canvas.height);
            this.ctx.lineTo(p2.x * this.canvas.width, p2.y * this.canvas.height);
            this.ctx.stroke();
          }
        });
        
        // Draw landmarks
        hand.forEach(landmark => {
          const x = landmark.x * this.canvas.width;
          const y = landmark.y * this.canvas.height;
          this.ctx.beginPath();
          this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
          this.ctx.fill();
        });
      });
    }
  }

  async stopRecording() {
    this.isRecording = false;

    return new Promise((resolve) => {
      this.mediaRecorder.onstop = () => {
        const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
        resolve({
          trackingData: this.trackingData,
          videoBlob
        });
      };

      this.mediaRecorder.stop();
    });
  }
}