# LEVENSHTEIN

Status: IMPLEMENTED — Implemented in src/lib/main.js (see issue #90)

Summary

Provide a levenshtein function exported from src/lib/main.js that computes the edit distance between two strings using the standard dynamic programming algorithm. Null or undefined inputs should be treated as empty strings.

Specification

- Signature: levenshtein(a, b) returning an integer edit distance.
- Treat null and undefined as empty strings.
- Support Unicode strings; counts should be by characters, not bytes.
- Use an algorithm with O(m * n) time and O(min(m, n)) memory where feasible.

Acceptance criteria

- levenshtein kitten and sitting returns 3
- levenshtein empty string and abc returns 3
- levenshtein identical strings returns 0
- Null or undefined inputs are handled and treated as empty strings

Notes

- Unit tests should include the canonical kitten/sitting case and additional edge cases including Unicode.
