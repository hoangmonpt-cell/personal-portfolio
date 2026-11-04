import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import type { ThemeMode } from '../../../data/roomThemes';
import type { QualityTier } from '../../3d/RoomLighting';
import { StationFloorRing } from '../../3d/StationFloorRing';

interface SectionProps {
  theme: ThemeMode;
  qualityTier?: QualityTier;
}

export const Section06About: React.FC<SectionProps> = ({ theme }) => {
  const badgeFrameRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const warmColor = isDark ? '#fbbf24' : '#d97706';
  const slateColor = isDark ? '#38bdf8' : '#0284c7';

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
    if (badgeFrameRef.current) {
      badgeFrameRef.current.position.y = 1.9 + Math.sin(time * 1.2) * 0.08;
    }
  });

  return (
    <group position={[-2, 0, -245]} name="section-06-about">
      {/* 1. ROOM-STYLE FLOOR RING (Replaces gray floor) */}
      <StationFloorRing
        radius={[3.5, 3.8]}
        color={warmColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.01, 0]}
      />
      <StationFloorRing
        radius={[6.0, 6.3]}
        color={slateColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.02, 0]}
      />

      {/* 2. Floating Smoked Glass Monolith / Developer Monument */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={badgeFrameRef} position={[0, 1.9, 0]}>
          {/* Main Smoked Architectural Glass Monolith */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.4, 3.4, 0.16]} />
            <meshPhysicalMaterial
              color={isDark ? '#0f172a' : '#f8fafc'}
              transmission={0.7}
              roughness={0.15}
              metalness={0.3}
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* Brushed Gold Bevel Frame */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.46, 3.46, 0.08]} />
            <meshStandardMaterial
              color={warmColor}
              metalness={0.92}
              roughness={0.2}
            />
          </mesh>

          {/* Center Jewel Crest (Titanium Octahedron) */}
          <mesh position={[0, 0.6, 0.16]} castShadow>
            <octahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial
              color={slateColor}
              metalness={0.95}
              roughness={0.12}
              emissive={slateColor}
              emissiveIntensity={isDark ? 1.2 : 0.4}
            />
          </mesh>
        </group>
      </Float>

      {/* 3. Three Career Foundation Pillars */}
      {[
        { x: -4.0, label: 'Gameplay Systems' },
        { x: 0, label: 'Performance Optimization' },
        { x: 4.0, label: 'Clean Architecture' },
      ].map((pil, idx) => (
        <group key={`about-pil-${idx}`} position={[pil.x, 0, -3]}>
          <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.4, 0.5, 1.6, 24]} />
            <meshStandardMaterial
              color={isDark ? '#1e293b' : '#94a3b8'}
              metalness={0.9}
              roughness={0.22}
            />
          </mesh>
          <mesh position={[0, 1.62, 0]}>
            <cylinderGeometry args={[0.45, 0.4, 0.05, 24]} />
            <meshStandardMaterial
              color={warmColor}
              emissive={warmColor}
              emissiveIntensity={isDark ? 1.5 : 0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
