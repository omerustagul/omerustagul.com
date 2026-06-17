import React from "react";

const CSS = `
.mk-badge{
  display:inline-flex; align-items:center; gap:.4em;
  font-family:var(--font-mono); font-size:var(--fs-label); font-weight:var(--fw-medium);
  letter-spacing:var(--ls-label); text-transform:uppercase; line-height:1;
  padding:.4em .7em; border-radius:var(--radius-pill); white-space:nowrap;
}
.mk-badge--solid{ background:var(--accent); color:var(--on-accent); }
.mk-badge--outline{ background:transparent; color:var(--text); border:1px solid var(--border-strong); }
.mk-badge--muted{ background:var(--surface-muted); color:var(--text-muted); }
.mk-badge--invert{ background:var(--text); color:var(--text-invert); }
.mk-badge__dot{ width:.5em; height:.5em; border-radius:50%; background:currentColor; }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "badge");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Small mono-cased label — "PROJE", "DİJİTAL ÜRÜN", scores, status. */
export function Badge({ children, variant = "outline", dot = false, className = "", ...rest }) {
  ensureStyle();
  const cls = ["mk-badge", `mk-badge--${variant}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot && <span className="mk-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
