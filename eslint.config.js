import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedInlineConfigs: 'error',
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'no-empty': 'warn',
      'react-compiler/react-compiler': 'error',
      'prettier/prettier': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
