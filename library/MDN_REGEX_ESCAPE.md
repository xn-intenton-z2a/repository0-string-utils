MDN_REGEX_ESCAPE

Table of contents:
- Regex special characters list
- Exact escaping pattern for user input
- Building RegExp from escaped strings
- Edge cases and notes
- Reference details
- Detailed digest and metadata

NORMALISED EXTRACT

Regex special characters that must be escaped when creating a RegExp from arbitrary input:
- Characters: . * + ? ^ $ { } ( ) | [ ] \ /

Exact, actionable escape pattern (use this to escape arbitrary strings before constructing RegExp):
- Use: s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  - Explanation: the character class contains the special characters; replace with a backslash followed by the matched character (\$& means the matched substring prefixed by a backslash).

Notes on RegExp construction:
- When using a RegExp literal: delimiters are /.../ so the forward slash must be escaped inside the literal; when using the RegExp constructor pass the escaped string as new RegExp(escapedString, flags).
- Always escape user input used in dynamic patterns to prevent unintended pattern behavior or ReDoS exposures from attacker-supplied patterns; escaping ensures literal matching of special characters.

REFERENCE DETAILS
- Escaping function pattern: replace(/[.*+?^${}()|[\]\\]/g, '\\$&') -> string
- When embedding into a RegExp literal, also escape '/'. When using RegExp constructor, pass the escaped string and flags separately: new RegExp(escaped, 'g')

DETAILED DIGEST (extracted content, retrieved 2026-03-27):
- Extracted the canonical character set to escape for safe RegExp construction and the precise replace pattern used widely in MDN examples.
- Retrieval date: 2026-03-27

ATTRIBUTION & CRAWL METADATA
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
- Bytes retrieved: 215650
