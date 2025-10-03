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
        /* @__PURE__ */ jsxDEV("h3", { children: "Tracking Features" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 14,
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
                lineNumber: 18,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Show Original Video" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 27,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 17,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display the recorded video feed" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 29,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 16,
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
                lineNumber: 36,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "3D Robot Avatar" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 45,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 35,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Replace body tracking with animated 3D robot mesh" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 47,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 34,
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
                lineNumber: 54,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Pose Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 63,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 53,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display body skeleton visualization" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 65,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 52,
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
                lineNumber: 72,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Face Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 81,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 71,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display facial landmark points" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 83,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 70,
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
                lineNumber: 90,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Hand Tracking Overlay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 99,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 89,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Display detailed hand landmark points" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 101,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 88,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 13,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Visual Effects" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 108,
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
                lineNumber: 112,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Particle Effects" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 121,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 111,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Motion-reactive particles" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 123,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 110,
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
                lineNumber: 130,
                columnNumber: 15
              }
            ),
            /* @__PURE__ */ jsxDEV("span", { children: "Glow Effects" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 139,
              columnNumber: 15
            })
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 129,
            columnNumber: 13
          }),
          /* @__PURE__ */ jsxDEV("p", { className: "setting-description", children: "Dynamic glow based on movement" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 141,
            columnNumber: 13
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 128,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 107,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "settings-group", children: [
        /* @__PURE__ */ jsxDEV("h3", { children: "Color Adjustments" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 148,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Brightness: ",
            settings.brightness.toFixed(2)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 151,
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
              lineNumber: 154,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 150,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Contrast: ",
            settings.contrast.toFixed(2)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 167,
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
              lineNumber: 170,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 166,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Saturation: ",
            settings.saturation.toFixed(2)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 183,
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
              lineNumber: 186,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 182,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("div", { className: "setting-item", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "slider-label", children: [
            "Blur: ",
            settings.blur,
            "px"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 199,
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
              lineNumber: 202,
              columnNumber: 13
            }
          )
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 147,
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
