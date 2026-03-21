Title: MDN_STRING_NORMALIZE

Table of Contents:
- Purpose and signature
- Normalization forms and effects
- Implementation details and considerations
- Examples and edge cases
- Supplementary details
- Reference details (method signature)
- Retrieval digest and attribution

Purpose and signature:
String.prototype.normalize([form]) -> string
- form: optional string: one of "NFC", "NFD", "NFKC", "NFKD" (case-sensitive). If omitted, defaults to "NFC".
- Returns a new string with Unicode normalization applied.

Normalization forms and effects:
- NFC (Normalization Form C): canonical composition. Combines sequences of characters into composed forms where canonical equivalents exist.
- NFD (Normalization Form D): canonical decomposition. Decomposes composed characters to base + combining marks.
- NFKC (Compatibility Composition): like NFC but applies compatibility mappings (may change semantics like spacing, font variants, superscripts).
- NFKD (Compatibility Decomposition): like NFD plus compatibility mappings.

Implementation details and considerations:
- Use for stable string comparison and index-insensitive operations when Unicode combining marks are present.
- Normalizing both operands before equality/comparison avoids false mismatches (e.g., "e\u0301" vs "\u00E9").
- Normalization is a pure operation returning a new string (strings are immutable).
- Performance: normalization iterates Unicode codepoints; avoid calling inside tight loops for large texts; cache normalized variants when repeatedly comparing the same strings.
- Do not rely on normalization to remove markup or control characters; it only affects Unicode composition/decomposition and compatibility mappings.

Examples and edge cases:
- null/undefined inputs: method exists only on String prototype; guard with (s || '').normalize('NFC') or String(s).normalize('NFC') when s may be nullish.
- Empty string: returns empty string unchanged.
- Combining marks: "e\u0301".normalize('NFC') -> "\u00E9".

Supplementary details:
- For sorting/locale-aware comparisons, pair normalization with Intl.Collator when language-specific rules matter.
- When storing/keys: normalize to a chosen form (commonly NFC) at ingestion time for consistent indexing.

Reference details (exact API):
- Method: String.prototype.normalize(form?)
  - Parameters: form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'
  - Returns: string (normalized result)
  - Throws: RangeError if form is provided but not one of the accepted strings.

Retrieval digest:
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Retrieved: 2026-03-21
- Attribution: MDN Web Docs (Mozilla) — content retrieved as HTML; extracted key API and normative details.
- Note: content extracted from MDN's reference page for String.prototype.normalize.