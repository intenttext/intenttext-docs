---
sidebar_position: 1
title: All Keywords
---

import KeywordTable from '@site/src/components/KeywordTable';

# All 79 Keywords

Every IntentText keyword in one table. Filter by category, sort by name or version, search by description.

<KeywordTable />

## How to read this table

- **Keyword** — the canonical name you write in a `.it` file
- **Category** — the functional group
- **Since** — the version when this keyword was introduced
- **Description** — what the block does
- **Properties** — keyword-specific pipe properties (not including [style properties](../style-properties) which are available on all blocks)

## Keyword categories

| Category  | Count | Purpose                                                                |
| --------- | ----- | ---------------------------------------------------------------------- |
| Identity  | 7     | What the document is — title, metadata, agent identity, tracking       |
| Content   | 19    | What the document says — text, images, quotes, callouts, definitions   |
| Structure | 8     | How the document is organized — sections, references, deadlines, TOC   |
| Data      | 5     | Typed data — columns, rows, inputs, outputs, metrics                   |
| Agent     | 26    | Workflow for AI agents — steps, gates, decisions, assertions, secrets  |
| Trust     | 7     | Document integrity — approval, signatures, policy, history, amendments |
| Layout    | 7     | Print and PDF — page setup, headers, watermarks, signature lines       |

Each keyword also has a dedicated entry in its category page with full syntax, properties table, examples, and behavioral notes.
