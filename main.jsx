import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { MusicVideoComposition } from "./composition.jsx";
import { TrackingRecorder } from "./tracking.js";
const App = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [trackingData, setTrackingData] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [status, setStatus] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recorderRef = useRef(null);
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      setAudioUrl(url);
      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        setVideoDuration(Math.ceil(audio.duration));
      });
    }
  }, [audioFile]);
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
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };
  const startRecording = async () => {
    try {
      setStatus("Starting camera and tracking...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      recorderRef.current = new TrackingRecorder(
        videoRef.current,
        canvasRef.current
      );
      await recorderRef.current.initialize();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      }
      recorderRef.current.startRecording();
      setIsRecording(true);
      setStatus("Recording... Dance to the music!");
      setTimeout(() => {
        if (isRecording) {
          stopRecording();
        }
      }, videoDuration * 1e3);
    } catch (error) {
      console.error("Error starting recording:", error);
      setStatus("Error: " + error.message);
    }
  };
  const stopRecording = async () => {
    try {
      setStatus("Processing tracking data...");
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const { trackingData: data, videoBlob: blob } = await recorderRef.current.stopRecording();
      setTrackingData(data);
      setVideoBlob(blob);
      setStatus("Uploading video...");
      const url = await websim.upload(blob);
      setVideoUrl(url);
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
      setStatus("Video ready!");
    } catch (error) {
      console.error("Error stopping recording:", error);
      setStatus("Error: " + error.message);
    }
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "header", children: [
      /* @__PURE__ */ jsxDEV("h1", { children: "Music Video Generator" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 137,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Upload music, record yourself dancing, get an AI-enhanced music video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 138,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 136,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "1" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 143,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Upload Your Music" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 144,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 142,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "file-upload", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "audio-upload", className: "upload-btn", children: "Choose Audio File" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 147,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            id: "audio-upload",
            type: "file",
            accept: "audio/*",
            onChange: handleAudioUpload
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 150,
            columnNumber: 11
          }
        ),
        audioFile && /* @__PURE__ */ jsxDEV("div", { className: "file-name", children: [
          "Selected: ",
          audioFile.name,
          " (",
          videoDuration,
          "s)"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 157,
          columnNumber: 13
        }),
        audioUrl && /* @__PURE__ */ jsxDEV("audio", { ref: audioRef, src: audioUrl, style: { display: "none" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 162,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 146,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 141,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `step-container ${!audioFile ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "2" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 169,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Record Your Dance" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 170,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 168,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "video-container", children: [
        /* @__PURE__ */ jsxDEV("video", { ref: videoRef, muted: true, playsInline: true }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 174,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 175,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 173,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "recording-controls", children: !isRecording ? /* @__PURE__ */ jsxDEV(
        "button",
        {
          className: "record-btn",
          onClick: startRecording,
          disabled: !audioFile || trackingData,
          children: [
            /* @__PURE__ */ jsxDEV("span", { children: "\u25CF" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 185,
              columnNumber: 15
            }),
            " Start Recording"
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 180,
          columnNumber: 13
        }
      ) : /* @__PURE__ */ jsxDEV("button", { className: "stop-btn", onClick: stopRecording, children: "\u25A0 Stop Recording" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 188,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 178,
        columnNumber: 9
      }),
      isRecording && /* @__PURE__ */ jsxDEV("div", { className: "recording-info", children: [
        "Recording: ",
        formatTime(recordingTime),
        " / ",
        formatTime(videoDuration)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 195,
        columnNumber: 11
      }),
      status && /* @__PURE__ */ jsxDEV("div", { className: "status-message", children: status }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 201,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 167,
      columnNumber: 7
    }),
    trackingData && videoUrl && audioUrl && /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "3" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 208,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 209,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 207,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "player-container", children: /* @__PURE__ */ jsxDEV(
        Player,
        {
          component: MusicVideoComposition,
          durationInFrames: videoDuration * 30,
          fps: 30,
          compositionWidth: 540,
          compositionHeight: 960,
          inputProps: {
            trackingData,
            videoUrl,
            audioUrl,
            videoDuration
          },
          controls: true,
          loop: true,
          style: { width: "100%" }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 213,
          columnNumber: 13
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 212,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 206,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 135,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 236,
  columnNumber: 51
}));
