import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AudioUpload } from "./components/AudioUpload.jsx";
import { VisualSettings } from "./components/VisualSettings.jsx";
import { RecordingSection } from "./components/RecordingSection.jsx";
import { VideoPlayer } from "./components/VideoPlayer.jsx";
const App = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [trackingData, setTrackingData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [settings, setSettings] = useState({
    showOriginalVideo: true,
    show3DRobot: false,
    showPoseTracking: true,
    showFaceTracking: true,
    showHandTracking: true,
    showParticles: true,
    showGlow: true,
    brightness: 1.1,
    contrast: 1.2,
    saturation: 1.3,
    blur: 0
  });
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
  const updateSetting = (key, value) => {
    if (trackingData) return;
    setSettings((prev) => ({ ...prev, [key]: value }));
  };
  const handleAudioUpload = (file) => {
    setAudioFile(file);
  };
  const handleRecordingComplete = (data, url) => {
    setTrackingData(data);
    setVideoUrl(url);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "header", children: [
      /* @__PURE__ */ jsxDEV("h1", { children: "Music Video Generator" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 60,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("p", { children: "Upload music, configure settings, record yourself dancing, get an AI-enhanced music video" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 61,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      AudioUpload,
      {
        audioFile,
        onAudioUpload: handleAudioUpload,
        videoDuration,
        audioRef,
        audioUrl
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 64,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(
      VisualSettings,
      {
        settings,
        updateSetting,
        disabled: !audioFile,
        isLocked: !!trackingData
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 72,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(
      RecordingSection,
      {
        audioFile,
        audioUrl,
        audioRef,
        videoDuration,
        trackingData,
        onRecordingComplete: handleRecordingComplete,
        settings
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 79,
        columnNumber: 7
      }
    ),
    trackingData && videoUrl && audioUrl && /* @__PURE__ */ jsxDEV(
      VideoPlayer,
      {
        trackingData,
        videoUrl,
        audioUrl,
        videoDuration,
        settings
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 90,
        columnNumber: 9
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 58,
    columnNumber: 5
  });
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 102,
  columnNumber: 51
}));
