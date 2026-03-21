WIKIPEDIA_ENGLISH_PLURAL

Table of Contents
- Basic pluralisation rules (regular)
- Specific transformation rules required by mission
- Implementation patterns and examples
- Edge cases and Unicode considerations
- Reference details: exact rule list and matching order
- Digest and attribution

Basic pluralisation rules
Implement the following ordered rules (apply top-to-bottom):
1) If word ends with s, x, z, ch, sh -> append "es" (e.g., bus -> buses, box -> boxes, church -> churches)
2) If word ends with consonant + 'y' -> replace 'y' with 'ies' (e.g., party -> parties). Vowels are a, e, i, o, u.
3) If word ends with 'f' or 'fe' -> replace with 'ves' (e.g., leaf -> leaves, knife -> knives). Apply only to typical cases; do not attempt to enumerate exceptions.
4) Otherwise append 's'.

Specific transformation rules required by mission
- Matching should be case-preserving for the stem: "Party" -> "Parties". Implement by remembering original casing and applying transform then restoring capitalization pattern (e.g., if first letter was uppercase, capitalise output's first letter).
- Treat null/undefined as empty string -> return empty string.
- For single-letter inputs, append 's'.

Implementation patterns
- Use regex checks in order:
  - if (/([sxz]|ch|sh)$/i.test(word)) return word + 'es';
  - if (/([^aeiou])y$/i.test(word)) return word.replace(/y$/i, 'ies');
  - if (/(?:fe|f)$/i.test(word)) return word.replace(/(?:fe|f)$/i, 'ves');
  - else return word + 's';
- To preserve case: detect if original is all uppercase, capitalize first letter, or lower-case entirely, then apply same pattern to result.

Edge cases and Unicode
- Use Unicode-aware regex flags (u) where character classes include letters beyond ASCII if desired (e.g., /\p{L}/u).
- Do not attempt to pluralize irregular nouns (mouse/mice) as out of scope.

Reference details
- Exact ordered rules above must be applied sequentially. Regular expressions provided in Implementation patterns are the canonical actionable patterns.

Digest
Source: Wikipedia - English plural. Retrieval date: 2026-03-21.

Attribution and data size
Source URL: https://en.wikipedia.org/wiki/English_plural
Data retrieved: ~274.9 KB
Attribution: Wikipedia