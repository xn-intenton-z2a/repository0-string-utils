NORMALISED EXTRACT

Table of contents:
- Core value types and the "type" keyword
- Object keywords: properties, required, additionalProperties, patternProperties
- Array keywords: items, additionalItems
- Schema composition and evaluation order
- $ref usage and replacement semantics (summary)
- Validation semantics relevant to diffing

Core value types and the "type" keyword
The draft-07 core types are: null, boolean, object, array, number, integer, string. The keyword "type" accepts a single string or an array of strings. An instance validates against "type": X when its JSON value is of the corresponding primitive type (integer is a subset of number). When type is an array, the instance validates if it matches any listed type.

Object keywords
properties: an object mapping property names to a schema applied when the instance has that property. required: an array of property names that must be present in the instance for the instance to validate. If a property is listed in required but absent in the instance, validation fails. additionalProperties: when present and a boolean false, disallows properties not declared under properties or patternProperties; when a schema, it is applied to all undeclared properties. patternProperties: a map of regex strings to schemas; property names matching the regex are validated against that schema.

Array keywords
items: may be a single schema (applies to all array elements) or an array of schemas for positional validation (tuple validation). When items is an array, additionalItems (boolean or schema) controls validation of elements beyond the tuple length.

Schema composition and evaluation order
allOf: instance must validate against all subschemas listed. anyOf: instance must validate against at least one subschema. oneOf: instance must validate against exactly one subschema. not: instance must NOT validate against the subschema. These composition keywords do not merge object schemas automatically; when comparing schemas, composition nodes must be traversed and their child schemas compared recursively.

$ref usage and replacement semantics (summary)
The $ref keyword is a URI-reference. If a schema object contains a $ref, evaluation of that object delegates to the referenced schema; other sibling keywords in the same object are ignored for evaluation. If the $ref contains a fragment identifier (URI#fragment), the fragment is resolved as a JSON Pointer per RFC 6901 against the retrieved document to select a subschema. Local $ref values (fragments beginning with '#') reference locations within the same document and must be resolved before diffing. Remote $ref (non-local URIs) are out of scope for this mission and should cause an error if encountered.

Validation semantics relevant to diffing
- presence/absence of a property in properties combined with required list changes produce change types property-added/property-removed and required-added/required-removed.
- changing the value of "type" for a property produces type-changed.
- enum changes are reported as enum-value-added or enum-value-removed for specific enum members.
- description changes are reported as description-changed and are informational.
- nested-changed must be produced when a property's schema changes in a way that itself yields sub-change records.

SUPPLEMENTARY DETAILS

Dereferencing algorithm (local-only):
- Input: rootSchema (object). Output: dereferenced schema tree where local $ref are inlined.
- Maintain a map visitedPointers to avoid infinite recursion (keyed by absolute fragment string).
- Walk schema nodes depth-first; when encountering an object with a $ref key whose value starts with '#', parse the fragment as a JSON Pointer and resolve against rootSchema; clone the target schema node and replace the object containing $ref with that clone; record the fragment in visitedPointers during resolution; if a pointer repeats, stop inlining and leave a reference marker to avoid cycles.
- If $ref value does not start with '#', throw Error('Remote $ref not supported: ' + ref).

Normalization prior to diffing (recommended):
- Sort properties object keys deterministically.
- Convert "type": [X] arrays to a canonical sorted array representation.
- Remove non-semantic metadata (examples, title) except description which must be compared as a change type.

REFERENCE DETAILS

ChangeRecord format
Each change record is an object with fields:
- path: string JSON Pointer-like path pointing to the schema location under comparison (use slash-separated segments starting at root, e.g. /properties/email)
- changeType: one of property-added, property-removed, type-changed, required-added, required-removed, enum-value-added, enum-value-removed, description-changed, nested-changed
- before: the previous schema value or primitive (or null if not present)
- after: the new schema value or primitive (or null if removed)

Public API signatures (named exports required by mission)
- dereferenceLocalRefs(schema: object): object  -- returns a deep-cloned schema with all local $ref resolved in-place; throws on remote $ref.
- resolveJsonPointer(document: object, pointer: string): any -- resolves a RFC6901 pointer; throws if pointer cannot be applied.
- diffSchemas(beforeSchema: object, afterSchema: object): Array<ChangeRecord> -- returns list of change records; callers should pass dereferenced schemas or allow the function to call dereferenceLocalRefs internally.
- renderChangesAsText(changes: Array<ChangeRecord>): string -- produces readable plain-text summary lines for each change.

Implementation patterns
- Use deterministic traversal: compare property lists first (detect added/removed properties), then compare required arrays, then compare types and enums, then recursively diff property schemas for nested-changed entries.
- Classification rules (mapping): property-removed => breaking; required-added => breaking; required-removed => compatible; type-changed where "before" is a strict superset of "after" may be breaking (simple rule: any narrowing of allowed instance types is breaking); enum-value-removed => breaking when an allowed value is removed, enum-value-added => compatible.
- For nested changes, include a nested-changed record at the property path and also include child change records with deeper paths.

DETAILED DIGEST

Source: JSON Schema Validation: A Vocabulary for Structural Validation of JSON (Draft-07)
Retrieved: 2026-03-22
Size fetched: 90.9 KB

Key extracted lines used to shape the above rules: definition of validation keywords (properties, required, items, allOf/oneOf/anyOf), the behavior of $ref as a URI-reference resolved with fragment identifiers and JSON Pointer, and the semantics of composition keywords. Content used is drawn from the official draft-07 validation specification pages hosted at json-schema.org.

ATTRIBUTION
- URL: https://json-schema.org/draft-07/json-schema-validation.html
- Retrieved: 2026-03-22
- Bytes fetched: 90.9 KB

META-SCHEMA (draft-07/schema) — NORMALISED EXTRACT

Table of contents:
- Definitions present in meta-schema: schemaArray, nonNegativeInteger, nonNegativeIntegerDefault0, simpleTypes, stringArray
- Root type and allowed schema shapes
- Key properties and their canonical types
- items/tuple validation rules

Definitions present in meta-schema
- schemaArray: type array, minItems 1, items: each entry is a schema (recursive reference to "#").
- nonNegativeInteger: integer with minimum 0.
- nonNegativeIntegerDefault0: nonNegativeInteger with default 0.
- simpleTypes: enum of allowed primitive type names: array, boolean, integer, null, number, object, string.
- stringArray: array of strings, uniqueItems true, default []

Root type and allowed schema shapes
- The Draft-07 meta-schema allows a schema to be either an object or a boolean.
- When a schema is an object, its properties are validated against the listed properties in the meta-schema; when a schema is "true" it accepts any instance, and when "false" it rejects all instances.

Key properties and canonical types (excerpted)
- $id: string, format uri-reference
- $schema: string, format uri
- $ref: string, format uri-reference
- $comment: string
- title, description: string
- default: any
- readOnly, writeOnly: boolean (default false)
- examples: array
- multipleOf, maximum, exclusiveMaximum, minimum, exclusiveMinimum: number types
- maxLength, minLength: nonNegativeInteger / nonNegativeIntegerDefault0
- pattern: string with format regex
- additionalItems, additionalProperties, items, contains, propertyNames, dependencies: may reference subschemas via "$ref": "#"
- properties, patternProperties, definitions: object mapping to subschemas (additionalProperties: schema)
- required: stringArray
- enum: array with minItems 1, uniqueItems true
- type: either a simpleTypes enum value or an array of simpleTypes
- allOf, anyOf, oneOf: schemaArray
- not: a schema

Items and tuple validation
- items: anyOf [schema, schemaArray] where schemaArray defines positional subschemas and schema applies to all items. When items is a schema array, additionalItems controls validation for extra positions.

SUPPLEMENTARY DETAILS

- Use the meta-schema definitions to validate that a schema object uses keywords in expected places; e.g., properties should be an object of subschemas.
- Rely on stringArray and simpleTypes definition to canonicalize type lists and required lists when comparing schemas.

REFERENCE DETAILS

Key fragments from the meta-schema:
- "type": ["object", "boolean"]
- "definitions": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }
- "properties": { "type": "object", "additionalProperties": { "$ref": "#" }, "default": {} }
- "required": { "$ref": "#/definitions/stringArray" }
- "items": { "anyOf": [ { "$ref": "#" }, { "$ref": "#/definitions/schemaArray" } ], "default": true }

DETAILED DIGEST

Source: Draft-07 JSON Meta-Schema
Retrieved: 2026-03-22
Bytes fetched: 4979

The Draft-07 meta-schema enumerates canonical keyword shapes and types used across the validation specification. The meta-schema is authoritative for schema shape: use it to derive exact types for keywords when producing diff change records and to validate assumptions made by the diff algorithm.

ATTRIBUTION
- URL: https://json-schema.org/draft-07/schema
- Retrieved: 2026-03-22
- Bytes fetched: 4979
