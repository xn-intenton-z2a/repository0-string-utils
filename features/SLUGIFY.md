# FORMAT_OUTPUT

Summary
Specify JSON and human-readable text rendering for diffs so renderChanges produces predictable output without external dependencies.

Specification
- JSON format: when options.format is json return a serialisable array equal to the input changes.
- Text format: when options.format is text produce one line per change prefixed with its classification and path, for example: BREAKING /properties/email: type-changed from string to number. Include brief before/after summary values.
- Options: support options.maxLines to truncate long outputs and options.includeNested (true/false) to control nested expansion in text output. When truncated indicate truncation in the text output.
- Implementation must not introduce runtime dependencies.

Files to change
- src/lib/main.js: implement renderChanges(changes, options).
- tests/unit/format.test.js: tests for json and text formats including maxLines behaviour and includeNested expansion.

Acceptance Criteria
- renderChanges with format=json returns a serialisable array equal to the input changes.
- renderChanges with format=text produces lines containing classification and path and respects maxLines truncation and includeNested expansion when requested.
