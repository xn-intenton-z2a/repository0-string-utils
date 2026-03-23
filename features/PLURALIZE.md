# PLURALIZE

Summary

Provide a pluralize function exported from src/lib/main.js that converts a singular English noun to its basic plural form using simple rule-based heuristics. Irregular and highly exceptional plurals are out of scope.

Specification

- Apply these rules in order:
  - If word ends in s, x, z, ch, or sh add the suffix es.
  - If word ends in a consonant followed by y, replace y with ies.
  - If word ends in f or fe, replace with ves.
  - Otherwise add s.
- Null or undefined input returns an empty string.
- Function should be case-preserving where reasonable (prefer returning lowercase for lowercase input).

Acceptance criteria

- pluralize box returns boxes
- pluralize baby returns babies
- pluralize leaf returns leaves
- pluralize dog returns dogs
- Null or undefined input returns an empty string

Notes

- Unit tests should cover each rule, case variations, and Unicode letters where applicable.
