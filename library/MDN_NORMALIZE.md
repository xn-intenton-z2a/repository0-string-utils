MDN_NORMALIZE

Table of contents:
- Normalization forms and semantics
- Use-cases for string utilities (diacritic removal, canonicalization)
- Implementation pattern for removing diacritics
- Caveats and compatibility notes
- Reference details
- Detailed digest and metadata

NORMALISED EXTRACT

Normalization forms (exact semantics):
- NFC: Canonical Composition. Combines code points into composed forms where possible.
- NFD: Canonical Decomposition. Expands composed characters into base + combining marks.
- NFKC: Compatibility Composition. Applies compatibility decomposition then composes.
- NFKD: Compatibility Decomposition. Decomposes compatibility equivalents (useful to separate ligatures and compatibility forms).

Signature:
- String.prototype.normalize(form?: 'NFC'|'NFD'|'NFKC'|'NFKD') -> string

Direct implementation guidance:
- To remove diacritics: use compatibility decomposition then strip combining marks:
  s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
- For slug generation: normalize to NFKD, remove combining marks, optionally map known locale-specific characters to ASCII fallbacks (e.g., 'ß' -> 'ss', 'ø' -> 'o') before removing non-alphanumerics.

Caveats:
- Normalization does not transliterate characters to ASCII beyond decomposition; for full transliteration use a mapping table or transliteration library.
- Normalization affects composed characters and therefore string indices; operate on normalized values consistently.
- Emoji sequences and some compatibility mappings may not be altered in the same way as Latin diacritics; test on representative inputs.

REFERENCE DETAILS (method signature and options):
- normalize(form?: string) -> string
  - form values accepted exactly: 'NFC', 'NFD', 'NFKC', 'NFKD' (case-sensitive in spec usage but engines accept upper/lower variants as documented).

DETAILED DIGEST (extracted content, retrieved 2026-03-27):
- Extracted canonical descriptions of normalization forms and the recommended pattern for removing combining diacritical marks using the Unicode combining-mark range U+0300..U+036F.
- Retrieval date: 2026-03-27

ATTRIBUTION & CRAWL METADATA
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Bytes retrieved: 166617
