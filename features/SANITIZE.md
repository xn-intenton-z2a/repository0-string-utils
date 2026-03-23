# SANITIZE

Summary

Provide two utility functions exported from src/lib/main.js: stripHtml and escapeRegex. stripHtml removes HTML tags and decodes common HTML entities. escapeRegex returns the input string with all regular expression metacharacters escaped so it can safely be used in a regex pattern.

Specification

- stripHtml(text): remove all HTML tags and decode common entities such as &amp; &lt; &gt; &quot; &apos; and non-breaking space. Null or undefined returns an empty string. Preserve the visible text content and normalise whitespace.
- escapeRegex(text): escape characters with special meaning in regular expressions so that the returned string can be used as a literal pattern. Null or undefined returns an empty string.

Acceptance criteria

- stripHtml <p>Hello &amp; welcome</p> returns Hello & welcome
- stripHtml with nested tags and attributes returns only the visible text content
- escapeRegex a+b returns a\+b (plus any other regex metacharacters escaped)
- Null or undefined input for either function returns an empty string

Notes

- Unit tests should include common entity decoding and a list of regex meta-characters to verify escaping.
