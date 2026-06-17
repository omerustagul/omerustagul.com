/* Homepage "Zihin Oyunları" — mind-training games section + slide-up game stage.
   Three games (memory match · sequential attention trail · reflex) with a daily
   one-play limit and a leaderboard tied to MarkaMembers. Registered as the
   "games" home section (window.Games). Load as text/babel before app.jsx. */
const { useState: useGState, useEffect: useGEffect, useRef: useGRef } = React;

const GAMES = [
  { id: "memory", name: "Hafıza Eşleştirme", lower: false, unit: "puan",
    tag: "Hafıza", desc: "Kartları eşleştir; daha az hamle ve süre daha çok puan.",
    icon: "M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z" },
  { id: "sequence", name: "Sıralı Dikkat", lower: false, unit: "puan",
    tag: "Dikkat", desc: "1'den 12'ye sayıları sırayla, hızlıca bul ve dokun.",
    icon: "M4 6h4v4H4zM16 6h4v4h-4zM10 14h4v4h-4zM7 10l4 4M17 10l-3 4" },
  { id: "reaction", name: "Refleks", lower: true, unit: "ms",
    tag: "Reaksiyon", desc: "Yeşili gör, hemen dokun. Reaksiyon süreni ölç.",
    icon: "M13 2L4 14h7l-1 8 9-12h-7z" },
];
const gmeta = (id) => GAMES.find(g => g.id === id);
const today = () => new Date().toISOString().slice(0, 10);
const authed = () => window.MarkaMembers && window.MarkaMembers.isAuthed();

function dailyLimit() { return window.MarkaCommunity ? window.MarkaCommunity.dailyLimit() : 1; }
function playsToday(gid) {
  if (authed()) { const u = window.MarkaMembers.current(); const p = (u.scores && u.scores[gid] && u.scores[gid].plays) || []; return p.filter(x => x.date === today()).length; }
  try { const o = JSON.parse(localStorage.getItem("mk-games-played") || "{}")[gid]; return o && o.date === today() ? (o.count || 0) : 0; } catch (e) { return 0; }
}
function playedToday(gid) { return playsToday(gid) >= dailyLimit(); }
function markGuestPlayed(gid) {
  try { const o = JSON.parse(localStorage.getItem("mk-games-played") || "{}"); const cur = o[gid] && o[gid].date === today() ? o[gid].count : 0; o[gid] = { date: today(), count: cur + 1 }; localStorage.setItem("mk-games-played", JSON.stringify(o)); } catch (e) {}
}
function bestScore(gid) {
  const u = authed() && window.MarkaMembers.current();
  return u && u.scores && u.scores[gid] ? u.scores[gid].best : null;
}
function finishScore(gid, score, lower) {
  if (authed()) return window.MarkaMembers.submitScore(gid, score, lower);
  markGuestPlayed(gid);
  const board = (window.MarkaMembers ? window.MarkaMembers.leaderboard(gid, lower) : []);
  const arr = board.map(b => b.best).concat([score]).sort((a, b) => lower ? a - b : b - a);
  return { rank: arr.indexOf(score) + 1, total: arr.length, best: score, guest: true };
}

function dailyAvg(gid) {
  const g = gmeta(gid);
  const b = (window.MarkaMembers ? window.MarkaMembers.leaderboard(gid, g.lower) : []);
  if (!b.length) return null;
  return Math.round(b.reduce((a, r) => a + r.best, 0) / b.length);
}

/* per-game illustration banner */
function GameArt({ id }) {
  if (id === "memory") return (
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
  if (id === "sequence") return (
    <svg className="gart" viewBox="0 0 240 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="240" height="130" fill="var(--accent-tint)" />
      <polyline points="70,40 150,40 150,92 96,92" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" opacity="0.35" />
      <g fontFamily="var(--font-mono)" fontWeight="600" fontSize="15">
        <circle cx="70" cy="40" r="15" fill="var(--ink-900)" /><text x="70" y="45" textAnchor="middle" fill="#fff">1</text>
        <circle cx="150" cy="40" r="15" fill="var(--ink-900)" /><text x="150" y="45" textAnchor="middle" fill="#fff">2</text>
        <circle cx="150" cy="92" r="15" fill="var(--ink-900)" /><text x="150" y="97" textAnchor="middle" fill="#fff">3</text>
        <circle cx="96" cy="92" r="15" fill="var(--accent)" /><text x="96" y="97" textAnchor="middle" fill="#fff">4</text>
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

/* ---------------- shared timer hook ---------------- */
function useTimer(running) {
  const [ms, setMs] = useGState(0);
  const start = useGRef(0);
  useGEffect(() => {
    if (!running) return;
    start.current = performance.now() - ms;
    const iv = setInterval(() => setMs(performance.now() - start.current), 100);
    return () => clearInterval(iv);
  }, [running]);
  return [ms, () => setMs(0)];
}

/* ======================= MEMORY ======================= */
const MEM_GLYPHS = [
  { s: "✦", c: "#16D17F" }, { s: "●", c: "#2A6FDB" }, { s: "■", c: "#E0567C" }, { s: "▲", c: "#F2A93B" },
  { s: "◆", c: "#9B5CF6" }, { s: "★", c: "#E8643C" }, { s: "⬢", c: "#23B5B5" }, { s: "♦", c: "#7A8794" },
];
function MemoryGame({ onFinish }) {
  const [cards, setCards] = useGState(() => {
    const deck = MEM_GLYPHS.concat(MEM_GLYPHS).map((g, i) => ({ id: i, g, flipped: false, matched: false }));
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    return deck;
  });
  const [sel, setSel] = useGState([]);
  const [tries, setTries] = useGState(0);
  const [lock, setLock] = useGState(false);
  const [running, setRunning] = useGState(true);
  const [ms] = useTimer(running);

  const flip = (i) => {
    if (lock || cards[i].flipped || cards[i].matched) return;
    const nc = cards.slice(); nc[i] = { ...nc[i], flipped: true }; setCards(nc);
    const ns = sel.concat([i]); setSel(ns);
    if (ns.length === 2) {
      setTries(t => t + 1); setLock(true);
      const [a, b] = ns;
      if (nc[a].g.s === nc[b].g.s && nc[a].g.c === nc[b].g.c) {
        setTimeout(() => { const x = nc.slice(); x[a] = { ...x[a], matched: true }; x[b] = { ...x[b], matched: true }; setCards(x); setSel([]); setLock(false);
          if (x.every(c => c.matched)) { setRunning(false); const secs = ms / 1000; const score = Math.max(10, Math.round(120 - (tries + 1) * 3 - secs)); onFinish(score); }
        }, 360);
      } else {
        setTimeout(() => { const x = nc.slice(); x[a] = { ...x[a], flipped: false }; x[b] = { ...x[b], flipped: false }; setCards(x); setSel([]); setLock(false); }, 760);
      }
    }
  };
  const matched = cards.filter(c => c.matched).length / 2;
  return (
    <div className="gm">
      <div className="gm__hud"><span>Eşleşme <b>{matched}/8</b></span><span>Hamle <b>{tries}</b></span><span className="gm__time">{(ms / 1000).toFixed(1)}s</span></div>
      <div className="mem-grid">
        {cards.map((c, i) => (
          <button key={c.id} className={`mem-card ${c.flipped || c.matched ? "is-up" : ""} ${c.matched ? "is-matched" : ""}`} onClick={() => flip(i)} aria-label="kart">
            <span className="mem-card__in">
              <span className="mem-card__back"></span>
              <span className="mem-card__face" style={{ color: c.g.c }}>{c.g.s}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================= SEQUENCE (trail) ======================= */
const SEQ_N = 12, SEQ_COLS = 6, SEQ_CELLS = 36;
function SequenceGame({ onFinish }) {
  const [placement] = useGState(() => {
    const cells = Array.from({ length: SEQ_CELLS }, (_, i) => i);
    for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
    const map = {}; for (let n = 1; n <= SEQ_N; n++) map[cells[n - 1]] = n; return map;
  });
  const [next, setNext] = useGState(1);
  const [wrong, setWrong] = useGState(0);
  const [flash, setFlash] = useGState(null);
  const [started, setStarted] = useGState(false);
  const [running, setRunning] = useGState(false);
  const [ms] = useTimer(running);
  const path = useGRef([]); const [, force] = useGState(0);

  const cellXY = (cell) => ({ x: (cell % SEQ_COLS) + 0.5, y: Math.floor(cell / SEQ_COLS) + 0.5 });
  const tap = (cell) => {
    const val = placement[cell]; if (!val) return;
    if (val === next) {
      if (!started) { setStarted(true); setRunning(true); }
      path.current = path.current.concat([cellXY(cell)]); force(n => n + 1);
      if (val === SEQ_N) { setRunning(false); const secs = ms / 1000; const score = Math.max(10, Math.round(120 - secs * 4 - wrong * 6)); setNext(val + 1); onFinish(score); }
      else setNext(val + 1);
    } else { setWrong(w => w + 1); setFlash(cell); setTimeout(() => setFlash(null), 280); }
  };
  return (
    <div className="gm">
      <div className="gm__hud"><span>Sıradaki <b>{next > SEQ_N ? "✓" : next}</b></span><span>Hata <b>{wrong}</b></span><span className="gm__time">{(ms / 1000).toFixed(1)}s</span></div>
      <div className="seq-wrap">
        <svg className="seq-trail" viewBox={`0 0 ${SEQ_COLS} ${SEQ_CELLS / SEQ_COLS}`} preserveAspectRatio="none" aria-hidden="true">
          {path.current.length > 1 && <polyline points={path.current.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--accent)" strokeWidth="0.16" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />}
        </svg>
        <div className="seq-grid">
          {Array.from({ length: SEQ_CELLS }, (_, cell) => {
            const val = placement[cell]; const done = val && val < next;
            return <button key={cell} className={`seq-cell ${val ? "has" : ""} ${done ? "done" : ""} ${flash === cell ? "wrong" : ""}`} onClick={() => tap(cell)} disabled={!val}>{val || ""}</button>;
          })}
        </div>
      </div>
      {!started && <p className="gm__hint">İlk sayıya (1) dokununca süre başlar.</p>}
    </div>
  );
}

/* ======================= REFLEX ======================= */
const RX_ROUNDS = 5;
function ReflexGame({ onFinish }) {
  const [phase, setPhase] = useGState("idle"); // idle | wait | go | early
  const [round, setRound] = useGState(0);
  const [times, setTimes] = useGState([]);
  const [last, setLast] = useGState(null);
  const goAt = useGRef(0); const timer = useGRef(null);

  const arm = () => { setPhase("wait"); setLast(null); timer.current = setTimeout(() => { goAt.current = performance.now(); setPhase("go"); }, 900 + Math.random() * 2200); };
  useGEffect(() => () => clearTimeout(timer.current), []);
  const click = () => {
    if (phase === "idle") { arm(); return; }
    if (phase === "wait") { clearTimeout(timer.current); setPhase("early"); return; }
    if (phase === "early") { arm(); return; }
    if (phase === "go") {
      const t = Math.round(performance.now() - goAt.current); setLast(t);
      const nt = times.concat([t]); setTimes(nt); const r = round + 1; setRound(r);
      if (r >= RX_ROUNDS) { const avg = Math.round(nt.reduce((a, b) => a + b, 0) / nt.length); setPhase("done"); setTimeout(() => onFinish(avg), 700); }
      else setPhase("between");
    }
  };
  return (
    <div className="gm">
      <div className="gm__hud"><span>Tur <b>{Math.min(round + 1, RX_ROUNDS)}/{RX_ROUNDS}</b></span><span>Son <b>{last != null ? last + "ms" : "—"}</b></span><span className="gm__time">{times.length ? "ort " + Math.round(times.reduce((a, b) => a + b, 0) / times.length) + "ms" : ""}</span></div>
      <button className={`rx rx--${phase}`} onClick={phase === "between" ? () => arm() : click}>
        {phase === "idle" && <><b>Başla</b><span>Dokun ve hazır ol</span></>}
        {phase === "wait" && <><b>Bekle…</b><span>Yeşili bekle</span></>}
        {phase === "go" && <><b>DOKUN!</b></>}
        {phase === "early" && <><b>Çok erken!</b><span>Tekrar denemek için dokun</span></>}
        {phase === "between" && <><b>{last}ms</b><span>Sonraki tur için dokun</span></>}
        {phase === "done" && <><b>Bitti ✓</b></>}
      </button>
    </div>
  );
}

/* ======================= RESULTS + LEADERBOARD ======================= */
function tierMessage(rank, total) {
  if (rank === 1) return { emoji: "🔥🔥🔥", title: "Zirvedesin!", text: "Birinci sıradasın — resmen alev aldın. Bu zihin seninle gurur duyuyor." };
  if (rank <= 3) return { emoji: "✨", title: "Çok yeteneklisin!", text: "Podyumdasın. Bir dahakine zirve kesinlikle senin — buna çok az kaldı." };
  if (rank <= 8) return { emoji: "💪", title: "İyi gidiyorsun!", text: "İlk sekiztesin. Biraz daha pratikle üst sıralara rahatça çıkarsın." };
  return { emoji: "🌱", title: "Gelişim yolundasın", text: "Daha sık zihin egzersizi yap; düzenli oynayanlar kısa sürede fark atıyor." };
}
function GameResults({ gid, score, rank, onClose }) {
  const g = gmeta(gid);
  const board = (window.MarkaMembers ? window.MarkaMembers.leaderboard(gid, g.lower) : []).slice(0, 8);
  const me = authed() && window.MarkaMembers.current();
  const t = rank ? tierMessage(rank.rank, rank.total) : null;
  return (
    <div className="gres">
      <div className="gres__hero">
        {t && <div className="gres__emoji">{t.emoji}</div>}
        <span className="eyebrow">{g.name}</span>
        <div className="gres__score">{score}<span className="u">{g.unit}</span></div>
        {rank && <div className="gres__rank">{rank.total} kişi içinde <b>#{rank.rank}</b></div>}
        {t && <><h3 className="gres__title">{t.title}</h3><p className="gres__text">{t.text}</p></>}
        {rank && rank.guest && <p className="gres__guest">Skorun sıralamaya kaydedilmedi. <button className="gres__login" data-action="open-auth">Giriş yap</button> ve listede yer al.</p>}
      </div>
      <div className="gres__board">
        <div className="gres__board-h"><span>Bugünün Sıralaması</span><span>{g.unit}</span></div>
        {board.map((r, i) => (
          <div key={r.id} className={`gres__row ${me && r.id === me.id ? "is-me" : "is-blur"}`}>
            <span className="gres__pos">{i + 1}</span>
            <span className="gres__ava">{r.avatar ? <img src={r.avatar} alt="" /> : (r.name || "?")[0]}</span>
            <span className="gres__nm">{me && r.id === me.id ? r.name + " (sen)" : r.name}</span>
            <span className="gres__val">{r.best}</span>
          </div>
        ))}
        {!board.length && <p className="gm__hint">Henüz skor yok — ilk sen ol!</p>}
      </div>
      <div className="gres__cta">
        <button className="btn btn--primary" onClick={onClose}>Kapat <span className="arr">→</span></button>
        <span className="gres__again">Günde 1 hak · yarın tekrar gel</span>
      </div>
    </div>
  );
}

/* ======================= STAGE (slide-up) ======================= */
function GameStage({ gid, onClose }) {
  const [open, setOpen] = useGState(false);
  const [phase, setPhase] = useGState(playedToday(gid) ? "done-already" : "play");
  const [result, setResult] = useGState(null);
  useGEffect(() => { const t = setTimeout(() => setOpen(true), 30); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; clearTimeout(t); }; }, []);
  const close = () => { setOpen(false); setTimeout(onClose, 380); };
  const g = gmeta(gid);
  const finish = (score) => { const rank = finishScore(gid, score, g.lower); setResult({ score, rank }); setPhase("result"); };

  return (
    <div className={`gstage ${open ? "is-open" : ""}`} role="dialog" aria-modal="true">
      <div className="gstage__scrim" onClick={close}></div>
      <div className="gstage__sheet">
        <div className="gstage__bar">
          <span className="gstage__tag">{g.tag}</span>
          <h2 className="gstage__title">{g.name}</h2>
          <button className="gstage__x" onClick={close} aria-label="Kapat">✕</button>
        </div>
        <div className="gstage__body">
          {phase === "play" && gid === "memory" && <MemoryGame onFinish={finish} />}
          {phase === "play" && gid === "sequence" && <SequenceGame onFinish={finish} />}
          {phase === "play" && gid === "reaction" && <ReflexGame onFinish={finish} />}
          {phase === "result" && <GameResults gid={gid} score={result.score} rank={result.rank} onClose={close} />}
          {phase === "done-already" && <GameResults gid={gid} score={bestScore(gid) != null ? bestScore(gid) : "—"} rank={window.MarkaMembers && authed() ? window.MarkaMembers.rank(gid, g.lower) : null} onClose={close} />}
        </div>
      </div>
    </div>
  );
}

/* ======================= HOME SECTION ======================= */
function Games() {
  const [active, setActive] = useGState(null);
  const [, force] = useGState(0);
  useGEffect(() => { if (!window.MarkaMembers) return; return window.MarkaMembers.subscribe(() => force(n => n + 1)); }, []);
  useGEffect(() => { if (!window.MarkaCommunity) return; return window.MarkaCommunity.subscribe(() => force(n => n + 1)); }, []);
  return (
    <section className="section wrap games" id="oyunlar">
      <header className="games__head reveal">
        <span className="eyebrow">Zihin Oyunları</span>
        <h2 className="games__title">Zihnine bir mola, bir meydan okuma.</h2>
        <p className="games__lead">İnsan zihni egzersizle keskinleşir. Hafıza, dikkat ve reaksiyonunu güçlendiren kısa oyunlar hazırladık — her gün bir kez oyna, sıralamada yüksel.</p>
      </header>
      <div className="games__grid">
        {GAMES.filter(g => !window.MarkaCommunity || window.MarkaCommunity.gameOn(g.id)).map((g, i) => {
          const played = playedToday(g.id); const best = bestScore(g.id); const avg = dailyAvg(g.id);
          return (
            <button key={g.id} className="gcard reveal" style={{ transitionDelay: (i * 80) + "ms" }} onClick={() => setActive(g.id)} data-cursor={played ? "Sıralama" : "Oyna"}>
              <GameArt id={g.id} />
              <div className="gcard__b">
                <span className="gcard__tag">{g.tag}</span>
                <h3 className="gcard__name">{g.name}</h3>
                <p className="gcard__desc">{g.desc}</p>
                <div className="gcard__foot">
                  <span className={`gcard__status ${played ? "is-done" : ""}`}>{played ? "Bugün oynandı" : "Bugün oynanabilir"}</span>
                  <div className="gcard__stats">
                    {avg != null && <span className="gcard__avg">Gün ort. <b>{avg}{g.unit === "ms" ? "ms" : ""}</b></span>}
                    {best != null && <span className="gcard__best">En iyi <b>{best}{g.unit === "ms" ? "ms" : ""}</b></span>}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {active && <GameStage gid={active} onClose={() => { setActive(null); force(n => n + 1); }} />}
    </section>
  );
}

Object.assign(window, { Games });
