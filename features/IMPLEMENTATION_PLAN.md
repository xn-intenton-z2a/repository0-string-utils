# REF_RESOLUTION

Summary
Resolve fragment-only $ref inside a single document prior to performing diffs. Remote or absolute references are out of scope and should cause an error.

Specification
- Resolution scope: only $ref values that start with '#'. Percent-decode the fragment, apply JSON Pointer unescaping (~1 -> /, ~0 -> ~) and evaluate against the document root.
- Behaviour on failure: throw a descriptive error for unresolvable pointers or for $ref values that are not fragment-only.
- Cycle detection: detect and avoid infinite resolution loops; either preserve a reference marker or throw a cycle-detected error.
- Sibling keywords: treat $ref as replacing the node; do not merge sibling keywords with the referenced target while resolving for the purposes of producing diffs.

Files to change
- src/lib/main.js: implement a resolver used by diffSchemas; make resolveLocalRefs available as a named export for testing.
- tests/unit/ref-resolution.test.js: include tests for root-level '#', nested pointers, percent-encoded fragments, unresolvable pointer, and remote-ref rejection.

Acceptance Criteria
- resolveLocalRefs resolves root and nested fragment pointers in unit tests.
- resolveLocalRefs throws for non-fragment $ref and for unresolvable pointers.
- A unit test covers a simple cycle and asserts either a thrown error or documented cycle handling behaviour.
