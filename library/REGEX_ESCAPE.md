REGEX_ESCAPE

Table of contents:
- Purpose
- Problem statement
- Exact characters that must be escaped
- Recommended escape function signature and exact pattern
- Examples and usage notes
- Edge cases
- Detailed digest
- Attribution and data size

Purpose:
Provide a safe, correct method to escape user input before injecting into a RegExp so that special characters lose their metacharacter meaning.

Problem statement:
User-provided strings can contain characters that change regex behavior (metacharacters). Escape them to treat input as a literal.

Exact characters that must be escaped in JavaScript RegExp literals and constructors:
- Backslash: \\
- Caret: ^
- Dollar: $
- Dot: .
- Pipe: |
- Question mark: ?
- Asterisk: *
- Plus: +
- Parentheses: ()
- Brackets: []
- Braces: {}
- Hyphen inside character classes may be significant; escape when inside [...] ranges

Recommended escape function (exact pattern and replacement):
- Function signature: escapeRegex(input: string): string
- Exact implementation pattern: replace all occurrences of the regex character class [.*+?^${}()|[\]\\] with an escaped version using replacement string '\\$&'
- Precise replacement expression: input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

Notes and examples:
- When constructing a RegExp from user input via the RegExp constructor, always escape user input first: new RegExp(escapeRegex(userInput), 'i')
- Escaping twice will produce unwanted backslashes; avoid double-escaping by only escaping raw user input.

Edge cases:
- If building a character class that intentionally includes ranges or brackets, escape characters differently or construct the class programmatically.
- For Unicode-aware patterns (u flag), escaping rules are the same for metacharacters; non-ASCII code points remain literal when escaped.

Detailed digest:
Extracted escaping guidance and the canonical character class used for escaping from MDN Regular Expressions guide (escaping section). Retrieval date: 2026-03-21.

Attribution and data size:
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
Bytes retrieved during crawl: 221808
