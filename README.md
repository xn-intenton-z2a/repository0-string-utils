# repo

This repository is a small string utilities library demonstrating a set of handy string functions and a tiny demo website.

## String utilities

Exports (from `src/lib/main.js`):

- slugify(input)
- truncate(input, maxLength = 80, suffix = '…')
- camelCase(input)
- kebabCase(input)
- titleCase(input)
- wordWrap(input, width = 80)
- stripHtml(input)
- escapeRegex(input)
- pluralize(input)
- levenshtein(a, b)

All functions accept null/undefined and return an empty string (or 0 for levenshtein when both are empty).

Examples

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

console.log(slugify('Hello World!')); // 'hello-world'
console.log(truncate('Hello World', 8)); // 'Hello…'
console.log(camelCase('foo-bar-baz')); // 'fooBarBaz'
console.log(kebabCase('Foo Bar Baz')); // 'foo-bar-baz'
console.log(titleCase('hello world FROM test')); // 'Hello World From Test'
console.log(wordWrap('A long text ...', 20)); // lines separated by '\n'
console.log(stripHtml('<p>Hello &amp; <strong>world</strong></p>')); // 'Hello & world'
console.log(escapeRegex('hello.*+?^${}()|[]\\')); // escaped string
console.log(pluralize('box')); // 'boxes'
console.log(levenshtein('kitten','sitting')); // 3
```

Website

Open `src/web/index.html` in a browser — it demonstrates the functions using the browser-safe re-export in `src/web/lib.js`.

Tests

Run `npm test` to execute unit tests.
