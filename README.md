# repo — String Utilities and JSON Schema Diff

This repository contains a small collection of string utility functions implemented in plain JavaScript (ESM), and a lightweight JSON Schema diff engine to help detect breaking changes between schema versions.

Exported functions (selected)

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

JSON Schema diff example

Before schema (old):

```js
const oldSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', description: 'User email' },
    age: { type: 'number' }
  },
  required: ['email']
};
```

After schema (new):

```js
const newSchema = {
  type: 'object',
  properties: {
    phone: { type: 'string' },
    age: { type: 'string' }
  },
  required: []
};
```

Compute the diff:

```js
import { diffSchemas, formatChanges } from './src/lib/main.js';

const changes = diffSchemas(oldSchema, newSchema);
console.log(JSON.stringify(changes, null, 2));
// or print human-friendly text
console.log(formatChanges(changes));
```

Sample formatted output:

```
Removed property /properties/email (breaking) [was required]
Type changed at /properties/age: "number" -> "string" (breaking)
Added property /properties/phone (compatible)
Required property removed /required/email (compatible)
```

Notes

- The diff engine resolves local `$ref` pointers (JSON Pointer form, e.g. `#/definitions/Address`) before diffing. Remote `$ref` (URLs) are not supported and will throw an error.
- The diff traverses `properties`, `items`, `allOf`, `oneOf`, and `anyOf` recursively and returns an array of change records. Each change record includes a `path` and `changeType` and contextual `before`/`after` data where relevant.

Running tests

```bash
npm ci
npm test
```

Website demo

Open `src/web/index.html` in a browser to see a live demo of the string utilities and the schema diff engine.

License: MIT
