const { NODE_ENV } = process.env
const test = NODE_ENV === 'test'
const loose = true

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose,
        modules: false,
        targets: { node: 6 },
      },
    ],
  ],
  plugins: [test && '@babel/transform-modules-commonjs'].filter(Boolean),
}
