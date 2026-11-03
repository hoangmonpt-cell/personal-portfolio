import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';
import { hudSound } from '../../utils/sound';

interface AchievementDisplayProps {
  onSelect: () => void;
  isSelected?: boolean;
}

export const AchievementDisplay: React.FC<AchievementDisplayProps> = ({
  onSelect,
  isSelected = false,
}) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

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
    onSelect();
  };

  const accentColor = isSelected ? '#00ff88' : hovered ? '#00f0ff' : '#f59e0b';

  return (
    <group
      name="achievement-display-station"
      position={[-4.35, 1.8, 1.5]}
      rotation={[0, Math.PI / 2, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* 1. Wall Backing Panel */}
      <mesh position={[0, 0, -0.05]} receiveShadow>
        <boxGeometry args={[2.2, 1.4, 0.04]} />
        <meshStandardMaterial color="#0b111c" roughness={0.7} />
      </mesh>
      {/* Glowing Border Trim */}
      <mesh position={[0, 0, -0.025]}>
        <boxGeometry args={[2.24, 1.44, 0.01]} />
        <meshBasicMaterial color={accentColor} transparent opacity={hovered || isSelected ? 0.8 : 0.25} />
      </mesh>

      {/* 2. Floating Glass Display Shelves */}
      {[-0.35, 0.25].map((sy, idx) => (
        <group key={`trophy-shelf-${idx}`} position={[0, sy, 0.15]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.9, 0.04, 0.36]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} transparent opacity={0.85} />
          </mesh>
          {/* Subtle LED Under-shelf glow strip */}
          <mesh position={[0, -0.025, 0]}>
            <boxGeometry args={[1.85, 0.01, 0.02]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      ))}

      {/* 3. Shelf Trophies & Milestones */}
      {/* Trophy 1: Low-poly Polyhedron Award */}
      <group position={[-0.55, 0.45, 0.15]}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.06, 6]} />
          <meshStandardMaterial color="#111827" metalness={0.9} />
        </mesh>
        {/* Golden Icosahedron Star */}
        <mesh position={[0, 0.14, 0]} castShadow>
          <icosahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Trophy 2: Engineering Pillar / Crystal Obelisk */}
      <group position={[0, 0.48, 0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.09, 0.05, 8]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* Cyan Tech Crystal */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <octahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#00f0ff" roughness={0.1} metalness={0.7} />
        </mesh>
      </group>

      {/* Trophy 3: Game Controller Mini-Statue */}
      <group position={[0.55, 0.45, 0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.06, 6]} />
          <meshStandardMaterial color="#111827" metalness={0.9} />
        </mesh>
        {/* Emerald Gem */}
        <mesh position={[0, 0.14, 0]} castShadow>
          <dodecahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#00ff88" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* 4. Lower Shelf: Verified Certifications Plaque */}
      {[-0.45, 0.45].map((px, i) => (
        <group key={`plaque-${i}`} position={[px, -0.15, 0.15]} rotation={[-0.15, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.28, 0.02]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.38, 0.24]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.06, 0.014]}>
            <circleGeometry args={[0.035, 16]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}

      {/* 5. Header Emblem */}
      <group position={[0, 0.78, 0]}>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.2, 0.18]} />
          <meshBasicMaterial color="#091322" />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[1.1, 0.01, 0.005]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>
    </group>
  );
};
