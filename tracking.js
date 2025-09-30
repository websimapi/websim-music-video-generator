import { PoseLandmarker, FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export class TrackingRecorder {
  constructor(videoElement, canvasElement) {
    this.video = videoElement;
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.poseLandmarker = null;
    this.faceLandmarker = null;
    this.isRecording = false;
    this.trackingData = [];
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.startTime = null;
  }

  async initialize() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numPoses: 1
    });

    this.faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numFaces: 1
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

    // Setup video recording
    const stream = this.canvas.captureStream(30);
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
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

    const timestamp = performance.now() - this.startTime;

    // Draw video frame
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    // Detect pose
    const poseResults = this.poseLandmarker.detectForVideo(this.video, timestamp);
    
    // Detect face
    const faceResults = this.faceLandmarker.detectForVideo(this.video, timestamp);

    // Store tracking data
    this.trackingData.push({
      timestamp,
      pose: poseResults.landmarks?.[0] || null,
      face: faceResults.faceLandmarks?.[0] || null,
      faceBlendshapes: faceResults.faceBlendshapes?.[0] || null
    });

    // Draw landmarks
    this.drawLandmarks(poseResults, faceResults);

    requestAnimationFrame(() => this.processFrame());
  }

  drawLandmarks(poseResults, faceResults) {
    // Draw pose landmarks
    if (poseResults.landmarks?.[0]) {
      const landmarks = poseResults.landmarks[0];
      
      this.ctx.fillStyle = '#00ff00';
      landmarks.forEach(landmark => {
        const x = landmark.x * this.canvas.width;
        const y = landmark.y * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
      });

      // Draw connections
      this.ctx.strokeStyle = '#00ff00';
      this.ctx.lineWidth = 2;
      const connections = [
        [11, 13], [13, 15], [12, 14], [14, 16], // Arms
        [11, 12], [11, 23], [12, 24], [23, 24], // Torso
        [23, 25], [25, 27], [24, 26], [26, 28]  // Legs
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

    // Draw face landmarks
    if (faceResults.faceLandmarks?.[0]) {
      this.ctx.fillStyle = '#ff00ff';
      faceResults.faceLandmarks[0].forEach(landmark => {
        const x = landmark.x * this.canvas.width;
        const y = landmark.y * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this.ctx.fill();
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

