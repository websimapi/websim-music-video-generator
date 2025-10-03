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
import { RobotAvatar } from "./components/RobotAvatar.jsx";
const MusicVideoComposition = ({
  trackingData,
  videoUrl,
  audioUrl,
  videoDuration,
  showOriginalVideo = true,
  show3DRobot = false,
  showPoseTracking = true,
  showFaceTracking = true,
  showHandTracking = true,
  showParticles = true,
  showGlow = true,
  brightness = 1.1,
  contrast = 1.2,
  saturation = 1.3,
  blur = 0
}) => {
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
  const drawPoseSkeleton = () => {
    if (!showPoseTracking || !currentTracking?.pose) return null;
    const landmarks = currentTracking.pose;
    const connections = [
      [11, 13],
      [13, 15],
      [12, 14],
      [14, 16],
      // Arms
      [11, 12],
      [11, 23],
      [12, 24],
      [23, 24],
      // Torso
      [23, 25],
      [25, 27],
      [27, 29],
      [29, 31],
      // Left leg
      [24, 26],
      [26, 28],
      [28, 30],
      [30, 32]
      // Right leg
    ];
    return /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", style: { position: "absolute", top: 0, left: 0 }, children: [
      connections.map(([i, j], idx) => {
        const p1 = landmarks[i];
        const p2 = landmarks[j];
        if (!p1 || !p2) return null;
        return /* @__PURE__ */ jsxDEV(
          "line",
          {
            x1: p1.x * 540,
            y1: p1.y * 960,
            x2: p2.x * 540,
            y2: p2.y * 960,
            stroke: "#00ff00",
            strokeWidth: "4",
            strokeLinecap: "round",
            opacity: "0.8"
          },
          `line-${idx}`,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 104,
            columnNumber: 13
          }
        );
      }),
      landmarks.map((landmark, idx) => /* @__PURE__ */ jsxDEV(
        "circle",
        {
          cx: landmark.x * 540,
          cy: landmark.y * 960,
          r: "8",
          fill: "#00ff00",
          opacity: "0.9"
        },
        `joint-${idx}`,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 120,
          columnNumber: 11
        }
      ))
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 96,
      columnNumber: 7
    });
  };
  const drawFaceLandmarks = () => {
    if (!showFaceTracking || !currentTracking?.face) return null;
    return /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", style: { position: "absolute", top: 0, left: 0 }, children: currentTracking.face.map((landmark, idx) => /* @__PURE__ */ jsxDEV(
      "circle",
      {
        cx: landmark.x * 540,
        cy: landmark.y * 960,
        r: "1.5",
        fill: "#ff00ff",
        opacity: "0.7"
      },
      `face-${idx}`,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 140,
        columnNumber: 11
      }
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 138,
      columnNumber: 7
    });
  };
  const drawHandLandmarks = () => {
    if (!showHandTracking || !currentTracking?.hands || currentTracking.hands.length === 0) return null;
    return /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", style: { position: "absolute", top: 0, left: 0 }, children: currentTracking.hands.map((hand, handIdx) => {
      const connections = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        // Thumb
        [0, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        // Index
        [0, 9],
        [9, 10],
        [10, 11],
        [11, 12],
        // Middle
        [0, 13],
        [13, 14],
        [14, 15],
        [15, 16],
        // Ring
        [0, 17],
        [17, 18],
        [18, 19],
        [19, 20],
        // Pinky
        [5, 9],
        [9, 13],
        [13, 17]
        // Palm
      ];
      return /* @__PURE__ */ jsxDEV("g", { children: [
        connections.map(([i, j], idx) => {
          const p1 = hand[i];
          const p2 = hand[j];
          if (!p1 || !p2) return null;
          return /* @__PURE__ */ jsxDEV(
            "line",
            {
              x1: p1.x * 540,
              y1: p1.y * 960,
              x2: p2.x * 540,
              y2: p2.y * 960,
              stroke: "#ffff00",
              strokeWidth: "3",
              strokeLinecap: "round",
              opacity: "0.8"
            },
            `hand-${handIdx}-line-${idx}`,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 178,
              columnNumber: 19
            }
          );
        }),
        hand.map((landmark, idx) => /* @__PURE__ */ jsxDEV(
          "circle",
          {
            cx: landmark.x * 540,
            cy: landmark.y * 960,
            r: "5",
            fill: "#ffff00",
            opacity: "0.9"
          },
          `hand-${handIdx}-joint-${idx}`,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 194,
            columnNumber: 17
          }
        ))
      ] }, `hand-${handIdx}`, true, {
        fileName: "<stdin>",
        lineNumber: 170,
        columnNumber: 13
      });
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 158,
      columnNumber: 7
    });
  };
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { background: showOriginalVideo ? "#000" : "#111" }, children: [
    showOriginalVideo && /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV(
      OffthreadVideo,
      {
        src: videoUrl,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) blur(${blur}px)`
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 215,
        columnNumber: 11
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 214,
      columnNumber: 9
    }),
    show3DRobot && /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV(RobotAvatar, { trackingData, currentTime }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 230,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 229,
      columnNumber: 9
    }),
    !show3DRobot && /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: drawPoseSkeleton() }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 236,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: drawFaceLandmarks() }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 242,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: drawHandLandmarks() }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 247,
      columnNumber: 7
    }),
    showGlow && /* @__PURE__ */ jsxDEV(
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
        lineNumber: 253,
        columnNumber: 9
      }
    ),
    showParticles && /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", children: particles.map((particle, i) => /* @__PURE__ */ jsxDEV(
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
        lineNumber: 266,
        columnNumber: 15
      }
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 264,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 263,
      columnNumber: 9
    }),
    showGlow && /* @__PURE__ */ jsxDEV(
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
        lineNumber: 284,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV(Audio, { src: audioUrl }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 293,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 211,
    columnNumber: 5
  });
};
export {
  MusicVideoComposition
};
