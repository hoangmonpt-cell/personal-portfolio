import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThemeMode } from '../../../data/roomThemes';
import type { QualityTier } from '../../3d/RoomLighting';
import { StationFloorRing } from '../../3d/StationFloorRing';

interface SectionProps {
  theme: ThemeMode;
  qualityTier?: QualityTier;
}

export const Section07Contact: React.FC<SectionProps> = ({ theme }) => {
  const beaconLightRef = useRef<THREE.Mesh>(null);
  const terminalRingRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const emeraldColor = isDark ? '#00ff88' : '#059669';
  const cyanColor = isDark ? '#00f0ff' : '#0284c7';

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (beaconLightRef.current) {
      const mat = beaconLightRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.0 + Math.sin(time * 3) * 0.8;
    }
    if (terminalRingRef.current) {
      terminalRingRef.current.rotation.z += delta * 0.45;
    }
  });

  return (
    <group position={[0, 0, -295]} name="section-07-contact">
      {/* 1. ROOM-STYLE DYNAMIC CONCENTRIC GLOW RINGS (Replaces flat gray floor & static rings) */}
      <StationFloorRing
        radius={[1.8, 2.1]}
        color={emeraldColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.01, 0]}
      />
      <StationFloorRing
        radius={[4.2, 4.5]}
        color={cyanColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.02, 0]}
      />
      <StationFloorRing
        radius={[6.8, 7.1]}
        color={emeraldColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.03, 0]}
      />

      {/* 2. Central Uplink Beacon Pillar (Aerospace Titanium Housing) */}
      <group position={[0, 0, 0]}>
        {/* Base Pillar Body */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 1.3, 1.6, 24]} />
          <meshStandardMaterial
            color={isDark ? '#0f172a' : '#f8fafc'}
            metalness={0.94}
            roughness={0.16}
          />
        </mesh>

        {/* Luminous Precision Uplink Concentric Ring */}
        <mesh ref={terminalRingRef} position={[0, 1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.85, 1.1, 48]} />
          <meshStandardMaterial
            color={emeraldColor}
            emissive={emeraldColor}
            emissiveIntensity={isDark ? 2.5 : 1.0}
          />
        </mesh>

        {/* Vertical Celestial Transmission Beam ascending skyward */}
        <mesh ref={beaconLightRef} position={[0, 16, 0]}>
          <cylinderGeometry args={[0.08, 0.35, 30, 16]} />
          <meshStandardMaterial
            color={emeraldColor}
            emissive={emeraldColor}
            emissiveIntensity={2.5}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>
    </group>
  );
};
