import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { ThemeMode } from '../../../data/roomThemes';
import type { QualityTier } from '../../3d/RoomLighting';
import { StationFloorRing } from '../../3d/StationFloorRing';

interface SectionProps {
  theme: ThemeMode;
  qualityTier?: QualityTier;
}

export const Section05AIWorkflow: React.FC<SectionProps> = ({ theme, qualityTier = 'high' }) => {
  const neuralCoreRef = useRef<THREE.Mesh>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  const isDark = theme === 'dark';
  const violetColor = isDark ? '#c084fc' : '#9333ea';
  const cyanColor = isDark ? '#00f0ff' : '#0284c7';
  const amberColor = isDark ? '#fbbf24' : '#d97706';

  const agentNodes = [
    { label: 'Prototyping Agent', color: cyanColor, angle: 0 },
    { label: 'Autonomous QA Engine', color: amberColor, angle: (Math.PI * 2) / 3 },
    { label: 'Doc & Test Scaffolder', color: violetColor, angle: ((Math.PI * 2) / 3) * 2 },
  ];

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (neuralCoreRef.current) {
      neuralCoreRef.current.rotation.y += delta * 0.4;
      neuralCoreRef.current.rotation.x = Math.sin(time * 0.6) * 0.2;
    }
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * 0.2;
      outerSphereRef.current.rotation.z += delta * 0.15;
    }
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group position={[0, 1.2, -195]} name="section-05-ai">
      {/* 1. ROOM-STYLE FLOOR RING (Replaces gray floor) */}
      <StationFloorRing
        radius={[2.5, 2.8]}
        color={violetColor}
        hovered={true}
        hoverHeight={0}
        position={[0, -1.18, 0]}
      />
      <StationFloorRing
        radius={[5.2, 5.5]}
        color={cyanColor}
        hovered={true}
        hoverHeight={0}
        position={[0, -1.16, 0]}
      />

      {/* 2. Central Neural Quantum Core (Glowing Inner Core) */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh ref={neuralCoreRef} position={[0, 1.5, 0]} castShadow>
          <icosahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color={violetColor}
            metalness={0.4}
            roughness={0.1}
            emissive={violetColor}
            emissiveIntensity={isDark ? 2.2 : 1.0}
          />
        </mesh>
      </Float>

      {/* 3. Outer Refractive Glass Quantum Shell (Dielectric Optical Transmission) */}
      <mesh ref={outerSphereRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[1.55, 32, 32]} />
        {qualityTier === 'high' ? (
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.6}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.15}
            distortionScale={0.2}
            temporalDistortion={0.08}
            roughness={0.08}
            color={isDark ? '#e9d5ff' : '#ffffff'}
          />
        ) : (
          <meshPhysicalMaterial
            color={isDark ? '#e9d5ff' : '#ffffff'}
            transmission={0.85}
            roughness={0.1}
            metalness={0.05}
            transparent
            opacity={0.7}
          />
        )}
      </mesh>

      {/* 4. Orbiting Specialized AI Agent Nodes */}
      <group ref={orbitGroupRef} position={[0, 1.5, 0]}>
        {agentNodes.map((agent, idx) => {
          const radius = 3.6;
          const ax = Math.cos(agent.angle) * radius;
          const az = Math.sin(agent.angle) * radius;
          return (
            <group key={`ai-agent-node-${idx}`} position={[ax, 0, az]}>
              {/* Agent Metallic Shell */}
              <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.3, 24, 24]} />
                <meshStandardMaterial
                  color={isDark ? '#1e293b' : '#cbd5e1'}
                  metalness={0.92}
                  roughness={0.15}
                />
              </mesh>
              {/* Emissive Core Ring */}
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.42, 0.025, 12, 32]} />
                <meshStandardMaterial
                  color={agent.color}
                  emissive={agent.color}
                  emissiveIntensity={isDark ? 2.0 : 0.8}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};
