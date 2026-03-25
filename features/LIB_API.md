# LIB_API

# Overview

This feature defines the library entrypoint and public API exported from src/lib/main.js. It specifies the module contract: named ES module exports for each string utility, consistent input validation, and behaviour for edge cases (null/undefined and Unicode). The feature ensures no external runtime dependencies and that the README and unit tests document and verify the exported API.

# Acceptance Criteria

- src/lib/main.js exports the following named functions: slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein.
- All exported functions accept null or undefined and return an empty string for such inputs.
- Functions handle Unicode input sensibly (preserve or normalise characters where appropriate) and do not throw for Unicode text.
- README contains example usage for each exported function.

# Tests

- There are unit tests that import the named exports from src/lib/main.js and assert the exported names exist and are of type function.
- Tests verify null/undefined handling for each function.

# Implementation Notes

- Implement as an ES module with named exports.
- Keep functions pure and side-effect free.
- Use built-in String and RegExp APIs only; no external dependencies.
- Ensure consistent error-free behaviour when input is not a string by coercing with safe checks.

# Rationale

Establishing the public API and consistent input handling reduces ambiguity for downstream feature implementations and tests.