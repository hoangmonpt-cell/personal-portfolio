import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CAMERA_PRESETS } from './CameraPresets';
import type { CameraStationId, CameraMode } from './CameraPresets';

interface CameraControllerProps {
  activeStation: CameraStationId;
  cameraMode: CameraMode;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  activeStation,
  cameraMode,
}) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  
  // Interpolation vectors
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());

  // Initialize targets based on preset
  useEffect(() => {
    const preset = CAMERA_PRESETS[activeStation] || CAMERA_PRESETS.overview;
    targetPos.current.copy(preset.position);
    targetLook.current.copy(preset.target);
  }, [activeStation]);

  useFrame((_, delta) => {
    if (cameraMode === 'guided') {
      // Smooth damp factor independent of frame rate
      const step = Math.min(delta * 3.5, 0.15);

      // Smoothly interpolate position
      camera.position.lerp(targetPos.current, step);

      // Smoothly interpolate lookAt target
      currentLook.current.lerp(targetLook.current, step);
      camera.lookAt(currentLook.current);

      // Keep OrbitControls synced to prevent abrupt jumping when switching to explore
      if (controlsRef.current) {
        controlsRef.current.target.copy(currentLook.current);
        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={cameraMode === 'explore'}
      enableDamping={true}
      dampingFactor={0.06}
      minDistance={2.5}
      maxDistance={12.0}
      maxPolarAngle={Math.PI / 2.08} // Do not allow camera below floor
      minPolarAngle={0.15}
      minAzimuthAngle={-0.35} // Safe exploration range avoiding looking through back of walls
      maxAzimuthAngle={Math.PI / 2 + 0.35}
    />
  );
};
