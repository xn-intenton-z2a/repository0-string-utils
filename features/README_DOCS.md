# README_DOCS

Summary

Document library usage and provide concise examples for each exported function so consumers can quickly understand behaviour and edge cases.

Documentation requirements

- Update repository README.md to include a Usage section that imports the named functions from src/lib/main.js and demonstrates at least one example for each function.

- For each function provide:
  - One-line description
  - Example call and its expected output (literal)
  - Notes on edge cases (null/undefined behaviour, Unicode support)

Examples (to include in README):
- import { slugify } from './src/lib/main.js'
- slugify("Hello World!") // "hello-world"

- import { truncate } from './src/lib/main.js'
- truncate("Hello World", 8) // "Hello…"

- import { levenshtein } from './src/lib/main.js'
- levenshtein("kitten","sitting") // 3

Acceptance criteria

- README contains a Usage section with examples for all ten functions and notes about null/undefined handling and Unicode.
- Examples show exact expected outputs to guide test writing and verification.
