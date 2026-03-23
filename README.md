# repo — String Utilities and JSON Schema Diff

This repository contains a small collection of string utility functions implemented in plain JavaScript (ESM) together with a JSON Schema diff engine that helps detect changes between two JSON Schema (Draft-07) documents.

Exported functions (string utilities)

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

JSON Schema diff engine

New functions:

- diffSchemas(schemaA, schemaB) — returns an array of change records describing differences between two schemas
- resolveLocalRefs(schema) — resolves local JSON Pointer $ref within a single document; throws on remote refs
- classifyChange(change) — classifies a change as "breaking", "compatible", or "informational"
- formatChanges(changes, options) — render changes as human-readable text (or JSON with options.style = 'json')

Change record examples

A change record is an object similar to:

```js
{ path: "/properties/email", changeType: "type-changed", before: "string", after: "number" }
```

Supported changeType values include:

- property-added / property-removed
- type-changed
- required-added / required-removed
- enum-value-added / enum-value-removed
- description-changed
- nested-changed (contains a `changes` array with sub-diffs)

Usage example

```js
import { diffSchemas, formatChanges } from './src/lib/main.js';

const schemaA = {
  definitions: {
    address: { type: "object", properties: { street: { type: "string" } }, required: ["street"] }
  },
  type: "object",
  properties: {
    id: { type: "string" },
    addr: { $ref: "#/definitions/address" }
  },
  required: ["id"]
};

const schemaB = {
  definitions: {
    address: { type: "object", properties: { street: { type: "string" }, city: { type: "string" } }, required: ["street"] }
  },
  type: "object",
  properties: {
    id: { type: "string" },
    addr: { $ref: "#/definitions/address" },
    email: { type: "string" }
  },
  required: ["id", "email"]
};

const changes = diffSchemas(schemaA, schemaB);
console.log(formatChanges(changes));
```

Sample human-readable output

```
[COMPATIBLE] /properties/addr: nested-changed (1 changes)
  [COMPATIBLE] /properties/addr/properties/city: property-added (type: "string")
[COMPATIBLE] /properties/email: property-added (type: "string")
[BREAKING] /properties/email: required-added
```

Notes

- The diff engine resolves local (same-document) JSON Pointer references ($ref starting with '#') before comparing constructs so that changes in referenced definitions are visible at usage sites.
- Remote $ref (http/https or file references) are considered out-of-scope and will cause resolveLocalRefs to throw.

Website demo

Open `src/web/index.html` in a browser (or run `npm run build:web` then serve `docs/`) to see a live demo of the string utilities and the schema diff engine.

Tests

Run the unit tests with:

```bash
npm ci
npm test
```

License

MIT
