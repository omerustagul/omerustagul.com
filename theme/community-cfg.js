/* ========================================================================
   MARKA COMMUNITY CFG — admin-managed config for the homepage games &
   collections. Games on/off + daily play limit; collections list.
   Persisted in localStorage('mk-community'); the site reads it live.
   Load as a CLASSIC script after theme.js everywhere it's needed.
   ======================================================================== */
(function () {
  const KEY = "mk-community";
  const subs = new Set();
  const defaults = {
    games: { memory: true, sequence: true, reaction: true },
    dailyLimit: 1,
    collections: [
      { id: "k1", title: "Editöryel Web", count: 18, hue: 0, base: 1240 },
      { id: "k2", title: "Cesur Tipografi", count: 24, hue: 40, base: 980 },
      { id: "k3", title: "Minimal E-ticaret", count: 15, hue: -50, base: 1530 },
      { id: "k4", title: "Hareket & Etkileşim", count: 12, hue: 200, base: 760 },
    ],
  };
  let cur = load();
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY) || "{}"); const m = Object.assign({}, defaults, s); m.games = Object.assign({}, defaults.games, s.games); if (!Array.isArray(m.collections)) m.collections = defaults.collections.slice(); return m; }
    catch (e) { return JSON.parse(JSON.stringify(defaults)); }
  }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(cur)); } catch (e) {} emit(); }
  function emit() { subs.forEach(fn => { try { fn(cur); } catch (e) {} }); }
  window.MarkaCommunity = {
    defaults,
    get() { return JSON.parse(JSON.stringify(cur)); },
    set(patch) { cur = Object.assign({}, cur, patch); persist(); },
    gameOn(id) { return cur.games[id] !== false; },
    dailyLimit() { return Math.max(1, cur.dailyLimit || 1); },
    collections() { return cur.collections.slice(); },
    reset() { cur = JSON.parse(JSON.stringify(defaults)); persist(); },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };
  window.addEventListener("storage", (e) => { if (e.key === KEY) { cur = load(); emit(); } });
})();
