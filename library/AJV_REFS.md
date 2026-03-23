AJV_REFS

Table of contents
1. Practical $ref handling in Ajv
2. Loader and registry behaviour
3. Useful Ajv API methods (signatures)
4. Implementation notes for local-only resolution
5. Detailed digest and attribution

1. Practical $ref handling in Ajv
- Ajv resolves references using schema $id and registered schemas. For fragment-only references ("#..."), Ajv resolves within the same document by applying JSON Pointer semantics.
- Ajv does not fetch remote schemas by default. To resolve non-local references, preload remote schemas into Ajv's registry or use asynchronous loading options.

2. Loader and registry behaviour
- Preload external schemas into Ajv by calling addSchema(schema, key) where key is a URI or identifier matching the external reference.
- Ajv will match $ref values against registered schema keys after URI resolution.

3. Useful Ajv API methods (informal signatures)
- addSchema(schema: object, key?: string | number): Ajv
  - Registers a schema under an optional key (URI or name). When a $ref resolves to that key, Ajv uses the registered schema.
- getSchema(ref: string): ValidateFunction | undefined
  - Returns a compiled validation function for a previously added schema identified by ref, or undefined if not present.
- compile(schema: object): ValidateFunction
  - Compiles a schema into a validation function.
- loadSchema(ref: string): Promise<object>
  - (Optional async loader pattern) Some Ajv setups use custom loaders to fetch schemas; Ajv core does not automatically perform remote HTTP fetches without a loader.

4. Implementation notes for local-only resolution
- For a local-only diffing tool (remote $ref out of scope): pre-resolve all fragment-only refs using the JSON Pointer rules before diffing. If any encountered $ref is not fragment-only, throw an error.
- Avoid relying on Ajv's automatic resolution unless all needed schemas are preloaded into the Ajv instance.

5. Detailed digest and attribution
- Ajv refs guide: https://ajv.js.org/guide/refs.html (retrieved 2026-03-23T00:06:02.131Z, 6401 bytes)
- Understanding JSON Schema structuring/$ref: https://json-schema.org/understanding-json-schema/structuring.html#ref (retrieved 2026-03-23T00:06:02.131Z, 418038 bytes)
