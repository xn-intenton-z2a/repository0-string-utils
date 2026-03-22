JSON_SCHEMA_ARRAY

Table of contents
1. Array-specific keywords
2. Semantics for items, tuple validation and additionalItems
3. Traversal rules for implementations
4. Implementation patterns and API signatures
5. Supplementary details (contains, uniqueItems, min/max)
6. Reference details (exact behaviours)
7. Detailed digest (source + retrieval)
8. Attribution

1. Array-specific keywords
- items: either a single schema (applies to all array elements) or an array of schemas (tuple validation)
- additionalItems: boolean or schema (controls validation of items beyond tuple length)
- minItems / maxItems: numeric constraints on length
- uniqueItems: boolean (when true, all array elements must be unique according to JSON value equality)
- contains: schema (requires at least one element matching the schema)

2. Semantics for items and additionalItems
- If "items" is a schema object: validate every element of the instance array against that schema.
- If "items" is an array of schemas: for index i < items.length, validate instance[i] against items[i]. For indexes >= items.length:
  - If additionalItems is false -> validation fails if extra items exist.
  - If additionalItems is a schema -> validate each extra item against that schema.
  - If additionalItems is absent -> additional items are allowed (equivalent to additionalItems: {}).

3. Traversal rules for implementations
- For items as schema: traverse once at schema path "/items" and perform nested diffs at that node; include indices when producing change records for concrete examples but for schema diffs represent positional schema changes using "/items" and "/items/<index>" for tuple elements.
- For items as array: traverse each schema at "/items/<index>" for index-specific diffs.
- When additionalItems is a schema, traverse it at path "/additionalItems".
- minItems/maxItems/uniqueItems/contains should be recorded as primitive changes (e.g., array-length-constraint-changed) and classified by compatibility rules: tightening minItems may be breaking; loosening maxItems is compatible.

4. Implementation patterns and API signatures
- traverseArraySchema(schema: object, path: string, callback) -> void
  - If items is object: callback(itemsSchema, path + '/items')
  - If items is array: for i in 0..items.length-1 callback(items[i], path + '/items/' + i)
  - If additionalItems is schema: callback(additionalItemsSchema, path + '/additionalItems')
- classification heuristics:
  - items-schema-changed -> nested-changed; if new schema rejects previously valid values -> breaking
  - additionalItems false -> removing support for extra positions -> breaking for instances that had extra items

5. Supplementary details
- contains: presence of contains in the newer schema can be breaking if it imposes a constraint that previous instances did not have to satisfy; classification must consider how contains restricts accepted arrays.
- uniqueItems: switching from false to true is potentially breaking (duplicate-containing instances become invalid).

6. Reference details (exact behaviours)
- Tuple validation rule: items as array must be applied positionally; labels for change records should use "/items/<index>" for specific schemas and "/additionalItems" for tail validation rules.
- Example resolution before diff: always resolve $ref within items schemas so tuple position comparisons compare concrete subschemas.

7. Detailed digest
- Source: https://json-schema.org/understanding-json-schema/reference/array.html
- Retrieval date: 2026-03-22
- Bytes fetched during crawl: 512985 bytes
- Extracted sections: items (single-schema and tuple-schema), additionalItems semantics, minItems/maxItems, uniqueItems, contains and traversal guidance.

8. Attribution
- Source page: JSON Schema official site — Understanding JSON Schema: array (https://json-schema.org/understanding-json-schema/reference/array.html)

