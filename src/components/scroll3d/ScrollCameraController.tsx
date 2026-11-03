import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getCameraTransformAt } from './utils/cameraPath';
import { scrollStore } from './utils/scrollStore';

interface Props {
  reducedMotion?: boolean;
}

export const ScrollCameraController: React.FC<Props> = ({ reducedMotion = false }) => {
  const { camera, size } = useThree();
  const currentProgress = useRef(0);
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  // Adapt FOV on narrow/mobile viewports to prevent clipping
  const isNarrow = size.width < 768;
  const targetFov = isNarrow ? 52 : 44;

  useFrame((_, delta) => {
    const rawProgress = scrollStore.getState().rawProgress;

    // Smooth lerp damping: damp with 6.5 damping coefficient
    const dampSpeed = reducedMotion ? 2.5 : 6.5;
    currentProgress.current = THREE.MathUtils.damp(
      currentProgress.current,
      rawProgress,
      dampSpeed,
      delta
    );

    // Update smooth progress in store
    scrollStore.setSmoothProgress(currentProgress.current);

    // Evaluate spline for exact camera position and lookAt vector
    getCameraTransformAt(currentProgress.current, targetPos.current, targetLook.current);

    // Slightly adjust camera X offset on mobile for centered framing
    const xOffset = isNarrow ? targetPos.current.x * 0.7 : targetPos.current.x;
    camera.position.set(xOffset, targetPos.current.y, targetPos.current.z);

    // Update FOV dynamically on window resize
    if (camera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * 3);
        camera.updateProjectionMatrix();
      }
    }

    camera.lookAt(targetLook.current);
  });

  return null;
};

