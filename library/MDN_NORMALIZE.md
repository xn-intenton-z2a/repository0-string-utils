MDN_NORMALIZE

TABLE OF CONTENTS
1. String.prototype.normalize signature and forms
2. Differences between NFC/NFD and NFKC/NFKD
3. Practical pattern to remove diacritics
4. Notes and pitfalls

NORMALISED EXTRACT
- Signature: String.prototype.normalize(form?: 'NFC'|'NFD'|'NFKC'|'NFKD') : string
- Behavior: returns the Unicode Normalization Form of the string. Default form is 'NFC'.
- Forms:
  - NFC: Canonical composition. Useful for storage and comparison.
  - NFD: Canonical decomposition.
  - NFKC/NFKD: Compatibility composition/decomposition — expands compatibility characters (fi ligatures, full-width forms) into compatibility-equivalent sequences.

PRACTICAL PATTERN TO REMOVE DIACRITICS (exact steps):
1) s = input.normalize('NFKD') to decompose combined characters into base + combining marks where applicable.
2) remove combining mark characters: s = s.replace(/[\u0300-\u036f]/g, '')
3) (optional) remove any remaining non-ASCII characters or apply a mapping table for specific characters.

NOTES AND PITFALLS
- Some languages and characters do not decompose into base+combining marks; normalization will not always produce an ASCII-compatible base for every grapheme.
- Unicode property escapes (\p{M}) require the 'u' flag and are broader than the simple U+0300..U+036F range: s.replace(/\p{M}/gu, '')

DIGEST
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
Retrieved: 2026-03-21
Data obtained during crawl: ~40 KB (truncated)

ATTRIBUTION
Content extracted and normalised from MDN Web Docs (Mozilla).
