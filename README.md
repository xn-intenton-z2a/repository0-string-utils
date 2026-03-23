# repo — String Utilities and JSON Schema Diff

This repository contains a small collection of string utility functions implemented in plain JavaScript (ESM) together with a JSON Schema diff engine that helps detect changes between two JSON Schema (Draft-07) documents.

Exported functions (string utilities)

- slugify(input)
- truncate(input, maxLength = 30, ellipsis = '...')
- camelCase(input)
- kebabCase(input)
- titleCase(input)
- wordWrap(input, width = 80)
- stripHtml(input)
- escapeRegex(input)
- pluralize(word, count = null)
- levenshtein(a, b)
- diffSchemas(schemaA, schemaB) — compute structured diffs between two JSON Schemas
- resolveLocalRefs(schema) — resolve local JSON Pointer $ref entries (throws on remote $ref)
- classifyChange(change) — classify a change as 'breaking' | 'compatible' | 'informational'
- formatChanges(changes, options) — produce human-readable text or JSON

JSON Schema diff engine

New functions:

- diffSchemas(schemaA, schemaB) — returns an array of change records describing differences between two schemas
- resolveLocalRefs(schema) — resolves local JSON Pointer $ref within a single document; throws on remote refs
- classifyChange(change) — classifies a change as "breaking", "compatible", or "informational"
- formatChanges(changes, options) — render changes as human-readable text (or JSON with options.format = 'json')

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

Before / After example

Schema A (before):

```json
{
  "type": "object",
  "properties": {
    "email": { "type": "string" },
    "age": { "type": "number" }
  },
  "required": ["email"]
}
```

Schema B (after):

```json
{
  "type": "object",
  "properties": {
    "age": { "type": "number" }
  },
  "required": []
}
```

Running the diff:

```js
const changes = diffSchemas(schemaA, schemaB);
console.log(formatChanges(changes));
```

Sample formatted output (human-friendly):

```
[BREAKING] /properties/email: property-removed [was required]
```

This indicates that removing a required property is classified as a breaking change.

Notes

- The diff engine resolves local (same-document) JSON Pointer references ($ref starting with '#') before comparing constructs so that changes in referenced definitions are visible at usage sites.
- Remote $ref (http/https or file references) are considered out-of-scope and will cause resolveLocalRefs to throw.

Compute the diff:

Open `src/web/index.html` in a browser (or run `npm run build:web` then serve `docs/`) to see a live demo of the string utilities and the schema diff engine.

Running tests

```bash
npm ci
npm test
```

License: MIT
