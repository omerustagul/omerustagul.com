import React from "react";

const CSS = `
.mk-avatar{
  display:inline-flex; align-items:center; justify-content:center;
  border-radius:50%; overflow:hidden; flex:none;
  background:var(--surface-muted); color:var(--text-muted);
  font-family:var(--font-mono); font-weight:var(--fw-medium); text-transform:uppercase;
  border:2px solid var(--surface);
}
.mk-avatar img{ width:100%; height:100%; object-fit:cover; display:block; }
.mk-avatar--xs{ width:24px; height:24px; font-size:.55rem; }
.mk-avatar--sm{ width:32px; height:32px; font-size:.7rem; }
.mk-avatar--md{ width:44px; height:44px; font-size:.85rem; }
.mk-avatar--lg{ width:64px; height:64px; font-size:1.1rem; }
.mk-avatar-stack{ display:inline-flex; }
.mk-avatar-stack > *{ margin-left:-10px; }
.mk-avatar-stack > *:first-child{ margin-left:0; }
.mk-avatar-stack .mk-avatar__more{ background:var(--text); color:var(--text-invert); }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "avatar");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

/** Round avatar with image or initials fallback. */
export function Avatar({ src, name = "", size = "md", className = "", ...rest }) {
  ensureStyle();
  const cls = ["mk-avatar", `mk-avatar--${size}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} title={name} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}

/** Overlapping avatar stack with an optional "+N" chip (collection followers). */
export function AvatarStack({ people = [], max = 4, size = "sm" }) {
  ensureStyle();
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <span className="mk-avatar-stack">
      {shown.map((p, i) => <Avatar key={i} src={p.src} name={p.name} size={size} />)}
      {extra > 0 && (
        <span className={`mk-avatar mk-avatar--${size} mk-avatar__more`}>+{extra}</span>
      )}
    </span>
  );
}
