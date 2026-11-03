import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import type { RoomThemeConfig } from '../../data/roomThemes';
import type { QualityTier } from '../3d/RoomLighting';
import { ScrollWorld } from './ScrollWorld';
import { ScrollCameraController } from './ScrollCameraController';
import { CinematicLighting } from './lighting/CinematicLighting';
import { CinematicPostProcessing } from './postprocessing/CinematicPostProcessing';

interface ScrollWorldCanvasProps {
  themeConfig: RoomThemeConfig;
  qualityTier: QualityTier;
  reducedMotion?: boolean;
}

export const ScrollWorldCanvas: React.FC<ScrollWorldCanvasProps> = ({
  themeConfig,
  qualityTier,
  reducedMotion = false,
}) => {
  const isDark = themeConfig.name === 'dark';

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        shadows={qualityTier === 'low' ? false : 'soft'}
        camera={{ position: [0, 2.5, 9], fov: 44, near: 0.1, far: 380 }}
        gl={{
          antialias: qualityTier !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDark ? 1.35 : 1.2,
        }}
        dpr={qualityTier === 'low' ? 1 : [1, 1.5]}
      >
        {/* Dynamic Atmospheric Distance Fog */}
        <color attach="background" args={[isDark ? '#05080e' : '#f8fafc']} />
        <fog
          attach="fog"
          args={[isDark ? '#060910' : '#e2e8f0', 16, 175]}
        />

        <Suspense fallback={null}>
          {/* 1. Cinematic Lighting Rig (HDR IBL, Follow Light, Cascaded Shadows) */}
          <CinematicLighting theme={themeConfig.name} qualityTier={qualityTier} />

          {/* 2. Camera Navigation Controller along Spline */}
          <ScrollCameraController reducedMotion={reducedMotion} />

          {/* 3. Continuous 3D World (Reflective Ground, 7 Physical Environments) */}
          <ScrollWorld theme={themeConfig.name} qualityTier={qualityTier} />

          {/* 4. Cinematic Post-Processing Pipeline (N8AO, Selective Bloom, Vignette) */}
          <CinematicPostProcessing
            theme={themeConfig.name}
            qualityTier={qualityTier}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
