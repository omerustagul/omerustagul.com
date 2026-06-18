import { prisma } from "@/lib/prisma";
import { saveSettings } from "@/lib/actions/admin";
import { AdminHeader, FormCard, SubmitButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const FONTS = ["general", "space", "schibsted", "hanken"];
const HEADERS = ["classic", "centered", "minimal", "split"];
const FOOTERS = ["columns", "compact"];

export default async function AdminSettings() {
  const row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const d = (row?.data ?? {}) as Record<string, unknown>;
  const get = (k: string, fallback: string) => (d[k] != null ? String(d[k]) : fallback);

  return (
    <div>
      <AdminHeader title="Ayarlar — Görünüm" />
      <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", marginBottom: "1.5rem", maxWidth: "44ch" }}>
        Site varsayılan teması. Ziyaretçiler kendi temalarını da seçebilir (ThemeProvider).
      </p>
      <form action={saveSettings}>
        <FormCard>
          <label className="mk-field">
            <span className="mk-field__label">VURGU RENGİ</span>
            <input className="mk-input" name="accent" type="color" defaultValue={get("accent", "#16D17F")} style={{ height: "3rem" }} />
          </label>

          <label className="mk-field">
            <span className="mk-field__label">MOD</span>
            <select className="mk-select" name="mode" defaultValue={get("mode", "light")}>
              <option value="light">Açık</option>
              <option value="dark">Koyu</option>
            </select>
          </label>

          <label className="mk-field">
            <span className="mk-field__label">FONT</span>
            <select className="mk-select" name="font" defaultValue={get("font", "general")}>
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>

          <label className="mk-field">
            <span className="mk-field__label">KÖŞE YARIÇAPI</span>
            <input className="mk-input" name="radius" type="number" defaultValue={get("radius", "10")} />
          </label>

          <label className="mk-field">
            <span className="mk-field__label">HEADER ŞABLONU</span>
            <select className="mk-select" name="headerTemplate" defaultValue={get("headerTemplate", "classic")}>
              {HEADERS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>

          <label className="mk-field">
            <span className="mk-field__label">FOOTER ŞABLONU</span>
            <select className="mk-select" name="footerTemplate" defaultValue={get("footerTemplate", "columns")}>
              {FOOTERS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>

          <SubmitButton />
        </FormCard>
      </form>
    </div>
  );
}
