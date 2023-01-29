module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  reportUnusedDisableDirectives: true,
  settings: {
    jest: {
      version: 'latest'
    }
  },
  plugins: ['react', 'prettier', 'react-hooks', 'import', '@typescript-eslint'],
  extends: [
    // 'next/core-web-vitals',
    'eslint:recommended',
    'airbnb',
    'prettier',
    // 'prettier/react',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended'
  ],
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  rules: {
    camelcase: 'error',
    'func-names': ['off'],
    'arrow-body-style': ['off'],
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    // 'import/no-dynamic-require': 'off',
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    // 'react/prop-types': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    // 'no-use-before-define': ['off'],
    // 'jsx-a11y/anchor-is-valid': ['off'],
    // 'jest/expect-expect': ['off'],
    'import/no-unresolved': ['off'],
    // 'import/no-extraneous-dependencies': ['off'],
    'import/extensions': ['off'],
    // 'import/prefer-default-export': ['off'],
    'import/order': [
      1,
      {
        'newlines-between': 'always',
        groups: ['builtin', ['external', 'internal'], 'parent', ['sibling', 'index']]
      }
    ],
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    // '@typescript-eslint/no-shadow': ['error'],
    // '@next/next/link-passhref': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    // 'no-shadow': 'off',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ['ref'] // Allow `const vm= this`; `[]` by default
      }
    ]
  },
  overrides: [
    {
      files: ['*.e2e.ts'],
      rules: {
        'jest/expect-expect': ['off'],
        'jest/no-test-callback': ['off'],
        'jest/no-done-callback': ['off']
      }
    }
  ]
};
