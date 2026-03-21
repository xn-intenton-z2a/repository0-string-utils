# LEVENSHTEIN

Description

Implement Levenshtein edit distance between two strings using a memory-optimized dynamic programming algorithm. The implementation must iterate by Unicode codepoints (use Array.from or spread into an array) so surrogate pairs and astral characters are handled correctly.

API

levenshtein(a, b): number
- If a or b is nullish treat them as empty strings.
- Use a two-row rolling array DP implementation to minimize memory usage while preserving correctness.
- Iterate over codepoints rather than UTF-16 code units so emoji and other non-BMP characters are handled.

Acceptance Criteria

- levenshtein of "kitten" and "sitting" returns 3.
- levenshtein of two identical strings returns 0.
- levenshtein handles empty strings and null/undefined by returning the length of the other string.
- levenshtein accepts Unicode characters and produces the expected numeric distance for example pairs containing non-ASCII characters.

Tests (implementation guidance)

- Unit tests should cover the above acceptance criteria and include at least one example with surrogate-pair characters such as emoji to verify codepoint-aware iteration.