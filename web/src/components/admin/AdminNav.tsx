"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./AdminIcons";

const NAV = [
  {
    group: "Genel",
    items: [
      { key: "/admin", label: "Dashboard", icon: "dashboard" },
      { key: "/admin/reports", label: "AI Raporlar", icon: "ai", tag: "AI" },
    ],
  },
  {
    group: "İçerik",
    items: [
      { key: "/admin/blog", label: "Blog", icon: "blog", tag: "AI" },
      { key: "/admin/leads", label: "Talepler", icon: "users" },
      { key: "/admin/bookings", label: "Randevular", icon: "appearance" },
      { key: "/admin/projects", label: "Projeler", icon: "projects" },
      { key: "/admin/profilecv", label: "Ben Kimim — CV", icon: "users" },
      { key: "/admin/community", label: "Oyunlar & Topluluk", icon: "courses" },
      { key: "/admin/services", label: "Hizmetler", icon: "settings" },
      { key: "/admin/courses", label: "Kurslar", icon: "courses" },
      { key: "/admin/products", label: "Market", icon: "market" },
      { key: "/admin/media", label: "Medya", icon: "media" },
    ],
  },
  {
    group: "Görünüm",
    items: [
      { key: "/admin/appearance", label: "Tema & Görünüm", icon: "appearance" },
      { key: "/admin/pages", label: "Sayfalar", icon: "pages" },
    ],
  },
  {
    group: "Sistem",
    items: [
      { key: "/admin/users", label: "Kullanıcılar", icon: "users" },
      { key: "/admin/seo", label: "SEO & Meta", icon: "seo", tag: "AI" },
      { key: "/admin/settings", label: "Ayarlar", icon: "settings" },
    ],
  },
];

const ROUTES: Record<string, { title: string; sub: string }> = {
  "/admin": { title: "Dashboard", sub: "Sitenin genel görünümü" },
  "/admin/pages": { title: "Sayfalar", sub: "Sayfaları ve bölümleri düzenle" },
  "/admin/reports": { title: "AI Raporlar", sub: "Yapay zekâ ile içgörü ve raporlar" },
  "/admin/blog": { title: "Blog & İçerik", sub: "Yazıları yönet, AI ile üret" },
  "/admin/leads": { title: "Talepler / Lead", sub: "Teklif ve iletişim talepleri" },
  "/admin/bookings": { title: "Randevular", sub: "Keşif görüşmeleri" },
  "/admin/projects": { title: "Projeler", sub: "Portfolyo yönetimi" },
  "/admin/partners": { title: "İş Ortakları", sub: "Logo duvarı / partner yönetimi" },
  "/admin/profilecv": { title: "Ben Kimim — CV", sub: "Kariyer profili sayfası içeriği" },
  "/admin/community": { title: "Oyunlar & Topluluk", sub: "Oyunları ve koleksiyonları yönet" },
  "/admin/services": { title: "Hizmetler", sub: "Sunduğunuz hizmetler — projelere atanır" },
  "/admin/courses": { title: "Akademi — Kurslar", sub: "Kursları yönet" },
  "/admin/products": { title: "Market", sub: "Dijital ürünler" },
  "/admin/media": { title: "Medya Kütüphanesi", sub: "Görseller ve dosyalar" },
  "/admin/appearance": { title: "Tema & Görünüm", sub: "Header, renk paleti, font — canlı" },
  "/admin/users": { title: "Kullanıcılar & Roller", sub: "Ekip erişimi" },
  "/admin/seo": { title: "SEO & Meta", sub: "Arama motoru optimizasyonu" },
  "/admin/settings": { title: "Genel Ayarlar", sub: "Site geneli yapılandırma" },
};

export function AdminNav() {
  const path = usePathname();

  return (
    <nav className="adm-nav">
      {NAV.map((g) => (
        <div className="adm-nav__group" key={g.group}>
          <h5>{g.group}</h5>
          {g.items.map((it) => {
            const active = it.key === "/admin" ? path === "/admin" : path.startsWith(it.key);
            return (
              <Link
                key={it.key}
                href={it.key}
                className={`adm-nav__item ${active ? "is-active" : ""}`}
              >
                <span className="adm-nav__ic">
                  <Icon name={it.icon} size={18} />
                </span>
                {it.label}
                {it.tag && <span className="tag">{it.tag}</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function AdminTop() {
  const path = usePathname();
  const route = Object.entries(ROUTES).find(([k]) =>
    k === "/admin" ? path === "/admin" : path.startsWith(k)
  )?.[1] || { title: "Yönetim", sub: "Yönetim Paneli" };

  return (
    <header className="adm-top">
      <div>
        <div className="adm-top__title">{route.title}</div>
        <div className="adm-top__sub">{route.sub}</div>
      </div>
      <div className="adm-top__search">
        <Icon name="search" size={16} />
        <input placeholder="Ara…" />
      </div>
      <button className="adm-iconbtn" aria-label="Tema" style={{ width: 38, height: 38 }}>
        ☾
      </button>
      <Link href="/" className="adm-btn adm-btn--dark" target="_blank">
        <Icon name="external" size={15} /> Siteyi Gör
      </Link>
    </header>
  );
}
