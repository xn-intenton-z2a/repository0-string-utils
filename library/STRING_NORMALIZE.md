NORMALISED EXTRACT

Table of contents
- Syntax
- Normalization forms and effects
- Byte/character behavior (combining marks)
- When to normalize (use-cases)
- Implementation notes and polyfills
- Reference (API signature)
- Digest and retrieval metadata

Syntax
String.prototype.normalize([form])

Parameters
- form (optional): one of NFC, NFD, NFKC, NFKD. If omitted, engines default to NFC.

Return
- A new string containing the Unicode-normalized form of the original string.

Normalization forms and effects
- NFC (Normalization Form Canonical Composition): perform canonical decomposition followed by canonical composition; yields composed characters when possible (example: LATIN SMALL LETTER E + COMBINING ACUTE -> single code point U+00E9).
- NFD (Normalization Form Canonical Decomposition): canonical decomposition only; characters may be split into base code point + combining marks.
- NFKC (Compatibility Composition): compatibility decomposition (maps compatibility-equivalent characters to a canonical form) then canonical composition; useful for folding compatibility variants (e.g., superscripts, ligatures) into base forms.
- NFKD (Compatibility Decomposition): compatibility decomposition only.

Effects on indexing and slicing
- normalize() changes the sequence of code points; an operation that relies on code unit indices (String.prototype.slice, charAt, codeUnit offsets) may produce different results after normalization.
- Use normalization prior to equality checks, canonicalization, storage keys, or slug generation when strings must be compared reliably across sources.

When to normalize (use-cases)
- Before string equality or keys used in maps/indexes to ensure canonically equivalent strings compare equal.
- Prior to case folding or normalization for search/indexing.
- Prior to slugification or filename generation when you want stable composed/compatibility-consistent output.

Implementation notes and fallbacks
- Most modern JS engines implement String.prototype.normalize. Confirm availability: typeof ''.normalize === 'function'. If unavailable, use a small polyfill or library that implements Unicode normalization (e.g., portable unorm polyfills).
- Normalization is Unicode-aware but does not by itself perform case folding. For case-insensitive canonical comparisons combine normalization with Unicode case-folding (String.prototype.toLowerCase is not full Unicode case folding; use Intl or libraries for strict matching in edge cases).
- Normalization operates on code points; combining sequences (base + combining marks) are transformed according to Unicode Normalization Algorithms.

Reference (exact API specification)
- Method: String.prototype.normalize([form]) -> String
- Parameters: form: optional string union {'NFC','NFD','NFKC','NFKD'}; default 'NFC' when omitted.
- Return value: a String containing the normalized text.
- Effects: canonical/compatibility decomposition and/or composition applied according to the Unicode Normalization Forms.

Supplementary details
- Implementation complexity: canonical equivalence mapping tables, composition exclusion lists, and compatibility mappings are required; rely on engine implementation or a tested polyfill to avoid incomplete implementations.
- Performance: normalization traverses code points and applies multi-character mappings; cost is roughly linear with input length but depends on canonical mapping table complexity.

Digest (source: MDN String.prototype.normalize)
- Retrieved: 2026-03-23
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Data obtained during crawl: approximately 168.0 KB (HTML page content)

Attribution
- Content extracted and condensed from the MDN page above (Mozilla Developer Network). See source URL for authoritative spec and examples.
