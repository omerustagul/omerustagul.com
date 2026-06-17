import React from "react";

const CSS = `
.mk-secthead{
  display:flex; align-items:flex-end; justify-content:space-between; gap:2rem;
  padding-bottom:var(--space-5); flex-wrap:wrap;
}
.mk-secthead__main{ display:flex; flex-direction:column; gap:1rem; max-width:46ch; }
.mk-secthead__eyebrow{
  display:inline-flex; align-items:center; gap:.6ch;
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--text-muted);
}
.mk-secthead__eyebrow::before{ content:""; width:24px; height:1px; background:var(--accent); }
.mk-secthead__title{ font-size:var(--fs-h1); font-weight:var(--fw-semibold); letter-spacing:var(--ls-heading); }
.mk-secthead__sub{ color:var(--text-muted); font-size:var(--fs-lead); }
.mk-secthead__link{
  display:inline-flex; align-items:center; gap:.5ch; flex:none;
  font-family:var(--font-mono); font-size:var(--fs-meta); letter-spacing:.04em;
  color:var(--text); padding-bottom:2px; border-bottom:1px solid var(--border-strong);
  transition: gap var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.mk-secthead__link:hover{ gap:1ch; color:var(--accent-hover); border-color:var(--accent); }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "secthead");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Section header: mono eyebrow + big title + optional "Tümünü Gör" link. */
export function SectionHeading({ eyebrow, title, subtitle, linkText, linkHref = "#", className = "", ...rest }) {
  ensureStyle();
  return (
    <header className={["mk-secthead", className].filter(Boolean).join(" ")} {...rest}>
      <div className="mk-secthead__main">
        {eyebrow && <span className="mk-secthead__eyebrow">{eyebrow}</span>}
        {title && <h2 className="mk-secthead__title">{title}</h2>}
        {subtitle && <p className="mk-secthead__sub">{subtitle}</p>}
      </div>
      {linkText && (
        <a className="mk-secthead__link" href={linkHref}>
          {linkText}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </header>
  );
}
