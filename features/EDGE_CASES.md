# EDGE_CASES

Summary

Standardise behaviour for edge inputs and Unicode so implementations and tests are consistent and deterministic. This file documents required edge behaviours that must be covered by unit tests.

Rules (explicit behaviours)

- Null and undefined: all string-producing utilities (slugify, truncate, camelCase, kebabCase, titleCase, stripHtml, escapeRegex, pluralize) must accept null or undefined and return an empty string rather than throwing an error.

- Empty string: functions should return appropriate empty or identity values (slugify("") => "", wordWrap("") => "").

- Unicode handling: operate on Unicode code points when altering character case or computing distances to avoid splitting surrogate pairs or corrupting emoji. Implementations must handle accented characters correctly (e.g., "é" -> "e" in slugify via normalization) and must not split surrogate pairs.

- wordWrap long words: when a single word length > width, place that word on its own line without breaking it.

- stripHtml entity decoding: decode at least these common entities: &amp;, &lt;, &gt;, &quot;, &apos;, &nbsp; and preserve surrounding text.

- Whitespace normalisation: only apply whitespace collapsing where specified (slugify collapses whitespace into hyphens); other functions preserve single spaces between words unless otherwise documented.

Concrete examples to be tested

- null/undefined: slugify(null) === ""; truncate(undefined, 5) === "".
- Unicode: slugify("Café au lait") === "cafe-au-lait" (normalised); wordWrap must not split emoji pairs ("🙂🙂") and should preserve emoji.
- long word: wordWrap("supercalifragilisticexpialidocious", 10) results in the long word on its own line.
- stripHtml entity: stripHtml("<p>Hello &amp; welcome</p>") === "Hello & welcome".

Acceptance criteria (testable)

- Unit tests include null/undefined assertions for all applicable functions and assert no exceptions are thrown.
- Unit tests include Unicode examples (accents and emoji) and assert preservation/normalisation where appropriate.
- Unit tests assert wordWrap behaviour for long single words exceeding width.
- Unit tests assert HTML entity decoding for the listed entities.
