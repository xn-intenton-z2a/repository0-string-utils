# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot.

## String Utilities

This project implements a small library of string utility functions exported from `src/lib/main.js` and re-exported to the website at `src/web/lib.js`.

Available named exports:

- slugify(input) — convert to URL-friendly slug (lowercase, hyphens, strip non-alphanumeric)
- truncate(input, maxLength = 100, suffix = "…") — truncate with suffix, don't break mid-word
- camelCase(input) — convert to camelCase
- kebabCase(input) — convert to kebab-case
- titleCase(input) — capitalise first letter of each word
- wordWrap(input, width = 80) — soft wrap text at word boundaries
- stripHtml(input) — remove HTML tags and decode common entities
- escapeRegex(input) — escape special regex characters
- pluralize(input) — basic English pluralisation
- levenshtein(a, b) — compute edit distance between two strings

Usage examples (Node / ESM):

```js
import {
  slugify,
  truncate,
  camelCase,
  kebabCase,
  titleCase,
  wordWrap,
  stripHtml,
  escapeRegex,
  pluralize,
  levenshtein,
} from './src/lib/main.js';

console.log(slugify('Hello World!')) // 'hello-world'
console.log(truncate('Hello World', 8)) // 'Hello…'
console.log(camelCase('foo-bar-baz')) // 'fooBarBaz'
console.log(kebabCase('fooBarBaz')) // 'foo-bar-baz'
console.log(titleCase('hello world')) // 'Hello World'
console.log(wordWrap('The quick brown fox jumps over the lazy dog', 12))
console.log(stripHtml('<p>Hello &amp; <strong>World</strong></p>')) // 'Hello & World'
console.log(escapeRegex('.*+?^${}()|[]\\'))
console.log(pluralize('baby')) // 'babies'
console.log(levenshtein('kitten', 'sitting')) // 3
```

Website demo

Open `src/web/index.html` (served from project root) to see a live demo that uses the library directly via `src/web/lib.js`.

Tests

- Unit tests: `npm test` (vitest)
- Behaviour tests: `npm run test:behaviour` (Playwright)

Mission

The library implements the 10 string utilities required by the mission in `MISSION.md` and includes unit tests and a web demo.
