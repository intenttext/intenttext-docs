---
sidebar_position: 6
title: Agent Keywords
---

# Agent Keywords

27 keywords for AI agent workflows — task planning, pipeline definition, conditional logic, audit logging, assertions, and secrets.

## `step:`

**Category:** Agent
**Since:** v2.0
**Aliases:** `run:`

A unit of work in a workflow. The basic building block for agent task plans.

### Syntax

```
step: description | id: identifier | tool: name | input: data | output: target | depends: step_id | timeout: duration | retries: count
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
| `retries` | number | Number of retry attempts              |

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

Human approval checkpoint. Blocks execution until the required approver grants permission or the timeout expires.

### Syntax

```
gate: description | approver: name_or_role | timeout: duration | fallback: step_id
```

### Properties

| Property   | Type   | Required | Description                                                |
| ---------- | ------ | -------- | ---------------------------------------------------------- |
| `approver` | string | yes      | Person or role who must approve before execution continues |
| `timeout`  | string | no       | Maximum wait time                                          |
| `fallback` | string | no       | Step to execute if approval is not received in time        |

### Examples

```intenttext
gate: Manager approval | approver: engineering-manager | timeout: 72h | fallback: escalate
gate: Security sign-off | approver: security-team | timeout: 48h
```

:::note
`gate:` is IntentText's human-in-the-loop primitive. It pauses workflow execution and waits for explicit human approval. It is not an automated condition check. For system-evaluated branching, use `decision:` with an `if:` property.
:::

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

## `signal:`

**Category:** Agent
**Since:** v2.2
**Aliases:** ~~`emit:`~~ (deprecated), ~~`status:`~~ (deprecated)

Emit a named workflow signal or event. Used to communicate between workflows or log state changes.

:::warning Deprecation
`emit:` and `status:` still work but produce a deprecation warning. Use `signal:` instead.
:::

### Syntax

```
signal: description | event: name | data: payload
```

### Properties

| Property | Type   | Description           |
| -------- | ------ | --------------------- |
| `event`  | string | Event name            |
| `data`   | string | Event payload or data |

### Examples

```intenttext
signal: migration_complete | event: data.migration.done | data: rows=12450
signal: Pipeline finished | event: pipeline.complete | data: duration=45m
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

Completed task item — the resolved state of a `task:` block. Signals that a workflow or task has finished.

### Syntax

```
done: description | owner: name | time: timestamp
```

### Properties

| Property | Type   | Description            |
| -------- | ------ | ---------------------- |
| `owner`  | string | Who completed the item |
| `time`   | string | When it was completed  |

### Examples

```intenttext
done: Migration complete | owner: ops-team | time: 2026-03-08T10:00:00Z
done: Report generated | owner: @analyst | time: 2026-03-08T09:30:00Z
```

:::note
`done:` marks a completed task item. It is the resolved state of a `task:` block. For workflow terminal output or data return values, use `result:` instead.
:::

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

---

## `result:`

**Category:** Agent
**Since:** v2.1

Terminal workflow result — the final output block of a workflow.

### Syntax

```
result: description | format: type | data: payload
```

### Properties

| Property | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| `format` | string | Output format (JSON, PDF, etc.) |
| `data`   | string | Result data or reference        |

### Examples

```intenttext
result: Migration report | format: JSON | data: ./reports/migration.json
result: Invoice generated | format: PDF | data: ./invoices/inv-2026-001.pdf
```

---

## `handoff:`

**Category:** Agent
**Since:** v2.1

Transfer control to another agent or workflow.

### Syntax

```
handoff: description | to: agent | context: data | reason: text
```

### Properties

| Property  | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `to`      | string | Target agent or workflow       |
| `context` | string | Data to pass to the next agent |
| `reason`  | string | Why the handoff is happening   |

### Examples

```intenttext
handoff: Transfer to legal review | to: Legal Agent | context: contract_id=ACM-2026 | reason: Requires legal sign-off
handoff: Escalate to human | to: Support Team | reason: Confidence below threshold
```

---

## `wait:`

**Category:** Agent
**Since:** v2.1

Pause execution until an event occurs or a timeout expires.

### Syntax

```
wait: description | for: event | timeout: duration | fallback: step_id
```

### Properties

| Property   | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| `for`      | string | Event or condition to wait for     |
| `timeout`  | string | Maximum wait time                  |
| `fallback` | string | Step to execute if timeout expires |

### Examples

```intenttext
wait: Await manager approval | for: approval.received | timeout: 72h | fallback: escalate
wait: Cool-down period | timeout: 5m
```

---

## `parallel:`

**Category:** Agent
**Since:** v2.1

Run multiple steps concurrently.

### Syntax

```
parallel: description | steps: step_ids | join: strategy
```

### Properties

| Property | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `steps`  | string | Comma-separated step IDs to run in parallel      |
| `join`   | string | Join strategy: `all` (default), `any`, `fastest` |

### Examples

```intenttext
parallel: Run validations | steps: validate_schema, validate_data, validate_refs | join: all
parallel: Fetch from sources | steps: fetch_db, fetch_api | join: any
```

---

## `retry:`

**Category:** Agent
**Since:** v2.1

Retry a failed step with backoff.

### Syntax

```
retry: description | step: step_id | max: count | backoff: strategy | delay: duration
```

### Properties

| Property  | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| `step`    | string | Step ID to retry                                   |
| `max`     | number | Maximum retry attempts                             |
| `backoff` | string | Backoff strategy: `fixed`, `exponential`, `linear` |
| `delay`   | string | Initial delay between retries                      |

### Examples

```intenttext
retry: Retry export | step: export | max: 3 | backoff: exponential | delay: 5s
retry: Retry API call | step: fetch_data | max: 5 | backoff: fixed | delay: 10s
```

---

## `call:`

**Category:** Agent
**Since:** v2.2

Invoke a sub-workflow by file reference.

### Syntax

```
call: description | file: path | input: data | output: target
```

### Properties

| Property | Type   | Description               |
| -------- | ------ | ------------------------- |
| `file`   | string | Path to the sub-workflow  |
| `input`  | string | Input data to pass        |
| `output` | string | Where to store the result |

### Examples

```intenttext
call: Run data validation | file: ./workflows/validate.it | input: records.json | output: validation_result
call: Generate invoice | file: ./templates/invoice.it | input: order_data
```

---

## `loop:`

**Category:** Agent
**Since:** v2.0

Iterate over a collection.

### Syntax

```
loop: description | over: collection | as: variable | max: limit
```

### Properties

| Property | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| `over`   | string | Collection to iterate over      |
| `as`     | string | Variable name for each item     |
| `max`    | number | Maximum iterations (safety cap) |

### Examples

```intenttext
loop: Process each record | over: records | as: record | max: 10000
loop: Notify stakeholders | over: contacts | as: contact
```

---

## `checkpoint:`

**Category:** Agent
**Since:** v2.0

Named workflow checkpoint for resume and rollback.

### Syntax

```
checkpoint: name | data: state
```

### Properties

| Property | Type   | Description                    |
| -------- | ------ | ------------------------------ |
| `data`   | string | Serialized state at this point |

### Examples

```intenttext
checkpoint: pre-migration | data: schema_snapshot
checkpoint: post-validation | data: validation_report
```

---

## `import:`

**Category:** Agent
**Since:** v2.0

Import a workflow or data from a file.

### Syntax

```
import: description | file: path | as: name
```

### Properties

| Property | Type   | Description               |
| -------- | ------ | ------------------------- |
| `file`   | string | Path to import from       |
| `as`     | string | Local name for the import |

### Examples

```intenttext
import: Validation Utils | file: ./shared/validate.it | as: validate
import: Common policies | file: ./policies/standard.it
```

---

## `export:`

**Category:** Agent
**Since:** v2.0

Export data or workflow output.

### Syntax

```
export: description | format: type | target: path
```

### Properties

| Property | Type   | Description        |
| -------- | ------ | ------------------ |
| `format` | string | Export format      |
| `target` | string | Export destination |

### Examples

```intenttext
export: Migration results | format: JSON | target: ./reports/migration.json
export: Audit log | format: CSV | target: ./logs/audit.csv
```

---

## `progress:`

**Category:** Agent
**Since:** v2.0

Progress indicator for long-running operations.

### Syntax

```
progress: description | value: number | total: number | unit: label
```

### Properties

| Property | Type   | Description            |
| -------- | ------ | ---------------------- |
| `value`  | number | Current progress value |
| `total`  | number | Total expected value   |
| `unit`   | string | Unit label             |

### Examples

```intenttext
progress: Migrating records | value: 4500 | total: 12450 | unit: records
progress: Upload complete | value: 100 | total: 100 | unit: %
```

---

## `task:`

**Category:** Agent
**Since:** v1.0
**Aliases:** `check:`, `todo:`, `action:`, `item:`

Actionable task item with owner and due date. The basic human-facing work unit.

### Syntax

```
task: description | owner: name | due: date | priority: level | status: state
```

### Properties

| Property   | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| `owner`    | string | Who is responsible                          |
| `due`      | string | Due date                                    |
| `priority` | string | `low`, `medium`, `high`, `critical`         |
| `status`   | string | `pending`, `in-progress`, `blocked`, `done` |

### Examples

```intenttext
task: Review contract terms | owner: Sarah Chen | due: 2026-03-15 | priority: high
task: Update API documentation | owner: Engineering | status: in-progress
task: Send invoice to client | owner: Finance | due: 2026-04-01
```

---

## `ask:`

**Category:** Agent
**Since:** v1.0
**Aliases:** `question:`

Question or open item requiring a response.

### Syntax

```
ask: question text | to: recipient | due: date | priority: level
```

### Properties

| Property   | Type   | Description       |
| ---------- | ------ | ----------------- |
| `to`       | string | Who should answer |
| `due`      | string | Response due date |
| `priority` | string | Priority level    |

### Examples

```intenttext
ask: What is the expected delivery date for Phase 2? | to: Engineering | due: 2026-03-10
ask: Should we include the optional modules? | to: Product | priority: high
```

---

## `assert:`

**Category:** Agent
**Since:** v2.13
**Aliases:** `expect:`, `verify:`

Testable assertion — a condition that must be true. Evaluable by agents and CI pipelines.

### Syntax

```
assert: description | expect: expression | severity: level
```

### Properties

| Property   | Type   | Description                                              |
| ---------- | ------ | -------------------------------------------------------- |
| `expect`   | string | Boolean expression to evaluate                           |
| `severity` | string | `error` (default) or `warning` — what happens on failure |

### Examples

```intenttext
assert: All records migrated | expect: migrated_count == total_count
assert: Response time within SLA | expect: response_ms < 200 | severity: warning
assert: No data loss | expect: source_count == target_count | severity: error
```

### Notes

- Validation error `ASSERT_MISSING_CONDITION` if both content and `expect:` are empty
- Agents evaluate `expect:` expressions at runtime
- CI pipelines can use `intenttext query . --type assert` to extract all assertions

---

## `secret:`

**Category:** Agent
**Since:** v2.13
**Aliases:** `credential:`, `token:`

Secret or credential reference — **never rendered; always redacted in output**. The renderer replaces all content with `••••••••` regardless of context.

### Syntax

```
secret: name | env: variable | scope: level
```

### Properties

| Property | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| `env`    | string | Environment variable name          |
| `scope`  | string | Secret scope: `workflow`, `global` |

### Examples

```intenttext
secret: Database password | env: DB_PASSWORD | scope: workflow
secret: API key | env: OPENAI_API_KEY | scope: global
secret: Deployment token | env: DEPLOY_TOKEN
```

### Notes

- Validation error `SECRET_MISSING_NAME` if content is empty
- **ALWAYS redacted** — rendered output shows `••••••••`, never the actual value
- The parser stores the secret name and properties, but the renderer always masks content
- Agents should read secrets from environment variables, not from the document
