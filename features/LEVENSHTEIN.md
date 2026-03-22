# LEVENSHTEIN

Summary
Implement a Levenshtein edit distance function that returns the minimum number of single-character edits required to change one string into another.

Specification
- levenshtein(a: string, b: string): number
  - If either input is null/undefined treat it as the empty string.
  - Returns a non-negative integer denoting the edit distance.
  - Unicode-aware: treat JavaScript string code points as characters (acceptable to operate on code units for this repository, but tests must include simple Unicode examples).

Examples
- levenshtein "kitten", "sitting" -> 3.

Files to change
- src/lib/main.js: add levenshtein implementation
- tests/unit/levenshtein.test.js: tests for example, empty inputs, and simple Unicode cases
- README.md: usage example and note on behaviour for null/undefined

Acceptance Criteria
- levenshtein("kitten", "sitting") returns 3.
- levenshtein handles null/undefined by treating missing inputs as empty strings and returning numeric distance.
