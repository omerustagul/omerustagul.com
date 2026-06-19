"use client";

import React, { useState } from "react";
import { AdmCard, StatCard } from "@/components/admin/ui";
import { Icon } from "@/components/admin/AdminIcons";

// Render utility for simple Markdown
function repInlineBold(s: string) {
  return s.split(/\*\*(.+?)\*\*/g).map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p));
}

function repRenderMD(text: string) {
  const lines = (text || "").split("\n");
  const out: any[] = [];
  let bul: string[] = [];

  const flush = () => {
    if (bul.length) {
      out.push(
        <ul key={"u" + out.length} className="rep-ul" style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
          {bul.map((b, i) => (
            <li key={i} style={{ marginBottom: "0.5rem" }}>{repInlineBold(b)}</li>
          ))}
        </ul>
      );
      bul = [];
    }
  };

  lines.forEach((ln, idx) => {
    const t = ln.trim();
    if (!t || /^---+$/.test(t)) {
      flush();
      return;
    }
    if (/^#{1,3}\s+/.test(t)) {
      flush();
      out.push(
        <h4 key={idx} className="rep-h" style={{ fontSize: "16px", fontWeight: 600, marginTop: "1.5rem", marginBottom: "1rem" }}>
          {repInlineBold(t.replace(/^#{1,3}\s+/, ""))}
        </h4>
      );
      return;
    }
    if (/^[-•*]\s+/.test(t)) {
      bul.push(t.replace(/^[-•*]\s+/, ""));
      return;
    }
    flush();
    out.push(
      <p key={idx} className="rep-p" style={{ lineHeight: 1.6, marginBottom: "1rem", color: "var(--text)" }}>
        {repInlineBold(t)}
      </p>
    );
  });
  flush();
  return out;
}

export function ReportsClient({ stats }: { stats: any[] }) {
  const [report, setReport] = useState<{ date: string; narrative: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const week = [42, 55, 48, 63, 71, 58, 80];
  const maxW = Math.max(...week);
  const days = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
  
  const sources = [
    { label: "Doğrudan", percent: 45 },
    { label: "Sosyal Medya", percent: 32 },
    { label: "Organik Arama", percent: 18 },
    { label: "Referans", percent: 5 },
  ];

  const run = async () => {
    setBusy(true);
    // Simulate AI request delay
    await new Promise((r) => setTimeout(r, 2000));
    
    const sampleNarrative = `
## Yönetici özeti
Geçtiğimiz hafta, trafik hedeflerimizde **%12'lik** net bir büyüme yakaladık. Özellikle salı ve cuma günleri yayınlanan içeriklerin sosyal medya etkileşimini yukarı taşıdığı görülüyor. Marka bilinirliği metrikleri yükseliş trendinde ve sayfa başı kalma süresi **2.4 dakikaya** ulaştı.

## Öneriler
*   **Hafta Sonu Etkileşimi:** Hafta sonu trafiğindeki düşüşü canlandırmak için cumartesi sabahları hafif bir bülten veya özet içerik planlanabilir.
*   **Arama Motoru Optimizasyonu:** Özellikle son yayınlanan 3 makalenin SEO başlıklarını, güncel arama trendlerine göre optimize edelim.
*   **Dönüşüm Oranı:** Satış sayfalarındaki çağrı butonlarının renklerini ve mikro metinlerini A/B testine sokarak %3 seviyesindeki dönüşüm oranını artırabiliriz.
    `;

    setReport({
      date: new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }),
      narrative: sampleNarrative.trim(),
    });
    setBusy(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="adm-grid adm-grid--4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="adm-grid adm-grid--2" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        <AdmCard title="Haftalık trafik" desc="Son 7 gün · oturum">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 200, paddingTop: 20, paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
            {week.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "100%", height: `${(h / maxW) * 100}%`, background: "var(--accent)", borderRadius: "6px 6px 0 0", opacity: 0.35 + i * 0.09, transition: "height 0.5s ease" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{days[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "14px", color: "var(--text-muted)" }}>
            <span>Toplam Ziyaret: <b>3,492</b></span>
            <span>En Yoğun: <b>Pazar (80%)</b></span>
          </div>
        </AdmCard>

        <AdmCard title="Trafik kaynakları" desc="Kanala göre dağılım">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            {sources.map((src, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 100, fontSize: 14, color: "var(--text-muted)" }}>{src.label}</div>
                <div style={{ flex: 1, height: 8, background: "var(--surface-muted)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${src.percent}%`, height: "100%", background: "var(--accent)" }} />
                </div>
                <div style={{ width: 40, fontSize: 14, fontWeight: 600, textAlign: "right" }}>%{src.percent}</div>
              </div>
            ))}
          </div>
        </AdmCard>
      </div>

      <AdmCard
        title={report ? "Yönetici Raporu" : "AI İçgörü & Raporlar"}
        desc={report ? `${report.date} tarihli analiz` : "Gerçek zamanlı AI analizi"}
        action={
          <button className="adm-btn adm-btn--ghost" disabled={busy} onClick={run}>
            {busy ? "Yenileniyor..." : report ? "Yeniden oluştur" : "Rapor oluştur"}
          </button>
        }
      >
        {!report && !busy && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--surface-muted)", borderRadius: "8px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#fff", padding: "8px 16px", borderRadius: "20px", fontWeight: 600, marginBottom: "2rem" }}>
              <Icon name="ai" size={16} fill /> Marka AI Analist
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "1rem" }}>Haftalık Performans Raporu</h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Yapay zeka, ziyaretçi istatistiklerini, form verilerini ve son site hareketlerini inceleyerek sizin için eyleme dönük tavsiyeler içeren bir rapor hazırlasın.
            </p>
            <button
              className="adm-btn adm-btn--primary"
              style={{ padding: "12px 24px", fontSize: "16px" }}
              onClick={run}
            >
              <Icon name="ai" size={18} /> Raporu oluştur
            </button>
          </div>
        )}

        {busy && (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
            <span className="ai-spinner" style={{ borderColor: "var(--accent)", borderTopColor: "transparent", width: 32, height: 32, borderWidth: 3, display: "inline-block", marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text)" }}>AI analiz yapıyor...</h3>
            <p>Metrikler toplanıyor ve içgörüler oluşturuluyor.</p>
          </div>
        )}

        {report && !busy && (
          <div className="rep-doc" style={{ fontSize: "15px" }}>
            {repRenderMD(report.narrative)}
          </div>
        )}
      </AdmCard>
    </div>
  );
}
