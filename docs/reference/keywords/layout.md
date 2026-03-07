---
sidebar_position: 8
title: Layout Keywords
---

# Layout Keywords

Keywords that control the printed/PDF appearance of a document. These have no effect in HTML output — they target physical pages.

## `page:`

**Category:** Layout
**Since:** v2.9

Set page dimensions and margins.

### Syntax

```
page: description | size: dimensions | margins: values | orientation: value
```

### Properties

| Property      | Type   | Default    | Description                                                                                                      |
| ------------- | ------ | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| `size`        | string | `A4`       | Page size — `A4`, `Letter`, `Legal`, `A3`, `A5`, or custom `WxH`                                                 |
| `margins`     | string | `2.54cm`   | Page margins. Single value (all sides), two values (vertical horizontal), or four values (top right bottom left) |
| `orientation` | string | `portrait` | `portrait` or `landscape`                                                                                        |

### Examples

```intenttext
page: | size: A4 | margins: 2.54cm
page: | size: Letter | margins: 1in 1.25in | orientation: landscape
page: | size: 210mm 297mm | margins: 20mm 25mm 30mm 25mm
```

---

## `font:`

**Category:** Layout
**Since:** v2.9

Set document fonts.

### Syntax

```
font: description | body: family | heading: family | mono: family | size: value
```

### Properties

| Property  | Type   | Default       | Description           |
| --------- | ------ | ------------- | --------------------- |
| `body`    | string | Theme default | Body text font family |
| `heading` | string | Theme default | Heading font family   |
| `mono`    | string | Theme default | Monospace font family |
| `size`    | string | `11pt`        | Base font size        |

### Examples

```intenttext
font: | body: Inter | heading: Inter | mono: JetBrains Mono | size: 11pt
font: | body: Times New Roman | heading: Georgia | size: 12pt
font: | body: Helvetica | size: 10pt
```

---

## `header:`

**Category:** Layout
**Since:** v2.9

Page header content. Appears at the top of every printed page.

### Syntax

```
header: content | align: value | size: value
```

### Properties

| Property | Type   | Default  | Description                  |
| -------- | ------ | -------- | ---------------------------- |
| `align`  | string | `center` | `left`, `center`, or `right` |
| `size`   | string | `9pt`    | Font size of the header      |

### Examples

```intenttext
header: CONFIDENTIAL | align: right | size: 8pt
header: Acme Corp — Service Agreement v2.1 | align: left
header: {{title}} — Page {page} of {pages} | align: center
```

### Notes

- `{page}` and `{pages}` are auto-replaced with the current page number and total page count
- Template variables `{{}}` are resolved before rendering

---

## `footer:`

**Category:** Layout
**Since:** v2.9

Page footer content. Appears at the bottom of every printed page.

### Syntax

```
footer: content | align: value | size: value
```

### Properties

| Property | Type   | Default  | Description                  |
| -------- | ------ | -------- | ---------------------------- |
| `align`  | string | `center` | `left`, `center`, or `right` |
| `size`   | string | `9pt`    | Font size of the footer      |

### Examples

```intenttext
footer: Page {page} of {pages} | align: center
footer: © 2026 Acme Corp. All rights reserved. | align: left | size: 7pt
footer: Document ID: {hash} — Generated {date} | align: right
```

---

## `watermark:`

**Category:** Layout
**Since:** v2.9

Watermark overlay on every page.

### Syntax

```
watermark: text | color: value | opacity: value | angle: value | size: value
```

### Properties

| Property  | Type   | Default   | Description                     |
| --------- | ------ | --------- | ------------------------------- |
| `color`   | string | `#cccccc` | Watermark color                 |
| `opacity` | string | `0.1`     | Opacity (0–1)                   |
| `angle`   | string | `-45`     | Rotation angle in degrees       |
| `size`    | string | `72pt`    | Font size of the watermark text |

### Examples

```intenttext
watermark: DRAFT | color: #ff0000 | opacity: 0.08 | angle: -45
watermark: CONFIDENTIAL | color: #999999 | opacity: 0.05 | size: 96pt
watermark: COPY | color: #cccccc | opacity: 0.12
```

---

## `divider:`

**Category:** Layout
**Since:** v2.12
**Aliases:** `hr:`, `separator:`

Visible horizontal rule. Identical output to a bare `---` line, but supports style properties.

### Syntax

```
divider:
divider: | style: value
---
```

### Properties

| Property | Type   | Default | Description                              |
| -------- | ------ | ------- | ---------------------------------------- |
| `style`  | string | `solid` | Line style — `solid`, `dashed`, `dotted` |

### Examples

```intenttext
divider:
divider: | style: dashed
divider: | style: dotted
```

### The `---` shorthand

A bare `---` on its own line is equivalent to `divider:` with no properties. It always renders as a visible horizontal rule (`<hr>`).

```intenttext
note: Section one content.
---
note: Section two content.
```

As of v2.12, `---` is no longer reserved as a history boundary. It is a visible divider everywhere it appears.

### `divider:` vs `break:`

|              | `divider:` / `---`                 | `break:`                                |
| ------------ | ---------------------------------- | --------------------------------------- |
| **Visible**  | Yes — renders as `<hr>`            | No — invisible in web output            |
| **Web**      | Horizontal rule                    | Hidden (`display:none`, `aria-hidden`)  |
| **Print**    | Horizontal rule                    | Page break (`page-break-after: always`) |
| **Use case** | Visual separation between sections | Force content to the next printed page  |

### Notes

- `---` and `divider:` produce identical output when no properties are set
- Use `divider: | style: dashed` for a dashed line, `dotted` for dots
- In print output, the divider renders as a printed horizontal line (not a page break)

### Related

- [`break:`](./structure#break) — invisible web, page break in print
- [Migrating to v2.12 →](../../guide/migrating-to-v212)

---

## `signline:`

**Category:** Layout
**Since:** v2.9

Physical signature line for printed documents. This keyword creates a visual line-for-ink on the page, not a digital signature.

### Syntax

```
signline: signer name | role: title | label: text | width: value
```

### Properties

| Property | Type   | Default     | Description                 |
| -------- | ------ | ----------- | --------------------------- |
| `role`   | string | —           | Signer's role               |
| `label`  | string | `Signature` | Text printed below the line |
| `width`  | string | `60%`       | Width of the signature line |

### Examples

```intenttext
signline: Ahmed Al-Rashid | role: CEO | label: Authorized Signature
signline: Sarah Chen | role: General Counsel | label: Legal Approval | width: 50%
signline: James Miller | role: CFO
```

### `signline:` vs `sign:`

|                  | `signline:`                             | `sign:`                                 |
| ---------------- | --------------------------------------- | --------------------------------------- |
| **Purpose**      | Physical line on paper for wet ink      | Digital signature in the file           |
| **Appears in**   | PDF/print output only                   | The `.it` file structure                |
| **Verification** | Human visual — someone signed the paper | Machine — hash matches content          |
| **Common use**   | Contracts that need physical signatures | Digital verification and seal integrity |

Use `signline:` when you need people to physically sign a printed document. Use `sign:` when you need machine-verifiable proof of who signed. Use both when a contract needs both.

### Typical trust + layout combination

```intenttext
title: Service Agreement

section: Terms
note: Payment within 30 days of delivery...

section: Signatures

// Digital signatures (in the file)
approve: Legal review | by: Sarah Chen | role: General Counsel | at: 2026-03-05
sign: Ahmed Al-Rashid | role: CEO | at: 2026-03-06 | hash: sha256:a1b2c3d4

// Physical signature lines (on printed page)
signline: Ahmed Al-Rashid | role: CEO | label: Client Signature
signline: John Davis | role: Director | label: Provider Signature

// Date lines
signline: | label: Date | width: 30%
signline: | label: Date | width: 30%

freeze: | status: locked | at: 2026-03-06T14:33:00Z | hash: sha256:e5f6a7b8
```
