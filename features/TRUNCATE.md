# TRUNCATE

Overview
Provide a truncate function that shortens text to a target maximum length without breaking words. Default suffix is the single-character ellipsis (…). If the first word is longer than the maximum length, truncate at the maximum length and append the suffix. Treat null or undefined as an empty string.

Acceptance criteria
- Exported function name: truncate
- truncate applied to Hello World with max length 8 -> Hello…
- truncate of Short with max length 10 -> Short (unchanged)
- default suffix is the single-character ellipsis when omitted
- truncate of null or undefined -> (empty string)
- Unicode-safe: does not split surrogate pairs

Implementation notes
- Interpret max length as a soft limit; find the last word boundary at or before the limit and append suffix. If no such boundary (first word longer than limit), slice at limit and append suffix
- Do not count suffix in the returned length strictly; ensure returned string is the chosen chunk plus suffix

Tests
- Cover examples above and edge cases: strings made of one long word, strings with multiple spaces, and Unicode inputs.
