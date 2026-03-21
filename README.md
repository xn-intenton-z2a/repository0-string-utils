# repository0 - String Utilities Demo

This repository provides a small JavaScript library of string utility functions.

Available functions (exported from src/lib/main.js):

- slugify(input)
- truncate(input, maxLength = 20, suffix = "…")
- camelCase(input)
- kebabCase(input)
- titleCase(input)
- wordWrap(input, width = 80)
- stripHtml(input)
- escapeRegex(input)
- pluralize(input)
- levenshtein(a, b)

Examples

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

slugify('Hello World!'); // 'hello-world'
truncate('Hello World', 8); // 'Hello…'
camelCase('foo-bar-baz'); // 'fooBarBaz'
kebabCase('Foo Bar Baz'); // 'foo-bar-baz'
titleCase('the quick BROWN fox'); // 'The Quick Brown Fox'
wordWrap('A long text...', 40); // returns wrapped text with \n
stripHtml('<p>Hi &amp; you</p>'); // 'Hi & you'
escapeRegex('.*?'); // '\\.*\\?'
pluralize('box'); // 'boxes'
levenshtein('kitten', 'sitting'); // 3
```

See `src/web/index.html` for a live demo of these functions in the browser.
