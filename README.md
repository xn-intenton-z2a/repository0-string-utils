# repo

A JavaScript library of string utility functions (string-utils).

This project implements a small set of useful, well-tested string utilities and a tiny demo website.

## Installed functions (named exports)

- slugify(str) -> string
- truncate(str, length, suffix) -> string
- camelCase(str) -> string
- kebabCase(str) -> string
- titleCase(str) -> string
- wordWrap(str, width) -> string
- stripHtml(str) -> string
- escapeRegex(str) -> string
- pluralize(str) -> string
- levenshtein(a, b) -> number

## Examples

Import the library (Node/browser ESM):

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

console.log(slugify('Hello World!')); // 'hello-world'
console.log(truncate('Hello World', 8)); // 'Hello…'
console.log(camelCase('foo-bar-baz')); // 'fooBarBaz'
console.log(kebabCase('fooBarBaz')); // 'foo-bar-baz'
console.log(titleCase('the quick brown fox')); // 'The Quick Brown Fox'
console.log(wordWrap('The quick brown fox jumps over the lazy dog', 12));
// 'The quick\nbrown fox\njumps over\nthe lazy\ndog'
console.log(stripHtml('<p>Hello &amp; <strong>World</strong></p>')); // 'Hello & World'
console.log(escapeRegex('a+b(c)')); // 'a\\+b\\(c\\)'
console.log(pluralize('baby')); // 'babies'
console.log(levenshtein('kitten','sitting')); // 3
```

## Development

Run unit tests:

```bash
npm ci
npm test
```
