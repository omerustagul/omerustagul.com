"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { BRAND_NAME, BRAND_SOCIAL } from "@/lib/brand";
import { useTheme } from "@/components/theme/ThemeProvider";
import { LOCALE_COOKIE, LANGS, langMeta, t, type Locale, type MsgKey } from "@/lib/i18n";
import { AuthModal } from "@/components/marka/AuthModal";
import { BookingModal } from "@/components/marka/BookingModal";

/* Faithful port of the prototype's chrome (theme/site-chrome.js): 4 header
   templates driven by MarkaTheme, mega menu on "Keşfet", account dropdown,
   language dropdown (tr/en/de/ar), localized labels. */

// Route map for the web app. TODO(D4): about → /hakkimizda, cv → /ben-kimim.
const LINKS = {
  home: "/",
  portfolio: "/projects",
  project: "/projects",
  blog: "/blog",
  academy: "/academy",
  market: "/market",
  contact: "/iletisim",
  about: "/iletisim",
  cv: "/iletisim",
};

const PRIMARY: [MsgKey, string][] = [
  ["partners", LINKS.portfolio],
  ["academy", LINKS.academy],
  ["blog", LINKS.blog],
  ["market", LINKS.market],
];

const MEGA: [MsgKey, [MsgKey, string][]][] = [
  ["megaWorks", [["megaAllProjects", LINKS.portfolio], ["megaFeatured", LINKS.portfolio], ["megaByCategory", LINKS.portfolio]]],
  ["megaServices", [["megaWebDesign", LINKS.about], ["megaDevelopment", LINKS.about], ["megaBranding", LINKS.about], ["megaUiux", LINKS.about]]],
  ["megaInspiration", [["megaCollections", LINKS.blog], ["blog", LINKS.blog]]],
];

function socUrl(label: string) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

const GLOBE = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
  </svg>
);

export function MarkaHeader({ locale, userName }: { locale: Locale; userName: string | null }) {
  const router = useRouter();
  const { theme, set } = useTheme();
  const [open, setOpen] = useState(false); // mobile overlay
  const [modal, setModal] = useState<"auth" | "booking" | null>(null);
  const [mega, setMega] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const tpl = theme.headerTemplate || "classic";
  const cur = langMeta(locale);

  // Close the account / language popovers on an outside click (prototype parity).
  useEffect(() => {
    function onDown(e: MouseEvent) {
      const el = e.target as HTMLElement;
      if (!el.closest("[data-acct-wrap]")) setAcctOpen(false);
      if (!el.closest("[data-lang-wrap]")) setLangOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  function setLang(l: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000`;
    setLangOpen(false);
    router.refresh();
  }

  const brandEl = (cls?: string) => (
    <Link className={`brand ${cls ?? ""}`} href="/" aria-label={BRAND_NAME}>
      {BRAND_NAME}
      <span className="dot">.</span>
    </Link>
  );

  const discoverBtn = (
    <button
      className="navlink mega-trigger"
      type="button"
      data-mega-trigger=""
      aria-expanded={mega}
      onMouseEnter={() => setMega(true)}
      onClick={() => setMega((v) => !v)}
    >
      {t(locale, "discover")} <span className="chev" aria-hidden="true">⌄</span>
    </button>
  );

  const navLinks = PRIMARY.map(([key, href]) => (
    <a key={key} href={href} className="hdr__links">
      {t(locale, key)}
    </a>
  ));

  const langSwitch = (
    <div className="lang-switch" data-lang-wrap="">
      <button className="lang-switch__btn" type="button" aria-label="Dil / Language" onClick={() => setLangOpen((v) => !v)}>
        {GLOBE}
        <span>{cur.short}</span>
        <span className="chev" aria-hidden="true">⌄</span>
      </button>
      <div className="lang-switch__pop" data-lang-pop="" hidden={!langOpen}>
        {LANGS.map((l) => (
          <button key={l.id} className={l.id === locale ? "on" : ""} onClick={() => setLang(l.id)}>
            <span>{l.flag}</span> {l.label} <span className="lc">{l.short}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const themeBtn = (
    <button
      className="iconbtn"
      type="button"
      aria-label="Tema"
      onClick={() => set({ mode: theme.mode === "dark" ? "light" : "dark" })}
    >
      {theme.mode === "dark" ? "☀" : "☾"}
    </button>
  );

  const ctaBtn = (size?: string) => (
    <button className={`btn btn--primary ${size ? "btn--" + size : ""}`} type="button" data-magnetic="" onClick={() => setModal("booking")}>
      {t(locale, "quote")} <span className="arr">→</span>
    </button>
  );

  const menuBtn = (always?: boolean) => (
    <button className={`iconbtn menu-toggle ${always ? "menu-toggle--always" : ""}`} type="button" aria-label="Menü" onClick={() => setOpen(true)}>
      ≡
    </button>
  );

  const socialEl = (
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
  );

  const accountEl = userName ? (
    <div className="acct" data-acct-wrap="">
      <button className="acct__btn" type="button" aria-label="Hesap" onClick={() => setAcctOpen((v) => !v)}>
        <span>{userName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}</span>
      </button>
      <div className="acct__pop" data-acct-pop="" hidden={!acctOpen}>
        <div className="acct__head">
          <b>{userName}</b>
        </div>
        <Link href={LINKS.cv} data-cursor="" onClick={() => setAcctOpen(false)}>
          {t(locale, "acctProfile")}
        </Link>
        <Link href="/#rozetler" data-cursor="" onClick={() => setAcctOpen(false)}>
          {t(locale, "acctBadges")}
        </Link>
        <Link href={LINKS.academy} data-cursor="" onClick={() => setAcctOpen(false)}>
          {t(locale, "acctCourses")}
        </Link>
        <button className="acct__logout" type="button" onClick={() => signOut({ callbackUrl: "/" })}>
          {t(locale, "acctLogout")}
        </button>
      </div>
    </div>
  ) : (
    <button className="acct-login" type="button" aria-label={t(locale, "login")} onClick={() => setModal("auth")}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0114 0" />
      </svg>
      <span>{t(locale, "login")}</span>
    </button>
  );

  const megaPanel = (
    <div className="mega" data-mega-panel="">
      <div className="wrap mega__grid">
        {MEGA.map(([title, items]) => (
          <div className="mega__col" key={title}>
            <h4>{t(locale, title)}</h4>
            <ul>
              {items.map(([k, h]) => (
                <li key={k}>
                  <a href={h} data-cursor="">
                    {t(locale, k)} <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link className="mega__feat" href={LINKS.project} data-cursor={t(locale, "megaFeatured")}>
          <div className="ph" style={{ aspectRatio: "4 / 3" }}>
            <div className="ph__in" />
            <span className="ph__tag">{t(locale, "megaFeaturedLabel")}</span>
          </div>
          <h5>{t(locale, "megaFeaturedTitle")}</h5>
          <p>{t(locale, "megaFeaturedText")}</p>
        </Link>
      </div>
    </div>
  );

  let inner: React.ReactNode;
  if (tpl === "minimal") {
    inner = (
      <div className="wrap hdr__row">
        {brandEl()}
        <div className="hdr__right">
          {langSwitch}
          {themeBtn}
          {ctaBtn()}
          {menuBtn(true)}
        </div>
      </div>
    );
  } else if (tpl === "centered") {
    inner = (
      <>
        <div className="wrap hdr__stack">
          <div className="hdr__crow">
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {langSwitch}
              {themeBtn}
            </div>
            {brandEl("brand--center")}
            {ctaBtn()}
          </div>
          <nav className="nav nav__primary hdr__cnav" aria-label="Birincil">
            {discoverBtn}
            {navLinks}
          </nav>
        </div>
        {megaPanel}
      </>
    );
  } else if (tpl === "split") {
    inner = (
      <>
        <div className="wrap hdr__row">
          {brandEl()}
          <nav className="nav nav__primary hdr__splitnav" aria-label="Birincil">
            {discoverBtn}
            {navLinks}
          </nav>
          <div className="hdr__right">
            {langSwitch}
            {themeBtn}
            {ctaBtn()}
            {menuBtn()}
          </div>
        </div>
        {megaPanel}
      </>
    );
  } else {
    inner = (
      <>
        <div className="wrap hdr__row">
          {brandEl()}
          <nav className="nav nav__primary" aria-label="Birincil">
            {discoverBtn}
            {navLinks}
          </nav>
          <div className="hdr__right">
            {socialEl}
            {langSwitch}
            {themeBtn}
            {accountEl}
            {ctaBtn()}
            {menuBtn()}
          </div>
        </div>
        {megaPanel}
      </>
    );
  }

  return (
    <>
      <header
        id="site-header"
        className={`hdr hdr--${tpl}`}
        data-mega={mega ? "true" : "false"}
        onMouseLeave={() => setMega(false)}
      >
        {inner}
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
          {PRIMARY.map(([key, href], i) => (
            <a key={key} href={href} style={{ transitionDelay: `${120 + i * 60}ms` }} onClick={() => setOpen(false)}>
              {t(locale, key)}
            </a>
          ))}
        </nav>
        <div className="overlay__foot">
          {userName ? (
            <Link className="btn btn--ghost btn--lg" href={LINKS.cv} onClick={() => setOpen(false)}>
              {userName}
            </Link>
          ) : (
            <button
              className="btn btn--ghost btn--lg"
              type="button"
              onClick={() => {
                setOpen(false);
                setModal("auth");
              }}
            >
              {t(locale, "login")}
            </button>
          )}
          <button
            className="btn btn--primary btn--lg"
            type="button"
            onClick={() => {
              setOpen(false);
              setModal("booking");
            }}
          >
            {t(locale, "quote")} <span className="arr">→</span>
          </button>
        </div>
        <div className="overlay__lang">
          {LANGS.map((l) => (
            <button key={l.id} className={l.id === locale ? "on" : ""} onClick={() => setLang(l.id)}>
              {l.short}
            </button>
          ))}
        </div>
      </div>

      {modal === "auth" && <AuthModal onClose={() => setModal(null)} />}
      {modal === "booking" && <BookingModal onClose={() => setModal(null)} />}
    </>
  );
}
