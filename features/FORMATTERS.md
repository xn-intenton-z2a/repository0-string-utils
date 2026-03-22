# FORMATTERS

Overview
Provide text and JSON formatters for diff results so machine and human consumers can read changes easily. Named exports: formatChangesText and formatChangesJson.

Behavior
- formatChangesJson returns a stable JSON representation of the change records array suitable for programmatic consumption.
- formatChangesText renders a compact, human readable multi-line summary where each line contains the JSON Pointer path, change type, classification, and a short before/after note when applicable.
- Text formatting should be suitable for display in CLI output and documentation examples.

Acceptance criteria
- formatChangesText and formatChangesJson are exported from src/lib/main.js.
- Given a change array, formatChangesText returns a readable string with one change per line and path and classification present.
- formatChangesJson returns a JSON serializable data structure equivalent to the original change records.
- Unit tests validate both formatter outputs for a representative change set.