# repo

A small JavaScript string utilities library used by the agentic-lib mission.

## Installation

This repository is a template; see package.json for scripts. The library entry point is src/lib/main.js and it exports a set of string utility functions.

## API

Named exports (from src/lib/main.js):
- slugify(input) — Convert text to a URL-friendly slug (lowercase, hyphens, strip non-alphanumeric). Example: slugify("Hello World!") -> "hello-world"
- truncate(input, maxLength = 100, suffix = "…") — Truncate text without breaking words where possible. Example: truncate("Hello World", 8) -> "Hello…"
- camelCase(input) — Convert to camelCase. Example: camelCase("foo-bar-baz") -> "fooBarBaz"
- kebabCase(input) — Convert to kebab-case. Example: kebabCase("Foo Bar Baz") -> "foo-bar-baz"
- titleCase(input) — Capitalise the first letter of each word. Example: titleCase("hello world") -> "Hello World"
- wordWrap(input, width = 80) — Soft-wrap text at word boundaries using "\n". Example: wordWrap("Long text here", 20)
- stripHtml(input) — Remove HTML tags and decode common entities. Example: stripHtml("<p>Hello &amp; world</p>") -> "Hello & world"
- escapeRegex(input) — Escape special regex characters. Example: escapeRegex(".+*") -> "\\.\\+\\*"
- pluralize(input) — Basic English pluralisation. Example: pluralize("box") -> "boxes"
- levenshtein(a, b) — Compute Levenshtein edit distance between two strings. Example: levenshtein("kitten", "sitting") -> 3

## Usage

Import the functions from the library:

```js
import { slugify, truncate, camelCase } from './src/lib/main.js';

console.log(slugify('Hello World!'));
console.log(truncate('Hello World', 8));
console.log(camelCase('foo-bar-baz'));
```

## Website

The website at src/web/index.html imports src/web/lib.js which re-exports the library and demonstrates examples of each function.

## Tests

Unit tests are under tests/unit/. Run them with:

```bash
npm test
```
