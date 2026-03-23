OBJECT_SCHEMA

Table of contents
1. properties, patternProperties, additionalProperties
2. required array semantics
3. dependencies and propertyNames
4. Change detection rules for object properties
5. Change classification rules (breaking/compatible/informational)
6. Supplementary implementation details
7. Detailed digest and attribution

1. properties, patternProperties, additionalProperties
- properties: an object mapping literal property names to schema nodes. Each value is a schema that applies to the named property.
- patternProperties: keys are strings representing regular expressions; each matching property name in instances must validate against the corresponding schema.
- additionalProperties: boolean or schema. When set to false, properties not matched by properties or patternProperties are disallowed; when a schema, unmatched properties must validate against that schema; when true (default), unspecified properties are permitted.

2. required array semantics
- "required" is an array of property-names (strings) with uniqueItems true and default []. If a name appears in "required", instances must contain that property to validate successfully.
- Removing a property that is listed in "required" is a breaking change for consumers relying on that property being present.

3. dependencies and propertyNames
- dependencies: an object where a property name maps either to a schema (value-dependent validation) or to an array of property names (property dependencies) which require the presence of other properties.
- propertyNames: a schema applied to property names themselves (each property name must validate against this schema).

4. Change detection rules for object properties
- property-added: appears when a key exists in after.properties but not in before.properties.
- property-removed: appears when a key exists in before.properties but not in after.properties.
- required-added: elements in set(after.required) \ set(before.required).
- required-removed: elements in set(before.required) \ set(after.required).
- nested-changed: when both before.properties[name] and after.properties[name] exist, recursively diff those two subschemas and emit nested-changed with a path that includes /properties/<name> and nested changes as a recursive list.

5. Change classification rules (examples)
- property-removed where the removed property was listed in before.required -> breaking.
- property-removed where the property was not required -> compatible (consumers that only expect optional properties unaffected).
- required-added (making a previously optional property required) -> breaking.
- required-removed (making a previously required property optional) -> compatible.
- type-changed for a property (e.g., string -> number) -> usually breaking unless the change widens allowed types in a way that is a superset; classification rule example: if after.type is a superset of before.type -> compatible, if after.type is a subset -> breaking.

6. Supplementary implementation details
- When comparing required arrays, treat absent "required" as empty array.
- When comparing properties objects, missing properties object means no named properties are defined; treat as empty object.
- For nested property diffing include full path context in change records, e.g., { path: "/properties/address/properties/street", changeType: "type-changed", before: "string", after: "number" }.
- When resolving $ref, resolve before computing property comparisons so that the schema under the property key is canonical (pre-resolve all local $refs within the same document).

7. Detailed digest and attribution
- Objects and required semantics from: https://json-schema.org/understanding-json-schema/reference/object.html (retrieved 2026-03-23T00:06:02.131Z, 708999 bytes)
- General site guidance: https://json-schema.org/understanding-json-schema/ (retrieved 2026-03-23T00:06:02.131Z, 81068 bytes)
