# UNIT_TESTS

Summary
List the unit tests required to validate the diff engine, resolver, traversal, classification, and rendering so acceptance criteria from the mission are verifiable.

Specification
- Required test files and key coverage:
  - tests/unit/change-types.test.js: tests for property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, nested-changed.
  - tests/unit/ref-resolution.test.js: local fragment resolution, percent-encoded fragments, unresolvable pointer error, remote $ref rejection and cycle detection.
  - tests/unit/traversal.test.js: composition arrays, tuple items, patternProperties, boolean-schema transitions.
  - tests/unit/classification.test.js: removed required property is breaking and nested aggregation rules.
  - tests/unit/format.test.js: json and text output and maxLines truncation.
  - tests/unit/api-surface.test.js: named exports exist and basic behaviour.
- Keep tests minimal and focussed; each should exercise a single acceptance criterion.

Files to change
- Add the test files above under tests/unit/ with focused fixtures and assertions.

Acceptance Criteria
- There is at least one unit test covering every mission acceptance criterion.
- Tests run via npm test (vitest) and assert the public API behaviours described in the mission.
