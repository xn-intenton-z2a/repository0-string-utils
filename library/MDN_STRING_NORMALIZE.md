MDN_STRING_NORMALIZE

Table of contents:
- Normalised extract: normalization forms and usage
- Removing diacritics by decomposition
- Unicode pitfalls and recomposition
- Supplementary details
- Reference details (API signature and patterns)
- Detailed digest and retrieval
- Attribution and data size

Normalised extract:
String.prototype.normalize(form) returns the Unicode-normalized form of a string. Supported forms are NFC, NFD, NFKC, NFKD. NFC and NFD are canonical composition/decomposition forms; NFKC and NFKD are compatibility forms that may change character semantics. To remove diacritics reliably: apply NFD or NFKD decomposition then remove combining marks by matching the Unicode combining range. Example technical pattern: perform str.normalize('NFKD') then remove characters in the combining diacritical marks block (range U+0300..U+036F).

Removing diacritics (implementation pattern):
- Decompose: s = s.normalize('NFKD')
- Remove combining marks: replace all characters matching Unicode range U+0300..U+036F with empty string (regex character class [\u0300-\u036F]).
- Optionally re-normalize to NFC if needed for downstream processing.

Unicode pitfalls:
- Some scripts use combining marks outside the basic U+0300..U+036F block; for full coverage consider extended ranges and Unicode property escapes (\p{M}) with the u flag where supported.
- Normalization may change string length and code point boundaries; use Unicode-aware iteration (for example using Array.from) when indexing by grapheme clusters.

Reference details (exact):
- API: String.prototype.normalize(form?: 'NFC'|'NFD'|'NFKC'|'NFKD') -> string
- Implementation snippet (pattern): s.normalize('NFKD').replace(/[\u0300-\u036F]/g, '')

Detailed digest (excerpt and retrieval):
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Retrieval date: 2026-03-25
- Data obtained: 172007 bytes
- Digest: MDN documents normalization forms, examples of when to use canonical vs compatibility forms and patterns for removing diacritics by decomposition and filtering of combining marks.

Attribution:
Content adapted from MDN Web Docs: String.prototype.normalize. Data size recorded during crawl: 172007 bytes.