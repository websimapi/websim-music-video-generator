import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { Player } from "@websim/remotion/player";
import { MusicVideoComposition } from "../composition.jsx";
const VideoPlayer = ({ trackingData, videoUrl, audioUrl, videoDuration, settings }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `music-video-${Date.now()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Failed to download video. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "4" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 34,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 35,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 33,
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
        lineNumber: 39,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 38,
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
        lineNumber: 59,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 32,
    columnNumber: 5
  });
};
export {
  VideoPlayer
};
