LODASH_TRUNCATE

Table of contents
- Purpose
- Signature and defaults
- Options semantics (length, omission, separator)
- Examples
- Implementation notes and edge-cases
- Retrieval digest and attribution

Purpose
truncate shortens a string to a maximum length and appends an omission indicator. It prefers truncation at a separator when provided to avoid cutting words mid-token.

Signature and defaults
- _.truncate(string, [options]) -> string
- options properties (defaults):
  - length: 30 (maximum result string length including omission)
  - omission: '...' (string appended when truncation occurs)
  - separator: undefined (string or RegExp; when provided, truncation tries to break at the last occurrence of separator within the limit)

Options semantics
- length counts the total characters in the returned string including omission. If the string length is less than or equal to length, returns the original string.
- omission is appended to indicate truncation. If omission length is greater than or equal to length, the function returns a truncated omission or an empty string according to implementation details.
- separator (string or RegExp): when present, the algorithm will search for the last index where separator matches within the truncated portion and use that cut point to avoid splitting words. If separator is a RegExp, use its last index semantics to find a match.

Examples
- _.truncate('hi-diddly-ho there, neighborino', { length: 24 }) -> 'hi-diddly-ho there, n...'
- _.truncate('hello world', { length: 5, omission: '…' }) -> 'he…' (depending on implementation rules for counting)

Edge-cases and behavior
- If length <= omission.length, returned value will be an appropriate slice of omission or an empty string; callers should validate options.
- Null/undefined string input -> treat as empty string and return ''.
- Unicode: counting is by JS string length (UTF-16 code units). Surrogate pairs may be counted as two; consider normalization if precise Unicode-grapheme-length counting is required.

Retrieval digest
- Source: Lodash truncate docs (reference)
- Retrieved: 2026-03-21
- Bytes retrieved (Content-Length header for lodash docs endpoint when fetched): 28

Attribution
- Source URL: https://lodash.com/docs/4.17.15#truncate