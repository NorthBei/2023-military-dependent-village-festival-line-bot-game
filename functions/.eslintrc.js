/* eslint-disable @typescript-eslint/no-var-requires */
const prettierrc = require('./.prettierrc');

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  ignorePatterns: [
    '/lib/**/*' // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'prettier', 'json', 'simple-import-sort', 'import'],
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^firebase-admin/.+', '^firebase-functions/.+']
      }
    ],
    'prettier/prettier': ['error', prettierrc],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
};
