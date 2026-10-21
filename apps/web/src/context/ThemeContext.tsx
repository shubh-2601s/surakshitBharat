import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'paper' | 'control-room';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('sb_theme');
    if (saved === 'paper' || saved === 'control-room') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'control-room' : 'control-room'; // Default to control-room for signature national intelligence feel
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'control-room') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sb_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'control-room' ? 'paper' : 'control-room'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'control-room' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
