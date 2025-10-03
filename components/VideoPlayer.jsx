import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Player } from "@websim/remotion/player";
import { MusicVideoComposition } from "../composition.jsx";
const VideoPlayer = ({ trackingData, videoUrl, audioUrl, videoDuration, settings }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `music-video-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "4" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 19,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 20,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 18,
      columnNumber: 7
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
        lineNumber: 24,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 23,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "recording-controls", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        className: "upload-btn",
        onClick: handleDownload,
        style: { marginTop: "1rem" },
        children: "Download Video"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 44,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 17,
    columnNumber: 5
  });
};
export {
  VideoPlayer
};
