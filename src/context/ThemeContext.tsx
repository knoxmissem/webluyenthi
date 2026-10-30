'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: () => {},
  toggleTheme: () => {}
});

const STORAGE_KEY = 'lingora-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Apply theme to HTML root element
  const applyTheme = (resolvedDark: boolean) => {
    setIsDark(resolvedDark);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (resolvedDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      }
    }
  };

  // Initialize theme from localStorage or system on mount
  useEffect(() => {
    setMounted(true);
    let initialTheme: ThemeMode = 'system';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        initialTheme = stored;
      }
    } catch {
      // Ignore localStorage access errors
    }

    setThemeState(initialTheme);

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedDark = initialTheme === 'dark' || (initialTheme === 'system' && systemDark);
    applyTheme(resolvedDark);

    // Listen to OS theme changes if on 'system' mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      setThemeState((currentTheme) => {
        if (currentTheme === 'system') {
          applyTheme(e.matches);
        }
        return currentTheme;
      });
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore localStorage errors
    }

    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemDark);
    } else {
      applyTheme(mode === 'dark');
    }
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setTheme(nextDark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
