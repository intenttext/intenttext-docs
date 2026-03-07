---
sidebar_position: 6
title: Agent Keywords
---

# Agent Keywords

12 keywords for AI agent workflows — task planning, pipeline definition, conditional logic, and audit logging.

## `step:`

**Category:** Agent
**Since:** v2.0
**Aliases:** `run:`

A unit of work in a workflow. The basic building block for agent task plans.

### Syntax

```
step: description | id: identifier | tool: name | input: data | output: target | depends: step_id | timeout: duration | retry: count
```

### Properties

| Property  | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| `id`      | string | Unique step identifier for references |
| `tool`    | string | External tool to invoke               |
| `input`   | string | Input data or reference               |
| `output`  | string | Where to store the result             |
| `depends` | string | Step ID(s) this step depends on       |
| `timeout` | string | Maximum execution time                |
| `retry`   | number | Number of retry attempts              |

### Examples

```intenttext
step: Export customer data | id: export | tool: pg_dump | output: customers.sql | timeout: 30m
step: Validate export | id: validate | depends: export | tool: checksum_verify
step: Transform records | id: transform | depends: validate | tool: jq | input: {{export.output}}
```

### Notes

- `depends:` determines execution order
- Validation error `DUPLICATE_STEP_ID` if two steps share the same `id`
- Validation error `STEP_REF_MISSING` if `depends:` references a nonexistent step

---

## `gate:`

**Category:** Agent
**Since:** v2.3

Conditional checkpoint. Blocks execution until the condition is met or the timeout expires.

### Syntax

```
gate: description | condition: expression | timeout: duration | fallback: step_id
```

### Properties

| Property    | Type   | Description                        |
| ----------- | ------ | ---------------------------------- |
| `condition` | string | Boolean expression to evaluate     |
| `timeout`   | string | Maximum wait time                  |
| `fallback`  | string | Step to execute if timeout expires |

### Examples

```intenttext
gate: Maintenance window open | condition: time >= 02:00 AND time <= 06:00 | timeout: 24h
gate: Manager approval received | condition: approval_status == "approved" | timeout: 72h | fallback: escalate
```

---

## `trigger:`

**Category:** Agent
**Since:** v2.0
**Aliases:** `on:`

Event-based activation. Declares what event starts a workflow or step.

### Syntax

```
trigger: description | event: name | source: origin | filter: condition
```

### Properties

| Property | Type   | Description                |
| -------- | ------ | -------------------------- |
| `event`  | string | Event name or pattern      |
| `source` | string | Event source system        |
| `filter` | string | Condition to filter events |

### Examples

```intenttext
trigger: New invoice received | event: invoice.created | source: billing-system
trigger: Deployment complete | event: deploy.success | filter: env == "production"
```

---

## `emit:`

**Category:** Agent
**Since:** v2.3
**Aliases:** `status:`

Emit an event or status signal. Used to communicate between workflows or log state changes.

### Syntax

```
emit: description | event: name | data: payload
```

### Properties

| Property | Type   | Description           |
| -------- | ------ | --------------------- |
| `event`  | string | Event name            |
| `data`   | string | Event payload or data |

### Examples

```intenttext
emit: migration_complete | event: data.migration.done | data: rows=12450
emit: Pipeline finished | event: pipeline.complete | data: duration=45m
```

---

## `decision:`

**Category:** Agent
**Since:** v2.0
**Aliases:** `if:`

Conditional branching. Routes execution based on a condition.

### Syntax

```
decision: description | if: condition | then: step_id | else: step_id
```

### Properties

| Property | Type   | Required | Description              |
| -------- | ------ | -------- | ------------------------ |
| `if`     | string | yes      | Condition to evaluate    |
| `then`   | string | yes      | Step to execute if true  |
| `else`   | string | no       | Step to execute if false |

### Examples

```intenttext
decision: Migration successful? | if: migrate.exit_code == 0 | then: verify | else: rollback
decision: Budget within limit? | if: amount <= 10000 | then: auto_approve | else: manager_review
```

### Notes

- Validation error `STEP_REF_MISSING` if `then:` or `else:` references a nonexistent step

---

## `context:`

**Category:** Agent
**Since:** v2.0

Agent execution context. Sets the agent identity, goal, and constraints. Also listed under [Document Identity](./document-identity#context).

### Syntax

```
context: agent name | goal: objective | constraints: rules
```

### Examples

```intenttext
context: Data Migration Agent | goal: Migrate 50k records to cloud | constraints: Zero downtime, complete by 06:00
```

---

## `memory:`

**Category:** Agent
**Since:** v2.0

Agent memory or state. Declares persistent data an agent should retain.

### Syntax

```
memory: description | scope: level | ttl: duration
```

### Properties

| Property | Type   | Description                                   |
| -------- | ------ | --------------------------------------------- |
| `scope`  | string | Memory scope: `session`, `persistent`, `task` |
| `ttl`    | string | Time to live                                  |

### Examples

```intenttext
memory: Previous migration results | scope: persistent
memory: Current batch progress | scope: session | ttl: 4h
```

---

## `prompt:`

**Category:** Agent
**Since:** v2.0

LLM prompt template. Declares a prompt to send to a language model.

### Syntax

```
prompt: content | model: name | temperature: value
```

### Properties

| Property      | Type   | Description          |
| ------------- | ------ | -------------------- |
| `model`       | string | LLM model identifier |
| `temperature` | number | Sampling temperature |

### Examples

```intenttext
prompt: Summarize the following migration log and identify any anomalies | model: claude-3 | temperature: 0.2
prompt: Generate a client-facing report from these metrics | model: gpt-4 | temperature: 0.7
```

---

## `tool:`

**Category:** Agent
**Since:** v2.0

External tool declaration. Documents an API or tool the agent can invoke.

### Syntax

```
tool: name | api: endpoint | method: http_method | auth: type
```

### Properties

| Property | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| `api`    | string | API endpoint or tool identifier  |
| `method` | string | HTTP method or invocation method |
| `auth`   | string | Authentication type              |

### Examples

```intenttext
tool: Slack notification | api: https://hooks.slack.com/services/T00/B00/xxx | method: POST | auth: webhook
tool: Database backup | api: pg_backup | method: cli
```

---

## `audit:`

**Category:** Agent
**Since:** v2.0
**Aliases:** `log:`

Audit log entry. Records what an agent or person did, when, and the action taken.

### Syntax

```
audit: description | by: actor | at: timestamp | action: type
```

### Properties

| Property | Type   | Description                 |
| -------- | ------ | --------------------------- |
| `by`     | string | Who performed the action    |
| `at`     | string | When it happened (ISO 8601) |
| `action` | string | Action type or category     |

### Examples

```intenttext
audit: Exported 12,450 records | by: DataBot | at: 2026-03-06T02:15:00Z | action: export
audit: Approved quarterly report | by: Sarah Chen | at: 2026-03-06T10:00:00Z | action: approve
```

---

## `done:`

**Category:** Agent
**Since:** v2.0
**Aliases:** `completed:`, `finished:`

Completion marker. Signals that a workflow or task has finished.

### Syntax

```
done: description | status: result | output: data
```

### Properties

| Property | Type   | Description                    |
| -------- | ------ | ------------------------------ |
| `status` | string | `success`, `partial`, `failed` |
| `output` | string | Final output or summary        |

### Examples

```intenttext
done: Migration complete | status: success | output: 12,450 records migrated
done: Report generated | status: success | output: ./reports/q1-2026.pdf
```

---

## `error:`

**Category:** Agent
**Since:** v2.0

Error record. Documents a failure with severity and retry information.

### Syntax

```
error: description | code: identifier | severity: level | retry: boolean
```

### Properties

| Property   | Type    | Description                             |
| ---------- | ------- | --------------------------------------- |
| `code`     | string  | Error code                              |
| `severity` | string  | `info`, `warning`, `critical`, `fatal`  |
| `retry`    | boolean | Whether the operation should be retried |

### Examples

```intenttext
error: Migration failed — timeout exceeded | code: MIGRATION_TIMEOUT | severity: critical | retry: true
error: Invalid input format | code: INVALID_INPUT | severity: warning | retry: false
```
