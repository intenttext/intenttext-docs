---
sidebar_position: 7
title: Trust Keywords
---

# Trust Keywords

Keywords for document integrity — approvals, signatures, sealing, history, policy enforcement, and formal amendments.

## `approve:`

**Category:** Trust
**Since:** v2.8

Named approval stamp. Records who approved the document, their role, and when.

### Syntax

```
approve: description | by: name | role: title | at: timestamp | ref: reference
```

### Properties

| Property | Type   | Required | Description                                 |
| -------- | ------ | -------- | ------------------------------------------- |
| `by`     | string | yes      | Approver name                               |
| `role`   | string | no       | Approver's role or title                    |
| `at`     | string | no       | Approval timestamp (ISO 8601)               |
| `ref`    | string | no       | Reference to approval authority or document |

### Examples

```intenttext
approve: Legal review complete | by: Sarah Chen | role: General Counsel | at: 2026-03-05
approve: Finance approved | by: James Miller | role: CFO | at: 2026-03-06
approve: Compliance review | by: Maria Santos | role: Compliance Officer | ref: Policy CMP-2026-01
```

### Notes

- Multiple `approve:` blocks are common — legal, finance, compliance, management
- Requires `track:` to be set first
- Queryable: `intenttext query . --type approve --by "Sarah Chen"`

---

## `sign:`

**Category:** Trust
**Since:** v2.8

Integrity hash seal. Records the signer's name, role, timestamp, and a SHA-256 hash of the document body at the time of signing. If the document is modified after signing, the stored hash will no longer match and verification will report the discrepancy. This is tamper evidence via hash comparison, not cryptographic non-repudiation (there are no private keys or PKI).

### Syntax

```
sign: signer name | role: title | at: timestamp | hash: algorithm:value
```

### Properties

| Property | Type   | Required | Description                     |
| -------- | ------ | -------- | ------------------------------- |
| `role`   | string | no       | Signer's role                   |
| `at`     | string | no       | Signing timestamp (ISO 8601)    |
| `hash`   | string | no       | Content hash at time of signing |

### Examples

```intenttext
sign: Ahmed Al-Rashid | role: CEO | at: 2026-03-06T14:32:00Z | hash: sha256:a1b2c3d4e5f6
sign: James Miller | role: CFO | at: 2026-03-06T15:00:00Z
```

### `sign:` vs `signline:`

|                  | `sign:`                                      | `signline:`                             |
| ---------------- | -------------------------------------------- | --------------------------------------- |
| **Type**         | Digital                                      | Physical                                |
| **Verification** | SHA-256 hash comparison — machine-verifiable | Visual line on paper — human-verifiable |
| **Lives in**     | The `.it` file permanently                   | The printed/PDF output                  |
| **Queryable**    | Yes                                          | Yes                                     |
| **Use case**     | File integrity verification                  | Paper contract signatures               |

Use both when a contract needs digital verification _and_ paper signatures.

---

## `freeze:`

**Category:** Trust
**Since:** v2.8
**Aliases:** `lock:`

Seal the document. After `freeze:`, any edit to the content above invalidates the hash.

### Syntax

```
freeze: | status: locked | at: timestamp | hash: algorithm:value
```

### Properties

| Property | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| `status` | string | `locked`                            |
| `at`     | string | Sealing timestamp (ISO 8601)        |
| `hash`   | string | Content hash of the frozen document |

### Examples

```intenttext
freeze: | status: locked | at: 2026-03-06T14:33:00Z | hash: sha256:e5f6a7b8
```

### Notes

- `freeze:` content is typically empty — data is in properties
- After freezing, the only permitted additions are `amendment:` blocks
- Use `intenttext seal` to compute the hash and add `sign:` + `freeze:` automatically
- Use `intenttext verify` to check the hash against current content

---

## `revision:`

**Category:** Trust
**Since:** v2.8

Auto-generated change record. Appears below the `history:` boundary. Managed by the CLI — you don't write these manually.

### Syntax

```
revision: | version: value | at: timestamp | by: author | change: description | id: block_id | block: type | section: name | was: old_value | now: new_value
```

### Properties

| Property  | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `version` | string | Version identifier                |
| `at`      | string | When the change was made          |
| `by`      | string | Who made the change               |
| `change`  | string | Description of what changed       |
| `id`      | string | Block identifier                  |
| `block`   | string | Block type that changed           |
| `section` | string | Section where the change occurred |
| `was`     | string | Previous value                    |
| `now`     | string | New value                         |

### Examples

```intenttext
history:
revision: | version: 1.0 | at: 2026-03-01 | by: Ahmed | change: Initial draft
revision: | version: 1.1 | at: 2026-03-03 | by: Sarah | change: Legal review — clause 4.2 updated | section: Payment | was: Net 30 | now: Net 15
revision: | version: 1.2 | at: 2026-03-05 | by: Ahmed | change: Final edits
```

### Notes

- Always below the `history:` boundary
- Generated by the CLI, not written by hand
- Queryable with `intenttext history`

---

## `history:`

**Category:** Trust
**Since:** v2.12

History boundary marker. Separates the live document from its machine-managed history section. Produces no rendered output — it is a structural marker only.

### Syntax

```
history:
```

### Examples

```intenttext
title: Service Agreement
text: Terms and conditions...

approve: Legal review | by: Sarah Chen | role: General Counsel
sign: Ahmed Al-Rashid | role: CEO | hash: sha256:a1b2c3d4
freeze: | status: locked | hash: sha256:e5f6a7b8

history:
revision: | version: 1.0 | at: 2026-03-01 | by: Ahmed | change: Initial draft
revision: | version: 1.1 | at: 2026-03-03 | by: Sarah | change: Legal review
```

### Notes

- Written automatically by `intenttext seal` and `intenttext amend` — never by the user
- Everything above `history:` is the document. Everything below is machine-managed history
- Renderers ignore the history section — it is not visible in HTML or print output
- `intenttext history <file>` reads the content after this marker
- If `history:` is present but no `freeze:` block exists, the parser emits a `HISTORY_WITHOUT_FREEZE` warning
- Replaces the old `---` + `// history` pattern from v2.11 and earlier

### Backward compatibility

The old two-line pattern (`---` followed by `// history`) is still recognized by the parser but emits a `LEGACY_HISTORY_BOUNDARY` diagnostic warning. New documents always use `history:`.

### Related

- [`freeze:`](#freeze) — seals the document before history
- [`revision:`](#revision) — auto-generated entries below `history:`
- [Migrating to v2.12 →](../../guide/migrating-to-v212)
- [Audit Trail cookbook →](../../cookbook/trust/audit-trail)

---

## `policy:`

**Category:** Trust
**Since:** v2.7
**Aliases:** `rule:`, `constraint:`, `guard:`, `requirement:`

Enforceable constraint or rule. Declares policies that agents and workflows must follow.

### Syntax

```
policy: description | if: condition | always: rule | never: rule | action: response | requires: block_type | notify: target
```

### Properties

| Property   | Type      | Required                        | Description                                       |
| ---------- | --------- | ------------------------------- | ------------------------------------------------- |
| `if`       | condition | one of if/always/never required | Conditional rule — applies when condition is true |
| `always`   | rule      | one of if/always/never required | Rule that applies unconditionally                 |
| `never`    | rule      | one of if/always/never required | Rule that must never be violated                  |
| `action`   | response  | yes (if `if:` is set)           | What happens when the policy triggers             |
| `requires` | string    | no                              | Mandates presence of a specific block type        |
| `notify`   | string    | no                              | Who to alert when the policy triggers             |
| `priority` | number    | no                              | Evaluation order (lower = higher priority)        |

### Examples

```intenttext
policy: No production changes during business hours | always: require-approval | action: block | notify: ops-team
policy: All contracts require legal review | requires: approve | action: block
policy: Prefer email for initial contact | always: log-reminder | notify: sender
```

---

## `amendment:`

**Category:** Trust
**Since:** v2.11
**Aliases:** `amend:`, `change:`

Formal change to a frozen document. Preserves the original seal while recording what was changed, where, who authorized it, and when.

### Syntax

```
amendment: description | section: target | was: previous | now: current | ref: identifier | by: author | at: timestamp | approved-by: approver | hash: value
```

### Properties

| Property      | Type   | Required | Description                    |
| ------------- | ------ | -------- | ------------------------------ |
| `section`     | string | yes      | Which section was amended      |
| `was`         | string | no       | The previous value or text     |
| `now`         | string | yes      | The new value or text          |
| `ref`         | string | no       | Amendment reference identifier |
| `by`          | string | no       | Who authored the amendment     |
| `at`          | string | no       | Amendment timestamp            |
| `approved-by` | string | no       | Who approved the amendment     |
| `hash`        | string | no       | Hash of the amendment block    |

### Examples

```intenttext
amendment: Payment terms updated | section: Payment | was: Net 30 | now: Net 15 | ref: Amendment #1 | by: Ahmed Al-Rashid | approved-by: Sarah Chen
amendment: Scope extended | section: Scope | now: Includes Phase 2 deliverables | ref: Amendment #2 | by: Ahmed Al-Rashid | at: 2026-04-01
amendment: Contact updated | section: Parties | was: j.miller@old.co | now: j.miller@globaltech.co | ref: Amendment #3
```

### The amendment model

Without `amendment:`, changing a frozen document means:

1. Breaking the seal (invalidating `freeze:` and `sign:`)
2. Making edits
3. Re-approving
4. Re-signing
5. Re-freezing

All original signatures are voided. The audit trail has a gap.

With `amendment:`:

- The original seal is **preserved**
- The amendment is **additive** — it records the change alongside the sealed content
- Each amendment can have its own approval chain (`approved-by:`)
- `intenttext verify` reports both the original seal status and all amendments

### CLI

```bash
intenttext amend contract.it \
  --section "Payment" \
  --was "Net 30" \
  --now "Net 15" \
  --ref "Amendment #1" \
  --by "Ahmed Al-Rashid"
```

### Notes

- Validation error `AMENDMENT_WITHOUT_FREEZE` if the document has no `freeze:` block
- Amendments appear after `freeze:` but before the `history:` boundary
- Each amendment is independently queryable
- This is the page every lawyer will read: amendments preserve the evidentiary chain

### Related

- [`freeze:`](#freeze) — amendments require a frozen document
- [Amending Frozen Documents cookbook →](../../cookbook/trust/amending-frozen-docs)
- [Trust & Signing guide →](../../guide/trust-and-signing)
