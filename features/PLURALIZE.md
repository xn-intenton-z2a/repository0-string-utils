# PLURALIZE

Summary
Implement a basic English pluralize function using a small rule set suitable for common nouns.

Specification
- pluralize(word: string): string
  - If input is null/undefined return empty string.
  - Rules (applied in order):
    1. If word ends with s, x, z, ch, or sh add "es".
    2. If word ends with a consonant followed by "y" replace "y" with "ies".
    3. If word ends with "f" or "fe" replace with "ves".
    4. Otherwise add "s".
  - Irregular plurals are out of scope.

Examples
- pluralize "box" -> "boxes".
- pluralize "baby" -> "babies".
- pluralize "leaf" -> "leaves".

Files to change
- src/lib/main.js: add pluralize implementation
- tests/unit/pluralize.test.js: tests for the rule examples and edge cases
- README.md: usage example

Acceptance Criteria
- pluralize("box") returns "boxes".
- pluralize("baby") returns "babies".
- pluralize handles null/undefined by returning empty string.
