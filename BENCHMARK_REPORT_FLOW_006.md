# Flow Benchmark Report 006

**Date**: 2026-03-22
**Operator**: agentic-lib-flow (automated)
**agentic-lib version**: 0.1.0
**Run**: [23392781349](https://github.com/xn-intenton-z2a/repository0-string-utils/actions/runs/23392781349)

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission seed | 4-kyu-analyze-json-schema-diff |
| Model | gpt-5-mini |
| Profile | max |
| Workflow runs | 8 |
| Init mode | purge |

## State File

```toml
# agentic-lib-state.toml — Persistent state across workflow runs
# Written to the agentic-lib-logs branch by each agentic-step invocation

[counters]
log-sequence = 20
cumulative-transforms = 10
cumulative-maintain-features = 3
cumulative-maintain-library = 3
cumulative-nop-cycles = 0
total-tokens = 5610163
total-duration-ms = 3067859

[budget]
transformation-budget-used = 10
transformation-budget-cap = 128

[status]
mission-complete = true
mission-failed = false
mission-failed-reason = ""
last-transform-at = "2026-03-22T02:22:54.607Z"
last-non-nop-at = "2026-03-22T02:22:54.607Z"

[schedule]
current = ""
auto-disabled = true
auto-disabled-reason = "mission-complete"
```

## Results

| Metric | Value |
|--------|-------|
| Mission complete | YES |
| Mission failed | NO |
| Source lines | 370 |
| Test files | 6 |
| Agent log files | 23 |

## Mission

```
# Mission

A JavaScript library that computes structured diffs between two JSON Schema (Draft-07) documents, helping API developers track and validate schema changes across versions.

## Required Capabilities

- Compare two JSON Schema objects and return an array of change records.
- Render changes as human-readable text or JSON.
- Classify each change as `"breaking"`, `"compatible"`, or `"informational"`.

## Change Record Format

Each change is a plain object with these fields:

```js
{ path: "/properties/email", changeType: "type-changed", before: "string", after: "number" }
```

Supported `changeType` values:
```

## Agent Log Files

- agent-log-2026-03-22T01-17-24-370Z-001.md
- agent-log-2026-03-22T01-17-51-527Z-001.md
- agent-log-2026-03-22T01-19-18-193Z-002.md
- agent-log-2026-03-22T01-21-07-479Z-003.md
- agent-log-2026-03-22T01-23-25-951Z-004.md
- agent-log-2026-03-22T01-30-45-702Z-005.md
- agent-log-2026-03-22T01-33-05-384Z-006.md
- agent-log-2026-03-22T01-37-40-579Z-007.md
- agent-log-2026-03-22T01-38-25-576Z-007.md
- agent-log-2026-03-22T01-39-16-751Z-008.md
- agent-log-2026-03-22T01-41-15-168Z-009.md
- agent-log-2026-03-22T01-42-54-240Z-010.md
- agent-log-2026-03-22T01-53-59-246Z-011.md
- agent-log-2026-03-22T01-56-37-446Z-012.md
- agent-log-2026-03-22T02-00-58-112Z-013.md
- agent-log-2026-03-22T02-02-42-848Z-014.md
- agent-log-2026-03-22T02-04-51-033Z-015.md
- agent-log-2026-03-22T02-07-25-474Z-016.md
- agent-log-2026-03-22T02-12-28-659Z-017.md
- agent-log-2026-03-22T02-13-41-035Z-017.md
- agent-log-2026-03-22T02-16-17-133Z-018.md
- agent-log-2026-03-22T02-19-03-642Z-019.md
- agent-log-2026-03-22T02-22-55-204Z-020.md
