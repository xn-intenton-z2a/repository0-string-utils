REGEX_ESCAPE

Normalised extract
Overview
Escape special characters in arbitrary text to safely embed that text inside a regular expression. Special characters that must be escaped when used literally: . * + ? ^ $ { } ( ) | [ ] \ 

Table of contents
1. Purpose and when to escape
2. Canonical escape pattern
3. Implementation pattern and example
4. Edge cases and Unicode

1. Purpose and when to escape
- When constructing a RegExp from user input or arbitrary text, escape regex metacharacters to avoid changing pattern semantics.

2. Canonical escape pattern
- Widely used pattern to match characters that need escaping: /[.*+?^${}()|[\]\\]/g
  - This character class lists: . * + ? ^ $ { } ( ) | [ ] and backslash. The class is used with global flag to find all instances.

3. Implementation pattern and example
- Function signature: escapeRegExp(input: string) -> string
- Implementation (conceptual): return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  - Replacement uses "$&" to insert the matched character, prefixed by a literal backslash so the returned string has the character escaped for RegExp constructors.
- Example: escapeRegExp('a+b') -> 'a\\+b' (literal plus is escaped)

4. Edge cases and Unicode
- Forward slash (/) does not need escaping when using RegExp constructor new RegExp(str) but must be escaped in literal /.../ if the raw pattern contains '/'.
- When building dynamic regex strings, prefer RegExp constructor with escaped input: new RegExp(escapeRegExp(input))

Supplementary details
- Alternative libraries (Lodash): lodash.escapeRegExp implements the same pattern; behavior is consistent across implementations.

Reference details
- Canonical regex to find characters to escape: /[.*+?^${}()|[\]\\]/g
- Replacement: replace(match, '\\$&') to prefix each special character with a backslash.
- Function signature: escapeRegExp(string) -> string

Detailed digest
Sources:
- MDN: Regular expressions (escaping) — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping (retrieved 2026-03-21, bytes fetched: 221808)
- Lodash escapeRegExp documentation — https://lodash.com/docs/4.17.15#escapeRegExp (retrieved 2026-03-21, bytes fetched: 549929)

Attribution
MDN Web Docs; Lodash documentation.