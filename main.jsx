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
  const [countdownDuration, setCountdownDuration] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
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
    if (isRecording || trackingData || isCountingDown) return;
    setSettings((prev) => ({ ...prev, [key]: value }));
  };
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };
  const drawCountdown = (count) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
    }
    ctx.save();
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#ff0000";
    ctx.shadowBlur = 20;
    const fontSize = Math.min(canvas.height / 3, 200);
    ctx.font = `bold ${fontSize}px 'Space Mono', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const display = count === 0 ? "GO!" : count.toString();
    ctx.fillText(display, canvas.width / 2, canvas.height / 2);
    ctx.restore();
  };
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
            drawCountdown(currentDisplayCount);
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
              drawCountdown(0);
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
        lineNumber: 270,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Upload music, configure settings, record yourself dancing, get an AI-enhanced music video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 271,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 269,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "1" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 276,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Upload Your Music" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 277,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 275,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "file-upload", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "audio-upload", className: "upload-btn", children: "Choose Audio File" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 280,
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
            lineNumber: 283,
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
          lineNumber: 290,
          columnNumber: 13
        }),
        audioUrl && /* @__PURE__ */ jsxDEV("audio", { ref: audioRef, src: audioUrl, style: { display: "none" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 295,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 279,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 274,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `step-container ${!audioFile ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "2" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 302,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Configure Visual Settings" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 303,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 301,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-section", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Recording Setup" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 310,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Countdown Duration: ",
              countdownDuration,
              " seconds"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 312,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "0",
                max: "10",
                step: "1",
                value: countdownDuration,
                onChange: (e) => setCountdownDuration(parseInt(e.target.value)),
                className: "slider",
                disabled: isRecording || trackingData || isCountingDown
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 315,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Time before recording and music starts (0 to skip)." }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 325,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 311,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 309,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Tracking Features" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 332,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showOriginalVideo,
                  onChange: (e) => {
                    e.stopPropagation();
                    updateSetting("showOriginalVideo", e.target.checked);
                  },
                  disabled: isRecording || trackingData || isCountingDown
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 336,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Show Original Video" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 345,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 335,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display the recorded video feed" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 347,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 334,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showPoseTracking,
                  onChange: (e) => {
                    e.stopPropagation();
                    updateSetting("showPoseTracking", e.target.checked);
                  },
                  disabled: isRecording || trackingData || isCountingDown
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 354,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Pose Tracking Overlay" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 363,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 353,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display body skeleton visualization" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 365,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 352,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showFaceTracking,
                  onChange: (e) => {
                    e.stopPropagation();
                    updateSetting("showFaceTracking", e.target.checked);
                  },
                  disabled: isRecording || trackingData || isCountingDown
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 372,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Face Tracking Overlay" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 381,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 371,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display facial landmark points" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 383,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 370,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 331,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Visual Effects" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 390,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showParticles,
                  onChange: (e) => {
                    e.stopPropagation();
                    updateSetting("showParticles", e.target.checked);
                  },
                  disabled: isRecording || trackingData || isCountingDown
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 394,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Particle Effects" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 403,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 393,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Motion-reactive particles" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 405,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 392,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: settings.showGlow,
                  onChange: (e) => {
                    e.stopPropagation();
                    updateSetting("showGlow", e.target.checked);
                  },
                  disabled: isRecording || trackingData || isCountingDown
                },
                void 0,
                false,
                {
                  fileName: "<stdin>",
                  lineNumber: 412,
                  columnNumber: 17
                }
              ),
              /* @__PURE__ */ jsxDEV("span", { children: "Glow Effects" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 421,
                columnNumber: 17
              })
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 411,
              columnNumber: 15
            }),
            /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Dynamic glow based on movement" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 423,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 410,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 389,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Color Adjustments" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 430,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Brightness: ",
              settings.brightness.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 433,
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
                disabled: isRecording || trackingData || isCountingDown
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 436,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 432,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Contrast: ",
              settings.contrast.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 449,
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
                disabled: isRecording || trackingData || isCountingDown
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 452,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 448,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Saturation: ",
              settings.saturation.toFixed(2)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 465,
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
                disabled: isRecording || trackingData || isCountingDown
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 468,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 464,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
            /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
              "Blur: ",
              settings.blur,
              "px"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 481,
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
                disabled: isRecording || trackingData || isCountingDown
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 484,
                columnNumber: 15
              }
            )
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 480,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 429,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 306,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 300,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: `step-container ${!audioFile ? "disabled" : ""}`, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "3" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 501,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Record Your Dance" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 502,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 500,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "video-container", children: [
        /* @__PURE__ */ jsxDEV("video", { ref: videoRef, muted: true, playsInline: true }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 506,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 507,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 505,
        columnNumber: 9
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
              lineNumber: 517,
              columnNumber: 15
            }),
            " Start Recording"
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 512,
          columnNumber: 13
        }
      ) : /* @__PURE__ */ jsxDEV("button", { className: "stop-btn", onClick: stopRecording, disabled: isCountingDown, children: "\u25A0 Stop Recording" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 520,
        columnNumber: 13
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 510,
        columnNumber: 9
      }),
      isRecording && /* @__PURE__ */ jsxDEV("div", { className: "recording-info", children: [
        "Recording: ",
        formatTime(recordingTime),
        " / ",
        formatTime(videoDuration)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 527,
        columnNumber: 11
      }),
      status && /* @__PURE__ */ jsxDEV("div", { className: "status-message", children: status }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 533,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 499,
      columnNumber: 7
    }),
    trackingData && videoUrl && audioUrl && /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "4" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 540,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 541,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 539,
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
          lineNumber: 545,
          columnNumber: 13
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 544,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 538,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 268,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 569,
  columnNumber: 51
}));
