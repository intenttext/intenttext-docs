---
sidebar_position: 9
title: Aliases
---

# Keyword Aliases

IntentText supports **84 aliases** — alternative names for keywords. Use whichever reads best in your document. Every alias compiles to the same internal keyword; there is no behavioral difference.

## How aliases work

```intenttext
// These are all identical:
text: Payment is due within 30 days.
body: Payment is due within 30 days.
text: Payment is due within 30 days.
content: Payment is due within 30 days.
paragraph: Payment is due within 30 days.
```

The parser normalizes all aliases to their canonical keyword. Templates, queries, and the API always use canonical names.

---

## Complete alias table

### Document Identity

| Canonical  | Aliases     |
| ---------- | ----------- |
| `title:`   | —           |
| `summary:` | `abstract:` |
| `meta:`    | —           |
| `context:` | —           |
| `track:`   | —           |
| `agent:`   | —           |
| `model:`   | —           |

### Content

| Canonical     | Aliases                                                  |
| ------------- | -------------------------------------------------------- |
| `text:`       | `note:`, `body:`, `content:`, `paragraph:`               |
| `quote:`      | `blockquote:`, `excerpt:`, `pullquote:`                  |
| `cite:`       | `citation:`, `source:`, `reference:`                     |
| `warning:`    | `alert:`, `caution:`                                     |
| `danger:`     | `critical:`, `destructive:`                              |
| `tip:`        | `hint:`, `advice:`                                       |
| `info:`       | —                                                        |
| `success:`    | —                                                        |
| `code:`       | `snippet:`                                               |
| `image:`      | `img:`, `photo:`, `picture:`                             |
| `link:`       | `url:`, `href:`                                          |
| `def:`        | `define:`, `term:`, `glossary:`                          |
| `figure:`     | `fig:`, `chart:`, `diagram:`, `illustration:`, `visual:` |
| `contact:`    | `person:`, `party:`, `entity:`                           |
| `byline:`     | —                                                        |
| `epigraph:`   | —                                                        |
| `caption:`    | —                                                        |
| `footnote:`   | —                                                        |
| `dedication:` | —                                                        |

### Structure

| Canonical   | Aliases                                    |
| ----------- | ------------------------------------------ |
| `section:`  | `heading:`, `chapter:`                     |
| `sub:`      | `subheading:`                              |
| `break:`    | —                                          |
| `ref:`      | `references:`, `see:`, `related:`, `xref:` |
| `deadline:` | `due:`, `milestone:`, `by:`                |
| `embed:`    | —                                          |
| `toc:`      | —                                          |

### Data

| Canonical  | Aliases                          |
| ---------- | -------------------------------- |
| `columns:` | —                                |
| `row:`     | —                                |
| `input:`   | —                                |
| `output:`  | —                                |
| `metric:`  | `kpi:`, `measure:`, `indicator:` |

### Agent

| Canonical     | Aliases                                              |
| ------------- | ---------------------------------------------------- |
| `step:`       | `run:`                                               |
| `gate:`       | —                                                    |
| `trigger:`    | `on:`                                                |
| `signal:`     | ~~`emit:`~~ (deprecated), ~~`status:`~~ (deprecated) |
| `decision:`   | `if:`                                                |
| `memory:`     | —                                                    |
| `prompt:`     | —                                                    |
| `tool:`       | —                                                    |
| `audit:`      | `log:`                                               |
| `done:`       | —                                                    |
| `error:`      | —                                                    |
| `result:`     | —                                                    |
| `handoff:`    | —                                                    |
| `wait:`       | —                                                    |
| `parallel:`   | —                                                    |
| `retry:`      | —                                                    |
| `call:`       | —                                                    |
| `loop:`       | —                                                    |
| `checkpoint:` | —                                                    |
| `import:`     | —                                                    |
| `export:`     | —                                                    |
| `progress:`   | —                                                    |
| `task:`       | `check:`, `todo:`, `action:`, `item:`                |
| `ask:`        | —                                                    |
| `policy:`     | `rule:`, `constraint:`, `guard:`, `requirement:`     |
| `assert:`     | `expect:`, `verify:`                                 |
| `secret:`     | `credential:`, `token:`                              |

### Trust

| Canonical    | Aliases             |
| ------------ | ------------------- |
| `approve:`   | —                   |
| `sign:`      | —                   |
| `freeze:`    | `lock:`             |
| `revision:`  | —                   |
| `amendment:` | `amend:`, `change:` |
| `history:`   | —                   |

### Layout

| Canonical    | Aliases                         |
| ------------ | ------------------------------- |
| `page:`      | —                               |
| `font:`      | —                               |
| `header:`    | —                               |
| `footer:`    | —                               |
| `watermark:` | —                               |
| `signline:`  | `signature-line:`, `sign-here:` |
| `divider:`   | `hr:`, `separator:`             |

---

## Quick counts

| Category          | Keywords | Aliases |
| ----------------- | -------- | ------- |
| Document Identity | 7        | 1       |
| Content           | 19       | 30      |
| Structure         | 7        | 10      |
| Data              | 5        | 3       |
| Agent             | 27       | 19      |
| Trust             | 6        | 3       |
| Layout            | 7        | 4       |
| **Total**         | **78**   | **70**  |

> **Note:** There are also 14 compat-only aliases (e.g. `h1:` → `title:`, `p:` → `text:`, `h2:` → `section:`, `h3:` → `sub:`, `headers:` → `columns:`, `subsection:` → `sub:`, `due-date:` → `deadline:`, `stat:` → `metric:`, `completed:` → `done:`, `finished:` → `done:`, `question:` → `ask:`, `sig:` → `signline:`) bringing the total to **84 aliases**. Compat-only aliases are not shown in documentation or completion hints.

---

## Using aliases in queries

Queries normalize aliases automatically:

```bash
# These return the same results:
intenttext query . --type text
intenttext query . --type note
intenttext query . --type body
```

## Using aliases in templates

Templates always use canonical names. Even if the source document uses an alias, the parsed output uses the canonical keyword:

```json
{
  "type": "text",
  "content": "Payment is due within 30 days."
}
```
