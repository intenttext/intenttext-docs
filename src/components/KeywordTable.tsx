import React, { useState, useMemo } from "react";
import Link from "@docusaurus/Link";

interface Keyword {
  name: string;
  category: string;
  since: string;
  description: string;
  properties: string;
  link: string;
}

const ALL_KEYWORDS: Keyword[] = [
  // Document Identity
  {
    name: "title",
    category: "Identity",
    since: "v1.0",
    description: "Document title — renders as H1",
    properties: "—",
    link: "/docs/reference/keywords/document-identity#title",
  },
  {
    name: "summary",
    category: "Identity",
    since: "v1.0",
    description: "Brief document description",
    properties: "—",
    link: "/docs/reference/keywords/document-identity#summary",
  },
  {
    name: "meta",
    category: "Identity",
    since: "v2.8.1",
    description: "Document metadata key-value pairs",
    properties: "type, author, date, version, lang, license, domain, tags",
    link: "/docs/reference/keywords/document-identity#meta",
  },
  {
    name: "context",
    category: "Identity",
    since: "v2.0",
    description: "Agent execution context",
    properties: "agent, goal, constraints",
    link: "/docs/reference/keywords/document-identity#context",
  },
  {
    name: "track",
    category: "Identity",
    since: "v2.8",
    description: "Activate document history tracking",
    properties: "version, by",
    link: "/docs/reference/keywords/document-identity#track",
  },

  // Content
  {
    name: "note",
    category: "Content",
    since: "v1.0",
    description: "General text block — the default keyword",
    properties: "style properties",
    link: "/docs/reference/keywords/content#note",
  },
  {
    name: "quote",
    category: "Content",
    since: "v1.0",
    description: "Block quotation",
    properties: "citation, source, reference",
    link: "/docs/reference/keywords/content#quote",
  },
  {
    name: "warning",
    category: "Content",
    since: "v1.0",
    description: "Warning or caution block",
    properties: "—",
    link: "/docs/reference/keywords/content#warning",
  },
  {
    name: "tip",
    category: "Content",
    since: "v1.0",
    description: "Helpful tip or suggestion",
    properties: "—",
    link: "/docs/reference/keywords/content#tip",
  },
  {
    name: "code",
    category: "Content",
    since: "v1.0",
    description: "Code block with optional language",
    properties: "lang",
    link: "/docs/reference/keywords/content#code",
  },
  {
    name: "image",
    category: "Content",
    since: "v1.0",
    description: "Inline image — no caption, no number",
    properties: "src, alt, width",
    link: "/docs/reference/keywords/content#image",
  },
  {
    name: "link",
    category: "Content",
    since: "v1.0",
    description: "Hyperlink",
    properties: "url, title",
    link: "/docs/reference/keywords/content#link",
  },
  {
    name: "cite",
    category: "Content",
    since: "v1.0",
    description: "Source citation",
    properties: "url, author, date",
    link: "/docs/reference/keywords/content#cite",
  },
  {
    name: "def",
    category: "Content",
    since: "v2.11",
    description: "Term definition — inline or glossary entry",
    properties: "meaning, abbr",
    link: "/docs/reference/keywords/content#def",
  },
  {
    name: "figure",
    category: "Content",
    since: "v2.11",
    description: "Numbered, captioned figure",
    properties: "src, caption, num, width, align, alt",
    link: "/docs/reference/keywords/content#figure",
  },
  {
    name: "contact",
    category: "Content",
    since: "v2.11",
    description: "Person or organization contact info",
    properties: "role, email, phone, org, address, url, preferred",
    link: "/docs/reference/keywords/content#contact",
  },

  // Structure
  {
    name: "section",
    category: "Structure",
    since: "v1.0",
    description: "Section heading — renders as H2",
    properties: "—",
    link: "/docs/reference/keywords/structure#section",
  },
  {
    name: "sub",
    category: "Structure",
    since: "v1.0",
    description: "Subsection heading — renders as H3",
    properties: "—",
    link: "/docs/reference/keywords/structure#sub",
  },
  {
    name: "break",
    category: "Structure",
    since: "v1.0",
    description: "Visual or page break",
    properties: "before, keep",
    link: "/docs/reference/keywords/structure#break",
  },
  {
    name: "group",
    category: "Structure",
    since: "v1.0",
    description: "Logical grouping of blocks",
    properties: "—",
    link: "/docs/reference/keywords/structure#group",
  },
  {
    name: "ref",
    category: "Structure",
    since: "v2.11",
    description: "Cross-document reference with typed relationship",
    properties: "file, url, rel, section, at",
    link: "/docs/reference/keywords/structure#ref",
  },
  {
    name: "deadline",
    category: "Structure",
    since: "v2.11",
    description: "Date-bound milestone or due date",
    properties: "date, consequence, authority, ref, owner, reminder",
    link: "/docs/reference/keywords/structure#deadline",
  },

  // Data
  {
    name: "input",
    category: "Data",
    since: "v1.3",
    description: "Declared input parameter",
    properties: "type, required, default",
    link: "/docs/reference/keywords/data#input",
  },
  {
    name: "output",
    category: "Data",
    since: "v1.3",
    description: "Declared output parameter",
    properties: "type, format",
    link: "/docs/reference/keywords/data#output",
  },
  {
    name: "table",
    category: "Data",
    since: "v1.0",
    description: "Data table — pipe-delimited rows",
    properties: "each",
    link: "/docs/reference/keywords/data#table",
  },
  {
    name: "metric",
    category: "Data",
    since: "v2.11",
    description: "Quantitative measurement or KPI",
    properties: "value, unit, period, as-of, target, trend, owner, source",
    link: "/docs/reference/keywords/data#metric",
  },

  // Agent
  {
    name: "step",
    category: "Agent",
    since: "v2.0",
    description: "Workflow step — the basic unit of agent work",
    properties: "id, tool, input, output, depends, timeout, retry",
    link: "/docs/reference/keywords/agent#step",
  },
  {
    name: "gate",
    category: "Agent",
    since: "v2.3",
    description: "Conditional checkpoint — blocks until condition met",
    properties: "condition, timeout, fallback",
    link: "/docs/reference/keywords/agent#gate",
  },
  {
    name: "trigger",
    category: "Agent",
    since: "v2.0",
    description: "Event-based activation",
    properties: "event, source, filter",
    link: "/docs/reference/keywords/agent#trigger",
  },
  {
    name: "emit",
    category: "Agent",
    since: "v2.3",
    description: "Emit an event or status signal",
    properties: "event, data",
    link: "/docs/reference/keywords/agent#emit",
  },
  {
    name: "decision",
    category: "Agent",
    since: "v2.0",
    description: "Conditional branching",
    properties: "if, then, else",
    link: "/docs/reference/keywords/agent#decision",
  },
  {
    name: "context",
    category: "Agent",
    since: "v2.0",
    description: "Agent execution context",
    properties: "agent, goal, constraints",
    link: "/docs/reference/keywords/agent#context",
  },
  {
    name: "memory",
    category: "Agent",
    since: "v2.0",
    description: "Agent memory or state",
    properties: "scope, ttl",
    link: "/docs/reference/keywords/agent#memory",
  },
  {
    name: "prompt",
    category: "Agent",
    since: "v2.0",
    description: "Prompt template for LLM",
    properties: "model, temperature",
    link: "/docs/reference/keywords/agent#prompt",
  },
  {
    name: "tool",
    category: "Agent",
    since: "v2.0",
    description: "External tool declaration",
    properties: "api, method, auth",
    link: "/docs/reference/keywords/agent#tool",
  },
  {
    name: "audit",
    category: "Agent",
    since: "v2.0",
    description: "Audit log entry",
    properties: "by, at, action",
    link: "/docs/reference/keywords/agent#audit",
  },
  {
    name: "done",
    category: "Agent",
    since: "v2.0",
    description: "Completion marker",
    properties: "status, output",
    link: "/docs/reference/keywords/agent#done",
  },
  {
    name: "error",
    category: "Agent",
    since: "v2.0",
    description: "Error record",
    properties: "code, severity, retry",
    link: "/docs/reference/keywords/agent#error",
  },

  // Trust
  {
    name: "approve",
    category: "Trust",
    since: "v2.8",
    description: "Approval stamp",
    properties: "by, role, at, ref",
    link: "/docs/reference/keywords/trust#approve",
  },
  {
    name: "sign",
    category: "Trust",
    since: "v2.8",
    description: "Cryptographic digital signature",
    properties: "role, at, hash",
    link: "/docs/reference/keywords/trust#sign",
  },
  {
    name: "freeze",
    category: "Trust",
    since: "v2.8",
    description: "Seal document — no further edits",
    properties: "at, hash, status",
    link: "/docs/reference/keywords/trust#freeze",
  },
  {
    name: "revision",
    category: "Trust",
    since: "v2.8",
    description: "Auto-generated change record",
    properties: "version, at, by, change, id, block, section, was, now",
    link: "/docs/reference/keywords/trust#revision",
  },
  {
    name: "policy",
    category: "Trust",
    since: "v2.7",
    description: "Enforceable constraint or rule",
    properties: "scope, enforce",
    link: "/docs/reference/keywords/trust#policy",
  },
  {
    name: "amendment",
    category: "Trust",
    since: "v2.11",
    description: "Formal change to a frozen document",
    properties: "section, was, now, ref, by, at, approved-by, hash",
    link: "/docs/reference/keywords/trust#amendment",
  },

  // Layout
  {
    name: "page",
    category: "Layout",
    since: "v1.0",
    description: "Page size, margins, orientation",
    properties: "size, margins, orientation, columns, numbering",
    link: "/docs/reference/keywords/layout#page",
  },
  {
    name: "font",
    category: "Layout",
    since: "v1.0",
    description: "Typography settings",
    properties: "family, size, leading, weight, heading, mono",
    link: "/docs/reference/keywords/layout#font",
  },
  {
    name: "header",
    category: "Layout",
    since: "v2.9",
    description: "Page header (print)",
    properties: "left, center, right, skip-first",
    link: "/docs/reference/keywords/layout#header",
  },
  {
    name: "footer",
    category: "Layout",
    since: "v2.9",
    description: "Page footer (print)",
    properties: "left, center, right, skip-first",
    link: "/docs/reference/keywords/layout#footer",
  },
  {
    name: "watermark",
    category: "Layout",
    since: "v2.9",
    description: "Background watermark (print)",
    properties: "color, angle, size",
    link: "/docs/reference/keywords/layout#watermark",
  },
  {
    name: "signline",
    category: "Layout",
    since: "v2.11",
    description: "Physical signature line for print",
    properties: "name, role, date-line, org, width, label",
    link: "/docs/reference/keywords/layout#signline",
  },
];

const CATEGORIES = [
  "All",
  "Identity",
  "Content",
  "Structure",
  "Data",
  "Agent",
  "Trust",
  "Layout",
];

export default function KeywordTable(): React.ReactElement {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortField, setSortField] = useState<"name" | "category" | "since">(
    "name",
  );
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let result = ALL_KEYWORDS;
    if (category !== "All") {
      result = result.filter((k) => k.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (k) =>
          k.name.toLowerCase().includes(q) ||
          k.description.toLowerCase().includes(q) ||
          k.properties.toLowerCase().includes(q),
      );
    }
    result = [...result].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = aVal.localeCompare(bVal);
      return sortAsc ? cmp : -cmp;
    });
    return result;
  }, [search, category, sortField, sortAsc]);

  const handleSort = (field: "name" | "category" | "since") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const arrow = (field: string) =>
    sortField === field ? (sortAsc ? " ↑" : " ↓") : "";

  return (
    <div className="keyword-table">
      <div className="keyword-table-filters">
        <input
          type="text"
          placeholder="Search keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <span
          style={{
            alignSelf: "center",
            color: "var(--ifm-color-emphasis-600)",
            fontSize: "0.9rem",
          }}
        >
          {filtered.length} of {ALL_KEYWORDS.length} keywords
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Keyword{arrow("name")}</th>
            <th onClick={() => handleSort("category")}>
              Category{arrow("category")}
            </th>
            <th onClick={() => handleSort("since")}>Since{arrow("since")}</th>
            <th>Description</th>
            <th>Properties</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((k) => (
            <tr key={k.name}>
              <td>
                <Link to={k.link}>
                  <code>{k.name}:</code>
                </Link>
              </td>
              <td>
                <span
                  className={`keyword-badge keyword-badge--${k.category.toLowerCase()}`}
                >
                  {k.category}
                </span>
              </td>
              <td>{k.since}</td>
              <td>{k.description}</td>
              <td style={{ fontSize: "0.85rem" }}>{k.properties}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
