---
sidebar_position: 5
title: Data Keywords
---

# Data Keywords

Keywords for typed data — inputs, outputs, tables, and metrics.

## `input:`

**Category:** Data
**Since:** v1.3

Declared input parameter. Used in agent workflows and template schemas.

### Syntax

```
input: name | type: datatype | required: boolean | default: value
```

### Properties

| Property   | Type    | Description                                                 |
| ---------- | ------- | ----------------------------------------------------------- |
| `type`     | string  | Data type: `string`, `number`, `boolean`, `array`, `object` |
| `required` | boolean | Whether this input must be provided                         |
| `default`  | string  | Default value if not provided                               |

### Examples

```intenttext
input: customer_id | type: string | required: true
input: include_archived | type: boolean | default: false
input: max_results | type: number | default: 100
```

---

## `output:`

**Category:** Data
**Since:** v1.3

Declared output parameter. Documents what a workflow or template produces.

### Syntax

```
output: name | type: datatype | format: description
```

### Properties

| Property | Type   | Description                                     |
| -------- | ------ | ----------------------------------------------- |
| `type`   | string | Data type                                       |
| `format` | string | Format description (e.g., `CSV`, `JSON`, `PDF`) |

### Examples

```intenttext
output: migration_report | type: object | format: JSON
output: invoice_pdf | type: string | format: PDF file path
```

---

## `columns:`

**Category:** Data
**Since:** v1.0
**Aliases:** `headers:` (compat-only)

Table column definitions — declares column names for the following `row:` blocks.

### Syntax

```
columns: Col1 | Col2 | Col3
```

### Examples

```intenttext
columns: Department | Budget | Spent | Remaining
row: Engineering | USD 500,000 | USD 320,000 | USD 180,000
row: Marketing | USD 200,000 | USD 175,000 | USD 25,000
row: Operations | USD 150,000 | USD 98,000 | USD 52,000
```

### Notes

- `columns:` declares the column headers, `row:` provides the data
- `headers:` is a compat-only alias — use `columns:` in new documents
- Tables can also be written using Markdown pipe syntax (see below)

---

## `row:`

**Category:** Data
**Since:** v1.0

Table data row — pipe-separated cell values. Must follow a `columns:` declaration.

### Syntax

```
row: Cell1 | Cell2 | Cell3
```

### Examples

```intenttext
columns: Name | Role | Email
row: Ahmed Al-Rashid | CEO | ahmed@acme.com
row: Sarah Chen | General Counsel | sarah@acme.com
```

---

## Markdown pipe tables

Tables can also be written using standard Markdown pipe syntax. The parser produces the same internal `table` structure.

### Static table

```intenttext
| Header 1 | Header 2 | Header 3 |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Dynamic table (templates)

The `each:` property on the header row enables dynamic row expansion:

```intenttext
| Description          | Qty          | Rate          | Total          | each: items |
| {{item.description}} | {{item.qty}} | {{item.rate}} | {{item.total}} |
```

1. Parser reads the `each:` array from data
2. Auto-singularizes: `items` → `item`, `orders` → `order`
3. Explicit naming: `each: orders as order`
4. Expands one row per array element
5. Zero items = zero rows; header always present

---

## `metric:`

**Category:** Data
**Since:** v2.11
**Aliases:** `kpi:`, `measure:`, `stat:`

Quantitative measurement or KPI. Queryable, renderable as cards or grids, with optional target comparison and trend indicators.

### Syntax

```
metric: label | value: number | unit: string | period: timeframe | as-of: date | target: number | trend: direction | owner: team | source: origin
```

### Properties

| Property | Type   | Required | Description                                  |
| -------- | ------ | -------- | -------------------------------------------- |
| `value`  | string | yes      | The measured value                           |
| `unit`   | string | no       | Unit of measurement (USD, %, hours, etc.)    |
| `period` | string | no       | Reporting period (Q1 2026, March 2026, etc.) |
| `as-of`  | string | no       | Date the measurement was taken               |
| `target` | string | no       | Target or goal value                         |
| `trend`  | string | no       | `up`, `down`, `flat`                         |
| `owner`  | string | no       | Responsible team or person                   |
| `source` | string | no       | Data source                                  |

### Examples

**Business metrics:**

```intenttext
metric: Revenue | value: 1200000 | unit: USD | period: Q1 2026 | target: 1000000 | trend: up
metric: Customer Satisfaction | value: 4.6 | unit: /5 | period: March 2026 | target: 4.5 | trend: up
metric: Active Users | value: 45200 | period: March 2026 | trend: up | source: Analytics Dashboard
```

**Project metrics:**

```intenttext
metric: Sprint Velocity | value: 42 | unit: points | period: Sprint 14 | target: 40 | trend: flat
metric: Bug Count | value: 12 | period: This week | target: 0 | trend: down | owner: QA Team
```

**Financial totals:**

```intenttext
metric: Subtotal | value: 24000 | unit: USD
metric: Tax (5%) | value: 1200 | unit: USD
metric: Total Due | value: 25200 | unit: USD | weight: bold
```

### Color coding

When `target:` is present, the renderer applies color coding:

- **Green** — value meets or exceeds target (for `up` trend) or is at/below target (for `down` trend)
- **Red** — value misses the target
- **Amber** — value is within 10% of the target

### Metric grid

When multiple `metric:` blocks appear in the same section, they render as a grid of cards — useful for executive dashboards.

### Notes

- Queryable: `intenttext query ./reports --type metric --owner Finance`
- Export to CSV: `intenttext query ./reports --type metric --format csv`
- Agents can write `metric:` blocks to audit logs for automated monitoring

### Related

- [Metrics and Dashboards cookbook →](../../cookbook/data/metrics-and-dashboards)
