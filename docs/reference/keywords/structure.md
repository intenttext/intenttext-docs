---
sidebar_position: 4
title: Structure Keywords
---

# Structure Keywords

Keywords for organizing the document — sections, subsections, references, and deadlines.

## `section:`

**Category:** Structure
**Since:** v1.0
**Aliases:** `h2:`, `heading:`

Section heading. Renders as H2. Blocks below belong to this section until the next `section:`.

### Syntax

```
section: heading text
```

### Examples

```intenttext
section: Scope of Work
section: Payment Terms
section: Definitions
```

### Notes

- Sections create logical groupings for queries — `--section "Payment"` filters to blocks within that section
- Use `sub:` for H3 within a section

---

## `sub:`

**Category:** Structure
**Since:** v1.0
**Aliases:** `h3:`, `subheading:`

Subsection heading. Renders as H3.

### Syntax

```
sub: heading text
```

### Examples

```intenttext
section: Payment Terms
sub: Invoice Schedule
text: Invoices are issued on the 1st of each month.
sub: Late Fees
text: A fee of 1.5% per month applies to overdue payments.
```

---

## `break:`

**Category:** Structure
**Since:** v1.0

Page break for print output. Invisible in web — renders as `display:none` with `aria-hidden="true"`. In print, forces a page break.

### Syntax

```
break:
break: | before: value | keep: value
```

### Properties

| Property | Type    | Description                                  |
| -------- | ------- | -------------------------------------------- |
| `before` | boolean | Force page break before this point (print)   |
| `keep`   | string  | Keep with next content — `together`, `avoid` |

### Examples

```intenttext
break:
break: | before: true
```

### `break:` vs `divider:`

|              | `break:`                             | `divider:` / `---`          |
| ------------ | ------------------------------------ | --------------------------- |
| **Web**      | Invisible (`display:none`)           | Visible `<hr>`              |
| **Print**    | Page break                           | Horizontal rule             |
| **Use case** | Force next page in printed documents | Visual separation on screen |

Use `break:` when you need content on the next printed page. Use `divider:` or `---` when you want a visible line between sections.

---

## `group:`

**Category:** Structure
**Since:** v1.0

Logical grouping of blocks. No visual rendering — used for semantic grouping and query targeting.

### Syntax

```
group: label
```

### Examples

```intenttext
group: Financial Summary
metric: Revenue | value: 1200000 | unit: USD
metric: Expenses | value: 890000 | unit: USD
metric: Net Income | value: 310000 | unit: USD
```

---

## `ref:`

**Category:** Structure
**Since:** v2.11
**Aliases:** `references:`, `see:`, `related:`

Cross-document reference with a typed relationship. Links documents together in a navigable graph.

### Syntax

```
ref: description | file: path | url: link | rel: relationship | section: target | at: timestamp
```

### Properties

| Property  | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| `file`    | string | Path to the referenced `.it` file             |
| `url`     | string | URL to an external document                   |
| `rel`     | string | Relationship type (see below)                 |
| `section` | string | Target section within the referenced document |
| `at`      | string | Timestamp of the reference                    |

### Relationship types (`rel:`)

| Value        | Meaning                                     | Example                         |
| ------------ | ------------------------------------------- | ------------------------------- |
| `supersedes` | This document replaces the referenced one   | Contract v2 supersedes v1       |
| `amends`     | This document amends the referenced one     | Amendment references original   |
| `implements` | This document implements the referenced one | Task plan implements spec       |
| `references` | General reference                           | Report references data source   |
| `fallback`   | Fallback document                           | Rollback plan for migration     |
| `parent`     | Parent document                             | Sub-task references parent task |
| `related`    | Related document                            | Related contracts in a deal     |

### Examples

```intenttext
ref: Original agreement | file: ./contracts/acme-v1.it | rel: supersedes
ref: Governing framework | file: ./policies/consulting-policy.it | rel: implements
ref: Amendment #1 | file: ./amendments/acme-amendment-1.it | rel: amends
ref: NIST Cybersecurity Framework | url: https://nist.gov/cyberframework | rel: references
```

### Notes

- Validation error `REF_MISSING_TARGET` if neither `file:` nor `url:` is provided
- Queryable: `intenttext query ./contracts --type ref --rel supersedes` finds all superseding references
- Agents use `ref:` to navigate document graphs — finding related plans, implementations, and fallbacks
- Organizations use `ref:` to track which contract supersedes which

### Related

- [Cross-Document References cookbook →](../../cookbook/data/cross-document-refs)

---

## `deadline:`

**Category:** Structure
**Since:** v2.11
**Aliases:** `due:`, `milestone:`, `due-date:`

Date-bound milestone or due date with optional consequences. Renders with proximity color coding — green when far, amber when approaching, red when overdue.

### Syntax

```
deadline: description | date: value | consequence: text | authority: name | ref: reference | owner: responsible | reminder: period
```

### Properties

| Property      | Type   | Required | Description                             |
| ------------- | ------ | -------- | --------------------------------------- |
| `date`        | string | yes      | Due date (ISO 8601 or natural)          |
| `consequence` | string | no       | What happens if missed                  |
| `authority`   | string | no       | Who set this deadline                   |
| `ref`         | string | no       | Reference to related document or clause |
| `owner`       | string | no       | Who is responsible                      |
| `reminder`    | string | no       | Reminder period (e.g., `7d`, `2w`)      |

### Examples

```intenttext
deadline: Payment due | date: 2026-04-30 | consequence: Late fee of 1.5% per month | owner: GlobalTech Inc.
deadline: Contract renewal | date: 2026-12-31 | consequence: Auto-renewal at existing terms | reminder: 30d
deadline: Phase 1 delivery | date: 2026-06-01 | authority: Steering Committee | owner: Engineering
```

### Notes

- Validation error `DEADLINE_MISSING_DATE` if `date:` is not provided
- Proximity color coding in rendered output: green (&gt;30 days), amber (7–30 days), red (&lt;7 days or overdue)
- Queryable: `intenttext query ./contracts --type deadline` finds all deadlines
- Natural language: `intenttext ask ./contracts "what deadlines are in April?"`

### Related

- [Deadline Tracking cookbook →](../../cookbook/organizations/deadline-tracking)

---

## `embed:`

**Category:** Structure
**Since:** v1.0

Embed a referenced external resource inline in the document.

### Syntax

```
embed: description | src: url | type: media_type | width: value | height: value
```

### Properties

| Property | Type   | Description          |
| -------- | ------ | -------------------- |
| `src`    | string | URL or path to embed |
| `type`   | string | Media type hint      |
| `width`  | string | Display width        |
| `height` | string | Display height       |

### Examples

```intenttext
embed: Project timeline | src: ./diagrams/timeline.svg | width: 100%
embed: Demo video | src: https://example.com/demo.mp4 | type: video
```

---

## `toc:`

**Category:** Structure
**Since:** v2.5

Auto-generated table of contents based on `section:` and `sub:` headings in the document.

### Syntax

```
toc:
toc: | depth: number
```

### Properties

| Property | Type   | Default | Description                                                               |
| -------- | ------ | ------- | ------------------------------------------------------------------------- |
| `depth`  | number | `3`     | Maximum heading depth to include (2=sections only, 3=include subsections) |

### Examples

```intenttext
title: Service Agreement
toc:

section: Scope of Work
sub: Deliverables
text: ...
```
