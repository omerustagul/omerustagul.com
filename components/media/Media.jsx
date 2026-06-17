import React from "react";

const CSS = `
.mk-media{
  position:relative; display:block; overflow:hidden; border-radius:var(--radius-lg);
  background:var(--placeholder); width:100%;
}
.mk-media__inner{
  position:absolute; inset:0; transform:scale(1);
  transition: transform var(--dur-slow) var(--ease-out);
  background-size:cover; background-position:center;
}
.mk-media img{ width:100%; height:100%; object-fit:cover; display:block; }
/* placeholder pattern when no image supplied (no fake imagery) */
.mk-media--empty .mk-media__inner{
  background-image:
    linear-gradient(135deg, color-mix(in srgb, var(--text) 5%, transparent) 0 50%, transparent 50%),
    radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%);
}
.mk-media__ph{
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--text-subtle);
}
.mk-media__overlay{
  position:absolute; inset:0; display:flex; align-items:flex-end; padding:1rem;
  background:linear-gradient(to top, color-mix(in srgb, var(--ink-900) 55%, transparent), transparent 55%);
  opacity:0; transition:opacity var(--dur) var(--ease-out);
}
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "media");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/**
 * Media frame with built-in hover-zoom inner + placeholder fallback.
 * Pass `ratio` like "4/3" or "16/9". When no `src`, renders a neutral
 * placeholder with an optional `label` (never fake imagery).
 */
export function Media({ src, alt = "", ratio = "4/3", label, rounded = true, children, className = "", ...rest }) {
  ensureStyle();
  const cls = ["mk-media", !src ? "mk-media--empty" : "", className].filter(Boolean).join(" ");
  const style = { aspectRatio: ratio.replace("/", " / "), borderRadius: rounded ? undefined : 0 };
  return (
    <figure className={cls} style={style} {...rest}>
      <div className="mk-media__inner" style={src ? { backgroundImage: `url(${src})` } : undefined} role="img" aria-label={alt} />
      {!src && label && <span className="mk-media__ph">{label}</span>}
      {children}
    </figure>
  );
}
