import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
const VisualSettings = ({ settings, updateSetting, disabled, isLocked }) => {
  const [countdownDuration, setCountdownDuration] = useState(3);
  return /* @__PURE__ */ jsxDEV("div", { className: `step-container ${disabled ? "disabled" : ""}`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "2" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 9,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Configure Visual Settings" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 10,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 8,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Recording Setup" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 16,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Countdown Duration: ",
            countdownDuration,
            " seconds"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 18,
            columnNumber: 13
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
              disabled: isLocked
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 21,
              columnNumber: 13
            }
          ),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Time before recording and music starts (0 to skip)." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 31,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 17,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 15,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Tracking Features" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 38,
          columnNumber: 11
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
                disabled: isLocked
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 42,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Show Original Video" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 51,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 41,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display the recorded video feed" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 53,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 40,
          columnNumber: 11
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
                disabled: isLocked
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 60,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Pose Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 69,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 59,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display body skeleton visualization" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 71,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 58,
          columnNumber: 11
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
                disabled: isLocked
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 78,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Face Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 87,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 77,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display facial landmark points" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 89,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 76,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "toggle-label", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "checkbox",
                checked: settings.showHandTracking,
                onChange: (e) => {
                  e.stopPropagation();
                  updateSetting("showHandTracking", e.target.checked);
                },
                disabled: isLocked
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 96,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Hand Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 105,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 95,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display detailed hand landmark points" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 107,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 94,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 37,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Visual Effects" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 114,
          columnNumber: 11
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
                disabled: isLocked
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 118,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Particle Effects" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 127,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 117,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Motion-reactive particles" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 129,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 116,
          columnNumber: 11
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
                disabled: isLocked
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 136,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Glow Effects" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 145,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 135,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Dynamic glow based on movement" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 147,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 134,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 113,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Color Adjustments" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 154,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Brightness: ",
            settings.brightness.toFixed(2)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 157,
            columnNumber: 13
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
              disabled: isLocked
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 160,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 156,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Contrast: ",
            settings.contrast.toFixed(2)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 173,
            columnNumber: 13
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
              disabled: isLocked
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 176,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 172,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Saturation: ",
            settings.saturation.toFixed(2)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 189,
            columnNumber: 13
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
              disabled: isLocked
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 192,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 188,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Blur: ",
            settings.blur,
            "px"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 205,
            columnNumber: 13
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
              disabled: isLocked
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 208,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 204,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 153,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 13,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 7,
    columnNumber: 5
  });
};
export {
  VisualSettings
};
