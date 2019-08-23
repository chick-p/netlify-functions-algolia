
'use strict';

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'node'
  ],
  rules: {
    'quotes': [2, 'single'],
    'no-var': 2,
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'keyword-spacing': 'warn',
  }
};
