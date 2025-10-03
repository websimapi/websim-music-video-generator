import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Player } from "@websim/remotion/player";
import { MusicVideoComposition } from "../composition.jsx";
const VideoPlayer = ({ trackingData, videoUrl, audioUrl, videoDuration, settings }) => {
  const MAX_DURATION_SECONDS = 300;
  const renderDurationSeconds = Math.min(videoDuration || 0, MAX_DURATION_SECONDS);
  return /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "4" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 12,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 13,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 11,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "player-container", children: /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: MusicVideoComposition,
        durationInFrames: renderDurationSeconds * 30,
        fps: 30,
        compositionWidth: 540,
        compositionHeight: 960,
        inputProps: {
          trackingData,
          videoUrl,
          audioUrl,
          videoDuration,
          renderDurationSeconds,
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
        lineNumber: 17,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 16,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 10,
    columnNumber: 5
  });
};
export {
  VideoPlayer
};
