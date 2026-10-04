import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (koText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({ children, initialLanguage = 'ko' }) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem('portfolio_language');
        if (saved === 'ko' || saved === 'en') setLanguageState(saved);
      } catch { /* Storage is optional. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('portfolio_language', lang); } catch { /* Language still works when storage is blocked. */ }
  };

  const t = (koText: string, enText: string) => {
    return language === 'ko' ? koText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
