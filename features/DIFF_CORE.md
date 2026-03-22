# DIFF_CORE

Overview
A core library feature that computes structured diffs between two JSON Schema Draft-07 documents and returns an array of change records. Primary named export: computeDiff.

Behavior
- Compare two schema objects and produce one change record per detected difference.
- Supported changeType values: property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, nested-changed.
- Each change record includes fields: path, changeType, before (optional), after (optional), and for nested-changed a children array with change records.

Acceptance criteria
- computeDiff is exported as a named export from src/lib/main.js.
- Diffing two schemas returns an array of change records.
- property additions and removals are detected at the correct JSON Pointer path.
- type changes are detected and record before and after types.
- required array changes produce required-added or required-removed records.
- enum value additions and removals produce enum-value-added or enum-value-removed records.
- description modifications produce description-changed records.
- Nested differences are represented by nested-changed records whose children are valid change records.
- computeDiff annotates each change record with a classification property named classification whose value is one of breaking, compatible, or informational (see CLASSIFICATION).
- Unit tests exist covering each change type in tests/unit/diff-core.test.js.

Notes
- Implementation must avoid runtime dependencies and target Node 24+.
- Resolve local refs before running computeDiff (see ref resolution feature).