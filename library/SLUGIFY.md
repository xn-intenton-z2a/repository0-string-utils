SLUGIFY

Normalised extract
Overview
Convert free-form text into a URL-friendly slug: lowercase, words separated by single hyphens, remove punctuation, strip diacritics, and trim hyphens. Prefer Unicode-aware handling when available.

Table of contents
1. Canonical pipeline
2. Unicode-aware implementation notes
3. ASCII-fallback implementation
4. Edge cases and best practices

1. Canonical pipeline
1) Normalise Unicode: s = s.normalize('NFKD')
2) Remove combining marks: s = s.replace(/\p{Mn}/gu, '')  (or /[\u0300-\u036f]/g for many combining marks)
3) Convert to lower case: s = s.toLowerCase()
4) Remove unwanted characters: s = s.replace(/[^\p{L}\p{N}\s-]+/gu, '')
5) Replace whitespace sequences with single hyphen: s = s.trim().replace(/\s+/g, '-')
6) Collapse multiple hyphens: s = s.replace(/-+/g, '-')
7) Trim leading/trailing hyphens: s = s.replace(/^-|-$/g, '')

2. Unicode-aware implementation notes
- Use Unicode property escapes (\p{L} for letters, \p{N} for numbers, \p{Mn} for nonspacing marks) with the 'u' flag for correct code-point handling.
- When property escapes are unavailable, use an ASCII-fallback that removes non-word characters.

3. ASCII-fallback implementation
- Simpler pipeline for ASCII-only environments:
  s = s.normalize('NFKD');
  s = s.replace(/[\u0300-\u036f]/g, '');
  s = s.toLowerCase();
  s = s.replace(/[^\w\s-]+/g, '');
  s = s.trim().replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

4. Edge cases and best practices
- If a single token (word) exceeds desired width in UI, keep the token unbroken rather than breaking inside the token.
- For language-specific transliterations (Cyrillic, Chinese, etc.), consider a language-aware mapping layer; compatibility mapping via NFKD is not a transliteration for many scripts.
- Ensure resulting slug length and allowed characters meet your application's URL/path rules.

Reference details
- Implementation patterns above are drawn from common slugify libraries (see source) and MDN Unicode normalization guidance.
- Example: "Hello World!" -> hello-world

Detailed digest
Source: https://github.com/simov/slugify
Retrieved: 2026-03-21
Bytes fetched: 301079

Attribution
simov/slugify (GitHub) — README and implementation notes.