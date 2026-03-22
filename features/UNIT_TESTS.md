# UNIT_TESTS

Overview
Create comprehensive unit tests that exercise every change type, nested schemas, and $ref resolution to prevent regressions and satisfy acceptance criteria.

Tests to include
- property added and removed detection
- type changed detection
- required added and removed detection
- enum value added and removed detection
- description changed detection
- nested changed detection for properties of properties
- traversal tests for items, allOf, oneOf, anyOf
- local $ref resolution tests and remote $ref error test
- classification mapping tests including removed required property => breaking
- formatter tests validating text and JSON outputs

Acceptance criteria
- Tests live in tests/unit and are runnable by npm test.
- Tests assert exact changeType and path values and validate classification and formatter output.
- All tests pass in CI when the feature is implemented.

Notes
- Keep tests deterministic and small; use inline minimal schema fixtures.