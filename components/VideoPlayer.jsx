import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState } from "react";
import { Player } from "@websim/remotion/player";
import { renderMedia } from "@websim/remotion/renderer";
import { MusicVideoComposition } from "../composition.jsx";
const VideoPlayer = ({ trackingData, videoUrl, audioUrl, videoDuration, settings }) => {
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const compositionProps = {
    trackingData,
    videoUrl,
    audioUrl,
    videoDuration,
    ...settings
  };
  const handleDownload = async () => {
    setIsRendering(true);
    setStatusMessage("Starting video composition...");
    setRenderProgress(0);
    try {
      const composition = {
        id: "MusicVideo",
        component: MusicVideoComposition,
        durationInFrames: videoDuration * 30,
        fps: 30,
        width: 540,
        height: 960,
        props: compositionProps
      };
      const { url } = await renderMedia({
        composition,
        onProgress: ({ progress }) => {
          setRenderProgress(progress);
          setStatusMessage(`Composing video... ${(progress * 100).toFixed(0)}%`);
        },
        codec: "h264"
      });
      setStatusMessage("Composition complete! Downloading...");
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `music-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      setStatusMessage("Download started!");
    } catch (error) {
      console.error("Error rendering video:", error);
      setStatusMessage(`Error: ${error.message}`);
      alert("Failed to compose and download video. Please try again.");
    } finally {
      setIsRendering(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "step-container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "step-header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "step-number", children: "4" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 72,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("h2", { children: "Your Music Video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 73,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 71,
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
        inputProps: compositionProps,
        controls: true,
        loop: true,
        style: { width: "100%" }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 77,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 76,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "recording-controls", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        className: "upload-btn",
        onClick: handleDownload,
        disabled: isRendering,
        style: { marginTop: "1rem" },
        children: isRendering ? "Composing..." : "Download Composed Video"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 91,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 90,
      columnNumber: 7
    }),
    isRendering && /* @__PURE__ */ jsxDEV("div", { className: "status-message", style: { marginTop: "1rem" }, children: [
      /* @__PURE__ */ jsxDEV("p", { children: statusMessage }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 103,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("progress", { value: renderProgress, max: "1", style: { width: "100%", marginTop: "0.5rem" } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 102,
      columnNumber: 9
    }),
    !isRendering && statusMessage && /* @__PURE__ */ jsxDEV("div", { className: "status-message", style: { marginTop: "1rem" }, children: statusMessage }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 108,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 70,
    columnNumber: 5
  });
};
export {
  VideoPlayer
};
