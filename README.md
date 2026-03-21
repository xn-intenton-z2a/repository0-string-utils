# repo — String Utilities

This repository implements a small bag of string utility functions and a tiny demo website.

All functions are exported from `src/lib/main.js` and are browser-safe (the web demo imports them via `src/web/lib.js`).

Available functions

- slugify(str) — convert to URL-friendly slug (lowercase, hyphens, strip non-alphanumeric and diacritics)
- truncate(str, length, suffix = "…") — truncate without breaking mid-word when possible
- camelCase(str) — convert to camelCase
- kebabCase(str) — convert to kebab-case
- titleCase(str) — capitalise the first letter of each word
- wordWrap(text, width = 80) — soft wrap text at word boundaries (returns string with `\n` separators)
- stripHtml(html) — remove HTML tags and decode common entities
- escapeRegex(str) — escape special regex characters
- pluralize(word) — basic English pluralisation (s/x/z/ch/sh -> +es; consonant+y -> ies; f/fe -> ves; otherwise +s)
- levenshtein(a, b) — compute edit (Levenshtein) distance between two strings

Examples

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

slugify('Hello World!'); // 'hello-world'
truncate('Hello World', 8); // 'Hello…'
camelCase('foo-bar-baz'); // 'fooBarBaz'
kebabCase('Foo Bar'); // 'foo-bar'
titleCase('hello world'); // 'Hello World'
wordWrap('The quick brown fox jumps over the lazy dog', 10);
stripHtml('<p>Hello &amp; <strong>World</strong></p>'); // 'Hello & World'
escapeRegex('^test$'); // '\\^test\\$'
pluralize('box'); // 'boxes'
levenshtein('kitten', 'sitting'); // 3
```

Edge cases

- Functions accept `null` or `undefined` and return empty strings where appropriate (levenshtein returns numeric distance). 
- Unicode characters are supported for casing and matching where possible.

See `src/web/index.html` for a small demo that runs in the browser and shows example outputs.
