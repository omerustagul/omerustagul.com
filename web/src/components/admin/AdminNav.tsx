"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: [string, string][] = [
  ["/admin", "Dashboard"],
  ["/admin/projects", "Projeler"],
  ["/admin/blog", "Blog"],
  ["/admin/courses", "Kurslar"],
  ["/admin/products", "Ürünler"],
  ["/admin/services", "Hizmetler"],
  ["/admin/partners", "Partnerler"],
  ["/admin/leads", "Talepler"],
  ["/admin/bookings", "Randevular"],
  ["/admin/settings", "Ayarlar"],
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav style={{ display: "grid", gap: ".15rem" }}>
      {LINKS.map(([href, label]) => {
        const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              padding: ".6rem .85rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-sm)",
              color: active ? "var(--on-accent)" : "var(--text-muted)",
              background: active ? "var(--accent)" : "transparent",
              fontWeight: active ? 600 : 400,
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
