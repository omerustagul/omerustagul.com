/* ========================================================================
   MARKA MEMBERS — lightweight membership/identity (prototype, localStorage).
   Backbone for: account, course/product purchases, and game leaderboards.
   Persisted in localStorage('mk-members'); session in 'mk-session'.
   Load as a CLASSIC script in <head> after theme.js on every site page.
   NOTE: prototype only — passwords are NOT hashed; do not use in production.
   ======================================================================== */
(function () {
  const KEY = "mk-members", SKEY = "mk-session";
  const subs = new Set();

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} emit(); }
  function session() { try { return localStorage.getItem(SKEY) || null; } catch (e) { return null; } }
  function setSession(id) { try { id ? localStorage.setItem(SKEY, id) : localStorage.removeItem(SKEY); } catch (e) {} emit(); }
  function emit() { const u = api.current(); subs.forEach(fn => { try { fn(u); } catch (e) {} }); }

  // demo seed so leaderboards aren't empty on first run
  function seed() {
    let list = load();
    if (list.length) return;
    const names = ["Ece K.", "Mert S.", "Lale Y.", "Can A.", "Su D.", "Ada Y.", "Kaan E.", "Nil B."];
    list = names.map((n, i) => ({
      id: "demo" + i, name: n, email: n.toLowerCase().replace(/[^a-z]/g, "") + "@demo.co", pass: "",
      avatar: null, bio: "", joined: Date.now() - i * 86400000, demo: true,
      purchasedCourses: [], purchasedProducts: [],
      scores: {
        memory: { best: 60 - i * 4, plays: [] },
        reaction: { best: 220 + i * 18, plays: [] },
        sequence: { best: 50 - i * 3, plays: [] },
      },
    }));
    save(list);
  }

  const api = {
    LANGS: null,
    current() { const id = session(); return id ? (load().find(m => m.id === id) || null) : null; },
    isAuthed() { return !!api.current(); },
    members() { return load(); },

    register({ name, email, password }) {
      const list = load();
      email = (email || "").trim().toLowerCase();
      if (!name || !email) return { error: "Ad ve e-posta gerekli." };
      if (list.some(m => m.email === email && !m.demo)) return { error: "Bu e-posta zaten kayıtlı." };
      const m = { id: "u" + Date.now(), name: name.trim(), email, pass: password || "", avatar: null, bio: "",
        joined: Date.now(), purchasedCourses: [], purchasedProducts: [], scores: {} };
      list.push(m); save(list); setSession(m.id);
      return { user: m };
    },
    login(email, password) {
      const list = load();
      email = (email || "").trim().toLowerCase();
      const m = list.find(x => x.email === email && !x.demo);
      if (!m) return { error: "Hesap bulunamadı." };
      if ((m.pass || "") !== (password || "")) return { error: "Şifre hatalı." };
      setSession(m.id); return { user: m };
    },
    logout() { setSession(null); },
    updateCurrent(patch) {
      const id = session(); if (!id) return;
      const list = load().map(m => m.id === id ? Object.assign({}, m, patch) : m);
      save(list);
    },

    /* ---- purchases ---- */
    buyCourse(courseId) { const u = api.current(); if (!u) return false; const s = new Set(u.purchasedCourses || []); s.add(courseId); api.updateCurrent({ purchasedCourses: [...s] }); return true; },
    buyProduct(productId) { const u = api.current(); if (!u) return false; const s = new Set(u.purchasedProducts || []); s.add(productId); api.updateCurrent({ purchasedProducts: [...s] }); return true; },
    owns(kind, id) { const u = api.current(); if (!u) return false; return (kind === "course" ? u.purchasedCourses : u.purchasedProducts || []).includes(id); },

    /* ---- course progress ---- */
    completeLesson(courseId, lessonId) {
      const id = session(); if (!id) return;
      const list = load(); const m = list.find(x => x.id === id); if (!m) return;
      m.progress = m.progress || {}; const done = new Set(m.progress[courseId] || []); done.add(lessonId);
      m.progress[courseId] = [...done]; save(list);
    },
    uncompleteLesson(courseId, lessonId) {
      const id = session(); if (!id) return;
      const list = load(); const m = list.find(x => x.id === id); if (!m) return;
      m.progress = m.progress || {}; m.progress[courseId] = (m.progress[courseId] || []).filter(x => x !== lessonId); save(list);
    },
    courseDone(courseId) { const u = api.current(); return (u && u.progress && u.progress[courseId]) || []; },

    /* ---- games (Faz 2) ---- */
    // higher-is-better for memory/sequence; lower-is-better (ms) for reaction
    submitScore(gameId, score, lowerIsBetter) {
      const u = api.current(); if (!u) return null;
      const list = load(); const m = list.find(x => x.id === u.id); if (!m) return null;
      m.scores = m.scores || {};
      const g = m.scores[gameId] || { best: null, plays: [] };
      g.plays = (g.plays || []).concat([{ date: new Date().toISOString().slice(0, 10), score }]);
      if (g.best == null || (lowerIsBetter ? score < g.best : score > g.best)) g.best = score;
      m.scores[gameId] = g; save(list);
      return api.rank(gameId, lowerIsBetter);
    },
    playedToday(gameId) {
      const u = api.current(); if (!u || !u.scores || !u.scores[gameId]) return false;
      const today = new Date().toISOString().slice(0, 10);
      return (u.scores[gameId].plays || []).some(p => p.date === today);
    },
    leaderboard(gameId, lowerIsBetter) {
      return load().filter(m => m.scores && m.scores[gameId] && m.scores[gameId].best != null)
        .map(m => ({ id: m.id, name: m.name, avatar: m.avatar, best: m.scores[gameId].best }))
        .sort((a, b) => lowerIsBetter ? a.best - b.best : b.best - a.best);
    },
    rank(gameId, lowerIsBetter) {
      const u = api.current(); if (!u) return null;
      const board = api.leaderboard(gameId, lowerIsBetter);
      const idx = board.findIndex(r => r.id === u.id);
      return idx < 0 ? null : { rank: idx + 1, total: board.length, best: board[idx].best };
    },

    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };

  seed();
  window.MarkaMembers = api;
  window.addEventListener("storage", (e) => { if (e.key === KEY || e.key === SKEY) emit(); });
})();
