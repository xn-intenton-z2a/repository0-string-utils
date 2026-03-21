Title: NPM_STRIPTAGS

Table of Contents:
- Purpose and API
- Behavior and options
- HTML entity handling
- Edge cases and examples
- Retrieval digest and attribution

Purpose:
- Remove HTML tags from a string, leaving inner text. Optionally allow a whitelist of tags to preserve (implementation-specific).

API (common patterns across striptags-like libraries):
- striptags(html: string, allowed?: string[] | string) -> string
  - html: input containing markup
  - allowed: optional list or space-separated string of tag names to allow (e.g., 'b i').
  - returns plain-text string where tags are removed and inner text preserved.

Behavior and options:
- Handling of malformed HTML: typically uses a forgiving parser approach and removes angle-bracketed constructs interpreted as tags.
- Entities: striptags focuses on removing tags; entity decoding (e.g., &amp; -> &) is often provided by a separate library (e.g., 'he'). Combine with an entity decoder after stripping if decoded output is required.
- Whitespace: removing tags may leave doubled whitespace; caller should trim/normalize whitespace if necessary.

Edge cases:
- null/undefined -> coerce to '' before processing.
- Script/style content: many implementations remove tags but preserve inline content; implementers may choose to remove script/style contents entirely if needed.

Retrieval digest:
- Source URL: https://www.npmjs.com/package/striptags
- Retrieved: 2026-03-21
- Note: automated crawl returned Cloudflare challenge HTML; content above summarises the definitive behavior expected from striptags-style packages. Confirm specific API variations on the live package page.