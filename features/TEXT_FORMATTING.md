# TEXT_FORMATTING

Summary
Provide wordWrap(text, width) and stripHtml(html) functions exported from src/lib/main.js.

Specification
wordWrap
- Inputs: text (string), width (positive integer).
- Treat null or undefined as an empty string.
- Soft-wrap at word boundaries so that no output line exceeds width characters.
- Never break words: if a single word is longer than width, place that word on a line by itself unbroken.
- Use "\n" as the line separator.

stripHtml
- Remove all HTML tags and return plain text.
- Decode common HTML entities: &amp;, &lt;, &gt;, &quot;, &apos;, &nbsp; and numeric entities in the form &#NNN; and &#xHH;.
- Treat null or undefined as an empty string.
- Preserve sensible whitespace between text nodes so words do not run together after tag removal.

Acceptance Criteria
- wordWrap("The quick brown fox", 10) -> lines not exceeding 10 characters and words intact.
- wordWrap("averylongwordhere", 5) -> single line containing the long word unbroken.
- stripHtml("<p>Hello &amp; world!</p>") -> "Hello & world!"
- stripHtml(null) -> ""

Testing
- tests/unit/wordwrap.test.js and tests/unit/striphtml.test.js should cover the acceptance criteria and edge cases including Unicode and multiple consecutive tags.

Notes
- Implement a conservative tag stripper and small entity decoder; a full HTML parser is not required but decoding common entities is.
