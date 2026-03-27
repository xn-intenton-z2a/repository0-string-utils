# LEVENSHTEIN

Summary
Implement levenshtein(a, b) exported from src/lib/main.js to compute the edit distance between two strings.

Specification
- Treat null or undefined as an empty string.
- The function returns a non-negative integer: the minimum number of insertions, deletions or substitutions required to transform a into b.
- Implementation must support Unicode at the codepoint level to avoid splitting surrogate pairs.
- A classic dynamic programming algorithm is acceptable; optimisations to lower memory are optional.

Acceptance Criteria
- levenshtein("kitten", "sitting") -> 3
- levenshtein("", "abc") -> 3
- levenshtein(null, null) -> 0

Testing
- tests/unit/levenshtein.test.js should include the examples above and additional cases with Unicode characters.
