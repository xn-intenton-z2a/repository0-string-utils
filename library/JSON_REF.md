JSON_REF

Table of contents
1. $ref semantics (Draft-07)
2. Resolution algorithm for local references
3. Base URI and $id handling (brief)
4. Remote references and out-of-scope policy
5. Sibling keywords behaviour
6. Implementation pseudocode
7. Supplementary details (edge cases)
8. Detailed digest and attribution

1. $ref semantics (Draft-07)
- $ref is a URI reference (string, format: uri-reference). When a validator encounters a $ref, the referenced schema is used in place of the $ref object.
- A reference may include a fragment. When present, the fragment is interpreted as a JSON Pointer (RFC 6901) applied to the target document.

2. Resolution algorithm for local references (fragment-only)
- If $ref value begins with the character '#', it is a fragment-only reference into the same document. Resolution algorithm:
  a. Strip leading '#'. If result is empty string, pointer refers to the document root.
  b. Percent-decode the fragment (if URL-encoded) and apply JSON Pointer unescape rules (~1 -> /, ~0 -> ~).
  c. Evaluate the JSON Pointer against the root of the current document. If the referenced target is found, the $ref node is considered to refer to that target schema.
  d. Replace the $ref node with the referenced schema when performing traversal or validation; do not evaluate sibling keywords in the original $ref object (see section 5).
- If the pointer does not resolve, implementations should raise an error: unresolvable $ref.

3. Base URI and $id handling
- When $ref is not fragment-only, resolve it as a URI-reference against the current document's base URI. The base URI is computed from the document's location and $id keywords present in ancestor schemas.
- After URI resolution, if the reference includes a fragment, interpret that fragment as a JSON Pointer into the resolved document.

4. Remote references and out-of-scope policy
- Remote references (those not fragment-only and that resolve to external documents) require fetching or previously registering the external schema. For this mission remote $ref is out-of-scope; implementations should throw or fail when encountering non-local references unless a registry of preloaded external schemas is provided.

5. Sibling keywords behaviour
- A schema object whose sole purpose is a $ref is the normative use. Keywords that appear alongside $ref in the same object are ignored by validators for the purpose of evaluation. Implementations should treat the referenced schema as the authoritative schema for that location; siblings are not applied in addition to the referenced schema.

6. Implementation pseudocode (local refs only)

resolveLocalRef(documentRoot, refString):
  if not refString startsWith('#'):
    throw Error('Remote $ref not supported')
  pointer = refString.slice(1)
  if pointer startsWith('/') or pointer == '':
    unescapedPointer = percentDecode(pointer)
    target = jsonPointerEvaluate(documentRoot, unescapedPointer)
    if target is undefined:
      throw Error('Unresolvable local $ref: ' + refString)
    return target
  else:
    # pointer may be empty referring to root
    return documentRoot

Note: jsonPointerEvaluate follows RFC 6901 (see JSON_POINTER document).

7. Supplementary details (edge cases)
- $ref values may be relative URIs and rely on $id to compute absolute target; if $id is present on a subschema it changes the base for resolution of nested $ref values.
- Implementers must take care not to enter infinite loops when pointers are cyclic (schemas can reference themselves directly or indirectly). Detect cycles and break traversal or throw an error as appropriate.

8. Detailed digest and attribution
- Main guidance: "Understanding JSON Schema" structuring/$ref section (retrieved 2026-03-23T00:06:02.131Z, 418038 bytes) https://json-schema.org/understanding-json-schema/structuring.html#ref
- Practical resolver notes: Ajv refs guide (retrieved 2026-03-23T00:06:02.131Z, 6401 bytes) https://ajv.js.org/guide/refs.html

Attribution: JSON Schema "Understanding JSON Schema" and Ajv documentation.
