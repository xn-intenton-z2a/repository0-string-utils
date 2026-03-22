NORMALISED EXTRACT

Table of contents:
- $ref is a URI-reference
- Fragment handling as JSON Pointer (RFC 6901) for subschema selection
- Local $ref resolution algorithm rules
- Remote $ref policy for this project

$ref is a URI-reference
The $ref keyword value is a URI-reference. Resolution follows RFC 3986. If the URI contains a fragment identifier, apply the fragment as a JSON Pointer per RFC 6901 to the retrieved document to select a subschema. When a $ref appears in a schema object, the evaluation of that object is equivalent to the evaluation of the referenced schema; sibling keywords in the same object are ignored.

Fragment handling as JSON Pointer (RFC 6901)
Fragment identifiers that begin with '#' must be interpreted as a JSON Pointer and resolved against the target document. The empty fragment '#' or an empty pointer string refers to the whole document. JSON Pointer tokens use the escape sequences ~0 for ~ and ~1 for / and are applied in order to traverse objects and arrays.

Local $ref resolution algorithm rules (implementation-ready)
- Only accept $ref values whose URI is either an empty fragment or starts with '#'. Treat them as local JSON Pointer references into the same root document.
- To resolve pointer '#/a/b/0', strip the leading '#' then split on '/'; unescape each token (replace ~1 with / and ~0 with ~), then descend the JSON structure: if current node is object use token as property, if array parse token as integer index and use as array index. If any step fails, throw Error('Unresolvable JSON Pointer: ' + pointer).
- Replacement semantics: when resolving a $ref, replace the object containing the $ref with a deep clone of the target subschema. Maintain a visited set of pointer strings to detect cycles; if pointer already visited, stop inlining and preserve a reference placeholder or throw when cycles would cause infinite expansion.

Remote $ref policy for this project
- Remote references (URI that does not begin with '#') are out of scope and must cause an explicit error at dereference time: throw Error('Remote $ref encountered and not supported: ' + ref).
- This simplifies reproducibility and ensures diffs operate on a closed document.

SUPPLEMENTARY DETAILS

Edge cases
- Self-referential pointers (pointing to parent or same node) must be handled without infinite recursion by tracking visited pointers and stopping expansion.
- Pointer tokens referring to array positions must be numeric strings; negative indices are invalid; treat non-numeric tokens as error when applied to arrays.

REFERENCE DETAILS

APIs and signatures
- resolveJsonPointer(document: object, pointer: string): any
  Parameters: document - the root JSON object; pointer - an RFC6901 pointer string starting with '/' or empty string. Returns the value at the pointer. Throws on invalid pointer or missing target.

- dereferenceLocalRefs(schema: object): object
  Parameters: schema - the root schema object potentially containing local $ref. Returns a new schema object with local $ref inlined. Throws on remote $ref or unresolvable pointer.

Implementation pattern (pseudocode description)
- Function dereferenceLocalRefs(root): create a memo map; define inner function walk(node, path): if node is an object and has $ref and $ref startsWith('#'), if memo has pointer return memo[pointer]; else resolve pointer to target; memo[pointer]= placeholder; clone target; replace node with cloned target and continue walking cloned target recursively; return node.

DETAILED DIGEST

Source: JSON Schema - structuring and references pages (json-schema.org/understanding-json-schema)
Retrieved: 2026-03-22
Size fetched: 424.3 KB

Extracted content used: exact pointer escape rules (~0 => ~, ~1 => /), $ref evaluation rule (object delegating to referenced schema), fragment-as-pointer behaviour and examples of pointer paths used in resolution.

ATTRIBUTION
- URL: https://json-schema.org/understanding-json-schema/structuring.html
- Retrieved: 2026-03-22
- Bytes fetched: 424.3 KB
