MDN_INTL_SEGMENTER

Table of contents:
- API signature
- Options and granularity
- Segment object shape
- Usage patterns for word/ Grapheme segmentation
- Supplementary details and fallbacks
- Reference details (method signatures)
- Detailed digest and retrieval metadata

NORMALISED EXTRACT

API signature and behavior:
- Constructor: Intl.Segmenter(locales?: string | string[], options?: { granularity?: 'grapheme'|'word'|'sentence', localeMatcher?: 'lookup'|'best fit' }) -> Intl.Segmenter
- Method: segmenter.segment(input: string) -> Iterable<SegmentRecord>
- SegmentRecord shape (depending on granularity):
  - segment: string (the extracted substring for this boundary)
  - index: number (UTF-16 code unit index of segment start in the original string)
  - isWordLike?: boolean (present for granularity='word', true when the segment contains word characters)

Options and granularity:
- granularity='grapheme' returns grapheme clusters (user-perceived characters; avoids splitting emoji/combining marks).
- granularity='word' returns word segments and provides isWordLike to distinguish punctuation/whitespace segments from words.
- granularity='sentence' returns sentence segments.

Usage patterns (directly actionable):
- For Unicode-safe word wrapping: create Intl.Segmenter(locale, {granularity:'word'}) and iterate segmenter.segment(text); treat segments with isWordLike true as words and others as separators.
- For grapheme-aware character iteration (to avoid splitting emoji or diacritics): use granularity='grapheme' and iterate segment.segment values.
- segmenter.segment returns an iterable; use for..of to iterate: for (const seg of segmenter.segment(text)) { use seg.segment and seg.index }

SUPPLEMENTARY DETAILS:
- Intl.Segmenter uses UAX #29 rules internally and is preferred to manual regex-based splitting when full Unicode correctness is required.
- Browser and Node availability varies; check runtime support before using; provide a fallback that uses a simple regex split or a for-of codepoint iteration if not present.

REFERENCE DETAILS:
- Intl.Segmenter(locales?: string | string[], options?: { granularity?: 'grapheme'|'word'|'sentence', localeMatcher?: 'lookup'|'best fit' }) -> Intl.Segmenter
- segmenter.segment(input: string) -> Iterable< { segment: string, index: number, isWordLike?: boolean } ]

DETAILED DIGEST (extracted, retrieved 2026-03-27):
- Extracted API signatures, options, segment record shape and recommended usage patterns for word and grapheme segmentation.

ATTRIBUTION & CRAWL METADATA
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter
- Bytes retrieved: 153279
