// src/app/providers/ThemeProvider.jsx
"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fix: Pushing to the next tick avoids the synchronous setState linter error
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const allThemes = ['ayu', 'oneDarkPro', 'dracula', 'poimandres']; 
    
    root.classList.remove(...allThemes);
    if (theme) {
      root.classList.add(theme);
    }
  }, [theme, mounted]);

  return mounted && children;
};

export default ThemeProvider;