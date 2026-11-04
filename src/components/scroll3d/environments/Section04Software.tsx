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

export const Section04Software: React.FC<SectionProps> = ({ theme }) => {
  const dataTowerRef = useRef<THREE.Group>(null);
  const dataStreamRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const blueColor = isDark ? '#38bdf8' : '#0284c7';
  const purpleColor = isDark ? '#a855f7' : '#7e22ce';
  const greenColor = isDark ? '#00ff88' : '#059669';

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (dataTowerRef.current) {
      dataTowerRef.current.rotation.y += delta * 0.15;
    }
    if (dataStreamRef.current) {
      dataStreamRef.current.position.x = Math.sin(time * 2.5) * 3.5;
    }
  });

  return (
    <group position={[3.5, 0, -145]} name="section-04-software">
      {/* 1. ROOM-STYLE FLOOR RING under Architecture Station */}
      <StationFloorRing
        radius={[3.2, 3.5]}
        color={blueColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.01, -3.0]}
      />
      <StationFloorRing
        radius={[5.2, 5.5]}
        color={purpleColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.02, -3.0]}
      />

      {/* Structural Data Bus Lines in Void (No gray floor) */}
      {[-4, -2, 0, 2, 4].map((lx, idx) => (
        <mesh key={`data-bus-${idx}`} position={[lx, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 16]} />
          <meshStandardMaterial
            color={blueColor}
            emissive={blueColor}
            emissiveIntensity={isDark ? 0.8 : 0.3}
          />
        </mesh>
      ))}

      {/* 2. Three Architecture Tier Monoliths: Presentation, Domain Core, Infrastructure */}
      {[
        { x: -3.5, h: 3.4, color: blueColor, label: 'Presentation' },
        { x: 0, h: 4.6, color: purpleColor, label: 'Domain Core' },
        { x: 3.5, h: 3.8, color: greenColor, label: 'Infrastructure' },
      ].map((tier, idx) => (
        <group key={`arch-tier-${idx}`} position={[tier.x, 0, -1]}>
          {/* Main Beveled Obsidian Monolith */}
          <mesh position={[0, tier.h / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.7, tier.h, 1.7]} />
            <meshStandardMaterial
              color={isDark ? '#0b1322' : '#f8fafc'}
              metalness={0.88}
              roughness={0.18}
            />
          </mesh>

          {/* Precision Architectural Metal Cap and Trim */}
          <mesh position={[0, tier.h + 0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.76, 0.1, 1.76]} />
            <meshStandardMaterial
              color={isDark ? '#1e293b' : '#ffffff'}
              metalness={0.95}
              roughness={0.12}
            />
          </mesh>

          {/* Luminous High-Intensity Core Inset Band */}
          <mesh position={[0, tier.h * 0.75, 0]}>
            <boxGeometry args={[1.72, 0.08, 1.72]} />
            <meshStandardMaterial
              color={tier.color}
              emissive={tier.color}
              emissiveIntensity={isDark ? 2.2 : 1.0}
            />
          </mesh>

          {/* Floating Geometric Node on Top */}
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <mesh position={[0, tier.h + 0.55, 0]} castShadow>
              <dodecahedronGeometry args={[0.34, 0]} />
              <meshStandardMaterial
                color={tier.color}
                metalness={0.6}
                roughness={0.1}
                emissive={tier.color}
                emissiveIntensity={isDark ? 1.6 : 0.6}
              />
            </mesh>
          </Float>
        </group>
      ))}

      {/* 3. Central Physical Data Stream Pipe bridging monoliths */}
      <group position={[0, 2.6, -1]}>
        {/* Exterior Glass Optical Conduit */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 7.8, 16]} />
          <meshPhysicalMaterial
            color={blueColor}
            transmission={0.85}
            roughness={0.1}
            metalness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Traveling High-Speed Data Packet */}
        <mesh ref={dataStreamRef}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={blueColor}
            emissiveIntensity={isDark ? 3.0 : 1.5}
          />
        </mesh>
      </group>
    </group>
  );
};
