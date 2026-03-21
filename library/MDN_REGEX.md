MDN_REGEX

TABLE OF CONTENTS
- Regex metacharacters and flags
- Unicode property escapes
- Escaping special characters (escapeRegex)
- Practical patterns for tokenisation and replacements
- Reference signatures and exact patterns
- DETAILED DIGEST
- ATTRIBUTION

REGEX METACHARACTERS AND FLAGS (compact)
- Metacharacters: . ^ $ * + ? ( ) [ ] { } | \\ and special-sequence constructs like \b, \d, \s
- Flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), y (sticky)
- For Unicode-aware matching use 'u' flag; combine with Unicode property escapes for categories (e.g. \p{L} letters)

UNICODE PROPERTY ESCAPES
- Syntax: \p{Property=Value} or \p{L} shorthand; requires 'u' flag
- Useful classes: \p{L} (letters), \p{N} (numbers), \p{M} (marks/diacritics), \p{Zs} (space separators)

ESCAPING SPECIAL CHARACTERS (escapeRegex)
- Exact escape pattern (JS): replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  - Explanation: character class contains every special char; replacement inserts a backslash before the matched character
- Use the escape function before building dynamic RegExp from user input or tokens

TOKENISATION & REPLACEMENT EXAMPLES
- Split on non-alphanumeric Unicode-aware tokens: s.split(/[^\p{L}\p{N}]+/u)
- Remove diacritics: s.normalize('NFKD').replace(/\p{M}/gu, '')
- Replace multiple separators with single: s.replace(/[^\p{L}\p{N}]+/gu, ' ')

REFERENCE DETAILS
- escapeRegex(s: string) -> string. Pattern: /[.*+?^${}()|[\]\\]/g replacement: '\\$&'
- Unicode-aware keep-only pattern: /[^\p{L}\p{N}\s-]/gu (removes anything not letter/number/space/hyphen)

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- Retrieved at: 2026-03-21T16:53:58Z
- Bytes retrieved: 215652
- Extract: definitions of flags and escapes, and guidance to use 'u' flag with \p{...} escapes. The above patterns and escapeRegex come directly from standard JS regex practices documented on MDN.

ATTRIBUTION
- MDN Regular Expressions guide. Data fetched on 2026-03-21T16:53:58Z, 215652 bytes.
