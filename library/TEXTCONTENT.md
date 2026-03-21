TEXTCONTENT

Table of contents
- Overview
- Behavior (getter/setter)
- Differences vs innerText/textContent
- Examples
- Supplementary details
- Retrieval digest and attribution

Overview
textContent is a DOM property on Node objects that represents the text content of the node and its descendants. Getting textContent returns the concatenated textual content; setting textContent replaces all child nodes with a single Text node containing the given string.

Behavior
- Getter: returns a string containing the text content of the node and all its descendants. For element nodes it returns text of child text nodes in document order.
- Setter: setting node.textContent = 'x' removes all child nodes of node and replaces them with a single text node whose value is 'x'. If set to null/undefined, implementations coerce to string and set to empty string.

Differences
- textContent returns raw text and does not trigger CSS layout; innerText normalizes spacing and is affected by CSS and layout.

Examples
- var s = element.textContent; // read textual content
- element.textContent = 'new'; // replace children with a single text node

Supplementary details
- Use textContent for safe extraction of text from nodes (it does not parse HTML). To extract plain text from HTML source, parse into a Document (DOMParser) and read textContent.

Retrieval digest
- Source: MDN Web Docs — Node.textContent
- Retrieved: 2026-03-21
- Bytes retrieved (Content-Length header): 152333

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
- MDN Web Docs content used under the site's terms.