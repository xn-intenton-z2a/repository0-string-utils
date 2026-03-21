# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Getting Started

### Step 1: Create Your Repository

Click **"Use this template"** on the [repository0](https://github.com/xn-intenton-z2a/repository0) page, or use the GitHub CLI:

```bash
gh repo create my-project --template xn-intenton-z2a/repository0 --public --clone
cd my-project
```

### Step 2: Initialise with a Mission

Run the init workflow from the GitHub Actions tab (**agentic-lib-init** with mode=purge), or use the CLI:

```bash
npx @xn-intenton-z2a/agentic-lib init --purge --mission 7-kyu-understand-fizz-buzz
```

This resets the repository to a clean state with your chosen mission in `MISSION.md`. The default mission is **fizz-buzz** (7-kyu).

## String utilities

This project implements a small collection of string utility functions exported from `src/lib/main.js`.

Usage example (Node / ESM):

```js
import { slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein } from './src/lib/main.js';

console.log(slugify('Hello World!')); // 'hello-world'
console.log(truncate('Hello World', 8)); // 'Hello…'
console.log(camelCase('foo-bar-baz')); // 'fooBarBaz'
console.log(kebabCase('Foo Bar Baz')); // 'foo-bar-baz'
console.log(titleCase('hello world')); // 'Hello World'
console.log(wordWrap('The quick brown fox', 10));
console.log(stripHtml('<p>Hello &amp; world</p>')); // 'Hello & world'
console.log(escapeRegex('a+b(c)?')); // 'a\\+b\\(c\\)\\?'
console.log(pluralize('leaf')); // 'leaves'
console.log(levenshtein('kitten', 'sitting')); // 3
```

See `tests/unit/string-utils.test.js` for more examples and edge-case behaviour.

---

The rest of this README documents the agentic-lib workflow used by this template (unchanged).

(Shortened for brevity)
