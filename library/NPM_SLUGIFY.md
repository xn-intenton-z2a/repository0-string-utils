NPM_SLUGIFY

Table of Contents
- Purpose and usage
- API (function signature and options)
- Normalised extract: behavior rules (transliteration, lowercasing, separators)
- Implementation notes for own slugify (no dependency)
- Reference details: options and effects
- Digest and attribution

Purpose and usage
The slugify package converts arbitrary strings into URL-friendly slugs: lowercased, whitespace replaced by dashes (or specified separator), non-alphanumeric characters removed or transliterated, and diacritics removed when configured.

API
- slugify(string, options?) -> string
- Common options: {replacement:'-', remove: regex|null, lower: boolean, strict: boolean, locale: string}
  - replacement: character used between words (default '-')
  - remove: RegExp to remove characters after transliteration
  - lower: force lowercase
  - strict: restrict to [A-Za-z0-9\-_.] depending on version
  - locale: locale-specific transliteration rules

Normalised extract: behavior rules
- Transliteration: converts non-ASCII letters with diacritics to base ASCII letters when possible (e.g., 'é' -> 'e').
- Remove or replace punctuation and symbols per remove option.
- Collapse consecutive separators into single separator and trim leading/trailing separators.
- If output becomes empty (input had no valid chars), return empty string.

Implementation notes for own slugify (no runtime dependency)
- Steps: 1) Normalize to NFKD and remove combining diacritical marks via regex /\p{M}/gu. 2) Convert to lowercase. 3) Replace any sequence of non-alphanumeric characters with separator. 4) Remove duplicates of separator and trim.
- Example implementation pattern: const slug = String(s||'').normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g,'').replace(/-+/g,'-');

Reference details
- npm slugify signature: slugify(string, { replacement: '-', remove: null, lower: false, strict: false, locale: 'en' }) -> string
- Effects: transliteration, remove pattern applied post-transliteration, lowercasing applied after transliteration/removal, trimming and collapse of separators.

Digest
Source: npm package page for slugify. Retrieval date: 2026-03-21.

Attribution and data size
Source URL: https://www.npmjs.com/package/slugify
Data retrieved: ~60 KB (Cloudflare challenge HTML returned).