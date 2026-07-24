import Link from "next/link";

const CARDS = [
  { href: "/md", title: "Doctrine", desc: "Les règles UX/UI et les tokens — la source d'autorité." },
  { href: "/ui", title: "Composants", desc: "L'atelier @sibyl/react — les composants vivants." },
  { href: "/audit", title: "Audit", desc: "Protocoles d'audit et règles condensées." },
];

export default function Portal() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px" }}>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 600, marginBottom: 8 }}>Sibyl DS</h1>
      <p style={{ color: "var(--text-secondary)", marginTop: 0 }}>
        Un design system, trois sections, un seul shell. Choisis une entrée.
      </p>
      <div style={{ display: "grid", gap: 12, marginTop: 32 }}>
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              display: "block", padding: "18px 20px", borderRadius: 10,
              border: "1px solid var(--border)", color: "var(--text-primary)", textDecoration: "none",
            }}
          >
            <strong>{c.title}</strong>
            <div style={{ color: "var(--text-secondary)", fontSize: ".9rem", marginTop: 4 }}>{c.desc}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
