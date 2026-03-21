# CORE_FUNCTIONS

Summary

Implement the library's core public API: ten named functions exported from src/lib/main.js. Each function must be a separately exported, well-documented, zero-dependency utility and must follow the behaviour described below.

Specification

1. slugify(input)
   - Convert input to a URL-friendly slug: lowercase, trim, replace whitespace and punctuation with single hyphens, strip non-ASCII punctuation except hyphen, collapse multiple hyphens, remove leading/trailing hyphens.
   - Accept null/undefined and return empty string.

2. truncate(input, length, suffix = "…")
   - Return a string truncated to at most length characters. Do not break words: if truncation would split a word, trim back to the previous word boundary and append suffix, ensuring total length (including suffix) does not exceed length when possible.
   - If length is less than suffix length, return the suffix trimmed to length.

3. camelCase(input)
   - Convert common delimiters (spaces, hyphens, underscores) to camelCase. Lowercase first word, capitalise subsequent words.

4. kebabCase(input)
   - Convert to lowercase kebab-case: words separated by hyphens, strip invalid chars.

5. titleCase(input)
   - Capitalise the first letter of each word; preserve existing punctuation between words.

6. wordWrap(input, width)
   - Soft wrap text at spaces so no line exceeds width. Never break a single word; if a word exceeds width, place it on its own line unbroken. Use \n as the line separator.

7. stripHtml(input)
   - Remove HTML tags and decode common HTML entities (amp, lt, gt, quot, apos, nbsp). Accept null/undefined => empty string.

8. escapeRegex(input)
   - Escape characters with special meaning in regular expressions so the returned string can be used literally inside a RegExp.

9. pluralize(input)
   - Basic English pluralisation using rules: s/x/z/ch/sh => add "es"; consonant+y => replace y with "ies"; f/fe => replace with "ves"; otherwise add "s". Irregulars out of scope.

10. levenshtein(a, b)
   - Return the Levenshtein edit distance between strings a and b. Treat null/undefined as empty string. Support Unicode code points.

Acceptance criteria

- All ten functions are exported as named functions from src/lib/main.js.
- slugify("Hello World!") => "hello-world".
- truncate("Hello World", 8) => "Hello…".
- camelCase("foo-bar-baz") => "fooBarBaz".
- levenshtein("kitten", "sitting") => 3.
- Functions return empty string for null/undefined inputs where applicable and handle Unicode.
- No external runtime dependencies introduced.
