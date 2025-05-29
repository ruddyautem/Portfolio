// ThemeProvider.jsx
"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply theme class to <html>
    document.documentElement.className = theme;
  }, [theme]);

  return mounted && children;
};

export default ThemeProvider;