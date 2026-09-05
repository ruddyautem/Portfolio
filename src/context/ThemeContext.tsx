"use client";

import { createContext, useEffect, useState, useCallback } from "react";
import { THEME_OPTIONS } from "@/lib/constants";

export interface ThemeContextType {
  theme: string;
  toggle: (newTheme: string) => void;
  backgroundGlow: boolean;
  toggleBackgroundGlow: (enabled?: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "ayu",
  toggle: () => {},
  backgroundGlow: true,
  toggleBackgroundGlow: () => {},
});

export const ThemeContextProvider = ({
  children,
  initialTheme = "ayu",
  initialGlow = true,
}: {
  children: React.ReactNode;
  initialTheme?: string;
  initialGlow?: boolean;
}) => {
  const [theme, setTheme] = useState(initialTheme);
  const [backgroundGlow, setBackgroundGlow] = useState(initialGlow);

  useEffect(() => {
    // Check localStorage in case cookie was out of sync or absent
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && !THEME_OPTIONS.includes(savedTheme)) {
      setTheme("ayu");
      localStorage.setItem("theme", "ayu");
      document.cookie = `theme=ayu; path=/; max-age=31536000; SameSite=Lax`;
      const root = document.documentElement;
      root.classList.remove(...THEME_OPTIONS, "githubDark", "githubLight");
      root.classList.add("ayu");
    } else if (savedTheme && THEME_OPTIONS.includes(savedTheme) && savedTheme !== theme) {
      setTheme(savedTheme);
      const root = document.documentElement;
      root.classList.remove(...THEME_OPTIONS, "githubDark", "githubLight");
      root.classList.add(savedTheme);
      document.cookie = `theme=${savedTheme}; path=/; max-age=31536000; SameSite=Lax`;
    }

    const savedGlow = localStorage.getItem("backgroundGlow");
    if (savedGlow !== null) {
      const isGlow = savedGlow === "true";
      if (isGlow !== backgroundGlow) {
        setBackgroundGlow(isGlow);
        if (!isGlow) {
          document.documentElement.classList.add("no-glow");
        } else {
          document.documentElement.classList.remove("no-glow");
        }
        document.cookie = `backgroundGlow=${isGlow}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
  }, []);

  const toggle = useCallback((newTheme: string) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
      const root = document.documentElement;
      root.classList.remove(...THEME_OPTIONS);
      root.classList.add(newTheme);
    }
  }, []);

  const toggleBackgroundGlow = useCallback((enabled?: boolean) => {
    setBackgroundGlow((prev) => {
      const next = typeof enabled === "boolean" ? enabled : !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("backgroundGlow", String(next));
        document.cookie = `backgroundGlow=${next}; path=/; max-age=31536000; SameSite=Lax`;
        if (!next) {
          document.documentElement.classList.add("no-glow");
        } else {
          document.documentElement.classList.remove("no-glow");
        }
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ toggle, theme, backgroundGlow, toggleBackgroundGlow }}>
      {children}
    </ThemeContext.Provider>
  );
};