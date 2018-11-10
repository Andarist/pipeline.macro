import * as path from 'path'
import * as vm from 'vm'
import * as babel from '@babel/core'

const transform = (code, plugins = []) =>
  babel.transform(code, {
    babelrc: false,
    filename: __filename,
    plugins: ['macros'].concat(plugins),
  }).code

test('works', () => {
  const fixture = `
import pipe from 'pipeline.macro'

const doubleSay = str => str + ", " + str
const capitalize = str => str[0].toUpperCase() + str.substring(1)
const exclaim = str => str + '!'

const actual = pipe(
  'hello',
  doubleSay,
  capitalize,
  exclaim,
)

expect(actual).toBe('Hello, hello!')

`

  const code = transform(fixture)
  expect(code).toMatchInlineSnapshot(`
"const doubleSay = str => str + \\", \\" + str;

const capitalize = str => str[0].toUpperCase() + str.substring(1);

const exclaim = str => str + '!';

const actual = exclaim(capitalize(doubleSay('hello')));
expect(actual).toBe('Hello, hello!');"
`)

  vm.runInNewContext(code, { expect })
})

test('works with callbags', () => {
  const fixture = `

import filter from 'callbag-filter'
import forEach from 'callbag-for-each'
import fromIter from 'callbag-from-iter'
import map from 'callbag-map'
import pipe from 'pipeline.macro'

const actual = []

pipe(
  fromIter([1, 2, 3, 4, 5, 6]),
  filter(v => v % 2 === 0),
  map(v => v * 10),
  forEach(v => actual.push(v))
)

expect(actual).toEqual([20, 40, 60])

`

  const code = transform(fixture)
  expect(code).toMatchInlineSnapshot(`
"import filter from 'callbag-filter';
import forEach from 'callbag-for-each';
import fromIter from 'callbag-from-iter';
import map from 'callbag-map';
const actual = [];
forEach(v => actual.push(v))(map(v => v * 10)(filter(v => v % 2 === 0)(fromIter([1, 2, 3, 4, 5, 6]))));
expect(actual).toEqual([20, 40, 60]);"
`)

  const cjs = transform(code, ['@babel/transform-modules-commonjs'])
  vm.runInNewContext(cjs, { expect, require })
})
