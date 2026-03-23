# repo — String Utilities

This repository contains a small collection of string utility functions implemented in plain JavaScript (ESM). The functions are browser-safe and Node.js-compatible.

Exported functions

- slugify(input) — create URL-friendly slugs (normalises and removes diacritics when possible)
- truncate(input, maxLength = 30, ellipsis = '...') — truncate strings (Unicode-aware)
- camelCase(input) — convert to camelCase identifier
- kebabCase(input) — convert to kebab-case
- titleCase(input) — Capitalise first letter of each word
- wordWrap(input, width = 80) — wrap text to a given width (Unicode-aware)
- stripHtml(input) — remove HTML tags and decode basic entities
- escapeRegex(input) — escape special regex characters
- pluralize(word, count = null) — basic English pluraliser (supports some irregulars)
- levenshtein(a, b) — Levenshtein edit distance (Unicode-aware)

Usage examples

Importing in Node or the browser (ESM):

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

console.log(slugify('Hello World!')); // 'hello-world'
console.log(truncate('This is an example sentence', 10)); // 'This is...'
console.log(camelCase('hello_world')); // 'helloWorld'
console.log(kebabCase('helloWorld')); // 'hello-world'
console.log(titleCase('this is a title')); // 'This Is A Title'
console.log(wordWrap('Lorem ipsum dolor sit amet', 10));
console.log(stripHtml('<p>Hello &amp; world</p>')); // 'Hello & world'
console.log(escapeRegex('file.*(test)?'));
console.log(pluralize('child')); // 'children'
console.log(levenshtein('kitten','sitting')); // 3
```

Notes about Unicode and edge-cases

- The functions are written to be reasonably Unicode-friendly: length-sensitive operations (truncate, wordWrap, levenshtein) operate on Unicode code points (using Array.from) rather than UTF-16 code units. This avoids splitting emoji surrogate pairs in most cases.
- slugify attempts to normalise Unicode and strip diacritical marks where possible, but non-Latin scripts will be preserved as-is when supported by the runtime's Unicode handling.
- The pluralize function is intentionally simple — it covers common English rules and several irregular nouns, but it is not a comprehensive linguistic engine.
- All functions tolerate null/undefined inputs and return sensible defaults (usually an empty string).

Website demo

Open `src/web/index.html` in a browser (or run `npm run build:web` then serve `docs/`) to see a live demo of the utilities.

Tests

Run the unit tests with:

```bash
npm ci
npm test
```

License

MIT
