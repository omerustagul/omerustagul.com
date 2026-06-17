/* Faz 3 — Topluluk: "Haftanın İşi" (votes ranking), Koleksiyonlar (curated lists
   with follow) and a visitor Rozet (badge) strip. Tied to MarkaVotes + MarkaMembers.
   Registered as home sections (window.WeeklyWork, window.Collections). */
const { useState: useCmState, useEffect: useCmEffect } = React;

const PROJECT_META = {
  "atlas-finans-yeniden-markalasma": { title: "Atlas Finans yeniden markalaşma", client: "Atlas Bank · 2026", cat: "MARKA", hue: 20, href: "../../pages/project.html" },
  "nova-spor-uygulamasi": { title: "Nova Spor Uygulaması", client: "Nova · 2026", cat: "UI/UX", hue: 0, href: "#" },
  "venta-e-ticaret": { title: "Venta e-ticaret", client: "Venta · 2026", cat: "E-TİCARET", hue: -50, href: "#" },
  "pera-galeri-kimligi": { title: "Pera Galeri kimliği", client: "Pera Sanat · 2025", cat: "MARKA", hue: 40, href: "#" },
};
const cmAuthed = () => window.MarkaMembers && window.MarkaMembers.isAuthed();
function cmUseVotes() { const [, f] = useCmState(0); useCmEffect(() => { if (!window.MarkaVotes) return; return window.MarkaVotes.subscribe(() => f(n => n + 1)); }, []); }

/* ----------------- Haftanın İşi ----------------- */
function VoteHeart({ id }) {
  const voted = window.MarkaVotes && window.MarkaVotes.hasVoted(id);
  return (
    <button type="button" className={`vote vote--static ${voted ? "is-voted" : ""}`} aria-pressed={!!voted} aria-label="Vote"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.MarkaVotes.toggle(id); }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill={voted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z"/></svg>
      <span className="vote__n">{window.MarkaVotes ? window.MarkaVotes.count(id) : 0}</span>
    </button>
  );
}
function WeeklyWork() {
  cmUseVotes();
  if (!window.MarkaVotes) return null;
  const ranked = window.MarkaVotes.top(4).filter(r => PROJECT_META[r.id]);
  if (!ranked.length) return null;
  const top = ranked[0], rest = ranked.slice(1);
  const m = PROJECT_META[top.id];
  return (
    <section className="section wrap weekly" aria-label="Haftanın işi">
      <SectionHead eyebrow="Topluluk" title="Haftanın İşi" sub="Topluluğun oylarıyla öne çıkan projeler. Sen de beğen, sıralamayı belirle." linkText="" />
      <div className="weekly__grid">
        <a className="weekly__hero reveal" href={m.href} data-cursor="Projeyi Gör">
          <div className="weekly__cover"><Ph ratio="16/10" tag="PROJE GÖRSELİ" hue={m.hue} /><span className="weekly__crown">🏆 Haftanın İşi</span><span className="weekly__votes"><VoteHeart id={top.id} /></span></div>
          <div className="weekly__meta"><span className="card__meta mono">{m.cat}</span><h3>{m.title}</h3><span className="card__meta">{m.client}</span></div>
        </a>
        <ol className="weekly__list">
          {rest.map((r, i) => { const pm = PROJECT_META[r.id]; return (
            <li key={r.id} className="weekly__row reveal" style={{ transitionDelay: (i * 70) + "ms" }}>
              <span className="weekly__rank">{i + 2}</span>
              <div className="weekly__rowMedia"><Ph ratio="1/1" tag="" hue={pm.hue} /></div>
              <div className="weekly__rowMeta"><h4>{pm.title}</h4><span className="card__meta mono">{pm.cat}</span></div>
              <VoteHeart id={r.id} />
            </li>
          ); })}
        </ol>
      </div>
    </section>
  );
}

/* ----------------- Koleksiyonlar + Rozetler ----------------- */
const COLLECTIONS = [
  { id: "k1", title: "Editöryel Web", count: 18, hue: 0, base: 1240 },
  { id: "k2", title: "Cesur Tipografi", count: 24, hue: 40, base: 980 },
  { id: "k3", title: "Minimal E-ticaret", count: 15, hue: -50, base: 1530 },
  { id: "k4", title: "Hareket & Etkileşim", count: 12, hue: 200, base: 760 },
];
function getFollows() { try { return JSON.parse(localStorage.getItem("mk-follows") || "[]"); } catch (e) { return []; } }
function toggleFollow(id) { const f = getFollows(); const n = f.includes(id) ? f.filter(x => x !== id) : f.concat([id]); try { localStorage.setItem("mk-follows", JSON.stringify(n)); } catch (e) {} return n; }
function demoAvatars() { const ms = (window.MarkaMembers ? window.MarkaMembers.members() : []).slice(0, 3); return ms.length ? ms.map(m => (m.name || "?")[0]) : ["E", "M", "L"]; }

const BADGE_ICONS = {
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0",
  play: "M8 5v14l11-7z",
  heart: "M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z",
  bookmark: "M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z",
  trophy: "M7 4h10v3a5 5 0 01-10 0zM7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 14h6l-1 4h-4z",
};
function playedAny() {
  try { if (Object.keys(JSON.parse(localStorage.getItem("mk-games-played") || "{}")).length) return true; } catch (e) {}
  const u = cmAuthed() && window.MarkaMembers.current(); return !!(u && u.scores && Object.keys(u.scores).length);
}
function votedAny() { return window.MarkaVotes && Object.keys(PROJECT_META).some(id => window.MarkaVotes.hasVoted(id)); }
function championAny() {
  if (!cmAuthed()) return false;
  const cfg = [["memory", false], ["sequence", false], ["reaction", true]];
  return cfg.some(([g, low]) => { const r = window.MarkaMembers.rank(g, low); return r && r.rank === 1; });
}
function Badges() {
  cmUseVotes();
  const [, f] = useCmState(0);
  useCmEffect(() => { if (!window.MarkaMembers) return; return window.MarkaMembers.subscribe(() => f(n => n + 1)); }, []);
  const list = [
    { id: "uye", name: "Üye", desc: "Hesap oluştur", icon: "user", earned: cmAuthed() },
    { id: "oyuncu", name: "Oyuncu", desc: "Bir oyun oyna", icon: "play", earned: playedAny() },
    { id: "oy", name: "Oy Verdi", desc: "Bir projeye oy ver", icon: "heart", earned: votedAny() },
    { id: "koleksiyon", name: "Koleksiyoncu", desc: "Bir koleksiyon takip et", icon: "bookmark", earned: getFollows().length > 0 },
    { id: "sampiyon", name: "Şampiyon", desc: "Bir oyunda 1. ol", icon: "trophy", earned: championAny() },
  ];
  const earned = list.filter(b => b.earned).length;
  return (
    <div className="badges reveal" id="rozetler">
      <div className="badges__head"><span className="eyebrow">Rozetlerin</span><span className="badges__count">{earned}/{list.length}</span></div>
      <div className="badges__row">
        {list.map(b => (
          <div key={b.id} className={`badge3 ${b.earned ? "is-earned" : ""}`} title={b.desc}>
            <span className="badge3__ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={BADGE_ICONS[b.icon]} /></svg></span>
            <span className="badge3__nm">{b.name}</span>
            <span className="badge3__desc">{b.earned ? "Kazanıldı" : b.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function CollectionCard({ c }) {
  const [follows, setFollows] = useCmState(getFollows());
  const on = follows.includes(c.id);
  const avs = demoAvatars();
  return (
    <div className="collcard reveal">
      <div className="collcard__cover"><Ph ratio="16/10" tag="KOLEKSİYON" hue={c.hue} /><span className="collcard__count">{c.count} proje</span></div>
      <div className="collcard__b">
        <h3 className="collcard__title">{c.title}</h3>
        <div className="collcard__foot">
          <div className="collcard__people">
            <div className="avstack">{avs.map((a, i) => <span key={i} className="avstack__a">{a}</span>)}</div>
            <span className="collcard__followers">{(c.base + (on ? 1 : 0)).toLocaleString("tr-TR")} takipçi</span>
          </div>
          <button className={`followbtn ${on ? "is-on" : ""}`} onClick={() => setFollows(toggleFollow(c.id))}>{on ? "Takiptesin" : "Takip Et"}</button>
        </div>
      </div>
    </div>
  );
}
function Collections() {
  cmUseVotes();
  const cols = window.MarkaCommunity ? window.MarkaCommunity.collections() : COLLECTIONS;
  return (
    <section className="section wrap collections" aria-label="Koleksiyonlar">
      <SectionHead eyebrow="İlham" title="Koleksiyonlar" sub="Küratörlü proje koleksiyonlarını takip et, ilham akışını kişiselleştir." linkText="Tümünü Gör" />
      <Badges />
      <div className="grid-4 collections__grid">{cols.map(c => <CollectionCard key={c.id} c={c} />)}</div>
    </section>
  );
}

Object.assign(window, { WeeklyWork, Collections });
