"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { getLeaderboard, submitScore, type GameStat, type LeaderRow } from "@/lib/actions/games";

/* Faithful port of ui_kits/website/Games.jsx — homepage "Zihin Oyunları"
   section + slide-up game stage popup (memory · sequence · reflex) with a
   daily limit and a leaderboard. */

type Game = { id: string; name: string; tag: string; desc: string; lower: boolean; unit: string };
const GAMES: Game[] = [
  { id: "memory", name: "Hafıza Eşleştirme", tag: "Hafıza", lower: false, unit: "puan", desc: "Kartları eşleştir; daha az hamle ve süre daha çok puan." },
  { id: "sequence", name: "Sıralı Dikkat", tag: "Dikkat", lower: false, unit: "puan", desc: "1'den 12'ye sayıları sırayla, hızlıca bul ve dokun." },
  { id: "reaction", name: "Refleks", tag: "Reaksiyon", lower: true, unit: "ms", desc: "Yeşili gör, hemen dokun. Reaksiyon süreni ölç." },
];
const gmeta = (id: string) => GAMES.find((g) => g.id === id)!;

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

function useTimer(running: boolean): number {
  const [ms, setMs] = useState(0);
  const start = useRef(0);
  useEffect(() => {
    if (!running) return;
    start.current = performance.now() - ms;
    const iv = setInterval(() => setMs(performance.now() - start.current), 100);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);
  return ms;
}

/* ---------------- memory ---------------- */
const MEM_GLYPHS = [
  { s: "✦", c: "#16D17F" }, { s: "●", c: "#2A6FDB" }, { s: "■", c: "#E0567C" }, { s: "▲", c: "#F2A93B" },
  { s: "◆", c: "#9B5CF6" }, { s: "★", c: "#E8643C" }, { s: "⬢", c: "#23B5B5" }, { s: "♦", c: "#7A8794" },
];
type Card = { id: number; g: (typeof MEM_GLYPHS)[number]; flipped: boolean; matched: boolean };
function MemoryGame({ onFinish }: { onFinish: (score: number) => void }) {
  const [cards, setCards] = useState<Card[]>(() => {
    const deck: Card[] = MEM_GLYPHS.concat(MEM_GLYPHS).map((g, i) => ({ id: i, g, flipped: false, matched: false }));
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  });
  const [sel, setSel] = useState<number[]>([]);
  const [tries, setTries] = useState(0);
  const [lock, setLock] = useState(false);
  const [running, setRunning] = useState(true);
  const ms = useTimer(running);

  const flip = (i: number) => {
    if (lock || cards[i].flipped || cards[i].matched) return;
    const nc = cards.slice();
    nc[i] = { ...nc[i], flipped: true };
    setCards(nc);
    const ns = sel.concat([i]);
    setSel(ns);
    if (ns.length === 2) {
      setTries((t) => t + 1);
      setLock(true);
      const [a, b] = ns;
      if (nc[a].g.s === nc[b].g.s && nc[a].g.c === nc[b].g.c) {
        setTimeout(() => {
          const x = nc.slice();
          x[a] = { ...x[a], matched: true };
          x[b] = { ...x[b], matched: true };
          setCards(x);
          setSel([]);
          setLock(false);
          if (x.every((c) => c.matched)) {
            setRunning(false);
            const secs = ms / 1000;
            const score = Math.max(10, Math.round(120 - (tries + 1) * 3 - secs));
            onFinish(score);
          }
        }, 360);
      } else {
        setTimeout(() => {
          const x = nc.slice();
          x[a] = { ...x[a], flipped: false };
          x[b] = { ...x[b], flipped: false };
          setCards(x);
          setSel([]);
          setLock(false);
        }, 760);
      }
    }
  };
  const matched = cards.filter((c) => c.matched).length / 2;
  return (
    <div className="gm">
      <div className="gm__hud">
        <span>Eşleşme <b>{matched}/8</b></span>
        <span>Hamle <b>{tries}</b></span>
        <span className="gm__time">{(ms / 1000).toFixed(1)}s</span>
      </div>
      <div className="mem-grid">
        {cards.map((c, i) => (
          <button key={c.id} className={`mem-card ${c.flipped || c.matched ? "is-up" : ""} ${c.matched ? "is-matched" : ""}`} onClick={() => flip(i)} aria-label="kart">
            <span className="mem-card__in">
              <span className="mem-card__back" />
              <span className="mem-card__face" style={{ color: c.g.c }}>{c.g.s}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- sequence ---------------- */
const SEQ_N = 12, SEQ_COLS = 6, SEQ_CELLS = 36;
function SequenceGame({ onFinish }: { onFinish: (score: number) => void }) {
  const [placement] = useState<Record<number, number>>(() => {
    const cells = Array.from({ length: SEQ_CELLS }, (_, i) => i);
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    const map: Record<number, number> = {};
    for (let n = 1; n <= SEQ_N; n++) map[cells[n - 1]] = n;
    return map;
  });
  const [next, setNext] = useState(1);
  const [wrong, setWrong] = useState(0);
  const [flash, setFlash] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const ms = useTimer(running);
  const path = useRef<{ x: number; y: number }[]>([]);
  const [, force] = useState(0);

  const cellXY = (cell: number) => ({ x: (cell % SEQ_COLS) + 0.5, y: Math.floor(cell / SEQ_COLS) + 0.5 });
  const tap = (cell: number) => {
    const val = placement[cell];
    if (!val) return;
    if (val === next) {
      if (!started) {
        setStarted(true);
        setRunning(true);
      }
      path.current = path.current.concat([cellXY(cell)]);
      force((n) => n + 1);
      if (val === SEQ_N) {
        setRunning(false);
        const secs = ms / 1000;
        const score = Math.max(10, Math.round(120 - secs * 4 - wrong * 6));
        setNext(val + 1);
        onFinish(score);
      } else setNext(val + 1);
    } else {
      setWrong((w) => w + 1);
      setFlash(cell);
      setTimeout(() => setFlash(null), 280);
    }
  };
  return (
    <div className="gm">
      <div className="gm__hud">
        <span>Sıradaki <b>{next > SEQ_N ? "✓" : next}</b></span>
        <span>Hata <b>{wrong}</b></span>
        <span className="gm__time">{(ms / 1000).toFixed(1)}s</span>
      </div>
      <div className="seq-wrap">
        <svg className="seq-trail" viewBox={`0 0 ${SEQ_COLS} ${SEQ_CELLS / SEQ_COLS}`} preserveAspectRatio="none" aria-hidden="true">
          {path.current.length > 1 && (
            <polyline points={path.current.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--accent)" strokeWidth="0.16" strokeLinejoin="round" strokeLinecap="round" opacity="0.5" />
          )}
        </svg>
        <div className="seq-grid">
          {Array.from({ length: SEQ_CELLS }, (_, cell) => {
            const val = placement[cell];
            const done = val && val < next;
            return (
              <button key={cell} className={`seq-cell ${val ? "has" : ""} ${done ? "done" : ""} ${flash === cell ? "wrong" : ""}`} onClick={() => tap(cell)} disabled={!val}>
                {val || ""}
              </button>
            );
          })}
        </div>
      </div>
      {!started && <p className="gm__hint">İlk sayıya (1) dokununca süre başlar.</p>}
    </div>
  );
}

/* ---------------- reflex ---------------- */
const RX_ROUNDS = 5;
function ReflexGame({ onFinish }: { onFinish: (score: number) => void }) {
  const [phase, setPhase] = useState<"idle" | "wait" | "go" | "early" | "between" | "done">("idle");
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [last, setLast] = useState<number | null>(null);
  const goAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const arm = () => {
    setPhase("wait");
    setLast(null);
    timer.current = setTimeout(() => {
      goAt.current = performance.now();
      setPhase("go");
    }, 900 + Math.random() * 2200);
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const click = () => {
    if (phase === "idle") return arm();
    if (phase === "wait") {
      if (timer.current) clearTimeout(timer.current);
      setPhase("early");
      return;
    }
    if (phase === "early") return arm();
    if (phase === "go") {
      const t = Math.round(performance.now() - goAt.current);
      setLast(t);
      const nt = times.concat([t]);
      setTimes(nt);
      const r = round + 1;
      setRound(r);
      if (r >= RX_ROUNDS) {
        const avg = Math.round(nt.reduce((a, b) => a + b, 0) / nt.length);
        setPhase("done");
        setTimeout(() => onFinish(avg), 700);
      } else setPhase("between");
    }
  };
  return (
    <div className="gm">
      <div className="gm__hud">
        <span>Tur <b>{Math.min(round + 1, RX_ROUNDS)}/{RX_ROUNDS}</b></span>
        <span>Son <b>{last != null ? last + "ms" : "—"}</b></span>
        <span className="gm__time">{times.length ? "ort " + Math.round(times.reduce((a, b) => a + b, 0) / times.length) + "ms" : ""}</span>
      </div>
      <button className={`rx rx--${phase}`} onClick={phase === "between" ? arm : click}>
        {phase === "idle" && (<><b>Başla</b><span>Dokun ve hazır ol</span></>)}
        {phase === "wait" && (<><b>Bekle…</b><span>Yeşili bekle</span></>)}
        {phase === "go" && <b>DOKUN!</b>}
        {phase === "early" && (<><b>Çok erken!</b><span>Tekrar denemek için dokun</span></>)}
        {phase === "between" && (<><b>{last}ms</b><span>Sonraki tur için dokun</span></>)}
        {phase === "done" && <b>Bitti ✓</b>}
      </button>
    </div>
  );
}

/* ---------------- results ---------------- */
function tierMessage(rank: number, _total: number) {
  if (rank === 1) return { emoji: "🔥🔥🔥", title: "Zirvedesin!", text: "Birinci sıradasın — resmen alev aldın. Bu zihin seninle gurur duyuyor." };
  if (rank <= 3) return { emoji: "✨", title: "Çok yeteneklisin!", text: "Podyumdasın. Bir dahakine zirve kesinlikle senin — buna çok az kaldı." };
  if (rank <= 8) return { emoji: "💪", title: "İyi gidiyorsun!", text: "İlk sekiztesin. Biraz daha pratikle üst sıralara rahatça çıkarsın." };
  return { emoji: "🌱", title: "Gelişim yolundasın", text: "Daha sık zihin egzersizi yap; düzenli oynayanlar kısa sürede fark atıyor." };
}
function GameResults({ gid, score, board, myRank, total, isGuest, onClose }: { gid: string; score: number | string; board: LeaderRow[]; myRank: number | null; total: number; isGuest: boolean; onClose: () => void }) {
  const g = gmeta(gid);
  const t = myRank ? tierMessage(myRank, total) : null;
  return (
    <div className="gres">
      <div className="gres__hero">
        {t && <div className="gres__emoji">{t.emoji}</div>}
        <span className="eyebrow">{g.name}</span>
        <div className="gres__score">{score}<span className="u">{g.unit}</span></div>
        {myRank && (<div className="gres__rank">{total} kişi içinde <b>#{myRank}</b></div>)}
        {t && (<><h3 className="gres__title">{t.title}</h3><p className="gres__text">{t.text}</p></>)}
        {isGuest && (<p className="gres__guest">Skorun sıralamaya kaydedilmedi. <Link className="gres__login" href="/login?callbackUrl=/">Giriş yap</Link> ve listede yer al.</p>)}
      </div>
      <div className="gres__board">
        <div className="gres__board-h"><span>Bugünün Sıralaması</span><span>{g.unit}</span></div>
        {board.map((r, i) => (
          <div key={i} className={`gres__row ${r.isMe ? "is-me" : "is-blur"}`}>
            <span className="gres__pos">{i + 1}</span>
            <span className="gres__ava">{(r.name || "?")[0]}</span>
            <span className="gres__nm">{r.isMe ? r.name + " (sen)" : r.name}</span>
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

/* ---------------- stage (slide-up popup) ---------------- */
function GameStage({ gid, authed, playedToday, best, onClose }: { gid: string; authed: boolean; playedToday: boolean; best: number | null; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"play" | "result">(playedToday ? "result" : "play");
  const [result, setResult] = useState<{ score: number | string; board: LeaderRow[]; myRank: number | null; total: number } | null>(
    playedToday ? { score: best ?? "—", board: [], myRank: null, total: 0 } : null,
  );
  const [, start] = useTransition();
  const g = gmeta(gid);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 30);
    document.body.style.overflow = "hidden";
    // already played today → open straight to the leaderboard (no replay)
    if (playedToday) {
      start(async () => {
        const lb = await getLeaderboard(gid, g.lower);
        setResult({ score: best ?? "—", board: lb.board, myRank: lb.myRank, total: lb.total });
      });
    }
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(onClose, 380);
  };

  const finish = (score: number) => {
    setResult({ score, board: [], myRank: null, total: 0 });
    setPhase("result");
    start(async () => {
      await submitScore(gid, score);
      const lb = await getLeaderboard(gid, g.lower);
      setResult({ score, board: lb.board, myRank: lb.myRank, total: lb.total });
    });
  };

  return (
    <div className={`gstage ${open ? "is-open" : ""}`} role="dialog" aria-modal="true">
      <div className="gstage__scrim" onClick={close} />
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
          {phase === "result" && result && (
            <GameResults gid={gid} score={result.score} board={result.board} myRank={result.myRank} total={result.total} isGuest={!authed} onClose={close} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- home section ---------------- */
export function GamesSection({ authed = false, stats = {} }: { authed?: boolean; stats?: Record<string, GameStat> }) {
  const [active, setActive] = useState<string | null>(null);
  const statOf = (id: string): GameStat => stats[id] ?? { playedToday: false, best: null, avg: null };
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
        {GAMES.map((g, i) => {
          const st = statOf(g.id);
          const unit = g.unit === "ms" ? "ms" : "";
          return (
            <button
              key={g.id}
              className="gcard reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setActive(g.id)}
              data-cursor={st.playedToday ? "Sıralama" : "Oyna"}
            >
              <GameArt id={g.id} />
              <div className="gcard__b">
                <span className="gcard__tag">{g.tag}</span>
                <h3 className="gcard__name">{g.name}</h3>
                <p className="gcard__desc">{g.desc}</p>
                <div className="gcard__foot">
                  <span className={`gcard__status ${st.playedToday ? "is-done" : ""}`}>
                    {st.playedToday ? "Bugün oynandı" : "Bugün oynanabilir"}
                  </span>
                  <div className="gcard__stats">
                    {st.avg != null && (
                      <span className="gcard__avg">
                        Gün ort. <b>{st.avg}{unit}</b>
                      </span>
                    )}
                    {st.best != null && (
                      <span className="gcard__best">
                        En iyi <b>{st.best}{unit}</b>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {active && (
        <GameStage gid={active} authed={authed} playedToday={statOf(active).playedToday} best={statOf(active).best} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
