import React from 'react';
import { 
  EffectComposer, 
  Bloom, 
  N8AO, 
  Vignette 
} from '@react-three/postprocessing';
import type { QualityTier } from '../../3d/RoomLighting';
import type { ThemeMode } from '../../../data/roomThemes';

interface CinematicPostProcessingProps {
  theme: ThemeMode;
  qualityTier: QualityTier;
  reducedMotion?: boolean;
}

export const CinematicPostProcessing: React.FC<CinematicPostProcessingProps> = ({
  theme,
  qualityTier,
  reducedMotion = false,
}) => {
  const isDark = theme === 'dark';

  // For low quality tier or reduced motion, run lightweight pass without expensive screen space AO
  if (qualityTier === 'low') {
    return (
      <EffectComposer multisampling={0}>
        <Bloom 
          luminanceThreshold={0.9} 
          luminanceSmoothing={0.3} 
          intensity={isDark ? 0.6 : 0.3} 
          mipmapBlur 
        />
        <Vignette 
          offset={0.3} 
          darkness={isDark ? 0.45 : 0.25} 
          eskil={false} 
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer 
      multisampling={qualityTier === 'high' && !reducedMotion ? 4 : 0}
      enableNormalPass={true}
    >
      {/* 1. N8AO: State-of-the-art realistic Screen Space Ambient Occlusion */}
      <N8AO
        aoRadius={1.8}
        distanceFalloff={2.5}
        intensity={isDark ? 2.6 : 1.6}
        color={isDark ? '#020408' : '#64748b'}
        quality={qualityTier === 'high' ? 'high' : 'medium'}
      />

      {/* 2. Selective Cinematic Bloom: High luminance threshold ensures only actual emissives glow */}
      <Bloom
        luminanceThreshold={0.88}
        luminanceSmoothing={0.25}
        intensity={isDark ? 0.85 : 0.45}
        mipmapBlur
      />

      {/* 3. Cinematic Lens Vignette: Focuses viewer attention toward central composition */}
      <Vignette
        offset={0.28}
        darkness={isDark ? 0.55 : 0.35}
        eskil={false}
      />
    </EffectComposer>
  );
};
