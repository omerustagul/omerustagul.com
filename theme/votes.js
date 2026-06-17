/* ========================================================================
   MARKA VOTES — community "Vote" (beğeni) for portfolio projects.
   One vote per project per identity (member id, or a guest browser id).
   Seeded counts so the ranking looks alive. Persisted in localStorage('mk-votes').
   Load as a CLASSIC script in <head> after members.js.
   ======================================================================== */
(function () {
  const KEY = "mk-votes", GKEY = "mk-voter-guest";
  const subs = new Set();
  const SEED = { "nova-spor-uygulamasi": 218, "pera-galeri-kimligi": 164, "venta-e-ticaret": 192, "atlas-finans-yeniden-markalasma": 301 };

  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.counts) return s; } catch (e) {}
    return { counts: Object.assign({}, SEED), voters: {} };
  }
  let state = load();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function emit() { subs.forEach(fn => { try { fn(); } catch (e) {} }); }
  function voterKey() {
    const u = window.MarkaMembers && window.MarkaMembers.current();
    if (u) return "u:" + u.id;
    let g; try { g = localStorage.getItem(GKEY); if (!g) { g = "g" + Date.now() + Math.random().toString(36).slice(2, 6); localStorage.setItem(GKEY, g); } } catch (e) { g = "g"; }
    return "g:" + g;
  }

  window.MarkaVotes = {
    slug(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9ğüşöçı\s-]/gi, "").trim().replace(/\s+/g, "-").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").replace(/ı/g, "i"); },
    count(id) { return state.counts[id] || 0; },
    hasVoted(id) { return (state.voters[voterKey()] || []).includes(id); },
    toggle(id) {
      const k = voterKey(); const mine = state.voters[k] || [];
      if (mine.includes(id)) { state.voters[k] = mine.filter(x => x !== id); state.counts[id] = Math.max(0, (state.counts[id] || 1) - 1); }
      else { state.voters[k] = mine.concat([id]); state.counts[id] = (state.counts[id] || 0) + 1; }
      persist(); emit(); return this.hasVoted(id);
    },
    top(n) { return Object.entries(state.counts).sort((a, b) => b[1] - a[1]).slice(0, n || 5).map(([id, c]) => ({ id, count: c })); },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };
  window.addEventListener("storage", (e) => { if (e.key === KEY) { state = load(); emit(); } });
})();
