# PLURALIZE

Overview
A simple English pluralisation helper following the mission rules: words ending in s/x/z/ch/sh add "es"; consonant + y -> replace y with ies; words ending in f or fe -> replace with ves; otherwise add s. Irregular plurals are out of scope. Treat null/undefined as empty string.

Acceptance criteria
- Exported function name: pluralize
- pluralize of bus -> buses
- pluralize of box -> boxes
- pluralize of church -> churches
- pluralize of baby -> babies
- pluralize of wolf -> wolves
- pluralize of cat -> cats
- pluralize of null/undefined -> (empty string)

Implementation notes
- Implement simple rule-based branching with lowercasing for pattern checks while returning plural in the same case as input where reasonable (primary requirement is correctness of form)

Tests
- Unit tests covering each rule above plus edge cases: empty string, single-letter words, and Unicode words.
