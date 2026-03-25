HE_LIBRARY

Normalised extract — table of contents:
- Purpose
- Core functions
- encode options and defaults
- decode options and defaults
- Additional helpers
- Implementation notes and examples

Purpose:
he is a robust HTML entity encoder/decoder for JavaScript that supports all standardized named character references, handles ambiguous ampersands correctly, and preserves astral Unicode symbols.

Core functions:
- he.version -> String
- he.encode(text, options) -> String
- he.decode(html, options) -> String
- he.escape(text) -> String (escape subset: &, <, >, \" , ', `)
- he.unescape(html) -> String (alias for decode)

encode options and defaults:
- useNamedReferences: Boolean (default: false)
  - When true, prefer named character references (e.g. &copy;) where available; otherwise use numeric references (hex by default).
- decimal: Boolean (default: false)
  - When true, numeric references are decimal (e.g. &#169;) instead of hexadecimal (e.g. &#xA9;). Named references take precedence when available.
- encodeEverything: Boolean (default: false)
  - When true, encode every symbol in the input (including printable ASCII) into character references.
- strict: Boolean (default: false)
  - When true, invalid code points cause encode() to throw. Default behaviour is error-tolerant.
- allowUnsafeSymbols: Boolean (default: false)
  - When true, do not escape the usual unsafe symbols (&, <, >, \" , ', `); only non-ASCII characters are encoded unless other options force it.

decode options and defaults:
- isAttributeValue: Boolean (default: false)
  - If true, decode using rules for HTML attribute values (different treatment of ambiguous ampersands). Default decodes as text context.
- strict: Boolean (default: false)
  - When true, decoding invalid sequences throws an error; default is permissive.

Additional helpers:
- he.escape(text) — escape only the characters that must be escaped in HTML/XML text contexts: &, <, >, \" , ', `.
- he.unescape(html) — alias for he.decode.

Implementation notes and examples:
- he.encode('foo © bar ≠ baz 𝌆 qux') -> 'foo &#xA9; bar &#x2260; baz &#x1D306; qux' (default settings)
- he.decode('foo &copy; bar &ne; baz &#x1D306; qux') -> 'foo © bar ≠ baz 𝌆 qux'
- To prefer named references: he.encode(text, {useNamedReferences: true})
- To decode attribute values safely: he.decode(html, {isAttributeValue: true})

Reference details (API signatures):
- he.version: String
- he.encode(text: String, options?: Object) -> String
- he.decode(html: String, options?: Object) -> String
- he.escape(text: String) -> String
- he.unescape(html: String) -> String

Detailed digest:
- Source: https://github.com/mathiasbynens/he (README content)
- Retrieved: 2026-03-25
- Data fetched (HTML): ~426.1 KB (raw README also retrieved)
- Extracted technical content: full API surface, option names and default values, examples demonstrating encode/decode behaviours and configuration.

Attribution:
- Content extracted from the he README (mathiasbynens/he) retrieved on 2026-03-25. he is MIT-licensed.