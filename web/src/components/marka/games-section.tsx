import Link from "next/link";

/* Faithful port of the homepage "Zihin Oyunları" section (ui_kits/website/Games.jsx).
   Cards link to /oyunlar where the games are played. */

function GameArt({ id }: { id: string }) {
  if (id === "memory")
    return (
      <svg className="gart" viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="240" height="130" fill="var(--accent-tint)" />
        <g transform="translate(46 26)">
          <rect x="0" y="0" width="40" height="36" rx="7" fill="#fff" stroke="var(--border)" />
          <rect x="52" y="0" width="40" height="36" rx="7" fill="var(--accent)" />
          <text x="72" y="25" fontSize="20" textAnchor="middle" fill="#fff">★</text>
          <rect x="104" y="0" width="40" height="36" rx="7" fill="#fff" stroke="var(--border)" />
          <rect x="0" y="46" width="40" height="36" rx="7" fill="var(--accent)" />
          <text x="20" y="71" fontSize="20" textAnchor="middle" fill="#fff">★</text>
          <rect x="52" y="46" width="40" height="36" rx="7" fill="#fff" stroke="var(--border)" />
          <rect x="104" y="46" width="40" height="36" rx="7" fill="#fff" stroke="var(--border)" />
        </g>
      </svg>
    );
  if (id === "sequence")
    return (
      <svg className="gart" viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="240" height="130" fill="var(--accent-tint)" />
        <polyline points="70,40 150,40 150,92 96,92" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" opacity="0.35" />
        <g fontFamily="var(--font-mono)" fontWeight="600" fontSize="15">
          <circle cx="70" cy="40" r="15" fill="var(--ink-900)" />
          <text x="70" y="45" textAnchor="middle" fill="#fff">1</text>
          <circle cx="150" cy="40" r="15" fill="var(--ink-900)" />
          <text x="150" y="45" textAnchor="middle" fill="#fff">2</text>
          <circle cx="150" cy="92" r="15" fill="var(--ink-900)" />
          <text x="150" y="97" textAnchor="middle" fill="#fff">3</text>
          <circle cx="96" cy="92" r="15" fill="var(--accent)" />
          <text x="96" y="97" textAnchor="middle" fill="#fff">4</text>
        </g>
      </svg>
    );
  return (
    <svg className="gart" viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="240" height="130" fill="var(--accent-tint)" />
      <circle cx="120" cy="65" r="44" fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.3" />
      <circle cx="120" cy="65" r="30" fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.5" />
      <circle cx="120" cy="65" r="16" fill="var(--accent)" />
      <path d="M122 56l-9 13h7l-1 9 9-13h-7z" fill="#fff" />
    </svg>
  );
}

const GAMES = [
  { id: "memory", name: "Hafıza Eşleştirme", tag: "Hafıza", desc: "Kartları eşleştir; daha az hamle ve süre daha çok puan." },
  { id: "sequence", name: "Sıralı Dikkat", tag: "Dikkat", desc: "1'den 12'ye sayıları sırayla, hızlıca bul ve dokun." },
  { id: "reaction", name: "Refleks", tag: "Reaksiyon", desc: "Yeşili gör, hemen dokun. Reaksiyon süreni ölç." },
];

export function GamesSection() {
  return (
    <section className="section wrap games" id="oyunlar">
      <header className="games__head reveal">
        <span className="eyebrow">Zihin Oyunları</span>
        <h2 className="games__title">Zihnine bir mola, bir meydan okuma.</h2>
        <p className="games__lead">
          İnsan zihni egzersizle keskinleşir. Hafıza, dikkat ve reaksiyonunu güçlendiren kısa oyunlar hazırladık — her
          gün bir kez oyna, sıralamada yüksel.
        </p>
      </header>
      <div className="games__grid">
        {GAMES.map((g, i) => (
          <Link key={g.id} className="gcard reveal" href="/oyunlar" style={{ transitionDelay: `${i * 80}ms` }} data-cursor="Oyna">
            <GameArt id={g.id} />
            <div className="gcard__b">
              <span className="gcard__tag">{g.tag}</span>
              <h3 className="gcard__name">{g.name}</h3>
              <p className="gcard__desc">{g.desc}</p>
              <div className="gcard__foot">
                <span className="gcard__status">Bugün oynanabilir</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
