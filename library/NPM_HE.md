Title: NPM_HE (HTML Entities Encoder/Decoder)

Table of Contents:
- Purpose and signature
- decode/encode method details
- Options and configuration
- Usage patterns and edge cases
- Retrieval digest and attribution

Purpose and signature:
- he: robust HTML entity encoder/decoder. Use to decode named and numeric HTML entities into their corresponding characters and to encode strings for safe HTML text output.

Core API (common):
- he.decode(html: string, options?): string
  - Decodes HTML entities such as &amp; &lt; &gt; &quot; &apos; and numeric entities like &#x27;.
- he.encode(text: string, options?): string
  - Encodes characters into HTML entities. Options control whether to use named entities where possible and minimal vs. full escaping.

Options and specifics:
- decode: may accept options to specify strict mode for malformed entities.
- encode: options often include 'useNamedReferences' (boolean), 'decimal' (boolean) to force numeric references, and a 'strict' flag.

Usage patterns and edge cases:
- Use he.decode after removing tags (strip) to convert entities to readable characters.
- null/undefined -> coerce to '' before calling.
- Be cautious when decoding untrusted HTML that has entity-based obfuscation; pair with sanitization if inserting into DOM.

Retrieval digest:
- Source URL: https://www.npmjs.com/package/he
- Retrieved: 2026-03-21
- Note: automated crawl returned Cloudflare challenge HTML for npm; API above summarises the canonical he API (decode/encode). Verify exact option names on the live package page when implementing.