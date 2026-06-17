// F0 smoke-test page — proves the Marka token system loads in Next.js.
// Real homepage sections (F4) will replace this.
export default function Home() {
  return (
    <main
      className="u-container"
      style={{ paddingBlock: "var(--section-y, 6rem)" }}
    >
      <p className="u-label" style={{ marginBottom: "1rem" }}>
        F0 · SCAFFOLD
      </p>
      <h1
        style={{
          fontSize: "var(--fs-display, clamp(2.5rem, 6vw, 5rem))",
          letterSpacing: "var(--ls-display, -0.03em)",
          maxWidth: "16ch",
        }}
      >
        Marka<span style={{ color: "var(--accent)" }}>.</span> Dijitalde yeni
        standart.
      </h1>
      <p
        style={{
          marginTop: "1.5rem",
          color: "var(--text-muted)",
          maxWidth: "48ch",
        }}
      >
        Next.js 16 + Prisma + PostgreSQL iskeleti hazır. Tasarım token sistemi
        (<code>src/styles/marka.css</code>) yüklendi. Sıradaki adımlar için{" "}
        <code>MIGRATION.md</code> yol haritasına bakın.
      </p>
    </main>
  );
}
