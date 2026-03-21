STRING_NORMALIZE

Normalised extract
Overview
String.prototype.normalize(form) returns a Unicode-normalized string. Use forms to control composition/decomposition: NFC (canonical composition), NFD (canonical decomposition), NFKC (compatibility composition), NFKD (compatibility decomposition). Default form is "NFC".

Table of contents
1. Syntax and return
2. Normalization forms explained
3. Using normalize for diacritic removal
4. Implementation notes and edge cases

1. Syntax and return
String.prototype.normalize([form]) -> string
form (optional): one of "NFC" | "NFD" | "NFKC" | "NFKD". If omitted, behavior is equivalent to "NFC".

2. Normalization forms explained
- NFC: canonical composition. Characters are composed where possible, producing composed code points.
- NFD: canonical decomposition. Characters are decomposed into base character + combining marks.
- NFKC: compatibility composition. Also applies compatibility mappings (e.g., ligatures) before composition.
- NFKD: compatibility decomposition. Decomposes compatibility characters to compatibility equivalents and combining marks.

3. Using normalize for diacritic removal (practical pattern)
- Goal: turn accented letters into plain ASCII/letters and remove combining marks so they can be stripped.
- Steps: normalize with NFKD so compatibility characters are decomposed, remove combining marks, then continue processing.
- Common remove-combining-marks regex: /[\u0300-\u036f]/g
- Example pipeline (conceptual): s = s.normalize('NFKD'); s = s.replace(/[\u0300-\u036f]/g, '');
- For broader Unicode combining marks use Unicode property escapes where available: /\p{Mn}/gu (Mn = Nonspacing_Mark)

4. Implementation notes and edge cases
- normalize is a string method; it preserves surrogate pairs and code points; use Unicode-aware regex (u flag) when matching code points.
- Some characters decompose into multiple code points; removing combining marks may change string length and indexing.
- Normalization may be a no-op if string is already in the requested form.
- Browser/Node support: String.prototype.normalize is widely supported in modern JS runtimes; when targeting very old engines, feature-detect.

Supplementary details
- Prefer NFKD when preparing strings for comparisons, slugs, or diacritic removal; NFKC/NFKD apply compatibility mappings which are useful for one-to-one ASCII mapping.
- When using property escapes (\p{}), ensure the JS runtime supports the 'u' (Unicode) flag.

Reference details
- Exact API: String.prototype.normalize([form]) -> string
- Valid form values: "NFC", "NFD", "NFKC", "NFKD". Default: "NFC".
- Implementation pattern for diacritic removal: s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '') or s.normalize('NFKD').replace(/\p{Mn}/gu, '').
- Best practice: normalize early when canonical equivalence matters (sorting, comparison, slug generation).

Detailed digest
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
Retrieved: 2026-03-21
Bytes fetched: 171989

Attribution
MDN Web Docs — String.prototype.normalize() (MDN).