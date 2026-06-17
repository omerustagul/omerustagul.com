import React from "react";
import { BRAND_NAME } from "../../brand/brand.js";

const CSS = `
.mk-logo{
  display:inline-flex; align-items:center; gap:.5ch;
  font-family:var(--font-sans); font-weight:var(--fw-bold);
  letter-spacing:-0.04em; color:var(--text); line-height:1;
  text-decoration:none; -webkit-tap-highlight-color:transparent;
}
.mk-logo__dot{ color:var(--accent); }
.mk-logo--sm{ font-size:1.125rem; }
.mk-logo--md{ font-size:1.5rem; }
.mk-logo--lg{ font-size:clamp(2rem,6vw,4rem); }
.mk-logo--xl{ font-size:clamp(3rem,16vw,14rem); letter-spacing:-0.05em; }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "logo");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Wordmark. Pulls the brand name from brand/brand.js by default. */
export function Logo({ name = BRAND_NAME, size = "md", href, showDot = true, className = "", ...rest }) {
  ensureStyle();
  const cls = ["mk-logo", `mk-logo--${size}`, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span>{name}</span>
      {showDot && <span className="mk-logo__dot" aria-hidden="true">.</span>}
    </>
  );
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <span className={cls} {...rest}>{inner}</span>;
}
