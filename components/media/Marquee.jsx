import React from "react";

const CSS = `
.mk-marquee{ position:relative; overflow:hidden; width:100%; -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); }
.mk-marquee__track{ display:flex; width:max-content; gap:var(--gap,4rem); animation:mk-marquee var(--speed,32s) linear infinite; will-change:transform; }
.mk-marquee[data-paused="true"] .mk-marquee__track,
.mk-marquee:hover .mk-marquee__track{ animation-play-state:paused; }
.mk-marquee__item{ display:flex; align-items:center; }
@keyframes mk-marquee{ to{ transform:translateX(calc(-50% - var(--gap,4rem)/2)); } }
@media (prefers-reduced-motion: reduce){ .mk-marquee__track{ animation:none; } }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "marquee");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Infinite horizontal marquee — partner logos, ticker text. Pauses on hover. */
export function Marquee({ children, speed = 32, gap = "4rem", pauseOnHover = true, className = "", ...rest }) {
  ensureStyle();
  const items = React.Children.toArray(children);
  const style = { "--speed": `${speed}s`, "--gap": gap };
  return (
    <div className={["mk-marquee", className].filter(Boolean).join(" ")} style={style} data-pause-hover={pauseOnHover} {...rest}>
      <div className="mk-marquee__track">
        {items.map((c, i) => <div className="mk-marquee__item" key={`a${i}`}>{c}</div>)}
        {items.map((c, i) => <div className="mk-marquee__item" key={`b${i}`} aria-hidden="true">{c}</div>)}
      </div>
    </div>
  );
}
