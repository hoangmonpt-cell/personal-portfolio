import React, { useRef, useMemo } from 'react';
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

// Procedural soft glowing circular particle sprite
function createGlowSprite(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(0, 240, 255, 0.9)');
    gradient.addColorStop(0.6, 'rgba(0, 150, 255, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const Section01Hero: React.FC<SectionProps> = ({ theme, qualityTier = 'high' }) => {
  const portalRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const vortexShaderMeshRef = useRef<THREE.Mesh>(null);
  const swirlingPointsRef = useRef<THREE.Points>(null);
  const lightningLinesRef = useRef<THREE.LineSegments>(null);

  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#00f0ff' : '#0284c7';
  const secondaryColor = isDark ? '#38bdf8' : '#0369a1';

  const glowSprite = useMemo(() => createGlowSprite(), []);

  // 1. Custom Inward-Swirling Spiral Vortex Shader Material (Procedural Organic Singularity)
  const vortexShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(isDark ? '#00f0ff' : '#0284c7') },
        uCoreColor: { value: new THREE.Color('#ffffff') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uCoreColor;
        varying vec2 vUv;

        void main() {
          vec2 p = vUv - vec2(0.5);
          float r = length(p);
          float angle = atan(p.y, p.x);

          // Inward spiral logarithmic suction coordinate (Arms 1 & 2)
          float spiral1 = angle + 4.8 / (r + 0.12) - uTime * 2.4;
          float arm1 = sin(spiral1 * 3.0) * 0.5 + 0.5;
          float subArm1 = sin(spiral1 * 6.0 + uTime * 1.5) * 0.5 + 0.5;

          // Harmonic secondary spiral for rich fluid motion
          float spiral2 = angle + 3.2 / (r + 0.16) - uTime * 1.7;
          float arm2 = sin(spiral2 * 4.0) * 0.5 + 0.5;

          // Fine energetic plasma filaments
          float filament = sin(angle * 10.0 + r * 28.0 - uTime * 4.5) * 0.5 + 0.5;

          // Radial boundaries: soft outer perimeter & dark singularity event horizon at center
          float outerMask = smoothstep(0.46, 0.28, r);
          float innerCore = smoothstep(0.04, 0.14, r);

          // Combined intensity
          float spiralIntensity = (arm1 * 0.55 + subArm1 * 0.25 + arm2 * 0.2) * (0.8 + 0.2 * filament);
          float totalIntensity = spiralIntensity * outerMask * innerCore;

          // Accretion photon ring flare around the inner horizon
          float photonRing = smoothstep(0.04, 0.10, r) * smoothstep(0.24, 0.10, r) * 2.2;

          vec3 finalColor = mix(uColor * 1.5, uCoreColor, photonRing + totalIntensity * 0.35);
          float alpha = clamp(totalIntensity * 1.25 + photonRing * 0.95, 0.0, 1.0);

          gl_FragColor = vec4(finalColor, alpha * 0.92);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [isDark]);

  // 2. 380 Inward-Swirling Particle Stars (Converging spirally toward center)
  const particleCount = 380;
  const { particlePositions, particleData } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const data = new Float32Array(particleCount * 4); // [radius, angle, speed, inwardSpeed]

    for (let i = 0; i < particleCount; i++) {
      const r = 0.2 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.6;
      const inwardSpeed = 0.45 + Math.random() * 0.75;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(angle) * r;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

      data[i * 4] = r;
      data[i * 4 + 1] = angle;
      data[i * 4 + 2] = speed;
      data[i * 4 + 3] = inwardSpeed;
    }
    return { particlePositions: pos, particleData: data };
  }, []);

  // 3. Procedural Crackling Lightning Geometry Buffer (Allocated for up to 4 bolts)
  const maxBolts = 4;
  const pointsPerBolt = 12;
  const { lightningGeo } = useMemo(() => {
    const totalVertices = maxBolts * (pointsPerBolt - 1) * 2;
    const posArray = new Float32Array(totalVertices * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    return { lightningGeo: geo };
  }, []);

  // Lightning state machine: random burst interval, short flash duration, then completely vanishes
  const lightningState = useRef({
    active: false,
    timer: 1.2, // seconds until next strike
    duration: 0,
    activeBolts: 0,
    boltConfigs: [] as Array<{
      startAngle: number;
      endAngle: number;
      startR: number;
      endR: number;
    }>,
  });

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Update Inward Spiral Shader time uniform
    if (vortexShaderMaterial) {
      vortexShaderMaterial.uniforms.uTime.value = time;
    }

    if (portalRingRef.current) {
      portalRingRef.current.rotation.z += delta * 0.25;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.18;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.45;
      coreRef.current.rotation.x += delta * 0.2;
    }

    // 4. Update Inward-Spiraling Particle Stars: converge into the center vortex
    if (swirlingPointsRef.current) {
      const posAttr = swirlingPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const baseIdx = i * 4;
        let r = particleData[baseIdx];
        let angle = particleData[baseIdx + 1];
        const rotSpeed = particleData[baseIdx + 2];
        const inwardSpeed = particleData[baseIdx + 3];

        // Angular velocity increases as particle approaches center (conservation of momentum)
        angle += delta * (rotSpeed / (r + 0.18));
        // Suction towards core
        r -= delta * inwardSpeed * (1.1 + (3.0 - r) * 0.4);

        // Respawn at outer perimeter when absorbed into singularity
        if (r < 0.15) {
          r = 2.8 + Math.random() * 0.4;
          angle = Math.random() * Math.PI * 2;
        }

        particleData[baseIdx] = r;
        particleData[baseIdx + 1] = angle;

        array[i * 3] = Math.cos(angle) * r;
        array[i * 3 + 1] = Math.sin(angle) * r;
        array[i * 3 + 2] = Math.sin(angle * 2.0 + time * 3.0) * 0.12;
      }
      posAttr.needsUpdate = true;
    }

    // 5. Intermittent Crackling Lightning: strikes randomly, flashes briefly, then disappears
    const ls = lightningState.current;
    if (!ls.active) {
      ls.timer -= delta;
      if (ls.timer <= 0) {
        // Trigger a sudden random lightning strike!
        ls.active = true;
        // Burst duration: 0.08s to 0.16s (crackling flash)
        ls.duration = 0.08 + Math.random() * 0.08;
        // 1 to 3 random bolts
        ls.activeBolts = Math.floor(1 + Math.random() * 3);

        ls.boltConfigs = [];
        for (let b = 0; b < ls.activeBolts; b++) {
          const startAngle = Math.random() * Math.PI * 2;
          const endAngle = startAngle + (Math.random() - 0.5) * 1.4;
          const startR = 2.6 + (Math.random() - 0.5) * 0.2;
          const endR = 0.25 + Math.random() * 0.35;
          ls.boltConfigs.push({ startAngle, endAngle, startR, endR });
        }

        if (lightningLinesRef.current) {
          lightningLinesRef.current.visible = true;
        }
      } else {
        if (lightningLinesRef.current) {
          lightningLinesRef.current.visible = false;
        }
      }
    } else {
      ls.duration -= delta;
      if (ls.duration <= 0) {
        // Strike finished! Completely disappear into darkness
        ls.active = false;
        // Random pause interval before the next unpredictable strike (1.8s to 4.2s)
        ls.timer = 1.8 + Math.random() * 2.4;
        if (lightningLinesRef.current) {
          lightningLinesRef.current.visible = false;
        }
      } else {
        // While active, generate jagged lightning geometry and electric flicker
        if (lightningLinesRef.current) {
          lightningLinesRef.current.visible = true;
          const lineMat = lightningLinesRef.current.material as THREE.LineBasicMaterial;
          if (lineMat) {
            lineMat.opacity = Math.random() > 0.2 ? 1.0 : 0.4;
          }

          const posAttr = lightningLinesRef.current.geometry.attributes.position as THREE.BufferAttribute;
          const array = posAttr.array as Float32Array;
          array.fill(0); // clear unused segments

          let vertexIdx = 0;
          for (let b = 0; b < ls.activeBolts; b++) {
            const cfg = ls.boltConfigs[b];
            let prevX = Math.cos(cfg.startAngle) * cfg.startR;
            let prevY = Math.sin(cfg.startAngle) * cfg.startR;
            let prevZ = (Math.random() - 0.5) * 0.05;

            for (let pt = 1; pt < pointsPerBolt; pt++) {
              const t = pt / (pointsPerBolt - 1);
              const curAngle = THREE.MathUtils.lerp(cfg.startAngle, cfg.endAngle, t);
              const curR = THREE.MathUtils.lerp(cfg.startR, cfg.endR, t);

              // Perpendicular jagged jitter
              const jitter = Math.sin(t * Math.PI) * (Math.random() - 0.5) * 0.45;
              const curX = Math.cos(curAngle) * curR + (-Math.sin(curAngle)) * jitter;
              const curY = Math.sin(curAngle) * curR + (Math.cos(curAngle)) * jitter;
              const curZ = (Math.random() - 0.5) * 0.08;

              // Line segment: prev -> current
              array[vertexIdx++] = prevX;
              array[vertexIdx++] = prevY;
              array[vertexIdx++] = prevZ;

              array[vertexIdx++] = curX;
              array[vertexIdx++] = curY;
              array[vertexIdx++] = curZ;

              prevX = curX;
              prevY = curY;
              prevZ = curZ;
            }
          }
          posAttr.needsUpdate = true;
        }
      }
    }
  });

  return (
    <group position={[0, 0, 0]} name="section-01-hero">
      {/* 1. Grand Architectural Cyber Portal / Gateway at Z = -2 */}
      <group position={[0, 2.4, -2]}>
        {/* Layer A: Inward-Swirling Spiral Shader Vortex Disc (Procedural Organic Singularity) */}
        <mesh ref={vortexShaderMeshRef} position={[0, 0, -0.05]}>
          <planeGeometry args={[6.2, 6.2]} />
          <primitive object={vortexShaderMaterial} attach="material" />
        </mesh>

        {/* Layer B: 380 Swirling Particle Stars Converging Inward */}
        <points ref={swirlingPointsRef} position={[0, 0, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.075}
            color={primaryColor}
            map={glowSprite}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.95}
          />
        </points>

        {/* Layer C: Crackling Electric Lightning Arcs (Random intermittent strikes) */}
        <lineSegments ref={lightningLinesRef} position={[0, 0, 0.02]} visible={false}>
          <primitive object={lightningGeo} attach="geometry" />
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={1.0}
            blending={THREE.AdditiveBlending}
            linewidth={1.5}
          />
        </lineSegments>

        {/* Layer E: Outer Heavy Aerospace Alloy Torus Ring */}
        <mesh ref={outerRingRef} castShadow receiveShadow>
          <torusGeometry args={[3.3, 0.08, 24, 64]} />
          <meshStandardMaterial
            color={isDark ? '#1e293b' : '#94a3b8'}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Layer F: Inner Stepped Precision Alloy Ring */}
        <mesh ref={portalRingRef} castShadow receiveShadow>
          <torusGeometry args={[2.7, 0.06, 24, 64]} />
          <meshStandardMaterial
            color={isDark ? '#0f172a' : '#cbd5e1'}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Layer G: Glowing Optical Core Halo */}
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[2.58, 2.64, 64]} />
          <meshStandardMaterial
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={isDark ? 1.6 : 0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Layer H: Floating Refractive Optical Glass Core (Physical Dielectric Transmission) */}
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh ref={coreRef} position={[0, 0, 0]} castShadow>
            <octahedronGeometry args={[0.65, 0]} />
            {qualityTier === 'high' ? (
              <MeshTransmissionMaterial
                backside
                samples={6}
                thickness={0.8}
                chromaticAberration={0.06}
                anisotropy={0.3}
                distortion={0.2}
                distortionScale={0.3}
                temporalDistortion={0.1}
                roughness={0.12}
                color={primaryColor}
              />
            ) : (
              <meshPhysicalMaterial
                color={primaryColor}
                metalness={0.1}
                roughness={0.1}
                transmission={0.85}
                thickness={0.8}
                transparent
                opacity={0.9}
              />
            )}
          </mesh>
        </Float>

        {/* Gateway Architectural Support Monoliths */}
        {[-3.8, 3.8].map((x, i) => (
          <group key={`hero-gate-pillar-${i}`} position={[x, -0.6, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.45, 3.6, 0.6]} />
              <meshStandardMaterial
                color={isDark ? '#090d16' : '#cbd5e1'}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>
            <mesh position={[x > 0 ? -0.21 : 0.21, 0, 0]}>
              <boxGeometry args={[0.04, 3.4, 0.08]} />
              <meshStandardMaterial
                color={secondaryColor}
                emissive={secondaryColor}
                emissiveIntensity={isDark ? 1.5 : 0.6}
              />
            </mesh>
          </group>
        ))}

        {/* Room-Style Dynamic Concentric Floor Rings with Star Particles */}
        <StationFloorRing
          radius={[3.2, 3.5]}
          color={primaryColor}
          hovered={true}
          hoverHeight={0}
          position={[0, -2.4, 0]}
        />
      </group>
    </group>
  );
};
