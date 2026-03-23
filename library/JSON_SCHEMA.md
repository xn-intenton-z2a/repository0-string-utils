JSON_SCHEMA

Table of contents
1. Scope and version
2. Core keywords and types (Draft-07)
3. Keyword definitions and attribute types
4. Boolean-schema behaviour
5. Supplementary implementation notes
6. Reference details (meta-schema excerpts)
7. Detailed digest and attribution

1. Scope and version
This document captures the Draft-07 JSON Schema core and meta-schema material required to implement schema traversal and diffing for Draft-07 documents.

2. Core keywords and types (Draft-07)
- Schema root may be either an object or a boolean (schema can be true or false).
- Identifiers: $id (string, format: uri-reference), $schema (string, format: uri), $ref (string, format: uri-reference).
- Descriptive keywords: title, description (strings), examples (array), default.
- Numeric keywords: multipleOf (number, exclusiveMinimum: 0), maximum, exclusiveMaximum, minimum, exclusiveMinimum.
- String keywords: maxLength (nonNegativeInteger), minLength (nonNegativeIntegerDefault0), pattern (string, format: regex).
- Array keywords: additionalItems (schema), items (schema or schemaArray), maxItems, minItems, uniqueItems (boolean), contains (schema).
- Object keywords: maxProperties, minProperties, required (array of strings), additionalProperties (schema), definitions (object mapping names to schemas), properties (object mapping names to schemas), patternProperties (object mapping regex to schemas), dependencies.
- Composition: allOf, anyOf, oneOf (schemaArray), not (schema).
- Conditional: if, then, else (schemas).
- Type keyword: type (string or array of strings) using simple types: array, boolean, integer, null, number, object, string.
- Enum and const: enum (array with uniqueItems true minItems 1), const.

3. Keyword definitions and attribute types
- required: array of strings. Semantics: a property name listed in required must be present in instance object for validation to succeed.
- properties: an object mapping property names to schemas. Missing property in properties means no explicit schema provided.
- additionalProperties: when true (default) properties not listed in properties are allowed; when a schema, additional properties must validate against that schema; when false, additional properties are disallowed.
- patternProperties: map of regular-expression property names to schemas; keys are property-name-strings treated as regexes (must be validated as regex by implementer).
- items: when a single schema, each array element must validate against it; when an array of schemas, positional tuple validation applies.

4. Boolean-schema behaviour
- A schema MAY be the boolean value true or false.
- true: the instance always validates.
- false: the instance never validates.
- Implementations: treat boolean schema as equivalent to an always-valid or always-invalid schema object.

5. Supplementary implementation notes
- When traversing a schema tree, accept both object and boolean nodes.
- Treat "schema arrays" (anyOf/oneOf/allOf lists and items as tuple) as arrays of schema nodes addressed by index when producing change paths (e.g., /allOf/1).
- When resolving $ref, apply URI resolution rules against $id and document base; fragment (after '#') is interpreted as a JSON Pointer per RFC 6901 and applied to target document.

6. Reference details (meta-schema excerpts)
From the Draft-07 meta-schema (condensed):
- "definitions" contains helper definitions: schemaArray: { type: "array", minItems: 1, items: { "$ref": "#" } }
- "simpleTypes": { "enum": ["array","boolean","integer","null","number","object","string"] }
- required property schema: required -> stringArray -> type: "array", items: { type: "string" }, uniqueItems: true, default: []
- items: anyOf [ { "$ref": "#" }, { "$ref": "#/definitions/schemaArray" } ], default: true

7. Detailed digest and attribution
- Sources used to build this document:
  - https://json-schema.org/draft-07/schema  (retrieved 2026-03-23T00:06:02.131Z, 4979 bytes)
  - https://json-schema.org/ (retrieved 2026-03-23T00:06:02.131Z, 161786 bytes) for general site guidance

Attribution: Official JSON Schema Draft-07 meta-schema and JSON Schema website.
