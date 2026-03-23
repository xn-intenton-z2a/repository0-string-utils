# UNIT_TESTS

Summary
Define the unit test coverage required for mission acceptance and list the exact test files and cases that must be present.

Test matrix
- tests/unit/change-types.test.js: tests for property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, nested-changed.
- tests/unit/ref-resolution.test.js: local fragment resolution, percent-encoded fragments, unresolvable pointer error, remote $ref rejection.
- tests/unit/traversal.test.js: allOf/oneOf/anyOf, tuple items and patternProperties, boolean-schema changes.
- tests/unit/classification.test.js: removed required property is breaking, nested aggregation rules, type change examples.
- tests/unit/format.test.js: json and text outputs, maxLines behaviour.
- tests/unit/api-surface.test.js: asserts named exports exist and null/undefined handling where applicable.

Files to change
- tests/unit/: add the files above with minimal fixtures and assertions that exercise the public API.

Acceptance Criteria
- There is at least one passing unit test for each acceptance criteria listed in the mission document.
- Test files are present in tests/unit/ and are runnable with npm test (vitest).
