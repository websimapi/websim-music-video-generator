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
import { random } from "remotion";
const MusicVideoComposition = ({
  trackingData,
  videoUrl,
  audioUrl,
  videoDuration,
  renderDurationSeconds = videoDuration,
  showOriginalVideo = true,
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
  const timestamps = useMemo(() => trackingData?.map((t) => t.timestamp) ?? [], [trackingData]);
  const currentTracking = useMemo(() => {
    if (!trackingData || !timestamps.length) return null;
    const t = currentTime;
    let lo = 0, hi = timestamps.length - 1, best = 0;
    while (lo <= hi) {
      const mid = lo + hi >> 1;
      const val = timestamps[mid];
      if (val < t) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    const i2 = Math.min(best + 1, timestamps.length - 1);
    const idx = Math.abs(timestamps[best] - t) <= Math.abs(timestamps[i2] - t) ? best : i2;
    return trackingData[idx];
  }, [currentTime, timestamps, trackingData]);
  const { pose: posePrev, face: facePrev, hands: handsPrev } = currentTracking ?? {};
  const nextIdx = useMemo(() => Math.min(timestamps.indexOf(currentTracking?.timestamp ?? 0) + 1, timestamps.length - 1), [currentTracking, timestamps]);
  const t0 = currentTracking?.timestamp ?? 0, t1 = timestamps[nextIdx] ?? t0, alpha = t1 > t0 ? Math.min(Math.max((currentTime - t0) / (t1 - t0), 0), 1) : 0;
  const next = trackingData?.[nextIdx];
  const lerp = (a, b) => a == null || b == null ? a ?? b ?? null : a.map((p, i) => b[i] ? { ...p, x: p.x + (b[i].x - p.x) * alpha, y: p.y + (b[i].y - p.y) * alpha } : p);
  const poseToDraw = lerp(posePrev, next?.pose);
  const faceToDraw = lerp(facePrev, next?.face);
  const handsToDraw = handsPrev && next?.hands ? handsPrev.map((h, i) => lerp(h, next.hands[i] || h)) : handsPrev || next?.hands || [];
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
    return Array.from({ length: count }, (_, i) => {
      const rx = random(`p-x-${i}`);
      const ry = random(`p-y-${i}`);
      const rs = random(`p-s-${i}`);
      const ro = random(`p-o-${i}`);
      return {
        x: rx * 540,
        y: ry * 960,
        size: rs * 10 + 5,
        opacity: ro * 0.5 + 0.3
      };
    });
  }, [energy, frame]);
  const glowIntensity = interpolate(energy, [0, 1], [0, 40]);
  const drawPoseSkeleton = () => {
    if (!showPoseTracking || !poseToDraw) return null;
    const landmarks = poseToDraw;
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
            lineNumber: 112,
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
          lineNumber: 128,
          columnNumber: 11
        }
      ))
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 104,
      columnNumber: 7
    });
  };
  const drawFaceLandmarks = () => {
    if (!showFaceTracking || !faceToDraw) return null;
    return /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", style: { position: "absolute", top: 0, left: 0 }, children: faceToDraw.map((landmark, idx) => /* @__PURE__ */ jsxDEV(
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
        lineNumber: 148,
        columnNumber: 11
      }
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 146,
      columnNumber: 7
    });
  };
  const drawHandLandmarks = () => {
    if (!showHandTracking || !handsToDraw || handsToDraw.length === 0) return null;
    return /* @__PURE__ */ jsxDEV("svg", { width: "540", height: "960", style: { position: "absolute", top: 0, left: 0 }, children: handsToDraw.map((hand, handIdx) => {
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
              lineNumber: 186,
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
            lineNumber: 202,
            columnNumber: 17
          }
        ))
      ] }, `hand-${handIdx}`, true, {
        fileName: "<stdin>",
        lineNumber: 178,
        columnNumber: 13
      });
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 166,
      columnNumber: 7
    });
  };
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { background: showOriginalVideo ? "#000" : "#111" }, children: [
    showOriginalVideo && /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV(
      OffthreadVideo,
      {
        src: videoUrl,
        crossOrigin: "anonymous",
        trimAfter: renderDurationSeconds * 30,
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
        lineNumber: 223,
        columnNumber: 11
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 222,
      columnNumber: 9
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: drawPoseSkeleton() }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 238,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: drawFaceLandmarks() }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 243,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: drawHandLandmarks() }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 248,
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
        lineNumber: 254,
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
        lineNumber: 267,
        columnNumber: 15
      }
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 265,
      columnNumber: 11
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 264,
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
        lineNumber: 285,
        columnNumber: 9
      }
    ),
    /* @__PURE__ */ jsxDEV(Audio, { src: audioUrl, crossOrigin: "anonymous", trimAfter: renderDurationSeconds * 30 }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 294,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 219,
    columnNumber: 5
  });
};
export {
  MusicVideoComposition
};
