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
    camera.position.set(0, 1.2, 5);
    camera.lookAt(0, 0.8, 0);
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
        robot.scale.set(0.6, 0.6, 0.6);
        robot.position.set(0, -0.5, 0);
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
    if (!modelLoaded || !robotRef.current || !isMountedRef.current) return;
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    const pose = currentTracking?.pose;
    const bones = bonesRef.current;
    const getLandmarkVector = (landmark) => {
      if (!landmark) return null;
      return new THREE.Vector3(
        (landmark.x - 0.5) * 2,
        -(landmark.y - 0.5) * 2,
        landmark.z || 0
      );
    };
    const calculateRotationFromPoints = (start, end) => {
      if (!start || !end) return null;
      const direction = new THREE.Vector3().subVectors(end, start).normalize();
      const euler = new THREE.Euler();
      euler.setFromVector3(direction);
      return euler;
    };
    Object.values(bones).forEach((bone) => {
      if (bone.rotation) {
        bone.rotation.set(0, 0, 0);
      }
    });
    if (!pose) {
      try {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      } catch (error) {
        console.error("Render error:", error);
      }
      return;
    }
    const leftShoulder = getLandmarkVector(pose[11]);
    const rightShoulder = getLandmarkVector(pose[12]);
    const leftHip = getLandmarkVector(pose[23]);
    const rightHip = getLandmarkVector(pose[24]);
    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      const shoulderCenter = new THREE.Vector3().addVectors(leftShoulder, rightShoulder).multiplyScalar(0.5);
      const hipCenter = new THREE.Vector3().addVectors(leftHip, rightHip).multiplyScalar(0.5);
      const torsoDir = new THREE.Vector3().subVectors(shoulderCenter, hipCenter).normalize();
      const shoulderAngle = Math.atan2(rightShoulder.x - leftShoulder.x, rightShoulder.y - leftShoulder.y);
      if (bones["mixamorigSpine"]) {
        bones["mixamorigSpine"].rotation.x = torsoDir.y * 0.3;
        bones["mixamorigSpine"].rotation.z = shoulderAngle * 0.2;
      }
      if (bones["mixamorigSpine1"]) {
        bones["mixamorigSpine1"].rotation.x = torsoDir.y * 0.2;
      }
      if (bones["mixamorigSpine2"]) {
        bones["mixamorigSpine2"].rotation.x = torsoDir.y * 0.15;
      }
      robotRef.current.position.set(
        hipCenter.x * 0.8,
        hipCenter.y * 0.8 + 0.2,
        0
      );
    }
    const leftElbow = getLandmarkVector(pose[13]);
    const leftWrist = getLandmarkVector(pose[15]);
    if (leftShoulder && leftElbow && leftWrist) {
      const upperArmDir = new THREE.Vector3().subVectors(leftElbow, leftShoulder);
      if (bones["mixamorigLeftArm"]) {
        bones["mixamorigLeftArm"].rotation.x = Math.atan2(upperArmDir.y, Math.sqrt(upperArmDir.x ** 2 + upperArmDir.z ** 2));
        bones["mixamorigLeftArm"].rotation.y = Math.atan2(upperArmDir.x, upperArmDir.z);
        bones["mixamorigLeftArm"].rotation.z = -Math.PI / 6;
      }
      const forearmDir = new THREE.Vector3().subVectors(leftWrist, leftElbow);
      const elbowAngle = upperArmDir.angleTo(forearmDir);
      if (bones["mixamorigLeftForeArm"]) {
        bones["mixamorigLeftForeArm"].rotation.y = -Math.max(0, Math.PI - elbowAngle);
      }
    }
    const rightElbow = getLandmarkVector(pose[14]);
    const rightWrist = getLandmarkVector(pose[16]);
    if (rightShoulder && rightElbow && rightWrist) {
      const upperArmDir = new THREE.Vector3().subVectors(rightElbow, rightShoulder);
      if (bones["mixamorigRightArm"]) {
        bones["mixamorigRightArm"].rotation.x = Math.atan2(upperArmDir.y, Math.sqrt(upperArmDir.x ** 2 + upperArmDir.z ** 2));
        bones["mixamorigRightArm"].rotation.y = Math.atan2(upperArmDir.x, upperArmDir.z);
        bones["mixamorigRightArm"].rotation.z = Math.PI / 6;
      }
      const forearmDir = new THREE.Vector3().subVectors(rightWrist, rightElbow);
      const elbowAngle = upperArmDir.angleTo(forearmDir);
      if (bones["mixamorigRightForeArm"]) {
        bones["mixamorigRightForeArm"].rotation.y = Math.max(0, Math.PI - elbowAngle);
      }
    }
    const leftKnee = getLandmarkVector(pose[25]);
    const leftAnkle = getLandmarkVector(pose[27]);
    if (leftHip && leftKnee && leftAnkle) {
      const upperLegDir = new THREE.Vector3().subVectors(leftKnee, leftHip);
      if (bones["mixamorigLeftUpLeg"]) {
        bones["mixamorigLeftUpLeg"].rotation.x = Math.atan2(-upperLegDir.y, Math.sqrt(upperLegDir.x ** 2 + upperLegDir.z ** 2)) - Math.PI / 2;
        bones["mixamorigLeftUpLeg"].rotation.z = Math.atan2(upperLegDir.x, upperLegDir.z) * 0.5;
      }
      const lowerLegDir = new THREE.Vector3().subVectors(leftAnkle, leftKnee);
      const kneeAngle = upperLegDir.angleTo(lowerLegDir);
      if (bones["mixamorigLeftLeg"]) {
        bones["mixamorigLeftLeg"].rotation.x = Math.max(0, kneeAngle - Math.PI);
      }
    }
    const rightKnee = getLandmarkVector(pose[26]);
    const rightAnkle = getLandmarkVector(pose[28]);
    if (rightHip && rightKnee && rightAnkle) {
      const upperLegDir = new THREE.Vector3().subVectors(rightKnee, rightHip);
      if (bones["mixamorigRightUpLeg"]) {
        bones["mixamorigRightUpLeg"].rotation.x = Math.atan2(-upperLegDir.y, Math.sqrt(upperLegDir.x ** 2 + upperLegDir.z ** 2)) - Math.PI / 2;
        bones["mixamorigRightUpLeg"].rotation.z = Math.atan2(upperLegDir.x, upperLegDir.z) * 0.5;
      }
      const lowerLegDir = new THREE.Vector3().subVectors(rightAnkle, rightKnee);
      const kneeAngle = upperLegDir.angleTo(lowerLegDir);
      if (bones["mixamorigRightLeg"]) {
        bones["mixamorigRightLeg"].rotation.x = Math.max(0, kneeAngle - Math.PI);
      }
    }
    const nose = getLandmarkVector(pose[0]);
    const leftEar = getLandmarkVector(pose[7]);
    const rightEar = getLandmarkVector(pose[8]);
    if (nose && leftEar && rightEar) {
      const earCenter = new THREE.Vector3().addVectors(leftEar, rightEar).multiplyScalar(0.5);
      const headDir = new THREE.Vector3().subVectors(nose, earCenter);
      if (bones["mixamorigHead"]) {
        bones["mixamorigHead"].rotation.x = Math.atan2(headDir.y, Math.sqrt(headDir.x ** 2 + headDir.z ** 2)) * 0.5 - Math.PI / 2;
        bones["mixamorigHead"].rotation.y = Math.atan2(headDir.x, headDir.z) * 0.5;
      }
      if (bones["mixamorigNeck"]) {
        bones["mixamorigNeck"].rotation.x = Math.atan2(headDir.y, Math.sqrt(headDir.x ** 2 + headDir.z ** 2)) * 0.3 - Math.PI / 2;
      }
    }
    try {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    } catch (error) {
      console.error("Render error:", error);
    }
  }, [currentTracking, modelLoaded]);
  return /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef, style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" } }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 332,
    columnNumber: 10
  });
};
export {
  RobotAvatar
};
