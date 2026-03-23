WORD_WRAP

Table of contents:
1. Purpose
2. API signature and options
3. Default option values and effects
4. Algorithm and edge-case behavior
5. Integration notes
6. Digest and attribution

1 Purpose
Soft-wrap paragraphs at word boundaries producing lines separated by newline character. Never break words unless explicitly enabled.

2 API signature
- wrap(text: string, options?: object) -> string

3 Options (from jonschlinkert/word-wrap README)
- width: Number; default 50. The maximum line width before wrapping.
- indent: String; default two spaces (used at the beginning of each line).
- newline: String; default '\n'. String appended at the end of each line.
- escape: function; default a no-op; an escape function applied to each line after splitting.
- trim: Boolean; default false. When true, trim trailing whitespace from the returned string.
- cut: Boolean; default false. When true, break words longer than the width between letters; when false, place a long word on its own line unbroken.

4 Algorithm and edge-case behavior
- The function splits input into paragraphs on existing newline separators, wraps each paragraph independently, and preserves indentation.
- Tokenization is by whitespace; wrapping adds tokens to the current line until the width would be exceeded, then starts a new line.
- If a single token is longer than width and cut is false, the token is emitted as its own line. If cut is true, the token is broken across lines.

5 Integration notes
- For the mission's wordWrap utility, set newline to '\n', ensure cut is false to meet the requirement "Never break a word", and handle existing newlines by wrapping each paragraph in isolation.

6 Digest and attribution
Source: https://github.com/jonschlinkert/word-wrap (README)
Date retrieved: 2026-03-23
Bytes retrieved during crawl: 334586 bytes
