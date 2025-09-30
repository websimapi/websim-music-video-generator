import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useRef, useEffect } from "react";
import { TrackingRecorder } from "../tracking.js";
import { drawCountdown } from "../utils/countdown.js";
import { formatTime } from "../utils/time.js";
const RecordingSection = ({
  audioFile,
  audioUrl,
  audioRef,
  videoDuration,
  trackingData,
  onRecordingComplete,
  settings
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [status, setStatus] = useState("");
  const [countdownDuration, setCountdownDuration] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recorderRef = useRef(null);
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1e3);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  const startRecording = async () => {
    if (!audioFile) return;
    try {
      setStatus("Starting camera and tracking...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      videoRef.current.srcObject = stream;
      await new Promise((resolve) => {
        const handleMetadata = () => {
          videoRef.current.removeEventListener("loadedmetadata", handleMetadata);
          resolve();
        };
        videoRef.current.addEventListener("loadedmetadata", handleMetadata);
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay prevented:", err);
          resolve();
        });
      });
      recorderRef.current = new TrackingRecorder(
        videoRef.current,
        canvasRef.current
      );
      await recorderRef.current.initialize();
      if (countdownDuration > 0) {
        setIsCountingDown(true);
        setStatus(`Get ready! Recording starts in ${countdownDuration} seconds...`);
        let currentCount = countdownDuration;
        const countdownLoop = new Promise((resolve) => {
          let frameHandle;
          let currentDisplayCount = countdownDuration;
          const drawLoop = () => {
            if (videoRef.current.paused || videoRef.current.ended) {
              return;
            }
            drawCountdown(canvasRef.current, videoRef.current, currentDisplayCount);
            frameHandle = requestAnimationFrame(drawLoop);
          };
          drawLoop();
          const interval = setInterval(() => {
            if (currentCount > 0) {
              currentCount--;
              currentDisplayCount = currentCount;
            } else {
              clearInterval(interval);
              cancelAnimationFrame(frameHandle);
              currentDisplayCount = 0;
              drawCountdown(canvasRef.current, videoRef.current, 0);
              setTimeout(() => {
                const ctx = canvasRef.current.getContext("2d");
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                resolve();
              }, 500);
            }
          }, 1e3);
        });
        await countdownLoop;
        setIsCountingDown(false);
      }
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      }
      recorderRef.current.startRecording();
      setIsRecording(true);
      setStatus("Recording... Dance to the music!");
      setTimeout(() => {
        if (recorderRef.current?.isRecording) {
          stopRecording();
        }
      }, videoDuration * 1e3);
    } catch (error) {
      console.error("Error starting recording:", error);
      setStatus("Error: " + error.message);
      setIsCountingDown(false);
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };
  const stopRecording = async () => {
    try {
      setStatus("Processing tracking data...");
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const { trackingData: data, videoBlob: blob } = await recorderRef.current.stopRecording();
      setStatus("Uploading video...");
      const url = await websim.upload(blob);
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
      setStatus("Video ready!");
      onRecordingComplete(data, url);
    } catch (error) {
      console.error("Error stopping recording:", error);
      setStatus("Error: " + error.message);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: `step-container ${!audioFile ? "disabled" : ""}`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "3" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 172,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Record Your Dance" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 173,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 171,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "video-container", children: [
      /* @__PURE__ */ jsxDEV("video", { ref: videoRef, muted: true, playsInline: true }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 177,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 178,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 176,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "recording-controls", children: !isRecording && !isCountingDown ? /* @__PURE__ */ jsxDEV(
      "button",
      {
        className: "record-btn",
        onClick: startRecording,
        disabled: !audioFile || trackingData,
        children: [
          /* @__PURE__ */ jsxDEV("span", { children: "\u25CF" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 188,
            columnNumber: 13
          }),
          " Start Recording"
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 183,
        columnNumber: 11
      }
    ) : /* @__PURE__ */ jsxDEV("button", { className: "stop-btn", onClick: stopRecording, disabled: isCountingDown, children: "\u25A0 Stop Recording" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 191,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 181,
      columnNumber: 7
    }),
    isRecording && /* @__PURE__ */ jsxDEV("div", { className: "recording-info", children: [
      "Recording: ",
      formatTime(recordingTime),
      " / ",
      formatTime(videoDuration)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 198,
      columnNumber: 9
    }),
    status && /* @__PURE__ */ jsxDEV("div", { className: "status-message", children: status }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 204,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 170,
    columnNumber: 5
  });
};
export {
  RecordingSection
};
