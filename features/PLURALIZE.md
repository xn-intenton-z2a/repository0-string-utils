# PLURALIZE

Description

Implement a deterministic, rule-based English pluralization function as required by the mission. Irregular plurals are out of scope unless an explicit exceptions map is provided and tested.

API

pluralize(word): string
- If input is nullish return empty string.
- Apply the rules in order:
  1. If the word ends with s, x, z, ch, or sh, append "es".
  2. If the word ends with a consonant followed by 'y', replace 'y' with 'ies'.
  3. If the word ends with 'f' or 'fe', replace with 'ves'.
  4. Otherwise append 's'.
- Matching should be case-insensitive for rule detection; returning case-preserving output is acceptable but tests should validate the lowercase canonical examples.

Acceptance Criteria

- pluralize of "bus" returns "buses".
- pluralize of "box" returns "boxes".
- pluralize of "baby" returns "babies".
- pluralize of "leaf" returns "leaves".
- pluralize of "cat" returns "cats".
- Function returns empty string for null and undefined inputs.

Tests (implementation guidance)

- Include unit tests for the rules above plus negative checks for words that look similar to rule triggers but are irregular (documented as out of scope). If an exceptions map is added tests must cover it.