import React from 'react';
import { Sparkles } from '@react-three/drei';
import type { ThemeMode } from '../../../data/roomThemes';
import type { QualityTier } from '../../3d/RoomLighting';

interface RealisticHighwayProps {
  theme: ThemeMode;
  qualityTier: QualityTier;
}

export const RealisticHighway: React.FC<RealisticHighwayProps> = ({
  theme,
  qualityTier,
}) => {
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#00f0ff' : '#0284c7';

  return (
    <group name="realistic-cinematic-highway">
      {/* 1. Precision Dual Luminescent Fiber-Optic Guide Lines (No gray ground floor) */}
      {[-4.2, 4.2].map((x, idx) => (
        <group key={`guide-rail-${idx}`} position={[x, 0.01, -150]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.05, 330]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isDark ? 1.5 : 0.6}
            />
          </mesh>
        </group>
      ))}

      {/* 2. Airborne Micro-Particulate Dust Motes catching cinematic light */}
      {qualityTier !== 'low' && (
        <Sparkles
          count={qualityTier === 'high' ? 140 : 80}
          scale={[28, 9, 320]}
          position={[0, 4, -150]}
          size={isDark ? 3.0 : 2.0}
          speed={0.35}
          noise={0.6}
          color={accentColor}
          opacity={isDark ? 0.45 : 0.22}
        />
      )}
    </group>
  );
};
