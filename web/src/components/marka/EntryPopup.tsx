"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

/* Faithful port of the prototype's entry pop-up (theme/site-chrome.js). Config
   comes from MarkaTheme.popup; shows after a delay, once per session, and
   re-schedules live whenever the admin edits the popup config. */

const SEEN_KEY = "mk-popup-seen";

function resolveHref(url: string): string {
  if (!url) return "#";
  if (/^https?:\/\//.test(url) || url.startsWith("/") || url.startsWith("#")) return url;
  return "/" + url;
}

export function EntryPopup() {
  const { theme } = useTheme();
  const pc = theme.popup;
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enabled = pc?.enabled ?? false;
  const delaySec = pc?.delaySec ?? 0;
  const oncePerSession = pc?.freqOncePerSession ?? true;

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setOpen(false);
    if (!enabled) return;

    let seen = false;
    try {
      seen = oncePerSession && sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;

    timer.current = setTimeout(() => setOpen(true), Math.max(0, delaySec * 1000));
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [enabled, delaySec, oncePerSession]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!pc || !enabled) return null;

  return (
    <div
      className={`mk-popup ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="mk-popup__box" role="dialog" aria-modal="true" aria-label={pc.title || "Kampanya"}>
        <button className="mk-popup__x" type="button" onClick={close} aria-label="Kapat">
          ✕
        </button>
        {pc.image ? (
          <div className="mk-popup__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pc.image} alt="" />
          </div>
        ) : null}
        <div className="mk-popup__body">
          {pc.title ? <h3 className="mk-popup__title">{pc.title}</h3> : null}
          {pc.text ? <p className="mk-popup__text">{pc.text}</p> : null}
          {pc.ctaText ? (
            <a className="btn btn--primary" href={resolveHref(pc.ctaUrl)} onClick={close}>
              {pc.ctaText} <span className="arr">→</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
