NPM_SLUGIFY

Table of contents
- Typical slugify behavior and options
- Recommended implementation pattern (no dependency)
- Edge cases and Unicode handling

Typical slugify behavior and options (npm slugify)
- Common signature: slugify(input: string, options?: {replacement?: string, lower?: boolean, remove?: RegExp|string, locale?: string, trim?: boolean}) -> string
- Common defaults: replacement = '-', lower = true, trim = true
- remove option: pattern used to remove characters (e.g., /[^\w\s-]/g) or locale-specific filters

Recommended implementation pattern (dependency-free)
- Steps:
  1. Coerce to string and normalize('NFKD') to decompose accents.
  2. Remove diacritical marks: replace /\p{M}/gu with '' (or strip combining marks by regex).
  3. Convert to lower-case (if lower option true).
  4. Replace any sequence of non-alphanumeric characters with replacement (use Unicode properties: /[^\p{L}\p{N}]+/gu).
  5. Trim replacement characters from ends.

Edge cases and Unicode handling
- For CJK and scripts without spaces, keep characters that are letters or numbers; avoid inserting separators between CJK ideographs unless desired.
- Use normalize + remove combining marks to handle accented Latin letters reliably.

Reference details (examples)
- slugify('Hello World!', {lower:true}) -> 'hello-world'
- Implementation regex patterns:
  - Remove combining marks: /[\p{M}]/gu
  - Replace non-alphanumerics: /[^\p{L}\p{N}]+/gu -> replacement

Digest
- Source: npm slugify package page; retrieved: 2026-03-21; data size: 7174 bytes (crawl captured).

Attribution
- npm package: slugify — https://www.npmjs.com/package/slugify
