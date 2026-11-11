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

export const Section02Projects: React.FC<SectionProps> = ({ theme }) => {
  const fortressTurretRef = useRef<THREE.Group>(null);
  const orbitalPadsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const accentColor = isDark ? '#00f0ff' : '#0284c7';
  const amberColor = isDark ? '#f59e0b' : '#d97706';
  const steelColor = isDark ? '#1e293b' : '#cbd5e1';

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (fortressTurretRef.current) {
      fortressTurretRef.current.rotation.y = Math.sin(time * 0.6) * 0.45;
    }
    if (orbitalPadsRef.current) {
      orbitalPadsRef.current.rotation.y += delta * 0.28;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.z = Math.sin(time * 1.2) * 0.2;
    }
  });

  return (
    <group position={[2.5, 0, -45]} name="section-02-projects">
      {/* 1. ROOM-STYLE FLOOR RING (Centered perfectly under card & camera focal line) */}
      <StationFloorRing
        radius={[3.2, 3.5]}
        color={accentColor}
        hovered={true}
        hoverHeight={0}
        position={[0.2, 0.01, -2.8]}
      />
      <StationFloorRing
        radius={[5.0, 5.3]}
        color={amberColor}
        hovered={true}
        hoverHeight={0}
        position={[0.2, 0.02, -2.8]}
      />

      {/* 2. Fortress Idle Citadel Monument (Tactical Armor & Defense Architecture) */}
      <group position={[-3.5, 0, -2]}>
        {/* Main Fortress Armored Bastion Base */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.4, 3.4]} />
          <meshStandardMaterial
            color={isDark ? '#0b1320' : '#cbd5e1'}
            metalness={0.85}
            roughness={0.22}
          />
        </mesh>

        {/* Bastion Slanted Armor Skirts */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.4, 2.8, 0.8, 4]} />
          <meshStandardMaterial
            color={isDark ? '#111c2e' : '#94a3b8'}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* 4 Heavy Alloy Corner Bastion Turrets */}
        {[
          [-1.7, -1.7],
          [-1.7, 1.7],
          [1.7, -1.7],
          [1.7, 1.7],
        ].map(([cx, cz], idx) => (
          <group key={`bastion-corner-${idx}`} position={[cx, 2.5, cz]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.35, 0.4, 0.9, 16]} />
              <meshStandardMaterial
                color={steelColor}
                metalness={0.95}
                roughness={0.18}
              />
            </mesh>
            {/* Sensor Optical Crystal */}
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={accentColor}
                emissive={accentColor}
                emissiveIntensity={isDark ? 1.5 : 0.6}
              />
            </mesh>
          </group>
        ))}

        {/* Citadel Heavy Turret Cannon Housing */}
        <group ref={fortressTurretRef} position={[0, 2.7, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.9, 1.0, 0.5, 24]} />
            <meshStandardMaterial
              color={isDark ? '#1e293b' : '#64748b'}
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Dual Precision Railgun Barrels */}
          {[-0.22, 0.22].map((bx, bidx) => (
            <mesh key={`barrel-${bidx}`} position={[bx, 0.1, 1.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 1.8, 16]} />
              <meshStandardMaterial
                color={isDark ? '#334155' : '#475569'}
                metalness={0.98}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>

        {/* Citadel Power Core (Floating Amber Energy Octahedron) */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh ref={coreRef} position={[0, 3.8, 0]} castShadow>
            <octahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              color={amberColor}
              metalness={0.3}
              roughness={0.1}
              emissive={amberColor}
              emissiveIntensity={isDark ? 1.8 : 0.8}
            />
          </mesh>
        </Float>
      </group>

      {/* 3. Orbiting Satellite Display Pods (Showcasing Project Architecture Artifacts) */}
      <group ref={orbitalPadsRef} position={[0, 2.2, 0]}>
        {[
          { angle: 0, label: 'Fortress Idle', color: amberColor },
          { angle: (Math.PI * 2) / 3, label: 'Rise of Elements', color: accentColor },
          { angle: ((Math.PI * 2) / 3) * 2, label: 'Portfolio 3D', color: '#00ff88' },
        ].map((pad, idx) => {
          const px = Math.cos(pad.angle) * 6.5;
          const pz = Math.sin(pad.angle) * 6.5;
          return (
            <group key={`project-pod-${idx}`} position={[px, 0, pz]}>
              {/* Pod Body: Dielectric Dark Hull */}
              <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.8, 0.9, 0.25, 24]} />
                <meshStandardMaterial
                  color={isDark ? '#0f172a' : '#cbd5e1'}
                  metalness={0.88}
                  roughness={0.2}
                />
              </mesh>
              {/* Luminous Edge Trim */}
              <mesh position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.72, 0.78, 32]} />
                <meshStandardMaterial
                  color={pad.color}
                  emissive={pad.color}
                  emissiveIntensity={isDark ? 1.6 : 0.7}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};
