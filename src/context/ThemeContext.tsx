'use client';

import { createContext, useEffect, useState, useCallback } from 'react';
import { THEME_OPTIONS } from '@/lib/constants';

export interface ThemeContextType {
  theme: string;
  toggle: (newTheme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'ayu',
  toggle: () => {},
});

export const ThemeContextProvider = ({
  children,
  initialTheme = 'ayu',
}: {
  children: React.ReactNode;
  initialTheme?: string;
}) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      // Check localStorage in case cookie was out of sync or absent.
      let savedTheme: string | null;
      try { savedTheme = localStorage.getItem('theme'); } catch { return; }
      if (!savedTheme) return;

      const nextTheme = THEME_OPTIONS.includes(savedTheme) ? savedTheme : 'ayu';
      if (nextTheme !== savedTheme) {
        try { localStorage.setItem('theme', nextTheme); } catch { /* Keep the cookie preference. */ }
      }

      setTheme(nextTheme);
      document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
      const root = document.documentElement;
      root.classList.remove(...THEME_OPTIONS, 'githubDark', 'githubLight');
      root.classList.add(nextTheme);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggle = useCallback((newTheme: string) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('theme', newTheme); } catch { /* The current session and cookie still retain the theme. */ }
      document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
      const root = document.documentElement;
      root.classList.remove(...THEME_OPTIONS);
      root.classList.add(newTheme);
    }
  }, []);

  return <ThemeContext.Provider value={{ toggle, theme }}>{children}</ThemeContext.Provider>;
};
