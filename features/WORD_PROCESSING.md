# WORD_PROCESSING

Overview
Two related utilities: wordWrap and stripHtml.
- wordWrap: soft wraps text at word boundaries to a specified width. Never break a word; if a single word exceeds width, place it on its own line unbroken. Line separator is the newline character.
- stripHtml: remove HTML tags and decode common HTML entities (at least: &amp; &lt; &gt; &quot; &apos; &nbsp;). Treat null/undefined as empty string.

Acceptance criteria
- Exported function names: wordWrap, stripHtml
- wordWrap of The quick brown fox with width 10 -> The quick\nbrown fox
- wordWrap of supercalifragilisticexpialidocious foo with width 10 -> supercalifragilisticexpialidocious\nfoo
- stripHtml of <p>Hello &amp; world</p> -> Hello & world
- stripHtml removes tags and decodes common entities; returns empty string for null/undefined

Implementation notes
- wordWrap: split on whitespace, accumulate words into lines until adding the next word would exceed width, then emit the current line and continue; when a single word length > width, emit it as a lone line
- stripHtml: remove tags with a simple regex and replace common entities with their characters (use a small mapping table)

Tests
- Unit tests for wrapping behaviour, long single-word handling, HTML removal and entity decoding, and edge cases.
