/// <reference types="vitest"/>

import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@test-utils': path.resolve(__dirname, 'src/test-utils'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@router': path.resolve(__dirname, 'src/router'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/**/index.{js,jsx,ts,tsx}',
        'src/main.tsx',
        'src/test/setup.ts',
        'src/**/*.d.ts',
      ],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 50,
        statements: 80,
      },
    },
  },
});
