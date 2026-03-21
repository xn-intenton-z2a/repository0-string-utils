# SANITIZE_ESCAPE

Overview
Implement stripHtml and escapeRegex and export them from src/lib/main.js. These functions are for sanitising user input and safely embedding user strings inside regular expressions.

Specification
- stripHtml: remove HTML tags and decode common HTML entities such as &amp; &lt; &gt; &quot; and &#39;. The function returns a plain text string suitable for display.
- escapeRegex: escape special regular expression characters so the returned string can be used in a RegExp constructor as a literal match.

Acceptance Criteria
- The library exports stripHtml and escapeRegex.
- stripHtml of "a &amp; b <strong>bold</strong>" produces "a & b bold".
- stripHtml decodes common named and numeric entities and removes all tags.
- escapeRegex of "a.b*c?" produces "a\.b\*c\?".
- Both functions return empty string for null or undefined input.
