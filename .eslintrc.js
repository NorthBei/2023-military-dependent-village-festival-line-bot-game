/* eslint-disable @typescript-eslint/no-var-requires */
const prettierrc = require('./.prettierrc');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'json', 'simple-import-sort'],
  rules: {
    'prettier/prettier': ['error', prettierrc],
    'json/*': ['error', { allowComments: true }],
    'json/trailing-comma': prettierrc.trailingComma === 'none' ? 'off' : 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
};