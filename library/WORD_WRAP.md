WORD_WRAP

Table of contents:
- Purpose
- Function signature
- Exact wrapping algorithm (soft wrap at word boundaries)
- Handling long words
- Implementation pseudocode (line-based greedy)
- Examples
- Supplementary details
- Detailed digest
- Attribution and data size

Purpose:
Soft-wrap text at word boundaries so that no word is broken; if a single word exceeds width, place it alone on its own line unbroken. Use '\n' as the line separator.

Function signature:
wordWrap(text: string, width: number): string
- text: input string; treat null/undefined as ''
- width: positive integer > 0
- returns: string with '\n' inserted as soft line breaks

Exact wrapping algorithm (greedy, actionable):
1. If width <= 0 return text as-is.
2. Split text into words on whitespace (use \s+ to detect runs of whitespace), preserving words and explicit existing line breaks.
3. Iterate words and accumulate a current line string and its length.
4. For each word:
   a. If the word length alone > width, then if current line is non-empty push current line to output and push the long word as its own line (do not break the long word).
   b. Else if current line length + 1 + word.length <= width, append the word to current line separated by a single space.
   c. Else push current line to output and start a new current line with the word.
5. After processing all words, push any remaining current line to output. Join output lines with '\n'.

Implementation pseudocode (explicit steps):
- lines = []
- curr = ''
- for word in words:
  if curr === '':
    curr = word
  else if curr.length + 1 + word.length <= width:
    curr = curr + ' ' + word
  else:
    lines.push(curr)
    curr = word
- if curr !== '': lines.push(curr)
- return lines.join('\n')

Handling long words:
- If a single word length > width, place it on its own line unbroken per mission requirement.
- Do not hyphenate or insert soft breaks inside words.

Examples:
- text: "The quick brown fox" width: 10 -> "The quick\nbrown fox"
- long word: "supercalifragilisticexpialidocious" width: 10 -> it is placed alone on a single line unbroken

Supplementary details:
- Preserve existing newline characters by splitting paragraphs on '\n' and wrapping each paragraph independently.
- Treat sequences of whitespace as a single separator when forming lines.

Detailed digest:
Algorithmic pattern and edge-case rules inspired by the word-wrap package and common implementations; retrieval date: 2026-03-21.

Attribution and data size:
Source: https://www.npmjs.com/package/word-wrap
Bytes retrieved during crawl: 7159
