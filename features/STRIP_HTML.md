# STRIP_HTML

Summary
Provide a stripHtml function that removes HTML tags and decodes common HTML entities into their textual equivalents.

API
Exported function: stripHtml(input) -> string

Behavior
- Return empty string for null or undefined input.
- Remove all angle-bracketed tags (simple HTML stripping) and return the visible text.
- Decode common entities: &amp; &lt; &gt; &quot; &apos; &nbsp; and numeric entities where convenient.
- Preserve Unicode characters and normalize whitespace sensibly (collapse multiple spaces into a single space where tags were removed).

Acceptance criteria
- stripHtml '<p>Hello &amp; welcome</p>' -> Hello & welcome
- stripHtml null/undefined -> empty string
- stripHtml handles basic nested tags and returns inner text
- Exported from src/lib/main.js and tests in tests/unit/strip-html.test.js

Implementation notes
- Use a conservative tag removal implementation (no DOM parser dependency) and a small mapping for common entities
- Tests should include entity decoding and Unicode examples