import React from "react";

const CSS = `
.mk-btn{
  --_bg: var(--accent);
  --_fg: var(--on-accent);
  --_bd: transparent;
  position:relative; display:inline-flex; align-items:center; justify-content:center;
  gap:.55em; isolation:isolate; cursor:pointer; white-space:nowrap;
  font-family:var(--font-sans); font-weight:var(--fw-medium); letter-spacing:-0.01em;
  border:1px solid var(--_bd); border-radius:var(--radius-sm);
  color:var(--_fg); background:transparent;
  transition: color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color:transparent;
}
.mk-btn::before{
  content:""; position:absolute; inset:0; z-index:-1; border-radius:inherit;
  background:var(--_bg); transform:scaleY(1); transform-origin:bottom;
  transition: transform var(--dur) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.mk-btn:active{ transform:scale(0.97); }
.mk-btn:focus-visible{ outline:2px solid var(--focus-ring); outline-offset:3px; }
.mk-btn[disabled]{ opacity:.4; pointer-events:none; }

/* sizes */
.mk-btn--sm{ font-size:var(--fs-sm); padding:.5rem .9rem; }
.mk-btn--md{ font-size:var(--fs-body); padding:.7rem 1.25rem; }
.mk-btn--lg{ font-size:1.0625rem; padding:.95rem 1.7rem; }
.mk-btn--block{ display:flex; width:100%; }

/* primary: filled green, darkens + fill-wipe on hover */
.mk-btn--primary{ --_bg:var(--accent); --_fg:var(--on-accent); }
.mk-btn--primary:hover{ --_bg:var(--accent-hover); }

/* secondary: ink outline, green fill wipes up on hover */
.mk-btn--secondary{ --_fg:var(--text); --_bd:var(--border-strong); }
.mk-btn--secondary::before{ background:var(--accent); transform:scaleY(0); }
.mk-btn--secondary:hover{ --_fg:var(--on-accent); --_bd:var(--accent); }
.mk-btn--secondary:hover::before{ transform:scaleY(1); }

/* ghost: text only, underline grow */
.mk-btn--ghost{ --_fg:var(--text); padding-inline:.4rem; }
.mk-btn--ghost::before{ display:none; }
.mk-btn--ghost:hover{ --_fg:var(--accent-hover); }

.mk-btn__icon{ display:inline-flex; transition:transform var(--dur-fast) var(--ease-out); }
.mk-btn:hover .mk-btn__icon--arrow{ transform:translateX(3px); }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "button");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  iconLeft,
  iconRight,
  fullWidth = false,
  magnetic = false,
  disabled = false,
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = [
    "mk-btn",
    `mk-btn--${variant}`,
    `mk-btn--${size}`,
    fullWidth ? "mk-btn--block" : "",
    className,
  ].filter(Boolean).join(" ");

  const inner = (
    <>
      {iconLeft && <span className="mk-btn__icon">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="mk-btn__icon mk-btn__icon--arrow">{iconRight}</span>}
    </>
  );

  const props = {
    className: cls,
    "data-magnetic": magnetic ? "" : undefined,
    ...rest,
  };

  if (href && !disabled) {
    return <a href={href} {...props}>{inner}</a>;
  }
  return <button type="button" disabled={disabled} {...props}>{inner}</button>;
}
