# CHANGE_CLASSIFICATION

Summary
Deterministic rules mapping change records to classification values breaking, compatible, and informational so classifyChange can be implemented and tested.

Specification
- Rules (baseline):
  - breaking: removal of a property that was required; type changes that make previously valid instances invalid; removal of enum values that were previously accepted by instances.
  - compatible: adding a property, adding a type to an existing union, adding an enum value, or loosening constraints that do not invalidate existing instances.
  - informational: description or metadata-only changes and other non-functional edits.
- Nested aggregation: for nested-changed records return the most severe classification among nested items where severity order is breaking > compatible > informational.

Files to change
- src/lib/main.js: implement classifyChange(change) and use it in tests.
- tests/unit/classification.test.js: concrete cases asserting classification outcomes and nested aggregation logic.

Acceptance Criteria
- classifyChange returns breaking for removed required property test case.
- Nested-changed records aggregate children classifications by selecting the most severe classification present.
- Tests include type-change examples that assert breaking vs compatible outcomes.
