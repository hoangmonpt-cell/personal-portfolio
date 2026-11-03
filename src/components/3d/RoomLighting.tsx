import React from 'react';
import type { RoomThemeConfig } from '../../data/roomThemes';

export type QualityTier = 'low' | 'medium' | 'high';

interface RoomLightingProps {
  qualityTier: QualityTier;
  themeConfig: RoomThemeConfig;
}

export const RoomLighting: React.FC<RoomLightingProps> = ({ qualityTier, themeConfig }) => {
  const isHigh = qualityTier === 'high';
  const isMedium = qualityTier === 'medium';
  const enableShadows = isHigh || isMedium;

  return (
    <group name="room-lighting">
      {/* 1. Base Ambient Room Illumination */}
      <ambientLight
        color={themeConfig.ambientColor}
        intensity={themeConfig.ambientIntensity}
      />

      {/* 2. Natural Hemisphere Sky/Ground Light */}
      <hemisphereLight
        color={themeConfig.hemisphereSkyColor}
        groundColor={themeConfig.hemisphereGroundColor}
        intensity={themeConfig.hemisphereIntensity}
      />

      {/* 2.5 PRIMARY OVERHEAD TOP-DOWN LIGHT (ÁNH SÁNG TRẦN CHIẾU THẲNG TỪ TRÊN XUỐNG) */}
      <directionalLight
        position={[0, 8.5, -0.5]}
        intensity={themeConfig.name === 'dark' ? 2.5 : 0.85}
        color={themeConfig.name === 'dark' ? '#f8fafc' : '#ffffff'}
        castShadow={false}
      />

      {/* Broad Ceiling Downlight Pool directly illuminating Desk, Floor & Props */}
      <pointLight
        position={[0, 5.4, -0.6]}
        color={themeConfig.name === 'dark' ? '#e2e8f0' : '#ffffff'}
        intensity={themeConfig.name === 'dark' ? 3.0 : 0.9}
        distance={12.0}
        decay={1.6}
      />

      {/* 3. Primary Key Directional Sunlight / Studio Light (High-Res Soft Shadow, Zero Acne) */}
      <directionalLight
        position={[5.5, 7.5, 6.0]}
        intensity={themeConfig.keyLightIntensity}
        color={themeConfig.keyLightColor}
        castShadow={enableShadows}
        shadow-mapSize-width={isHigh ? 2048 : 1024}
        shadow-mapSize-height={isHigh ? 2048 : 1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.00015}
        shadow-normalBias={0.045}
      />

      {/* 4. Soft Fill Light from Open Front-Left */}
      <directionalLight
        position={[-3.5, 4.5, 4.0]}
        intensity={themeConfig.fillLightIntensity}
        color={themeConfig.fillLightColor}
      />

      {/* 5. Workstation Task / Screen Glow Accent Light */}
      <pointLight
        position={[0, 2.2, -1.2]}
        color={themeConfig.workstationLightColor}
        intensity={isHigh ? themeConfig.workstationLightIntensity : themeConfig.workstationLightIntensity * 0.7}
        distance={4.8}
        decay={2}
      />

      {/* 6. Project Kiosk Holographic Emitter Light */}
      <pointLight
        position={[2.8, 1.8, -0.8]}
        color={themeConfig.accentPointColor}
        intensity={isHigh ? 1.4 : 0.8}
        distance={4.0}
        decay={2}
      />

      {/* 7. Skills & Bookshelf Warm Accent Light */}
      <pointLight
        position={[-3.3, 2.2, -1.6]}
        color="#f59e0b"
        intensity={isHigh ? 1.2 : 0.6}
        distance={3.8}
        decay={2}
      />
    </group>
  );
};
