import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useVideoConfig, useCurrentFrame, delayRender, continueRender } from "remotion";
const RobotAvatar = ({ trackingData, currentTime }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const robotRef = useRef(null);
  const bonesRef = useRef({});
  const [modelLoaded, setModelLoaded] = React.useState(false);
  const isMountedRef = useRef(true);
  const handleRef = useRef(null);
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
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
  useEffect(() => {
    if (!canvasRef.current) return;
    isMountedRef.current = true;
    if (!handleRef.current) {
      handleRef.current = delayRender();
    }
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1e3);
    camera.position.set(0, 1, 3);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    const ambientLight = new THREE.AmbientLight(16777215, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(16777215, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const backLight = new THREE.DirectionalLight(65535, 0.4);
    backLight.position.set(-5, 3, -5);
    scene.add(backLight);
    const loader = new GLTFLoader();
    const loadTimeout = setTimeout(() => {
      if (!modelLoaded && handleRef.current) {
        console.warn("Robot model loading timed out, continuing render");
        continueRender(handleRef.current);
        handleRef.current = null;
      }
    }, 5e3);
    loader.load(
      "https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb",
      (gltf) => {
        clearTimeout(loadTimeout);
        if (!isMountedRef.current) {
          if (handleRef.current) {
            continueRender(handleRef.current);
            handleRef.current = null;
          }
          return;
        }
        const robot = gltf.scene;
        robot.scale.set(0.8, 0.8, 0.8);
        robot.position.set(0, 0, 0);
        robot.traverse((child) => {
          if (child.isBone) {
            bonesRef.current[child.name] = child;
          }
        });
        scene.add(robot);
        robotRef.current = robot;
        setModelLoaded(true);
        if (handleRef.current) {
          continueRender(handleRef.current);
          handleRef.current = null;
        }
      },
      void 0,
      (error) => {
        clearTimeout(loadTimeout);
        console.error("Error loading robot model:", error);
        if (handleRef.current) {
          continueRender(handleRef.current);
          handleRef.current = null;
        }
      }
    );
    return () => {
      isMountedRef.current = false;
      if (renderer) {
        renderer.dispose();
      }
      if (handleRef.current) {
        continueRender(handleRef.current);
        handleRef.current = null;
      }
    };
  }, [width, height]);
  useEffect(() => {
    if (!modelLoaded || !robotRef.current || !currentTracking?.pose || !isMountedRef.current) return;
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    const pose = currentTracking.pose;
    const bones = bonesRef.current;
    const calculateAngle = (p1, p2, p3) => {
      const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
      const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };
      const angle = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
      return angle;
    };
    if (pose[11] && pose[13] && pose[15]) {
      const leftArmAngle = calculateAngle(pose[11], pose[13], pose[15]);
      if (bones["mixamorigLeftArm"]) {
        bones["mixamorigLeftArm"].rotation.z = leftArmAngle * 0.5;
      }
      if (bones["mixamorigLeftForeArm"]) {
        bones["mixamorigLeftForeArm"].rotation.z = Math.abs(leftArmAngle) * 0.3;
      }
    }
    if (pose[12] && pose[14] && pose[16]) {
      const rightArmAngle = calculateAngle(pose[12], pose[14], pose[16]);
      if (bones["mixamorigRightArm"]) {
        bones["mixamorigRightArm"].rotation.z = -rightArmAngle * 0.5;
      }
      if (bones["mixamorigRightForeArm"]) {
        bones["mixamorigRightForeArm"].rotation.z = -Math.abs(rightArmAngle) * 0.3;
      }
    }
    if (pose[23] && pose[25] && pose[27]) {
      const leftLegAngle = calculateAngle(pose[23], pose[25], pose[27]);
      if (bones["mixamorigLeftUpLeg"]) {
        bones["mixamorigLeftUpLeg"].rotation.x = leftLegAngle * 0.3;
      }
      if (bones["mixamorigLeftLeg"]) {
        bones["mixamorigLeftLeg"].rotation.x = Math.abs(leftLegAngle) * 0.2;
      }
    }
    if (pose[24] && pose[26] && pose[28]) {
      const rightLegAngle = calculateAngle(pose[24], pose[26], pose[28]);
      if (bones["mixamorigRightUpLeg"]) {
        bones["mixamorigRightUpLeg"].rotation.x = rightLegAngle * 0.3;
      }
      if (bones["mixamorigRightLeg"]) {
        bones["mixamorigRightLeg"].rotation.x = Math.abs(rightLegAngle) * 0.2;
      }
    }
    if (pose[23] && pose[24]) {
      const hipCenter = {
        x: (pose[23].x + pose[24].x) / 2,
        y: (pose[23].y + pose[24].y) / 2
      };
      robotRef.current.position.x = (hipCenter.x - 0.5) * 4;
      robotRef.current.position.y = (1 - hipCenter.y) * 2 - 0.5;
    }
    if (pose[11] && pose[12]) {
      const shoulderAngle = Math.atan2(
        pose[12].y - pose[11].y,
        pose[12].x - pose[11].x
      );
      robotRef.current.rotation.z = shoulderAngle * 0.3;
    }
    try {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    } catch (error) {
      console.error("Render error:", error);
    }
  }, [currentTracking, modelLoaded]);
  return /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef, style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 233,
    columnNumber: 10
  });
};
export {
  RobotAvatar
};
