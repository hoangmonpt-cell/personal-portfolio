import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { hudSound } from '../../utils/sound';
import { StationFloorRing } from './StationFloorRing';

interface ProjectDisplayProps {
  onSelect: () => void;
  isSelected?: boolean;
}

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  onSelect,
  isSelected = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const floatingGroupRef = useRef<THREE.Group>(null);
  useCursor(hovered);

  useFrame((state) => {
    if (floatingGroupRef.current) {
      // Gentle floating animation
      floatingGroupRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 1.8) * 0.04;
      floatingGroupRef.current.rotation.y += 0.008;
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    hudSound.playHover();
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    hudSound.playClick();
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
    onSelect();
  };

  const accentColor = isSelected ? '#00ff88' : hovered ? '#00f0ff' : '#38bdf8';

  return (
    <group
      name="project-display-station"
      position={[3.2, 0, -2.2]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Floor Highlight Ring - Glow, Bobbing Float, Clockwise Rotation, Click Ripple */}
      <StationFloorRing
        radius={[1.2, 1.28]}
        color={accentColor}
        hovered={hovered}
        isSelected={isSelected}
        isClicked={clicked}
        position={[0, 0.02, 0]}
      />

      {/* 1. Pedestal Base - Sci-Fi Hexagonal Kiosk */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.85, 0.9, 6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Glowing Trim Ring on Pedestal */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.71, 0.71, 0.04, 6]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* 2. Holographic Projector Emitter Lens */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.04, 24]} />
        <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 24]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* 3. Floating Holographic Project Display Group */}
      <group ref={floatingGroupRef} position={[0, 1.6, 0]}>
        {/* Hologram Central Diamond */}
        <mesh>
          <octahedronGeometry args={[0.28, 0]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>

        {/* Orbiting Hologram Project Cards */}
        {[0, 1, 2].map((idx) => {
          const angle = (idx * Math.PI * 2) / 3;
          const px = Math.cos(angle) * 0.65;
          const pz = Math.sin(angle) * 0.65;
          return (
            <group key={`holo-card-${idx}`} position={[px, 0, pz]} rotation={[0, -angle, 0]}>
              <mesh>
                <planeGeometry args={[0.4, 0.28]} />
                <meshBasicMaterial
                  color="#0369a1"
                  transparent
                  opacity={hovered ? 0.7 : 0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* Card glowing border */}
              <mesh position={[0, 0, 0.002]}>
                <ringGeometry args={[0.18, 0.19, 4]} />
                <meshBasicMaterial color={accentColor} side={THREE.DoubleSide} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 4. Display Label Plate */}
      <group position={[0, 1.05, 0.75]} rotation={[-0.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.9, 0.32, 0.04]} />
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.82, 0.26]} />
          <meshBasicMaterial color="#001e38" />
        </mesh>
        <mesh position={[0, 0, 0.024]}>
          <ringGeometry args={[0.07, 0.08, 16]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>
    </group>
  );
};
