/* Admin shell — sidebar nav, topbar, module routing. */
const { useState: useShState } = React;

const NAV = [
{ group: "Genel", items: [
  { key: "dashboard", label: "Dashboard", icon: "dashboard" },
  { key: "reports", label: "AI Raporlar", icon: "ai", tag: "AI" }]
},
{ group: "İçerik", items: [
  { key: "content", label: "Blog", icon: "blog", tag: "AI" },
  { key: "projects", label: "Projeler", icon: "projects" },
  { key: "courses", label: "Kurslar", icon: "courses" },
  { key: "market", label: "Market", icon: "market" },
  { key: "media", label: "Medya", icon: "media" }]
},
{ group: "Görünüm", items: [
  { key: "appearance", label: "Tema & Görünüm", icon: "appearance" }]
},
{ group: "Sistem", items: [
  { key: "users", label: "Kullanıcılar", icon: "users" },
  { key: "seo", label: "SEO & Meta", icon: "seo", tag: "AI" },
  { key: "settings", label: "Ayarlar", icon: "settings" }]
}];


const ROUTES = {
  dashboard: { title: "Dashboard", sub: "Sitenin genel görünümü", comp: (go) => <Dashboard go={go} /> },
  reports: { title: "AI Raporlar", sub: "Yapay zekâ ile içgörü ve raporlar", comp: () => <Reports /> },
  content: { title: "Blog & İçerik", sub: "Yazıları yönet, AI ile üret", comp: () => <Content /> },
  projects: { title: "Projeler", sub: "Portfolyo yönetimi", comp: () => <Projects /> },
  courses: { title: "Akademi — Kurslar", sub: "Kursları yönet", comp: () => <Courses /> },
  market: { title: "Market", sub: "Dijital ürünler", comp: () => <MarketM /> },
  media: { title: "Medya Kütüphanesi", sub: "Görseller ve dosyalar", comp: () => <Media /> },
  appearance: { title: "Tema & Görünüm", sub: "Header, renk paleti, font — canlı", comp: () => <Appearance /> },
  users: { title: "Kullanıcılar & Roller", sub: "Ekip erişimi", comp: () => <Users /> },
  seo: { title: "SEO & Meta", sub: "Arama motoru optimizasyonu", comp: () => <SEO /> },
  settings: { title: "Genel Ayarlar", sub: "Site geneli yapılandırma", comp: () => <Settings /> }
};

function AdminShell() {
  const [view, setView] = useShState("dashboard");
  const [menu, setMenu] = useShState(false);
  const BRAND = window.MARKA && window.MARKA.BRAND_NAME || "Marka";
  const route = ROUTES[view];
  const go = (k) => {setView(k);setMenu(false);};
  const toggleTheme = () => window.MarkaTheme.set({ mode: window.MarkaTheme.get().mode === "dark" ? "light" : "dark" });

  return (
    <div className={`adm ${menu ? "menu-open" : ""}`}>
      <aside className="adm-side">
        <div className="adm-side__brand">
          <span className="brand">{BRAND}<span className="dot">.</span></span>
          <span className="adm-side__badge" style={{ fontFamily: "\"JetBrains Mono\"" }}>Admin</span>
        </div>
        <nav className="adm-nav">
          {NAV.map((g) =>
          <div className="adm-nav__group" key={g.group}>
              <h5>{g.group}</h5>
              {g.items.map((it) =>
            <button key={it.key} className={`adm-nav__item ${view === it.key ? "is-active" : ""}`} onClick={() => go(it.key)}>
                  <span className="adm-nav__ic"><Icon name={it.icon} size={18} /></span>
                  {it.label}
                  {it.tag && <span className="tag">{it.tag}</span>}
                </button>
            )}
            </div>
          )}
        </nav>
        <div className="adm-side__user">
          <span className="av">DA</span>
          <div><b>Deniz Arı</b><span>Yönetici</span></div>
        </div>
      </aside>

      <div className="adm-main">
        <div className="adm-mobilebar">
          <button className="adm-iconbtn" onClick={() => setMenu((m) => !m)} aria-label="Menü"><Icon name="menu" size={18} /></button>
          <span className="brand" style={{ fontWeight: 700 }}>{BRAND}<span style={{ color: "var(--accent)" }}>.</span></span>
        </div>
        <header className="adm-top">
          <div>
            <div className="adm-top__title">{route.title}</div>
            <div className="adm-top__sub">{route.sub}</div>
          </div>
          <div className="adm-top__search" style={{ height: "38px", borderRadius: "8px" }}><Icon name="search" size={16} /><input placeholder="Ara…" /></div>
          <button className="adm-iconbtn" onClick={toggleTheme} aria-label="Tema" style={{ width: 38, height: 38 }}>{window.MarkaTheme.get().mode === "dark" ? "☀" : "☾"}</button>
          <a className="adm-btn adm-btn--ghost" href="../website/index.html" target="_blank" rel="noopener" style={{ height: "38px", borderRadius: "8px" }}><Icon name="external" size={15} /> Siteyi Gör</a>
        </header>
        <main className="adm-body">
          {route.comp(go)}
        </main>
      </div>
      <MediaPicker />
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<AdminShell />);