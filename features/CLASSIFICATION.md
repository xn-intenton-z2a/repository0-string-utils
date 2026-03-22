# CLASSIFICATION

Overview
Assign an impact classification to each change so consumers can decide whether a change is breaking, compatible, or informational. Primary named export: classifyChange.

Classification rules
- removed required property => breaking
- required-added => breaking
- property-removed (not required) => compatible
- property-added (not required) => compatible
- type-changed => breaking
- enum-value-removed => breaking
- enum-value-added => compatible
- required-removed => compatible
- description-changed => informational
- nested-changed => reductions across children: if any child is breaking then breaking; else if any child is compatible then compatible; else informational

Acceptance criteria
- classifyChange is exported from src/lib/main.js and returns one of breaking, compatible, informational.
- computeDiff integrates classification so each change record is annotated with a classification property whose value is one of breaking, compatible, or informational.
- Unit tests verify classification for removed required property (must be breaking) and other representative cases.

Notes
- Keep rule set small and explicit; document behavior in README so consumers understand decisions.