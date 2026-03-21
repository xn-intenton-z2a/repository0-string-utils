# LEVENSHTEIN

Overview
Implement a function levenshtein that computes the edit distance between two strings and export it from src/lib/main.js. Treat null or undefined inputs as empty strings.

Specification
- Use the classic dynamic programming algorithm to compute insertions, deletions and substitutions minimal cost.
- The function returns a non-negative integer representing the edit distance.

Acceptance Criteria
- The library exports levenshtein.
- levenshtein of "kitten" and "sitting" returns 3.
- levenshtein of empty string and "abc" returns 3.
- levenshtein treats null or undefined as empty string (for example null vs "a" yields 1).
