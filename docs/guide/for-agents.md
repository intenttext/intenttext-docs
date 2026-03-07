---
sidebar_position: 7
title: For Agents
---

# IntentText for AI Agents

AI agents produce Markdown. But Markdown has no structure for workflows, no typed blocks, no audit trail, no trust chain.

IntentText gives agents 12 workflow keywords that produce documents machines can execute and humans can read.

## The 12 agent keywords

| Keyword     | Purpose                                                |
| ----------- | ------------------------------------------------------ |
| `step:`     | A unit of work — the building block                    |
| `gate:`     | Conditional checkpoint — blocks until condition is met |
| `trigger:`  | Event-based activation                                 |
| `emit:`     | Emit an event or status signal                         |
| `decision:` | Conditional branching — if/then/else                   |
| `context:`  | Agent execution context — goal, constraints            |
| `memory:`   | Agent state or memory                                  |
| `prompt:`   | LLM prompt template                                    |
| `tool:`     | External tool declaration                              |
| `audit:`    | Audit log entry                                        |
| `done:`     | Completion marker                                      |
| `error:`    | Error record                                           |

## A complete agent task plan

```intenttext
title: Data Migration Pipeline
context: Data Engineering Agent | goal: Migrate customer data from legacy DB | constraints: Zero downtime, max 4 hours

section: Preparation
step: Export legacy data | id: export | tool: pg_dump | output: legacy_dump.sql | timeout: 30m
step: Validate export | id: validate | depends: export | tool: checksum_verify

section: Migration
gate: Maintenance window open | condition: time >= 02:00 AND time <= 06:00 | timeout: 24h
step: Create backup | id: backup | tool: pg_backup | output: backup_2026.sql
step: Run migration scripts | id: migrate | depends: backup | tool: flyway | input: legacy_dump.sql
decision: Migration successful? | if: migrate.exit_code == 0 | then: verify | else: rollback

section: Verification
step: Verify row counts | id: verify | depends: migrate | tool: row_counter
step: Run integration tests | id: test | depends: verify | tool: pytest
emit: migration_complete | event: data.migration.done | data: rows={{verify.count}}
done: Migration complete | status: success

section: Rollback
step: Restore backup | id: rollback | tool: pg_restore | input: backup_2026.sql
error: Migration failed | code: MIGRATION_ROLLBACK | severity: critical
emit: migration_failed | event: data.migration.failed
```

## Pipeline with steps and dependencies

Steps can declare dependencies with `depends:`. The agent (or orchestrator) uses this to determine execution order:

```intenttext
step: Fetch data | id: fetch | tool: http_get | input: https://api.internal/data
step: Transform data | id: transform | depends: fetch | tool: jq | input: {{fetch.output}}
step: Load to warehouse | id: load | depends: transform | tool: bq_load | input: {{transform.output}}
step: Send notification | id: notify | depends: load | tool: slack_post
```

## Gates and decisions

`gate:` blocks execution until a condition is true:

```intenttext
gate: Approval received | condition: approval_status == "approved" | timeout: 72h | fallback: escalate
```

`decision:` branches based on a condition:

```intenttext
decision: Budget approved? | if: budget.amount <= 10000 | then: auto_approve | else: manager_review
```

## MCP server integration

The IntentText MCP server gives agents direct access to `.it` files:

```bash
npm install intenttext-mcp
```

Available MCP tools:

| Tool                | Purpose                           |
| ------------------- | --------------------------------- |
| `intenttext_parse`  | Parse a `.it` file to JSON        |
| `intenttext_render` | Render to HTML                    |
| `intenttext_query`  | Query blocks with filters         |
| `intenttext_merge`  | Merge template with data          |
| `intenttext_seal`   | Seal a document                   |
| `intenttext_verify` | Verify integrity                  |
| `intenttext_amend`  | Amend a frozen document           |
| `intenttext_diff`   | Diff two document versions        |
| `intenttext_source` | Convert JSON back to `.it` source |

Connect to Claude:

```json
{
  "mcpServers": {
    "intenttext": {
      "command": "node",
      "args": ["./node_modules/intenttext-mcp/dist/index.js"]
    }
  }
}
```

## Audit logging

Agents write `audit:` blocks to record what they did:

```intenttext
audit: Fetched 12,450 records | by: DataBot | at: 2026-03-06T02:15:00Z | action: export
audit: Migration complete — 0 errors | by: DataBot | at: 2026-03-06T03:45:00Z | action: migrate
```

Query the audit trail:

```bash
intenttext query ./logs --type audit --by DataBot --format table
```

## Cross-document references

Use `ref:` to link related documents in agent workflows:

```intenttext
ref: Migration plan | file: ./plans/migration-v2.it | rel: implements
ref: Rollback procedure | file: ./runbooks/rollback.it | rel: fallback
ref: Previous migration | file: ./logs/migration-2025.it | rel: supersedes
```

Agents use `ref:` to navigate a document graph — finding the plan that a log implements, or the runbook to follow when things go wrong.

## Policy enforcement

`policy:` blocks declare rules agents must follow:

```intenttext
policy: No production writes during business hours | scope: production | enforce: strict
policy: All migrations require rollback plan | scope: migration | enforce: strict
```

---

**Related:**

- [Task Planning →](../cookbook/agents/task-planning)
- [Pipeline Definition →](../cookbook/agents/pipeline-definition)
- [Agent Handoff →](../cookbook/agents/agent-handoff)
- [MCP Integration →](../cookbook/agents/mcp-integration)
