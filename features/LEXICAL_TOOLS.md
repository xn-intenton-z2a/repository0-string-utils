# LEXICAL_TOOLS

# Overview

Provides two utilities: pluralize, which implements a small deterministic set of English pluralisation rules, and levenshtein, which computes the edit (Levenshtein) distance between two strings.

# Acceptance Criteria

Pluralize rules:

- Words ending in s/x/z/ch/sh add "es" (e.g., bus -> buses, quiz -> quizzes).
- Words ending with a consonant followed by y change y to ies (e.g., baby -> babies).
- Words ending in f or fe change to ves (e.g., leaf -> leaves, wife -> wives).
- All other words add "s" (e.g., cat -> cats).
- pluralize(null) returns an empty string.

Levenshtein:

- levenshtein("kitten", "sitting") returns 3.
- levenshtein handles empty strings and Unicode input correctly.

# Tests

- Unit tests cover each pluralisation rule, regular cases, edge cases, and the levenshtein example above.

# Implementation Notes

- Pluralize applies the deterministic rule set above and does not attempt to handle irregular plurals (out of scope).
- Levenshtein uses a standard dynamic programming implementation that works with Unicode string characters.