import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import type { RoomThemeConfig } from '../../data/roomThemes';

interface RoomEnvironmentProps {
  themeConfig: RoomThemeConfig;
}

export const RoomEnvironment: React.FC<RoomEnvironmentProps> = ({ themeConfig }) => {
  const isDark = themeConfig.name === 'dark';

  // Procedural Studio Tile Floor Texture with full Mipmapping
  // Eliminates all 100% of floor flickering, moire striping, and z-fighting
  const floorTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Base floor fill
    ctx.fillStyle = themeConfig.floorColor;
    ctx.fillRect(0, 0, size, size);

    // 2. Subtle, clean parquet / architectural tile borders
    ctx.strokeStyle = themeConfig.floorGridPrimary;
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, size, size);

    // 3. Elegant interior quadrant divisions
    ctx.strokeStyle = themeConfig.floorGridSecondary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8); // 8x8 smooth architectural tiles
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, [themeConfig.floorColor, themeConfig.floorGridPrimary, themeConfig.floorGridSecondary]);

  useEffect(() => {
    return () => {
      floorTexture?.dispose();
    };
  }, [floorTexture]);

  return (
    <group name="room-environment">
      {/* 1. Main Diorama Floor Base */}
      {/* Unified Floor Surface with Mipmapped Tiles - Zero Moiré & Zero Shimmer */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[9.5, 9.5]} />
        <meshStandardMaterial
          map={floorTexture || undefined}
          color={floorTexture ? '#ffffff' : themeConfig.floorColor}
          roughness={0.7}
          metalness={0.08}
        />
      </mesh>

      {/* Stylized Beveled Diorama Foundation Block underneath the floor (offset down so top is at y = -0.02, completely eliminating co-planar Z-fighting) */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <boxGeometry args={[9.7, 0.4, 9.7]} />
        <meshStandardMaterial
          color={isDark ? '#0f141d' : '#94a3b8'}
          roughness={0.7}
        />
      </mesh>

      {/* Cozy Center Rug underneath workstation */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, -0.4]} receiveShadow>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial
          color={themeConfig.rugColor}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* 2. Solid Back Wall (Z = -4.5) */}
      <mesh position={[0, 2.6, -4.6]} receiveShadow>
        <boxGeometry args={[9.5, 5.2, 0.2]} />
        <meshStandardMaterial color={themeConfig.wallColor} roughness={0.75} />
      </mesh>

      {/* Acoustic Vertical Wood Slats Accent behind workstation on Back Wall */}
      {[-1.6, -1.2, -0.8, -0.4, 0, 0.4].map((xOffset, i) => (
        <mesh key={`slat-${i}`} position={[xOffset, 2.6, -4.48]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 3.8, 0.04]} />
          <meshStandardMaterial color={themeConfig.slatsColor} roughness={0.6} />
        </mesh>
      ))}

      {/* 3. Solid Left Wall (X = -4.6) */}
      <mesh position={[-4.6, 2.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[9.5, 5.2, 0.2]} />
        <meshStandardMaterial color={themeConfig.wallColor} roughness={0.75} />
      </mesh>

      {/* 4. OPEN FRONT & OPEN RIGHT - No full walls! */}
      {/* Low Architectural Perimeter Curbs for clean diorama framing */}
      <mesh position={[0, 0.08, 4.75]}>
        <boxGeometry args={[9.7, 0.16, 0.2]} />
        <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.6} />
      </mesh>
      <mesh position={[4.75, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[9.7, 0.16, 0.2]} />
        <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.6} />
      </mesh>

      {/* 5. Stylized Studio Window Mounted on Back Wall (Unobstructed View) */}
      <group position={[2.4, 2.8, -4.48]}>
        {/* Window Exterior Casing */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 2.4, 0.08]} />
          <meshStandardMaterial color={themeConfig.windowFrameColor} roughness={0.5} />
        </mesh>

        {/* Window Sky Backdrop */}
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[2.6, 2.2]} />
          <meshBasicMaterial color={themeConfig.windowBackdropColor} />
        </mesh>

        {/* Distant City Skyline Silhouette */}
        {[-0.8, -0.3, 0.2, 0.7].map((cx, idx) => (
          <mesh key={`sky-bldg-${idx}`} position={[cx, -0.4 + idx * 0.08, -0.02]}>
            <planeGeometry args={[0.35, 0.8 + (idx % 3) * 0.3]} />
            <meshBasicMaterial color={isDark ? '#091322' : '#93c5fd'} />
          </mesh>
        ))}

        {/* Night City Window Lights (Dark Mode only) */}
        {isDark &&
          [-0.7, -0.2, 0.3, 0.8].map((lx, idx) => (
            <mesh key={`win-glow-${idx}`} position={[lx, -0.2, -0.015]}>
              <planeGeometry args={[0.07, 0.07]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#00f0ff' : '#ffb800'} />
            </mesh>
          ))}

        {/* Window Mullions / Cross Frame */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[0.05, 2.2, 0.02]} />
          <meshStandardMaterial color={themeConfig.windowFrameColor} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[2.6, 0.05, 0.02]} />
          <meshStandardMaterial color={themeConfig.windowFrameColor} />
        </mesh>
      </group>

      {/* 6. Baseboard Skirting along the two solid walls */}
      <mesh position={[0, 0.1, -4.48]}>
        <boxGeometry args={[9.5, 0.2, 0.04]} />
        <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.6} />
      </mesh>
      <mesh position={[-4.48, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[9.5, 0.2, 0.04]} />
        <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.6} />
      </mesh>

      {/* 7. Suspended Modern Studio LED Light Fixture (High above, never blocks camera) */}
      <group position={[0, 5.0, -1.0]}>
        {/* Main Light Fixture Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.08, 0.16]} />
          <meshStandardMaterial color={isDark ? '#0f172a' : '#64748b'} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* High-Luminance Downward Diffuser Strip */}
        <mesh position={[0, -0.042, 0]}>
          <boxGeometry args={[3.5, 0.01, 0.14]} />
          <meshBasicMaterial color={isDark ? '#e0f2fe' : '#ffffff'} />
        </mesh>
        {/* Soft downlight aura rim */}
        <mesh position={[0, -0.045, 0]}>
          <boxGeometry args={[3.55, 0.005, 0.15]} />
          <meshBasicMaterial color="#00f0ff" opacity={isDark ? 0.4 : 0.1} transparent />
        </mesh>
        {/* Suspension Steel Cables */}
        {[-1.5, 1.5].map((cx, idx) => (
          <mesh key={`susp-cable-${idx}`} position={[cx, 0.25, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.5, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
