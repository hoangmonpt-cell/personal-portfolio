import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { ThemeMode } from '../../../data/roomThemes';
import type { QualityTier } from '../../3d/RoomLighting';
import { scrollStore } from '../utils/scrollStore';
import { cameraPathSpline } from '../utils/cameraPath';

interface CinematicLightingProps {
  theme: ThemeMode;
  qualityTier: QualityTier;
}

export const CinematicLighting: React.FC<CinematicLightingProps> = ({
  theme,
  qualityTier,
}) => {
  const isDark = theme === 'dark';
  const travelingLightRef = useRef<THREE.PointLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  // Traveling hero point light follows camera along the flight corridor
  useFrame(() => {
    if (!travelingLightRef.current) return;
    const progress = scrollStore.getState().smoothProgress;
    // Look slightly ahead on the spline
    const leadT = Math.min(1, progress + 0.04);
    const pos = cameraPathSpline.getPointAt(leadT);
    travelingLightRef.current.position.set(pos.x, pos.y + 2.5, pos.z - 3.0);
  });

  const shadowMapSize = qualityTier === 'high' ? 2048 : qualityTier === 'medium' ? 1024 : 512;

  return (
    <group name="cinematic-lighting-rig">
      {/* 1. Physically Based IBL Environment Map Reflections */}
      <Environment
        preset="city"
        environmentIntensity={isDark ? 0.45 : 0.55}
      />

      {/* 2. Primary Atmospheric Hemisphere Ambient Bounce */}
      <hemisphereLight
        color="#38bdf8"
        groundColor="#020617"
        intensity={isDark ? 0.75 : 0.85}
      />

      {/* 3. Global Directional Sun/Key Light with Precision Cascaded Shadows */}
      <directionalLight
        ref={dirLightRef}
        position={[18, 32, 12]}
        color={isDark ? '#e0f2fe' : '#ffffff'}
        intensity={isDark ? 2.4 : 2.5}
        castShadow={qualityTier !== 'low'}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={0.5}
        shadow-camera-far={180}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-bias={-0.00015}
      />

      {/* 4. Traveling Cinematic Specular Point Light (illuminates active section) */}
      <pointLight
        ref={travelingLightRef}
        color={isDark ? '#00f0ff' : '#0284c7'}
        intensity={isDark ? 4.5 : 2.5}
        distance={32}
        decay={2}
      />

      {/* 5. Deep Accent Fill Lights for cinematic depth */}
      <pointLight
        position={[-12, 8, -60]}
        color={isDark ? '#ff0055' : '#e11d48'}
        intensity={isDark ? 1.8 : 0.8}
        distance={45}
        decay={2}
      />
      <pointLight
        position={[12, 10, -160]}
        color={isDark ? '#a855f7' : '#7c3aed'}
        intensity={isDark ? 2.2 : 1.0}
        distance={55}
        decay={2}
      />
      <pointLight
        position={[0, 12, -260]}
        color={isDark ? '#00ff88' : '#059669'}
        intensity={isDark ? 2.8 : 1.2}
        distance={50}
        decay={2}
      />
    </group>
  );
};

