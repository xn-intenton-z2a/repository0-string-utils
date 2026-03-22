JSON_SCHEMA_OBJECT

Table of contents
1. Object keywords covered
2. Semantics and validation rules
3. Traversal and resolution rules for implementations
4. Implementation patterns and API signatures
5. Supplementary details (edge cases)
6. Reference details (precise behaviour)
7. Detailed digest (source + retrieval)
8. Attribution and data size

1. Object keywords covered
- type (object)
- properties: mapping of propertyName -> subschema
- required: array of property names (presence check only)
- additionalProperties: boolean or schema (controls properties not matched by properties/patternProperties)
- patternProperties: mapping of regex -> subschema (regex applied to property names)
- propertyNames: schema applied to each property name
- dependencies: either object mapping propertyName -> array-of-property-names (property-dependency) or mapping propertyName -> schema (schema-dependency)

2. Semantics and validation rules (exact behaviours)
- properties: for each key in the "properties" object, if the instance has that property name, validate the property's value against the corresponding subschema.
- required: enforces presence of listed property names in the instance object. Presence means the property key exists on the instance object (value may be null). Missing entry -> validation failure.
- additionalProperties:
  - If additionalProperties is boolean false, any instance property not matched by "properties" or "patternProperties" causes validation failure.
  - If a schema, the property value is validated against that schema.
  - Default when unspecified: additional properties are allowed (behaviorally equivalent to additionalProperties: {}).
- patternProperties: keys are regular expressions using ECMA-262 semantics; any property name matching a pattern will be validated against the associated subschema. Multiple patternProperties may apply to the same property (all relevant subschemas validate).
- propertyNames: when present, validate each property name (string) against the provided schema.
- dependencies:
  - If an entry is an array (property dependency), then presence of the key requires that all names in the array are present in the instance.
  - If an entry is a schema (schema dependency), then if the property is present the instance must validate against that schema as a whole.

3. Traversal and resolution rules for implementations
- Preprocess: resolve local $ref values before traversal. If a $ref value does not start with '#', throw Error('Remote $ref not supported: ' + ref).
- Path notation for traversal: use JSON Pointer-style schema paths for change records: "/properties/<propName>" for property schemas; nested properties append "/properties/<name>" repeatedly.
- When encountering "properties": iterate keys in schema.properties and traverse each subschema at path "/properties/<key>".
- When encountering "patternProperties": treat each pattern key as metadata but traverse its subschema at path "/patternProperties/<pattern>".
- When encountering "additionalProperties" and it is a schema, traverse that schema at path "/additionalProperties".
- dependencies with schema values: traverse the schema value at path "/dependencies/<propName>".

4. Implementation patterns and API signatures
- findByPointer(document: object, pointer: string) -> any
  - Parameters: document (root JSON object), pointer (string beginning with '/')
  - Returns: the referred JSON value, or throws Error('Unresolvable JSON Pointer: ' + pointer) if the path does not exist.
- resolveLocalRef(document: object, ref: string) -> object
  - Parameters: document (schema root), ref (string, must start with '#')
  - Behaviour: strip leading '#', apply RFC6901 unescaping (~1 -> '/', ~0 -> '~') to each reference token, and traverse the document to return the referenced schema. Throws Error('Remote $ref not allowed: ' + ref) if ref does not begin with '#'.
- traverseSchema(schema: object, callback: (node: object, path: string) => void) -> void
  - Walks schema nodes in depth-first order; calls callback for every subschema encountered with its schema-path. Implementations should detect cycles (seen set) and avoid infinite recursion.
- diffSchemas(beforeSchema: object, afterSchema: object) -> ChangeRecord[]
  - ChangeRecord shape expected by mission: { path: string, changeType: string, before: any, after: any }

5. Supplementary details (edge cases)
- Required applies only to property presence, not to its type or value; removing a property listed in required is a breaking change if consumers depended on that property being present.
- patternProperties regexes use ECMA-262; ensure runtime regex engine matches the spec semantics used by the consumer.
- When properties contain $ref, resolve first, then compare resolved subschemas to avoid spurious differences caused by indirection.
- Schema cycles: maintain a memo of visited object identity pairs (beforeNode, afterNode) during diff to break cycles and report nested-changed where needed.

6. Reference details (precise behaviour and operational patterns)
- JSON Pointer unescaping: for each reference token perform token.replace('~1','/').replace('~0','~') before indexing.
- Array access: if token is a base-10 unsigned integer, interpret as array index when the current node is an array, otherwise treat as object property name.
- Example resolution algorithm (pseudocode):
  - function resolveLocalRef(doc, ref): if (!ref.startsWith('#')) throw; pointer = ref.slice(1) || '/'; tokens = pointer.split('/').slice(1); node = doc; for token in tokens: token = unescape(token); if (isArrayIndex(token) && Array.isArray(node)) node = node[Number(token)]; else node = node[token]; if node === undefined throw; return node;
- Change classification relevant to objects (rules summarised):
  - property-removed -> breaking
  - property-added -> compatible unless the added property is required (then breaking)
  - required-removed -> compatible (fewer constraints) or informational depending on context
  - required-added -> breaking (instances previously valid may become invalid)
  - description-changed -> informational
  - nested-changed -> recursively evaluate classification; if any nested change is breaking, propagate breaking upward

7. Detailed digest
- Source: https://json-schema.org/understanding-json-schema/reference/object.html
- Retrieval date: 2026-03-22
- Bytes fetched during crawl: 737853 bytes
- Extracted sections: properties, required, additionalProperties, patternProperties, propertyNames, dependencies, and their exact validation semantics.

8. Attribution
- Source page: JSON Schema official site — Understanding JSON Schema: object (https://json-schema.org/understanding-json-schema/reference/object.html)
- Data size noted above.

