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

export const Section03GameDev: React.FC<SectionProps> = ({ theme }) => {
  const fsmRingRef = useRef<THREE.Group>(null);
  const projectileRef = useRef<THREE.Mesh>(null);
  const gridScanRef = useRef<THREE.Mesh>(null);

  const isDark = theme === 'dark';
  const greenColor = isDark ? '#00ff88' : '#059669';
  const cyanColor = isDark ? '#00f0ff' : '#0284c7';
  const pinkColor = isDark ? '#ff0055' : '#e11d48';

  const fsmStates = [
    { label: 'SPAWN', color: cyanColor, angle: 0 },
    { label: 'PATROL', color: greenColor, angle: (Math.PI * 2) / 4 },
    { label: 'COMBAT', color: pinkColor, angle: ((Math.PI * 2) / 4) * 2 },
    { label: 'RECYCLE', color: '#ffb800', angle: ((Math.PI * 2) / 4) * 3 },
  ];

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (fsmRingRef.current) {
      fsmRingRef.current.rotation.y += delta * 0.35;
    }
    // Realistic Ballistic Arc Simulation
    if (projectileRef.current) {
      const arcT = (time * 1.2) % 1;
      const px = -2.2 + arcT * 4.4;
      const py = 0.8 + Math.sin(arcT * Math.PI) * 2.4;
      const pz = -2.2 + arcT * 4.4;
      projectileRef.current.position.set(px, py, pz);
    }
    if (gridScanRef.current) {
      gridScanRef.current.position.z = -2 + Math.sin(time * 1.8) * 4.2;
    }
  });

  return (
    <group position={[-4, 0, -95]} name="section-03-gamedev">
      {/* 1. ROOM-STYLE FLOOR RING (Replaces gray floor) */}
      <StationFloorRing
        radius={[3.2, 3.5]}
        color={cyanColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.01, 0]}
      />
      <StationFloorRing
        radius={[5.8, 6.1]}
        color={greenColor}
        hovered={true}
        hoverHeight={0}
        position={[0, 0.02, 0]}
      />

      {/* Sweeping Dynamic Raycast / Spatial Partitioning Beam */}
      <mesh ref={gridScanRef} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 0.25]} />
        <meshStandardMaterial
          color={greenColor}
          emissive={greenColor}
          emissiveIntensity={isDark ? 1.8 : 0.8}
        />
      </mesh>

      {/* 2. Central Simulation Nexus Pillar */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.7, 2.4, 24]} />
          <meshStandardMaterial
            color={isDark ? '#0f172a' : '#f8fafc'}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
        <mesh position={[0, 2.45, 0]}>
          <cylinderGeometry args={[0.7, 0.5, 0.1, 24]} />
          <meshStandardMaterial
            color={cyanColor}
            emissive={cyanColor}
            emissiveIntensity={isDark ? 1.4 : 0.8}
          />
        </mesh>
      </group>

      {/* 3. Finite State Machine (FSM) Node Ring in 3D Space */}
      <group position={[0, 2.6, 0]}>
        <group ref={fsmRingRef}>
          {/* Orbital Mechanical Ring Track */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[2.6, 0.04, 16, 64]} />
            <meshStandardMaterial
              color={isDark ? '#1e293b' : '#e2e8f0'}
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>

          {/* 4 State Nodes with Physical Dielectric Spheres */}
          {fsmStates.map((st, idx) => {
            const nx = Math.cos(st.angle) * 2.6;
            const nz = Math.sin(st.angle) * 2.6;
            return (
              <group key={`fsm-node-${idx}`} position={[nx, 0, nz]}>
                <mesh castShadow receiveShadow>
                  <sphereGeometry args={[0.28, 24, 24]} />
                  <meshStandardMaterial
                    color={st.color}
                    metalness={0.4}
                    roughness={0.15}
                    emissive={st.color}
                    emissiveIntensity={isDark ? 1.5 : 0.5}
                  />
                </mesh>
                {/* Node Outer Orbit Ring */}
                <mesh rotation={[Math.PI / 4, 0, 0]}>
                  <torusGeometry args={[0.38, 0.02, 12, 32]} />
                  <meshStandardMaterial
                    color={isDark ? '#334155' : '#cbd5e1'}
                    metalness={0.9}
                    roughness={0.2}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* 4. Active Ballistic Kinetic Projectile Sphere */}
      <mesh ref={projectileRef} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color={pinkColor}
          emissive={pinkColor}
          emissiveIntensity={isDark ? 2.5 : 1.2}
        />
      </mesh>
    </group>
  );
};
