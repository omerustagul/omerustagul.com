/* Hakkımızda — faithful port of pages/about.html: manifesto + animated stats +
   team grid. Static content (no DB), under the shared site chrome. */
export const metadata = { title: "Hakkımızda" };

const STATS: [number, string, string][] = [
  [240, "+", "Tamamlanan proje"],
  [98, "%", "Mutlu müşteri"],
  [31, "", "Kazanılan ödül"],
];

const TEAM: [string, string][] = [
  ["Deniz Arı", "Kurucu & Kreatif Direktör"],
  ["Ece Kaya", "Tasarım Lideri"],
  ["Mert Su", "Teknoloji Direktörü"],
  ["Lale Yön", "Strateji Direktörü"],
  ["Can Ak", "Kıdemli Geliştirici"],
  ["Su Demir", "Marka Tasarımcısı"],
  ["Ada Yıl", "Ürün Tasarımcısı"],
  ["Kaan Er", "Motion Tasarımcısı"],
];

export default function AboutPage() {
  return (
    <main className="page wrap">
      <header className="page__head reveal">
        <span className="eyebrow">Hakkımızda</span>
        <h1 className="manifesto">
          Markaları <em>dijitalde</em> yeni bir standarda taşıyoruz.
        </h1>
      </header>

      <section className="section">
        <div className="stats reveal">
          {STATS.map(([num, u, label]) => (
            <div className="stat" key={label}>
              <div className="stat__num" data-count={num}>
                {num}
                <span className="u">{u}</span>
              </div>
              <div className="stat__label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <header className="reveal" style={{ marginBottom: "var(--space-7)" }}>
          <span className="eyebrow">Ekip</span>
          <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 600, marginTop: "1rem" }}>Birlikte çalıştığın insanlar</h2>
        </header>
        <div className="team" id="team">
          {TEAM.map(([name, role], i) => (
            <div className="reveal" data-cursor="" key={name}>
              <div className="ph" style={{ aspectRatio: "3 / 4" }}>
                <div className="ph__in" style={{ filter: `hue-rotate(${i * 28}deg)` }} />
                <span className="ph__tag">PORTRE</span>
              </div>
              <h4>{name}</h4>
              <span>{role}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
