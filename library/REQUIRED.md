REQUIRED

Table of contents
1. Definition and formal semantics
2. Exact validation algorithm
3. Implementation notes for schema diffing
4. Change classification rules
5. Edge cases and interactions
6. Reference details (normalized spec excerpts)
7. Detailed digest and attribution

1. Definition and formal semantics
- Keyword name: required
- Value type: array of strings. Each array item MUST be a string and items MUST be unique.
- Applicability: applies only when the instance being validated is an object. When the instance is not an object the keyword has no effect.
- Semantics: for each member name in the required array, the instance object MUST contain a member with that name. If any required name is absent, validation fails.
- Default: absence of the required keyword is equivalent to an empty array of required names.

2. Exact validation algorithm
- Let R be the value of schema.required if present; otherwise R = empty array.
- If the instance is not an Object, the required check is ignored (passes).
- For each name in R do:
  - If the instance does not have an own property with that exact name, return validation failure referencing that name.
  - Otherwise continue.
- All names in R must be unique; duplicate names in R are a schema authoring error.

3. Implementation notes for schema diffing
- Normalise absent required to an empty array before comparison.
- Compute sets: added = set(after.required) \ set(before.required); removed = set(before.required) \ set(after.required).
- Emit change records for each element in added and removed. Use path "/required" when reporting top-level required array changes and provide the specific name as before/after values.
- If a property is removed from the properties object and that property name was listed in before.required, emit both a property-removed change (path: "/properties/<name>") and a required-removed change; classify the combined effect as breaking (see section 4).
- When required appears inside nested subschemas (e.g., properties.*.required), treat it as local to that subschema and compute changes with path context reflecting the subschema location, e.g., "/properties/address/properties/street/required".

4. Change classification rules
- required-added (making a previously optional property required): breaking.
- required-removed (making a previously required property optional): compatible.
- property-removed when the property was listed in before.required: breaking.
- property-added: compatible (unless accompanied by required behavior that makes it mandatory for consumers).
- In general, removals of required guarantees are breaking; additions of requirements are breaking; relaxations are compatible.

5. Edge cases and interactions
- $ref: resolve local $ref targets before comparing required arrays inside referenced subschemas. If a required array is present only behind a $ref, dereference and compare the resolved arrays.
- allOf/oneOf/anyOf: required arrays inside combined subschemas are local to each member; changes inside a member may or may not cause overall validation differences depending on combination logic. For diffing, treat changes inside these members as nested-changed entries and let higher-level analysis determine overall breaking/compatible classification if necessary.
- non-string items in required: schema authorship error; treat as invalid schema for the purposes of diffing and surface an implementation error.

6. Reference details (normalized spec excerpts)
- required: array of strings (unique). Each string is a property name. Applies to objects only. On validation, the instance must contain the named properties.
- This document uses the JSON Pointer resolution rules from RFC 6901 for locating definitions referenced by $ref when resolving required arrays inside referenced subschemas.

7. Detailed digest and attribution
- Source: https://json-schema.org/understanding-json-schema/reference/required.html
- Retrieval date: 2026-03-23T00:59:51Z
- Bytes downloaded: 22038
- Extracted: definition and validation algorithm for the required keyword; guidance on usage and interactions with object properties and $ref.

Attribution: content extracted and normalised from the JSON Schema "required" reference page (json-schema.org).