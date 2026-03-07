---
sidebar_position: 9
title: Aliases
---

# Keyword Aliases

IntentText supports **49 aliases** — alternative names for keywords. Use whichever reads best in your document. Every alias compiles to the same internal keyword; there is no behavioral difference.

## How aliases work

```intenttext
// These are all identical:
note: Payment is due within 30 days.
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

### Content

| Canonical  | Aliases                                                  |
| ---------- | -------------------------------------------------------- |
| `note:`    | `body:`, `text:`, `content:`, `paragraph:`               |
| `quote:`   | `blockquote:`, `excerpt:`, `pullquote:`, `highlight:`    |
| `warning:` | `alert:`, `caution:`                                     |
| `tip:`     | `hint:`, `advice:`                                       |
| `code:`    | `snippet:`                                               |
| `image:`   | `img:`, `photo:`, `picture:`                             |
| `link:`    | `url:`, `href:`                                          |
| `cite:`    | `citation:`, `source:`                                   |
| `def:`     | `define:`, `term:`, `glossary:`                          |
| `figure:`  | `fig:`, `chart:`, `diagram:`, `illustration:`, `visual:` |
| `contact:` | `person:`, `party:`, `entity:`                           |

### Structure

| Canonical   | Aliases                       |
| ----------- | ----------------------------- |
| `section:`  | `heading:`, `chapter:`        |
| `sub:`      | `subsection:`, `subheading:`  |
| `break:`    | —                             |
| `group:`    | —                             |
| `ref:`      | `reference:`, `xref:`, `see:` |
| `deadline:` | `due:`, `milestone:`, `by:`   |

### Data

| Canonical | Aliases                          |
| --------- | -------------------------------- |
| `input:`  | —                                |
| `output:` | —                                |
| `table:`  | —                                |
| `metric:` | `kpi:`, `measure:`, `indicator:` |

### Agent

| Canonical   | Aliases |
| ----------- | ------- |
| `step:`     | —       |
| `gate:`     | —       |
| `trigger:`  | —       |
| `emit:`     | —       |
| `decision:` | —       |
| `context:`  | —       |
| `memory:`   | —       |
| `prompt:`   | —       |
| `tool:`     | —       |
| `audit:`    | —       |
| `done:`     | —       |
| `error:`    | —       |

### Trust

| Canonical    | Aliases                                          |
| ------------ | ------------------------------------------------ |
| `approve:`   | —                                                |
| `sign:`      | —                                                |
| `freeze:`    | `lock:`                                          |
| `revision:`  | —                                                |
| `policy:`    | `rule:`, `constraint:`, `guard:`, `requirement:` |
| `amendment:` | `amend:`, `change:`                              |
| `history:`   | —                                                |

### Layout

| Canonical    | Aliases             |
| ------------ | ------------------- |
| `page:`      | —                   |
| `font:`      | —                   |
| `header:`    | —                   |
| `footer:`    | —                   |
| `watermark:` | —                   |
| `signline:`  | —                   |
| `divider:`   | `hr:`, `separator:` |

---

## Quick counts

| Category          | Keywords | Aliases |
| ----------------- | -------- | ------- |
| Document Identity | 5        | 1       |
| Content           | 11       | 27      |
| Structure         | 6        | 10      |
| Data              | 4        | 3       |
| Agent             | 12       | 0       |
| Trust             | 7        | 7       |
| Layout            | 7        | 2       |
| **Total**         | **57**   | **49**  |

---

## Using aliases in queries

Queries normalize aliases automatically:

```bash
# These return the same results:
intenttext query . --type note
intenttext query . --type body
intenttext query . --type text
```

## Using aliases in templates

Templates always use canonical names. Even if the source document uses an alias, the parsed output uses the canonical keyword:

```json
{
  "type": "note",
  "content": "Payment is due within 30 days."
}
```
