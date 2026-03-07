import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";

const LANDING_EXAMPLE = `title: Service Agreement
summary: Consulting services Q2 2026
meta: | client: Acme Corp | ref: CONTRACT-2026-042
track: | version: 1.0 | by: Ahmed

section: Scope
note: Consulting services April–June 2026
note: Value: USD 24,000 | weight: bold
deadline: Payment due | date: 2026-04-30 | consequence: Late fee applies

section: Parties
contact: Ahmed Al-Rashid | role: CEO | email: ahmed@acme.com | org: Acme Corp
contact: James Miller | role: COO | email: j.miller@client.co | org: Client Co.

approve: Reviewed by legal | by: Sarah Chen | role: Legal Counsel
sign: Ahmed Al-Rashid | role: CEO | at: 2026-03-06T14:32:00Z
freeze: | status: locked`;

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      {/* Hero */}
      <div className="hero-section">
        <div className="container">
          <h1>Documents that think.</h1>
          <p>
            IntentText (<code>.it</code>) is an open format for structured
            documents — readable by humans, queryable by code, trustworthy by
            design.
          </p>
          <div className="hero-buttons">
            <Link
              className="button button--primary button--lg"
              to="/docs/guide/quick-start"
            >
              Get started →
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://intenttext-hub.vercel.app"
            >
              Browse templates
            </Link>
          </div>
        </div>
      </div>

      {/* Live Example */}
      <div className="container" style={{ padding: "2rem 0 4rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          One format. Every audience.
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--ifm-color-emphasis-700)",
            marginBottom: "2rem",
          }}
        >
          55 keywords. Human-readable. Machine-queryable. Legally sealable.
        </p>
        <div className="live-example">
          <div className="live-source">
            <CodeBlock language="bash">{LANDING_EXAMPLE}</CodeBlock>
          </div>
          <div className="live-render">
            <h3 style={{ margin: "0 0 0.25rem" }}>Service Agreement</h3>
            <p
              style={{
                color: "#6b7280",
                fontStyle: "italic",
                margin: "0 0 0.5rem",
                fontSize: "0.9rem",
              }}
            >
              Consulting services Q2 2026
            </p>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
                marginBottom: "0.75rem",
              }}
            >
              <span style={{ marginRight: "1rem" }}>client: Acme Corp</span>
              <span>ref: CONTRACT-2026-042</span>
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "#6b7280",
                background: "#f1f5f9",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                marginBottom: "0.75rem",
              }}
            >
              📋 Tracked — version: 1.0 — by: Ahmed
            </div>
            <h4
              style={{
                margin: "0.75rem 0 0.25rem",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "0.25rem",
              }}
            >
              Scope
            </h4>
            <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
              Consulting services April–June 2026
            </p>
            <p
              style={{
                margin: "0.25rem 0",
                fontSize: "0.9rem",
                fontWeight: 700,
              }}
            >
              Value: USD 24,000
            </p>
            <div
              style={{
                padding: "0.5rem",
                margin: "0.25rem 0",
                background: "#fef3c7",
                borderLeft: "3px solid #f59e0b",
                borderRadius: "0 4px 4px 0",
                fontSize: "0.85rem",
              }}
            >
              ⏰ <strong>Payment due</strong> — 2026-04-30
            </div>
            <h4
              style={{
                margin: "0.75rem 0 0.25rem",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "0.25rem",
              }}
            >
              Parties
            </h4>
            <div
              style={{
                padding: "0.5rem",
                margin: "0.25rem 0",
                background: "#f9fafb",
                borderRadius: "4px",
                fontSize: "0.85rem",
              }}
            >
              <strong>Ahmed Al-Rashid</strong>{" "}
              <span style={{ color: "#6b7280" }}>— CEO at Acme Corp</span>
              <div style={{ fontSize: "0.75rem", color: "#3b82f6" }}>
                ahmed@acme.com
              </div>
            </div>
            <div
              style={{
                padding: "0.5rem",
                margin: "0.25rem 0",
                background: "#f9fafb",
                borderRadius: "4px",
                fontSize: "0.85rem",
              }}
            >
              <strong>James Miller</strong>{" "}
              <span style={{ color: "#6b7280" }}>— COO at Client Co.</span>
              <div style={{ fontSize: "0.75rem", color: "#3b82f6" }}>
                j.miller@client.co
              </div>
            </div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
              <div style={{ color: "#16a34a" }}>
                ✅ Reviewed by legal — Sarah Chen, Legal Counsel
              </div>
              <div style={{ color: "#2563eb" }}>
                🔏 Signed by Ahmed Al-Rashid — CEO
              </div>
              <div style={{ color: "#dc2626", fontWeight: 600 }}>
                🔒 Document sealed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Audiences */}
      <div
        style={{
          background: "var(--ifm-color-emphasis-100)",
          padding: "3rem 0",
        }}
      >
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Built for three audiences
          </h2>
          <div className="audience-grid">
            <div className="audience-card">
              <h3>🏢 Organizations</h3>
              <p>
                Contracts, policies, reports — all in queryable <code>.it</code>{" "}
                files. Find every deadline across 500 documents. Track who
                approved what. Seal contracts with cryptographic trust. Amend
                without voiding signatures.
              </p>
              <Link to="/docs/guide/for-organizations">
                For organizations →
              </Link>
            </div>
            <div className="audience-card">
              <h3>🤖 AI Agents</h3>
              <p>
                12 workflow keywords. Pipeline definitions agents can read and
                execute. Gates, decisions, handoffs. An MCP server ships ready.
                Agents produce <code>.it</code> files, not just Markdown.
              </p>
              <Link to="/docs/guide/for-agents">For agents →</Link>
            </div>
            <div className="audience-card">
              <h3>✍️ Writers</h3>
              <p>
                Write in plain text. Get professional output. 8 built-in themes
                — corporate, editorial, legal, minimal. Figures with
                auto-numbering. Citations. PDF export in one command.
              </p>
              <Link to="/docs/guide/for-writers">For writers →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem */}
      <div className="container" style={{ padding: "3rem 0" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          The ecosystem
        </h2>
        <div className="ecosystem-grid">
          <div className="ecosystem-item">
            <strong>npm</strong>
            <span style={{ fontSize: "0.85rem" }}>@intenttext/core</span>
          </div>
          <div className="ecosystem-item">
            <strong>PyPI</strong>
            <span style={{ fontSize: "0.85rem" }}>intenttext</span>
          </div>
          <div className="ecosystem-item">
            <strong>CLI</strong>
            <span style={{ fontSize: "0.85rem" }}>Parse, render, seal</span>
          </div>
          <div className="ecosystem-item">
            <strong>MCP Server</strong>
            <span style={{ fontSize: "0.85rem" }}>For AI agents</span>
          </div>
          <div className="ecosystem-item">
            <strong>VS Code</strong>
            <span style={{ fontSize: "0.85rem" }}>Syntax + snippets</span>
          </div>
          <div className="ecosystem-item">
            <strong>Hub</strong>
            <span style={{ fontSize: "0.85rem" }}>76 templates, 8 themes</span>
          </div>
          <div className="ecosystem-item">
            <strong>Editor</strong>
            <span style={{ fontSize: "0.85rem" }}>Web-based, no CLI</span>
          </div>
          <div className="ecosystem-item">
            <strong>GitHub Action</strong>
            <span style={{ fontSize: "0.85rem" }}>CI validation</span>
          </div>
        </div>
      </div>

      {/* Trust */}
      <div
        style={{
          background: "var(--ifm-color-emphasis-100)",
          padding: "3rem 0",
        }}
      >
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Trust, built in
          </h2>
          <div className="trust-steps">
            <div className="trust-step">
              <h3>1. Approve & Sign</h3>
              <p>
                Named approvals and cryptographic signatures live in the
                document itself. Not in metadata. Not in a separate system.
              </p>
            </div>
            <div className="trust-step">
              <h3>2. Seal</h3>
              <p>
                One command: <code>intenttext seal</code>. The document is
                frozen. Any tampering breaks the hash. Verify anytime.
              </p>
            </div>
            <div className="trust-step">
              <h3>3. Amend</h3>
              <p>
                Frozen documents can be formally amended. The original seal is
                preserved. The amendment carries its own approval chain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div
        className="container"
        style={{ padding: "3rem 0", textAlign: "center" }}
      >
        <h2>Start writing documents that think.</h2>
        <p
          style={{
            color: "var(--ifm-color-emphasis-700)",
            marginBottom: "2rem",
          }}
        >
          Open format. No lock-in. The <code>.it</code> file is yours.
        </p>
        <div className="hero-buttons">
          <Link
            className="button button--primary button--lg"
            to="/docs/guide/quick-start"
          >
            Get started →
          </Link>
          <Link
            className="button button--secondary button--lg"
            href="https://intenttext-hub.vercel.app"
          >
            Browse the Hub
          </Link>
        </div>
      </div>
    </Layout>
  );
}
