"use client";

import { useEffect, useRef } from "react";

/** Top scroll-progress bar (pages.css .progress / .reading-progress). */
export function ScrollProgress({ className = "reading-progress" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const upd = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      el.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
    };
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    return () => window.removeEventListener("scroll", upd);
  }, []);
  return <div className={className} ref={ref} />;
}
