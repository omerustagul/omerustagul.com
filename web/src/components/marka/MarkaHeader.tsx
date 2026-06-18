"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BRAND_NAME, BRAND_SOCIAL } from "@/lib/brand";
import { useTheme } from "@/components/theme/ThemeProvider";
import { LOCALE_COOKIE, t, type Locale, type MsgKey } from "@/lib/i18n";

const NAV: [MsgKey, string][] = [
  ["projects", "/projects"],
  ["services", "/#services"],
  ["academy", "/academy"],
  ["market", "/market"],
  ["blog", "/blog"],
  ["games", "/oyunlar"],
];

function socUrl(label: string) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

export function MarkaHeader({ locale, userName }: { locale: Locale; userName: string | null }) {
  const router = useRouter();
  const { theme, set } = useTheme();
  const [open, setOpen] = useState(false); // mobile overlay

  function setLang(l: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <>
      <header id="site-header" className="hdr hdr--classic" data-mega="false">
        <div className="wrap hdr__row">
          <Link className="brand" href="/" aria-label={BRAND_NAME}>
            {BRAND_NAME}
            <span className="dot">.</span>
          </Link>

          <nav className="nav nav__primary" aria-label="Birincil">
            {NAV.map(([key, href]) => (
              <a key={key} href={href} className="hdr__links">
                {t(locale, key)}
              </a>
            ))}
          </nav>

          <div className="hdr__right">
            <div className="hdr__social">
              {BRAND_SOCIAL.map((s) => {
                const u = socUrl(s.label);
                return (
                  <a key={s.label} className="soc" href={s.href} aria-label={s.label} title={s.label} data-cursor="">
                    <span className="soc__i" style={{ WebkitMaskImage: `url(${u})`, maskImage: `url(${u})` }} />
                  </a>
                );
              })}
            </div>

            <div className="lang-switch">
              <button
                className="lang-switch__btn"
                type="button"
                aria-label="Dil"
                onClick={() => setLang(locale === "tr" ? "en" : "tr")}
              >
                <span>{locale.toUpperCase()}</span>
              </button>
            </div>

            <button
              className="iconbtn"
              type="button"
              aria-label="Tema"
              onClick={() => set({ mode: theme.mode === "dark" ? "light" : "dark" })}
            >
              {theme.mode === "dark" ? "☀" : "☾"}
            </button>

            {userName ? (
              <Link className="acct-login" href="/admin" aria-label={userName}>
                <span>{userName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}</span>
              </Link>
            ) : (
              <Link className="acct-login" href="/login" aria-label={t(locale, "login")}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21a7 7 0 0114 0" />
                </svg>
                <span>{t(locale, "login")}</span>
              </Link>
            )}

            <Link className="btn btn--primary" href="/iletisim" data-magnetic="">
              {t(locale, "quote")} <span className="arr">→</span>
            </Link>

            <button className="iconbtn menu-toggle" type="button" aria-label="Menü" onClick={() => setOpen(true)}>
              ≡
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div className={`overlay ${open ? "is-open" : ""}`}>
        <div className="overlay__top">
          <Link className="brand" href="/" onClick={() => setOpen(false)}>
            {BRAND_NAME}
            <span className="dot">.</span>
          </Link>
          <button className="iconbtn" type="button" aria-label="Kapat" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="overlay__links" aria-label="Mobil">
          {NAV.map(([key, href], i) => (
            <a key={key} href={href} style={{ transitionDelay: `${120 + i * 60}ms` }} onClick={() => setOpen(false)}>
              {t(locale, key)}
            </a>
          ))}
        </nav>
        <div className="overlay__foot">
          <Link className="btn btn--ghost btn--lg" href="/login" onClick={() => setOpen(false)}>
            {t(locale, "login")}
          </Link>
          <Link className="btn btn--primary btn--lg" href="/iletisim" onClick={() => setOpen(false)}>
            {t(locale, "quote")} <span className="arr">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
