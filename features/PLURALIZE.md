# PLURALIZE

Overview
Implement a basic English pluralise function exported as pluralize from src/lib/main.js. The implementation follows a small set of deterministic rules and excludes irregular plurals.

Specification
Apply the following rules in order:
- Words ending in s, x, z, ch, or sh add "es".
- Words ending with a consonant followed by y drop the y and add "ies".
- Words ending in f or fe change to "ves".
- All other words add "s".
- Treat null or undefined as empty string and return empty string.

Acceptance Criteria
- The library exports pluralize.
- pluralize of "box" produces "boxes".
- pluralize of "party" produces "parties".
- pluralize of "knife" produces "knives".
- pluralize of "car" produces "cars".
- pluralize of empty string, null, or undefined produces empty string.
