MDN_NORMALIZE

NORMALISED EXTRACT

Table of contents
- Normalization forms and meaning
- When to use each form
- Practical recipe for ASCII transliteration

1. Normalization forms and meaning
- Four normalization forms exist:
  - NFC: canonical decomposition followed by canonical composition (composed form)
  - NFD: canonical decomposition (decomposed form)
  - NFKC: compatibility decomposition then composition (compatibility composed form)
  - NFKD: compatibility decomposition (compatibility decomposed form)
- Compatibility forms (NFKC/NFKD) map compatibility characters (ligatures, superscripts, compatibility punctuation) to their compatibility equivalents.

2. When to use each form
- Use NFC for stable storage and comparison when canonical equivalence should be preserved.
- Use NFKD when preparing text for ASCII transliteration because it decomposes characters to base characters plus combining marks and replaces compatibility characters by their simpler equivalents.

3. Practical recipe for ASCII transliteration (slugification)
- Steps:
  1) Coerce input to string; handle null/undefined by returning empty string.
  2) normalize('NFKD') to decompose combined characters and compatibility forms.
  3) Remove combining diacritical marks (range U+0300..U+036F) to leave base letters.
  4) Optionally map remaining non-ASCII characters via a character transliteration map for languages with special mappings.
  5) Convert to lower case and replace whitespace/separators with the desired separator.
  6) Remove characters outside the permitted set, collapse repeated separators, and trim separators from ends.

SUPPLEMENTARY DETAILS
- Using NFKD is not lossless for certain compatibility distinctions; choose based on whether compatibility mapping is acceptable for your use case.
- Always apply normalization before computing Levenshtein distance or equality checks when you expect visually identical strings with different canonical forms to match.

REFERENCE DETAILS
- String.prototype.normalize(form) where form is one of NFC|NFD|NFKC|NFKD. Default is NFC.

DETAILED DIGEST
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Retrieved: 2026-03-22T23:43:31.711Z
- Bytes fetched: 171987

ATTRIBUTION
- Content extracted from MDN Web Docs (String.prototype.normalize reference).