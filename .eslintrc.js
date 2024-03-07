module.exports = {
  root: true,
  // extends: '@react-native-community',
  // plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 'tab'],
    'react/jsx-filename-extension': 0,
    'import/extensions': 0,
    'react/jsx-indent-props': [1, 'tab'],
    'react/jsx-props-no-spreading': 0,
    'no-tabs': 0,
    'no-console': 2,
    'react/require-default-props': 0,
    'react/jsx-indent': [2, 'tab'],
    'object-curly-newline': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0, // ['error', { devDependencies: true }],
    'implicit-arrow-linebreak': 'off', // Conflicts with max length if enabled
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/no-cycle': 0,
    'no-underscore-dangle': 0,
    'exhaustive-deps': 0,
  },
};

