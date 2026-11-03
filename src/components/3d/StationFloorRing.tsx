import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface StationFloorRingProps {
  radius?: [number, number]; // [inner, outer]
  color?: string;
  hovered: boolean;
  isSelected?: boolean;
  position?: [number, number, number];
  isClicked?: boolean;
  hoverHeight?: number; // Height to hover at when active (halfway up object)
}

// Procedural soft radial glowing circular particle sprite (pure circle, zero seams)
function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const StationFloorRing: React.FC<StationFloorRingProps> = ({
  radius = [1.2, 1.3],
  color = '#00f0ff',
  hovered,
  isSelected = false,
  position = [0, 0.02, 0],
  isClicked = false,
  hoverHeight = 0.5,
}) => {
  const floatingGroupRef = useRef<THREE.Group>(null);
  const primaryRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRibbonRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const starsRef = useRef<THREE.Points>(null);

  // Click ripple shockwave state
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const shockwaveProgress = useRef(0);

  // Create texture once
  const glowTexture = useMemo(() => createGlowTexture(), []);

  // 1. Particle system configuration: 70 particles orbiting and rising vertically
  const particleCount = 70;
  const { positions, originalData } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const data = new Float32Array(particleCount * 4); // [angle, radius, speed, yOffset]
    const [innerR, outerR] = radius;
    const midR = (innerR + outerR) * 0.5;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = midR + (Math.random() - 0.5) * (outerR - innerR) * 1.2;
      const speed = 0.8 + Math.random() * 1.5;
      const yOffset = Math.random() * 0.35;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = yOffset;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      data[i * 4] = angle;
      data[i * 4 + 1] = r;
      data[i * 4 + 2] = speed;
      data[i * 4 + 3] = yOffset;
    }
    return { positions: pos, originalData: data };
  }, [radius]);

  // 2. Field of Twinkling Star Particles across the ground disc (replaces the flat/muddy solid circle disc)
  const starCount = 140;
  const { starPositions } = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const [, outerR] = radius;
    const maxR = outerR * 1.35;

    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * maxR; // Uniform distribution across disc
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = 0.008 + (Math.random() - 0.5) * 0.004;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return { starPositions: pos };
  }, [radius]);

  useEffect(() => {
    if (isClicked) {
      setShockwaveActive(true);
      shockwaveProgress.current = 0;
    }
  }, [isClicked]);

  useFrame((state, delta) => {
    const [, by] = position;
    const time = state.clock.elapsedTime;
    const active = hovered || isSelected;

    // Hover bobbing
    if (floatingGroupRef.current) {
      const targetY = active 
        ? by + hoverHeight + Math.sin(time * 3.0) * 0.025 
        : by;
      floatingGroupRef.current.position.y = THREE.MathUtils.lerp(
        floatingGroupRef.current.position.y,
        targetY,
        delta * 4.5
      );
    }

    // Rotating concentric rings
    if (primaryRingRef.current) {
      primaryRingRef.current.rotation.z -= delta * (active ? 2.2 : 0.6);
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * (active ? 1.6 : 0.4);
    }
    if (outerRibbonRef.current) {
      outerRibbonRef.current.rotation.z -= delta * (active ? 1.0 : 0.28);
    }

    // Ground twinkling stars breathing animation
    if (starsRef.current) {
      const mat = starsRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.65 + Math.sin(time * 2.4) * 0.25;
    }

    // Rising orbiting particles
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      const maxHeight = active ? 0.55 : 0.32;
      const speedMult = active ? 1.8 : 0.8;

      for (let i = 0; i < particleCount; i++) {
        const baseIdx = i * 4;
        let angle = originalData[baseIdx];
        const r = originalData[baseIdx + 1];
        const speed = originalData[baseIdx + 2] * speedMult;
        let y = array[i * 3 + 1];

        angle += delta * speed * 0.7;
        originalData[baseIdx] = angle;

        y += delta * (0.12 + speed * 0.08);
        if (y > maxHeight) {
          y = 0;
        }

        array[i * 3] = Math.cos(angle) * r;
        array[i * 3 + 1] = y;
        array[i * 3 + 2] = Math.sin(angle) * r;
      }
      posAttr.needsUpdate = true;
    }

    // Click Shockwave Ripple Effect
    if (shockwaveActive && pulseRingRef.current) {
      shockwaveProgress.current += delta * 2.8;
      const p = shockwaveProgress.current;
      if (p >= 1.0) {
        setShockwaveActive(false);
        pulseRingRef.current.scale.set(1, 1, 1);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0;
      } else {
        const s = 1.0 + p * 0.7;
        pulseRingRef.current.scale.set(s, s, 1);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = (1.0 - p) * 0.9;
      }
    }
  });

  const [innerR, outerR] = radius;
  const [posX, posY, posZ] = position;

  return (
    <group position={[posX, 0, posZ]}>
      {/* 1. Field of Twinkling Star Particles across the ground (Replaces solid gray/cyan ground disc) */}
      <points ref={starsRef} position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color={color}
          map={glowTexture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={0.8}
        />
      </points>

      {/* 2. Floating Concentric Glow Rings Group */}
      <group ref={floatingGroupRef} position={[0, posY, 0]}>
        {/* Lõi ruy băng năng lượng phát sáng chính (Intense glowing ring) */}
        <mesh
          ref={primaryRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[innerR, outerR, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={hovered || isSelected ? 1.0 : 0.8}
          />
        </mesh>

        {/* Lõi tia sáng laser cường độ cao màu trắng (White neon laser core triggering bloom) */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.001, 0]}
        >
          <ringGeometry args={[(innerR + outerR) * 0.5 - 0.015, (innerR + outerR) * 0.5 + 0.015, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.95}
          />
        </mesh>

        {/* Viền trong thanh mảnh xoay ngược chiều */}
        <mesh
          ref={innerRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.002, 0]}
        >
          <ringGeometry args={[innerR * 0.88, innerR * 0.92, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={hovered || isSelected ? 0.9 : 0.5}
          />
        </mesh>

        {/* Viền quỹ đạo ngoài đồng tâm */}
        <mesh
          ref={outerRibbonRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.003, 0]}
        >
          <ringGeometry args={[outerR + 0.04, outerR + 0.08, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={hovered || isSelected ? 0.75 : 0.35}
          />
        </mesh>

        {/* Hệ thống hạt bụi sáng bốc lên lơ lửng */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={hovered || isSelected ? 0.065 : 0.045}
            color={color}
            map={glowTexture}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={hovered || isSelected ? 0.95 : 0.65}
          />
        </points>

        {/* Hiệu ứng sóng xung kích khi click */}
        <mesh
          ref={pulseRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.004, 0]}
          visible={shockwaveActive}
        >
          <ringGeometry args={[innerR, outerR + 0.08, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0}
          />
        </mesh>
      </group>
    </group>
  );
};
