# LEVENSHTEIN

Summary
Provide a Levenshtein distance implementation that computes the minimum edit distance between two strings.

API
Exported function: levenshtein(a, b) -> integer

Behavior
- Treat null/undefined as empty string.
- Use a standard dynamic programming algorithm with O(m*n) time and O(min(m,n)) memory where feasible.

Acceptance criteria
- levenshtein kitten, sitting -> 3
- levenshtein empty, abc -> 3; levenshtein abc, abc -> 0
- Exported from src/lib/main.js and tests in tests/unit/levenshtein.test.js

Implementation notes
- Implement in plain JS without dependencies
- Add tests for Unicode and empty inputs