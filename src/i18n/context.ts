import { createContext } from 'react';
import type { TranslationType } from './vi';

export type Language = 'vi' | 'en';

export interface I18nContextType {
  lang: Language;
  t: TranslationType;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const I18nContext = createContext<I18nContextType | null>(null);

