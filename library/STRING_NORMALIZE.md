STRING_NORMALIZE

Table of contents:
1. Purpose
2. API
3. Normalization forms
4. Removing diacritics (implementation pattern)
5. Implementation notes and caveats
6. Supplementary details
7. Reference details
8. Detailed digest
9. Attribution

1. Purpose
Normalize Unicode strings for stable comparisons, slug generation, and consistent casing by converting canonical and compatibility compositions.

2. API
String.prototype.normalize(form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD') -> string
- form default: 'NFC'.

3. Normalization forms
- NFC: Canonical composition. Useful for stable storage/compare.
- NFD: Canonical decomposition.
- NFKC: Compatibility composition (maps compatibility equivalents).
- NFKD: Compatibility decomposition (decomposes ligatures and compatibility chars).
Recommendation: Use NFKD before removing diacritics when preparing slugs or plain ASCII approximations.

4. Removing diacritics (implementation pattern)
- Step A: Decompose compatibility characters: result = input.normalize('NFKD')
- Step B: Remove combining marks (Unicode Mark category) using Unicode property escapes. Replace all occurrences matching the Unicode Mark category with the empty string. Use a global, unicode RegExp to match marks.
- Pattern (plain form): match Unicode Mark category (\p{M}) and remove matches with global+unicode flags.
- Outcome: decomposed characters lose their combining diacritics while base letters remain.

5. Implementation notes and caveats
- Unicode property escapes require RegExp with the 'u' flag and modern engine support; verify runtime supports \p{}.
- Decomposition affects grapheme clusters: some composed emoji or scripts may be altered; run tests for languages needing locale-sensitive folding.
- For slug generation follow diacritic removal with: remove non-alphanumeric characters, collapse whitespace, trim, replace spaces with hyphens, and lowercase.

6. Supplementary details
- Use NFKD to handle ligatures (e.g., ﬁ) and compatibility characters.
- For full locale-aware case folding consider Intl.Collator or locale-specific rules; basic toLowerCase is sufficient for most ASCII-focused slugs.

7. Reference details (explicit)
- Method signature: String.prototype.normalize(form?: 'NFC'|'NFD'|'NFKC'|'NFKD'): string
- Unicode Mark removal: construct a RegExp that targets the Unicode Mark category and run global replacement; e.g. use pattern \p{M} with flags 'gu'.
- Example implementation pattern (plain description): 1) call normalize('NFKD'), 2) replace all Unicode marks (\p{M}) with '', 3) remove any remaining non-alphanumeric/space characters, 4) collapse spaces to '-'.

8. Detailed digest
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- Retrieved: 2026-03-21T22:50:23.455Z
- Bytes fetched during crawl: 166623
- Key technical points used: normalization forms (NFC/NFD/NFKC/NFKD), recommended NFKD for decomposition before diacritic removal, use of Unicode property escapes (\p{M}) to remove combining marks.

9. Attribution
- MDN Web Docs — String.prototype.normalize(), retrieved 2026-03-21, 166623 bytes.
