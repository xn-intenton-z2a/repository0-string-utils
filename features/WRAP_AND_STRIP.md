# README_EXAMPLES

Summary
Provide a concise usage example for README.md that demonstrates diffing two simple schemas, resolving local refs, rendering text output, and classifying a breaking change.

Example content to include in README
- Two small schema objects: before schema with a required email string, after schema that removes email or changes its type.
- Call sequence: resolveLocalRefs where necessary, call diffSchemas(before, after) to get changes, call renderChanges(changes, {format: 'text'}) to produce readable output, call classifyChange on each change as demonstration.
- Explain expected output: show a sample text line showing a BREAKING change for removed required property.

Files to change
- README.md: include the example section and ensure it references exported function names and sample before/after schemas.

Acceptance Criteria
- README.md contains a minimal working example that can be copy-pasted and run in Node (assumes src/lib/main.js exported functions).
- The example demonstrates at least one breaking classification and text rendering output.
