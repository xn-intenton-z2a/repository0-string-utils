# RECURSIVE_TRAVERSAL

Summary
Describe traversal rules for schemas so diffSchemas inspects properties, items, allOf, oneOf, anyOf, and nested schemas recursively and produces stable JSON Pointer-style paths for change records.

Specification
- Traversal targets: properties, patternProperties (report literal property names), items (single-schema and tuple forms), additionalProperties when it is a schema, and composition arrays allOf, oneOf, anyOf.
- Path format: change record path must be a slash-prefixed path using JSON Pointer style segments that reflect schema location, for example /properties/email or /allOf/1/properties/id.
- Array indices: when traversing composition arrays use numeric segments for index positions.
- Boolean schemas: handle boolean schema nodes (true/false) as valid nodes and report transitions between boolean and object schemas.
- Aggregation: when multiple nested changes occur under the same parent produce either individual nested change records or a parent nested-changed record that contains the sub-records.

Files to change
- src/lib/main.js: traversal utilities and stable path generation used by diffSchemas.
- tests/unit/traversal.test.js: test cases covering properties, items, composition arrays, tuple items, patternProperties and boolean-schema transitions.

Acceptance Criteria
- diffSchemas traverses a schema with nested allOf/oneOf and reports change records with paths that include composition indices.
- boolean-schema to object-schema transitions are reported in tests.
- Tests include tuple items and patternProperties examples and pass after implementation.
