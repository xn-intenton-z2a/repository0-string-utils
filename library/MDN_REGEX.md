MDN_REGEX

Table of contents:
1. Purpose and context
2. Core metacharacters and their meanings
3. Flags and effects
4. Unicode and property escapes
5. Escaping pattern for use in dynamic RegExp
6. Lookarounds and groups
7. Reference details and examples (implementation patterns)
8. Digest and attribution

1 Purpose and context
Regular expressions are patterns used to match character combinations in strings. They are used with RegExp methods and String methods such as replace, match, search, split.

2 Core metacharacters (must be escaped to be literal)
Characters that change meaning in regexes and must be escaped when used literally: .  ^  $  *  +  ?  (  )  [  ]  {  }  |  \\  /

3 Flags and effects
- g: global search across input (affects replace and exec iterations)
- i: case-insensitive matching
- m: multiline mode where ^ and $ match line boundaries
- s: dotall where '.' matches newlines
- u: unicode; enables Unicode code point handling and property escapes
- y: sticky; matches only from lastIndex position without skipping

4 Unicode and property escapes
- Unicode property escapes: \p{...} and \P{...} require the u flag. Useful properties include \p{L} (letters), \p{N} (numbers), \p{M} (marks/diacritics), \p{Z} (separators), \p{S} (symbols).
- Use these to write Unicode-aware patterns such as /[^\p{L}\p{N}]+/gu to match non-alphanumeric runs.

5 Escaping pattern for dynamic input
- To safely embed arbitrary text into a regex, escape all special characters. Recommended replacement: input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  - This exact replacer escapes characters listed above and is safe for most JS engines.

6 Lookarounds and grouping
- Positive lookahead: (?=...)
- Negative lookahead: (?!...)
- Positive lookbehind: (?<=...)
- Negative lookbehind: (?<!...)
Note: lookbehind requires engine support (modern Node versions include it).

7 Reference details and implementation patterns
- Use the u flag when using Unicode property escapes or when treating strings as code points.
- For splitting words in a Unicode-aware way: use a regex combining \p{L} and \p{N} classes with flags 'gu' rather than naive ASCII-only classes.

8 Detailed digest
Selected technical content from MDN regular expressions: description of flags g i m s u y, list of metacharacters, and guidance to use Unicode property escapes for language-aware patterns.

Date retrieved: 2026-03-23

Attribution and crawl data
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
Bytes retrieved during crawl: 215652 bytes
