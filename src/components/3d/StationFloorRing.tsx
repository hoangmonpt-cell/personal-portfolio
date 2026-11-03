import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface StationFloorRingProps {
  radius?: [number, number]; // [inner, outer]
  color?: string;
  hovered: boolean;
  isSelected?: boolean;
  position?: [number, number, number];
  isClicked?: boolean;
}

export const StationFloorRing: React.FC<StationFloorRingProps> = ({
  radius = [1.3, 1.38],
  color = '#00f0ff',
  hovered,
  isSelected = false,
  position = [0, 0.02, 0],
  isClicked = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const primaryRingRef = useRef<THREE.Mesh>(null);
  const pulseRingRef = useRef<THREE.Mesh>(null);

  // Click ripple shockwave state
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const shockwaveProgress = useRef(0);

  useEffect(() => {
    if (isClicked) {
      setShockwaveActive(true);
      shockwaveProgress.current = 0;
    }
  }, [isClicked]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const [, by] = position;

    if (hovered || isSelected) {
      // 1. Bay lên xuống nhẹ nhàng (smooth bobbing float)
      const floatY = by + 0.04 + Math.sin(state.clock.elapsedTime * 4.2) * 0.025;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatY, delta * 8);

      // 2. Quay tròn theo chiều kim đồng hồ (Clockwise rotation around local Z axis because mesh is rotated -PI/2 X)
      if (primaryRingRef.current) {
        primaryRingRef.current.rotation.z -= delta * 2.6;
      }
    } else {
      // Drop smoothly back to rest position on floor
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, by, delta * 6);
      if (primaryRingRef.current) {
        primaryRingRef.current.rotation.z -= delta * 0.4;
      }
    }

    // 3. Click Shockwave Ripple Effect
    if (shockwaveActive && pulseRingRef.current) {
      shockwaveProgress.current += delta * 2.8; // ~350ms duration
      const p = shockwaveProgress.current;
      if (p >= 1.0) {
        setShockwaveActive(false);
        pulseRingRef.current.scale.set(1, 1, 1);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0;
      } else {
        const s = 1.0 + p * 0.75; // scales from 1.0 to 1.75
        pulseRingRef.current.scale.set(s, s, 1);
        const mat = pulseRingRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = (1.0 - p) * 0.95;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Primary Interactive Ring */}
      <mesh
        ref={primaryRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[radius[0], radius[1], 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          depthWrite={false}
          opacity={hovered || isSelected ? 1.0 : 0.32}
        />
      </mesh>

      {/* Decorative Inner Accent Ring when hovered */}
      {(hovered || isSelected) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius[0] - 0.06, radius[0] - 0.05, 36]} />
          <meshBasicMaterial color={color} transparent opacity={0.65} depthWrite={false} />
        </mesh>
      )}

      {/* Click Shockwave Expanding Ring */}
      <mesh
        ref={pulseRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        visible={shockwaveActive}
      >
        <ringGeometry args={[radius[0], radius[1] + 0.04, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          depthWrite={false}
          opacity={0}
        />
      </mesh>
    </group>
  );
};

