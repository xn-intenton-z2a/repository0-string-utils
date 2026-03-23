ARRAY

Table of contents
1. Key keywords: items, additionalItems, minItems, maxItems, uniqueItems
2. Formal semantics for each keyword
3. Validation algorithm (exact behavior)
4. Implementation notes for diffing array schemas
5. Change classification rules for array-related changes
6. Supplementary details and examples (no code fences)
7. Detailed digest and attribution

1. Key keywords
- items: either a single schema or an array of schemas (tuple validation).
- additionalItems: boolean or schema; applies only when items is an array (tuple form).
- minItems / maxItems: integers constraining array length.
- uniqueItems: boolean. If true, all array elements must be unique (no two elements compare equal).

2. Formal semantics
- If items is a single schema S: every element of the array instance must validate against S.
- If items is an array [S0, S1, ..., SN]: then for 0 <= i <= N, the instance element at index i must validate against Si. For i > N, additionalItems governs validation.
- additionalItems default: when items is an array and additionalItems is absent, additionalItems is treated as an empty schema ({}), which accepts any value; therefore extra items are allowed by default.
- minItems / maxItems: if present, the instance array length must be >= minItems and <= maxItems respectively.
- uniqueItems: when true, the validator must ensure that no two elements are equal; equality uses full instance value equality semantics for JSON values.

3. Validation algorithm
- If the instance is not an array, array keywords have no effect (are ignored).
- If items is a single schema S: for each element e in the instance array validate e against S.
- If items is an array of schemas: for each index i in the instance array do:
  - if i <= N (index within items array): validate against items[i].
  - else validate against additionalItems (if boolean false -> fail; if schema -> validate against that schema; if missing -> accept because treated as {}).
- Enforce minItems, maxItems, uniqueItems as independent checks.

4. Implementation notes for schema diffing
- Treat absent keywords as their defaults (items absent -> no per-item constraint; additionalItems absent -> empty schema when items is tuple).
- When items is a single schema, compare before.items vs after.items for structural changes; emit nested-changed at path "/items" when the per-item constraint changes (recursive diff of the schema S).
- When items is an array (tuple form), compare arrays positionally: for each index i present in either before or after emit either items-added/items-removed or nested-changed for index i. Use path "/items/<index>" for changes.
- Changes to additionalItems from schema to false or to a narrower schema are potentially breaking because they constrain previously accepted extra elements.
- Changes to uniqueItems from false to true are potentially breaking because previously-allowed duplicate-element arrays become invalid.

5. Change classification rules
- items (single schema) changed to a narrower schema -> breaking.
- items (single schema) changed to a broader schema (superset of previous) -> compatible.
- items tuple: adding a new required positional constraint or changing the schema at an index such that some previously-valid values become invalid -> breaking.
- additionalItems changed from permissive (absent or empty schema) to false -> breaking if consumers relied on variable-length arrays.
- minItems increased or maxItems decreased -> breaking if instances that were previously valid no longer are.
- uniqueItems set true where it was false -> breaking.

6. Supplementary details and edge cases
- When comparing schemas that use $ref for items or additionalItems, dereference local $refs first so the comparison operates on canonical schemas.
- Distinguish between tuple-form and single-schema form carefully; migrating from tuple-form to single-schema can change semantics widely and should be classified conservatively as breaking unless proven otherwise.
- Equality checks for uniqueItems require deep comparison semantics; diffing should not attempt to decide uniqueness at schema-diff time, only record that uniqueItems changed.

7. Detailed digest and attribution
- Source: https://json-schema.org/understanding-json-schema/reference/array.html
- Retrieval date: 2026-03-23T00:59:51Z
- Bytes downloaded: 493668
- Extracted: canonical semantics for items, tuple validation rules, additionalItems default behavior, minItems/maxItems/uniqueItems rules and guidance for implementation and diff classification.

Attribution: content normalised from JSON Schema "Array" reference material on json-schema.org.