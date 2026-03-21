# SANITIZE

Summary

Implement three sanitisation utilities: slugify, stripHtml, and escapeRegex. Each function must be exported from src/lib/main.js and must not use external runtime dependencies.

Acceptance criteria

- slugify of "Hello World!" produces "hello-world"
- slugify normalises diacritics: "café" -> "cafe"
- slugify collapses repeated non-alphanumeric characters into a single hyphen and trims leading/trailing hyphens
- stripHtml of "<p>Hello &amp; World</p>" produces "Hello & World"
- stripHtml decodes common entities: &amp;, &lt;, &gt;, &nbsp;
- escapeRegex of a string containing special regex characters returns a string with those characters escaped so it can be safely used in RegExp constructors to match the literal input
- All functions return empty string when given null or undefined

Implementation notes

- slugify: apply Unicode NFKD normalisation, remove combining marks, map to ASCII where feasible, convert to lower case, replace non-alphanumerics with hyphens, collapse repeats, and trim.
- stripHtml: remove tags and decode a defined set of HTML entities without external libraries.
- escapeRegex: prefix regex meta-characters with backslashes.
- Include tests under tests/unit/sanitize.test.js.
