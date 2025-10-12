// eslint.config.mjs
import globals from 'globals';
import jest from 'eslint-plugin-jest';
import js from '@eslint/js';

export default [
  // Apply recommended rules to all files
  js.configs.recommended,

  // Configuration for Jest/test files
  {
    files: ['**/__tests__/**/*.js', '**/*.test.js'],
    ...jest.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.jest,
      }
    },
    rules: {
      // You can add custom Jest rules here
    }
  },

  // Global configuration for all other JS files
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    },
    rules: {
      // Your custom rules
      'semi': ['error', 'always'],
      'quotes': ['error', 'single']
    }
  }
];