import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { StatCard, AdmCard } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projects, blogs, leads] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.lead.count(),
  ]);

  const recentLeads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 4 });

  // Dummy data for traffic chart and AI status as per prototype
  const week = [42, 55, 48, 63, 71, 58, 80];
  const aiAvailable = true;

  return (
    <>
      <div className="adm-grid adm-grid--4">
        <StatCard label="PROJELER" val={projects} delta="12%" dir="up" />
        <StatCard label="BLOG" val={blogs} delta="2" dir="up" />
        <StatCard label="TALEPLER" val={leads} delta="5%" dir="down" />
        <StatCard label="TRAFİK (HAFTALIK)" val="417" delta="18%" dir="up" />
      </div>

      <div className="adm-grid adm-grid--3">
        <AdmCard title="Haftalık trafik" desc="Son 7 gün">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, paddingTop: 10 }}>
            {week.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: "100%",
                    height: h * 1.5,
                    background: "var(--accent)",
                    borderRadius: "6px 6px 0 0",
                    opacity: 0.35 + i * 0.09,
                  }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
                  {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"][i]}
                </span>
              </div>
            ))}
          </div>
        </AdmCard>

        <AdmCard title="Hızlı AI işlemleri">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/admin/reports" className="adm-btn adm-btn--primary">
              <Icon name="ai" size={16} /> Haftalık rapor oluştur
            </Link>
            <Link href="/admin/blog" className="adm-btn adm-btn--ghost">
              <Icon name="blog" size={16} /> AI ile blog yazısı yaz
            </Link>
            <Link href="/admin/appearance" className="adm-btn adm-btn--ghost">
              <Icon name="appearance" size={16} /> Görünümü düzenle
            </Link>
          </div>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)", marginTop: 14 }}>
            AI {aiAvailable ? "bağlı — gerçek üretim aktif." : "bağlı değil — simülasyon modu."}
          </p>
        </AdmCard>

        <AdmCard title="Son talepler">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recentLeads.map((l, i) => (
              <div key={l.id} style={{ display: "flex", gap: 10, fontSize: "var(--fs-sm)" }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    marginTop: 6,
                    flex: "none",
                  }}
                />
                <div>
                  <b style={{ fontWeight: 600 }}>{l.name}</b>{" "}
                  <span style={{ color: "var(--text-muted)" }}>iletişim formu doldurdu</span>
                  <br />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)" }}>
                    {formatDate(l.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            {recentLeads.length === 0 && (
              <div style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}>Henüz talep yok.</div>
            )}
          </div>
        </AdmCard>
      </div>
    </>
  );
}
