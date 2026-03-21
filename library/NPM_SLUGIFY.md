NPM_SLUGIFY

TABLE OF CONTENTS
1. Purpose and common behaviour
2. Implementation algorithm (step-by-step)
3. Regular expressions and exact patterns
4. Options and configuration points

NORMALISED EXTRACT
Purpose: produce a URL-friendly slug from arbitrary Unicode text: lowercase ASCII words separated by hyphens, no leading/trailing hyphens, collapse repeated separators.

Implementation algorithm (exact steps):
1) If input is null/undefined return empty string.
2) s = String(input)
3) Normalize: s = s.normalize('NFKD') to decompose characters
4) Remove combining diacritics: s = s.replace(/[\u0300-\u036f]/g, '') (or /\p{M}/gu where supported)
5) Convert to lower case: s = s.toLowerCase()
6) Replace any sequence of characters that are not letters or numbers with a single hyphen: s = s.replace(/[^\p{L}\p{N}]+/gu, '-')
7) Trim leading/trailing hyphens: s = s.replace(/^-+|-+$/g, '')
8) Optionally remove non-ASCII leftover characters if strict ASCII desired: s = s.replace(/[^a-z0-9-]/g, '')
9) Collapse multiple hyphens produced by step 6 if not already collapsed: s = s.replace(/-{2,}/g, '-')
10) Return s (empty string if all removed)

Exact regex patterns to use:
- Decomposition removal: /[\u0300-\u036f]/g or /\p{M}/gu
- Non-letter/number replacement (Unicode-aware): /[^\p{L}\p{N}]+/gu -> '-'
- Trim hyphens: /^-+|-+$/g
- Strict ASCII filter (optional): /[^a-z0-9-]/g

OPTIONS AND CONFIGURATION
- replacement character: allow options.replacement (default '-')
- lower: boolean (default true)
- removeNonAscii: boolean (default false) — if true, apply ASCII filter at the final step

DIGEST
Source: https://www.npmjs.com/package/slugify (crawl returned Cloudflare interstitial; algorithm derived from MDN normalization + common slugify implementations)
Retrieved: 2026-03-21
Data obtained during crawl: Cloudflare interstitial returned; primary content not fetchable via simple curl. Document contains recommended implementation steps and exact patterns.

ATTRIBUTION
Algorithmic approach synthesised from MDN normalization details and common open-source slugify implementations (slugify, limax). Where npm README was blocked, repository-level algorithms were referenced conceptually.
