NPM_HE

TABLE OF CONTENTS
1. Purpose: HTML entity decoding
2. Exact decoding algorithm (named and numeric entities)
3. Common named entities mapping (minimum set)
4. Reference details and regex patterns

NORMALISED EXTRACT
Purpose: convert strings containing HTML entities into their decoded Unicode equivalents (e.g., '&amp;' -> '&', '&#x27;' -> "'", '&#169;' -> '©').

Exact decoding algorithm (step-by-step):
1) If input is null/undefined return empty string.
2) Use a single pass replace with regex capturing entities: replace occurrences that match /&(#x[0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]+);/g with a replacer function.
3) In the replacer:
   - If the capture starts with '#x' parse the hex digits and convert to a code point: code = parseInt(hexDigits, 16); return String.fromCodePoint(code).
   - Else if the capture starts with '#' parse the decimal digits: code = parseInt(digits, 10); return String.fromCodePoint(code).
   - Else treat as a named entity: look up the exact name in a mapping table (case-sensitive per HTML named entity registrations) and return the mapped character if present; otherwise return the original match unchanged.

Common named entities (minimal mapping to implement):
- amp -> &
- lt -> <
- gt -> >
- quot -> "
- apos -> '
- nbsp -> U+00A0 (non-breaking space)

Exact regex pattern to find entities: /&(#x[0-9A-Fa-f]+|#\d+|[A-Za-z][A-Za-z0-9]+);/g

REFERENCE SIGNATURE
- decodeHtmlEntities(input: string): string

SUPPLEMENTARY DETAILS
- Numeric entities outside valid Unicode ranges should be handled defensively: if parseInt yields NaN or an out-of-range code point, return the original entity or replace with Unicode replacement character U+FFFD depending on policy.
- Full coverage of named entities requires an exhaustive table (HTML5 defines many); for the mission use the minimal set plus numeric decoding.

DIGEST
Source: https://www.npmjs.com/package/he (crawl returned Cloudflare interstitial; detailed package README not directly retrievable with curl)
Retrieved: 2026-03-21
Data obtained during crawl: Cloudflare interstitial; document includes exact algorithm and minimal named-entity mapping.

ATTRIBUTION
Algorithmic specification derived from HTML entity decoding semantics and common implementations (he, DOM parsers). For full named entity tables consult HTML Living Standard or package repositories.
