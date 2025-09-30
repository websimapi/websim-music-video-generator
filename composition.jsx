import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate
} from "remotion";
const MusicVideoComposition = ({ trackingData, videoUrl, audioUrl, videoDuration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps * 1e3;
  const currentTracking = useMemo(() => {
    if (!trackingData) return null;
    let closest = trackingData[0];
    let minDiff = Math.abs(trackingData[0].timestamp - currentTime);
    for (let i = 1; i < trackingData.length; i++) {
      const diff = Math.abs(trackingData[i].timestamp - currentTime);
      if (diff < minDiff) {
        minDiff = diff;
        closest = trackingData[i];
      }
    }
    return closest;
  }, [frame, trackingData, currentTime]);
  const energy = useMemo(() => {
    if (!currentTracking?.pose) return 0;
    const landmarks = currentTracking.pose;
    let movement = 0;
    const keyPoints = [11, 12, 13, 14, 15, 16];
    keyPoints.forEach((idx) => {
      if (landmarks[idx]) {
        movement += Math.abs(landmarks[idx].x - 0.5) + Math.abs(landmarks[idx].y - 0.5);
      }
    });
    return Math.min(movement * 2, 1);
  }, [currentTracking]);
  const particles = useMemo(() => {
    const count = Math.floor(energy * 20);
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 540,
      y: Math.random() * 960,
      size: Math.random() * 10 + 5,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, [energy, frame]);
  const glowIntensity = interpolate(energy, [0, 1], [0, 40]);
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { background: "#000" }, children: [
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV(
      OffthreadVideo,
      {
        src: videoUrl,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `brightness(1.1) contrast(1.2) saturate(1.3)`
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 70,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 69,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${energy * 0.3}) 0%, transparent 70%)`,
          mixBlendMode: "screen"
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 82,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", children: particles.map((particle, i) => /* @__PURE__ */ jsxDEV(
      "circle",
      {
        cx: particle.x,
        cy: particle.y,
        r: particle.size,
        fill: "white",
        opacity: particle.opacity,
        style: {
          filter: `blur(${particle.size / 2}px)`
        }
      },
      i,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 93,
        columnNumber: 13
      }
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 91,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 90,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(
      AbsoluteFill,
      {
        style: {
          boxShadow: `inset 0 0 ${glowIntensity}px rgba(255,255,255,0.5)`,
          pointerEvents: "none"
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 109,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV(Audio, { src: audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 117,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 67,
    columnNumber: 5
  });
};
export {
  MusicVideoComposition
};
