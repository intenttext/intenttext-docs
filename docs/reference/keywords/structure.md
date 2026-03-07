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
note: Invoices are issued on the 1st of each month.
sub: Late Fees
note: A fee of 1.5% per month applies to overdue payments.
```

---

## `break:`

**Category:** Structure / Layout
**Since:** v1.0

Visual or page break. In HTML, renders as a horizontal rule. In print, can force page breaks.

### Syntax

```
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
