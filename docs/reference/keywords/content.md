---
sidebar_position: 3
title: Content Keywords
---

# Content Keywords

Keywords for the actual content of your document — text, quotes, warnings, images, definitions, figures, and contacts.

## `note:`

**Category:** Content
**Since:** v1.0
**Aliases:** `text:`, `body:`, `p:`, `paragraph:`

General text block. The default, most-used keyword. Use it for any paragraph of content.

### Syntax

```
note: content | style-properties
```

### Examples

```intenttext
note: The project is on track for a June delivery.
note: Total contract value: USD 24,000 | weight: bold
note: Please review by end of week | color: #dc2626 | italic: true
```

### Notes

- Supports all [style properties](../style-properties)
- Supports [inline formatting](../style-properties#inline-formatting): `*bold*`, `_italic_`, `~strike~`, `` `code` ``, `^highlight^`

---

## `quote:`

**Category:** Content
**Since:** v1.0
**Aliases:** `blockquote:`, `cite:` (as v2.11 alias), `citation:`, `source:`, `reference:`

Block quotation with optional attribution.

### Syntax

```
quote: content | citation: source
```

### Properties

| Property    | Type   | Description          |
| ----------- | ------ | -------------------- |
| `citation`  | string | Attribution text     |
| `source`    | string | Source reference     |
| `reference` | string | Reference identifier |

### Examples

```intenttext
quote: The best way to predict the future is to invent it. | citation: Alan Kay
quote: All documents should be machine-readable from birth. | source: IntentText Manifesto
```

---

## `warning:`

**Category:** Content
**Since:** v1.0

Warning or caution block. Renders with visual emphasis — typically amber or red background.

### Syntax

```
warning: content
```

### Examples

```intenttext
warning: This contract expires in 14 days. Renewal required.
warning: Editing a frozen document will break the seal.
```

---

## `tip:`

**Category:** Content
**Since:** v1.0

Helpful tip or suggestion. Renders with a visual indicator — typically green or blue.

### Syntax

```
tip: content
```

### Examples

```intenttext
tip: Use intenttext query to find all deadlines across your folder.
tip: Add meta: | theme: corporate to set a default theme.
```

---

## `code:`

**Category:** Content
**Since:** v1.0

Code block with optional language for syntax highlighting.

### Syntax

```
code: content | lang: language
```

### Properties

| Property | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| `lang`   | string | Programming language for highlighting |

### Examples

```intenttext
code: const doc = parseIntentText(source); | lang: typescript
code: intenttext seal contract.it --signer "Ahmed" | lang: bash
```

---

## `image:`

**Category:** Content
**Since:** v1.0

Inline image. No caption, no number, flows with surrounding text.

### Syntax

```
image: alt text | src: url | width: value
```

### Properties

| Property | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| `src`    | string | yes      | Image URL or path                |
| `alt`    | string | no       | Alt text (content serves as alt) |
| `width`  | string | no       | Display width                    |

### Examples

```intenttext
image: Company logo | src: ./images/logo.png | width: 200px
image: Architecture diagram | src: ./diagrams/arch.png
```

### Notes

- For numbered, captioned images use [`figure:`](#figure) instead
- `image:` is inline; `figure:` is a formal numbered element

---

## `link:`

**Category:** Content
**Since:** v1.0

Hyperlink to an external resource.

### Syntax

```
link: display text | url: target | title: tooltip
```

### Properties

| Property | Type   | Required | Description  |
| -------- | ------ | -------- | ------------ |
| `url`    | string | yes      | Link target  |
| `title`  | string | no       | Tooltip text |

### Examples

```intenttext
link: IntentText Hub | url: https://intenttext-hub.vercel.app
link: View the full contract | url: ./contracts/acme-2026.it | title: Acme Services Contract
```

---

## `cite:`

**Category:** Content
**Since:** v1.0

Source citation for bibliography or references.

### Syntax

```
cite: title | author: name | date: year | url: link
```

### Properties

| Property | Type   | Description              |
| -------- | ------ | ------------------------ |
| `author` | string | Author name(s)           |
| `date`   | string | Publication date or year |
| `url`    | string | Link to the source       |

### Examples

```intenttext
cite: The Pragmatic Programmer | author: Hunt, Thomas | date: 2019
cite: Structured Documents in Enterprise | author: Chen, Wei | date: 2025 | url: https://arxiv.org/example
```

---

## `def:`

**Category:** Content
**Since:** v2.11
**Aliases:** `define:`, `term:`, `glossary:`

Term definition. Use inline near the first use of a term, or group in a Definitions section as a glossary.

### Syntax

```
def: term | meaning: definition | abbr: abbreviation
```

### Properties

| Property  | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| `meaning` | string | yes      | The definition text     |
| `abbr`    | string | no       | Abbreviation or acronym |

### Examples

**Inline (near first use):**

```intenttext
note: The document enters the sealed state after freeze.
def: Sealed Document | meaning: A document whose content hash has been cryptographically locked. Any modification invalidates the seal.
```

**Grouped (formal glossary):**

```intenttext
section: Definitions
def: SLA | meaning: Service Level Agreement — the guaranteed uptime and response time commitments | abbr: SLA
def: Force Majeure | meaning: Unforeseeable circumstances that prevent a party from fulfilling contractual obligations
def: Net 30 | meaning: Payment is due within 30 calendar days of the invoice date
```

### Notes

- Validation error `DEF_MISSING_MEANING` if `meaning:` is not provided
- Queryable: `intenttext query . --type def` extracts all defined terms
- In legal documents, group `def:` blocks in a Definitions section for formal glossaries
- In technical docs, use `def:` inline near the first occurrence of the term

### Related

- [Definitions and Glossaries cookbook →](../../cookbook/data/definitions-and-glossaries)

---

## `figure:`

**Category:** Content
**Since:** v2.11
**Aliases:** `fig:`, `diagram:`, `chart:`

Numbered, captioned figure. Unlike `image:`, figures are formal elements with auto-numbering that can be referenced and that float in print layouts.

### Syntax

```
figure: caption | src: url | num: number | width: value | align: position | alt: text
```

### Properties

| Property  | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| `src`     | string | yes      | Image URL or file path                   |
| `caption` | string | no       | Caption text (content serves as default) |
| `num`     | number | no       | Figure number (auto-assigned if omitted) |
| `width`   | string | no       | Display width                            |
| `align`   | string | no       | `left`, `center`, `right`                |
| `alt`     | string | no       | Accessibility alt text                   |

### Examples

```intenttext
figure: Document lifecycle | src: ./images/lifecycle.png | num: 1 | caption: The complete trust lifecycle from draft to sealed.
figure: Query architecture | src: ./diagrams/query.png | num: 2 | align: center | width: 80%
```

### `image:` vs `figure:`

|                    | `image:`                  | `figure:`                         |
| ------------------ | ------------------------- | --------------------------------- |
| **Numbered**       | No                        | Yes (auto or manual)              |
| **Captioned**      | No                        | Yes                               |
| **Referenceable**  | No                        | Yes                               |
| **Print behavior** | Inline with text          | Floats                            |
| **Use case**       | Logo, icon, inline visual | Formal diagram, chart, photograph |

### Notes

- Validation error `FIGURE_MISSING_SRC` if `src:` is not provided
- Auto-numbering follows document order when `num:` is omitted
- In print rendering, figures float to maintain page flow

### Related

- [Figures and Captions cookbook →](../../cookbook/data/figures-and-captions)

---

## `contact:`

**Category:** Content
**Since:** v2.11
**Aliases:** `person:`, `party:`

Person or organization contact information. Queryable across files — your documents become a contact directory.

### Syntax

```
contact: name | role: title | email: address | phone: number | org: company | url: website | address: location | preferred: method
```

### Properties

| Property    | Type   | Description              |
| ----------- | ------ | ------------------------ |
| `role`      | string | Job title or role        |
| `email`     | string | Email address            |
| `phone`     | string | Phone number             |
| `org`       | string | Organization name        |
| `address`   | string | Physical address         |
| `url`       | string | Website or profile URL   |
| `preferred` | string | Preferred contact method |

### Examples

```intenttext
contact: Ahmed Al-Rashid | role: CEO | email: ahmed@acme.com | org: Acme Corp | phone: +971-4-555-0100
contact: Sarah Chen | role: General Counsel | email: sarah@acme.com | org: Acme Corp | preferred: email
contact: GlobalTech Inc. | role: Vendor | url: https://globaltech.co | address: 100 Market St, San Francisco
```

### Notes

- Validation error `CONTACT_NO_REACH` if none of `email:`, `phone:`, or `url:` is provided
- Queryable: `intenttext query ./contracts --type contact --org "Acme"` finds all Acme contacts
- Use in any document — contracts, invoices, reports — to build a queryable contact directory

### Related

- [Contact Directory cookbook →](../../cookbook/organizations/contact-directory)
