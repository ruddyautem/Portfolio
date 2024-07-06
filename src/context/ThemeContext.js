'use client';

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value || 'ayu';
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });

  const toggle = (theme) => {
    setTheme(theme);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
};

