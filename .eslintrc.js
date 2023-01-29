module.exports = {
  extends: './.eslintrc.production.js',
  rules: {
    'camelcase': 'error',
    'react/jsx-no-useless-fragment': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/self-closing-comp': 0,
    'import/no-dynamic-require': 0,
    'no-shadow': 0,
    'jsx-a11y/anchor-is-valid': 0
  },
  settings: {
    jest: {
        version: "latest"
    }
  }
};
