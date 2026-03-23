REF_PARSER

Table of contents
- Overview
- Core capabilities
- Key API methods (signatures, params, return types)
- Options (parse / resolve / dereference) and defaults
- $Refs helper API (paths, values, get, set, exists, circular)
- Local-only dereference pattern (implementation steps to prohibit remote $ref)
- Supplementary details (parsers, resolvers, circular handling)
- Reference details (exact option fields and types)
- Digest (retrieved content summary and date)
- Attribution and data size

1) Overview
JSON Schema $Ref Parser is a library that parses JSON/YAML schemas, resolves JSON References ($ref) and JSON Pointers, and can produce either a bundled schema (internal $refs only) or a fully dereferenced JavaScript object. It supports local file references, HTTP(S) references, custom resolvers/parsers, circular references, and preserves object reference equality for identical targets.

2) Core capabilities (directly actionable)
- Parse: read a single schema file (JSON or YAML) into a JavaScript object without resolving $ref.
- Resolve: find and load all externally referenced files/URLs and return a $Refs object mapping paths to values.
- Bundle: collect all external files and rewrite external $refs as internal $refs so the result can be serialized safely.
- Dereference: replace all $ref occurrences with their resolved values producing a plain JavaScript object graph; identical references resolve to the same object instance; may create circular references.
- Plugin points: custom parsers and custom resolvers can be registered; parse and resolve order controls behavior.

3) Key API methods (signatures, parameter types, return types)
- dereference(schema, [options], [callback]) -> Promise<object>
  schema: string | object (path/URL or schema object)
  options: object (optional configuration)
  callback: function(err, schema) (optional)
  Returns: Promise resolving to the dereferenced schema object. Default behavior mutates the input schema unless options specify otherwise.

- bundle(schema, [options], [callback]) -> Promise<object>
  Returns: Promise resolving to a bundled schema whose external references are replaced with internal JSON Pointer references (safe to JSON.stringify).

- parse(schema, [options], [callback]) -> Promise<object>
  Parses a single file and returns the parsed schema object. Does not resolve $ref.

- resolve(schema, [options], [callback]) -> Promise<$Refs>
  Resolves referenced files/URLs and returns a $Refs object (map of paths to values) and helper methods.

4) $Refs helper API (methods and types)
- $refs.paths([types]) -> string[]
  Returns array of file paths or URLs involved in the schema. Optional types filter (e.g., "file", "http").

- $refs.values([types]) -> object
  Returns a map of paths to resolved values.

- $refs.exists($ref) -> boolean
  Returns true if the referenced path exists in the resolved graph.

- $refs.get($ref) -> any
  Gets the value at the given reference; throws if not found.

- $refs.set($ref, value) -> void
  Sets the value at the given reference; creates missing parents as needed.

- $refs.circular -> boolean
  True if any circular $ref was detected during resolution/dereference.

5) Options (fields, types, notable defaults and effects)
Note: these options are the canonical fields exposed by the library and control parsers/resolvers/dereferencing.
- top-level options: continueOnError: boolean (don't throw on first error), mutateInputSchema: boolean (README shows mutateInputSchema used to avoid modifying original; default behaviour mutates input schema)

- parse options (object | boolean): json, yaml, text, binary. Each may be boolean or object with further fields.
  - json, yaml, text, binary: object | boolean (disable a parser by setting false)
  - order: number (parser run order)
  - allowEmpty: boolean (defaults: built-in parsers allow empty files)
  - text.encoding: string (default "utf8")
  - text.canParse: string|RegExp|array|function to match file paths/extensions

- resolve options (control resolvers)
  - external: boolean (whether to resolve external $refs; if false, external refs are ignored)
  - file: object|boolean (built-in file resolver; false to disable)
  - http: object|boolean (built-in http resolver; false to disable)
    - http.headers: object (HTTP headers to include)
    - http.timeout: number (ms; default 60000)
    - http.redirects: number (default 5)
    - http.withCredentials: boolean

- dereference options
  - circular: boolean | "ignore"  (false throws ReferenceError on circular refs; "ignore" suppresses error but sets $refs.circular = true)
  - excludedPathMatcher: function(path) => boolean (skip dereferencing under matched paths)
  - onCircular: function(path) => void (callback when circular detected)
  - onDereference: function(path, value, parent, propertyName) => void (callback invoked after dereferencing a property)
  - preservedProperties: string[] (array of property names to preserve when dereferencing alongside a $ref)

6) Local-only dereference pattern (implementation steps to prohibit remote $ref — exact actionable approach)
The mission requires remote $ref (network) to be considered out-of-scope and for the library to throw on encountering them. The recommended implementation pattern using JSON Schema $Ref Parser plus a pre-scan step is:

- Step A: Pre-scan the input schema recursively for any object that has a "$ref" property whose value is a string.
  - Treat a reference as remote if the reference string contains a URI scheme (match /^[a-zA-Z][a-zA-Z0-9+.-]*:/) and is not a plain JSON Pointer (not starting with "#"), or if it begins with "http://" or "https://".
  - If any remote reference is found, throw an Error with the offending ref string: e.g., throw new Error("Remote $ref not supported: " + ref).

- Step B: If the pre-scan passes (no remote refs), call the parser/dereferencer with options that avoid network resolvers as a safety measure:
  - Call $RefParser.dereference(schema, { resolve: { http: false, external: false }, dereference: { circular: false } })
  - Alternatively, use $RefParser.resolve and inspect $refs.paths() to confirm only local/relative/file paths are present before calling dereference.

- Rationale: disabling http resolvers guards against accidental network fetches, and pre-scan ensures explicit erroring on unsupported remote refs rather than silently ignoring them.

7) Supplementary implementation details and best practices
- Mutating input schema: by default the library may modify the schema in-place; use an option to clone or set mutateInputSchema: false when callers expect the original to be preserved.
- Circular references: dereference produces real object references; to produce a JSON-serializable result prefer bundle() which rewrites external refs to internal pointers and avoids circular graphs.
- Preserving non-ref properties: preservedProperties option lets you keep fields like description or summary when they appear together with a $ref.
- Custom plugins: implement custom resolvers or parsers to handle non-standard storage (databases, in-memory registries). Resolvers and parsers have order settings so you can control precedence.
- Error handling: use continueOnError option to collect errors instead of throwing immediately during large multi-file resolution.

8) Reference details (exact documented method signatures and option fields)
- dereference(schema, [options], [callback]) -> Promise<object>
  - schema: string | object
  - options: object (see Options section)
  - callback: function(err, schema)
  - returns: Promise<object>

- bundle(schema, [options], [callback]) -> Promise<object>
- parse(schema, [options], [callback]) -> Promise<object>
- resolve(schema, [options], [callback]) -> Promise<$Refs>

- $Refs methods and types (as implemented by the library):
  - paths([types]) -> string[]
  - values([types]) -> object (map path -> value)
  - exists($ref) -> boolean
  - get($ref) -> any
  - set($ref, value) -> void
  - circular -> boolean

9) Digest (detailed content extracted and retrieval date)
- Content retrieved from:
  - https://raw.githubusercontent.com/APIDevTools/json-schema-ref-parser/master/README.md
  - https://apidevtools.com/json-schema-ref-parser/docs/ref-parser.html
  - https://apidevtools.com/json-schema-ref-parser/docs/options.html
  - https://apidevtools.com/json-schema-ref-parser/docs/refs.html
  Retrieval date: 2026-03-23

- Extracted facts included above: method names and exact parameter names (schema, options, callback), return types (Promise), $Refs helper API (paths, values, get/set/exists, circular), and exact option names (external, file, http, circular, excludedPathMatcher, onCircular, onDereference, preservedProperties, parse.json/yaml/text/binary and their subfields).

10) Attribution and data size (bytes downloaded during crawl)
- README (raw from GitHub): https://raw.githubusercontent.com/APIDevTools/json-schema-ref-parser/master/README.md — 6221 bytes
- API docs (ref-parser.html): https://apidevtools.com/json-schema-ref-parser/docs/ref-parser.html — 22093 bytes
- Options docs: https://apidevtools.com/json-schema-ref-parser/docs/options.html — (included in API docs crawl)  (see above)
- $Refs docs: https://apidevtools.com/json-schema-ref-parser/docs/refs.html — included in API docs crawl
- npm registry metadata: https://registry.npmjs.org/json-schema-ref-parser/latest — 2755 bytes, unpackedSize: 21418 bytes

References
- APIDevTools — JSON Schema $Ref Parser README and API docs (sources above)

Notes
- This document focuses on the actionable API details and exact option names needed to implement local-only $ref resolution for a JSON Schema diff tool. It intentionally omits remote-reference handling since the mission requires remote $ref be rejected. Use the pre-scan pattern above to detect and throw on remote refs before attempting a full dereference.

-- end of REF_PARSER.md
