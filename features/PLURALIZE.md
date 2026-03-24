# PLURALIZE

Summary
Provide a basic English pluralize function implementing a small rule set sufficient for common nouns.

API
Exported function: pluralize(word) -> string

Behavior and rules
- Return empty string for null/undefined input.
- Rules to implement (in order):
  - If word ends with s, x, z, ch, or sh -> add es
  - If word ends with consonant + y -> replace y with ies
  - If word ends with f or fe -> replace with ves
  - Otherwise add s
- Irregular plurals are out of scope

Acceptance criteria
- pluralize bus -> buses
- pluralize box -> boxes
- pluralize baby -> babies
- pluralize leaf -> leaves
- pluralize cat -> cats
- Exported from src/lib/main.js and tests in tests/unit/pluralize.test.js

Implementation notes
- Keep rules deterministic and well-ordered
- Add tests for edge cases and Unicode words where appropriate