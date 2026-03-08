---
sidebar_position: 3
title: Content Keywords
---

# Content Keywords

Keywords for the actual content of your document — text, quotes, callouts, images, definitions, figures, contacts, and writer blocks.

## `text:`

**Category:** Content
**Since:** v1.0
**Aliases:** `note:`, `body:`, `content:`, `paragraph:`, `p:`

General body text — the default block type. Not a callout; for callouts use `info:`, `tip:`, `warning:`, `danger:`.

### Syntax

```
text: content | style-properties
```

### Examples

```intenttext
text: The project is on track for a June delivery.
text: Total contract value: USD 24,000 | weight: bold
text: Please review by end of week | color: #dc2626 | italic: true
```

### Notes

- Supports all [style properties](../style-properties)
- Supports [inline formatting](../style-properties#inline-formatting): `*bold*`, `_italic_`, `~strike~`, ` ```code``` `, `^highlight^`, `` `label` ``, `{Label}`
- `note:` is the most common alias — both `text:` and `note:` work identically

---

## `quote:`

**Category:** Content
**Since:** v1.0
**Aliases:** `blockquote:`, `excerpt:`, `pullquote:`

Block quotation with optional attribution.

### Syntax

```
quote: content | citation: source
```

### Properties

| Property   | Type   | Description      |
| ---------- | ------ | ---------------- |
| `citation` | string | Attribution text |

### Examples

```intenttext
quote: The best way to predict the future is to invent it. | citation: Alan Kay
quote: All documents should be machine-readable from birth. | citation: IntentText Manifesto
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

## `info:`

**Category:** Content
**Since:** v1.0

Informational callout block. Renders with a neutral-blue indicator.

### Syntax

```
info: content
```

### Examples

```intenttext
info: This document uses IntentText v2.13 format.
info: All timestamps are in UTC.
```

---

## `success:`

**Category:** Content
**Since:** v1.0

Success or confirmation callout block. Renders with a green indicator.

### Syntax

```
success: content
```

### Examples

```intenttext
success: Migration completed — 12,450 records transferred.
success: All tests passed. Ready for deployment.
```

---

## `danger:`

**Category:** Content
**Since:** v1.0
**Aliases:** `critical:`, `destructive:`

Danger callout — for irreversible actions or data loss risk. Renders with a strong red indicator.

### Syntax

```
danger: content
```

### Examples

```intenttext
danger: Deleting this record is irreversible.
danger: This action will permanently remove all associated data.
```

---

## `code:`

**Category:** Content
**Since:** v1.0
**Aliases:** `snippet:`

Code block with optional language for syntax highlighting. Use `code:` for both single-line and multi-line code. Everything inside the triple backticks is the value of `code:` — just like any other keyword's value.

### Syntax

**Single-line code** — wrap the value in triple backticks:

````
code: ```content``` | lang: language
````

**Multi-line code** — open with triple backticks, close on a separate line:

````
code: ```
line 1
line 2
``` | lang: language
````

**Plain single-line** (no backtick wrapper, for simple one-liners):

```
code: content | lang: language
```

### Properties

| Property | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| `lang`   | string | Programming language for highlighting |

Pipe properties go **after** the closing triple backticks, just like they go after content on any other keyword.

### Examples

**Single-line:**

````intenttext
code: ```const doc = parseIntentText(source);``` | lang: typescript
code: ```intenttext seal contract.it --signer "Ahmed"``` | lang: bash
````

**Multi-line:**

````intenttext
code: ```
def calculate_total(items):
    return sum(item.price for item in items)
``` | lang: python
````

````intenttext
code: ```
SELECT *
FROM users
WHERE active = true
``` | lang: sql
````

### Inline code

To include code inline within any text block, use triple backticks:

````intenttext
text: Call the ```render()``` function to generate output.
text: Set ```NODE_ENV=production``` before deploying.
````

Triple backticks render as `<code>` inline. For labels/badges, use single backticks — see [inline formatting](../style-properties#inline-formatting).

### Notes

- `code:` follows the same keyword pattern as every other IntentText keyword: `keyword: value | properties`
- The triple backticks delimit the code value — everything between ` ``` ` and ` ``` ` is the code content
- Properties (`| lang: js`, etc.) go after the closing ` ``` `, like any other pipe property
- Plain `code: content` (without backtick wrapper) still works for simple one-liners
- Standalone backtick fences (without `code:`) also work for backward compatibility
- Inline code within text uses triple backticks: ` ```code``` `

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
**Aliases:** `citation:`, `source:`, `reference:`

Bibliographic citation with author, date, and URL.

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
text: The document enters the sealed state after freeze.
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
**Aliases:** `fig:`, `diagram:`, `chart:`, `illustration:`, `visual:`

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
**Aliases:** `person:`, `party:`, `entity:`

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

---

## `byline:`

**Category:** Content
**Since:** v2.5

Author byline with date and publication. Typically appears below the title.

### Syntax

```
byline: author name | date: value | publication: name
```

### Properties

| Property      | Type   | Description             |
| ------------- | ------ | ----------------------- |
| `date`        | string | Publication date        |
| `publication` | string | Publication or org name |

### Examples

```intenttext
byline: Ahmed Al-Rashid | date: 2026-03-06 | publication: Acme Corp
byline: Sarah Chen | date: March 2026
```

---

## `epigraph:`

**Category:** Content
**Since:** v2.5

Introductory quotation at the start of a document or section. Styled differently from `quote:` — typically italic, right-aligned.

### Syntax

```
epigraph: content | attribution: source
```

### Properties

| Property      | Type   | Description      |
| ------------- | ------ | ---------------- |
| `attribution` | string | Source or author |

### Examples

```intenttext
epigraph: The document is the API. | attribution: IntentText Manifesto
epigraph: Begin with the end in mind. | attribution: Stephen Covey
```

---

## `caption:`

**Category:** Content
**Since:** v2.5

Figure or table caption. Typically paired with `figure:` or a data table.

### Syntax

```
caption: text
```

### Examples

```intenttext
caption: Figure 1 — Revenue trend over Q1–Q4 2025
caption: Table 2 — Contact directory for the legal department
```

---

## `footnote:`

**Category:** Content
**Since:** v2.5

Numbered footnote. Referenced inline with `[^n]` syntax.

### Syntax

```
footnote: content | id: identifier
```

### Properties

| Property | Type   | Description                               |
| -------- | ------ | ----------------------------------------- |
| `id`     | string | Footnote identifier for inline references |

### Examples

```intenttext
text: The agreement[^1] was signed on March 6th.
footnote: See Appendix A for the full agreement text. | id: 1
```

---

## `dedication:`

**Category:** Content
**Since:** v2.5

Document dedication page. Renders on its own page in print output.

### Syntax

```
dedication: content
```

### Examples

```intenttext
dedication: For the engineers who believe documents should be structured from birth.
```
