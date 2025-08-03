import { createContext, useContext } from 'react';

export const Theme = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
