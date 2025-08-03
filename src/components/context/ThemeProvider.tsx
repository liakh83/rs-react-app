import { useEffect, useState } from 'react';

import { ThemeContext, Theme } from './theme-context';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem('theme');
    return stored === Theme.Dark ? Theme.Dark : Theme.Light;
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove(Theme.Light, Theme.Dark);
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
