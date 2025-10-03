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
  const [isInitializing, setIsInitializing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recorderRef = useRef(null);
  const previewLoopRef = useRef(null);
  const containerRef = useRef(null);
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
      setIsInitializing(true);
      setStatus("Starting camera...");
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
      setStatus("Initializing tracking systems...");
      recorderRef.current = new TrackingRecorder(
        videoRef.current,
        canvasRef.current
      );
      await recorderRef.current.initialize(settings);
      setStatus("Ready! Starting preview...");
      setIsInitializing(false);
      try {
        const el = containerRef.current;
        if (el?.requestFullscreen) await el.requestFullscreen();
        if (screen.orientation?.lock) await screen.orientation.lock("portrait");
      } catch (e) {
      }
      if (countdownDuration > 0) {
        setIsCountingDown(true);
        setStatus(`Get ready! Recording starts in ${countdownDuration} seconds...`);
        let currentCount = countdownDuration;
        const countdownInterval = setInterval(() => {
          drawCountdown(canvasRef.current, videoRef.current, currentCount);
          if (currentCount === 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
              setIsCountingDown(false);
              startActualRecording();
            }, 500);
          }
          currentCount--;
        }, 1e3);
        drawCountdown(canvasRef.current, videoRef.current, countdownDuration);
      } else {
        startActualRecording();
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      setStatus("Error: " + error.message);
      setIsCountingDown(false);
      setIsInitializing(false);
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };
  const startActualRecording = async () => {
    recorderRef.current.lastTimestamp = -1;
    recorderRef.current.baseTimestamp = performance.now();
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
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        if (screen.orientation?.unlock) screen.orientation.unlock();
      } catch (e) {
      }
      onRecordingComplete(data, url);
    } catch (error) {
      console.error("Error stopping recording:", error);
      setStatus("Error: " + error.message);
    }
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      ref: containerRef,
      className: `step-container ${!audioFile ? "disabled" : ""} ${isRecording || isCountingDown || isInitializing ? "fullscreen-mode" : ""}`,
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "3" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 189,
            columnNumber: 9
          }),
          /* @__PURE__ */ jsxDEV("h2", { children: "Record Your Dance" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 190,
            columnNumber: 9
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 188,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "video-container", children: [
          /* @__PURE__ */ jsxDEV("video", { ref: videoRef, muted: true, playsInline: true }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 194,
            columnNumber: 9
          }),
          /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 195,
            columnNumber: 9
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 193,
          columnNumber: 7
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "recording-controls", children: !isRecording && !isCountingDown && !isInitializing ? /* @__PURE__ */ jsxDEV(
          "button",
          {
            className: "record-btn",
            onClick: startRecording,
            disabled: !audioFile || trackingData,
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: "\u25CF" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 205,
                columnNumber: 13
              }),
              " Start Recording"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 200,
            columnNumber: 11
          }
        ) : /* @__PURE__ */ jsxDEV("button", { className: "stop-btn", onClick: stopRecording, disabled: isCountingDown || isInitializing, children: "\u25A0 Stop Recording" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 208,
          columnNumber: 11
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 7
        }),
        isRecording && /* @__PURE__ */ jsxDEV("div", { className: "recording-info", children: [
          "Recording: ",
          formatTime(recordingTime),
          " / ",
          formatTime(videoDuration)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 215,
          columnNumber: 9
        }),
        status && /* @__PURE__ */ jsxDEV("div", { className: "status-message", children: status }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 221,
          columnNumber: 9
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 184,
      columnNumber: 5
    }
  );
};
export {
  RecordingSection
};
