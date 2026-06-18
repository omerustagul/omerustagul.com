import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const CARDS: [string, string, () => Promise<number>][] = [
  ["Projeler", "/admin/projects", () => prisma.project.count()],
  ["Blog", "/admin/blog", () => prisma.blogPost.count()],
  ["Kurslar", "/admin/courses", () => prisma.course.count()],
  ["Ürünler", "/admin/products", () => prisma.product.count()],
  ["Hizmetler", "/admin/services", () => prisma.service.count()],
  ["Talepler", "/admin/leads", () => prisma.lead.count()],
];

export default async function AdminDashboard() {
  const counts = await Promise.all(CARDS.map(([, , fn]) => fn()));
  const recentLeads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 });

  return (
    <div>
      <h1 style={{ fontSize: "var(--fs-h2)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(11rem, 1fr))",
          marginBottom: "3rem",
        }}
      >
        {CARDS.map(([label, href], i) => (
          <Link
            key={label}
            href={href}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              textDecoration: "none",
              color: "var(--text)",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "2rem", fontWeight: 600 }}>{counts[i]}</div>
            <div className="u-label" style={{ marginTop: ".25rem" }}>
              {label}
            </div>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: "var(--fs-h4)", marginBottom: "1rem" }}>Son talepler</h2>
      {recentLeads.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>Henüz talep yok.</p>
      ) : (
        <ul style={{ listStyle: "none", display: "grid", gap: ".5rem" }}>
          {recentLeads.map((l) => (
            <li
              key={l.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                borderBottom: "1px solid var(--border)",
                paddingBottom: ".5rem",
                fontSize: "var(--fs-sm)",
              }}
            >
              <span>
                <strong>{l.name}</strong> · {l.email}
              </span>
              <span style={{ color: "var(--text-muted)" }}>{formatDate(l.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
