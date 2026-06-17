/* ========================================================================
   MARKA LEADS — contact/quote requests pipeline (prototype, localStorage).
   Site contact form writes here; the /admin "Talepler" module manages them.
   Persisted in localStorage('mk-leads'); broadcasts across tabs.
   Load as a CLASSIC script after theme.js (admin) and on the contact page.
   ======================================================================== */
(function () {
  const KEY = "mk-leads";
  const subs = new Set();
  const STAGES = ["Yeni", "İletişimde", "Teklif Gönderildi", "Kazanıldı", "Kayıp"];

  const seed = [
    { id: "ld1", name: "Selin Demir", email: "selin@atlasbank.co", budget: "₺400.000+", message: "Mobil bankacılık uygulamamız için kapsamlı bir yeniden tasarım arıyoruz. Mevcut akışlar karmaşık.", source: "İletişim", status: "Teklif Gönderildi", date: Date.now() - 2 * 864e5, priority: "Yüksek", notes: "" },
    { id: "ld2", name: "Burak Yıldız", email: "burak@novalabs.io", budget: "₺150.000 – 400.000", message: "Yeni SaaS ürünümüz için marka kimliği ve landing page.", source: "Görüşme Yap", status: "İletişimde", date: Date.now() - 5 * 864e5, priority: "Orta", notes: "İlk görüşme yapıldı." },
    { id: "ld3", name: "Ece Kaya", email: "ece@perasanat.org", budget: "₺50.000 – 150.000", message: "Galeri web sitesi yenileme.", source: "İletişim", status: "Yeni", date: Date.now() - 6 * 36e5, priority: "Orta", notes: "" },
  ];

  function load() { try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); return Array.isArray(s) ? s : seed.slice(); } catch (e) { return seed.slice(); } }
  let list = load();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} emit(); }
  function emit() { subs.forEach(fn => { try { fn(list); } catch (e) {} }); }

  function autoPriority(d) {
    const b = d.budget || "";
    if (/400\.000\+|150\.000 – 400/.test(b)) return "Yüksek";
    if (/50\.000 – 150/.test(b)) return "Orta";
    return "Düşük";
  }

  window.MarkaLeads = {
    STAGES,
    list() { return list.slice().sort((a, b) => b.date - a.date); },
    byStage(s) { return this.list().filter(l => l.status === s); },
    counts() { const c = {}; STAGES.forEach(s => c[s] = 0); list.forEach(l => { c[l.status] = (c[l.status] || 0) + 1; }); return c; },
    submit(data) {
      const lead = Object.assign({ id: "ld" + Date.now(), status: "Yeni", date: Date.now(), notes: "", source: "İletişim" }, data);
      lead.priority = data.priority || autoPriority(data);
      list = [lead].concat(list); persist(); return lead;
    },
    update(id, patch) { list = list.map(l => l.id === id ? Object.assign({}, l, patch) : l); persist(); },
    remove(id) { list = list.filter(l => l.id !== id); persist(); },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  };
  window.addEventListener("storage", (e) => { if (e.key === KEY) { list = load(); emit(); } });
})();
