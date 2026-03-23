NORMALISED EXTRACT

Table of contents
- Constructor signature
- Options and resolved options
- Primary methods and return types
- Segment object structure
- Usage patterns (grapheme/word/sentence)
- Fallbacks and polyfills
- Reference (API signatures)
- Digest and retrieval metadata

Constructor signature
new Intl.Segmenter([locales[, options]])

Parameters
- locales (optional): a BCP 47 language tag string or array of tags.
- options (optional): object with properties:
  - granularity: one of 'grapheme', 'word', 'sentence'. Determines boundary type.

Primary methods
- segmenter.segment(inputString) -> iterable
  - Returns an iterable (Segments) which yields SegmentData objects for each boundary in inputString.
  - The iterable is suitable for iteration with for...of and direct consumption.
- segmenter.resolvedOptions() -> Object
  - Returns an object with properties such as locale and granularity signaling the resolved runtime options.

SegmentData structure (items yielded by segment())
- segment: the substring for the segment (String).
- index: integer code-unit index (Number) of the segment start inside the input string.
- isWordLike: boolean (present when granularity is 'word') — true when the segment is classified as word-like.
- Note: exact shape may vary slightly by environment but these fields are standard per the spec and MDN reference.

Usage patterns
- Grapheme segmentation (granularity: 'grapheme'): use for safe truncation, correct emoji/combining-mark-aware slicing, and cursor movement. Guarantees not to split extended grapheme clusters.
- Word segmentation (granularity: 'word'): use to implement word-wrap, word-based truncation, or to detect word boundaries for tokenization. Use isWordLike to avoid treating punctuation-only tokens as words.
- Sentence segmentation (granularity: 'sentence'): use for sentence-level splitting for display or summarization tasks.

Fallbacks and notes
- When Intl.Segmenter is unavailable, fallback strategies include regex-based heuristics, third-party libraries, or basic whitespace splitting for non-critical cases—but these can break on emoji, ZWJ sequences, and complex scripts.
- Prefer Intl.Segmenter in environments that support it for correctness with Unicode text segmentation rules (UAX #29).

Reference (API signatures)
- new Intl.Segmenter(locales?: string|string[], options?: {granularity?: 'grapheme'|'word'|'sentence'}) -> Intl.Segmenter
- Intl.Segmenter.prototype.segment(input: string) -> Iterable<SegmentData>
- Intl.Segmenter.prototype.resolvedOptions() -> {locale: string, granularity: string, ...}

Digest (source: MDN Intl.Segmenter)
- Retrieved: 2026-03-23
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter
- Data obtained during crawl: approximately 154.4 KB (HTML page content)

Attribution
- Content condensed from MDN (Intl.Segmenter) and aligned with Unicode Text Segmentation (UAX #29) guidance where applicable.
