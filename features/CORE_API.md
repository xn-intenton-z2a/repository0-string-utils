# CORE_API

Summary
Define the library public API and contract so consumers can rely on stable named exports and predictable behaviour.

Specification
- Named exports required from src/lib/main.js:
  - diffSchemas(beforeSchema, afterSchema): returns an array of change records as defined in the mission.
  - renderChanges(changes, options): returns a text string or JSON-serialisable value depending on options.format (json or text).
  - classifyChange(change): returns one of breaking, compatible, informational.
  - resolveLocalRefs(schema): returns a new schema with fragment-only $ref resolved in-place or throws on remote $ref.
- Exports must be named (not default) and have stable argument/return semantics documented in README.

Files to change
- src/lib/main.js: implement and export the named functions above.
- tests/unit/api-surface.test.js: assertions that the named exports exist and basic type contracts hold.

Acceptance Criteria
- diffSchemas, renderChanges, classifyChange and resolveLocalRefs are available as named exports from src/lib/main.js.
- diffSchemas returns an array for a simple before/after example and each element follows the Change Record Format.
- resolveLocalRefs throws when encountering non-fragment (remote) $ref in unit tests.
