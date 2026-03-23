# REF_RESOLUTION

Summary
Resolve fragment-only $ref within a single document prior to diffing. Remote $ref or unresolvable pointers must raise descriptive errors.

Specification
- Scope: only $ref values beginning with # (fragment-only) are supported. Percent-decode fragments, apply JSON Pointer unescaping (~1 -> /, ~0 -> ~) and evaluate against the document root.
- Replacement semantics: for the purpose of diffing, treat $ref as replacing the node; do not attempt to merge sibling keywords with the referenced target.
- Cycle detection: detect and handle cycles deterministically; document whether the resolver throws or returns a marker for cycles.
- Failure behaviour: throw a clear error for remote $ref (not starting with #) and for unresolvable pointers.

Files to change
- src/lib/main.js: implement resolveLocalRefs and expose it as a named export for testing.
- tests/unit/ref-resolution.test.js: tests for root-level #, nested pointers, percent-encoded fragments, unresolvable pointer, remote-ref rejection, and a cycle case.

Acceptance Criteria
- Unit tests demonstrate successful resolution of fragment pointers and correct failure on remote or unresolvable $ref.
- A unit test asserts cycle detection behaviour (either thrown error or documented handling).
