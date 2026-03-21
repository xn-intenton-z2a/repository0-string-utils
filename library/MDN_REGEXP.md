MDN_REGEXP

TABLE OF CONTENTS
1. Regex metacharacters and quantifiers
2. Flags and effects
3. Unicode and property escapes
4. Escaping user input for literal regex construction
5. Reference patterns and examples

NORMALISED EXTRACT
Regex metacharacters and quantifiers (implementer-critical):
- Metacharacters: ^ $ \\ . * + ? ( ) [ ] { } | /
- Character classes and shorthands: \d (digits), \D (non-digits), \w (word), \W (non-word), \s (whitespace), \S (non-whitespace)
- Quantifiers: * (0+), + (1+), ? (0 or 1), {n}, {n,}, {n,m}
- Anchors: ^ (start), $ (end), \b (word boundary), \B (non-word-boundary)
- Groups: ( ) capturing; (?: ) non-capturing; lookahead (?= ), (?! ); lookbehind (?<= ), (?<! ) (lookbehind requires runtime support)

Flags and effects:
- g: global — find all matches (affects replace/match behavior)
- i: case-insensitive
- m: multiline — ^ and $ match start/end of line
- s: dotAll — dot matches newline
- u: unicode — enables Unicode semantics and property escapes
- y: sticky — match at lastIndex only
- d: hasIndices (in newer engines) — returns match indices

Unicode and property escapes:
- Use \p{...} with the u flag to match Unicode properties, e.g. \p{L} letters, \p{N} numbers. Example to match letters or numbers: /[\p{L}\p{N}]+/u
- Be explicit about the u flag when using surrogate pairs or Unicode property escapes.

Escaping user input for literal regex construction (exact pattern):
- To safely escape a literal string for RegExp: use the pattern /[.*+?^${}()|[\]\\]/g and replace each match with a backslash prefixed version by using the replacement string '\\$&'.
  - Example replacement expression (plain): input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

REFERENCE PATTERNS
- Escape regex special characters: /[.*+?^${}()|[\]\\]/g  replacement '\\$&'
- Split non-letter/number sequences (Unicode-aware): /[^\p{L}\p{N}]+/gu
- Remove combining marks (use after normalize): /[\u0300-\u036f]/g or broader /\p{M}/gu

DIGEST
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
Retrieved: 2026-03-21
Data obtained during crawl: ~40 KB (truncated)

ATTRIBUTION
Content extracted and normalised from MDN Web Docs (Mozilla). Refer to MDN for full reference and examples.
