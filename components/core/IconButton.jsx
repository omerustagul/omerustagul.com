import React from "react";

const CSS = `
.mk-iconbtn{
  display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
  background:transparent; border:1px solid var(--border); border-radius:var(--radius-pill);
  color:var(--text); transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color:transparent;
}
.mk-iconbtn:hover{ border-color:var(--border-strong); }
.mk-iconbtn:active{ transform:scale(.92); }
.mk-iconbtn:focus-visible{ outline:2px solid var(--focus-ring); outline-offset:2px; }
.mk-iconbtn--sm{ width:36px; height:36px; }
.mk-iconbtn--md{ width:44px; height:44px; }
.mk-iconbtn--lg{ width:56px; height:56px; }
.mk-iconbtn--solid{ background:var(--text); color:var(--text-invert); border-color:var(--text); }
.mk-iconbtn--solid:hover{ background:var(--accent); color:var(--on-accent); border-color:var(--accent); }
.mk-iconbtn--ghost{ border-color:transparent; }
.mk-iconbtn--ghost:hover{ background:var(--surface-muted); }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "iconbtn");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Square-ish round icon button — nav arrows, social, theme toggle, close. */
export function IconButton({ children, variant = "outline", size = "md", label, className = "", ...rest }) {
  ensureStyle();
  const cls = ["mk-iconbtn", `mk-iconbtn--${variant}`, `mk-iconbtn--${size}`, className].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
