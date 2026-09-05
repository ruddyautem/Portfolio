// src/app/providers/ThemeProvider.jsx
"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { THEME_OPTIONS } from "@/lib/constants";
import React, { useContext, useEffect } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEME_OPTIONS, "githubDark", "githubLight");
    if (theme) {
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;