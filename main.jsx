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
  const [settings, setSettings] = useState({
    showOriginalVideo: true,
    showPoseTracking: true,
    showFaceTracking: true,
    showParticles: true,
    showGlow: true,
    brightness: 1.1,
    contrast: 1.2,
    saturation: 1.3,
    blur: 0
  });
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
  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };
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
        lineNumber: 154,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Upload music, configure settings, record yourself dancing, get an AI-enhanced music video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 155,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 153,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "1" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 160,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Upload Your Music" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 161,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 159,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "file-upload", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "audio-upload", className: "upload-btn", children: "Choose Audio File" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 164,
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
            lineNumber: 167,
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
          lineNumber: 174,
          columnNumber: 13
        }),
        audioUrl && /* @__PURE__ */ jsxDEV("audio", { ref: audioRef, src: audioUrl, style: { display: "none" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 179,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 163,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 158,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `step-container ${!audioFile ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "2" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 186,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Configure Visual Settings" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 187,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 185,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Tracking Features" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 192,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showOriginalVideo,
                  onChange: (e) => updateSetting("showOriginalVideo", e.target.checked),
                  disabled: isRecording || trackingData
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 196,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Show Original Video" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 202,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 195,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display the recorded video feed" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 204,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 194,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showPoseTracking,
                  onChange: (e) => updateSetting("showPoseTracking", e.target.checked),
                  disabled: isRecording || trackingData
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 211,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Pose Tracking Overlay" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 217,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 210,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display body skeleton visualization" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 219,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 209,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showFaceTracking,
                  onChange: (e) => updateSetting("showFaceTracking", e.target.checked),
                  disabled: isRecording || trackingData
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 226,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Face Tracking Overlay" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 232,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 225,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display facial landmark points" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 234,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 224,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 191,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Visual Effects" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 241,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showParticles,
                  onChange: (e) => updateSetting("showParticles", e.target.checked),
                  disabled: isRecording || trackingData
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 245,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Particle Effects" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 251,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 244,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Motion-reactive particles" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 253,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 243,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showGlow,
                  onChange: (e) => updateSetting("showGlow", e.target.checked),
                  disabled: isRecording || trackingData
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 260,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Glow Effects" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 266,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 259,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Dynamic glow based on movement" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 268,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 258,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 240,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Color Adjustments" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 275,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Brightness: ",
              settings.brightness.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 278,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0.5",
                max: "2",
                step: "0.1",
                value: settings.brightness,
                onChange: (e) => updateSetting("brightness", parseFloat(e.target.value)),
                className: "slider",
                disabled: isRecording || trackingData
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 281,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 277,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Contrast: ",
              settings.contrast.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 294,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0.5",
                max: "2",
                step: "0.1",
                value: settings.contrast,
                onChange: (e) => updateSetting("contrast", parseFloat(e.target.value)),
                className: "slider",
                disabled: isRecording || trackingData
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 297,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 293,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Saturation: ",
              settings.saturation.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 310,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0",
                max: "3",
                step: "0.1",
                value: settings.saturation,
                onChange: (e) => updateSetting("saturation", parseFloat(e.target.value)),
                className: "slider",
                disabled: isRecording || trackingData
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 313,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 309,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Blur: ",
              settings.blur,
              "px"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 326,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0",
                max: "20",
                step: "1",
                value: settings.blur,
                onChange: (e) => updateSetting("blur", parseInt(e.target.value)),
                className: "slider",
                disabled: isRecording || trackingData
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 329,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 325,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 274,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 190,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 184,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `step-container ${!audioFile ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "3" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 346,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Record Your Dance" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 347,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 345,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "video-container", children: [
        /* @__PURE__ */ jsxDEV("video", { ref: videoRef, muted: true, playsInline: true }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 351,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 352,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 350,
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
              lineNumber: 362,
              columnNumber: 15
            }),
            " Start Recording"
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 357,
          columnNumber: 13
        }
      ) : /* @__PURE__ */ jsxDEV("button", { className: "stop-btn", onClick: stopRecording, children: "\u25A0 Stop Recording" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 365,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 355,
        columnNumber: 9
      }),
      isRecording && /* @__PURE__ */ jsxDEV("div", { className: "recording-info", children: [
        "Recording: ",
        formatTime(recordingTime),
        " / ",
        formatTime(videoDuration)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 372,
        columnNumber: 11
      }),
      status && /* @__PURE__ */ jsxDEV("div", { className: "status-message", children: status }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 378,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 344,
      columnNumber: 7
    }),
    trackingData && videoUrl && audioUrl && /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "4" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 385,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 386,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 384,
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
            videoDuration,
            ...settings
          },
          controls: true,
          loop: true,
          style: { width: "100%" }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 390,
          columnNumber: 13
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 389,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 383,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 152,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 414,
  columnNumber: 51
}));
