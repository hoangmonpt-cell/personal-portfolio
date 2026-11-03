import React from 'react';
import type { ThemeMode } from '../../data/roomThemes';
import type { QualityTier } from '../3d/RoomLighting';
import { RealisticHighway } from './materials/RealisticHighway';
import { Section01Hero } from './environments/Section01Hero';
import { Section02Projects } from './environments/Section02Projects';
import { Section03GameDev } from './environments/Section03GameDev';
import { Section04Software } from './environments/Section04Software';
import { Section05AIWorkflow } from './environments/Section05AIWorkflow';
import { Section06About } from './environments/Section06About';
import { Section07Contact } from './environments/Section07Contact';

interface ScrollWorldProps {
  theme: ThemeMode;
  qualityTier: QualityTier;
}

export const ScrollWorld: React.FC<ScrollWorldProps> = ({ theme, qualityTier }) => {
  return (
    <group name="continuous-cinematic-scroll-world">
      {/* 1. Continuous Reflective Highway Flight Deck with Guide Rails and Light Motes */}
      <RealisticHighway theme={theme} qualityTier={qualityTier} />

      {/* 2. The 7 Realistic Physical Section Environments */}
      <Section01Hero theme={theme} qualityTier={qualityTier} />
      <Section02Projects theme={theme} qualityTier={qualityTier} />
      <Section03GameDev theme={theme} qualityTier={qualityTier} />
      <Section04Software theme={theme} qualityTier={qualityTier} />
      <Section05AIWorkflow theme={theme} qualityTier={qualityTier} />
      <Section06About theme={theme} qualityTier={qualityTier} />
      <Section07Contact theme={theme} qualityTier={qualityTier} />
    </group>
  );
};
