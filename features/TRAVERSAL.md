# TRAVERSAL

Overview
Ensure the diff algorithm traverses properties, items, allOf, oneOf, and anyOf recursively so changes inside combiners and arrays are detected and reported.

Behavior
- Visit schema nodes under properties and items and compute diffs at the appropriate JSON Pointer path.
- For composition keywords allOf, oneOf, anyOf, diff each branch and produce nested-changed records that indicate which branch changed.
- Maintain stable path naming for array items and nested properties so output is predictable for tests and display.

Acceptance criteria
- computeDiff traverses properties, items, allOf, oneOf, and anyOf and reports nested-changed where appropriate.
- Array item schema changes appear at the correct JSON Pointer path.
- Changes originating inside combiners produce nested-changed records containing children change records.
- Unit tests cover arrays, allOf, oneOf, and anyOf scenarios.