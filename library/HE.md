HE

Table of contents:
1. Purpose
2. API surface (signatures and options)
3. encode() options semantics
4. decode() options semantics
5. Implementation notes and integration guidance
6. Digest and attribution

1 Purpose
he is an HTML entity encoder/decoder focused on correctness: it supports all standardized named character references, handles ambiguous ampersands as per HTML parsing rules, and correctly processes astral symbols.

2 API surface (signatures)
- he.version : string
- he.encode(text: string, options?: object) -> string
- he.decode(html: string, options?: object) -> string

3 encode() options (exact semantics)
- useNamedReferences: boolean (default false). If true, prefer named references such as &copy; when available; otherwise numeric escapes are used.
- decimal: boolean (default false). If true, use decimal escapes (e.g. &#169;) instead of hexadecimal. When useNamedReferences is true, named references are preferred over decimal escapes.
- encodeEverything: boolean (default false). If true, encode every symbol including printable ASCII. This takes precedence over allowUnsafeSymbols.
- strict: boolean (default false). If true, throw on invalid code points rather than returning them encoded.
- allowUnsafeSymbols: boolean (default false). If true, do not encode characters that are unsafe for HTML content (&, <, >, ", ', `) unless encodeEverything is true. When false these symbols are encoded.
- Global default options may be set via he.encode.options.

4 decode() options
- isAttributeValue: boolean (default false). When true, decode as if the input is an HTML attribute value and apply attribute-specific parsing rules for character references; otherwise decode as text content.

5 Implementation notes and integration guidance
- Use he.decode to reliably decode HTML entities after removing tags when implementing stripHtml; this ensures named and numeric references, including ambiguous ampersands, are resolved as browsers would.
- he.encode provides fine-grained control for output encoding when generating HTML-safe content.

6 Digest and attribution
Source: https://github.com/mathiasbynens/he (README excerpt)
Date retrieved: 2026-03-23
Bytes retrieved during crawl: 411955 bytes
