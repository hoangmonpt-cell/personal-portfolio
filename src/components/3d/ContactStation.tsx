import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { hudSound } from '../../utils/sound';
import { StationFloorRing } from './StationFloorRing';

interface ContactStationProps {
  onSelect: () => void;
  isSelected?: boolean;
}

export const ContactStation: React.FC<ContactStationProps> = ({
  onSelect,
  isSelected = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const radarWaveRef = useRef<THREE.Mesh>(null);
  useCursor(hovered);

  useFrame((state) => {
    if (radarWaveRef.current) {
      const s = 1.0 + (Math.sin(state.clock.elapsedTime * 2.5) + 1.0) * 0.15;
      radarWaveRef.current.scale.set(s, s, s);
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

  const accentColor = isSelected ? '#00ff88' : hovered ? '#00f0ff' : '#06b6d4';

  return (
    <group
      name="contact-station"
      position={[2.8, 0, 2.2]}
      rotation={[0, -0.6, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Floor Highlight Ring - Glow, Bobbing Float, Clockwise Rotation, Click Ripple */}
      <StationFloorRing
        radius={[1.1, 1.18]}
        color={accentColor}
        hovered={hovered}
        isSelected={isSelected}
        isClicked={clicked}
        position={[0, 0.02, 0]}
      />

      {/* 1. Terminal Desk Base */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.75, 0.9, 8]} />
        <meshStandardMaterial color="#0b111a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Console Angled Top Panel */}
      <group position={[0, 0.92, 0]} rotation={[-0.3, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.08, 0.7]} />
          <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Radar Hologram Screen */}
        <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.26, 24]} />
          <meshBasicMaterial color="#042f2e" />
        </mesh>
        {/* Pulsing Radar Ring */}
        <mesh ref={radarWaveRef} position={[0, 0.048, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.2, 24]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
        {/* Transmission Frequency Sliders / Dials */}
        {[-0.3, -0.2, 0.2, 0.3].map((dx, i) => (
          <mesh key={`dial-${i}`} position={[dx, 0.05, 0.18]}>
            <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
        ))}
      </group>

      {/* 2. Communication Satellite Antenna Mast */}
      <group position={[0.42, 0.9, -0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.9, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
        {/* Antenna Dish / Transceiver Node */}
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>

      {/* 3. Floating Holographic Comms Icon */}
      <group position={[0, 1.65, 0]}>
        <mesh>
          <torusGeometry args={[0.22, 0.015, 8, 24]} />
          <meshBasicMaterial color={accentColor} transparent opacity={hovered ? 0.8 : 0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.02]} />
          <meshBasicMaterial color="#00ff88" />
        </mesh>
      </group>
    </group>
  );
};
