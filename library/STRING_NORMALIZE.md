STRING_NORMALIZE

Table of contents:
- Purpose
- API signature
- Normalization forms and effects
- When to use which form
- Implementation notes for slugification and diacritic removal
- Edge cases and compat
- Detailed digest
- Attribution and data size

Purpose:
Explain JavaScript String normalization forms and how to use them to decompose characters for operations like diacritic removal and equivalence comparison.

API signature (exact):
String.prototype.normalize(form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string
- form default: 'NFC' if omitted
- returns: a normalized string according to the chosen Unicode Normalization Form

Normalization forms and their effects (concrete):
- NFC (Normalization Form C): canonical decomposition followed by canonical composition. Use when storing or comparing user-visible text in composed form.
- NFD: canonical decomposition where composite characters are split into base + combining marks (e.g., "é" -> "e" + U+0301).
- NFKC: compatibility decomposition followed by composition; also maps compatibility characters (e.g., ligatures) to compatibility equivalents.
- NFKD: compatibility decomposition without recomposition; produces separated compatibility equivalents and combining marks (useful before removing diacritics).

When to use which form (rules):
- For diacritic removal before slugify: use 'NFKD' then strip combining mark codepoints U+0300–U+036F.
- For canonical textual comparisons where composition matters: prefer 'NFC'.

Implementation notes for slugification and diacritic removal (exact instructions):
1. s = input.normalize('NFKD')
2. s = s.replace(/[\u0300-\u036f]/g, '')
3. proceed with ASCII filtering and lowercasing

Edge cases and compatibility:
- Older JS engines may not implement normalize; check typeof String.prototype.normalize === 'function' and provide fallback.
- Normalization does not transliterate characters to ASCII except for decomposition that exposes base letters; some scripts will remain non-ASCII and should be filtered or handled by a transliteration mapping if required.

Detailed digest:
Extracted the exact method signature and semantics for NFC, NFD, NFKC and NFKD and the recommended pattern for removing diacritics (NFKD + removing U+0300–U+036F). Retrieval date: 2026-03-21.

Attribution and data size:
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
Bytes retrieved during crawl: 171989
