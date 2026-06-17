/* App root — composes the homepage BODY only. The header + footer come from
   the shared site-chrome (theme.js + site-chrome.js), identical on every page.
   Section order/visibility + custom (image/video) sections are driven live by
   the /admin "Sayfalar" module via window.MarkaPages. */
const { useState: useAppState, useEffect: useAppEffect } = React;

function App() {
  const [variant, setVariant] = useAppState(() => (window.MarkaTheme ? window.MarkaTheme.get().heroVariant : "full") || "full");
  const [layout, setLayout] = useAppState(() => (window.MarkaPages ? window.MarkaPages.homeLayout() : null));

  // hero layout is controlled from the admin (Tema & Görünüm) — follow it live
  useAppEffect(() => {
    if (!window.MarkaTheme) return;
    const off = window.MarkaTheme.subscribe(cfg => setVariant(cfg.heroVariant || "full"));
    return off;
  }, []);
  // section layout is controlled from the admin (Sayfalar) — follow it live
  useAppEffect(() => {
    if (!window.MarkaPages) return;
    const off = window.MarkaPages.subscribe(() => setLayout(window.MarkaPages.homeLayout()));
    return off;
  }, []);

  useAppEffect(() => { const t = setTimeout(() => window.MarkaMotion && window.MarkaMotion.init(), 80); return () => clearTimeout(t); }, []);
  useAppEffect(() => {
    const t = setTimeout(() => {
      if (!window.MarkaMotion) return;
      window.MarkaMotion.reveal(); window.MarkaMotion.cursor(); window.MarkaMotion.magnetic();
    }, 80);
    if (window.MarkaInlineEdit) { window.MarkaInlineEdit.apply(); setTimeout(() => window.MarkaInlineEdit.apply(), 120); }
    return () => clearTimeout(t);
  }, [variant, layout]);

  const COMPS = { Hero: () => <Hero variant={variant} />, LatestWorks, WeeklyWork, Partners, Services, Academy, Collections, Games, Blog, Market, Stats, CTABlocks };

  // Canonical homepage order (matches design_handoff README). Each id is unique
  // so React keys don't collide; the admin "Sayfalar" layout overrides this.
  const sections = layout || [
    { id: "hero", kind: "builtin", comp: "Hero" },
    { id: "works", kind: "builtin", comp: "LatestWorks" },
    { id: "weekly", kind: "builtin", comp: "WeeklyWork" },
    { id: "partners", kind: "builtin", comp: "Partners" },
    { id: "services", kind: "builtin", comp: "Services" },
    { id: "academy", kind: "builtin", comp: "Academy" },
    { id: "collections", kind: "builtin", comp: "Collections" },
    { id: "games", kind: "builtin", comp: "Games" },
    { id: "blog", kind: "builtin", comp: "Blog" },
    { id: "market", kind: "builtin", comp: "Market" },
    { id: "stats", kind: "builtin", comp: "Stats" },
    { id: "cta", kind: "builtin", comp: "CTABlocks" },
  ];

  return (
    <main>
      {sections.map(s => {
        if (s.kind === "custom") return <CustomSection key={s.id} section={s} />;
        const C = COMPS[s.comp];
        return C ? <C key={s.id} /> : null;
      })}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
