import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';
import { hudSound } from '../../utils/sound';
import { StationFloorRing } from './StationFloorRing';

interface SkillDisplayProps {
  onSelect: () => void;
  isSelected?: boolean;
}

export const SkillDisplay: React.FC<SkillDisplayProps> = ({ onSelect, isSelected = false }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
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
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
    onSelect();
  };

  const accentColor = isSelected ? '#00ff88' : hovered ? '#00f0ff' : '#059669';

  return (
    <group
      name="skill-display-station"
      position={[-3.3, 0, -1.8]}
      rotation={[0, 0.45, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Floor Highlight Ring - Glow, Bobbing Float, Clockwise Rotation, Click Ripple */}
      <StationFloorRing
        radius={[1.3, 1.38]}
        color={accentColor}
        hovered={hovered}
        isSelected={isSelected}
        isClicked={clicked}
        position={[0, 0.02, 0.5]}
        hoverHeight={0.65}
      />

      {/* 1. Industrial Wooden / Steel Shelf Frame */}
      {/* 4 Vertical Steel Pillars */}
      {[
        [-0.9, -0.35],
        [-0.9, 0.35],
        [0.9, -0.35],
        [0.9, 0.35],
      ].map(([px, pz], idx) => (
        <mesh key={`post-${idx}`} position={[px, 1.4, pz]} castShadow>
          <boxGeometry args={[0.06, 2.8, 0.06]} />
          <meshStandardMaterial color="#0b0e14" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* 4 Shelf Plates (Dark Wood with bevel) */}
      {[0.2, 0.95, 1.7, 2.45].map((sy, idx) => (
        <mesh key={`shelf-${idx}`} position={[0, sy, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.06, 0.8]} />
          <meshStandardMaterial color="#2d2118" roughness={0.6} />
        </mesh>
      ))}

      {/* Back Mesh Wire Panel */}
      <mesh position={[0, 1.35, -0.38]}>
        <planeGeometry args={[1.75, 2.3]} />
        <meshStandardMaterial color="#111827" wireframe />
      </mesh>

      {/* 2. Top Shelf: AI & Development Tools Modules */}
      <group position={[0, 2.5, 0]}>
        {[-0.6, -0.2, 0.2, 0.6].map((cx, i) => (
          <group key={`ai-mod-${i}`} position={[cx, 0.16, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.22, 0.26, 0.3]} />
              <meshStandardMaterial color="#1e1b18" roughness={0.5} />
            </mesh>
            {/* Amber glowing tech indicator */}
            <mesh position={[0, 0, 0.155]}>
              <planeGeometry args={[0.15, 0.08]} />
              <meshBasicMaterial color="#ffb800" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. Middle Shelf: Game Development Core Systems */}
      <group position={[0, 1.75, 0]}>
        {/* Game Engine Cartridges / Game Boxes */}
        {[-0.65, -0.4, -0.15, 0.1, 0.35, 0.6].map((gx, i) => (
          <mesh key={`game-box-${i}`} position={[gx, 0.18, 0]} castShadow>
            <boxGeometry args={[0.18, 0.3, 0.4]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#0f766e' : '#0284c7'} roughness={0.4} />
          </mesh>
        ))}
        {/* Glowing Unity / Gameplay Core Sensor */}
        <mesh position={[0, 0.04, 0.25]}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
      </group>

      {/* 4. Lower Shelf: Software Architecture & Tooling */}
      <group position={[0, 1.0, 0]}>
        {/* Technical Manuals & Clean Code Binders */}
        {[-0.7, -0.5, -0.3, 0.2, 0.4, 0.6].map((bx, i) => (
          <mesh key={`book-${i}`} position={[bx, 0.22, 0]} rotation={[0, 0, i === 2 ? 0.2 : 0]} castShadow>
            <boxGeometry args={[0.12, 0.38, 0.45]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#1e293b' : '#334155'} roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* 5. Header Sign on Top of Shelf */}
      <group position={[0, 2.9, 0]}>
        <mesh>
          <boxGeometry args={[1.4, 0.25, 0.06]} />
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[1.3, 0.18]} />
          <meshBasicMaterial color="#064e3b" />
        </mesh>
        <mesh position={[0, 0, 0.034]}>
          <boxGeometry args={[1.2, 0.015, 0.005]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>
    </group>
  );
};
