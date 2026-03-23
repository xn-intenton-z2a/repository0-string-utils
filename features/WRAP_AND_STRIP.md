# README_EXAMPLES

Summary
Provide a copy-pasteable README usage example that demonstrates resolveLocalRefs, diffSchemas, renderChanges and classifyChange using a small before/after schema pair that produces a breaking change.

Specification
- Example demonstrates a before schema with a required email string and an after schema that removes or changes the email property to cause a breaking change.
- Example steps: import named exports from src/lib/main.js; call resolveLocalRefs if needed; call diffSchemas(before, after); call renderChanges(changes, {format: 'text'}); call classifyChange on each change.
- Show a single-line example of expected text output demonstrating a BREAKING classification for a removed required property.

Files to change
- README.md: add a Usage examples section containing the minimal example and expected output. Ensure sample code uses the exact exported function names.

Acceptance Criteria
- README contains a runnable example demonstrating a breaking classification and text rendering.
- The example references the exported function names and is copy-pasteable for quick verification.
