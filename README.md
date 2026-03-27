# repository0 — String Utilities

This repository implements a small collection of string utility functions and demonstrates them on a simple website and in unit tests.

## Library API

Exported functions (named exports) in `src/lib/main.js`:

- slugify(text) — convert to URL-friendly slug (lowercase, hyphens, strip non-alphanumeric)
- truncate(text, maxLength, suffix = '…') — truncate without breaking words when possible
- camelCase(text) — convert to camelCase
- kebabCase(text) — convert to kebab-case
- titleCase(text) — Capitalise first letter of each word
- wordWrap(text, width) — soft wrap text at word boundaries (line separator `\n`)
- stripHtml(html) — remove HTML tags and decode common entities
- escapeRegex(text) — escape special regex characters
- pluralize(word) — basic English pluralisation
- levenshteinDistance(a, b) — compute edit distance between two strings

## Examples

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshteinDistance } from './src/lib/main.js';

slugify('Hello World!'); // 'hello-world'
truncate('Hello World', 8); // 'Hello…'
camelCase('foo-bar-baz'); // 'fooBarBaz'
kebabCase('fooBarBaz'); // 'foo-bar-baz'
titleCase('hello world'); // 'Hello World'
wordWrap('The quick brown fox jumps over the lazy dog', 12);
stripHtml('<p>Hello &amp; world</p>'); // 'Hello & world'
escapeRegex('^a+b(c)?$'); // '^a\+b\(c\)\?\$' (escaped)
pluralize('box'); // 'boxes'
levenshteinDistance('kitten', 'sitting'); // 3
```

## Running tests

Install dependencies and run unit tests:

```bash
npm ci
npm test
```

## Website demo

Open `src/web/index.html` in a browser (or run `npm start` to build & serve) to see live examples of each function.
