import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022, // ECMA version 2022
      sourceType: 'module', // Use ES modules
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      // Formatting Rules
      indent: ['error', 2, { SwitchCase: 1 }], // 2 spaces indent, 1 space for switch case
      'linebreak-style': ['error', 'unix'], // Using Unix line breaks (recommended for cross-platform)
      quotes: ['error', 'single'], // Enforce single quotes
      semi: ['error', 'always'], // Enforce semicolons

      // Best Practices
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Allow unused function arguments if they start with "_"
      'no-console': 'off', // Allow console statements (can be turned on for production)
      'prefer-const': 'error', // Enforce the use of const if variable is not reassigned
      'no-var': 'error', // Disallow the use of var (use let or const)
      'object-shorthand': 'error', // Enforce shorthand syntax for object literals
      'prefer-arrow-callback': 'error', // Enforce arrow function syntax for callbacks

      // React specific (if applicable)
      'react/prop-types': 'off', // Disable prop-types validation in React (if you use TypeScript, it may not be necessary)
    },
  },
  {
    // Override settings for test files
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly', // Jest globals
      },
    },
    rules: {
      // Test specific rules
      'no-undef': 'off', // Allow undefined variables in test files (as they're often injected by testing libraries like Jest)
    },
  },
];
