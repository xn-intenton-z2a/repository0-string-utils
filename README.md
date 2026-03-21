# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation.

## String Utilities

This project implements a collection of small, focused string utility functions exported from `src/lib/main.js`.

Available functions:

- slugify(str)
- truncate(str, maxLen, suffix = '…')
- camelCase(str)
- kebabCase(str)
- titleCase(str)
- wordWrap(str, width)
- stripHtml(str)
- escapeRegex(str)
- pluralize(str)
- levenshtein(a, b)

Usage examples (Node ESM):

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

console.log(slugify('Hello World!')) // -> 'hello-world'
console.log(truncate('Hello World', 8)) // -> 'Hello…'
console.log(camelCase('foo-bar-baz')) // -> 'fooBarBaz'
console.log(kebabCase('Foo Bar')) // -> 'foo-bar'
console.log(titleCase('hello world')) // -> 'Hello World'
console.log(wordWrap('A long sentence that needs wrapping', 12))
console.log(stripHtml('<p>Hello &amp; world</p>')) // -> 'Hello & world'
console.log(escapeRegex('a+b?(c)')) // -> 'a\\+b\\?\\(c\\)'
console.log(pluralize('baby')) // -> 'babies'
console.log(levenshtein('kitten', 'sitting')) // -> 3
```

See `src/web/index.html` for a small demo page that imports the library in the browser and shows example outputs.

---

Other project information remains in the repository root README and MISSION.md.
