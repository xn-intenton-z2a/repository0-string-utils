# REF_RESOLUTION

Overview
Resolve local $ref pointers inside a single JSON Schema document before diffing. Remote references are out of scope and must cause a descriptive error.

Behavior
- Provide a named export resolveLocalRefs that takes a schema and returns a schema with local $ref pointers replaced by the referenced subschema.
- Detect and avoid cycles during resolution to prevent infinite recursion.
- If a $ref target is a remote URI (not a JSON Pointer beginning with #), throw an error indicating remote refs are unsupported.

Acceptance criteria
- resolveLocalRefs is exported from src/lib/main.js and used by computeDiff to operate on fully resolved schemas.
- Local JSON Pointer resolution is correct for nested properties and array items.
- A remote $ref causes a thrown error with a clear message and stackable error type so callers can handle it.
- Unit tests verify local resolution, cycle detection, and remote ref error behavior.

Implementation notes
- Use a memo map keyed by JSON Pointer to detect cycles.
- Resolution is performed in-memory; no network calls permitted.