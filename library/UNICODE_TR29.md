NORMALISED EXTRACT

Table of contents
- Purpose and scope
- Grapheme cluster (extended) rules (summary)
- Word boundary rules (summary)
- Sentence boundary rules (summary)
- Rule naming and application order
- Implementation guidance and examples
- Reference (spec link)
- Digest and retrieval metadata

Purpose and scope
- UAX #29 (Unicode Text Segmentation) defines language- and script-aware boundary rules for grapheme clusters, words, and sentences. Implementations follow an ordered list of boundary rules (GB* for grapheme, WB* for word, SB* for sentence) that are applied to determine where breaks are permitted or prohibited.

Grapheme cluster rules (summary)
- Grapheme cluster boundaries treat a base character together with following combining marks, zero-width joiner sequences (ZWJ), emoji sequences, and Hangul Jamo sequences as a single user-perceived character (extended grapheme cluster).
- Core behaviors include:
  - Do not break between CR and LF (treat CRLF as single unit).
  - Do not break between a base and following marks (Extend, ZWJ sequences create a single cluster where appropriate).
  - Regional indicator (RI) sequences combine into flag-like pairs; do not separate paired RIs.
  - Emoji ZWJ sequences and emoji modifier sequences are treated as single grapheme clusters.
  - Hangul syllable sequences (L, V, T) are combined per Hangul rules.

Word boundary rules (summary)
- Word boundary detection uses Unicode properties (letters, numbers, punctuation) and rules that account for apostrophes, hyphens, contractions and script-specific behaviors.
- Tokens are classified as word-like or non-word-like. Implementations expose phrase-level flags (e.g., isWordLike) to distinguish actual words from punctuation or whitespace tokens.

Sentence boundary rules (summary)
- Sentence boundaries are computed with language-sensitive rules that respect closing punctuation, abbreviations, and punctuation followed by whitespace and capitalized words. The spec provides a state-machine and a set of ordered rules to avoid breaking inside common abbreviations and numeric tokens.

Rule naming and ordering
- The spec enumerates rules with labels (for example GB1..GB999 for grapheme). Rules are evaluated in sequence; earlier rules can mandate a break or prohibit a break. Implementations implement the algorithm as a state machine derived from these ordered rule tables.

Implementation guidance
- Use an existing implementation (Intl.Segmenter in modern JS engines) where possible; it embeds UAX #29 behavior.
- For custom implementations, follow the spec's classification stage (map code points to classes such as CR, LF, Control, Extend, ZWJ, Regional_Indicator, Prepend, SpacingMark, L, V, T, LV, LVT) then apply rule table to compute boundaries.
- Testing: validate with Unicode test data (grapheme-break-test.txt, word-break-test.txt) provided by the Unicode Consortium.

Reference (spec link)
- UAX #29 Unicode Text Segmentation — https://unicode.org/reports/tr29/

Digest (source: Unicode UAX #29)
- Retrieved: 2026-03-23
- Source: https://unicode.org/reports/tr29/
- Data obtained during crawl: approximately 152.3 KB (HTML/text content)

Attribution
- Content extracted and condensed from Unicode Consortium UAX #29 (Unicode Text Segmentation).
