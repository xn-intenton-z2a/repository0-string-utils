MDN_DOMPARSER

Normalised extract — table of contents:
- Overview
- Constructor
- parseFromString(signature and behaviour)
- MIME types supported
- Usage patterns (strip HTML, decode entities)
- Security and browser compatibility notes

Overview:
DOMParser is a built-in Web API constructor used to parse a string containing serialized markup (HTML or XML) into a Document object.

Constructor:
- new DOMParser() -> DOMParser instance

parseFromString:
- parseFromString(serializedString, mimeType) -> Document

Parameters:
- serializedString: String containing HTML or XML source to parse.
- mimeType: String indicating parser mode. Common values:
  - "text/html" — HTML parsing mode (recommended for HTML snippets)
  - "application/xml", "text/xml", "application/xhtml+xml" — XML parsing modes

Behaviour details:
- In "text/html" mode, the parser behaves like a browser HTML parser: it builds a Document with normalised DOM structure, resolves character references, and recovers from malformed HTML where possible.
- For XML modes, strict parsing applies and parse errors may be surfaced in the returned document (for browsers, errors are often indicated via parsererror elements in the returned Document).
- Returned object: a Document. To extract text content without tags, use the Document's body or documentElement and read textContent.

Usage patterns (strip HTML, decode entities):
- To remove HTML tags and decode entities reliably in a browser environment:
  1) Create a DOMParser instance: p = new DOMParser();
  2) Parse HTML: doc = p.parseFromString(htmlString, "text/html");
  3) Extract plain text: plain = doc.body ? doc.body.textContent : doc.documentElement.textContent || "";
- This approach decodes standard HTML entities as part of parsing and returns the textual content of the document.

Security and compatibility notes:
- parseFromString("...","text/html") is widely supported in modern browsers. For older environments, alternatives include creating an off-DOM element and assigning innerHTML then reading textContent.
- Do not use DOMParser with untrusted HTML in server-side JS without proper sandboxing; DOMParser operates in the same JS context and may consume resources.

Reference details (API):
- Constructor: new DOMParser()
- Method: parseFromString(serializedString: String, mimeType: String) -> Document
- Returns: Document object representing parsed DOM; extraction via document.body.textContent or document.documentElement.textContent yields decoded plain text.

Detailed digest:
- Source: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
- Retrieved: 2026-03-25
- Data fetched (HTML): ~147.6 KB
- Extracted technical content: constructor signature, parseFromString behaviour for 'text/html' and XML MIME types, recommended usage pattern for stripping HTML to text.

Attribution:
- Content adapted from MDN Web Docs (developer.mozilla.org), retrieved on 2026-03-25. MDN content is available under a Creative Commons license.