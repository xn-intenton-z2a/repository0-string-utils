# FORMAT_OUTPUT

Summary
Specify text and JSON rendering formats for diffs so renderChanges produces readable text output or machine-friendly JSON according to options.

Specification
- JSON format: when options.format is json return the input array of change objects unchanged or safely serialisable.
- Text format: when options.format is text produce one line per change prefixed with its classification and path, for example: BREAKING /properties/email: type-changed from string to number; include before and after summary values.
- Options: support options.maxLines (truncate long outputs) and options.includeNested (true/false) to control nested expansion in text output.
- No external dependencies; human-readable output must be predictable and covered by unit tests.

Files to change
- src/lib/main.js: implement renderChanges(changes, options).
- tests/unit/format.test.js: tests for text and json formats, including maxLines behaviour.

Acceptance Criteria
- renderChanges with format=json returns a serialisable array equal to the input changes.
- renderChanges with format=text produces lines containing the classification and the change path and brief before/after context.
- maxLines truncates text output and indicates truncation when applied.
