# PLURALIZE

Summary
Implement pluralize(word) exported from src/lib/main.js to produce a basic English plural form according to simple rules.

Specification
- Treat null, undefined or empty string as an empty string.
- Rules to implement (in order):
  - If word ends in s, x, z, ch or sh, add "es".
  - If word ends with a consonant followed by "y", replace "y" with "ies".
  - If word ends with "f" or "fe", replace with "ves".
  - Otherwise add "s".
- Irregular plurals (mouse/mice) are explicitly out of scope.

Acceptance Criteria
- pluralize("bus") -> "buses"
- pluralize("box") -> "boxes"
- pluralize("baby") -> "babies"
- pluralize("boy") -> "boys"
- pluralize("leaf") -> "leaves"
- pluralize(null) -> ""

Testing
- tests/unit/pluralize.test.js should cover the stated rules and edge cases including short words and Unicode.
