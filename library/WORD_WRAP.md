WORD_WRAP

Table of contents
- Overview
- API signature
- Algorithm (step-by-step)
- Edge cases and rules
- Complexity
- Examples
- Supplementary notes
- Retrieval digest and attribution

Overview
wordWrap performs soft wrapping of plain text at word boundaries. It never breaks words; if a single word is longer than the target width, that word is placed on its own line unbroken. Lines are separated with the newline character '\n'.

API signature
- wordWrap(text, width) -> string
  - text: string (coerce null/undefined to empty string)
  - width: positive integer (wrap column). If width <= 0 treat as no wrap and return input.

Algorithm (step-by-step)
1. Coerce input to string and normalize line endings to '\n'. Split text into existing paragraphs on '\n'.
2. For each paragraph, collapse consecutive whitespace into a single space for wrapping decisions (optional; preserve words separated by single spaces when rejoining).
3. Split paragraph into words by whitespace (e.g., using /\s+/).
4. Maintain a current line buffer (initially empty). For each word:
   - If current line is empty:
     - If word.length <= width: set current line = word
     - Else (single long word): push word as its own line (do not break it)
   - Else (current line non-empty):
     - If currentLine.length + 1 + word.length <= width: append ' ' + word to current line
     - Else: push current line to output lines, then handle the word as above (start new line)
5. After words processed push final current line.
6. Join resulting lines with '\n'. For multiple paragraphs, preserve blank lines between paragraph outputs.

Edge cases and rules
- Empty input -> return ''
- Null/undefined -> return ''
- Unicode: length measured by JS string length (UTF-16 code units). For grapheme-cluster-accurate wrapping, use a grapheme-aware library.
- Words containing embedded newlines are treated as separate paragraphs or separate tokens depending on the split step.

Complexity
- Time: O(n) in the number of characters (split + single pass)
- Space: O(n) for output

Examples
- wordWrap('Hello world', 5) -> 'Hello\nworld'
- wordWrap('Supercalifragilisticexpialidocious', 10) -> 'Supercalifragilisticexpialidocious' (single line because word > width and placed unbroken)

Supplementary notes
- For strict preservation of whitespace or indentations, adapt the split/join strategy to keep leading/trailing spaces.
- For monospace-width measurements with tabs and control characters, pre-process or expand tabs to spaces.

Retrieval digest
- Source requested: npm package 'word-wrap' (SOURCES.md)
- Raw retrieval attempt returned small/redirect/404 headers for raw README; bytes reported by header: 14 (no useful raw README body). Fallback: algorithm described above implemented from canonical word-wrap behavior and mission requirements.
- Retrieved: 2026-03-21

Attribution
- Requested source: https://www.npmjs.com/package/word-wrap (raw README unavailable). Implementation derived from canonical soft-wrap algorithms and mission requirements.