# PLURALIZE_LEVENSHTEIN

Summary

Implement two functions: pluralize and levenshtein. Both are exported from src/lib/main.js and must be implemented without external dependencies.

Acceptance criteria

- pluralize of "box" produces "boxes"
- pluralize of "party" produces "parties"
- pluralize of "wife" produces "wives"
- pluralize of "book" produces "books"
- pluralize returns empty string for null or undefined
- Levenshtein distance between "kitten" and "sitting" is 3
- Levenshtein handles empty strings and Unicode inputs gracefully

Implementation notes

- Pluralize rules (apply in order): words ending in s/x/z/ch/sh add "es"; consonant + y changes to "ies"; words ending in f or fe change to "ves"; all others add "s". Irregular plurals are out of scope.
- Levenshtein: dynamic programming implementation, O(mn) time; document complexity and add tests in tests/unit/pluralize-levenshtein.test.js.
