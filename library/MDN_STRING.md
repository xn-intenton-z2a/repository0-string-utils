MDN_STRING

NORMALISED EXTRACT

Table of contents
- Unicode and normalization
- Case conversion and locale
- Trim and whitespace handling
- Replace and pattern-based transforms
- Iteration and code points

1. Unicode and normalization
- JavaScript string values are sequences of UTF-16 code units. Individual Unicode characters outside the BMP are represented by surrogate pairs; length counts code units, not code points. For Unicode-safe iteration use for...of or Array.from(string).
- String.prototype.normalize(form) returns a normalized string. Valid forms: NFC, NFD, NFKC, NFKD. Default form is NFC. Use NFKD to decompose compatibility characters into base characters plus combining diacritics which is the recommended approach for ASCII transliteration and slugification.
- Removing diacritics: after normalize('NFKD') remove combining marks with a Unicode range match for combining diacritical marks (characters U+0300..U+036F). Example approach: perform normalization then replace combining-mark ranges with empty string.

2. Case conversion and locale
- toLowerCase() and toUpperCase() perform case conversions using Unicode case-mapping rules. For locale-sensitive mapping, use locale-specific APIs where available. For typical slugging and comparisons convert to lower case after normalization.

3. Trim and whitespace handling
- trim(), trimStart(), trimEnd() remove Unicode whitespace per ECMAScript definition. For splitting into words prefer split on whitespace sequences or use a Unicode-aware word boundary pattern.

4. Replace and pattern-based transforms
- String.prototype.replace(searchValue, replaceValue) accepts strings or RegExp; when using RegExp, remember flag semantics. For global transformations use a global RegExp (g). When building RegExp from user data escape special characters to avoid injection.

5. Iteration and code points
- Use for...of, Array.from, or spread ([...str]) to iterate user-perceived characters (code points) correctly. Avoid indexing by code unit when handling emoji and astral symbols.

SUPPLEMENTARY DETAILS
- Implementation pattern for common tasks in string-utils:
  1) Normalise input: if null/undefined return empty string. Else coerce to string and normalize using normalize('NFKD') when preparing for ASCII-only transforms.
  2) Remove combining marks: replace occurrences in range U+0300..U+036F.
  3) Lower-case and remove non-ASCII characters with a conservative set of permitted characters (a-z, 0-9) or transliterate using a char map.
  4) Collapse multiple separators and trim separators from ends.
- Edge cases: empty string => return empty string; null/undefined => return empty string; preserve characters outside ASCII when function is expected to support Unicode.

REFERENCE DETAILS
- Method signatures (ECMAScript semantics):
  - String.prototype.normalize([form]) -> string; form is one of NFC|NFD|NFKC|NFKD (default NFC)
  - String.prototype.toLowerCase() -> string
  - String.prototype.toUpperCase() -> string
  - String.prototype.trim() -> string
  - String.prototype.replace(searchValue, replaceValue) -> string
- Implementation notes for slug/truncate/case functions: use normalization first, then diacritic removal, then replacement and trimming.

DETAILED DIGEST
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- Retrieved: 2026-03-22T23:43:31.711Z
- Bytes fetched: 203497
- Key extracted technical facts: normalization forms and their practical use for decomposition (NFKD) and composition (NFC); UTF-16 code unit vs code point caveats; signatures of core string methods relevant to the library.

ATTRIBUTION
- Content extracted from MDN Web Docs (JavaScript String reference).