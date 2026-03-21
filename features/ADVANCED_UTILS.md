# ADVANCED_UTILS

## Summary
Specification for three advanced utility functions: escapeRegex, Pluralize, and Levenshtein distance.

## Description
- escapeRegex: return a string where all RegExp metacharacters are escaped with a backslash so the result can be used in a literal RegExp constructor safely.
- Pluralize: basic English pluralisation following simple rules: words ending in s/x/z/ch/sh add es; consonant+y -> replace y with ies; f/fe -> ves; otherwise add s. Irregular plurals are out of scope.
- Levenshtein distance: compute the edit distance between two strings (insert, delete, substitute cost 1). Handle Unicode code points correctly.

Treat null or undefined as empty string and return appropriate numeric results for distance (distance between empty and empty is 0).

## Acceptance Criteria
- escapeRegex: input a.b produces a\.b (dot escaped)
- Pluralize: box -> boxes; baby -> babies; leaf -> leaves; cat -> cats
- Levenshtein: input kitten and sitting produces 3
- All functions handle empty, null, and Unicode inputs gracefully

## Implementation Notes
- Use library/REGEXP.md and library/LEVENSHTEIN.md as references for correct behaviour
- Implement Levenshtein with O(m*n) dynamic programming using code point aware iteration

## Tests
- Unit tests for regex escaping common metacharacters, pluralise rules and edge cases, and Levenshtein pairs including empty strings and Unicode samples
