import React from "react";

const CSS = `
.mk-field{ display:flex; flex-direction:column; gap:.5rem; }
.mk-field__label{
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--text-muted);
}
.mk-input, .mk-textarea, .mk-select{
  width:100%; font-family:var(--font-sans); font-size:var(--fs-body); color:var(--text);
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-sm);
  padding:.85rem 1rem; transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
  -webkit-appearance:none; appearance:none;
}
.mk-input::placeholder, .mk-textarea::placeholder{ color:var(--text-subtle); }
.mk-input:focus, .mk-textarea:focus, .mk-select:focus{
  outline:none; border-color:var(--border-strong); box-shadow:0 0 0 3px var(--accent-tint);
}
.mk-textarea{ resize:vertical; min-height:7rem; line-height:var(--lh-body); }
.mk-field--underline .mk-input{
  border:0; border-bottom:1px solid var(--border); border-radius:0; padding-inline:0; background:transparent;
}
.mk-field--underline .mk-input:focus{ box-shadow:none; border-bottom-color:var(--accent); }
.mk-select-wrap{ position:relative; }
.mk-select-wrap::after{
  content:""; position:absolute; right:1rem; top:50%; width:.5rem; height:.5rem;
  border-right:2px solid var(--text-muted); border-bottom:2px solid var(--text-muted);
  transform:translateY(-65%) rotate(45deg); pointer-events:none;
}
.mk-field__hint{ font-size:var(--fs-sm); color:var(--text-muted); }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "input");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Labelled text input. variant="underline" for the editorial contact form. */
export function Input({ label, hint, variant = "box", as = "input", className = "", id, ...rest }) {
  ensureStyle();
  const fid = id || (label ? `f-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <label className={["mk-field", variant === "underline" ? "mk-field--underline" : "", className].filter(Boolean).join(" ")} htmlFor={fid}>
      {label && <span className="mk-field__label">{label}</span>}
      {as === "textarea"
        ? <textarea id={fid} className="mk-textarea" {...rest} />
        : <input id={fid} className="mk-input" {...rest} />}
      {hint && <span className="mk-field__hint">{hint}</span>}
    </label>
  );
}

/** Native select with custom chevron. */
export function Select({ label, children, className = "", id, ...rest }) {
  ensureStyle();
  const fid = id || (label ? `f-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <label className={["mk-field", className].filter(Boolean).join(" ")} htmlFor={fid}>
      {label && <span className="mk-field__label">{label}</span>}
      <span className="mk-select-wrap">
        <select id={fid} className="mk-select" {...rest}>{children}</select>
      </span>
    </label>
  );
}
