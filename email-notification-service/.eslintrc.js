module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  ignorePatterns: ['**/*.test.js'],
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/no-import-module-exports': 'off',
    'linebreak-style': ['error', 'windows'],
  },
  globals: {
    jest: false,
    expect: false,
    describe: false,
    test: false,
    beforeAll: false,
    beforeEach: false,
    afterAll: false,
    afterEach: false,
  },
};
