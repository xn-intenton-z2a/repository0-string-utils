# CASE_CONVERTERS

Overview
Provide three small conversions: camelCase, kebabCase and titleCase. Each function accepts a string (null/undefined -> empty string) and returns the converted string. Splitting should occur on any non-letter/number boundary.

Acceptance criteria
- Exported function names: camelCase, kebabCase, titleCase
- camelCase: foo-bar-baz -> fooBarBaz
- kebabCase: Hello World! -> hello-world
- titleCase: hello world -> Hello World
- All functions return empty string for null/undefined and handle Unicode characters

Implementation notes
- Normalize whitespace and separators by replacing runs of non-alphanumeric characters with a single separator during conversion
- For camelCase, first word is lowercased, subsequent words capitalised (preserve internal letter-case for non-initial letters)

Tests
- Include unit tests for example inputs, multiple separators, leading/trailing separators, and Unicode tokens.
