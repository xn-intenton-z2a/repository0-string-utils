MDN_REGULAR_EXPRESSIONS

Table of contents:
- Normalised extract: core behavior and special characters
- Escaping user input for RegExp
- Unicode and flags
- Supplementary details
- Reference details (escape pattern and examples)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
JavaScript regular expressions use the following metacharacters that must be escaped when used literally: . ^ $ * + ? ( ) [ ] { } | \ /. To safely embed arbitrary user text inside a RegExp, replace each special character with a backslash-escaped version; the canonical escape character class used in many implementations is [.*+?^${}()|[\]\\]. Use the g flag for global matching, u for Unicode-aware matching, i for case-insensitive, m for multiline, and y for sticky matches.

Escaping user input for RegExp (implementation pattern):
- Escape pattern: [.*+?^${}()|[\]\\]
- Replacement pattern to produce a safe literal: replace each match of the escape pattern with a backslash-prefixed version (resulting replacement token is a backslash followed by the matched character).
- Typical usage: construct a RegExp from escaped user input when you must treat the input literally.

Unicode and flags:
- The u flag enables correct handling of surrogate pairs and Unicode property escapes (when supported), otherwise character classes and dot do not match full code points.
- For text processing that must normalize diacritics, combine String.prototype.normalize with removal of combining marks after decomposition.

Supplementary details:
- Character classes and quantifiers behave the same as other regex engines; when building cross-platform logic prefer explicit character class ranges rather than relying on locale-sensitive shorthand.
- For performance, prefer compiled RegExp that avoid catastrophic backtracking (use non-greedy quantifiers, atomic groups patterns where available, or simpler patterns).

Reference details (exact patterns and implementation):
- Escape user-input pattern: [.*+?^${}()|[\\]\\]
- Recommended JS escape implementation pattern: use a global replace with that character-class and prefix each match with a backslash. Example replacement string: \$& (literal backslash then the matched character). Note: when coding this string in source, you will need to escape backslashes for string literals.
- Use u flag for Unicode-aware regexes when matching code points.

Detailed digest (excerpt and retrieval):
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- Retrieval date: 2026-03-25
- Data obtained: 221828 bytes
- Digest: MDN provides canonical descriptions for special characters, flags, character classes, escaping techniques and practical advice for constructing safe RegExp from user input. It documents the effect of flags (g, i, m, u, y) and suggests patterns for escaping input and handling Unicode.

Attribution:
Content adapted from MDN Web Docs: Regular expressions guide. Data size recorded during crawl: 221828 bytes.