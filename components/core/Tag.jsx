import React from "react";

const CSS = `
.mk-tag{
  display:inline-flex; align-items:center; cursor:pointer;
  font-family:var(--font-sans); font-size:var(--fs-sm); font-weight:var(--fw-medium);
  color:var(--text); background:var(--surface); border:1px solid var(--border);
  padding:.45rem .85rem; border-radius:var(--radius-sm); white-space:nowrap;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.mk-tag:hover{ border-color:var(--border-strong); }
.mk-tag[data-active="true"]{ background:var(--text); color:var(--text-invert); border-color:var(--text); }
.mk-tag__count{ margin-left:.5ch; color:var(--text-subtle); font-family:var(--font-mono); font-size:var(--fs-xs); }
.mk-tag[data-active="true"] .mk-tag__count{ color:var(--text-invert); opacity:.6; }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "tag");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Filter pill / chip — used in portfolio + market + blog filter bars. */
export function Tag({ children, active = false, count, className = "", ...rest }) {
  ensureStyle();
  const cls = ["mk-tag", className].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} data-active={active} {...rest}>
      {children}
      {count != null && <span className="mk-tag__count">{count}</span>}
    </button>
  );
}
