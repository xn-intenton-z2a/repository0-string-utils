# Flow Benchmark Report 001

**Date**: 2026-03-23
**Operator**: agentic-lib-flow (automated)
**agentic-lib version**: 0.1.0
**Run**: [23415433963](https://github.com/xn-intenton-z2a/repository0-string-utils/actions/runs/23415433963)

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
log-sequence = 12
cumulative-transforms = 6
cumulative-maintain-features = 2
cumulative-maintain-library = 2
cumulative-nop-cycles = 0
total-tokens = 3885039
total-duration-ms = 2479632

[budget]
transformation-budget-used = 6
transformation-budget-cap = 128

[status]
mission-complete = false
mission-failed = false
mission-failed-reason = ""
last-transform-at = "2026-03-23T00:27:39.925Z"
last-non-nop-at = "2026-03-23T00:29:14.958Z"

[schedule]
current = ""
auto-disabled = false
auto-disabled-reason = ""
```

## Results

| Metric | Value |
|--------|-------|
| Mission complete | NO |
| Mission failed | NO |
| Source lines | 242 |
| Test files | 3 |
| Agent log files | 13 |

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

- agent-log-2026-03-22T23-47-27-102Z-001.md
- agent-log-2026-03-22T23-51-02-354Z-002.md
- agent-log-2026-03-22T23-53-46-585Z-003.md
- agent-log-2026-03-22T23-55-29-949Z-004.md
- agent-log-2026-03-23T00-01-44-436Z-005.md
- agent-log-2026-03-23T00-04-32-814Z-006.md
- agent-log-2026-03-23T00-09-17-729Z-007.md
- agent-log-2026-03-23T00-12-53-486Z-007.md
- agent-log-2026-03-23T00-15-53-080Z-008.md
- agent-log-2026-03-23T00-17-47-824Z-009.md
- agent-log-2026-03-23T00-19-48-564Z-010.md
- agent-log-2026-03-23T00-27-40-660Z-011.md
- agent-log-2026-03-23T00-29-15-226Z-012.md
