TEXTWRAP

Table of contents:
1. Purpose
2. Behavioural contract
3. Algorithm (soft wrap at word boundaries)
4. Edge cases: long words and whitespace handling
5. API signature
6. Reference details
7. Detailed digest
8. Attribution

1. Purpose
Define precise behaviour for soft word-wrapping text to a given width without breaking words; if a single word exceeds width place it on its own unbroken line.

2. Behavioural contract
- Input: arbitrary string possibly containing newlines and multiple whitespace characters.
- Output: string with lines separated by '\n'.
- Requirements: never break a word across lines; break lines at whitespace boundaries; collapse sequences of whitespace within a paragraph when wrapping; preserve explicit existing newlines as paragraph separators.

3. Algorithm (explicit)
- Split input into paragraphs on existing line breaks.
- For each paragraph: collapse internal whitespace to single spaces unless preserving indentation is required.
- Iterate words from left to right, adding the next word to the current line if (currentLineLength + 1 + wordLength) <= width. If it would exceed width:
  - If current line is empty (word longer than width): place the long word alone on its own line (unbroken).
  - Else: emit current line and start a new line with the word.
- Join lines with '\n' and preserve paragraph breaks with additional '\n'.

4. Edge cases
- Empty input or null/undefined -> return empty string.
- Words equal to or longer than width -> place on single line unbroken.
- Tabs may be treated as single spaces unless explicitly expanded.

5. API signature
- wordWrap(text: string, width: number): string
- Default behaviour: width must be positive integer; throw or coerce invalid widths.

6. Reference details
- Behaviour modeled on Python textwrap.wrap semantics: soft wrapping at word boundaries, do not break long words by default, line separator '\n'.

7. Detailed digest
- Source: https://docs.python.org/3/library/textwrap.html
- Retrieved: 2026-03-21T22:50:23.455Z
- Bytes fetched: 53336
- Key technical points used: wrap without breaking words, handling long words by placing them alone, paragraph splitting and whitespace collapsing.

8. Attribution
- Python standard library — textwrap documentation, retrieved 2026-03-21, 53336 bytes.
