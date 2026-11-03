import React, { useState, useEffect } from 'react';
import { vi } from './vi';
import { en } from './en';
import { I18nContext } from './context';
import type { Language } from './context';

const STORAGE_KEY = 'portfolio_lang_pref';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved === 'vi' || saved === 'en') return saved;
      if (typeof navigator !== 'undefined' && navigator.language?.startsWith('vi')) {
        return 'vi';
      }
    } catch {
      // ignore localstorage error
    }
    return 'vi';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const t = lang === 'vi' ? vi : en;

  return (
    <I18nContext.Provider value={{ lang, t, setLanguage, toggleLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

