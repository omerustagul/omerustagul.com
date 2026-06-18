/* Shared faithful page header (pages.css .page__head). */
export function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <header className="page__head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {sub && <p>{sub}</p>}
    </header>
  );
}
