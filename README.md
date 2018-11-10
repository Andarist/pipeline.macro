# pipeline.macro

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

A babel macro which works similarly to [the pipeline operator](https://github.com/tc39/proposal-pipeline-operator).

## Usage

```js
import pipe from 'pipeline.macro'

const doubleSay = str => str + ', ' + str
const capitalize = str => str[0].toUpperCase() + str.substring(1)
const exclaim = str => str + '!'

const result = pipe(
  'hello',
  doubleSay,
  capitalize,
  exclaim,
)

result // "Hello, hello!"
```
