import { useEffect, useState } from 'react';

import { ThemeContext } from './ThemeContext';

type Theme = 'light' | 'dark';
type Props = { children: React.ReactNode };

const ThemeProvider = ({ children }: Props) => {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add(theme);
    } else {
      root.classList.remove('dark');
      root.classList.add(theme);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
