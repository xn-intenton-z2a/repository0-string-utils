# CHANGE_CLASSIFICATION

Summary
Define deterministic mapping from change records to classification values breaking, compatible, and informational so classifyChange can be implemented and tested.

Specification
- Baseline rules:
  - breaking: removal of a property that was required; type changes that remove previously accepted types; removal of enum values that were previously allowed and used; changes that make previously valid instances invalid.
  - compatible: adding a property, adding a type to an existing union, adding an enum value, or loosening constraints that do not invalidate existing instances.
  - informational: description changes, metadata-only updates, or nested-changed records that only contain informational sub-changes.
- Composition: for nested-changed records the parent classification is the most severe classification of its nested items (breaking > compatible > informational).

Files to change
- src/lib/main.js: implement classifyChange(change) and use it in renderChanges and test suites.
- tests/unit/classification.test.js: concrete cases asserting classification outcomes.

Acceptance Criteria
- classifyChange reports breaking for removed required property test case.
- classifyChange combines nested classifications by selecting the most severe classification present.
- Unit tests include type-change examples that assert breaking vs compatible outcomes.
