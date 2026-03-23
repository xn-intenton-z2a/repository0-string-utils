# CHANGE_TYPES

Summary
List and define the supported change types the diff engine must emit and the expected shape of change records used throughout tests and rendering.

Specification
- Supported changeType values: property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, nested-changed.
- Each change record is a plain object with fields: path, changeType, before, after and optionally a nested array of sub-records for nested-changed.
- nested-changed must carry a subChanges array containing the child change records; each sub-record uses the same record shape and JSON Pointer-style paths.

Files to change
- tests/unit/change-types.test.js: add focused fixtures asserting detection of each changeType.
- src/lib/main.js: ensure diffSchemas emits the correct changeType and includes before/after values.

Acceptance Criteria
- Unit tests include at least one assertion for each supported changeType.
- nested-changed records include a nested array of change records and those child records are individually verifiable by tests.
- All change record paths use JSON Pointer-style paths beginning with a slash.
