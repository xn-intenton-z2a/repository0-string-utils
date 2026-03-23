# repo

This repository is powered by [intentïon agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot.

## String Utilities

This project implements a small library of string utility functions exported from `src/lib/main.js` and usable in Node and the browser.

Available functions (named exports):

- slugify(str)
- truncate(str, length, suffix = '…')
- camelCase(str)
- kebabCase(str)
- titleCase(str)
- wordWrap(str, width = 80)
- stripHtml(str)
- escapeRegex(str)
- pluralize(str)
- levenshtein(a, b)

Examples

```js
import {
  slugify, truncate, camelCase, kebabCase, titleCase,
  wordWrap, stripHtml, escapeRegex, pluralize, levenshtein
} from './src/lib/main.js';

console.log(slugify('Hello World!')); // 'hello-world'
console.log(truncate('Hello World', 8)); // 'Hello…'
console.log(camelCase('foo-bar-baz')); // 'fooBarBaz'
console.log(kebabCase('Foo Bar Baz')); // 'foo-bar-baz'
console.log(titleCase('hello world')); // 'Hello World'
console.log(wordWrap('The quick brown fox jumps over the lazy dog', 12));
console.log(stripHtml('<p>Hi &amp; welcome</p>')); // 'Hi & welcome'
console.log(escapeRegex('^hello.*(world)?$')); // '^hello\.\*\(world\)\?\$' (escaped)
console.log(pluralize('baby')); // 'babies'
console.log(levenshtein('kitten','sitting')); // 3
```

Browser demo

Open `src/web/index.html` in a modern browser or run `npm run start` after building the web bundle to see the live demo that exercises each function.

For more details about the repository and agentic workflows, see the original documentation bundled in the project.
