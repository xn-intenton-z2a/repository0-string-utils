NPM_SLUGIFY

Table of contents:
- Function signature and common options
- Canonical algorithm used by slugify-style implementations
- Configuration options and effects
- Implementation example pattern (direct steps, no fenced code)
- Caveats and locale notes
- Reference details
- Detailed digest and metadata

NORMALISED EXTRACT

Function signature (typical):
- slugify(input: string, options?: { replacement?: string, remove?: RegExp, lower?: boolean, strict?: boolean, locale?: string, trim?: boolean }) -> string

Common options (concrete meanings):
- replacement: string to insert where separators/non-word runs occur (default '-').
- remove: RegExp that matches characters to remove entirely from the string prior to replacement.
- lower: boolean; if true, convert output to lower case.
- strict: boolean; if true, strip characters matching the remove pattern and only allow alphanumeric and separator characters.
- locale: string; optional locale code to select locale-specific transliterations.
- trim: boolean; if true, trim replacement characters from the ends after transformation.

Canonical algorithmic steps (implementable):
1. Normalize input (use NFKD to separate compatibility characters).
2. Remove combining marks (U+0300..U+036F) to strip accents.
3. Apply transliteration or locale-specific mapping for characters that decompose into ASCII equivalents when available.
4. Remove characters matching options.remove, if provided.
5. Replace remaining non-alphanumeric runs with the replacement string.
6. Collapse consecutive replacement characters into a single replacement.
7. Trim replacement characters from start and end if trim is true.
8. If options.lower is true, convert final result to lowercase.

Notes and caveats:
- Transliteration quality varies by implementation; do not assume full language-specific transliteration without using a transliteration table.
- Cloudflare or site anti-bot measures may return challenge pages for automated crawls; validate slugify behavior locally rather than relying solely on remote examples.

REFERENCE DETAILS
- slugify(input, options) -> string
  - options.replacement: string, default '-'
  - options.remove: RegExp, default undefined (implementation-specific)
  - options.lower: boolean, default false
  - options.strict: boolean, default false
  - options.locale: string, default undefined
  - options.trim: boolean, default true

DETAILED DIGEST (extracted content, retrieved 2026-03-27):
- Extracted the npm slugify package API surface and common transformation steps (normalize NFKD, remove diacritics, replace non-alphanumerics, collapse separators, optional lowercasing).
- Retrieval date: 2026-03-27

ATTRIBUTION & CRAWL METADATA
- Source: https://www.npmjs.com/package/slugify
- Bytes retrieved: 7153
