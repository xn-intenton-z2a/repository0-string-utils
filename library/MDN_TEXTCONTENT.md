MDN_TEXTCONTENT

Normalised extract — table of contents:
- Property overview
- Read semantics
- Write semantics
- Differences vs innerText and innerHTML
- Performance and security notes

Property overview:
- Node.textContent is a DOM property that returns the concatenated text content of a node and its descendants.
- Type: String

Read semantics:
- Reading node.textContent returns a string representing the text content of the node subtree.
- It does not return any markup or HTML tags; character references/entities are already decoded by the parser that created the nodes.

Write semantics:
- Setting node.textContent to a string replaces all child nodes of the node with a single text node whose value is the given string.
- This is a safe way to insert text content without interpreting it as HTML.

Differences vs innerText and innerHTML:
- innerHTML returns HTML markup of the element's children as a string (may expose HTML tags).
- innerText returns human-readable text accounting for CSS and layout (may trigger reflow and is slower); it also normalises whitespace differently.
- textContent is faster and returns the raw textual content without considering CSS or layout; it is the recommended API for extracting or setting plain text.

Performance and security notes:
- Use textContent to safely insert untrusted text into the DOM (prevents HTML interpretation and XSS via markup insertion).
- textContent operates on DOM text nodes and thus returns content that has already been parsed and decoded.

Reference details:
- Property: node.textContent (getter/setter)
- Getter returns: String
- Setter accepts: String (replaces children with a single Text node)

Detailed digest:
- Source: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
- Retrieved: 2026-03-25
- Data fetched (HTML): ~153.3 KB
- Extracted technical content: property semantics, usage pattern to safely read and write text content, and differences from innerText/innerHTML.

Attribution:
- Content adapted from MDN Web Docs (developer.mozilla.org), retrieved on 2026-03-25.