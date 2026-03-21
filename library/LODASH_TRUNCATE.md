Title: LODASH_TRUNCATE

Table of Contents:
- Purpose and signature
- Options and exact behavior
- Implementation notes and examples
- Reference details
- Retrieval digest

Purpose and signature:
truncate([string=''], [options]) -> string
- Shortens a string if it exceeds a given length and appends an omission string (default '...')

Options and exact behavior:
- options:
  - length (number): maximum string length including omission. Default: 30.
  - omission (string): string to indicate text was removed. Default: '...'.
  - separator (RegExp|string|undefined): optional; if provided, the truncated result will break at the last match of separator before the truncation point. If a string, it is used as a substring search; if a RegExp, the last occurrence before the cutoff is used.
- Behavior:
  - If original length <= length, return original string unchanged.
  - If truncated, ensure returned string length <= length by trimming characters from the cutoff point and appending omission.
  - When separator is provided, attempt to truncate at the last separator before the cutoff to avoid mid-word breaks.

Implementation notes and examples:
- Example: truncate('Hello world', { length: 8 }) -> 'Hello...'
- Example with separator: truncate('Hello, world!', { length: 8, separator: /,?\s/ }) -> 'Hello...'
- Guard null/undefined: coerce to '' before processing.

Reference details:
- Signature: truncate(string: any, options?: { length?: number, omission?: string, separator?: RegExp | string }): string
- Returns: truncated string not exceeding options.length characters when possible.

Retrieval digest:
- Source URL: https://lodash.com/docs/4.17.15#truncate
- Retrieved: 2026-03-21
- Attribution: Lodash documentation.