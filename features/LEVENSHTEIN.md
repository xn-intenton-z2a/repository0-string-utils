# LEVENSHTEIN

Overview
Compute the Levenshtein edit distance between two strings using the Wagner–Fischer dynamic programming algorithm. Treat null/undefined as empty string. Implementation should be Unicode-aware (work on code points) and may use a space-optimised two-row approach.

Acceptance criteria
- Exported function name: levenshtein (or levenshteinDistance)
- levenshtein of kitten and sitting -> 3
- levenshtein of empty string and empty string -> 0
- levenshtein handles null/undefined by treating them as empty strings
- Implementation is correct for typical small inputs used in unit tests

Implementation notes
- Use Array.from to iterate code points safely for Unicode
- A memory-optimised two-row DP implementation is acceptable and preferred

Tests
- Unit tests including the canonical kitten vs sitting example, empty inputs, and a Unicode example (e.g., different accented forms).
