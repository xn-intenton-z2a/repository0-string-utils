WIKIPEDIA_WORD_WRAP

Table of contents:
- Definition and behavior
- Soft wrap vs hard wrap and hyphenation
- Implementation algorithm for soft word-wrap
- Edge cases and examples
- Detailed digest and metadata

NORMALISED EXTRACT

Definition and behavior:
- Word wrap breaks lines at word boundaries so text fits within a given line width; soft wrapping reflows text without inserting persistent newline characters in the source.
- Hyphenation is optional: a word longer than the available width can be split with a hyphenation point; the mission requires never breaking a word, so hyphenation is out of scope.

Implementation algorithm (direct, implementable):
1. If input is null/undefined return empty string. Normalize line endings to \n.
2. If width <= 0 return input unchanged.
3. Obtain an ordered sequence of tokens that preserve words and separators. Preferred: use Intl.Segmenter(locale,{granularity:'word'}) and collect segments; fallback: use regex to capture words and following whitespace: /\S+\s*/g which yields tokens that are a contiguous non-space run plus trailing spaces.
4. Iterate tokens and maintain currentLine string and its length in code units. For each token:
   - If token trimmed (word without trailing spaces) has length > width and currentLine is empty: push token trimmed as a line (place long word on its own line unbroken).
   - Else if currentLine length + token length <= width: append token to currentLine.
   - Else: push currentLine trimmed to result lines, set currentLine = token (trimmed) if token trimmed length <= width, else token trimmed as single long line.
5. After iteration push final currentLine if non-empty. Join lines with \n.

Edge cases:
- Preserve existing explicit newline characters in input by splitting the input on existing newlines and wrapping each paragraph separately.
- Use grapheme-aware length measurement (Intl.Segmenter with 'grapheme') if width is defined in user-perceived characters; otherwise measuring by UTF-16 code units is acceptable for simple cases.

DETAILED DIGEST (extracted, retrieved 2026-03-27):
- Extracted word wrapping definitions and algorithmic steps for implementing a non-hyphenating soft wrap that never breaks words.

ATTRIBUTION & CRAWL METADATA
- Source: https://en.wikipedia.org/wiki/Word_wrap
- Bytes retrieved: 93119
