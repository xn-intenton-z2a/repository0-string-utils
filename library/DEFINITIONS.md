DEFINITIONS

Table of contents
1. Role of definitions (storage of reusable subschemas)
2. $ref semantics and replacement behavior
3. JSON Pointer evaluation rules (normalized to RFC 6901) for local $ref
4. Dereferencing algorithm for local-only $refs (step-by-step)
5. Implementation notes and cycle handling
6. Change detection and diffing considerations for $ref and definitions
7. Detailed digest and attribution

1. Role of definitions
- Keyword name: definitions (Draft-07 convention). It is an object whose keys are names and values are schema nodes intended for reuse via $ref.
- The definitions object itself has no intrinsic validation effect; its contents are referenced when a $ref points to a JSON Pointer within the document (commonly "#/definitions/<name>").

2. $ref semantics and replacement behavior
- $ref contains a URI reference. If the reference is a JSON Pointer fragment (starts with '#') it locates a value within the same document.
- A schema object that contains a $ref should be treated as a reference to the target; the $ref value is resolved and the target schema replaces the entire referencing node. Siblings of $ref are ignored for validation purposes.
- Remote references (URIs that do not resolve to the same document local fragment) are out of scope for this mission; encountering a non-local $ref should raise an error.

3. JSON Pointer evaluation rules (RFC 6901 normalized)
- A JSON Pointer is the fragment part of a URI after the leading '#'; it consists of zero or more reference tokens separated by '/'.
- Percent-decode the fragment first, then split on '/'. For each token apply unescaping: replace '~1' with '/' and '~0' with '~'. The empty token (from leading slash) selects the document root for the pointer sequence.
- Evaluation: starting from the document root, for each token:
  - if current value is an object: token selects the property with that exact name (case-sensitive); if absent -> pointer evaluation failure.
  - if current value is an array: token MUST be a zero-based index in decimal; if out of range -> failure.
- If pointer evaluation fails, $ref resolution fails with an error.

4. Dereferencing algorithm for local-only $refs (step-by-step)
- Input: a schema node S (may be object/array/primitive), and the document root D.
- Use a memoization map M of resolved pointer strings to resolved schema nodes to avoid infinite recursion.
- Walk the schema tree in depth-first order.
- When visiting an object node X:
  - If X has a $ref property whose value R is a string:
    - If R is not a fragment-only reference starting with '#', raise a remote-reference error (out-of-scope).
    - Normalize R: remove leading '#', percent-decode, split and unescape tokens as per RFC 6901 to form pointer P.
    - If P exists in M: replace X with M[P] (already resolved target) to reuse the canonical resolved instance.
    - Otherwise evaluate pointer P against D to find target T. If evaluation fails, raise an unresolved reference error.
    - Add placeholder into M[P] (to detect cycles) and then recursively dereference a deep-clone of T: resolvedT = dereference(clone(T)).
    - Replace X with resolvedT and set M[P] = resolvedT.
  - Else recursively process properties that can contain schemas: properties, items, additionalProperties, definitions, allOf/oneOf/anyOf, etc.
- Return the fully dereferenced schema tree.
- Note: do not attempt to preserve $ref nodes for equality comparisons; canonicalise by replacing all local $ref with their resolved target in-line before diffing.

5. Implementation notes and cycle handling
- Cycle detection: use memoization map keyed by the canonical pointer string. When encountering the same pointer during resolution, reuse the in-progress placeholder to break cycles.
- Do not resolve remote URIs; validate and reject them early to avoid network requests.
- Keep an internal map of pointer->resolved node so that different references to the same definition canonicalise to the same object identity; this simplifies recursive diffing and avoids duplicate nested diffs.

6. Change detection and diffing considerations for $ref and definitions
- Compare schemas after dereferencing; do not compare raw $ref strings for semantic equality because two schemas referencing the same target should be treated as equivalent.
- When a definition is renamed (key name under definitions changes) but the target schema is identical, this is a non-breaking internal refactoring if all $ref usages are updated; however if external consumers rely on a specific path (for example JSON pointers published externally), renaming may be breaking. Diffing rules should:
  - Detect definition-value changes by comparing resolved targets.
  - Emit definition-removed/definition-added when a key is removed or added under definitions (path: "/definitions/<name>").
  - For $ref nodes themselves, do not emit changes if the resolved target is unchanged; instead, focus on resolved schema changes.

7. Detailed digest and attribution
- Sources:
  - https://json-schema.org/understanding-json-schema/structuring.html#ref
  - https://json-schema.org/understanding-json-schema/reference/definitions.html
  - RFC 6901 https://datatracker.ietf.org/doc/html/rfc6901 (for pointer unescaping semantics)
- Retrieval date: 2026-03-23T00:59:51Z
- Bytes downloaded: definitions page: 22038; structuring/ref page and RFC 6901 referenced across earlier fetches.

Attribution: normalised guidance for local $ref resolution and definitions handling extracted from json-schema.org and RFC 6901.