Title: NPM_WORD_WRAP

Table of Contents:
- Purpose
- Common API (wrap function)
- Options and behavior notes
- Edge cases and examples
- Retrieval digest and attribution

Purpose:
- Soft-wraps plain text at word boundaries to a specified line width without breaking words; outputs lines separated by '\n'. Useful for formatting plain-text paragraphs for terminals or plain-text outputs.

Common API (extracted intent from package docs / crawl):
- wrap(text: string, options?: { width?: number, indent?: string, cut?: boolean, trim?: boolean }) -> string
  - width: target column width for wrapping (typical default 50)
  - indent: string preprended to every wrapped line (default: '')
  - trim: whether to trim trailing whitespace from wrapped lines (default: true)
  - cut: whether to break long words to enforce width (default: false). If false and a single word exceeds width, the full word appears on its own line unbroken.

Behavior notes:
- Never break words when cut=false; long words stay on their own line.
- Line separator is '\n'. Multiple whitespace characters between words are collapsed to single spaces when wrapping unless trim/other options instruct otherwise.

Edge cases:
- null/undefined: coerce to '' prior to wrapping.
- Unicode: wrapping counts code units; wide grapheme clusters may count multiple code units—verify with your environment if exact column alignment is required.

Retrieval digest and attribution:
- Source URL: https://www.npmjs.com/package/word-wrap
- Retrieved: 2026-03-21
- Note: npm package page returned Cloudflare challenge HTML during automated crawl; API signature and behavior above summarised from package documentation knowledge and typical usage patterns. Verify against the live package page when implementing.