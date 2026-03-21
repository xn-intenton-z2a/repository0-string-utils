# CORE_FUNCTIONS

Status: IMPLEMENTED (see src/lib/main.js)

Summary

This feature specifies the library's public API: ten named functions exported from src/lib/main.js. Implementation has been completed in src/lib/main.js; this document now records the behaviour, examples and verification checks used by tests and documentation.

Specification (behaviour)

1. slugify(input)
   - Convert input to a URL-friendly slug: convert to string, trim, convert to lowercase, replace any run of whitespace or punctuation with a single hyphen, remove characters that are not letters, numbers or hyphen, collapse multiple hyphens, remove leading/trailing hyphens.
   - Accept null/undefined and return empty string.
   - Example: slugify("Hello World!") => "hello-world".

2. truncate(input, length, suffix = "…")
   - If input is null/undefined return empty string.
   - Return a string no longer than length characters. Do not break words: if truncation would split a word, trim back to the previous word boundary and append suffix. If the first word itself is longer than length, return the first length characters of that word followed by suffix trimmed so total length<=length when possible.
   - If length is less than suffix length, return suffix trimmed to length.
   - Example: truncate("Hello World", 8) => "Hello…".

3. camelCase(input)
   - Convert common delimiters (spaces, hyphens, underscores) to camelCase. Lowercase first word, capitalise subsequent words. Null/undefined => empty string.
   - Example: camelCase("foo-bar-baz") => "fooBarBaz".

4. kebabCase(input)
   - Convert to lowercase kebab-case: words separated by single hyphens, strip invalid chars, collapse whitespace.
   - Example: kebabCase("Hello World") => "hello-world".

5. titleCase(input)
   - Capitalise the first letter of each word and lowercase the remainder of each word. Preserve single spaces between words and punctuation.
   - Example: titleCase("hello world") => "Hello World".

6. wordWrap(input, width)
   - Soft wrap text at spaces so no line exceeds width. Never break a word; if a single word length > width, place that word on its own line unbroken. Use \n as the line separator. Null/undefined => empty string.

7. stripHtml(input)
   - Remove HTML tags and decode common HTML entities: &amp;, &lt;, &gt;, &quot;, &apos;, &nbsp;. Return empty string for null/undefined.
   - Example: stripHtml("<p>Hello &amp; welcome</p>") => "Hello & welcome".

8. escapeRegex(input)
   - Escape characters with special meaning in regular expressions so the returned string can be used literally inside a RegExp. Null/undefined => empty string.
   - Example: escapeRegex("a+b(c)") => "a\\+b\\(c\\)".

9. pluralize(input)
   - Basic English pluralisation: words ending in s/x/z/ch/sh add "es"; consonant+y => replace y with "ies"; f/fe => replace with "ves"; otherwise add "s". Null/undefined => empty string.
   - Examples: pluralize("box") => "boxes"; pluralize("party") => "parties"; pluralize("leaf") => "leaves".

10. levenshtein(a, b)
   - Return the Levenshtein edit distance between strings a and b. Treat null/undefined as empty string. Operate on Unicode code points to avoid splitting surrogate pairs.
   - Example: levenshtein("kitten", "sitting") => 3.

Notes

- Implementation exists in src/lib/main.js and is exported as named functions. Keep this file as the canonical behavioural specification for test and docs alignment.
- Any future changes to behaviour must update unit tests and README examples accordingly.

Acceptance criteria (current)

- Exports: All ten functions are exported as named exports from src/lib/main.js.
- Behavioural checks (examples):
  - slugify("Hello World!") === "hello-world".
  - truncate("Hello World", 8) === "Hello…".
  - camelCase("foo-bar-baz") === "fooBarBaz".
  - kebabCase("Hello World") === "hello-world".
  - titleCase("hello world") === "Hello World".
  - wordWrap("a b c", 1) === "a\nb\nc".
  - stripHtml("<b>Bold &amp; Brave</b>") === "Bold & Brave".
  - escapeRegex("a+b(c)") === "a\\+b\\(c\\)".
  - pluralize("box") === "boxes"; pluralize("party") === "parties"; pluralize("leaf") === "leaves".
  - levenshtein("kitten", "sitting") === 3.

- Edge cases: Passing null or undefined to string-producing functions returns empty string and does not throw; Unicode characters are preserved and handled consistently.

Verification notes

- Tests and README must reference these exact outputs so they can be verified automatically. If tests disagree, update either the implementation or these specs in coordination with test changes.
