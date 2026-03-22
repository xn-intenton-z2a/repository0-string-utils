# Benchmark Report

**Date**: 2026-03-22
**Repository**: xn-intenton-z2a/repository0-string-utils
**Period**: 2026-03-22T02:03:48Z → 2026-03-22T02:25:31.927Z
**Model**: gpt-5-mini

---

## Summary

Mission: implement a JSON Schema Draft-07 diff library and tests. The mission reached "mission-complete" state (agentic-lib-state.toml) and unit tests and core features are implemented and exercised by unit tests; a transform PR (#69) was merged during the period. Headline: implementation and tests pass, but two operational anomalies (an open issue that appears merged and a zero-diff PR) merit attention.

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission complete | YES |
| Mission failed | NO |
| Transforms | 10 |
| Budget | 10/128 |
| Total tokens | 5610163 |
| Workflow runs | 11 |
| Commits | 7 |
| PRs merged | 1 |
| Issues (open/closed) | 1/0 |

---

## Timeline

2026-03-22T02:03:48Z — agentic-lib-init run (actions run id 23393541579) updated the repo; commit 22d97a36 ("update agentic-lib@7.4.56 [skip ci]") appears at 02:04:25Z. Between 02:04–02:12 the workflow updated acceptance checkboxes (commit fa5ec412 at 02:12:28Z). At 02:16:23Z commit 0b593290 "maintain(features+library): tests completed [healthy]" documents a successful test pass; corresponding workflow runs around 02:16:25Z show successful pages builds. At 02:19:01Z commit b0a9c7b5 marks the repository as mission-complete ("mission-complete: Source code, unit tests, classification, $ref resolution, traversal..."). A transform cycle produced PR #69 ("fix: resolve issues #64, #65, #66, #68") which was merged at 2026-03-22T02:23:14Z (pull-requests.json, commits.json entry d7d43b5a). The session finished with a benchmark-flow commit 160084c3 at 02:25:08Z and agentic-lib-state.toml shows cumulative-transforms=10 and mission-complete=true (last-transform-at 2026-03-22T02:22:54.607Z). Several ancillary workflows (agentic-lib-workflow, agentic-lib-test) show cancelled runs in the period, while key runs (agentic-lib-bot and pages builds) reported success.

---

## Acceptance Criteria

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Diffing two schemas returns an array of change objects | PASS | diffSchemas implemented in src/lib/main.js and returns an array (results) — verified by tests/unit/diff.test.js (test 'diffing two schemas returns an array of change objects'). |
| Detects added and removed properties | PASS | diffSchemas' property logic (src/lib/main.js) records property-added/property-removed; asserted in tests/unit/diff.test.js ('detects added and removed properties' test). |
| Detects type changes (e.g. "string" → "number") | PASS | type-changed is produced by diffSchemas (src/lib/main.js) and verified in tests/unit/diff.test.js ('detects type changes' test) and tests/unit/render-demo.test.js (demo scenarios). |
| Detects required array changes | PASS | required-added/required-removed logic in src/lib/main.js and unit tests in tests/unit/diff.test.js ('detects required array changes') assert both added and removed cases. |
| Handles nested schemas recursively (properties within properties) | PASS | diffObject recurses into properties/combinators and produces nested-changed; tests/unit/diff.test.js ('handles nested schemas recursively') and tests/unit/cover-combinators.test.js verify recursive nested changes. |
| Resolves local `$ref` before diffing | PASS | resolveLocalRefs in src/lib/main.js resolves '#' pointers, throws on non-# refs; tests/unit/diff.test.js and tests/unit/items.test.js include $ref-based tests asserting diffing after resolution and a thrown error for remote $ref. |
| Classifying a removed required property returns "breaking" | PASS | classifyChange implemented in src/lib/main.js maps required-removed to 'breaking'; tests/unit/diff.test.js includes 'classifying a removed required property returns breaking'.  |
| Formatting changes produces readable text output | PASS | formatChanges (src/lib/main.js) supports 'text' and 'json' formats; tests/unit/diff.test.js and tests/unit/render-demo.test.js assert text contains human-friendly phrases ('type changed'). |
| All unit tests pass | PASS | Commit 0b593290 'maintain(features+library): tests completed [healthy]' (2026-03-22T02:16:23Z) and successful workflow runs (agentic-lib-bot success at 2026-03-22T02:19:33Z) plus agentic-lib-state.toml mission-complete=true indicate tests ran and passed; test files in tests/unit/ cover all change types (diff.test.js, items.test.js, cover-combinators.test.js, render-demo.test.js). |
| README documents usage with examples | PASS | README.md includes a JSON Schema diff example and usage snippet demonstrating diffSchemas, formatChanges and classifyChange (README 'JSON Schema diff example' section). |

---

## Findings

### FINDING-1: Feature implementation and test coverage (POSITIVE) (POSITIVE)

Core library functions are implemented and exported as named exports (resolveLocalRefs, diffSchemas, classifyChange, formatChanges). Unit tests exercise properties, type changes, required arrays, enum diffs, description changes, items (single and tuple), combinators (allOf/oneOf/anyOf), nested recursion and $ref resolution — see src/lib/main.js and tests/unit/*.test.js (diff.test.js, items.test.js, cover-combinators.test.js, render-demo.test.js). Evidence: src/lib/main.js exports and test assertions in tests/unit/*.test.js.

### FINDING-2: Mission marked complete and transforms recorded (OBSERVATION)

agentic-lib-state.toml shows mission-complete=true and cumulative-transforms=10 with last-transform-at 2026-03-22T02:22:54.607Z; commit b0a9c7b5 documents mission completion and commit 160084c3 contains the benchmark report commit. Evidence: /tmp/report-data/agentic-lib-state.toml and commits.json entries b0a9c7b5 and 160084c3.

### FINDING-3: Open issue remains labelled 'merged' but not closed (CONCERN) (CONCERN)

Issue #64 (tests for combinator traversal) remains state=open in issues.json and get_issue output even though PR #69 merged referencing issue #64; labels include 'merged' but 'closed_at' is null. This indicates the transform/merge did not auto-close the issue — likely PR body or commit messages did not use closing keywords (e.g., 'Fixes #64') or issue-closing automation was not invoked. Evidence: /tmp/report-data/issues.json and get_issue(64) show state=open and labels include 'merged'; pull-requests.json shows PR #69 merged at 2026-03-22T02:23:14Z and commits.json includes commit d7d43b5a 'agentic-step: transform issue #64,65,66,68 (#69)' which does not include standard 'Fixes' syntax.

### FINDING-4: Merged PR shows zero additions/deletions (OBSERVATION / CONCERN) (CONCERN)

pull-requests.json shows PR #69 merged_at 2026-03-22T02:23:14Z with additions=0 and deletions=0. Combined with the open issue above, this suggests the PR may have been metadata-only or the actual code changes were merged earlier under a different commit. Evidence: /tmp/report-data/pull-requests.json (PR #69 additions/deletions) and commits.json (d7d43b5a and earlier mission-complete commit b0a9c7b5).

### FINDING-5: CI run cancellations during the period (OBSERVATION) (OBSERVATION)

Several workflow runs were cancelled (agentic-lib-test and agentic-lib-workflow entries), though core validation runs reported success (agentic-lib-bot and pages build runs). Cancelled runs could hide intermittent CI flakiness or orchestration timing issues. Evidence: /tmp/report-data/workflow-runs.json entries with conclusion 'cancelled' (e.g., run id 23393858571 'agentic-lib-test' cancelled at 2026-03-22T02:23:45Z).

### FINDING-6: $ref resolution and circular detection (POSITIVE) (POSITIVE)

resolveLocalRefs resolves local '#' pointers and explicitly throws on remote $ref; it also detects circular $ref via a resolving Set. Tests assert both resolution and remote $ref error. Evidence: src/lib/main.js resolveLocalRefs implementation and tests/unit/diff.test.js 'resolves local $ref before diffing and throws on remote $ref'.

---

## Recommendations

1. Close outstanding issues that are labelled 'merged' but remain open (e.g., issue #64) — either merge PRs with explicit 'Fixes #NN' in the PR body or add a final automation step to close issues when label 'merged' is applied.
2. Investigate PR #69 zero-diff anomaly: verify that code changes are present in the repository history (commit b0a9c7b5 appears to contain 'mission-complete' changes) and ensure transforms are merged via PRs that contain real diffs to improve auditability.
3. Re-run or un-flake cancelled CI jobs (agentic-lib-test, agentic-lib-workflow) to confirm no intermittent failures — consider increasing visibility of test logs in the benchmark report to ensure cancelled runs don't mask regressions.
4. Add a small post-merge validation step that ensures issues referenced by a PR are actually closed when the PR merges (update agentic-step to include closing keywords or to call the GitHub API to close issues when transforms complete).
5. Record PR-level change metrics (additions/deletions, test-run id) in the benchmark report to make later audits simpler; the current zero-diff PR makes provenance harder to trace.

