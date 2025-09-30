import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
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
  const [showOriginalVideo, setShowOriginalVideo] = useState(true);
  const [brightness, setBrightness] = useState(1.1);
  const [contrast, setContrast] = useState(1.2);
  const [saturation, setSaturation] = useState(1.3);
  const [blur, setBlur] = useState(0);
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
        lineNumber: 144,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Upload music, record yourself dancing, get an AI-enhanced music video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 145,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 143,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "1" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 150,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Upload Your Music" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 151,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 149,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "file-upload", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "audio-upload", className: "upload-btn", children: "Choose Audio File" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 154,
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
            lineNumber: 157,
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
          lineNumber: 164,
          columnNumber: 13
        }),
        audioUrl && /* @__PURE__ */ jsxDEV("audio", { ref: audioRef, src: audioUrl, style: { display: "none" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 169,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 153,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 148,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `step-container ${!audioFile ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "2" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 176,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Record Your Dance" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 177,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 175,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "video-container", children: [
        /* @__PURE__ */ jsxDEV("video", { ref: videoRef, muted: true, playsInline: true }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 181,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 182,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 180,
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
              lineNumber: 192,
              columnNumber: 15
            }),
            " Start Recording"
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 187,
          columnNumber: 13
        }
      ) : /* @__PURE__ */ jsxDEV("button", { className: "stop-btn", onClick: stopRecording, children: "\u25A0 Stop Recording" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 195,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 185,
        columnNumber: 9
      }),
      isRecording && /* @__PURE__ */ jsxDEV("div", { className: "recording-info", children: [
        "Recording: ",
        formatTime(recordingTime),
        " / ",
        formatTime(videoDuration)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 202,
        columnNumber: 11
      }),
      status && /* @__PURE__ */ jsxDEV("div", { className: "status-message", children: status }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 208,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 174,
      columnNumber: 7
    }),
    trackingData && videoUrl && audioUrl && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "3" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 216,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("h2", { children: "Visual Settings" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 217,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 215,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "settings-grid", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: showOriginalVideo,
                  onChange: (e) => setShowOriginalVideo(e.target.checked)
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 223,
                  columnNumber: 19
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Show Original Video" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 228,
                columnNumber: 19
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 222,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: showOriginalVideo ? "Video visible with effects" : "Only tracking visualization" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 230,
              columnNumber: 17
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 221,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Brightness: ",
              brightness.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 236,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0.5",
                max: "2",
                step: "0.1",
                value: brightness,
                onChange: (e) => setBrightness(parseFloat(e.target.value)),
                className: "slider"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 239,
                columnNumber: 17
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 235,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Contrast: ",
              contrast.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 251,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0.5",
                max: "2",
                step: "0.1",
                value: contrast,
                onChange: (e) => setContrast(parseFloat(e.target.value)),
                className: "slider"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 254,
                columnNumber: 17
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 250,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Saturation: ",
              saturation.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 266,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0",
                max: "3",
                step: "0.1",
                value: saturation,
                onChange: (e) => setSaturation(parseFloat(e.target.value)),
                className: "slider"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 269,
                columnNumber: 17
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 265,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Blur: ",
              blur,
              "px"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 281,
              columnNumber: 17
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0",
                max: "20",
                step: "1",
                value: blur,
                onChange: (e) => setBlur(parseInt(e.target.value)),
                className: "slider"
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 284,
                columnNumber: 17
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 280,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 220,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 214,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "4" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 299,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 300,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 298,
          columnNumber: 13
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
              videoDuration,
              showOriginalVideo,
              brightness,
              contrast,
              saturation,
              blur
            },
            controls: true,
            loop: true,
            style: { width: "100%" }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 304,
            columnNumber: 15
          }
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 303,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 297,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 213,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 142,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 333,
  columnNumber: 51
}));
