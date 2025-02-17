import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  {
    ignores: ["dist/**", "build/**"],
  },
];