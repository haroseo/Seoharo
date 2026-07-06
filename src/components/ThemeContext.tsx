import React, { createContext, useState, useContext, useEffect } from 'react';

export type BgTheme = 'solid' | 'grid' | 'dots' | 'noise' | 'aurora';

interface ThemeContextType {
  bgTheme: BgTheme;
  setBgTheme: (theme: BgTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bgTheme, setBgThemeState] = useState<BgTheme>(() => {
    const saved = localStorage.getItem('seoharo_bg_theme');
    return (saved as BgTheme) || 'solid';
  });

  const setBgTheme = (theme: BgTheme) => {
    setBgThemeState(theme);
    localStorage.setItem('seoharo_bg_theme', theme);
  };

  useEffect(() => {
    const root = document.documentElement;
    // Keep html classes clean
    root.classList.remove('bg-theme-solid', 'bg-theme-grid', 'bg-theme-dots', 'bg-theme-noise', 'bg-theme-aurora');
    root.classList.add(`bg-theme-${bgTheme}`);
  }, [bgTheme]);

  return (
    <ThemeContext.Provider value={{ bgTheme, setBgTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
