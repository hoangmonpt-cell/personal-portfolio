import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';
import { hudSound } from '../../utils/sound';
import { StationFloorRing } from './StationFloorRing';

interface WorkstationProps {
  onSelect: () => void;
  isSelected?: boolean;
}

export const Workstation: React.FC<WorkstationProps> = ({ onSelect, isSelected = false }) => {
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

  const accentColor = isSelected ? '#00ff88' : hovered ? '#00f0ff' : '#00a8ff';

  return (
    <group 
      name="workstation-station" 
      position={[0, 0, -1.8]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Interactive Selection Highlight Ring - Glow, Bobbing Float, Clockwise Rotation, Click Ripple */}
      <StationFloorRing
        radius={[1.65, 1.74]}
        color={accentColor}
        hovered={hovered}
        isSelected={isSelected}
        isClicked={clicked}
        position={[0, 0.022, 0.5]}
        hoverHeight={0.52}
      />

      {/* 1. Desk Table */}
      {/* Tabletop */}
      <mesh position={[0, 0.98, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.4]} />
        <meshStandardMaterial 
          color="#1e242d" 
          roughness={0.4} 
          metalness={0.2} 
        />
      </mesh>
      {/* Wood Edge Accent */}
      <mesh position={[0, 0.98, 0.7]}>
        <boxGeometry args={[3.2, 0.08, 0.04]} />
        <meshStandardMaterial color="#4a3728" roughness={0.6} />
      </mesh>
      {/* Desk Metal Legs */}
      {[-1.45, 1.45].map((lx, idx) => (
        <group key={`leg-${idx}`} position={[lx, 0.47, 0]}>
          <mesh castShadow position={[0, 0, -0.45]}>
            <cylinderGeometry args={[0.04, 0.04, 0.94]} />
            <meshStandardMaterial color="#0b0e14" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh castShadow position={[0, 0, 0.45]}>
            <cylinderGeometry args={[0.04, 0.04, 0.94]} />
            <meshStandardMaterial color="#0b0e14" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.45, 0]}>
            <boxGeometry args={[0.1, 0.04, 1.1]} />
            <meshStandardMaterial color="#0b0e14" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* 2. Desk Mat / Large Mousepad */}
      <mesh position={[0, 1.025, 0.15]} receiveShadow>
        <boxGeometry args={[1.8, 0.01, 0.7]} />
        <meshStandardMaterial color="#0a0d14" roughness={0.8} />
      </mesh>
      {/* Glowing Edge on Mousepad */}
      <mesh position={[0, 1.026, 0.15]}>
        <boxGeometry args={[1.82, 0.005, 0.72]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
      </mesh>

      {/* 3. Mechanical Keyboard */}
      <mesh position={[-0.1, 1.04, 0.22]} castShadow>
        <boxGeometry args={[0.65, 0.025, 0.22]} />
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Keyboard RGB Key Backlight */}
      <mesh position={[-0.1, 1.055, 0.22]}>
        <boxGeometry args={[0.6, 0.01, 0.19]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* 4. Gaming Mouse */}
      <mesh position={[0.45, 1.045, 0.24]} castShadow>
        <boxGeometry args={[0.1, 0.03, 0.16]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      {/* Mouse RGB light strip */}
      <mesh position={[0.45, 1.06, 0.24]}>
        <boxGeometry args={[0.02, 0.005, 0.08]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* 5. Center Main Ultrawide Monitor */}
      <group position={[0, 1.55, -0.15]}>
        {/* Monitor Stand Base & Arm */}
        <mesh position={[0, -0.5, -0.05]}>
          <cylinderGeometry args={[0.2, 0.22, 0.03, 24]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.25, -0.1]}>
          <boxGeometry args={[0.08, 0.5, 0.06]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Curved Frame */}
        <mesh castShadow>
          <boxGeometry args={[1.7, 0.75, 0.06]} />
          <meshStandardMaterial color="#090d16" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Screen Display - Game Engine & Code Theme */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[1.62, 0.68]} />
          <meshBasicMaterial color="#0d1b2a" />
        </mesh>
        {/* Simulated Code & Viewport Bars */}
        <mesh position={[-0.35, 0.05, 0.036]}>
          <planeGeometry args={[0.8, 0.5]} />
          <meshBasicMaterial color="#002b4d" />
        </mesh>
        <mesh position={[0.42, 0.05, 0.036]}>
          <planeGeometry args={[0.65, 0.5]} />
          <meshBasicMaterial color="#001a33" />
        </mesh>
        {/* 2D Flat Screen Engine Viewport Accent (Completely planar, zero mesh penetration) */}
        <mesh position={[-0.35, 0.05, 0.037]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshBasicMaterial color="#00ff88" opacity={0.6} transparent />
        </mesh>
        <mesh position={[-0.35, 0.05, 0.038]}>
          <ringGeometry args={[0.08, 0.085, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        {/* Monitor Status LED */}
        <mesh position={[0, -0.35, 0.036]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
      </group>

      {/* 6. Left Vertical Monitor (Documentation / Code) */}
      <group position={[-1.15, 1.55, -0.02]} rotation={[0, 0.35, 0]}>
        <mesh position={[0, -0.5, -0.05]}>
          <cylinderGeometry args={[0.14, 0.15, 0.03]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.25, -0.08]}>
          <boxGeometry args={[0.06, 0.5, 0.05]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.85, 0.05]} />
          <meshStandardMaterial color="#090d16" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[0.48, 0.78]} />
          <meshBasicMaterial color="#05101a" />
        </mesh>
        {/* Code lines simulation */}
        {[-0.25, -0.15, -0.05, 0.05, 0.15, 0.25].map((yLine, i) => (
          <mesh key={`code-line-${i}`} position={[-0.05 + (i % 2) * 0.04, yLine, 0.029]}>
            <planeGeometry args={[0.3, 0.02]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#00f0ff' : '#64748b'} />
          </mesh>
        ))}
      </group>

      {/* 7. Right Telemetry Monitor */}
      <group position={[1.15, 1.55, -0.02]} rotation={[0, -0.35, 0]}>
        <mesh position={[0, -0.5, -0.05]}>
          <cylinderGeometry args={[0.14, 0.15, 0.03]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.25, -0.08]}>
          <boxGeometry args={[0.06, 0.5, 0.05]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.5, 0.05]} />
          <meshStandardMaterial color="#090d16" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[0.58, 0.44]} />
          <meshBasicMaterial color="#091422" />
        </mesh>
        {/* Radar circle */}
        <mesh position={[0, 0, 0.029]}>
          <ringGeometry args={[0.12, 0.13, 24]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
      </group>

      {/* 8. Desktop PC Tower with Glowing Fans */}
      <group position={[1.3, 0.42, 0.05]}>
        {/* Case Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.32, 0.65, 0.62]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Glass Side Panel */}
        <mesh position={[-0.165, 0, 0]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshStandardMaterial color="#00f0ff" transparent opacity={0.25} roughness={0.1} />
        </mesh>
        {/* 3 Front RGB Fans */}
        {[-0.18, 0, 0.18].map((yFan, i) => (
          <mesh key={`fan-${i}`} position={[0, yFan, 0.315]}>
            <ringGeometry args={[0.05, 0.075, 16]} />
            <meshBasicMaterial color={i === 1 ? '#00f0ff' : '#00ff88'} />
          </mesh>
        ))}
      </group>

      {/* 9. Gamepad Controller */}
      <group position={[-0.6, 1.04, 0.28]} rotation={[0, 0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.04, 0.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* D-Pad & Buttons */}
        <mesh position={[-0.04, 0.025, 0]}>
          <boxGeometry args={[0.03, 0.01, 0.03]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0.04, 0.025, 0]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#ff0055" />
        </mesh>
      </group>

      {/* 10. Coffee Mug */}
      <group position={[-0.85, 1.06, 0.1]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.045, 0.1, 24]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Coffee level - lowered below rim and radius reduced to prevent Z-fighting */}
        <mesh position={[0, 0.032, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.005, 24]} />
          <meshStandardMaterial color="#2d170b" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh position={[-0.065, 0, 0]}>
          <boxGeometry args={[0.02, 0.06, 0.02]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </group>

      {/* 11. Ergonomic Gaming / Dev Chair */}
      <group position={[0, 0, 0.95]} rotation={[0, Math.PI, 0]}>
        {/* 5-Star Wheeled Base */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 8]} />
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </mesh>
        {/* Central Lift Piston */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        {/* Seat Cushion */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[0.55, 0.1, 0.52]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.95, -0.22]} rotation={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.8, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        {/* Cyan Accent Stripe on Backrest */}
        <mesh position={[0, 0.95, -0.17]} rotation={[-0.08, 0, 0]}>
          <boxGeometry args={[0.1, 0.65, 0.02]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
        {/* Armrests */}
        {[-0.32, 0.32].map((ax, idx) => (
          <group key={`arm-${idx}`} position={[ax, 0.72, 0]}>
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.3]} />
              <meshStandardMaterial color="#090d16" metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <boxGeometry args={[0.08, 0.03, 0.28]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 12. Floating Holographic Indicator for Hero Identity */}
      <group position={[0, 2.25, 0]}>
        {/* Holographic Header Bar */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.6, 0.28]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={hovered ? 0.4 : 0.2} />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <ringGeometry args={[0.8, 0.81, 32]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>
    </group>
  );
};
