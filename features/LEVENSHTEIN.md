# RECURSIVE_TRAVERSAL

Summary
Traversal rules and stable path generation so diffSchemas inspects properties, items, allOf, oneOf, anyOf, patternProperties, and boolean schemas recursively.

Specification
- Targets: properties, patternProperties (report literal keys), items (single-schema and tuple), additionalProperties when it is a schema, and composition arrays allOf, oneOf, anyOf.
- Path format: JSON Pointer-style segments beginning with a slash, for example /properties/email or /allOf/1/properties/id. Use numeric segments for composition indices.
- Boolean schemas: treat true and false as valid schema nodes and report transitions between boolean and object schemas.
- Aggregation: when multiple nested changes appear under the same parent either report individual child records or a parent nested-changed record containing the sub-records; tests must verify behavior.

Files to change
- src/lib/main.js: traversal utilities and stable path generation used by diffSchemas.
- tests/unit/traversal.test.js: cases covering properties, items (tuple and single), composition arrays, patternProperties and boolean-schema transitions.

Acceptance Criteria
- diffSchemas traverses nested composition arrays and produces change records with composition index segments in paths.
- Tests cover tuple items, patternProperties and boolean-schema transitions and assert the correct paths and changeTypes are produced.
