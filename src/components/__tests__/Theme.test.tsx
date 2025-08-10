import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import ThemeProvider from '@components/context/ThemeProvider';
import ThemeToggle from '@components/context/ThemeToggle';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      store = Object.fromEntries(
        Object.entries(store).filter(([k]) => k !== key)
      );
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Theme functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('should apply the theme from localStorage on initial load', () => {
    localStorageMock.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <div data-testid="test-child" />
      </ThemeProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('should default to light theme if no theme is in localStorage', () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child" />
      </ThemeProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should toggle the theme from light to dark', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorageMock.getItem('theme')).toBe('light');

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should toggle the theme from dark to light', async () => {
    localStorageMock.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.getItem('theme')).toBe('dark');

    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});
