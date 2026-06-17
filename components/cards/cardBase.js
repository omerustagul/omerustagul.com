// Shared card chrome — injected once. Not a component (no .d.ts), just a helper
// imported by the card components so they share one base stylesheet.
const CSS = `
.mk-card{
  display:flex; flex-direction:column; gap:1rem; position:relative;
  color:var(--text); text-decoration:none; isolation:isolate;
}
.mk-card__media{ position:relative; }
.mk-card:hover .mk-media__inner{ transform:scale(var(--img-zoom)); }
.mk-card:hover .mk-media__overlay{ opacity:1; }
.mk-card__body{ display:flex; flex-direction:column; gap:.4rem; }
.mk-card__toprow{ display:flex; align-items:center; justify-content:space-between; gap:1rem; }
.mk-card__title{
  font-size:var(--fs-h3); font-weight:var(--fw-semibold); letter-spacing:var(--ls-heading);
  line-height:var(--lh-snug); margin:0;
  background-image:linear-gradient(var(--accent),var(--accent));
  background-size:0% 2px; background-repeat:no-repeat; background-position:0 100%;
  transition:background-size var(--dur) var(--ease-out);
}
.mk-card:hover .mk-card__title{ background-size:100% 2px; }
.mk-card__meta{ display:flex; align-items:center; gap:.6ch; color:var(--text-muted); font-size:var(--fs-meta); }
.mk-card__meta--mono{ font-family:var(--font-mono); }
.mk-card__excerpt{ color:var(--text-muted); font-size:var(--fs-sm); line-height:var(--lh-body); }
.mk-card__dot{ width:3px; height:3px; border-radius:50%; background:currentColor; opacity:.5; }
.mk-card__price{ font-family:var(--font-mono); font-weight:var(--fw-medium); color:var(--text); }
.mk-card__price small{ color:var(--text-muted); font-weight:var(--fw-regular); }
.mk-card__cursorlabel{
  position:absolute; top:1rem; right:1rem; z-index:2;
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--on-accent); background:var(--accent);
  padding:.45em .8em; border-radius:var(--radius-pill);
  transform:translateY(-6px) scale(.9); opacity:0;
  transition:opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.mk-card:hover .mk-card__cursorlabel{ opacity:1; transform:translateY(0) scale(1); }
`;

export function ensureCardBase() {
  if (typeof document === "undefined" || window.__mkCardBase) return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "card-base");
  s.textContent = CSS;
  document.head.appendChild(s);
  window.__mkCardBase = true;
}
