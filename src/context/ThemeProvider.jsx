'use client'

import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeContextProvider = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState(initialTheme || 'light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.cookie = `app_theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
  // Dono classes handle karo, sirf 'dark' nahi
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;