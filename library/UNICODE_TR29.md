UNICODE_TR29

Table of contents
- Purpose and scope
- Core concepts and definitions
- Word and grapheme segmentation rules (summary)
- Practical implications for string utilities
- Implementation patterns and APIs (Intl.Segmenter)
- Supplementary details (Unicode properties referenced)
- Reference details (algorithms, rule names)
- Detailed digest (crawl excerpt and retrieval)
- Attribution and data size

Purpose and scope
This document extracts the technical aspects of Unicode Text Segmentation (UAX #29) relevant to implementing string utilities that operate at word, grapheme, and sentence boundaries.

Core concepts and definitions
- Grapheme cluster: the user-perceived character, composed of one or more code points. Use Unicode grapheme cluster boundaries to avoid breaking extended grapheme sequences (emoji, combining marks).
- Word boundary: segmentation that identifies words and punctuation for natural-language operations. Word boundaries are not the same as splitting on whitespace because punctuation and scripts without spaces exist.
- Property categories used by rules: CR, LF, Newline, Extend, Format, Katakana, ALetter, MidLetter, MidNum, MidNumLet, Numeric, Regional_Indicator, Hebrew_Letter, etc.

Word and grapheme segmentation rules (summary)
- The segmentation algorithm is rule-based: a sequence of rules WB1..WB11 (word boundaries) that test adjacent code point properties to decide whether a boundary exists.
- Grapheme cluster boundaries use rules GB1..GB11 and depend on properties like CR, LF, Control, Extend, Prepend, Regional_Indicator.
- Key rules (condensed):
  - Do not break between CR+LF pairs.
  - Do not break within a run of Extend or Format characters attached to the preceding base (these should remain with the base grapheme).
  - Treat Regional Indicator pairs specially (emoji flags) — pair them instead of splitting single code points.
  - For word boundaries, treat ALetter sequences as word characters and mid-letter/mid-num characters may not create a boundary inside common sequences (e.g., "can't", "3.14").

Practical implications for string utilities
- Soft wrapping: prefer segmentation at word boundaries defined by UAX #29 to avoid breaking inside grapheme clusters or between combining marks.
- Truncation: when truncating to N characters for display, measure by grapheme clusters, not code units, to avoid splitting emoji or accented letters.
- Titlecasing and case transformations: segmentation into words should use the word boundary rules to find word starts.
- Slugification: normalize (NFKD/NFC) before removing non-alphanumerics; use word segmentation to join logical words with hyphens.

Implementation patterns and APIs (Intl.Segmenter)
- Recommended native API: Intl.Segmenter
  - Constructor signature: new Intl.Segmenter([locales[, options]])
  - Options: { granularity: "grapheme" | "word" | "sentence" }
  - Usage pattern: const seg = new Intl.Segmenter(locale, {granularity: 'word'}); for (const {segment, index, isWordLike} of seg.segment(input)) { ... }
  - Segment object fields (word granularity):
    - segment: substring for the segment
    - index: starting code unit index in the original string
    - isWordLike: boolean indicating if the segment is a word-like token (true for words, false for spaces/punctuation)
- Fallback: When Intl.Segmenter is not available, approximate rules using Unicode property escapes in RegExp (\p{...}) can help, for example splitting on sequences matching /\p{Letter}+/u, but this is brittle for many scripts and not a full substitute for UAX #29.

Supplementary details (Unicode properties referenced)
- Important Unicode property classes used by UAX #29: ALetter, Hebrew_Letter, Numeric, Katakana, ExtendNumLet, MidLetter, MidNumLet, MidNum, Format, Extend, Regional_Indicator, Prepend.
- Normalization: Before segmentation, normalize strings to NFC to ensure combining marks attach correctly to base characters for consistent grapheme cluster detection.

Reference details (algorithms, rule names)
- Grapheme rules: GB1..GB11 (do not break within CR+LF, do not break within extended grapheme clusters, treat Regional_Indicator pairs). See UAX #29 for full rules.
- Word rules: WB1..WB11 and subsequent rules for handling ALetter, MidLetter, MidNum, Numeric and other sequences.
- Exact evaluation order: the algorithm applies rules in precedence order; a later rule can override an earlier rule's decision only where specified by the standard.

Detailed digest (crawl excerpt and retrieval)
- Source: UAX #29, Unicode Text Segmentation. Retrieved: 2026-03-21
- Crawl data size (downloaded): approximately 152.3 KB
- Extracted: definitions for grapheme and word boundaries, list of property classes, summary of WB and GB rules and recommendations to use native segmentation APIs.

Attribution and data size
- Source URL: https://unicode.org/reports/tr29/
- Retrieved: 2026-03-21
- Download size: ~152.3 KB
- License/attribution: Unicode Consortium. Use per Unicode terms; this file extracts and summarises technical points for implementation.
