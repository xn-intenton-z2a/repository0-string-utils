# CHANGE_TYPES

Summary
Define each supported changeType, the shape of expected change records, and specific unit-test cases that prove detection of the change.

Supported changeType values and test cases
- property-added: a property present in after but not before. Acceptance: diffSchemas reports changeType property-added and path to the property.
- property-removed: property present in before but missing in after. Acceptance: diffSchemas reports property-removed with the previous schema snapshot in before.
- type-changed: type value differs between before and after. Acceptance: diffSchemas reports type-changed and includes before and after primitive type names.
- required-added / required-removed: differences in the required array. Acceptance: each addition or removal of a required property yields the corresponding changeType and path to the required array.
- enum-value-added / enum-value-removed: membership changes in enum arrays. Acceptance: each added or removed enum value yields a change record with the value listed.
- description-changed: change in description string. Acceptance: diffSchemas reports description-changed and includes before and after strings.
- nested-changed: when a sub-schema contains any of the above, report nested-changed at the parent path with a nested array of change records.

Files to change
- tests/unit/change-types.test.js: concrete examples for each case using minimal before/after schemas.

Acceptance Criteria
- There is at least one unit test that demonstrates detection for each supported changeType above.
- nested-changed produces a nested array of change records for sub-schema differences.
