import { describe, it, expect } from 'vitest';
import { vi } from '../i18n/vi';
import { en } from '../i18n/en';

describe('Bilingual Localization Consistency', () => {
  it('should have matching key structure in Vietnamese and English bundles', () => {
    const viKeys = Object.keys(vi);
    const enKeys = Object.keys(en);
    expect(viKeys).toEqual(enKeys);

    viKeys.forEach((sectionKey) => {
      const viSubKeys = Object.keys((vi as any)[sectionKey]);
      const enSubKeys = Object.keys((en as any)[sectionKey]);
      expect(viSubKeys).toEqual(enSubKeys);
    });
  });
});

