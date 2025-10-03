import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
const VisualSettings = ({ settings, updateSetting, disabled, isLocked }) => {
  return /* @__PURE__ */ jsxDEV("div", { className: `step-container ${disabled ? "disabled" : ""}`, children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "2" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 7,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Configure Visual Settings" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 8,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 6,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "settings-section", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Recording Setup" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 14,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Countdown Duration: ",
            countdownDuration,
            " seconds"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 16,
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
              lineNumber: 19,
              columnNumber: 13
            }
          ),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Time before recording and music starts (0 to skip)." }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 29,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 15,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 13,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Tracking Features" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 36,
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
                lineNumber: 40,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Show Original Video" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 49,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 39,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display the recorded video feed" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 51,
            columnNumber: 13
          })
        ] }, void 0, true, {
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
                checked: settings.show3DRobot,
                onChange: (e) => {
                  e.stopPropagation();
                  updateSetting("show3DRobot", e.target.checked);
                },
                disabled: isLocked
              },
              void 0,
              false,
              {
                fileName: "<stdin>",
                lineNumber: 58,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "3D Robot Avatar" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 67,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 57,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Replace body tracking with animated 3D robot mesh" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 69,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 56,
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
                lineNumber: 76,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Pose Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 85,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 75,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display body skeleton visualization" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 87,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 74,
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
                lineNumber: 94,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Face Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 103,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 93,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display facial landmark points" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 105,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 92,
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
                lineNumber: 112,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Hand Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 121,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 111,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display detailed hand landmark points" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 123,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Visual Effects" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 130,
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
                lineNumber: 134,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Particle Effects" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 143,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 133,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Motion-reactive particles" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 145,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 132,
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
                lineNumber: 152,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Glow Effects" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 161,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 151,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Dynamic glow based on movement" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 163,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 150,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 129,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Color Adjustments" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 170,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Brightness: ",
            settings.brightness.toFixed(2)
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
              value: settings.brightness,
              onChange: (e) => updateSetting("brightness", parseFloat(e.target.value)),
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
            "Contrast: ",
            settings.contrast.toFixed(2)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 189,
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
            "Saturation: ",
            settings.saturation.toFixed(2)
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
              lineNumber: 208,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 204,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Blur: ",
            settings.blur,
            "px"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 221,
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
              lineNumber: 224,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 220,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 169,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 5,
    columnNumber: 5
  });
};
export {
  VisualSettings
};
