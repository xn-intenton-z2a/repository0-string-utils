# API_EXPORTS

Overview
Export all public API as named exports from src/lib/main.js so consumers can import only the functions they need.

Public API
- computeDiff(schemaBefore, schemaAfter)
- resolveLocalRefs(schema)
- classifyChange(changeRecord)
- formatChangesText(changeArray, options)
- formatChangesJson(changeArray)

Acceptance criteria
- All functions above are exported as named exports from src/lib/main.js.
- Module can be imported in ESM tests using named imports.
- CLI entry point in package.json start:cli continues to execute src/lib/main.js for simple demonstrations.

Notes
- Avoid adding runtime dependencies; keep public API focused and stable.