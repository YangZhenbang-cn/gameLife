'use client';

import { useEffect, useState } from 'react';
import { loadThemeFromStorage, applyTheme, saveThemeToStorage } from '../lib/defaultData';
import { themes, getThemeById } from '../lib/themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = loadThemeFromStorage();
    const themeToApply = savedTheme && getThemeById(savedTheme) ? savedTheme : 'pixel';
    applyTheme(themeToApply);
    saveThemeToStorage(themeToApply);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<string>('pixel');

  useEffect(() => {
    const saved = loadThemeFromStorage();
    if (saved && getThemeById(saved)) {
      setCurrentTheme(saved);
    }
  }, []);

  const setTheme = (themeId: string) => {
    if (!getThemeById(themeId)) return;
    applyTheme(themeId);
    saveThemeToStorage(themeId);
    setCurrentTheme(themeId);
  };

  return { currentTheme, setTheme, themes };
}