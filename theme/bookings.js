/* ========================================================================
   MARKA BOOKINGS — appointment/discovery-call scheduling (prototype).
   Site booking modal writes here; the /admin "Randevular" module manages them.
   Persisted in localStorage('mk-bookings'); broadcasts across tabs.
   Load as a CLASSIC script after theme.js (admin) and on every site page.
   ======================================================================== */
(function () {
  const KEY = "mk-bookings";
  const subs = new Set();
  const SLOTS = ["10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const seed = [
    { id: "bk1", name: "Selin Demir", email: "selin@atlasbank.co", date: isoPlus(2), slot: "14:00", topic: "Marka & ürün", status: "Onaylı", created: Date.now() - 864e5 },
    { id: "bk2", name: "Burak Yıldız", email: "burak@novalabs.io", date: isoPlus(4), slot: "11:00", topic: "Web tasarım", status: "Bekliyor", created: Date.now() - 36e5 },
  ];
  function isoPlus(d) { const x = new Date(); x.setDate(x.getDate() + d); return x.toISOString().slice(0, 10); }

  function load() { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); return Array.isArray(s) ? s : seed.slice(); } catch (e) { return seed.slice(); } }
  let list = load();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} emit(); }
  function emit() { subs.forEach(fn => { try { fn(list); } catch (e) {} }); }

  window.MarkaBookings = {
    SLOTS, STATUSES: ["Bekliyor", "Onaylı", "İptal"],
    list() { return list.slice().sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot)); },
    takenSlots(date) { return list.filter(b => b.date === date && b.status !== "İptal").map(b => b.slot); },
    book(data) { const b = Object.assign({ id: "bk" + Date.now(), status: "Bekliyor", created: Date.now() }, data); list = list.concat([b]); persist(); return b; },
    update(id, patch) { list = list.map(b => b.id === id ? Object.assign({}, b, patch) : b); persist(); },
    remove(id) { list = list.filter(b => b.id !== id); persist(); },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };
  window.addEventListener("storage", (e) => { if (e.key === KEY) { list = load(); emit(); } });
})();
