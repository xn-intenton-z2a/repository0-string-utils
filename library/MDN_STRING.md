MDN_STRING

TABLE OF CONTENTS
1. Core string APIs and signatures
2. Unicode considerations and code points
3. Normalization and diacritics removal (implementation)
4. Replace/replaceAll and pattern-based transforms
5. Practical reference signatures

NORMALISED EXTRACT
Core APIs (behavioral details for implementation):
- length: number of UTF-16 code units in the string; to count Unicode code points use Array.from(s).length or iterate with for..of.
- charAt(index): returns a one-character string from UTF-16 code unit at index; charCodeAt(index) returns the UTF-16 code unit numeric value; codePointAt(index) returns the Unicode code point value (handles surrogate pairs).
- toLowerCase(), toUpperCase(): locale-insensitive case mapping suitable for canonicalizing ASCII and most Unicode text for comparisons (use Intl when locale-specific casing needed).
- trim(), trimStart(), trimEnd(): remove whitespace from ends as defined by ECMAScript whitespace definitions.
- slice(start?, end?), substring(start?, end?), split(separator?, limit?): standard substring and splitting behavior — note split with RegExp may produce empty strings for adjacent separators.
- replace(searchValue, replaceValue): when searchValue is a string only first occurrence replaced; when searchValue is a RegExp with /g all matches replaced; replaceAll(searchValue, replaceValue) replaces all occurrences when searchValue is a string or global RegExp.
- normalize(form = 'NFC'): returns Unicode-normalized string. Use forms: NFC, NFD, NFKC, NFKD. NFC is default.

Unicode considerations (implementer notes):
- length reports UTF-16 code units, not code points; use Array.from or spread operator to iterate by code points.
- For removing diacritics reliably use normalization plus removal of combining marks (see "Normalization and diacritics removal").

NORMALIZATION AND DIACRITICS REMOVAL (implementation)
- Goal: convert accented characters to base ASCII where possible.
- Procedure: 1) s = input.normalize('NFKD') 2) remove combining marks using regex that targets the Combining Diacritical Marks block: s = s.replace(/[\u0300-\u036f]/g, '') 3) optionally collapse and remove any remaining non-ASCII if slug/identifier required.
- Note: Unicode decomposition may produce code points outside U+036F for extended combining marks; for full coverage use Unicode property escapes where supported: s.replace(/\p{M}/gu, '') which removes all mark (M) categories.

REPLACE / REPLACEALL (pattern details)
- replace expects either string or RegExp. When replacing with a string, replacement patterns like $& (match), $1..$n (capturing groups) are interpreted.
- For global replacements prefer replaceAll if replacing a literal substring multiple times; otherwise use replace with a global RegExp.

PRACTICAL REFERENCE SIGNATURES
- String.prototype.normalize(form?: 'NFC'|'NFD'|'NFKC'|'NFKD') : string
- String.prototype.replace(searchValue: string|RegExp, replaceValue: string|function) : string
- String.prototype.replaceAll(searchValue: string|RegExp, replaceValue: string|function) : string
- String.prototype.split(separator?: string|RegExp, limit?: number) : string[]
- String.prototype.toLowerCase() : string
- String.prototype.toUpperCase() : string

SUPPLEMENTARY DETAILS
- Use Array.from(s) to iterate code points. Example: const codePoints = Array.from(s); // not shown as code block per extraction rules.
- To remove diacritics portably in Node >= 10+: s.normalize('NFKD').replace(/[\u0300-\u036f]/g, ''); use /\p{M}/gu if Unicode property escapes are available for broader coverage.

REFERENCE DETAILS (exact patterns to use in implementations)
- Remove combining diacritics: /[\u0300-\u036f]/g
- Unicode property removal (broader): /\p{M}/gu
- Escape regex characters pattern (see MDN_REGEXP): /[.*+?^${}()|[\]\\]/g with replace '\\$&'

DIGEST
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
Retrieved: 2026-03-21
Data obtained during crawl: ~40 KB (truncated during fetch)

ATTRIBUTION
Content extracted and normalised from MDN Web Docs (Mozilla). MDN content licensed under CC-BY-SA; consult MDN for exact license and attribution requirements.
