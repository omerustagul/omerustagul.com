import type { ReactNode } from "react";

export function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="u-container" style={{ paddingBlock: "clamp(3rem, 7vw, 6rem)" }}>
      {children}
    </section>
  );
}

export function CardGrid({ children, min = "15rem" }: { children: ReactNode; min?: string }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

/** Editorial page header: mono eyebrow + big title + optional lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header
      className="u-container"
      style={{ paddingBlock: "clamp(3rem, 8vw, 7rem) clamp(2rem, 4vw, 3rem)" }}
    >
      {eyebrow && (
        <p className="u-label" style={{ marginBottom: "1rem" }}>
          {eyebrow}
        </p>
      )}
      <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.97, maxWidth: "16ch" }}>
        {title}
      </h1>
      {lead && (
        <p style={{ marginTop: "1.5rem", maxWidth: "52ch", fontSize: "var(--fs-lead)", color: "var(--text-muted)" }}>
          {lead}
        </p>
      )}
    </header>
  );
}
