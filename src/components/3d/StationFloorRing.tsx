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
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
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
  const groundAuraRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Click ripple shockwave state
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const shockwaveProgress = useRef(0);

  // Create texture once
  const glowTexture = useMemo(() => createGlowTexture(), []);

  // Particle system configuration: 70 particles orbiting and rising vertically (inspired by reference images 3, 4, 5)
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

    // 1. Khi di con trỏ vào thì bay lên cao khoảng một nửa vật thể và bay lơ lửng, khi ra thì về lại dưới chân
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

    // 2. Xoay tròn các dải năng lượng đồng tâm mượt mà (thuần mặt phẳng ngang, không nghiêng để không bị cắt sàn)
    if (primaryRingRef.current) {
      primaryRingRef.current.rotation.z -= delta * (active ? 2.2 : 0.5);
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * (active ? 1.6 : 0.35);
    }
    if (outerRibbonRef.current) {
      outerRibbonRef.current.rotation.z -= delta * (active ? 1.0 : 0.25);
    }

    // 3. Đĩa hào quang trên sàn sáng theo nhịp thở êm ái
    if (groundAuraRef.current) {
      const auraMat = groundAuraRef.current.material as THREE.MeshBasicMaterial;
      const baseAura = active ? 0.35 : 0.12;
      auraMat.opacity = baseAura + Math.sin(time * 2.8) * 0.05;
    }

    // 4. Các hạt bụi sáng lấp lánh xoay quanh và bay bốc lên trên
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

        // Quỹ đạo xoay quanh vòng
        angle += delta * speed * 0.7;
        originalData[baseIdx] = angle;

        // Bốc lên theo phương thẳng đứng
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

    // 5. Click Shockwave Ripple Effect
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
      {/* 1. Đĩa hào quang cố định luôn ở dưới chân sàn (Soft Ground Glow Disc) */}
      <mesh
        ref={groundAuraRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.008, 0]}
      >
        <circleGeometry args={[outerR * 1.35, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          opacity={hovered || isSelected ? 0.35 : 0.12}
        />
      </mesh>

      {/* 2. Cụm vòng năng lượng và bụi sáng bay lơ lửng khi hover (Floating Group) */}
      <group ref={floatingGroupRef} position={[0, posY, 0]}>
        {/* Lõi ruy băng năng lượng phát sáng chính */}
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
            opacity={hovered || isSelected ? 0.95 : 0.45}
          />
        </mesh>

        {/* Viền trong thanh mảnh xoay ngược chiều */}
        <mesh
          ref={innerRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.001, 0]}
        >
          <ringGeometry args={[innerR * 0.88, innerR * 0.92, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={hovered || isSelected ? 0.8 : 0.3}
          />
        </mesh>

        {/* Viền quỹ đạo ngoài đồng tâm */}
        <mesh
          ref={outerRibbonRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.002, 0]}
        >
          <ringGeometry args={[outerR + 0.03, outerR + 0.06, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={hovered || isSelected ? 0.65 : 0.22}
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
            opacity={hovered || isSelected ? 0.95 : 0.55}
          />
        </points>

        {/* Hiệu ứng sóng xung kích khi click */}
        <mesh
          ref={pulseRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.003, 0]}
          visible={shockwaveActive}
        >
          <ringGeometry args={[innerR, outerR + 0.06, 64]} />
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
