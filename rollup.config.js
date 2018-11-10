import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: { file: pkg.main, format: 'cjs', exports: 'named' },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [json(), babel()],
}
