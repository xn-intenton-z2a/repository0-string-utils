DOMPARSER

Table of contents
- Overview
- API signature
- Accepted MIME types and parsing semantics
- Error handling and parsererror behavior
- Security notes
- Usage patterns and examples
- Supplementary details and browser considerations
- Retrieval digest and attribution

Overview
DOMParser is a standard Web API that parses XML or HTML source from a string and returns a Document object. It is intended to produce a DOM tree from source text without attaching it to the live document.

API signature
- constructor: new DOMParser()
- method: parseFromString(string, mimeType) -> Document
  - string: input string containing HTML or XML source
  - mimeType: one of 'text/html', 'text/xml', 'application/xml', 'application/xhtml+xml', 'image/svg+xml'

Accepted MIME types and semantics
- 'text/html': returns an HTMLDocument; the input is parsed using the HTML parser. If the platform supports it, 'text/html' will produce an HTML Document with standard HTML parsing rules.
- XML mime types ('text/xml', 'application/xml', 'application/xhtml+xml', 'image/svg+xml'): parsed using an XML parser; parse errors produce a Document containing a parsererror element (implementation-specific namespace and markup).

Error handling
- For XML parsing, parse errors are reflected by inserting a parsererror node in the returned Document; implementations vary in the exact node contents and namespace.
- For 'text/html', some implementations do not expose parse errors this way; HTML parsing is more permissive.

Security notes
- Parsing untrusted HTML into a Document and then transferring nodes into the page can create XSS risks. Sanitize or use inert parsing contexts and avoid innerHTML-like insertion without sanitization.
- Use textContent or other safe extraction methods when extracting data.

Usage patterns
- Parse HTML fragment: var parser = new DOMParser(); var doc = parser.parseFromString('<div><p>hello</p></div>', 'text/html'); var p = doc.querySelector('p');
- Parse XML: var xmlDoc = parser.parseFromString('<root><a/></root>', 'application/xml');

Supplementary details and browser considerations
- Widely supported across modern browsers.
- When using 'text/html', returned Document may include DocumentType and HTML/HEAD/BODY structure produced by the HTML parser.

Retrieval digest
- Source: MDN Web Docs — DOMParser
- Retrieved: 2026-03-21
- Bytes retrieved (Content-Length header): 146598

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
- MDN Web Docs content used under the site's terms.