# SCHEMA_DIFF

Summary
Provide the library's core public API and export contract. The library must export the following named functions from src/lib/main.js: diffSchemas, renderChanges, classifyChange, resolveLocalRefs. Each export must be a named export and have predictable inputs and outputs as described below.

Specification
- diffSchemas(beforeSchema, afterSchema): returns an array of change records conforming to the mission Change Record Format; each record includes path, changeType, before, after and may include nested details.
- renderChanges(changes, options): returns either a human-readable text string or a JSON-serialisable array depending on options.format (json or text); supports options.maxLines and options.includeNested.
- classifyChange(change): deterministically returns one of the values breaking, compatible, informational; for nested-changed results apply aggregation rules.
- resolveLocalRefs(schema): returns a new schema with all fragment-only $ref resolved in-place; throws when encountering non-local $ref or unresolvable pointers.

Files to change
- src/lib/main.js: implement and export the named functions above.
- tests/unit/: add unit tests that exercise the API surface.
- README.md: include usage examples that call diffSchemas and renderChanges.

Acceptance Criteria
- Named exports diffSchemas, renderChanges, classifyChange, resolveLocalRefs are present in src/lib/main.js.
- diffSchemas returns an array for a simple before/after pair and each element matches the Change Record Format.
- renderChanges supports format=json and format=text and returns appropriate representations.
- resolveLocalRefs resolves fragment-only $ref and throws on remote $ref.
