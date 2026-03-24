# String Utilities (repository0)

A small collection of string utility functions exported from `src/lib/main.js` and demonstrated on `src/web/index.html`.

Functions (named exports):

- slugify(input) — convert to URL-friendly slug (lowercase, hyphens, strip non-alphanumeric)
- truncate(input, maxLength, suffix='…') — truncate without breaking words when possible
- camelCase(input) — convert separators to camelCase
- kebabCase(input) — convert separators to kebab-case
- titleCase(input) — Capitalise first letter of each word
- wordWrap(input, width) — soft wrap text at word boundaries ("\n" line breaks)
- stripHtml(input) — remove HTML tags and decode common entities
- escapeRegex(input) — escape regex metacharacters
- pluralize(input) — basic English pluralization rules
- levenshtein(a, b) — compute edit distance between two strings

Usage examples (ES modules):

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

console.log(slugify('Hello World!')); // 'hello-world'
console.log(truncate('Hello World', 8)); // 'Hello…'
console.log(camelCase('foo-bar-baz')); // 'fooBarBaz'
console.log(kebabCase('Foo Bar')); // 'foo-bar'
console.log(titleCase('hello world')); // 'Hello World'
console.log(wordWrap('The quick brown fox', 10)); // 'The quick\nbrown fox'
console.log(stripHtml('<p>Hello &amp; welcome</p>')); // 'Hello & welcome'
console.log(escapeRegex('a.b')); // 'a\\.b'
console.log(pluralize('leaf')); // 'leaves'
console.log(levenshtein('kitten', 'sitting')); // 3
```

The website demo at `src/web/index.html` also shows these examples in the browser.
