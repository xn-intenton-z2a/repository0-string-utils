# SANITIZE_AND_ESCAPE

Description

Provide sanitisation and escaping utilities: Slugify, stripHtml, and escapeRegex. These utilities make strings safe for URLs, readable plaintext, and construction of dynamic regular expressions without injection of special characters.

Behavior

- Slugify: Produce URL-friendly slugs by lowercasing, replacing spaces and common separators with hyphens, removing or transliterating control characters where feasible, and stripping all remaining non-alphanumeric characters except Unicode letters and numbers. Collapse multiple hyphens. Return empty string for null/undefined inputs.
- stripHtml: Remove HTML tags, decode common HTML entities (&amp;, &lt;, &gt;, &quot;, &apos;, nbsp) into their character forms, and collapse excessive whitespace into single spaces. Preserve the textual order of content.
- escapeRegex: Escape characters with special meaning in regular expressions so the returned string can be safely interpolated into a RegExp. Characters to escape include . ^ $ * + ? ( ) [ ] { } \ | / and other engine-specific meta characters.

API

Export named functions from src/lib/main.js: slugify(input), stripHtml(input), escapeRegex(input).

Edge cases

- Input null/undefined => return empty string.
- Maintain Unicode letters and digits in slugify; do not attempt full transliteration beyond simple normalization.

Acceptance criteria

1. slugify("Hello World!") == "hello-world"
2. stripHtml("<p>Hi &amp; you</p>") == "Hi & you"
3. escapeRegex("a+b(c)") == "a\\+b\\(c\\)" (characters that are special in regex are escaped)
4. stripHtml handles empty string and returns empty string; slugify(undefined) == ""
5. Unit tests exist verifying the above and additional Unicode examples.
