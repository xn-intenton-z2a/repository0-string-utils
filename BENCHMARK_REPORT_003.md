# Benchmark Report

**Date**: 2026-03-23
**Repository**: xn-intenton-z2a/repository0-string-utils
**Period**: 2026-03-23T00:01:49Z → 2026-03-23T00:32:04.585Z
**Model**: gpt-5-mini

---

## Summary

Mission: implement a JSON Schema diff engine (diffSchemas, ref resolution, classification, formatting, tests). Headline: agentic automation implemented a separate deliverable — comprehensive string utilities with tests (issue #72 → PR #73 merged, CI green), but the core JSON Schema diff engine required by the mission remains unimplemented (issue #74 open; PR #75 is empty), so the mission is not complete.

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission complete | NO |
| Mission failed | NO |
| Transforms | 6 |
| Budget | 6/128 |
| Total tokens | 3885039 |
| Workflow runs | 8 |
| Commits | 5 |
| PRs merged | 1 |
| Issues (open/closed) | 1/1 |

---

## Timeline

2026-03-23T00:01:49Z — agentic-lib-init run (actions run id 23415692007) kicked off project transforms; at ~00:02:03Z an automated transform commit (sha 6fc902ad, message: "agentic-step: transform issue #72 (#73)") created branch agentic-lib-issue-72 and produced PR #73 which was merged at 2026-03-23T00:02:03Z (pull-requests.json). The merged transform delivered named exports and tests for string utilities in src/lib/main.js and tests/unit/string-utils.test.js. Subsequent CI/test runs show agentic-lib-test [main] (run id 23416245366) completed successfully at 2026-03-23T00:28:04Z. 

At 2026-03-23T00:19:43Z an implementation request for the true mission (issue #74: "feat(schema-diff): implement JSON Schema diff engine...") was created; an associated PR #75 (branch agentic-lib-issue-74) exists but shows 0 additions and 0 deletions in pull-requests.json, indicating an empty or placeholder PR. An agentic-lib-workflow run (id 23416072345) was in-progress starting 2026-03-23T00:19:44Z but had not produced a merged transform by snapshot time. The session produced a benchmark commit (905a5c44) at 2026-03-23T00:31:40Z summarising the 8 runs.

---

## Acceptance Criteria

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Diffing two schemas returns an array of change objects | FAIL | No diffSchemas or equivalent export is present in src/lib/main.js; file implements string utilities (slugify, truncate, camelCase, etc). Issue #74 requests diffSchemas and related functions (issue body). No unit tests reference diffSchemas in tests/unit/*.test.js. |
| Detects added and removed properties | FAIL | No implementation for schema change detection (property-added/property-removed) in src/lib/main.js; tests/unit contains no tests exercising JSON Schema diffs (see tests/unit/*.test.js). |
| Detects type changes (e.g. "string" -> "number") | FAIL | No code or tests for type-changed detection; src/lib/main.js contains no functions that traverse JSON Schema or produce changeType records. |
| Detects `required` array changes | FAIL | No implementation or tests for detecting required-added/required-removed; issue #74 explicitly asks for this behavior but transform not present. |
| Handles nested schemas recursively (properties within properties) | FAIL | No recursive schema traversal API found in src/lib/main.js; tests do not exercise nested schema diffs. |
| Resolves local `$ref` before diffing | FAIL | No resolveLocalRefs or equivalent function in src/lib/main.js; issue #74 asks for local $ref resolution and to throw on remote $ref. No tests present for `$ref` resolution. |
| Classifying a removed required property returns "breaking" | FAIL | No classification function (classifyChange) implemented and no tests asserting breaking/compatible/informational classifications. |
| Formatting changes produces readable text output | FAIL | No formatChanges or human-readable formatting API present; README examples cover string utilities only, not formatted schema diffs. |
| All unit tests pass | FAIL | CI shows agentic-lib-test [main] run id 23416245366 concluded SUCCESS (2026-03-23T00:28:04Z) and tests for the implemented string utilities exist at tests/unit/string-utils.test.js, but the mission requires tests for the schema-diff engine which are absent; therefore mission-specific unit tests do not exist or pass. |
| README documents usage with examples | FAIL | README.md contains usage examples for the string utilities implemented in src/lib/main.js (slugify, truncate, etc) but contains no before/after JSON Schema example or usage for diffSchemas or formatChanges as required by MISSION.md. |

---

## Findings

### FINDING-1: Automated transform successfully implemented string utilities with tests and CI green (POSITIVE)

Evidence: commit 6fc902ad ("agentic-step: transform issue #72 (#73)") appears in commits.json and PR #73 was merged at 2026-03-23T00:02:03Z (pull-requests.json). The implementation is visible in src/lib/main.js (named exports: slugify, truncate, camelCase, kebabCase, titleCase, wordWrap, stripHtml, escapeRegex, pluralize, levenshtein) and tests exist in tests/unit/string-utils.test.js exercising these functions. The agentic-lib-test run id 23416245366 completed with conclusion=success, showing CI passed for these tests.

### FINDING-2: Mission mismatch: JSON Schema diff engine not implemented (implementation-gap) (CRITICAL)

Evidence: The MISSION.md requires named exports diffSchemas, resolveLocalRefs, classifyChange, and formatChanges; none are present in src/lib/main.js. Issue #74 (created 2026-03-23T00:19:43Z) explicitly requests schema-diff implementation, and PR #75 (branch agentic-lib-issue-74) is open but has 0 additions/0 deletions (pull-requests.json), indicating no applied transform. State file agentic-lib-state.toml shows mission-complete = false and acceptance-criteria entries remain unmet.

### FINDING-3: Empty/placeholder PR created for the mission work (PR #75) (CONCERN)

Evidence: pull-requests.json entry for PR #75 (title: "fix: resolve issue #74") shows state="open" and additions=0, deletions=0 — an empty PR. Issue #74 remains open with no comments. An agentic-lib-workflow run (id 23416072345) was in-progress after issue creation but had not merged a transform by snapshot time.

### FINDING-4: Metric tracking vs visible changes: transforms count increased but mission-specific code absent (OBSERVATION)

Evidence: agentic-lib-state.toml reports cumulative-transforms = 6 and transformation-budget-used = 6, but the visible commit log in commits.json shows a single explicit agentic-step transform commit (6fc902ad) during the report period; this may reflect transforms outside the snapshot window or maintenance cycles counted as transforms, reducing signal-to-noise for mission progress metrics.

### FINDING-5: Automation produces fast merges but reduced human review and discussion (CONCERN)

Evidence: the transform commit author is github-actions[bot] and PR #73 was merged automatically at the same timestamp as the transform commit; issues show zero comments (get_issue for #72 and #74 returned empty comments arrays). This reduces opportunity for design discussion and may produce shallow/partial implementations (e.g., empty PR #75).

---

## Recommendations

1. Prioritise delivering the JSON Schema diff engine for issue #74: implement and export named functions diffSchemas(schemaA, schemaB), resolveLocalRefs(schema), classifyChange(change), and formatChanges(changes, options) in src/lib/main.js, and add targeted unit tests under tests/unit/ that exercise each changeType and local $ref resolution before merging.
2. Re-run the transform for issue #74 (or reopen a non-empty PR) and ensure the agent commits include both implementation and tests; block merging unless tests for schema-diff are present and pass in CI.
3. Prevent empty PRs: add a pre-PR check to detect additions==0 && deletions==0 and mark PRs as 'empty-transform' or auto-close them and requeue a transform attempt with diagnostics.
4. Improve mission verification: add a post-transform validator that asserts presence of required named exports and a minimal unit test for each acceptance criterion (e.g., check that diffSchemas exists and that a unit test references it) before marking acceptance criteria as met in agentic-lib-state.toml.
5. Surface transform provenance in PR descriptions: include commit shas, run ids and brief diff of changed files in the PR body so reviewers can quickly map runs→commits→PRs; this helps reconcile cumulative-transforms counts with visible repository changes.

