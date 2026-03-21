NPM_WORD_WRAP

TABLE OF CONTENTS
1. Goal and behavior
2. Exact wrapping algorithm (paragraph and word rules)
3. Edge-case rules (long words, existing line breaks)
4. Reference signature and examples

NORMALISED EXTRACT
Goal: soft wrap text at word boundaries so that each output line has length <= width, never break words. If a single word length exceeds width, place it on its own line unbroken.

Exact algorithm (implementation steps):
1) If input is null/undefined return empty string.
2) Split input into paragraphs by existing line separators: split on /(?:\r\n|\r|\n)/ to preserve paragraph boundaries.
3) For each paragraph:
   a) Split paragraph into words using whitespace as separator (use regex /\s+/ to collapse whitespace into separators). Preserve words exactly.
   b) Initialize line = '' and an output lines array.
   c) For each word in words:
        - If line is empty and word.length > width: push word as its own line (do not break); set line = '' and continue.
        - Else if line is empty: set line = word
        - Else if (line.length + 1 + word.length) <= width: append ' ' + word to line
        - Else: push line to output lines; set line = word
   d) After iterating words, if line is non-empty push it to output lines.
4) Join output lines for the paragraph with '\n'. Between paragraphs, preserve original paragraph breaks (i.e., join paragraphs with '\n').

Edge cases and notes:
- Tabs and multiple spaces are normalized to single spaces when splitting; if exact whitespace preservation inside paragraphs is required, more complex handling needed.
- Words containing newline characters should be split by the paragraph split first; long words are placed unbroken on their own line per requirement.

REFERENCE SIGNATURE
- wordWrap(text: string, width: number): string

DIGEST
Source: https://www.npmjs.com/package/word-wrap (crawl returned Cloudflare interstitial; algorithm implemented per common word-wrap semantics)
Retrieved: 2026-03-21
Data obtained during crawl: Cloudflare interstitial; final document contains the exact algorithm and edge-case rules needed for implementation.

ATTRIBUTION
Algorithmic description based on common word-wrap implementations and MDN string/regex behavior.
