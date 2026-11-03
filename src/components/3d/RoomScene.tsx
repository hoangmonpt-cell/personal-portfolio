import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from './RoomEnvironment';
import { RoomLighting } from './RoomLighting';
import type { QualityTier } from './RoomLighting';
import type { RoomThemeConfig } from '../../data/roomThemes';
import { Workstation } from './Workstation';
import { ProjectDisplay } from './ProjectDisplay';
import { SkillDisplay } from './SkillDisplay';
import { AchievementDisplay } from './AchievementDisplay';
import { ContactStation } from './ContactStation';
import { CameraController } from '../camera/CameraController';
import type { CameraStationId, CameraMode } from '../camera/CameraPresets';

interface RoomSceneProps {
  activeStation: CameraStationId;
  cameraMode: CameraMode;
  qualityTier: QualityTier;
  themeConfig: RoomThemeConfig;
  onSelectStation: (stationId: CameraStationId) => void;
}

export const RoomScene: React.FC<RoomSceneProps> = ({
  activeStation,
  cameraMode,
  qualityTier,
  themeConfig,
  onSelectStation,
}) => {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows={qualityTier === 'low' ? false : 'soft'}
        camera={{ position: [6.5, 5.5, 6.5], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: qualityTier !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: themeConfig.toneMappingExposure,
        }}
        dpr={qualityTier === 'low' ? 1 : [1, 1.5]}
      >
        <color attach="background" args={[themeConfig.canvasBgColor]} />
        <fog attach="fog" args={[themeConfig.fogColor, 9, 24]} />

        <Suspense fallback={null}>
          <CameraController
            activeStation={activeStation}
            cameraMode={cameraMode}
          />

          <RoomLighting qualityTier={qualityTier} themeConfig={themeConfig} />
          <RoomEnvironment themeConfig={themeConfig} />

          {/* Interactive Stations */}
          <Workstation
            onSelect={() => onSelectStation('workstation')}
            isSelected={activeStation === 'workstation'}
          />

          <ProjectDisplay
            onSelect={() => onSelectStation('projects')}
            isSelected={activeStation === 'projects'}
          />

          <SkillDisplay
            onSelect={() => onSelectStation('skills')}
            isSelected={activeStation === 'skills'}
          />

          <AchievementDisplay
            onSelect={() => onSelectStation('achievements')}
            isSelected={activeStation === 'achievements'}
          />

          <ContactStation
            onSelect={() => onSelectStation('contact')}
            isSelected={activeStation === 'contact'}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RoomScene;
