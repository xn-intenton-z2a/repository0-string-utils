COMBINING

Table of contents
1. Semantics of allOf, anyOf, oneOf, not
2. Traversal and diffing strategy for combining keywords
3. Implementation details and examples
4. Supplementary notes (items tuple)
5. Detailed digest and attribution

1. Semantics
- allOf: instance MUST validate against all subschemas listed. Semantically equivalent to logical AND (intersection) of subschemas.
- anyOf: instance MUST validate against at least one subschema (logical OR).
- oneOf: instance MUST validate against exactly one subschema (exclusive OR).
- not: instance MUST NOT validate against the subschema.

2. Traversal and diffing strategy
- Treat each combining keyword value as a schema-array addressed by index: /allOf/0, /allOf/1, etc. When comparing before vs after:
  a. If array lengths differ, emit add/remove change records for the affected indices or emit nested-changed for changed indices depending on policy.
  b. For indices present in both arrays, recursively diff the pair of subschemas and emit nested-changed entries with paths that include the combining keyword and index.
- For anyOf/oneOf differences that change the set of allowed alternatives, classification may be conservative: adding new alternatives is compatible; removing alternatives that were necessary for previously-accepted instances may be breaking.

3. Implementation details and examples
- Example: before allOf: [A, B], after allOf: [A, C]
  - Diff: compare index 0 (A vs A) -> no change; index 1 (B vs C) -> nested-changed at /allOf/1 containing the specific changes from B -> C.
- For anyOf/oneOf: represent changes to alternative lists as additions/removals of alternatives and also perform recursive diffs where alternatives map by position. Optionally, implement a matching heuristic: try to pair similar subschemas by signature (e.g., same properties) rather than by index to reduce noisy changes when arrays are reordered.

4. Supplementary notes (items tuple vs single schema)
- items: when items is a single schema, it applies uniformly to all array elements; when items is an array it is tuple-validation. Represent tuple entries as /items/0, /items/1 for diffs.
- If items changed from single schema to tuple or vice versa, emit a changeType (nested-changed) at /items and describe the structural change.

5. Detailed digest and attribution
- Combining keyword reference: https://json-schema.org/understanding-json-schema/reference/combining.html (retrieved 2026-03-23T00:06:02.131Z, 215534 bytes)
- Items/array guidance: Draft-07 meta-schema and object/array reference pages (retrieved 2026-03-23T00:06:02.131Z)
