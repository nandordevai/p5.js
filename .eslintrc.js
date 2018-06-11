// https://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'standard',
    'p5js',
    'p5js/dom',
    'p5js/sound',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'off',
  },
  globals: {
    'p5': 'true',
  },
}
