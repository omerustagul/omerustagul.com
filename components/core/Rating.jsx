import React from "react";

const CSS = `
.mk-rating{ display:inline-flex; align-items:center; gap:.5ch; font-family:var(--font-mono); }
.mk-rating__stars{ display:inline-flex; gap:1px; color:var(--accent); }
.mk-rating__stars svg{ display:block; }
.mk-rating__star--empty{ color:var(--border); }
.mk-rating__score{ font-size:var(--fs-meta); font-weight:var(--fw-medium); color:var(--text); }
.mk-rating__count{ font-size:var(--fs-xs); color:var(--text-muted); }
`;

let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "rating");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

function Star({ filled }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
         className={filled ? "" : "mk-rating__star--empty"} aria-hidden="true">
      <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** Star rating + numeric score in mono — course / product cards. */
export function Rating({ value = 0, max = 5, count, showScore = true, className = "", ...rest }) {
  ensureStyle();
  const full = Math.round(value);
  return (
    <span className={["mk-rating", className].filter(Boolean).join(" ")} {...rest}>
      <span className="mk-rating__stars" aria-hidden="true">
        {Array.from({ length: max }).map((_, i) => <Star key={i} filled={i < full} />)}
      </span>
      {showScore && <span className="mk-rating__score">{value.toFixed(1)}</span>}
      {count != null && <span className="mk-rating__count">({count})</span>}
    </span>
  );
}
