# PLURALIZE_LEVENSHTEIN

Description

Implement basic English pluralisation and the Levenshtein distance algorithm. These features support grammatical transformations and fuzzy string comparison used by higher-level utilities.

Behavior

- Pluralize: Follow simple English plural rules: words ending in s, x, z, ch, sh add "es"; words ending in a consonant followed by y become y -> ies; words ending in f or fe become ves; all other words add s. Irregular plurals are out of scope. Null/undefined input => empty string.
- Levenshtein: Compute the minimum edit distance between two strings using insertions, deletions, and substitutions. Treat null/undefined as an empty string. Must work efficiently for moderately sized strings (typical use under a few thousand characters).

API

Export named functions from src/lib/main.js: pluralize(input), levenshtein(a, b).

Edge cases

- pluralize("") == ""
- pluralize(null) == ""
- levenshtein(null, "abc") == 3
- Unicode characters are treated as code unit sequences; document in tests that behavior is on JS string code points.

Acceptance criteria

1. pluralize("box") == "boxes"
2. pluralize("baby") == "babies"
3. pluralize("knife") == "knives"
4. levenshtein("kitten", "sitting") == 3
5. Unit tests verify null/empty handling and common rule coverage.
