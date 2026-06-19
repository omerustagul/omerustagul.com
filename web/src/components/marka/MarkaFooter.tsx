"use client";

import Link from "next/link";
import { BRAND_NAME, BRAND_SLOGAN, BRAND_SOCIAL } from "@/lib/brand";
import { useTheme } from "@/components/theme/ThemeProvider";
import { t, type Locale, type MsgKey } from "@/lib/i18n";

/* Faithful port of the prototype's footer (theme/site-chrome.js): columns +
   compact templates, driven by MarkaTheme.footerTemplate, localized labels. */

// TODO(D4): about → /hakkimizda, cv → /ben-kimim.
const L = {
  portfolio: "/projects",
  blog: "/blog",
  academy: "/academy",
  market: "/market",
  contact: "/iletisim",
  about: "/iletisim",
  cv: "/iletisim",
};

const COLS: [MsgKey, [MsgKey, string][]][] = [
  ["footerWork", [["footerPortfolio", L.portfolio], ["footerCategories", L.portfolio], ["megaFeatured", L.portfolio]]],
  ["footerInspiration", [["megaCollections", L.blog], ["blog", L.blog]]],
  ["footerAcademy", [["footerAllCourses", L.academy], ["footerInstructors", L.academy]]],
  ["footerCorporate", [["aboutMe", L.cv], ["footerAbout", L.about], ["footerContact", L.contact], ["footerFaq", L.about]]],
];

const COMPACT_NAV: [MsgKey, string][] = [
  ["footerWork", L.portfolio],
  ["academy", L.academy],
  ["blog", L.blog],
  ["market", L.market],
  ["footerAbout", L.about],
  ["footerContact", L.contact],
];

function socUrl(label: string) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

function SocialIcons({ cls }: { cls: string }) {
  return (
    <>
      {BRAND_SOCIAL.map((s) => {
        const u = socUrl(s.label);
        return (
          <a key={s.label} className={cls} href={s.href} aria-label={s.label} title={s.label}>
            <span className="soc__i" style={{ WebkitMaskImage: `url(${u})`, maskImage: `url(${u})` }} />
          </a>
        );
      })}
    </>
  );
}

function brandLink() {
  return (
    <Link className="brand" href="/">
      {BRAND_NAME}
      <span className="dot">.</span>
    </Link>
  );
}

export function MarkaFooter({ locale }: { locale: Locale }) {
  const { theme } = useTheme();
  const tpl = theme.footerTemplate || "columns";

  if (tpl === "compact") {
    return (
      <footer className="ftr ftr--compact">
        <div className="wrap ftr__compact">
          <div className="ftr__compactL">
            {brandLink()}
            <span className="ftr__slogan">{BRAND_SLOGAN}</span>
          </div>
          <nav className="ftr__compactNav">
            {COMPACT_NAV.map(([k, h]) => (
              <Link key={k} href={h} data-cursor="">
                {t(locale, k)}
              </Link>
            ))}
          </nav>
          <div className="ftr__bottom" style={{ border: 0, padding: 0 }}>
            <span>© 2026 {BRAND_NAME}.</span>
            <div className="ftr__social">
              <SocialIcons cls="soc soc--ftr" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="ftr ftr--columns">
      <div className="wrap">
        <div className="ftr__cta reveal">
          <h2>{t(locale, "footerCta").replace("{brand}", BRAND_NAME)}</h2>
          <Link href={L.contact} className="btn btn--primary btn--lg" data-magnetic="" data-cursor={t(locale, "footerContact")}>
            {t(locale, "contact")} <span className="arr">→</span>
          </Link>
        </div>
        <div className="ftr__cols">
          <div className="ftr__brandcol">
            {brandLink()}
            <p>{BRAND_SLOGAN}</p>
          </div>
          {COLS.map(([title, items]) => (
            <div key={title}>
              <h4>{t(locale, title)}</h4>
              <ul>
                {items.map(([k, h]) => (
                  <li key={k}>
                    <Link href={h} data-cursor="">
                      {t(locale, k)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="ftr__giant" aria-hidden="true" data-parallax-x>
        {BRAND_NAME}
        <span className="dot">.</span>
      </div>

      <div className="wrap ftr__bottom">
        <span>
          © 2026 {BRAND_NAME}. {t(locale, "footerRights")}
        </span>
        <div className="ftr__social">
          <SocialIcons cls="soc soc--ftr" />
        </div>
        <div style={{ display: "flex", gap: "var(--space-4)" }}>
          <Link href="#">{t(locale, "footerPrivacy")}</Link>
          <Link href="#">{t(locale, "footerTerms")}</Link>
        </div>
      </div>
    </footer>
  );
}
