import Link from "next/link";
import { BRAND_NAME, BRAND_SLOGAN, BRAND_SOCIAL } from "@/lib/brand";

/* Faithful port of the columns footer template (theme/site-chrome.js). */

const COLS: [string, [string, string][]][] = [
  ["İşler", [["Portfolyo", "/projects"], ["Kategoriler", "/projects"], ["Öne çıkan", "/projects"]]],
  ["İlham", [["Koleksiyonlar", "/blog"], ["Blog", "/blog"]]],
  ["Akademi", [["Tüm kurslar", "/academy"], ["Eğitmenler", "/academy"]]],
  ["Kurumsal", [["Hakkımızda", "/iletisim"], ["İletişim", "/iletisim"], ["Randevu", "/randevu"]]],
];

function socUrl(label: string) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

export function MarkaFooter() {
  return (
    <footer className="ftr ftr--columns">
      <div className="wrap">
        <div className="ftr__cta reveal">
          <h2>{BRAND_NAME} ile projeni hayata geçir</h2>
          <Link href="/iletisim" className="btn btn--primary btn--lg" data-magnetic="" data-cursor="İletişim">
            İletişime Geç <span className="arr">→</span>
          </Link>
        </div>
        <div className="ftr__cols">
          <div className="ftr__brandcol">
            <Link className="brand" href="/">
              {BRAND_NAME}
              <span className="dot">.</span>
            </Link>
            <p>{BRAND_SLOGAN}</p>
          </div>
          {COLS.map(([title, items]) => (
            <div key={title}>
              <h4>{title}</h4>
              <ul>
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} data-cursor="">
                      {label}
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
        <span>© 2026 {BRAND_NAME}. Tüm hakları saklıdır.</span>
        <div className="ftr__social">
          {BRAND_SOCIAL.map((s) => {
            const u = socUrl(s.label);
            return (
              <a key={s.label} className="soc soc--ftr" href={s.href} aria-label={s.label} title={s.label}>
                <span className="soc__i" style={{ WebkitMaskImage: `url(${u})`, maskImage: `url(${u})` }} />
              </a>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "var(--space-4)" }}>
          <Link href="#">Gizlilik</Link>
          <Link href="#">Şartlar</Link>
        </div>
      </div>
    </footer>
  );
}
