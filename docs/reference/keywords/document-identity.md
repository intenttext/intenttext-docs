---
sidebar_position: 2
title: Document Identity
---

# Document Identity Keywords

Keywords that define what the document is — its title, metadata, and tracking status.

## `title:`

**Category:** Identity
**Since:** v1.0
**Aliases:** `h1:`

The document title. Renders as H1. Every document should have exactly one.

### Syntax

```
title: content
```

### Examples

```intenttext
title: Service Agreement
title: Q2 2026 Financial Report
title: Invoice {{invoice.number}}
```

### Notes

- One `title:` per document
- In templates, supports `{{variables}}`

---

## `summary:`

**Category:** Identity
**Since:** v1.0
**Aliases:** `abstract:`

Brief description of the document. Renders as a subtitle below the title.

### Syntax

```
summary: content
```

### Examples

```intenttext
summary: Consulting services agreement between Acme Corp and GlobalTech
summary: Monthly financial performance report for the board
```

---

## `meta:`

**Category:** Identity
**Since:** v2.8.1

Document metadata as key-value pairs. Not rendered visually — used for classification, filtering, and template system.

### Syntax

```
meta: | key: value | key: value
```

### Properties

| Property  | Type   | Description                                            |
| --------- | ------ | ------------------------------------------------------ |
| `type`    | string | Document type: `template`, `invoice`, `contract`, etc. |
| `author`  | string | Document author                                        |
| `date`    | string | Document date                                          |
| `version` | string | Document version                                       |
| `lang`    | string | Language code (e.g., `en`, `ar`)                       |
| `license` | string | License identifier                                     |
| `domain`  | string | Business domain (e.g., `finance`, `legal`)             |
| `tags`    | string | Comma-separated tags                                   |
| `theme`   | string | Default theme for rendering                            |

### Examples

```intenttext
meta: | type: template | domain: finance | author: Ahmed Al-Rashid
meta: | type: contract | lang: en | tags: consulting, q2-2026
meta: | theme: corporate | version: 2.1
```

### Notes

- `meta:` content is empty — all data is in pipe properties
- `type: template` is how the merge system identifies templates
- Can have multiple `meta:` blocks — properties merge

---

## `context:`

**Category:** Identity / Agent
**Since:** v2.0

Agent execution context. Declares the agent identity, goal, and constraints.

### Syntax

```
context: agent name | goal: description | constraints: rules
```

### Properties

| Property      | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| `agent`       | string | Agent name or identifier          |
| `goal`        | string | What the agent aims to accomplish |
| `constraints` | string | Rules or limitations              |

### Examples

```intenttext
context: Data Migration Agent | goal: Migrate legacy DB to cloud | constraints: Zero downtime
context: Report Generator | goal: Produce monthly financial summary | constraints: Data from SAP only
```

### Notes

- Also appears in the Agent category — it serves both identity and workflow purposes
- Typically the first block after `title:` in agent task plans

---

## `track:`

**Category:** Identity
**Since:** v2.8

Activates document history tracking. Once set, the CLI records revisions below the `history:` boundary.

### Syntax

```
track: | version: value | by: author
```

### Properties

| Property  | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| `version` | string | yes      | Current version identifier |
| `by`      | string | yes      | Who created this version   |

### Examples

```intenttext
track: | version: 1.0 | by: Ahmed Al-Rashid
track: | version: 2.3 | by: Sarah Chen
```

### Notes

- `track:` content is typically empty — data is in properties
- Required before `approve:`, `sign:`, or `freeze:` can be used
- History is recorded below `history:` as `revision:` blocks

### Related

- [`approve:`](./trust#approve) — next step in the trust chain
- [`revision:`](./trust#revision) — auto-generated history entries
- [Trust & Signing Guide](../../guide/trust-and-signing)

---

## `agent:`

**Category:** Identity
**Since:** v2.0

Agent name or identifier. Pre-section metadata for workflow documents.

### Syntax

```
agent: name
```

### Examples

```intenttext
agent: Data Migration Bot
agent: Invoice Processor
```

### Notes

- Typically appears before the first `section:`
- Declares which agent owns this workflow document

---

## `model:`

**Category:** Identity
**Since:** v2.0

Default AI model for this document. Pre-section metadata.

### Syntax

```
model: identifier
```

### Examples

```intenttext
model: claude-3
model: gpt-4
model: llama-3-70b
```

### Notes

- Sets the default model for all `prompt:` blocks in the document
- Individual `prompt:` blocks can override with their own `model:` property
