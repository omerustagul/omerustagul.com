/* @ds-bundle: {"format":3,"namespace":"MarkaCreativeAgencyDesignSystem_68806e","components":[{"name":"BRAND_NAME","sourcePath":"brand/brand.js"},{"name":"BRAND_SLOGAN","sourcePath":"brand/brand.js"},{"name":"BRAND_SOCIAL","sourcePath":"brand/brand.js"},{"name":"BlogCard","sourcePath":"components/cards/BlogCard.jsx"},{"name":"CourseCard","sourcePath":"components/cards/CourseCard.jsx"},{"name":"ProductCard","sourcePath":"components/cards/ProductCard.jsx"},{"name":"ProjectCard","sourcePath":"components/cards/ProjectCard.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Rating","sourcePath":"components/core/Rating.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Input.jsx"},{"name":"Marquee","sourcePath":"components/media/Marquee.jsx"},{"name":"Media","sourcePath":"components/media/Media.jsx"}],"sourceHashes":{"admin-core.jsx":"17fa275158ce","app.jsx":"3fb2d5fe6ebf","blog-editor.jsx":"69aa3962a6a6","brand/brand.js":"56f7f9754f69","components/cards/BlogCard.jsx":"d8f830bf48a9","components/cards/CourseCard.jsx":"411c7df31f6f","components/cards/ProductCard.jsx":"e48914ec27ad","components/cards/ProjectCard.jsx":"4efcb0b4ed44","components/cards/cardBase.js":"3cfe0122b9bb","components/core/Avatar.jsx":"75de15b18dd7","components/core/Badge.jsx":"38c9c44f174e","components/core/Button.jsx":"da15c7aa65bf","components/core/IconButton.jsx":"54ab9e8745de","components/core/Logo.jsx":"b5a7f65b83d8","components/core/Rating.jsx":"bf28b1334a82","components/core/SectionHeading.jsx":"c3f5459f23d7","components/core/Tag.jsx":"f8b9cfa40351","components/forms/Input.jsx":"82fdf478416c","components/media/Marquee.jsx":"c048f011b473","components/media/Media.jsx":"d2aa3e54d168","modules-main.jsx":"4e22b4491060","theme/bookings.js":"d9bb6036a5d8","theme/community-cfg.js":"2e3ef09b953e","theme/courses.js":"35821efcb430","theme/i18n.js":"02a13aa52a23","theme/inline-edit.js":"fde648f55174","theme/leads.js":"166a8b300edc","theme/members.js":"3df3710d831c","theme/pages.js":"6217c993c34f","theme/products.js":"bce45309f5de","theme/profile.js":"595dd23689ce","theme/site-chrome.js":"75cedcd5797e","theme/theme.js":"82e436a359fa","theme/votes.js":"5cc73959515f","ui_kits/admin/admin-core.jsx":"5c4f6ae3289d","ui_kits/admin/admin-data.js":"13fcd2f643b3","ui_kits/admin/app.jsx":"336be248a293","ui_kits/admin/blog-editor.jsx":"aaa1e4b1eb85","ui_kits/admin/bookings.jsx":"8feef4df6a7c","ui_kits/admin/community-admin.jsx":"ebdf91c7c7bf","ui_kits/admin/course-editor.jsx":"9236124ae070","ui_kits/admin/leads.jsx":"5e5437cd6af8","ui_kits/admin/media-picker.jsx":"22bfb459ceed","ui_kits/admin/media.jsx":"1ed4d23028cb","ui_kits/admin/modules-main.jsx":"fd311d11da22","ui_kits/admin/modules-skel.jsx":"49e918b73939","ui_kits/admin/pages.jsx":"7a88d5686104","ui_kits/admin/product-editor.jsx":"87a1ca1b5f7c","ui_kits/admin/profile-cv.jsx":"ba1ac0c5ddb4","ui_kits/admin/project-editor.jsx":"2f769ab39734","ui_kits/admin/services.jsx":"9723c5b2156a","ui_kits/admin/settings.jsx":"c9329b5d7bc8","ui_kits/admin/uploader.jsx":"931172a716c8","ui_kits/website/Community.jsx":"ad89cc5a9c24","ui_kits/website/Games.jsx":"19795c786a99","ui_kits/website/Hero.jsx":"0583a0846179","ui_kits/website/Sections.jsx":"2939e20f4a99","ui_kits/website/app.jsx":"c5668940bf37","ui_kits/website/motion.js":"c092e967ce98","ui_kits/website/parts.jsx":"f798e13e7d1a"},"inlinedExternals":[],"unexposedExports":[{"name":"ensureCardBase","sourcePath":"components/cards/cardBase.js"}]} */

(() => {

const __ds_ns = (window.MarkaCreativeAgencyDesignSystem_68806e = window.MarkaCreativeAgencyDesignSystem_68806e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// admin-core.jsx
try { (() => {
/* Admin shared atoms — Icon set, Card, StatCard, Field, Switch, Seg, Badge,
   Modal. Exposed on window for the module files. */

const ICONS = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  ai: "M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z",
  blog: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h8",
  projects: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  courses: "M22 9L12 5 2 9l10 4 10-4zM6 11v5c0 1 3 2 6 2s6-1 6-2v-5",
  market: "M6 7h12l1 13H5zM9 7a3 3 0 016 0",
  media: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6",
  appearance: "M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-1.5 1-2 2-2h1a4 4 0 004-4c0-5-4-8-9-8zM7.5 12a1 1 0 100-2 1 1 0 000 2zM12 8a1 1 0 100-2 1 1 0 000 2zM16.5 12a1 1 0 100-2 1 1 0 000 2z",
  users: "M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M17 11a4 4 0 000-8M22 21c0-2.7-1.5-5-3.7-6.2",
  seo: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  settings: "M12 9a3 3 0 100 6 3 3 0 000-6zM19.4 13l1.5 2.6-2 3.4-2.9-.8a7 7 0 01-1.7 1l-.6 3H10.3l-.6-3a7 7 0 01-1.7-1l-2.9.8-2-3.4L4.6 13a7 7 0 010-2L3.1 8.4l2-3.4 2.9.8a7 7 0 011.7-1l.6-3h3.4l.6 3a7 7 0 011.7 1l2.9-.8 2 3.4L19.4 11a7 7 0 010 2z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  plus: "M12 5v14M5 12h14",
  edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  external: "M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"
};
function Icon({
  name,
  size = 20,
  stroke = 1.8,
  fill = false
}) {
  const d = ICONS[name] || "";
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
function AdmCard({
  title,
  desc,
  action,
  children,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: `adm-card ${className}`
  }, (title || action) && /*#__PURE__*/React.createElement("div", {
    className: "adm-card__h"
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h3", null, title), desc && /*#__PURE__*/React.createElement("p", null, desc)), action), children);
}
function StatCard({
  label,
  val,
  delta,
  dir
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "stat-card__val"
  }, val), delta && /*#__PURE__*/React.createElement("span", {
    className: `stat-card__delta ${dir}`
  }, dir === "up" ? "▲" : "▼", " ", delta));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", null, label), children);
}
function Switch({
  on,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `adm-switch ${on ? "on" : ""}`,
    "aria-pressed": on,
    onClick: () => onChange(!on)
  });
}
function Seg({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-seg"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    className: value === o.value ? "on" : "",
    onClick: () => onChange(o.value)
  }, o.label)));
}
function Badge({
  children,
  tone = "muted"
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `adm-badge adm-badge--${tone}`
  }, children);
}
function Modal({
  title,
  onClose,
  children,
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__scrim",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-modal",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__h"
  }, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: onClose,
    "aria-label": "Kapat"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__b"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__f"
  }, footer)));
}

/* Custom select popup — design-system styled, replaces native <select>. */
function MkSelect({
  value,
  onChange,
  options = [],
  placeholder = "Seçin",
  width,
  searchable
}) {
  const [open, setOpen] = React.useState(false);
  const [up, setUp] = React.useState(false);
  const [q, setQ] = React.useState("");
  const ref = React.useRef();
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const cur = opts.find(o => o.value === value);
  const showSearch = searchable || opts.length > 10;
  const filtered = q ? opts.filter(o => o.label.toLowerCase().includes(q.toLowerCase())) : opts;
  React.useEffect(() => {
    if (!open) {
      setQ("");
      return;
    }
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const toggle = () => {
    if (!open && ref.current) {
      const r = ref.current.getBoundingClientRect();
      setUp(window.innerHeight - r.bottom < 280);
    }
    setOpen(o => !o);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `mk-select ${open ? "open" : ""}`,
    ref: ref,
    style: width ? {
      width
    } : null
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mk-select__btn",
    onClick: toggle,
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    style: {
      height: "38px",
      fontWeight: "400",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `mk-select__val ${cur ? "" : "placeholder"}`
  }, cur ? cur.label : placeholder), /*#__PURE__*/React.createElement("span", {
    className: "mk-select__chev",
    "aria-hidden": "true"
  }, "\u2304")), open && /*#__PURE__*/React.createElement("div", {
    className: `mk-select__pop ${up ? "up" : ""}`,
    role: "listbox"
  }, showSearch && /*#__PURE__*/React.createElement("input", {
    className: "mk-select__search",
    autoFocus: true,
    placeholder: "Ara\u2026",
    value: q,
    onChange: e => setQ(e.target.value),
    onClick: e => e.stopPropagation()
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "mk-select__empty"
  }, "Sonu\xE7 yok"), filtered.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "option",
    "aria-selected": o.value === value,
    className: `mk-select__opt ${o.value === value ? "on" : ""}`,
    onClick: () => {
      onChange(o.value);
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", null, o.label), o.value === value && /*#__PURE__*/React.createElement("span", {
    className: "ck"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }))))));
}

/* Right-side slide-in drawer. */
function Drawer({
  title,
  subtitle,
  onClose,
  children,
  footer
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "drawer-scrim",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "drawer",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer__h"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, title), subtitle && /*#__PURE__*/React.createElement("p", null, subtitle)), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: onClose,
    "aria-label": "Kapat"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "drawer__b"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "drawer__f"
  }, footer)));
}
Object.assign(window, {
  Icon,
  AdmCard,
  StatCard,
  Field,
  Switch,
  Seg,
  Badge,
  Modal,
  MkSelect,
  Drawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "admin-core.jsx", error: String((e && e.message) || e) }); }

// app.jsx
try { (() => {
/* Admin shell — sidebar nav, topbar, module routing. */
const {
  useState: useShState
} = React;
const NAV = [{
  group: "Genel",
  items: [{
    key: "dashboard",
    label: "Dashboard",
    icon: "dashboard"
  }, {
    key: "reports",
    label: "AI Raporlar",
    icon: "ai",
    tag: "AI"
  }]
}, {
  group: "İçerik",
  items: [{
    key: "content",
    label: "Blog",
    icon: "blog",
    tag: "AI"
  }, {
    key: "projects",
    label: "Projeler",
    icon: "projects"
  }, {
    key: "courses",
    label: "Kurslar",
    icon: "courses"
  }, {
    key: "market",
    label: "Market",
    icon: "market"
  }, {
    key: "media",
    label: "Medya",
    icon: "media"
  }]
}, {
  group: "Görünüm",
  items: [{
    key: "appearance",
    label: "Tema & Görünüm",
    icon: "appearance"
  }]
}, {
  group: "Sistem",
  items: [{
    key: "users",
    label: "Kullanıcılar",
    icon: "users"
  }, {
    key: "seo",
    label: "SEO & Meta",
    icon: "seo",
    tag: "AI"
  }, {
    key: "settings",
    label: "Ayarlar",
    icon: "settings"
  }]
}];
const ROUTES = {
  dashboard: {
    title: "Dashboard",
    sub: "Sitenin genel görünümü",
    comp: go => /*#__PURE__*/React.createElement(Dashboard, {
      go: go
    })
  },
  reports: {
    title: "AI Raporlar",
    sub: "Yapay zekâ ile içgörü ve raporlar",
    comp: () => /*#__PURE__*/React.createElement(Reports, null)
  },
  content: {
    title: "Blog & İçerik",
    sub: "Yazıları yönet, AI ile üret",
    comp: () => /*#__PURE__*/React.createElement(Content, null)
  },
  projects: {
    title: "Projeler",
    sub: "Portfolyo yönetimi",
    comp: () => /*#__PURE__*/React.createElement(Projects, null)
  },
  courses: {
    title: "Akademi — Kurslar",
    sub: "Kursları yönet",
    comp: () => /*#__PURE__*/React.createElement(Courses, null)
  },
  market: {
    title: "Market",
    sub: "Dijital ürünler",
    comp: () => /*#__PURE__*/React.createElement(MarketM, null)
  },
  media: {
    title: "Medya Kütüphanesi",
    sub: "Görseller ve dosyalar",
    comp: () => /*#__PURE__*/React.createElement(Media, null)
  },
  appearance: {
    title: "Tema & Görünüm",
    sub: "Header, renk paleti, font — canlı",
    comp: () => /*#__PURE__*/React.createElement(Appearance, null)
  },
  users: {
    title: "Kullanıcılar & Roller",
    sub: "Ekip erişimi",
    comp: () => /*#__PURE__*/React.createElement(Users, null)
  },
  seo: {
    title: "SEO & Meta",
    sub: "Arama motoru optimizasyonu",
    comp: () => /*#__PURE__*/React.createElement(SEO, null)
  },
  settings: {
    title: "Genel Ayarlar",
    sub: "Site geneli yapılandırma",
    comp: () => /*#__PURE__*/React.createElement(Settings, null)
  }
};
function AdminShell() {
  const [view, setView] = useShState("dashboard");
  const [menu, setMenu] = useShState(false);
  const BRAND = window.MARKA && window.MARKA.BRAND_NAME || "Marka";
  const route = ROUTES[view];
  const go = k => {
    setView(k);
    setMenu(false);
  };
  const toggleTheme = () => window.MarkaTheme.set({
    mode: window.MarkaTheme.get().mode === "dark" ? "light" : "dark"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: `adm ${menu ? "menu-open" : ""}`
  }, /*#__PURE__*/React.createElement("aside", {
    className: "adm-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-side__brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand"
  }, BRAND, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, ".")), /*#__PURE__*/React.createElement("span", {
    className: "adm-side__badge",
    style: {
      fontFamily: "\"JetBrains Mono\""
    }
  }, "Admin")), /*#__PURE__*/React.createElement("nav", {
    className: "adm-nav"
  }, NAV.map(g => /*#__PURE__*/React.createElement("div", {
    className: "adm-nav__group",
    key: g.group
  }, /*#__PURE__*/React.createElement("h5", null, g.group), g.items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.key,
    className: `adm-nav__item ${view === it.key ? "is-active" : ""}`,
    onClick: () => go(it.key)
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-nav__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 18
  })), it.label, it.tag && /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, it.tag)))))), /*#__PURE__*/React.createElement("div", {
    className: "adm-side__user"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av"
  }, "DA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Deniz Ar\u0131"), /*#__PURE__*/React.createElement("span", null, "Y\xF6netici")))), /*#__PURE__*/React.createElement("div", {
    className: "adm-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-mobilebar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setMenu(m => !m),
    "aria-label": "Men\xFC"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "brand",
    style: {
      fontWeight: 700
    }
  }, BRAND, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "."))), /*#__PURE__*/React.createElement("header", {
    className: "adm-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-top__title"
  }, route.title), /*#__PURE__*/React.createElement("div", {
    className: "adm-top__sub"
  }, route.sub)), /*#__PURE__*/React.createElement("div", {
    className: "adm-top__search",
    style: {
      height: "38px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Ara\u2026"
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: toggleTheme,
    "aria-label": "Tema",
    style: {
      width: 38,
      height: 38
    }
  }, window.MarkaTheme.get().mode === "dark" ? "☀" : "☾"), /*#__PURE__*/React.createElement("a", {
    className: "adm-btn adm-btn--ghost",
    href: "../website/index.html",
    target: "_blank",
    rel: "noopener",
    style: {
      height: "38px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 15
  }), " Siteyi G\xF6r")), /*#__PURE__*/React.createElement("main", {
    className: "adm-body"
  }, route.comp(go))), /*#__PURE__*/React.createElement(MediaPicker, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(AdminShell, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "app.jsx", error: String((e && e.message) || e) }); }

// blog-editor.jsx
try { (() => {
/* Comprehensive blog editor — pick a layout template, fill blocks (text +
   images), see a live preview, publish. Real cover + inline + gallery images. */
const {
  useState: useBState
} = React;
const AD = () => window.MK_ADMIN;
const BLOG_TPLS = [{
  id: "standart",
  label: "Standart Makale",
  desc: "Kapak, spot, gövde ve araya görsel",
  vis: ["img", "bar", "bar"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Kapak görseli"
  }, {
    k: "kicker",
    t: "kicker",
    label: "Kategori / üst başlık"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Spot / giriş"
  }, {
    k: "body",
    t: "rich",
    label: "Gövde metni",
    ai: true
  }, {
    k: "image",
    t: "image",
    label: "Araya görsel"
  }, {
    k: "body2",
    t: "rich",
    label: "Devam metni"
  }]
}, {
  id: "foto",
  label: "Foto Hikâye",
  desc: "Görsel ağırlıklı, galeri düzeni",
  vis: ["img", "row2"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Büyük kapak"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Giriş"
  }, {
    k: "gallery",
    t: "gallery",
    label: "Foto galerisi"
  }, {
    k: "body",
    t: "rich",
    label: "Kapanış notu",
    ai: true
  }]
}, {
  id: "roportaj",
  label: "Röportaj",
  desc: "Soru–cevap düzeni",
  vis: ["bar", "qa", "qa"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Kapak görseli"
  }, {
    k: "kicker",
    t: "kicker",
    label: "Konuk"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Giriş"
  }, {
    k: "qa",
    t: "qa",
    label: "Soru & Cevaplar"
  }]
}, {
  id: "rehber",
  label: "Liste / Rehber",
  desc: "Numaralı adımlar",
  vis: ["bar", "step", "step"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Kapak görseli"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Giriş"
  }, {
    k: "list",
    t: "list",
    label: "Adımlar / maddeler"
  }]
}, {
  id: "minimal",
  label: "Minimal Deneme",
  desc: "Yalnızca tipografi, kapaksız",
  vis: ["bar", "bar", "bars"],
  blocks: [{
    k: "kicker",
    t: "kicker",
    label: "Üst başlık"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "body",
    t: "rich",
    label: "Metin",
    ai: true
  }]
}];
function renderRich(text) {
  if (!text) return null;
  return text.split(/\n{2,}/).map((para, i) => {
    const t = para.trim();
    if (/^##\s+/.test(t)) return /*#__PURE__*/React.createElement("h2", {
      key: i
    }, t.replace(/^##\s+/, ""));
    if (/^#\s+/.test(t)) return /*#__PURE__*/React.createElement("h2", {
      key: i
    }, t.replace(/^#\s+/, ""));
    return /*#__PURE__*/React.createElement("p", {
      key: i
    }, t);
  });
}

/* ---- repeatable blocks ---- */
function QARepeater({
  items = [],
  onChange
}) {
  const add = () => onChange([...items, {
    id: Date.now() + Math.random(),
    q: "",
    a: ""
  }]);
  const upd = (id, p) => onChange(items.map(x => x.id === id ? {
    ...x,
    ...p
  } : x));
  return /*#__PURE__*/React.createElement("div", null, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "blk",
    key: it.id
  }, /*#__PURE__*/React.createElement("button", {
    className: "blk__x",
    onClick: () => onChange(items.filter(x => x.id !== it.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 12
  })), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    placeholder: `Soru ${i + 1}`,
    value: it.q,
    onChange: e => upd(it.id, {
      q: e.target.value
    })
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "4rem"
    },
    placeholder: "Cevap",
    value: it.a,
    onChange: e => upd(it.id, {
      a: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost blk-add",
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Soru ekle"));
}
function ListRepeater({
  items = [],
  onChange
}) {
  const add = () => onChange([...items, {
    id: Date.now() + Math.random(),
    h: "",
    text: "",
    img: null
  }]);
  const upd = (id, p) => onChange(items.map(x => x.id === id ? {
    ...x,
    ...p
  } : x));
  return /*#__PURE__*/React.createElement("div", null, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "blk",
    key: it.id
  }, /*#__PURE__*/React.createElement("button", {
    className: "blk__x",
    onClick: () => onChange(items.filter(x => x.id !== it.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 12
  })), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    placeholder: `${i + 1}. başlık`,
    value: it.h,
    onChange: e => upd(it.id, {
      h: e.target.value
    })
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "3.5rem"
    },
    placeholder: "A\xE7\u0131klama",
    value: it.text,
    onChange: e => upd(it.id, {
      text: e.target.value
    })
  }), /*#__PURE__*/React.createElement(ImageUpload, {
    ratio: "16/9",
    value: it.img,
    onChange: v => upd(it.id, {
      img: v
    }),
    label: "G\xF6rsel (ops.)"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost blk-add",
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Madde ekle"));
}

/* ---- form + preview per block ---- */
function BlockForm({
  block,
  value,
  setVal,
  onAI,
  aiBusy
}) {
  const t = block.t;
  if (t === "cover") return /*#__PURE__*/React.createElement(ImageUpload, {
    label: block.label,
    ratio: "21/9",
    value: value,
    onChange: setVal,
    hint: "\xF6neri 2000\xD7860"
  });
  if (t === "image") return /*#__PURE__*/React.createElement(ImageUpload, {
    label: block.label,
    ratio: "16/9",
    value: value,
    onChange: setVal
  });
  if (t === "gallery") return /*#__PURE__*/React.createElement(GalleryUpload, {
    label: block.label,
    items: value || [],
    onChange: setVal
  });
  if (t === "qa") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement(QARepeater, {
    items: value || [],
    onChange: setVal
  }));
  if (t === "list") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement(ListRepeater, {
    items: value || [],
    onChange: setVal
  }));
  if (t === "title") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    style: {
      fontSize: "1.1rem",
      fontWeight: 600
    },
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "Etkileyici bir ba\u015Fl\u0131k\u2026"
  }));
  if (t === "kicker") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "\xF6rn. G\xF6r\xFC\u015F"
  }));
  if (t === "lead") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "4rem"
    },
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "Tek paragrafl\u0131k \xE7arp\u0131c\u0131 giri\u015F\u2026"
  }));
  // rich
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, block.label, block.ai && /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: ".3rem .7rem",
      borderRadius: "8px"
    },
    disabled: aiBusy,
    onClick: onAI
  }, aiBusy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderTopColor: "transparent",
      borderColor: "var(--accent)"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI ile yaz"))), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "11rem"
    },
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "Paragraflar\u0131 bo\u015F sat\u0131rla ay\u0131r\u0131n. Alt ba\u015Fl\u0131k i\xE7in sat\u0131r ba\u015F\u0131na ## yaz\u0131n."
  }));
}
function BlockPreview({
  block,
  value
}) {
  const t = block.t;
  if (t === "cover") return /*#__PURE__*/React.createElement("div", {
    className: "pv__cover"
  }, value ? /*#__PURE__*/React.createElement("img", {
    src: value,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "KAPAK G\xD6RSEL\u0130"));
  if (t === "kicker") return value ? /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, value) : null;
  if (t === "title") return /*#__PURE__*/React.createElement("h1", null, value || "Yazı başlığı buraya");
  if (t === "lead") return value ? /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, value) : null;
  if (t === "rich") return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem"
    }
  }, renderRich(value));
  if (t === "image") return /*#__PURE__*/React.createElement("figure", null, value ? /*#__PURE__*/React.createElement("img", {
    className: "inl",
    src: value,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "ARAYA G\xD6RSEL"));
  if (t === "gallery") return value && value.length ? /*#__PURE__*/React.createElement("div", {
    className: "pv__gal"
  }, value.map(g => /*#__PURE__*/React.createElement("figure", {
    key: g.id
  }, /*#__PURE__*/React.createElement("img", {
    src: g.src,
    alt: ""
  }), g.caption && /*#__PURE__*/React.createElement("figcaption", null, g.caption)))) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "FOTO GALER\u0130S\u0130");
  if (t === "qa") return value && value.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem"
    }
  }, value.map(x => /*#__PURE__*/React.createElement("div", {
    className: "pv__qa",
    key: x.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "q"
  }, x.q || "Soru?"), /*#__PURE__*/React.createElement("span", {
    className: "a"
  }, x.a || "Cevap…")))) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "SORU & CEVAP");
  if (t === "list") return value && value.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.3rem"
    }
  }, value.map((x, i) => /*#__PURE__*/React.createElement("div", {
    className: "pv__step",
    key: x.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: ".5rem"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, x.h || "Adım"), x.text && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, x.text), x.img && /*#__PURE__*/React.createElement("img", {
    className: "inl",
    src: x.img,
    alt: ""
  }))))) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "ADIMLAR");
  return null;
}
function BlogEditor({
  post,
  onClose,
  onSave
}) {
  const init = post && post.fields ? post : post && post.title ? {
    id: post.id,
    template: "standart",
    status: post.status || "Taslak",
    fields: {
      title: post.title,
      kicker: post.cat,
      lead: post.excerpt || ""
    }
  } : {
    id: post && post.id,
    template: null,
    status: "Taslak",
    fields: {}
  };
  const [data, setData] = useBState(init);
  const [aiBusy, setAiBusy] = useBState(false);
  const tpl = BLOG_TPLS.find(t => t.id === data.template);
  const setField = (k, v) => setData(d => ({
    ...d,
    fields: {
      ...d.fields,
      [k]: v
    }
  }));
  const aiWrite = async () => {
    setAiBusy(true);
    const topic = data.fields.title || data.fields.kicker || "kreatif tasarım";
    const out = await AD().ai(`"${topic}" konusunda Türkçe, premium editoryal tonda bir blog gövdesi yaz. Paragrafları boş satırla ayır, alt başlık için "## " kullan. Sonunda yeni satırda "ÖZET:" ve tek cümle ekle.`, () => AD().SIM.blog(topic));
    let body = out,
      lead = data.fields.lead;
    const m = out.split(/ÖZET\s*:/i);
    if (m.length > 1) {
      body = m[0].trim();
      lead = m[1].trim();
    }
    const tm = body.match(/^#\s*(.+)$/m);
    if (tm) body = body.replace(/^#\s*.+$/m, "").trim();
    setData(d => ({
      ...d,
      fields: {
        ...d.fields,
        body,
        lead: d.fields.lead || lead,
        title: d.fields.title || (tm ? tm[1] : topic)
      }
    }));
    setAiBusy(false);
  };
  const save = status => {
    const f = data.fields;
    onSave({
      id: data.id,
      template: data.template,
      status,
      fields: f,
      title: f.title || "Başlıksız",
      cat: f.kicker || "Görüş",
      cover: f.cover || null,
      date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) : "—",
      author: "Sen",
      views: "—"
    });
  };

  // template picker
  if (!tpl) {
    return /*#__PURE__*/React.createElement(AdmCard, {
      title: "Yeni yaz\u0131 \u2014 \u015Fablon se\xE7",
      desc: "Konseptine uygun bir d\xFCzenle ba\u015Fla",
      action: /*#__PURE__*/React.createElement("button", {
        className: "ed-back",
        onClick: onClose
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "close",
        size: 15
      }), " Kapat")
    }, /*#__PURE__*/React.createElement("div", {
      className: "btpl-grid"
    }, BLOG_TPLS.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: "btpl",
      onClick: () => setData(d => ({
        ...d,
        template: t.id
      }))
    }, /*#__PURE__*/React.createElement("div", {
      className: "btpl__vis"
    }, t.vis.map((v, i) => v === "img" ? /*#__PURE__*/React.createElement("b", {
      key: i,
      className: "img"
    }) : v === "row2" ? /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "row"
    }, /*#__PURE__*/React.createElement("b", {
      className: "img"
    }), /*#__PURE__*/React.createElement("b", {
      className: "img"
    })) : v === "qa" ? /*#__PURE__*/React.createElement("i", {
      key: i,
      className: "bar",
      style: {
        width: "60%"
      }
    }) : v === "step" ? /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "row",
      style: {
        flex: "none",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "bar",
      style: {
        width: 18,
        height: 18,
        borderRadius: 9
      }
    }), /*#__PURE__*/React.createElement("i", {
      className: "bar",
      style: {
        flex: 1
      }
    })) : v === "bars" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
      key: i,
      className: "bar"
    }), /*#__PURE__*/React.createElement("i", {
      className: "bar",
      style: {
        width: "80%"
      }
    })) : /*#__PURE__*/React.createElement("i", {
      key: i,
      className: "bar",
      style: {
        width: i ? "70%" : "100%"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "btpl__b"
    }, /*#__PURE__*/React.createElement("h4", null, t.label), /*#__PURE__*/React.createElement("p", null, t.desc))))));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: () => setData(d => ({
      ...d,
      template: null
    }))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " \u015Eablonu de\u011Fi\u015Ftir"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green",
    style: {
      height: "22px",
      padding: "4px 6px 3px",
      fontSize: "9px",
      letterSpacing: "0.6px",
      textAlign: "left",
      fontWeight: "400",
      borderRadius: "16px"
    }
  }, tpl.label), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement(MkSelect, {
    width: "160px",
    value: data.status,
    onChange: v => setData(d => ({
      ...d,
      status: v
    })),
    options: ["Taslak", "Zamanlandı", "Yayında"]
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => save("Taslak"),
    style: {
      height: "38px",
      borderRadius: "8px"
    }
  }, "Tasla\u011Fa kaydet"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => save("Yayında"),
    style: {
      height: "38px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  }), " Yay\u0131nla")), /*#__PURE__*/React.createElement("div", {
    className: "editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor__form"
  }, tpl.blocks.map(b => /*#__PURE__*/React.createElement(BlockForm, {
    key: b.k,
    block: b,
    value: data.fields[b.k],
    setVal: v => setField(b.k, v),
    onAI: aiWrite,
    aiBusy: aiBusy
  }))), /*#__PURE__*/React.createElement("div", {
    className: "editor__preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "canl\u0131 \xF6nizleme \u2014 blog yaz\u0131s\u0131")), /*#__PURE__*/React.createElement("div", {
    className: "prev-scroll"
  }, /*#__PURE__*/React.createElement("article", {
    className: "pv"
  }, tpl.blocks.map(b => /*#__PURE__*/React.createElement(BlockPreview, {
    key: b.k,
    block: b,
    value: data.fields[b.k]
  }))))))));
}
function BlogWizard({
  onClose,
  onSave
}) {
  const [step, setStep] = useBState(1);
  const [topic, setTopic] = useBState("");
  const [custom, setCustom] = useBState("");
  const [steer, setSteer] = useBState("");
  const [sugs, setSugs] = useBState(["2026'da editoryal tasarım trendleri", "Marka kimliğinde tipografinin rolü", "Web'de mikro etkileşimlerin gücü", "Tasarım sistemleri nasıl ölçeklenir?", "Kreatif ekiplerde süreç yönetimi"]);
  const [data, setData] = useBState(null);
  const [busy, setBusy] = useBState(false);
  const genImg = hue => {
    const c = document.createElement("canvas");
    c.width = 480;
    c.height = 360;
    const x = c.getContext("2d");
    const h = ((150 + hue) % 360 + 360) % 360;
    const g = x.createLinearGradient(0, 0, 480, 360);
    g.addColorStop(0, `hsl(${h} 62% 72%)`);
    g.addColorStop(1, `hsl(${(h + 40) % 360} 30% 90%)`);
    x.fillStyle = g;
    x.fillRect(0, 0, 480, 360);
    x.fillStyle = "rgba(255,255,255,.45)";
    x.beginPath();
    x.arc(360, 110, 64, 0, 7);
    x.fill();
    return c.toDataURL("image/png");
  };
  const suggest = async () => {
    setBusy(true);
    const out = await AD().ai(`"${steer || "kreatif ajans, tasarım, marka"}" temasında bir blog için 5 özgün Türkçe başlık öner. Her satıra bir başlık yaz; numara veya işaret koyma.`, () => sugs.join("\n"));
    const list = out.split("\n").map(s => s.replace(/^[-•\d.\)\s]+/, "").trim()).filter(Boolean).slice(0, 6);
    if (list.length) setSugs(list);
    setBusy(false);
  };
  const generate = async tplId => {
    setStep(3);
    setBusy(true);
    setData(null);
    const t = BLOG_TPLS.find(x => x.id === tplId);
    const out = await AD().ai(`"${topic}" konusunda Türkçe, premium ve editoryal tonda bir blog yazısı yaz. TAM olarak şu formatta yanıt ver:\nKICKER: <tek kelimelik kategori>\nLEAD: <tek cümlelik çarpıcı giriş>\nBODY:\n<gövde metni, paragrafları boş satırla ayır, alt başlık için ## kullan>`, () => `KICKER: Görüş\nLEAD: ${topic} üzerine kısa bir giriş.\nBODY:\n${AD().SIM.blog(topic)}`);
    const kicker = ((out.match(/KICKER\s*:\s*(.+)/i) || [])[1] || "Görüş").trim();
    const lead = ((out.match(/LEAD\s*:\s*(.+)/i) || [])[1] || "").trim();
    const body = (out.split(/BODY\s*:/i)[1] || out).replace(/^#\s*.+$/m, "").trim();
    const f = {};
    t.blocks.forEach((b, i) => {
      if (b.t === "title") f[b.k] = topic;else if (b.t === "kicker") f[b.k] = kicker;else if (b.t === "lead") f[b.k] = lead;else if (b.t === "rich") f[b.k] = body;else if (b.t === "cover" || b.t === "image") f[b.k] = genImg(i * 60 + 20);else if (b.t === "gallery") f[b.k] = [0, 1, 2, 3].map(g => ({
        id: Date.now() + g + Math.random(),
        src: genImg(g * 70),
        caption: ""
      }));else if (b.t === "qa") f[b.k] = [{
        id: 1,
        q: `${topic} nedir?`,
        a: lead || "…"
      }, {
        id: 2,
        q: "Neden önemli?",
        a: "Markanın dijitalde fark yaratması için kritik."
      }];else if (b.t === "list") f[b.k] = [{
        id: 1,
        h: "Net bir yön belirleyin",
        text: lead,
        img: genImg(30)
      }, {
        id: 2,
        h: "Tutarlı uygulayın",
        text: "Tek bir vurgu ve ritim.",
        img: null
      }];
    });
    setData({
      template: tplId,
      status: "Taslak",
      fields: f
    });
    setBusy(false);
  };
  const save = status => {
    const f = data.fields;
    onSave({
      template: data.template,
      status,
      fields: f,
      title: f.title || topic,
      cat: f.kicker || "Görüş",
      cover: f.cover || null,
      date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) : "—",
      author: "AI",
      views: "—"
    });
  };
  const Steps = () => /*#__PURE__*/React.createElement("div", {
    className: "wiz-steps"
  }, [["1", "Konu"], ["2", "Şablon"], ["3", "Üret & önizle"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: `wiz-step ${+n === step ? "on" : ""} ${+n < step ? "done" : ""}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "wiz-step__n"
  }, +n < step ? "✓" : n), l)));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " Kapat"), /*#__PURE__*/React.createElement("span", {
    className: "ai-chip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 12,
    fill: true
  }), " AI Yaz\u0131 Sihirbaz\u0131"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement(Steps, null)), step === 1 && /*#__PURE__*/React.createElement(AdmCard, {
    title: "Konu se\xE7",
    desc: "AI'\u0131n \xF6nerdi\u011Fi konulardan se\xE7 ya da y\xF6nlendir"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ai-row",
    style: {
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "AI'\u0131 y\xF6nlendir (tema/anahtar kelime)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: steer,
    onChange: e => setSteer(e.target.value),
    placeholder: "\xF6rn. motion tasar\u0131m, SaaS markala\u015Fma",
    onKeyDown: e => e.key === "Enter" && suggest()
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    disabled: busy,
    onClick: suggest,
    style: {
      marginBottom: 16
    }
  }, busy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14
  }), " Konu \xF6ner"))), /*#__PURE__*/React.createElement("div", {
    className: "wiz-chips"
  }, sugs.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "wiz-chip",
    onClick: () => {
      setTopic(s);
      setStep(2);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " ", s))), /*#__PURE__*/React.createElement("div", {
    className: "pick-sep"
  }, "veya kendi konunu yaz"), /*#__PURE__*/React.createElement("div", {
    className: "ai-row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: custom,
    onChange: e => setCustom(e.target.value),
    placeholder: "Kendi ba\u015Fl\u0131k fikrin\u2026",
    onKeyDown: e => e.key === "Enter" && custom.trim() && (setTopic(custom.trim()), setStep(2))
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    disabled: !custom.trim(),
    onClick: () => {
      setTopic(custom.trim());
      setStep(2);
    }
  }, "Devam ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192")))), step === 2 && /*#__PURE__*/React.createElement(AdmCard, {
    title: "\u015Eablon se\xE7",
    desc: `Konu: “${topic}” · düzene uygun bir şablon seç`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "ed-back",
      onClick: () => setStep(1)
    }, "\u2190 Konu")
  }, /*#__PURE__*/React.createElement("div", {
    className: "btpl-grid"
  }, BLOG_TPLS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: "btpl",
    onClick: () => generate(t.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "btpl__vis"
  }, t.vis.map((v, i) => v === "img" ? /*#__PURE__*/React.createElement("b", {
    key: i,
    className: "img"
  }) : v === "row2" ? /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row"
  }, /*#__PURE__*/React.createElement("b", {
    className: "img"
  }), /*#__PURE__*/React.createElement("b", {
    className: "img"
  })) : v === "qa" ? /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "bar",
    style: {
      width: "60%"
    }
  }) : v === "step" ? /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row",
    style: {
      flex: "none",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bar",
    style: {
      width: 18,
      height: 18,
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "bar",
    style: {
      flex: 1
    }
  })) : v === "bars" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "bar"
  }), /*#__PURE__*/React.createElement("i", {
    className: "bar",
    style: {
      width: "80%"
    }
  })) : /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "bar",
    style: {
      width: i ? "70%" : "100%"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "btpl__b"
  }, /*#__PURE__*/React.createElement("h4", null, t.label), /*#__PURE__*/React.createElement("p", null, t.desc)))))), step === 3 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: () => setStep(2)
  }, "\u2190 \u015Eablon"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, (BLOG_TPLS.find(t => t.id === (data && data.template)) || {}).label || "Üretiliyor"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--danger",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }), " Sil"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    disabled: busy || !data,
    onClick: () => save("Taslak")
  }, "Tasla\u011Fa kaydet"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    disabled: busy || !data,
    onClick: () => save("Yayında")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  }), " Yay\u0131nla")), busy || !data ? /*#__PURE__*/React.createElement("div", {
    className: "adm-empty"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 12
    }
  }, "AI i\xE7erik ve g\xF6rseller \xFCretiliyor\u2026"), /*#__PURE__*/React.createElement("p", null, "\u201C", topic, "\u201D i\xE7in metinler ve g\xF6rsel alanlar\u0131 dolduruluyor.")) : /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI \xF6nizleme \u2014 yay\u0131na haz\u0131r"), /*#__PURE__*/React.createElement("div", {
    className: "prev-scroll"
  }, /*#__PURE__*/React.createElement("article", {
    className: "pv"
  }, BLOG_TPLS.find(t => t.id === data.template).blocks.map(b => /*#__PURE__*/React.createElement(BlockPreview, {
    key: b.k,
    block: b,
    value: data.fields[b.k]
  })))))));
}
Object.assign(window, {
  BlogEditor,
  BlogWizard,
  BLOG_TPLS,
  renderRich
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "blog-editor.jsx", error: String((e && e.message) || e) }); }

// brand/brand.js
try { (() => {
/* ========================================================================
   BRAND CONFIG — single source of truth for the wordmark + tagline.
   Change BRAND_NAME here and it propagates to every component and UI kit
   that reads it (Logo, Footer, CTA blocks, meta copy).
   Works both as an ES module (import) and as a global (window.MarkaBrand).
   ======================================================================== */
const BRAND_NAME = "Marka";
const BRAND_SLOGAN = "Dijitalde yeni standart.";
const BRAND_SOCIAL = [{
  label: "Instagram",
  href: "#",
  short: "IG"
}, {
  label: "LinkedIn",
  href: "#",
  short: "LI"
}, {
  label: "X",
  href: "#",
  short: "X"
}, {
  label: "YouTube",
  href: "#",
  short: "YT"
}, {
  label: "Dribbble",
  href: "#",
  short: "DR"
}, {
  label: "Behance",
  href: "#",
  short: "BE"
}];

/* Also expose globally for non-module scripts (UI kits via <script src>). */
if (typeof window !== "undefined") {
  window.MarkaBrand = {
    BRAND_NAME,
    BRAND_SLOGAN,
    BRAND_SOCIAL
  };
}
Object.assign(__ds_scope, { BRAND_NAME, BRAND_SLOGAN, BRAND_SOCIAL });
})(); } catch (e) { __ds_ns.__errors.push({ path: "brand/brand.js", error: String((e && e.message) || e) }); }

// components/cards/cardBase.js
try { (() => {
// Shared card chrome — injected once. Not a component (no .d.ts), just a helper
// imported by the card components so they share one base stylesheet.
const CSS = `
.mk-card{
  display:flex; flex-direction:column; gap:1rem; position:relative;
  color:var(--text); text-decoration:none; isolation:isolate;
}
.mk-card__media{ position:relative; }
.mk-card:hover .mk-media__inner{ transform:scale(var(--img-zoom)); }
.mk-card:hover .mk-media__overlay{ opacity:1; }
.mk-card__body{ display:flex; flex-direction:column; gap:.4rem; }
.mk-card__toprow{ display:flex; align-items:center; justify-content:space-between; gap:1rem; }
.mk-card__title{
  font-size:var(--fs-h3); font-weight:var(--fw-semibold); letter-spacing:var(--ls-heading);
  line-height:var(--lh-snug); margin:0;
  background-image:linear-gradient(var(--accent),var(--accent));
  background-size:0% 2px; background-repeat:no-repeat; background-position:0 100%;
  transition:background-size var(--dur) var(--ease-out);
}
.mk-card:hover .mk-card__title{ background-size:100% 2px; }
.mk-card__meta{ display:flex; align-items:center; gap:.6ch; color:var(--text-muted); font-size:var(--fs-meta); }
.mk-card__meta--mono{ font-family:var(--font-mono); }
.mk-card__excerpt{ color:var(--text-muted); font-size:var(--fs-sm); line-height:var(--lh-body); }
.mk-card__dot{ width:3px; height:3px; border-radius:50%; background:currentColor; opacity:.5; }
.mk-card__price{ font-family:var(--font-mono); font-weight:var(--fw-medium); color:var(--text); }
.mk-card__price small{ color:var(--text-muted); font-weight:var(--fw-regular); }
.mk-card__cursorlabel{
  position:absolute; top:1rem; right:1rem; z-index:2;
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--on-accent); background:var(--accent);
  padding:.45em .8em; border-radius:var(--radius-pill);
  transform:translateY(-6px) scale(.9); opacity:0;
  transition:opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.mk-card:hover .mk-card__cursorlabel{ opacity:1; transform:translateY(0) scale(1); }
`;
function ensureCardBase() {
  if (typeof document === "undefined" || window.__mkCardBase) return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "card-base");
  s.textContent = CSS;
  document.head.appendChild(s);
  window.__mkCardBase = true;
}
Object.assign(__ds_scope, { ensureCardBase });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/cardBase.js", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-avatar{
  display:inline-flex; align-items:center; justify-content:center;
  border-radius:50%; overflow:hidden; flex:none;
  background:var(--surface-muted); color:var(--text-muted);
  font-family:var(--font-mono); font-weight:var(--fw-medium); text-transform:uppercase;
  border:2px solid var(--surface);
}
.mk-avatar img{ width:100%; height:100%; object-fit:cover; display:block; }
.mk-avatar--xs{ width:24px; height:24px; font-size:.55rem; }
.mk-avatar--sm{ width:32px; height:32px; font-size:.7rem; }
.mk-avatar--md{ width:44px; height:44px; font-size:.85rem; }
.mk-avatar--lg{ width:64px; height:64px; font-size:1.1rem; }
.mk-avatar-stack{ display:inline-flex; }
.mk-avatar-stack > *{ margin-left:-10px; }
.mk-avatar-stack > *:first-child{ margin-left:0; }
.mk-avatar-stack .mk-avatar__more{ background:var(--text); color:var(--text-invert); }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "avatar");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}
function initials(name = "") {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("");
}

/** Round avatar with image or initials fallback. */
function Avatar({
  src,
  name = "",
  size = "md",
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = ["mk-avatar", `mk-avatar--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}

/** Overlapping avatar stack with an optional "+N" chip (collection followers). */
function AvatarStack({
  people = [],
  max = 4,
  size = "sm"
}) {
  ensureStyle();
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return /*#__PURE__*/React.createElement("span", {
    className: "mk-avatar-stack"
  }, shown.map((p, i) => /*#__PURE__*/React.createElement(Avatar, {
    key: i,
    src: p.src,
    name: p.name,
    size: size
  })), extra > 0 && /*#__PURE__*/React.createElement("span", {
    className: `mk-avatar mk-avatar--${size} mk-avatar__more`
  }, "+", extra));
}
Object.assign(__ds_scope, { Avatar, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-badge{
  display:inline-flex; align-items:center; gap:.4em;
  font-family:var(--font-mono); font-size:var(--fs-label); font-weight:var(--fw-medium);
  letter-spacing:var(--ls-label); text-transform:uppercase; line-height:1;
  padding:.4em .7em; border-radius:var(--radius-pill); white-space:nowrap;
}
.mk-badge--solid{ background:var(--accent); color:var(--on-accent); }
.mk-badge--outline{ background:transparent; color:var(--text); border:1px solid var(--border-strong); }
.mk-badge--muted{ background:var(--surface-muted); color:var(--text-muted); }
.mk-badge--invert{ background:var(--text); color:var(--text-invert); }
.mk-badge__dot{ width:.5em; height:.5em; border-radius:50%; background:currentColor; }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "badge");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Small mono-cased label — "PROJE", "DİJİTAL ÜRÜN", scores, status. */
function Badge({
  children,
  variant = "outline",
  dot = false,
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = ["mk-badge", `mk-badge--${variant}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "mk-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-btn{
  --_bg: var(--accent);
  --_fg: var(--on-accent);
  --_bd: transparent;
  position:relative; display:inline-flex; align-items:center; justify-content:center;
  gap:.55em; isolation:isolate; cursor:pointer; white-space:nowrap;
  font-family:var(--font-sans); font-weight:var(--fw-medium); letter-spacing:-0.01em;
  border:1px solid var(--_bd); border-radius:var(--radius-pill);
  color:var(--_fg); background:transparent;
  transition: color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color:transparent;
}
.mk-btn::before{
  content:""; position:absolute; inset:0; z-index:-1; border-radius:inherit;
  background:var(--_bg); transform:scaleY(1); transform-origin:bottom;
  transition: transform var(--dur) var(--ease-out), background var(--dur-fast) var(--ease-out);
}
.mk-btn:active{ transform:scale(0.97); }
.mk-btn:focus-visible{ outline:2px solid var(--focus-ring); outline-offset:3px; }
.mk-btn[disabled]{ opacity:.4; pointer-events:none; }

/* sizes */
.mk-btn--sm{ font-size:var(--fs-sm); padding:.5rem .9rem; }
.mk-btn--md{ font-size:var(--fs-body); padding:.7rem 1.25rem; }
.mk-btn--lg{ font-size:1.0625rem; padding:.95rem 1.7rem; }
.mk-btn--block{ display:flex; width:100%; }

/* primary: filled green, darkens + fill-wipe on hover */
.mk-btn--primary{ --_bg:var(--accent); --_fg:var(--on-accent); }
.mk-btn--primary:hover{ --_bg:var(--accent-hover); }

/* secondary: ink outline, green fill wipes up on hover */
.mk-btn--secondary{ --_fg:var(--text); --_bd:var(--border-strong); }
.mk-btn--secondary::before{ background:var(--accent); transform:scaleY(0); }
.mk-btn--secondary:hover{ --_fg:var(--on-accent); --_bd:var(--accent); }
.mk-btn--secondary:hover::before{ transform:scaleY(1); }

/* ghost: text only, underline grow */
.mk-btn--ghost{ --_fg:var(--text); padding-inline:.4rem; }
.mk-btn--ghost::before{ display:none; }
.mk-btn--ghost:hover{ --_fg:var(--accent-hover); }

.mk-btn__icon{ display:inline-flex; transition:transform var(--dur-fast) var(--ease-out); }
.mk-btn:hover .mk-btn__icon--arrow{ transform:translateX(3px); }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "button");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}
function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  iconLeft,
  iconRight,
  fullWidth = false,
  magnetic = false,
  disabled = false,
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = ["mk-btn", `mk-btn--${variant}`, `mk-btn--${size}`, fullWidth ? "mk-btn--block" : "", className].filter(Boolean).join(" ");
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeft && /*#__PURE__*/React.createElement("span", {
    className: "mk-btn__icon"
  }, iconLeft), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && /*#__PURE__*/React.createElement("span", {
    className: "mk-btn__icon mk-btn__icon--arrow"
  }, iconRight));
  const props = {
    className: cls,
    "data-magnetic": magnetic ? "" : undefined,
    ...rest
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href
    }, props), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled
  }, props), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-iconbtn{
  display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
  background:transparent; border:1px solid var(--border); border-radius:var(--radius-pill);
  color:var(--text); transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color:transparent;
}
.mk-iconbtn:hover{ border-color:var(--border-strong); }
.mk-iconbtn:active{ transform:scale(.92); }
.mk-iconbtn:focus-visible{ outline:2px solid var(--focus-ring); outline-offset:2px; }
.mk-iconbtn--sm{ width:36px; height:36px; }
.mk-iconbtn--md{ width:44px; height:44px; }
.mk-iconbtn--lg{ width:56px; height:56px; }
.mk-iconbtn--solid{ background:var(--text); color:var(--text-invert); border-color:var(--text); }
.mk-iconbtn--solid:hover{ background:var(--accent); color:var(--on-accent); border-color:var(--accent); }
.mk-iconbtn--ghost{ border-color:transparent; }
.mk-iconbtn--ghost:hover{ background:var(--surface-muted); }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "iconbtn");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Square-ish round icon button — nav arrows, social, theme toggle, close. */
function IconButton({
  children,
  variant = "outline",
  size = "md",
  label,
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = ["mk-iconbtn", `mk-iconbtn--${variant}`, `mk-iconbtn--${size}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-logo{
  display:inline-flex; align-items:center; gap:.5ch;
  font-family:var(--font-sans); font-weight:var(--fw-bold);
  letter-spacing:-0.04em; color:var(--text); line-height:1;
  text-decoration:none; -webkit-tap-highlight-color:transparent;
}
.mk-logo__dot{ color:var(--accent); }
.mk-logo--sm{ font-size:1.125rem; }
.mk-logo--md{ font-size:1.5rem; }
.mk-logo--lg{ font-size:clamp(2rem,6vw,4rem); }
.mk-logo--xl{ font-size:clamp(3rem,16vw,14rem); letter-spacing:-0.05em; }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "logo");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Wordmark. Pulls the brand name from brand/brand.js by default. */
function Logo({
  name = __ds_scope.BRAND_NAME,
  size = "md",
  href,
  showDot = true,
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = ["mk-logo", `mk-logo--${size}`, className].filter(Boolean).join(" ");
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, name), showDot && /*#__PURE__*/React.createElement("span", {
    className: "mk-logo__dot",
    "aria-hidden": "true"
  }, "."));
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: cls
  }, rest), inner);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), inner);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-rating{ display:inline-flex; align-items:center; gap:.5ch; font-family:var(--font-mono); }
.mk-rating__stars{ display:inline-flex; gap:1px; color:var(--accent); }
.mk-rating__stars svg{ display:block; }
.mk-rating__star--empty{ color:var(--border); }
.mk-rating__score{ font-size:var(--fs-meta); font-weight:var(--fw-medium); color:var(--text); }
.mk-rating__count{ font-size:var(--fs-xs); color:var(--text-muted); }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "rating");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}
function Star({
  filled
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    className: filled ? "" : "mk-rating__star--empty",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }));
}

/** Star rating + numeric score in mono — course / product cards. */
function Rating({
  value = 0,
  max = 5,
  count,
  showScore = true,
  className = "",
  ...rest
}) {
  ensureStyle();
  const full = Math.round(value);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["mk-rating", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "mk-rating__stars",
    "aria-hidden": "true"
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement(Star, {
    key: i,
    filled: i < full
  }))), showScore && /*#__PURE__*/React.createElement("span", {
    className: "mk-rating__score"
  }, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    className: "mk-rating__count"
  }, "(", count, ")"));
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Rating.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-secthead{
  display:flex; align-items:flex-end; justify-content:space-between; gap:2rem;
  padding-bottom:var(--space-5); flex-wrap:wrap;
}
.mk-secthead__main{ display:flex; flex-direction:column; gap:1rem; max-width:46ch; }
.mk-secthead__eyebrow{
  display:inline-flex; align-items:center; gap:.6ch;
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--text-muted);
}
.mk-secthead__eyebrow::before{ content:""; width:24px; height:1px; background:var(--accent); }
.mk-secthead__title{ font-size:var(--fs-h1); font-weight:var(--fw-semibold); letter-spacing:var(--ls-heading); }
.mk-secthead__sub{ color:var(--text-muted); font-size:var(--fs-lead); }
.mk-secthead__link{
  display:inline-flex; align-items:center; gap:.5ch; flex:none;
  font-family:var(--font-mono); font-size:var(--fs-meta); letter-spacing:.04em;
  color:var(--text); padding-bottom:2px; border-bottom:1px solid var(--border-strong);
  transition: gap var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.mk-secthead__link:hover{ gap:1ch; color:var(--accent-hover); border-color:var(--accent); }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "secthead");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Section header: mono eyebrow + big title + optional "Tümünü Gör" link. */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  linkText,
  linkHref = "#",
  className = "",
  ...rest
}) {
  ensureStyle();
  return /*#__PURE__*/React.createElement("header", _extends({
    className: ["mk-secthead", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mk-secthead__main"
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "mk-secthead__eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    className: "mk-secthead__title"
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "mk-secthead__sub"
  }, subtitle)), linkText && /*#__PURE__*/React.createElement("a", {
    className: "mk-secthead__link",
    href: linkHref
  }, linkText, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-tag{
  display:inline-flex; align-items:center; cursor:pointer;
  font-family:var(--font-sans); font-size:var(--fs-sm); font-weight:var(--fw-medium);
  color:var(--text); background:var(--surface); border:1px solid var(--border);
  padding:.45rem .85rem; border-radius:var(--radius-pill); white-space:nowrap;
  transition: color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.mk-tag:hover{ border-color:var(--border-strong); }
.mk-tag[data-active="true"]{ background:var(--text); color:var(--text-invert); border-color:var(--text); }
.mk-tag__count{ margin-left:.5ch; color:var(--text-subtle); font-family:var(--font-mono); font-size:var(--fs-xs); }
.mk-tag[data-active="true"] .mk-tag__count{ color:var(--text-invert); opacity:.6; }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "tag");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Filter pill / chip — used in portfolio + market + blog filter bars. */
function Tag({
  children,
  active = false,
  count,
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = ["mk-tag", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "data-active": active
  }, rest), children, count != null && /*#__PURE__*/React.createElement("span", {
    className: "mk-tag__count"
  }, count));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-field{ display:flex; flex-direction:column; gap:.5rem; }
.mk-field__label{
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--text-muted);
}
.mk-input, .mk-textarea, .mk-select{
  width:100%; font-family:var(--font-sans); font-size:var(--fs-body); color:var(--text);
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-sm);
  padding:.85rem 1rem; transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
  -webkit-appearance:none; appearance:none;
}
.mk-input::placeholder, .mk-textarea::placeholder{ color:var(--text-subtle); }
.mk-input:focus, .mk-textarea:focus, .mk-select:focus{
  outline:none; border-color:var(--border-strong); box-shadow:0 0 0 3px var(--accent-tint);
}
.mk-textarea{ resize:vertical; min-height:7rem; line-height:var(--lh-body); }
.mk-field--underline .mk-input{
  border:0; border-bottom:1px solid var(--border); border-radius:0; padding-inline:0; background:transparent;
}
.mk-field--underline .mk-input:focus{ box-shadow:none; border-bottom-color:var(--accent); }
.mk-select-wrap{ position:relative; }
.mk-select-wrap::after{
  content:""; position:absolute; right:1rem; top:50%; width:.5rem; height:.5rem;
  border-right:2px solid var(--text-muted); border-bottom:2px solid var(--text-muted);
  transform:translateY(-65%) rotate(45deg); pointer-events:none;
}
.mk-field__hint{ font-size:var(--fs-sm); color:var(--text-muted); }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "input");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Labelled text input. variant="underline" for the editorial contact form. */
function Input({
  label,
  hint,
  variant = "box",
  as = "input",
  className = "",
  id,
  ...rest
}) {
  ensureStyle();
  const fid = id || (label ? `f-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    className: ["mk-field", variant === "underline" ? "mk-field--underline" : "", className].filter(Boolean).join(" "),
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "mk-field__label"
  }, label), as === "textarea" ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    className: "mk-textarea"
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "mk-input"
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    className: "mk-field__hint"
  }, hint));
}

/** Native select with custom chevron. */
function Select({
  label,
  children,
  className = "",
  id,
  ...rest
}) {
  ensureStyle();
  const fid = id || (label ? `f-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    className: ["mk-field", className].filter(Boolean).join(" "),
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "mk-field__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "mk-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: "mk-select"
  }, rest), children)));
}
Object.assign(__ds_scope, { Input, Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/media/Marquee.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-marquee{ position:relative; overflow:hidden; width:100%; -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); }
.mk-marquee__track{ display:flex; width:max-content; gap:var(--gap,4rem); animation:mk-marquee var(--speed,32s) linear infinite; will-change:transform; }
.mk-marquee[data-paused="true"] .mk-marquee__track,
.mk-marquee:hover .mk-marquee__track{ animation-play-state:paused; }
.mk-marquee__item{ display:flex; align-items:center; }
@keyframes mk-marquee{ to{ transform:translateX(calc(-50% - var(--gap,4rem)/2)); } }
@media (prefers-reduced-motion: reduce){ .mk-marquee__track{ animation:none; } }
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "marquee");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/** Infinite horizontal marquee — partner logos, ticker text. Pauses on hover. */
function Marquee({
  children,
  speed = 32,
  gap = "4rem",
  pauseOnHover = true,
  className = "",
  ...rest
}) {
  ensureStyle();
  const items = React.Children.toArray(children);
  const style = {
    "--speed": `${speed}s`,
    "--gap": gap
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["mk-marquee", className].filter(Boolean).join(" "),
    style: style,
    "data-pause-hover": pauseOnHover
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mk-marquee__track"
  }, items.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "mk-marquee__item",
    key: `a${i}`
  }, c)), items.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "mk-marquee__item",
    key: `b${i}`,
    "aria-hidden": "true"
  }, c))));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/media/Media.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.mk-media{
  position:relative; display:block; overflow:hidden; border-radius:var(--radius-lg);
  background:var(--placeholder); width:100%;
}
.mk-media__inner{
  position:absolute; inset:0; transform:scale(1);
  transition: transform var(--dur-slow) var(--ease-out);
  background-size:cover; background-position:center;
}
.mk-media img{ width:100%; height:100%; object-fit:cover; display:block; }
/* placeholder pattern when no image supplied (no fake imagery) */
.mk-media--empty .mk-media__inner{
  background-image:
    linear-gradient(135deg, color-mix(in srgb, var(--text) 5%, transparent) 0 50%, transparent 50%),
    radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%);
}
.mk-media__ph{
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  font-family:var(--font-mono); font-size:var(--fs-label); letter-spacing:var(--ls-label);
  text-transform:uppercase; color:var(--text-subtle);
}
.mk-media__overlay{
  position:absolute; inset:0; display:flex; align-items:flex-end; padding:1rem;
  background:linear-gradient(to top, color-mix(in srgb, var(--ink-900) 55%, transparent), transparent 55%);
  opacity:0; transition:opacity var(--dur) var(--ease-out);
}
`;
let injected = false;
function ensureStyle() {
  if (injected || typeof document === "undefined") return;
  const s = document.createElement("style");
  s.setAttribute("data-mk", "media");
  s.textContent = CSS;
  document.head.appendChild(s);
  injected = true;
}

/**
 * Media frame with built-in hover-zoom inner + placeholder fallback.
 * Pass `ratio` like "4/3" or "16/9". When no `src`, renders a neutral
 * placeholder with an optional `label` (never fake imagery).
 */
function Media({
  src,
  alt = "",
  ratio = "4/3",
  label,
  rounded = true,
  children,
  className = "",
  ...rest
}) {
  ensureStyle();
  const cls = ["mk-media", !src ? "mk-media--empty" : "", className].filter(Boolean).join(" ");
  const style = {
    aspectRatio: ratio.replace("/", " / "),
    borderRadius: rounded ? undefined : 0
  };
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: cls,
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mk-media__inner",
    style: src ? {
      backgroundImage: `url(${src})`
    } : undefined,
    role: "img",
    "aria-label": alt
  }), !src && label && /*#__PURE__*/React.createElement("span", {
    className: "mk-media__ph"
  }, label), children);
}
Object.assign(__ds_scope, { Media });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/Media.jsx", error: String((e && e.message) || e) }); }

// components/cards/BlogCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Blog card — cover + title + excerpt + reading time / date meta. */
function BlogCard({
  title,
  excerpt,
  category,
  readTime,
  date,
  image,
  href = "#",
  featured = false,
  ratio = "16/9",
  className = "",
  ...rest
}) {
  __ds_scope.ensureCardBase();
  return /*#__PURE__*/React.createElement("a", _extends({
    className: ["mk-card", featured ? "mk-card--featured" : "", className].filter(Boolean).join(" "),
    href: href
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__media"
  }, /*#__PURE__*/React.createElement(__ds_scope.Media, {
    src: image,
    ratio: featured ? "16/9" : ratio,
    label: "YAZI",
    alt: title
  })), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-card__meta mk-card__meta--mono"
  }, category && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-hover)"
    }
  }, category), category && (date || readTime) && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__dot"
  }), date && /*#__PURE__*/React.createElement("span", null, date), date && readTime && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__dot"
  }), readTime && /*#__PURE__*/React.createElement("span", null, readTime)), /*#__PURE__*/React.createElement("h3", {
    className: "mk-card__title",
    style: featured ? {
      fontSize: "var(--fs-h2)"
    } : {
      fontSize: "var(--fs-h4)"
    }
  }, title), excerpt && /*#__PURE__*/React.createElement("p", {
    className: "mk-card__excerpt"
  }, excerpt)));
}
Object.assign(__ds_scope, { BlogCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/BlogCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/CourseCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Academy course card — cover + title + instructor + ⭐ rating + price. */
function CourseCard({
  title,
  instructor,
  rating = 0,
  reviews,
  price,
  level,
  image,
  href = "#",
  ratio = "16/10",
  className = "",
  ...rest
}) {
  __ds_scope.ensureCardBase();
  return /*#__PURE__*/React.createElement("a", _extends({
    className: ["mk-card", className].filter(Boolean).join(" "),
    href: href
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__media"
  }, /*#__PURE__*/React.createElement(__ds_scope.Media, {
    src: image,
    ratio: ratio,
    label: "KURS",
    alt: title
  }), level && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__cursorlabel",
    style: {
      left: "1rem",
      right: "auto",
      background: "var(--text)",
      color: "var(--text-invert)",
      opacity: 1,
      transform: "none"
    }
  }, level)), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mk-card__title",
    style: {
      fontSize: "var(--fs-h4)"
    }
  }, title), instructor && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__meta"
  }, instructor), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__toprow",
    style: {
      marginTop: ".35rem"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    count: reviews
  }), price != null && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__price"
  }, price))));
}
Object.assign(__ds_scope, { CourseCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CourseCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Market product card — cover + "Dijital Ürün" tag + title + seller + price. */
function ProductCard({
  title,
  seller,
  price,
  priceNote = "'den",
  tag = "Dijital Ürün",
  format,
  image,
  href = "#",
  ratio = "4/3",
  className = "",
  ...rest
}) {
  __ds_scope.ensureCardBase();
  return /*#__PURE__*/React.createElement("a", _extends({
    className: ["mk-card", className].filter(Boolean).join(" "),
    href: href
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__media"
  }, /*#__PURE__*/React.createElement(__ds_scope.Media, {
    src: image,
    ratio: ratio,
    label: "\xDCR\xDCN G\xD6RSEL\u0130",
    alt: title
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-media__overlay"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "1rem",
      left: "1rem",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "invert"
  }, tag))), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-card__toprow"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "mk-card__title",
    style: {
      fontSize: "var(--fs-h4)"
    }
  }, title)), seller && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__meta"
  }, seller), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__toprow",
    style: {
      marginTop: ".35rem"
    }
  }, format && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__meta mk-card__meta--mono"
  }, format), price != null && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__price"
  }, price, /*#__PURE__*/React.createElement("small", null, priceNote)))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProjectCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Portfolio project card — cover (hover-zoom) + "PROJE" tag + title +
 * client/team + a hover "Projeyi Gör" cursor label.
 */
function ProjectCard({
  title,
  client,
  tag = "PROJE",
  category,
  image,
  href = "#",
  ratio = "4/3",
  hoverLabel = "Projeyi Gör →",
  className = "",
  ...rest
}) {
  __ds_scope.ensureCardBase();
  return /*#__PURE__*/React.createElement("a", _extends({
    className: ["mk-card", className].filter(Boolean).join(" "),
    href: href
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__media"
  }, /*#__PURE__*/React.createElement(__ds_scope.Media, {
    src: image,
    ratio: ratio,
    label: "PROJE G\xD6RSEL\u0130",
    alt: title
  }), /*#__PURE__*/React.createElement("span", {
    className: "mk-card__cursorlabel"
  }, hoverLabel)), /*#__PURE__*/React.createElement("div", {
    className: "mk-card__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-card__toprow"
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "outline"
  }, tag), category && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__meta mk-card__meta--mono"
  }, category)), /*#__PURE__*/React.createElement("h3", {
    className: "mk-card__title"
  }, title), client && /*#__PURE__*/React.createElement("span", {
    className: "mk-card__meta"
  }, client)));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// modules-main.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Admin core modules: Dashboard, Appearance, Content (AI blog), Reports (AI). */
const {
  useState: useMState,
  useEffect: useMEffect,
  useRef: useMRef
} = React;
const A = () => window.MK_ADMIN;

/* ----------------------------- DASHBOARD ----------------------------- */
function Dashboard({
  go
}) {
  const week = [42, 55, 48, 63, 71, 58, 80];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--4"
  }, A().stats.map((s, i) => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: i
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--3"
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Haftal\u0131k trafik",
    desc: "Son 7 g\xFCn",
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 10,
      height: 140,
      paddingTop: 10
    }
  }, week.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: h * 1.5,
      background: "var(--accent)",
      borderRadius: "6px 6px 0 0",
      opacity: .35 + i * 0.09
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-muted)"
    }
  }, ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"][i]))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "H\u0131zl\u0131 AI i\u015Flemleri"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => go("reports"),
    style: {
      height: "38px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 16
  }), " Haftal\u0131k rapor olu\u015Ftur"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => go("content"),
    style: {
      height: "38px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "blog",
    size: 16
  }), " AI ile blog yaz\u0131s\u0131 yaz"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => go("appearance"),
    style: {
      height: "38px",
      borderRadius: "8px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "appearance",
    size: 16
  }), " G\xF6r\xFCn\xFCm\xFC d\xFCzenle")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)",
      marginTop: 14
    }
  }, "AI ", A().aiAvailable ? "bağlı — gerçek üretim aktif." : "bağlı değil — simülasyon modu.")), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Son hareketler"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, A().activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      fontSize: "var(--fs-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--accent)",
      marginTop: 6,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, a.who), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, a.what), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-subtle)"
    }
  }, a.when))))))));
}

/* ----------------------------- APPEARANCE ---------------------------- */
function MiniHeader({
  id
}) {
  const logo = /*#__PURE__*/React.createElement("span", {
    className: "m-logo"
  });
  const nav = /*#__PURE__*/React.createElement("span", {
    className: "m-nav"
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("i", {
    key: i
  })));
  const cta = /*#__PURE__*/React.createElement("span", {
    className: "m-cta"
  });
  if (id === "centered") return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-row"
  }, cta, logo, cta), /*#__PURE__*/React.createElement("div", {
    className: "m-row"
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      width: 14,
      height: 4,
      borderRadius: 2,
      background: "var(--ink-300)"
    }
  }))));
  if (id === "minimal") return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini"
  }, logo, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), cta);
  if (id === "split") return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini"
  }, logo, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), nav, cta);
  return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini"
  }, logo, nav, cta);
}
function Appearance() {
  const [cfg, setCfg] = useMState(window.MarkaTheme.get());
  const T = window.MarkaTheme;
  const previewRef = useMRef(null);
  const update = patch => {
    T.set(patch);
    setCfg(T.get());
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--2",
    style: {
      alignItems: "start",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Header \u015Fablonu",
    desc: "T\xFCm sayfalarda an\u0131nda ge\xE7erli olur"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-grid"
  }, T.HEADER_TEMPLATES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tpl-card ${cfg.headerTemplate === t.id ? "on" : ""}`,
    onClick: () => update({
      headerTemplate: t.id
    })
  }, /*#__PURE__*/React.createElement(MiniHeader, {
    id: t.id
  }), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__name"
  }, t.label, " ", cfg.headerTemplate === t.id && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF")), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__desc"
  }, t.desc))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Footer \u015Fablonu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-grid"
  }, T.FOOTER_TEMPLATES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tpl-card ${cfg.footerTemplate === t.id ? "on" : ""}`,
    onClick: () => update({
      footerTemplate: t.id
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini",
    style: {
      alignItems: "flex-end"
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: t.id === "compact" ? 8 : 22,
      background: "var(--ink-200)",
      borderRadius: 3
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__name"
  }, t.label), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__desc"
  }, t.desc))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Hero d\xFCzeni",
    desc: "Anasayfa kahraman alan\u0131n\u0131n g\xF6r\xFCn\xFCm\xFC (m\xFC\u015Fteriye switcher g\xF6r\xFCnmez)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-grid",
    style: {
      gridTemplateColumns: "repeat(3,1fr)"
    }
  }, T.HERO_VARIANTS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tpl-card ${cfg.heroVariant === t.id ? "on" : ""}`,
    onClick: () => update({
      heroVariant: t.id
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini",
    style: t.id === "center" ? {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    } : t.id === "split" ? {} : {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 4
    }
  }, t.id === "split" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 30,
      background: "var(--ink-200)",
      borderRadius: 4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 30,
      background: "var(--accent)",
      opacity: .5,
      borderRadius: 4
    }
  })) : t.id === "center" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    style: {
      width: "70%",
      height: 7,
      borderRadius: 2,
      background: "var(--text)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      width: "45%",
      height: 5,
      borderRadius: 2,
      background: "var(--ink-300)"
    }
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    style: {
      width: "85%",
      height: 9,
      borderRadius: 2,
      background: "var(--text)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      width: "55%",
      height: 5,
      borderRadius: 2,
      background: "var(--ink-300)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__name"
  }, t.label, " ", cfg.heroVariant === t.id && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF")), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__desc"
  }, t.desc))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Renk paleti & font"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Vurgu rengi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swatches"
  }, T.ACCENTS.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    className: `swatch ${cfg.accent === a.value ? "on" : ""}`,
    style: {
      background: a.value
    },
    title: a.label,
    onClick: () => update({
      accent: a.value
    })
  })), /*#__PURE__*/React.createElement("label", {
    className: "swatch",
    style: {
      background: "conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)",
      display: "grid",
      placeItems: "center"
    },
    title: "\xD6zel renk"
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: cfg.accent,
    onChange: e => update({
      accent: e.target.value
    }),
    style: {
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      mixBlendMode: "difference",
      fontSize: 12
    }
  }, "\uFF0B")))), /*#__PURE__*/React.createElement(Field, {
    label: "Font ailesi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-list"
  }, T.FONTS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: `font-opt ${cfg.font === f.id ? "on" : ""}`,
    onClick: () => update({
      font: f.id
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm",
    style: {
      fontFamily: f.family
    }
  }, f.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: f.family,
      color: "var(--text-muted)"
    }
  }, "Aa Bb 123"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      marginTop: 4,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Tema modu"
  }, /*#__PURE__*/React.createElement(Seg, {
    value: cfg.mode,
    onChange: v => update({
      mode: v
    }),
    options: [{
      value: "light",
      label: "Açık"
    }, {
      value: "dark",
      label: "Koyu"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: `Köşe yuvarlaklığı — ${cfg.radius}px`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "20",
    step: "1",
    value: cfg.radius,
    onChange: e => update({
      radius: +e.target.value
    }),
    style: {
      accentColor: "var(--accent)",
      width: 180
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      marginTop: 10
    },
    onClick: () => {
      T.reset();
      setCfg(T.get());
    }
  }, "Varsay\u0131lana s\u0131f\u0131rla"))), /*#__PURE__*/React.createElement(AdmCard, {
    className: "appr-preview",
    title: "Canl\u0131 \xF6nizleme",
    desc: "De\u011Fi\u015Fiklikler ger\xE7ek siteye an\u0131nda yans\u0131r",
    action: /*#__PURE__*/React.createElement("a", {
      className: "adm-btn adm-btn--ghost",
      href: "../website/index.html",
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 15
    }), " Sekmede a\xE7")
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-preview__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "marka.studio"), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    style: {
      marginLeft: "auto"
    },
    onClick: () => {
      if (previewRef.current) previewRef.current.src = previewRef.current.src;
    },
    "aria-label": "Yenile"
  }, "\u27F3")), /*#__PURE__*/React.createElement("iframe", {
    ref: previewRef,
    src: "../website/index.html",
    title: "\xD6nizleme"
  }))));
}

/* ------------------------------ CONTENT ------------------------------ */
function Content() {
  const [posts, setPosts] = useMState(A().posts);
  const [editing, setEditing] = useMState(null); // null=list, {}=new, post=edit
  const [wizard, setWizard] = useMState(false);
  const addPost = p => setPosts(prev => p.id ? prev.map(x => x.id === p.id ? {
    ...x,
    ...p
  } : x) : [{
    id: Date.now(),
    views: "—",
    ...p
  }, ...prev]);
  if (wizard) return /*#__PURE__*/React.createElement(BlogWizard, {
    onClose: () => setWizard(false),
    onSave: p => {
      addPost(p);
      setWizard(false);
    }
  });
  if (editing !== null) {
    return /*#__PURE__*/React.createElement(BlogEditor, {
      post: editing,
      onClose: () => setEditing(null),
      onSave: p => {
        addPost(p);
        setEditing(null);
      }
    });
  }
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Blog yaz\u0131lar\u0131",
    desc: `${posts.length} yazı`,
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: ".6rem"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      style: {
        borderRadius: "8px",
        height: "38px"
      },
      onClick: () => setWizard(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 15
    }), " AI ile \xDCret"), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      style: {
        borderRadius: "8px"
      },
      onClick: () => setEditing({})
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Yeni Yaz\u0131"))
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Ba\u015Fl\u0131k"), /*#__PURE__*/React.createElement("th", null, "Kategori"), /*#__PURE__*/React.createElement("th", null, "Durum"), /*#__PURE__*/React.createElement("th", null, "Tarih"), /*#__PURE__*/React.createElement("th", null, "G\xF6r\xFCnt\xFClenme"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, posts.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      width: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      width: 48,
      height: 32,
      borderRadius: 6
    }
  }, p.cover ? /*#__PURE__*/React.createElement("img", {
    src: p.cover,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 6
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ph__in"
  }))), /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, p.title, p.template && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-subtle)"
    }
  }, "\xB7 ", p.template)), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, p.cat), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: p.status === "Yayında" ? "green" : p.status === "Taslak" ? "muted" : "warn"
  }, p.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)"
    }
  }, p.date), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)"
    }
  }, p.views), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(p)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setPosts(prev => prev.filter(x => x.id !== p.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))))))));
}

/* ------------------------------ REPORTS ------------------------------ */
/* ------------------------------ REPORTS ------------------------------ */
function repInlineBold(s) {
  return s.split(/\*\*(.+?)\*\*/g).map((p, i) => i % 2 ? /*#__PURE__*/React.createElement("strong", {
    key: i
  }, p) : p);
}
function repRenderMD(text) {
  const lines = (text || "").split("\n");
  const out = [];
  let bul = [];
  const flush = () => {
    if (bul.length) {
      out.push(/*#__PURE__*/React.createElement("ul", {
        key: "u" + out.length,
        className: "rep-ul"
      }, bul.map((b, i) => /*#__PURE__*/React.createElement("li", {
        key: i
      }, repInlineBold(b)))));
      bul = [];
    }
  };
  lines.forEach((ln, idx) => {
    const t = ln.trim();
    if (!t || /^---+$/.test(t)) {
      flush();
      return;
    }
    if (/^#{1,3}\s+/.test(t)) {
      flush();
      out.push(/*#__PURE__*/React.createElement("h4", {
        key: idx,
        className: "rep-h"
      }, repInlineBold(t.replace(/^#{1,3}\s+/, ""))));
      return;
    }
    if (/^[-•*]\s+/.test(t)) {
      bul.push(t.replace(/^[-•*]\s+/, ""));
      return;
    }
    flush();
    out.push(/*#__PURE__*/React.createElement("p", {
      key: idx,
      className: "rep-p"
    }, repInlineBold(t)));
  });
  flush();
  return out;
}
function Reports() {
  const [report, setReport] = useMState(null);
  const [busy, setBusy] = useMState(false);
  const week = [42, 55, 48, 63, 71, 58, 80];
  const channels = [["Organik arama", 46], ["Sosyal medya", 24], ["Doğrudan", 18], ["Referans", 12]];
  const days = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
  const maxW = Math.max(...week);
  const run = async () => {
    setBusy(true);
    const data = A().stats.map(s => `${s.label}: ${s.val} (${s.delta})`).join(", ");
    const text = await A().ai(`Bir kreatif ajansın yönetim paneli için, şu metriklere dayanarak Türkçe, SADE ve eyleme dönük kısa bir haftalık performans yorumu yaz: ${data}. "## Yönetici özeti" ve "## Öneriler" başlıklarını kullan, maddeler ekle. Markdown başlık ve madde işareti kullan, emoji kullanma.`, () => A().SIM.report());
    setBusy(false);
    setReport({
      date: new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      narrative: text
    });
  };
  if (!report && !busy) {
    return /*#__PURE__*/React.createElement(AdmCard, {
      title: "AI \u0130\xE7g\xF6r\xFC & Raporlar",
      desc: A().aiAvailable ? "Gerçek zamanlı AI analizi" : "Simülasyon modu"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ai-panel"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ai-chip"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 12,
      fill: true
    }), " Marka AI Analist"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "var(--fs-sm)",
        color: "var(--text-muted)",
        margin: "10px 0 14px"
      }
    }, "G\xFCncel metriklerden grafiklerle zenginle\u015Ftirilmi\u015F, sade dilli bir haftal\u0131k rapor \xFCret."), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: run,
      style: {
        borderRadius: "8px",
        height: "38px"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 15
    }), " Haftal\u0131k rapor olu\u015Ftur")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "rep"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rep-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rep-kicker"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13,
    fill: true
  }), " Marka AI \xB7 Haftal\u0131k Rapor"), /*#__PURE__*/React.createElement("h2", {
    className: "rep-title"
  }, "Performans \xF6zeti"), /*#__PURE__*/React.createElement("div", {
    className: "rep-date"
  }, report ? report.date : "…")), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    disabled: busy,
    onClick: run
  }, busy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " Yenileniyor\u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 15
  }), " Yeniden olu\u015Ftur"))), /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--4"
  }, A().stats.map((s, i) => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: i
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--2",
    style: {
      gridTemplateColumns: "1.3fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Haftal\u0131k trafik",
    desc: "Son 7 g\xFCn \xB7 oturum"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rep-chart"
  }, week.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rep-bar-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rep-bar-val"
  }, h), /*#__PURE__*/React.createElement("div", {
    className: "rep-bar",
    style: {
      height: `${h / maxW * 130}px`,
      opacity: .45 + i * 0.08
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rep-bar-day"
  }, days[i]))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Trafik kaynaklar\u0131",
    desc: "Kanala g\xF6re da\u011F\u0131l\u0131m"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      marginTop: 4
    }
  }, channels.map(([name, pct]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    className: "chan-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chan-top"
  }, /*#__PURE__*/React.createElement("span", null, name), /*#__PURE__*/React.createElement("b", null, pct, "%")), /*#__PURE__*/React.createElement("div", {
    className: "chan-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chan-fill",
    style: {
      width: pct + "%"
    }
  }))))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "",
    desc: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "rep-doc"
  }, busy && !report ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " AI analiz ediyor\u2026") : repRenderMD(report && report.narrative))));
}
Object.assign(window, {
  Dashboard,
  Appearance,
  Content,
  Reports
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "modules-main.jsx", error: String((e && e.message) || e) }); }

// theme/bookings.js
try { (() => {
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
  const seed = [{
    id: "bk1",
    name: "Selin Demir",
    email: "selin@atlasbank.co",
    date: isoPlus(2),
    slot: "14:00",
    topic: "Marka & ürün",
    status: "Onaylı",
    created: Date.now() - 864e5
  }, {
    id: "bk2",
    name: "Burak Yıldız",
    email: "burak@novalabs.io",
    date: isoPlus(4),
    slot: "11:00",
    topic: "Web tasarım",
    status: "Bekliyor",
    created: Date.now() - 36e5
  }];
  function isoPlus(d) {
    const x = new Date();
    x.setDate(x.getDate() + d);
    return x.toISOString().slice(0, 10);
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      return Array.isArray(s) ? s : seed.slice();
    } catch (e) {
      return seed.slice();
    }
  }
  let list = load();
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
    emit();
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn(list);
      } catch (e) {}
    });
  }
  window.MarkaBookings = {
    SLOTS,
    STATUSES: ["Bekliyor", "Onaylı", "İptal"],
    list() {
      return list.slice().sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));
    },
    takenSlots(date) {
      return list.filter(b => b.date === date && b.status !== "İptal").map(b => b.slot);
    },
    book(data) {
      const b = Object.assign({
        id: "bk" + Date.now(),
        status: "Bekliyor",
        created: Date.now()
      }, data);
      list = list.concat([b]);
      persist();
      return b;
    },
    update(id, patch) {
      list = list.map(b => b.id === id ? Object.assign({}, b, patch) : b);
      persist();
    },
    remove(id) {
      list = list.filter(b => b.id !== id);
      persist();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.addEventListener("storage", e => {
    if (e.key === KEY) {
      list = load();
      emit();
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/bookings.js", error: String((e && e.message) || e) }); }

// theme/community-cfg.js
try { (() => {
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
    games: {
      memory: true,
      sequence: true,
      reaction: true
    },
    dailyLimit: 1,
    collections: [{
      id: "k1",
      title: "Editöryel Web",
      count: 18,
      hue: 0,
      base: 1240
    }, {
      id: "k2",
      title: "Cesur Tipografi",
      count: 24,
      hue: 40,
      base: 980
    }, {
      id: "k3",
      title: "Minimal E-ticaret",
      count: 15,
      hue: -50,
      base: 1530
    }, {
      id: "k4",
      title: "Hareket & Etkileşim",
      count: 12,
      hue: 200,
      base: 760
    }]
  };
  let cur = load();
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      const m = Object.assign({}, defaults, s);
      m.games = Object.assign({}, defaults.games, s.games);
      if (!Array.isArray(m.collections)) m.collections = defaults.collections.slice();
      return m;
    } catch (e) {
      return JSON.parse(JSON.stringify(defaults));
    }
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(cur));
    } catch (e) {}
    emit();
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn(cur);
      } catch (e) {}
    });
  }
  window.MarkaCommunity = {
    defaults,
    get() {
      return JSON.parse(JSON.stringify(cur));
    },
    set(patch) {
      cur = Object.assign({}, cur, patch);
      persist();
    },
    gameOn(id) {
      return cur.games[id] !== false;
    },
    dailyLimit() {
      return Math.max(1, cur.dailyLimit || 1);
    },
    collections() {
      return cur.collections.slice();
    },
    reset() {
      cur = JSON.parse(JSON.stringify(defaults));
      persist();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.addEventListener("storage", e => {
    if (e.key === KEY) {
      cur = load();
      emit();
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/community-cfg.js", error: String((e && e.message) || e) }); }

// theme/courses.js
try { (() => {
/* ========================================================================
   MARKA COURSES — shared course catalog the site reads and the academy
   player uses. Seeded with full curricula; persisted in localStorage('mk-courses').
   Load as a CLASSIC script after theme.js on academy + course pages (and admin).
   ======================================================================== */
(function () {
  const KEY = "mk-courses";
  const subs = new Set();
  const SEED = [{
    id: "c1",
    title: "Sıfırdan Tasarım Sistemi",
    instructor: "Deniz Arı",
    category: "Tasarım",
    level: "Orta",
    price: "₺1.299",
    salePrice: "₺899",
    currency: "₺",
    rating: 4.9,
    students: 214,
    hue: 0,
    tagline: "Ölçeklenebilir bir tasarım sistemini adım adım kur.",
    desc: "Token'lardan bileşenlere, dokümantasyondan devir teslime kadar gerçek bir tasarım sistemi kurmayı öğreten uygulamalı kurs.",
    outcomes: ["Sıfırdan bir tasarım sistemi kurmak", "Token ve değişken mimarisi tasarlamak", "Takımca ölçeklenebilir bileşenler üretmek"],
    modules: [{
      id: "m1",
      title: "Temeller",
      lessons: [{
        id: "l1",
        title: "Tasarım sistemi nedir?",
        dur: "08:30",
        type: "video",
        free: true,
        body: "Bu derste tasarım sistemlerinin neden gerekli olduğunu ve bir ürün ekibine nasıl değer kattığını konuşuyoruz."
      }, {
        id: "l2",
        title: "Token mimarisi",
        dur: "12:10",
        type: "video",
        body: "Renk, tipografi ve boşluk token'larının katmanlı mimarisi."
      }]
    }, {
      id: "m2",
      title: "Bileşenler",
      lessons: [{
        id: "l3",
        title: "Buton anatomisi",
        dur: "10:45",
        type: "video",
        body: "Varyant, durum ve boyut eksenleriyle sağlam bir buton."
      }, {
        id: "l4",
        title: "Kaynak dosyalar (Figma)",
        dur: "—",
        type: "link",
        url: "https://figma.com",
        linkLabel: "Figma'da aç",
        body: "Derste kullanılan kaynak dosyalara eriş."
      }, {
        id: "l5",
        title: "Varyant yönetimi",
        dur: "09:55",
        type: "doc",
        body: "Bileşen varyantlarını ölçeklenebilir tutmanın yolları."
      }]
    }, {
      id: "m3",
      title: "Devir teslim",
      lessons: [{
        id: "l6",
        title: "Dokümantasyon",
        dur: "11:00",
        type: "text",
        body: "İyi bir dokümantasyon; her bileşen için ne zaman/nasıl/neden sorularını yanıtlar. Kullanım örnekleri, do/don't kuralları ve erişilebilirlik notları ekle."
      }]
    }]
  }, {
    id: "c2",
    title: "Webflow ile Üretim",
    instructor: "Ece Kaya",
    category: "Geliştirme",
    level: "Başlangıç",
    price: "₺899",
    currency: "₺",
    rating: 4.8,
    students: 178,
    hue: 40,
    tagline: "Kod yazmadan üretim kalitesinde siteler.",
    desc: "Webflow ile tasarımdan yayına eksiksiz bir akış.",
    outcomes: ["Webflow'da responsive site kurmak", "CMS koleksiyonları yönetmek"],
    modules: [{
      id: "wm1",
      title: "Başlangıç",
      lessons: [{
        id: "wl1",
        title: "Arayüz turu",
        dur: "07:20",
        type: "video",
        free: true,
        body: "Webflow arayüzüne hızlı bir bakış."
      }]
    }]
  }, {
    id: "c3",
    title: "Motion & Etkileşim",
    instructor: "Mert Su",
    category: "Motion",
    level: "İleri",
    price: "₺1.499",
    currency: "₺",
    rating: 5.0,
    students: 96,
    hue: 200,
    tagline: "Premium hareket tasarımı prensipleri.",
    desc: "Mikro etkileşimlerden sayfa geçişlerine motion sistemi.",
    outcomes: ["Easing ve zamanlama", "Performanslı animasyon"],
    modules: [{
      id: "mm1",
      title: "Prensipler",
      lessons: [{
        id: "ml1",
        title: "Easing temelleri",
        dur: "09:00",
        type: "video",
        free: true,
        body: "Doğal hareketin arkasındaki easing eğrileri."
      }]
    }]
  }, {
    id: "c4",
    title: "Marka Stratejisi",
    instructor: "Lale Yön",
    category: "Strateji",
    level: "Tüm seviyeler",
    price: "₺1.099",
    currency: "₺",
    rating: 4.7,
    students: 132,
    hue: -40,
    tagline: "Konumlandırmadan kimliğe.",
    desc: "Markayı bir sistem olarak kurgulamak.",
    outcomes: ["Konumlandırma", "Marka sesi"],
    modules: [{
      id: "bm1",
      title: "Strateji",
      lessons: [{
        id: "bl1",
        title: "Konumlandırma",
        dur: "11:30",
        type: "video",
        free: true,
        body: "Rakipler arasında net bir yer edinmek."
      }]
    }]
  }];
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      return Array.isArray(s) && s.length ? s : SEED.slice();
    } catch (e) {
      return SEED.slice();
    }
  }
  let list = load();
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
    emit();
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn(list);
      } catch (e) {}
    });
  }
  window.MarkaCourses = {
    list() {
      return list.slice();
    },
    get(id) {
      return list.find(c => c.id === id) || null;
    },
    lessonCount(c) {
      return (c.modules || []).reduce((n, m) => n + (m.lessons || []).length, 0);
    },
    allLessons(c) {
      return (c.modules || []).flatMap(m => m.lessons || []);
    },
    set(next) {
      list = next;
      persist();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.addEventListener("storage", e => {
    if (e.key === KEY) {
      list = load();
      emit();
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/courses.js", error: String((e && e.message) || e) }); }

// theme/i18n.js
try { (() => {
/* ========================================================================
   MARKA i18n — site-wide language runtime. Add a language by extending DICT.
   Persisted in localStorage('mk-lang'); broadcasts across tabs. Localizes the
   shared chrome (header/footer) and any element carrying data-i18n="key".
   Load as a CLASSIC script in <head> on every page, BEFORE site-chrome.js.
   ======================================================================== */
(function () {
  const KEY = "mk-lang";
  const LANGS = [{
    id: "tr",
    label: "Türkçe",
    short: "TR",
    flag: "🇹🇷"
  }, {
    id: "en",
    label: "English",
    short: "EN",
    flag: "🇬🇧"
  }, {
    id: "de",
    label: "Deutsch",
    short: "DE",
    flag: "🇩🇪"
  }, {
    id: "ar",
    label: "العربية",
    short: "AR",
    flag: "🇸🇦",
    rtl: true
  }];
  const DICT = {
    tr: {
      "nav.discover": "Keşfet",
      "nav.partners": "İş Ortakları",
      "nav.academy": "Akademi",
      "nav.blog": "Blog",
      "nav.market": "Market",
      "nav.login": "Giriş Yap",
      "nav.aboutMe": "Ben Kimim",
      "cta.quote": "Görüşme Yap",
      "cta.contact": "İletişime Geç",
      "mega.works": "İşler",
      "mega.services": "Hizmetler",
      "mega.inspiration": "İlham",
      "mega.allProjects": "Tüm Projeler",
      "mega.featured": "Öne Çıkanlar",
      "mega.byCategory": "Kategoriye Göre",
      "mega.webDesign": "Web Tasarım",
      "mega.development": "Geliştirme",
      "mega.branding": "Markalaşma",
      "mega.uiux": "UI / UX",
      "mega.collections": "Koleksiyonlar",
      "mega.featuredLabel": "ÖNE ÇIKAN",
      "mega.featuredTitle": "Atlas Finans",
      "mega.featuredText": "Ayın işi — finansta yeni bir görsel dil.",
      "footer.cta": "{brand} ile projeni hayata geçir",
      "footer.work": "İşler",
      "footer.inspiration": "İlham",
      "footer.academy": "Akademi",
      "footer.corporate": "Kurumsal",
      "footer.portfolio": "Portfolyo",
      "footer.categories": "Kategoriler",
      "footer.allCourses": "Tüm Kurslar",
      "footer.instructors": "Eğitmenler",
      "footer.about": "Hakkımızda",
      "footer.contact": "İletişim",
      "footer.faq": "SSS",
      "footer.rights": "Tüm hakları saklıdır.",
      "footer.privacy": "Gizlilik",
      "footer.terms": "Şartlar"
    },
    en: {
      "nav.discover": "Explore",
      "nav.partners": "Partners",
      "nav.academy": "Academy",
      "nav.blog": "Blog",
      "nav.market": "Market",
      "nav.login": "Sign in",
      "nav.aboutMe": "About Me",
      "cta.quote": "Book a call",
      "cta.contact": "Get in touch",
      "mega.works": "Work",
      "mega.services": "Services",
      "mega.inspiration": "Inspiration",
      "mega.allProjects": "All projects",
      "mega.featured": "Featured",
      "mega.byCategory": "By category",
      "mega.webDesign": "Web Design",
      "mega.development": "Development",
      "mega.branding": "Branding",
      "mega.uiux": "UI / UX",
      "mega.collections": "Collections",
      "mega.featuredLabel": "FEATURED",
      "mega.featuredTitle": "Atlas Finance",
      "mega.featuredText": "Work of the month — a new visual language in finance.",
      "footer.cta": "Bring your project to life with {brand}",
      "footer.work": "Work",
      "footer.inspiration": "Inspiration",
      "footer.academy": "Academy",
      "footer.corporate": "Company",
      "footer.portfolio": "Portfolio",
      "footer.categories": "Categories",
      "footer.allCourses": "All courses",
      "footer.instructors": "Instructors",
      "footer.about": "About",
      "footer.contact": "Contact",
      "footer.faq": "FAQ",
      "footer.rights": "All rights reserved.",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms"
    },
    de: {
      "nav.discover": "Entdecken",
      "nav.partners": "Partner",
      "nav.academy": "Akademie",
      "nav.blog": "Blog",
      "nav.market": "Markt",
      "nav.login": "Anmelden",
      "nav.aboutMe": "Über mich",
      "cta.quote": "Termin buchen",
      "cta.contact": "Kontakt",
      "mega.works": "Arbeiten",
      "mega.services": "Leistungen",
      "mega.inspiration": "Inspiration",
      "mega.allProjects": "Alle Projekte",
      "mega.featured": "Empfohlen",
      "mega.byCategory": "Nach Kategorie",
      "mega.webDesign": "Webdesign",
      "mega.development": "Entwicklung",
      "mega.branding": "Branding",
      "mega.uiux": "UI / UX",
      "mega.collections": "Kollektionen",
      "mega.featuredLabel": "EMPFOHLEN",
      "mega.featuredTitle": "Atlas Finance",
      "mega.featuredText": "Arbeit des Monats — eine neue Bildsprache.",
      "footer.cta": "Verwirkliche dein Projekt mit {brand}",
      "footer.work": "Arbeiten",
      "footer.inspiration": "Inspiration",
      "footer.academy": "Akademie",
      "footer.corporate": "Unternehmen",
      "footer.portfolio": "Portfolio",
      "footer.categories": "Kategorien",
      "footer.allCourses": "Alle Kurse",
      "footer.instructors": "Dozenten",
      "footer.about": "Über uns",
      "footer.contact": "Kontakt",
      "footer.faq": "FAQ",
      "footer.rights": "Alle Rechte vorbehalten.",
      "footer.privacy": "Datenschutz",
      "footer.terms": "AGB"
    },
    ar: {
      "nav.discover": "اكتشف",
      "nav.partners": "الشركاء",
      "nav.academy": "الأكاديمية",
      "nav.blog": "المدونة",
      "nav.market": "المتجر",
      "nav.login": "تسجيل الدخول",
      "nav.aboutMe": "من أنا",
      "cta.quote": "احجز مكالمة",
      "cta.contact": "تواصل معنا",
      "mega.works": "الأعمال",
      "mega.services": "الخدمات",
      "mega.inspiration": "إلهام",
      "mega.allProjects": "كل المشاريع",
      "mega.featured": "المميزة",
      "mega.byCategory": "حسب الفئة",
      "mega.webDesign": "تصميم الويب",
      "mega.development": "التطوير",
      "mega.branding": "الهوية",
      "mega.uiux": "واجهة المستخدم",
      "mega.collections": "المجموعات",
      "mega.featuredLabel": "مميز",
      "mega.featuredTitle": "أطلس المالية",
      "mega.featuredText": "عمل الشهر — لغة بصرية جديدة.",
      "footer.cta": "أطلق مشروعك مع {brand}",
      "footer.work": "الأعمال",
      "footer.inspiration": "إلهام",
      "footer.academy": "الأكاديمية",
      "footer.corporate": "الشركة",
      "footer.portfolio": "الأعمال",
      "footer.categories": "الفئات",
      "footer.allCourses": "كل الدورات",
      "footer.instructors": "المدربون",
      "footer.about": "من نحن",
      "footer.contact": "تواصل",
      "footer.faq": "الأسئلة",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.privacy": "الخصوصية",
      "footer.terms": "الشروط"
    }
  };
  const subs = new Set();
  let lang = load();
  function load() {
    try {
      const l = localStorage.getItem(KEY);
      return l && DICT[l] ? l : "tr";
    } catch (e) {
      return "tr";
    }
  }
  function brand() {
    return window.MARKA && window.MARKA.BRAND_NAME || "Marka";
  }
  function t(key, vars) {
    let s = DICT[lang] && DICT[lang][key] || DICT.tr && DICT.tr[key] || key;
    s = s.replace(/\{brand\}/g, brand());
    if (vars) for (const k in vars) s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
    return s;
  }
  function applyDom() {
    const l = LANGS.find(x => x.id === lang) || LANGS[0];
    document.documentElement.lang = lang;
    document.documentElement.dir = l.rtl ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
  }
  const MarkaI18n = {
    LANGS,
    DICT,
    get() {
      return lang;
    },
    current() {
      return LANGS.find(x => x.id === lang) || LANGS[0];
    },
    t,
    set(l) {
      if (!DICT[l]) return;
      lang = l;
      try {
        localStorage.setItem(KEY, l);
      } catch (e) {}
      applyDom();
      subs.forEach(fn => {
        try {
          fn(lang);
        } catch (e) {}
      });
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    },
    applyDom
  };
  window.addEventListener("storage", e => {
    if (e.key !== KEY) return;
    lang = load();
    applyDom();
    subs.forEach(fn => {
      try {
        fn(lang);
      } catch (e) {}
    });
  });
  window.MarkaI18n = MarkaI18n;
  if (document.documentElement) {
    document.documentElement.lang = lang;
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/i18n.js", error: String((e && e.message) || e) }); }

// theme/inline-edit.js
try { (() => {
/* ========================================================================
   MARKA INLINE EDIT — live text overrides + click-to-edit preview.
   • Always: applies saved text overrides (window.MarkaPages) to a page's
     prominent text nodes, keyed by a stable per-page index.
   • Edit mode (?edit=1 in the URL, or postMessage "mk-edit-on" from a parent
     admin frame): makes those nodes contenteditable, highlights them, saves
     edits back to MarkaPages, and two-way-syncs a field list with the parent.
   Load as a CLASSIC script AFTER theme/pages.js on every site page.
   ======================================================================== */
(function () {
  const SEL = ["main .eyebrow", "main h1", "main h2", "main h3", "main .lead", "main .cs__text", "main .prose p", "main .page__head p"].join(", ");
  function pageId() {
    const b = document.body.getAttribute("data-page");
    if (b) return b;
    const f = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
    return f === "index" || f === "" ? "home" : f;
  }
  const EXCLUDE = "#mk-header, #mk-footer, .overlay, .mk-popup, [data-no-edit]";
  function editables() {
    return [...document.querySelectorAll(SEL)].filter(el => !el.closest(EXCLUDE) && el.offsetParent !== null || !el.closest(EXCLUDE));
  }
  function shortLabel(el) {
    const t = el.tagName.toLowerCase();
    const role = el.classList.contains("eyebrow") ? "Etiket" : el.classList.contains("lead") ? "Spot" : /h1/.test(t) ? "Başlık" : /h2/.test(t) ? "Alt başlık" : /h3/.test(t) ? "Başlık" : "Metin";
    return role;
  }
  let editMode = false;
  let applying = false;
  function applyOverrides() {
    if (!window.MarkaPages) return;
    applying = true;
    const pid = pageId();
    editables().forEach((el, i) => {
      const key = "t" + i;
      const v = window.MarkaPages.getText(pid, key, null);
      if (v != null && el.getAttribute("data-mk-editing") !== "1" && el.textContent !== v) el.textContent = v;
    });
    applying = false;
  }
  function postFields() {
    if (window.parent === window) return;
    const pid = pageId();
    const fields = editables().map((el, i) => ({
      key: "t" + i,
      label: shortLabel(el),
      text: el.textContent.trim()
    }));
    window.parent.postMessage({
      type: "mk-fields",
      pageId: pid,
      fields
    }, "*");
  }
  function enableEdit() {
    if (editMode) {
      postFields();
      return;
    }
    editMode = true;
    const pid = pageId();
    document.body.classList.add("mk-editing");
    editables().forEach((el, i) => {
      const key = "t" + i;
      el.setAttribute("data-mk-key", key);
      el.setAttribute("contenteditable", "true");
      el.classList.add("mk-editable");
      el.addEventListener("focus", () => el.setAttribute("data-mk-editing", "1"));
      el.addEventListener("input", () => {
        window.MarkaPages.setText(pid, key, el.textContent);
        if (window.parent !== window) window.parent.postMessage({
          type: "mk-field-change",
          key,
          text: el.textContent
        }, "*");
      });
      el.addEventListener("blur", () => {
        el.removeAttribute("data-mk-editing");
        window.MarkaPages.setText(pid, key, el.textContent);
      });
      el.addEventListener("keydown", e => {
        if (e.key === "Enter" && el.tagName !== "P" && !el.classList.contains("lead")) {
          e.preventDefault();
          el.blur();
        }
      });
    });
    postFields();
  }
  window.addEventListener("message", e => {
    const d = e.data || {};
    if (d === "mk-edit-on" || d.type === "mk-edit-on") {
      enableEdit();
    } else if (d.type === "mk-request-fields") {
      postFields();
    } else if (d.type === "mk-set") {
      const el = document.querySelector('[data-mk-key="' + d.key + '"]');
      if (el) el.textContent = d.value;
      if (window.MarkaPages) window.MarkaPages.setText(pageId(), d.key, d.value);
    }
  });
  function boot() {
    applyOverrides();
    if (/[?&]edit=1/.test(location.search)) enableEdit();
    // re-apply after late content (JS-injected grids, React mount)
    setTimeout(() => {
      applyOverrides();
      if (editMode) {
        reattach();
        postFields();
      }
    }, 300);
    setTimeout(() => {
      applyOverrides();
      if (editMode) {
        reattach();
        postFields();
      }
    }, 900);
  }
  function reattach() {
    // ensure newly-rendered editables get wired in edit mode
    if (!editMode) return;
    const pid = pageId();
    editables().forEach((el, i) => {
      if (el.hasAttribute("data-mk-key")) return;
      const key = "t" + i;
      el.setAttribute("data-mk-key", key);
      el.setAttribute("contenteditable", "true");
      el.classList.add("mk-editable");
      el.addEventListener("focus", () => el.setAttribute("data-mk-editing", "1"));
      el.addEventListener("input", () => {
        window.MarkaPages.setText(pid, key, el.textContent);
      });
      el.addEventListener("blur", () => {
        el.removeAttribute("data-mk-editing");
        window.MarkaPages.setText(pid, key, el.textContent);
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);else boot();
  if (window.MarkaPages) window.MarkaPages.subscribe(() => {
    if (!applying) setTimeout(applyOverrides, 0);
  });
  window.MarkaInlineEdit = {
    apply: applyOverrides,
    enable: enableEdit,
    fields: postFields
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/inline-edit.js", error: String((e && e.message) || e) }); }

// theme/leads.js
try { (() => {
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
  const seed = [{
    id: "ld1",
    name: "Selin Demir",
    email: "selin@atlasbank.co",
    budget: "₺400.000+",
    message: "Mobil bankacılık uygulamamız için kapsamlı bir yeniden tasarım arıyoruz. Mevcut akışlar karmaşık.",
    source: "İletişim",
    status: "Teklif Gönderildi",
    date: Date.now() - 2 * 864e5,
    priority: "Yüksek",
    notes: ""
  }, {
    id: "ld2",
    name: "Burak Yıldız",
    email: "burak@novalabs.io",
    budget: "₺150.000 – 400.000",
    message: "Yeni SaaS ürünümüz için marka kimliği ve landing page.",
    source: "Görüşme Yap",
    status: "İletişimde",
    date: Date.now() - 5 * 864e5,
    priority: "Orta",
    notes: "İlk görüşme yapıldı."
  }, {
    id: "ld3",
    name: "Ece Kaya",
    email: "ece@perasanat.org",
    budget: "₺50.000 – 150.000",
    message: "Galeri web sitesi yenileme.",
    source: "İletişim",
    status: "Yeni",
    date: Date.now() - 6 * 36e5,
    priority: "Orta",
    notes: ""
  }];
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      return Array.isArray(s) ? s : seed.slice();
    } catch (e) {
      return seed.slice();
    }
  }
  let list = load();
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
    emit();
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn(list);
      } catch (e) {}
    });
  }
  function autoPriority(d) {
    const b = d.budget || "";
    if (/400\.000\+|150\.000 – 400/.test(b)) return "Yüksek";
    if (/50\.000 – 150/.test(b)) return "Orta";
    return "Düşük";
  }
  window.MarkaLeads = {
    STAGES,
    list() {
      return list.slice().sort((a, b) => b.date - a.date);
    },
    byStage(s) {
      return this.list().filter(l => l.status === s);
    },
    counts() {
      const c = {};
      STAGES.forEach(s => c[s] = 0);
      list.forEach(l => {
        c[l.status] = (c[l.status] || 0) + 1;
      });
      return c;
    },
    submit(data) {
      const lead = Object.assign({
        id: "ld" + Date.now(),
        status: "Yeni",
        date: Date.now(),
        notes: "",
        source: "İletişim"
      }, data);
      lead.priority = data.priority || autoPriority(data);
      list = [lead].concat(list);
      persist();
      return lead;
    },
    update(id, patch) {
      list = list.map(l => l.id === id ? Object.assign({}, l, patch) : l);
      persist();
    },
    remove(id) {
      list = list.filter(l => l.id !== id);
      persist();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.addEventListener("storage", e => {
    if (e.key === KEY) {
      list = load();
      emit();
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/leads.js", error: String((e && e.message) || e) }); }

// theme/members.js
try { (() => {
/* ========================================================================
   MARKA MEMBERS — lightweight membership/identity (prototype, localStorage).
   Backbone for: account, course/product purchases, and game leaderboards.
   Persisted in localStorage('mk-members'); session in 'mk-session'.
   Load as a CLASSIC script in <head> after theme.js on every site page.
   NOTE: prototype only — passwords are NOT hashed; do not use in production.
   ======================================================================== */
(function () {
  const KEY = "mk-members",
    SKEY = "mk-session";
  const subs = new Set();
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch (e) {
      return [];
    }
  }
  function save(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
    emit();
  }
  function session() {
    try {
      return localStorage.getItem(SKEY) || null;
    } catch (e) {
      return null;
    }
  }
  function setSession(id) {
    try {
      id ? localStorage.setItem(SKEY, id) : localStorage.removeItem(SKEY);
    } catch (e) {}
    emit();
  }
  function emit() {
    const u = api.current();
    subs.forEach(fn => {
      try {
        fn(u);
      } catch (e) {}
    });
  }

  // demo seed so leaderboards aren't empty on first run
  function seed() {
    let list = load();
    if (list.length) return;
    const names = ["Ece K.", "Mert S.", "Lale Y.", "Can A.", "Su D.", "Ada Y.", "Kaan E.", "Nil B."];
    list = names.map((n, i) => ({
      id: "demo" + i,
      name: n,
      email: n.toLowerCase().replace(/[^a-z]/g, "") + "@demo.co",
      pass: "",
      avatar: null,
      bio: "",
      joined: Date.now() - i * 86400000,
      demo: true,
      purchasedCourses: [],
      purchasedProducts: [],
      scores: {
        memory: {
          best: 60 - i * 4,
          plays: []
        },
        reaction: {
          best: 220 + i * 18,
          plays: []
        },
        sequence: {
          best: 50 - i * 3,
          plays: []
        }
      }
    }));
    save(list);
  }
  const api = {
    LANGS: null,
    current() {
      const id = session();
      return id ? load().find(m => m.id === id) || null : null;
    },
    isAuthed() {
      return !!api.current();
    },
    members() {
      return load();
    },
    register({
      name,
      email,
      password
    }) {
      const list = load();
      email = (email || "").trim().toLowerCase();
      if (!name || !email) return {
        error: "Ad ve e-posta gerekli."
      };
      if (list.some(m => m.email === email && !m.demo)) return {
        error: "Bu e-posta zaten kayıtlı."
      };
      const m = {
        id: "u" + Date.now(),
        name: name.trim(),
        email,
        pass: password || "",
        avatar: null,
        bio: "",
        joined: Date.now(),
        purchasedCourses: [],
        purchasedProducts: [],
        scores: {}
      };
      list.push(m);
      save(list);
      setSession(m.id);
      return {
        user: m
      };
    },
    login(email, password) {
      const list = load();
      email = (email || "").trim().toLowerCase();
      const m = list.find(x => x.email === email && !x.demo);
      if (!m) return {
        error: "Hesap bulunamadı."
      };
      if ((m.pass || "") !== (password || "")) return {
        error: "Şifre hatalı."
      };
      setSession(m.id);
      return {
        user: m
      };
    },
    logout() {
      setSession(null);
    },
    updateCurrent(patch) {
      const id = session();
      if (!id) return;
      const list = load().map(m => m.id === id ? Object.assign({}, m, patch) : m);
      save(list);
    },
    /* ---- purchases ---- */
    buyCourse(courseId) {
      const u = api.current();
      if (!u) return false;
      const s = new Set(u.purchasedCourses || []);
      s.add(courseId);
      api.updateCurrent({
        purchasedCourses: [...s]
      });
      return true;
    },
    buyProduct(productId) {
      const u = api.current();
      if (!u) return false;
      const s = new Set(u.purchasedProducts || []);
      s.add(productId);
      api.updateCurrent({
        purchasedProducts: [...s]
      });
      return true;
    },
    owns(kind, id) {
      const u = api.current();
      if (!u) return false;
      return (kind === "course" ? u.purchasedCourses : u.purchasedProducts || []).includes(id);
    },
    /* ---- course progress ---- */
    completeLesson(courseId, lessonId) {
      const id = session();
      if (!id) return;
      const list = load();
      const m = list.find(x => x.id === id);
      if (!m) return;
      m.progress = m.progress || {};
      const done = new Set(m.progress[courseId] || []);
      done.add(lessonId);
      m.progress[courseId] = [...done];
      save(list);
    },
    uncompleteLesson(courseId, lessonId) {
      const id = session();
      if (!id) return;
      const list = load();
      const m = list.find(x => x.id === id);
      if (!m) return;
      m.progress = m.progress || {};
      m.progress[courseId] = (m.progress[courseId] || []).filter(x => x !== lessonId);
      save(list);
    },
    courseDone(courseId) {
      const u = api.current();
      return u && u.progress && u.progress[courseId] || [];
    },
    /* ---- games (Faz 2) ---- */
    // higher-is-better for memory/sequence; lower-is-better (ms) for reaction
    submitScore(gameId, score, lowerIsBetter) {
      const u = api.current();
      if (!u) return null;
      const list = load();
      const m = list.find(x => x.id === u.id);
      if (!m) return null;
      m.scores = m.scores || {};
      const g = m.scores[gameId] || {
        best: null,
        plays: []
      };
      g.plays = (g.plays || []).concat([{
        date: new Date().toISOString().slice(0, 10),
        score
      }]);
      if (g.best == null || (lowerIsBetter ? score < g.best : score > g.best)) g.best = score;
      m.scores[gameId] = g;
      save(list);
      return api.rank(gameId, lowerIsBetter);
    },
    playedToday(gameId) {
      const u = api.current();
      if (!u || !u.scores || !u.scores[gameId]) return false;
      const today = new Date().toISOString().slice(0, 10);
      return (u.scores[gameId].plays || []).some(p => p.date === today);
    },
    leaderboard(gameId, lowerIsBetter) {
      return load().filter(m => m.scores && m.scores[gameId] && m.scores[gameId].best != null).map(m => ({
        id: m.id,
        name: m.name,
        avatar: m.avatar,
        best: m.scores[gameId].best
      })).sort((a, b) => lowerIsBetter ? a.best - b.best : b.best - a.best);
    },
    rank(gameId, lowerIsBetter) {
      const u = api.current();
      if (!u) return null;
      const board = api.leaderboard(gameId, lowerIsBetter);
      const idx = board.findIndex(r => r.id === u.id);
      return idx < 0 ? null : {
        rank: idx + 1,
        total: board.length,
        best: board[idx].best
      };
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  seed();
  window.MarkaMembers = api;
  window.addEventListener("storage", e => {
    if (e.key === KEY || e.key === SKEY) emit();
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/members.js", error: String((e && e.message) || e) }); }

// theme/pages.js
try { (() => {
/* ========================================================================
   MARKA PAGES RUNTIME — per-page section layout & content overrides.
   The /admin "Sayfalar" module writes here; the live site reads + renders.
   Persisted in localStorage('mk-pages'); changes broadcast across tabs.
   Load as a CLASSIC script in <head> after theme.js, before app scripts.
   ======================================================================== */
(function () {
  const KEY = "mk-pages";

  // Homepage built-in sections (fixed components, but reorderable + hideable).
  const HOME_BUILTINS = [{
    id: "hero",
    kind: "builtin",
    comp: "Hero",
    label: "Hero — Öne çıkan iş",
    locked: true
  }, {
    id: "works",
    kind: "builtin",
    comp: "LatestWorks",
    label: "Son Projeler"
  }, {
    id: "weekly",
    kind: "builtin",
    comp: "WeeklyWork",
    label: "Haftanın İşi"
  }, {
    id: "partners",
    kind: "builtin",
    comp: "Partners",
    label: "İş Ortakları"
  }, {
    id: "services",
    kind: "builtin",
    comp: "Services",
    label: "Hizmetler"
  }, {
    id: "academy",
    kind: "builtin",
    comp: "Academy",
    label: "Akademi"
  }, {
    id: "collections",
    kind: "builtin",
    comp: "Collections",
    label: "Koleksiyonlar"
  }, {
    id: "games",
    kind: "builtin",
    comp: "Games",
    label: "Zihin Oyunları"
  }, {
    id: "blog",
    kind: "builtin",
    comp: "Blog",
    label: "Blog"
  }, {
    id: "market",
    kind: "builtin",
    comp: "Market",
    label: "Market"
  }, {
    id: "stats",
    kind: "builtin",
    comp: "Stats",
    label: "İstatistikler"
  }, {
    id: "cta",
    kind: "builtin",
    comp: "CTABlocks",
    label: "Alt CTA"
  }];

  // The site pages catalog (shown in the admin list).
  const PAGES = [{
    id: "home",
    label: "Anasayfa",
    path: "index.html",
    editable: "sections"
  }, {
    id: "portfolio",
    label: "İşler / Portfolyo",
    path: "portfolio.html",
    editable: "text"
  }, {
    id: "about",
    label: "Hakkımızda",
    path: "about.html",
    editable: "text"
  }, {
    id: "academy",
    label: "Akademi",
    path: "academy.html",
    editable: "text"
  }, {
    id: "blog",
    label: "Blog",
    path: "blog.html",
    editable: "text"
  }, {
    id: "market",
    label: "Market",
    path: "market.html",
    editable: "text"
  }, {
    id: "contact",
    label: "İletişim",
    path: "contact.html",
    editable: "text"
  }];
  const defaults = {
    home: {
      order: HOME_BUILTINS.map(s => s.id),
      hidden: {},
      custom: []
    },
    // text pages store simple { key: value } overrides keyed by field id
    text: {}
  };
  const subs = new Set();
  let current = load();
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      const merged = Object.assign({}, defaults, saved);
      merged.home = Object.assign({}, defaults.home, saved.home);
      reconcileOrder(merged.home);
      return merged;
    } catch (e) {
      return JSON.parse(JSON.stringify(defaults));
    }
  }
  // ensure any builtin added after the user's order was saved still appears,
  // inserted right after its default-neighbour (and drop ids that no longer exist)
  function reconcileOrder(home) {
    const defOrder = HOME_BUILTINS.map(s => s.id);
    const customIds = (home.custom || []).map(c => c.id);
    const valid = id => defOrder.includes(id) || customIds.includes(id);
    let order = (home.order || []).filter(valid);
    defOrder.forEach((id, i) => {
      if (order.includes(id)) return;
      let pos = order.length;
      for (let k = i - 1; k >= 0; k--) {
        const idx = order.indexOf(defOrder[k]);
        if (idx >= 0) {
          pos = idx + 1;
          break;
        }
      }
      order.splice(pos, 0, id);
    });
    home.order = order;
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(current));
    } catch (e) {}
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn(current);
      } catch (e) {}
    });
  }
  const MarkaPages = {
    PAGES,
    HOME_BUILTINS,
    get() {
      return JSON.parse(JSON.stringify(current));
    },
    getPage(id) {
      return PAGES.find(p => p.id === id);
    },
    /* Resolved, ordered list of visible home sections (builtins + customs). */
    homeLayout() {
      const h = current.home;
      const byId = {};
      HOME_BUILTINS.forEach(s => byId[s.id] = s);
      (h.custom || []).forEach(c => byId[c.id] = Object.assign({
        kind: "custom"
      }, c));
      return (h.order || []).map(id => byId[id]).filter(Boolean).filter(s => !h.hidden[s.id]);
    },
    /* Full ordered list incl. hidden (for the admin manager). */
    homeSections() {
      const h = current.home;
      const byId = {};
      HOME_BUILTINS.forEach(s => byId[s.id] = Object.assign({}, s));
      (h.custom || []).forEach(c => byId[c.id] = Object.assign({
        kind: "custom"
      }, c));
      return (h.order || []).map(id => byId[id]).filter(Boolean).map(s => Object.assign({}, s, {
        hidden: !!h.hidden[s.id]
      }));
    },
    setHome(patch) {
      current.home = Object.assign({}, current.home, patch);
      persist();
      emit();
    },
    move(id, dir) {
      const order = current.home.order.slice();
      const i = order.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= order.length) return;
      [order[i], order[j]] = [order[j], order[i]];
      this.setHome({
        order
      });
    },
    /* Drag-drop: move `id` so it sits at visual position `toIndex`. */
    reorder(id, toIndex) {
      const order = current.home.order.slice();
      const from = order.indexOf(id);
      if (from < 0) return;
      order.splice(from, 1);
      const clamped = Math.max(0, Math.min(toIndex, order.length));
      order.splice(clamped, 0, id);
      this.setHome({
        order
      });
    },
    toggleHidden(id) {
      const hidden = Object.assign({}, current.home.hidden);
      hidden[id] = !hidden[id];
      this.setHome({
        hidden
      });
    },
    addCustom(type, afterId) {
      const id = "cs" + Date.now();
      const base = {
        id,
        type,
        // "image" | "video" | "text"
        title: type === "video" ? "Video başlığı" : type === "image" ? "Görsel başlığı" : "Yeni bölüm",
        text: "Bu bölümün açıklama metnini buradan düzenleyin.",
        src: null,
        url: "",
        visible: true,
        full: false,
        // full-bleed (edge-to-edge, hero-like)
        align: "left" // header text alignment: left | center
      };
      const perType = type === "video" ? {
        controls: true,
        autoplay: false,
        loop: false,
        muted: false,
        ratio: "16/9"
      } : type === "image" ? {
        rounded: true,
        ratio: "auto",
        height: "",
        link: "",
        caption: ""
      } : {
        size: "normal",
        bg: "none",
        maxWidth: "narrow"
      }; // text
      const custom = (current.home.custom || []).concat([Object.assign(base, perType)]);
      const order = current.home.order.slice();
      const at = afterId ? order.indexOf(afterId) + 1 : order.length;
      order.splice(at, 0, id);
      this.setHome({
        custom,
        order
      });
      return id;
    },
    updateCustom(id, patch) {
      const custom = (current.home.custom || []).map(c => c.id === id ? Object.assign({}, c, patch) : c);
      this.setHome({
        custom
      });
    },
    removeCustom(id) {
      const custom = (current.home.custom || []).filter(c => c.id !== id);
      const order = current.home.order.filter(o => o !== id);
      const hidden = Object.assign({}, current.home.hidden);
      delete hidden[id];
      this.setHome({
        custom,
        order,
        hidden
      });
    },
    /* text-page overrides */
    getText(pageId, key, fallback) {
      const t = current.text[pageId] || {};
      return t[key] != null ? t[key] : fallback;
    },
    setText(pageId, key, value) {
      const t = Object.assign({}, current.text[pageId] || {});
      t[key] = value;
      current.text = Object.assign({}, current.text, {
        [pageId]: t
      });
      persist();
      emit();
    },
    reset() {
      current = JSON.parse(JSON.stringify(defaults));
      persist();
      emit();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.MarkaPages = MarkaPages;
  window.addEventListener("storage", e => {
    if (e.key !== KEY) return;
    current = load();
    emit();
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/pages.js", error: String((e && e.message) || e) }); }

// theme/products.js
try { (() => {
/* ========================================================================
   MARKA PRODUCTS — shared market catalog + reviews. Site reads this; the
   product page handles buy + reviews. Persisted in localStorage('mk-products').
   Load as a CLASSIC script after members.js on market + product pages (and admin).
   ======================================================================== */
(function () {
  const KEY = "mk-products",
    RKEY = "mk-reviews";
  const subs = new Set();
  const SEED = [{
    id: "p1",
    title: "Grid UI Kit",
    seller: "Marka Studio",
    type: "UI Kit",
    format: "Figma",
    license: "Ticari",
    price: 59,
    currency: "$",
    hue: 0,
    tagline: "Editöryel projeler için eksiksiz bir arayüz kiti.",
    desc: "240+ bileşen, 60 hazır ekran ve tam token sistemiyle gelen, editöryel projeler için tasarlanmış bir UI kit.",
    includes: ["240+ bileşen", "60 hazır ekran", "Karanlık & aydınlık tema", "Ücretsiz güncellemeler"],
    specs: [["Bileşen", "240+"], ["Ekran", "60"], ["Format", "Figma"]],
    gallery: 3
  }, {
    id: "p2",
    title: "Portfolyo Şablonu",
    seller: "Nova Labs",
    type: "Şablon",
    format: "Webflow",
    license: "Kişisel",
    price: 39,
    currency: "$",
    hue: 40,
    tagline: "Yaratıcılar için editöryel portfolyo.",
    desc: "Hızlı kurulan, CMS destekli portfolyo şablonu.",
    includes: ["5 sayfa", "CMS koleksiyonları", "Responsive"],
    specs: [["Sayfa", "5"], ["Format", "Webflow"]],
    gallery: 2
  }, {
    id: "p3",
    title: "İkon Seti — 240",
    seller: "Form Co.",
    type: "İkon Seti",
    format: "SVG",
    license: "Ticari",
    price: 29,
    currency: "$",
    hue: -50,
    tagline: "Tutarlı çizgi ikon ailesi.",
    desc: "240 ikon, 3 ağırlık, SVG + font.",
    includes: ["240 ikon", "3 ağırlık", "SVG & font"],
    specs: [["İkon", "240"], ["Ağırlık", "3"]],
    gallery: 4
  }, {
    id: "p4",
    title: "Sunum Şablonu",
    seller: "Pera Studio",
    type: "Şablon",
    format: "Figma",
    license: "Ticari",
    price: 49,
    currency: "$",
    hue: 200,
    tagline: "Yatırımcı sunumları için.",
    desc: "40 slayt, editöryel düzen.",
    includes: ["40 slayt", "Grafik kütüphanesi"],
    specs: [["Slayt", "40"]],
    gallery: 2
  }];
  const RSEED = {
    p1: [{
      id: "r1",
      user: "Ece K.",
      rating: 5,
      text: "Token mimarisi muhteşem, projeye hemen adapte ettim.",
      date: "2026-05-12"
    }, {
      id: "r2",
      user: "Mert S.",
      rating: 5,
      text: "60 ekran gerçekten zaman kazandırıyor.",
      date: "2026-04-28"
    }, {
      id: "r3",
      user: "Can A.",
      rating: 4,
      text: "Çok iyi ama birkaç bileşen daha olabilirdi.",
      date: "2026-04-03"
    }],
    p3: [{
      id: "r4",
      user: "Su D.",
      rating: 5,
      text: "Çizgi tutarlılığı harika.",
      date: "2026-05-20"
    }]
  };
  function load(k, d) {
    try {
      const s = JSON.parse(localStorage.getItem(k) || "null");
      return s || d;
    } catch (e) {
      return d;
    }
  }
  let list = function () {
    const s = load(KEY, null);
    return Array.isArray(s) && s.length ? s : SEED.slice();
  }();
  let reviews = load(RKEY, null) || JSON.parse(JSON.stringify(RSEED));
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
      localStorage.setItem(RKEY, JSON.stringify(reviews));
    } catch (e) {}
    emit();
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn();
      } catch (e) {}
    });
  }
  window.MarkaProducts = {
    list() {
      return list.slice();
    },
    get(id) {
      return list.find(p => p.id === id) || null;
    },
    priceStr(p) {
      return (p.currency || "$") + " " + p.price;
    },
    reviews(id) {
      return (reviews[id] || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    },
    rating(id) {
      const r = reviews[id] || [];
      return r.length ? Math.round(r.reduce((a, x) => a + x.rating, 0) / r.length * 10) / 10 : null;
    },
    addReview(id, rating, text) {
      const u = window.MarkaMembers && window.MarkaMembers.current();
      if (!u) return false;
      reviews[id] = (reviews[id] || []).filter(x => x.user !== u.name).concat([{
        id: "r" + Date.now(),
        user: u.name,
        rating,
        text,
        date: new Date().toISOString().slice(0, 10)
      }]);
      persist();
      return true;
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.addEventListener("storage", e => {
    if (e.key === KEY || e.key === RKEY) {
      list = load(KEY, SEED.slice());
      reviews = load(RKEY, {});
      emit();
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/products.js", error: String((e && e.message) || e) }); }

// theme/profile.js
try { (() => {
/* ========================================================================
   MARKA PROFILE — content store for the founder "Ben Kimim" / CV page.
   The /admin "Profil / CV" module writes here; the live page reads + renders.
   Persisted in localStorage('mk-profile'); changes broadcast across tabs.
   Load as a CLASSIC script in <head> after theme.js.
   ======================================================================== */
(function () {
  const KEY = "mk-profile";
  const subs = new Set();
  const defaults = {
    name: "Deniz Arı",
    role: "Kurucu & Kreatif Direktör",
    tagline: "Markaları dijitalde yeni bir standarda taşıyorum.",
    location: "İstanbul, Türkiye",
    available: true,
    avatar: null,
    cover: null,
    bio: "On yılı aşkın süredir markaların dijital kimliğini kurguluyorum. İşim; karmaşık fikirleri sade, cesur ve ölçülebilir deneyimlere çevirmek.\n\nStratejiden arayüze, hareket tasarımından ekip kültürüne kadar tek bir sistem kurmaya inanıyorum — çünkü iyi tasarım, tutarlılıktan doğar.",
    stats: [{
      num: 240,
      suffix: "+",
      label: "Tamamlanan proje"
    }, {
      num: 31,
      suffix: "",
      label: "Kazanılan ödül"
    }, {
      num: 12,
      suffix: "",
      label: "Yıllık deneyim"
    }],
    experience: [{
      id: "e1",
      role: "Kurucu & Kreatif Direktör",
      company: "Marka",
      period: "2019 — Bugün",
      current: true,
      desc: "Editöryel, performanslı ve ödüllü dijital ürünler üreten bir kreatif stüdyo kurdum."
    }, {
      id: "e2",
      role: "Tasarım Lideri",
      company: "Nova Labs",
      period: "2015 — 2019",
      current: false,
      desc: "Fintech ve SaaS ürünleri için tasarım ekibini büyüttüm; 0→1 ürünler çıkardım."
    }, {
      id: "e3",
      role: "Kıdemli Arayüz Tasarımcısı",
      company: "Atlas Digital",
      period: "2012 — 2015",
      current: false,
      desc: "Kurumsal markalar için web ve mobil arayüzler tasarladım."
    }],
    ventures: [{
      id: "v1",
      name: "Marka",
      role: "Kurucu",
      period: "2019",
      desc: "Kreatif ajans + akademi + market platformu.",
      url: ""
    }, {
      id: "v2",
      name: "Grid UI Kit",
      role: "Yaratıcı",
      period: "2021",
      desc: "300+ satışa ulaşan editöryel tasarım sistemi.",
      url: ""
    }],
    awards: [{
      id: "a1",
      title: "Site of the Day",
      org: "Awwwards",
      year: "2025"
    }, {
      id: "a2",
      title: "Yılın Ajansı (Finalist)",
      org: "Webby",
      year: "2024"
    }, {
      id: "a3",
      title: "Developer Award",
      org: "CSSDA",
      year: "2023"
    }],
    skills: ["Marka Stratejisi", "Sanat Yönetimi", "UI/UX Tasarım", "Motion", "Tasarım Sistemleri", "Ekip Liderliği"],
    press: [{
      id: "p1",
      title: "Türkiye'de tasarımın geleceği",
      outlet: "Webrazzi",
      year: "2025",
      url: ""
    }, {
      id: "p2",
      title: "Editöryel web'in yükselişi",
      outlet: "Medium",
      year: "2024",
      url: ""
    }],
    featured: [{
      id: "f1",
      title: "Atlas Finans yeniden markalaşma",
      year: "2026",
      href: "project.html"
    }, {
      id: "f2",
      title: "Nova Spor Uygulaması",
      year: "2025",
      href: "project.html"
    }],
    contactEmail: "merhaba@marka.studio"
  };
  let current = load();
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      return Object.assign(JSON.parse(JSON.stringify(defaults)), s);
    } catch (e) {
      return JSON.parse(JSON.stringify(defaults));
    }
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(current));
    } catch (e) {}
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn(current);
      } catch (e) {}
    });
  }
  window.MarkaProfile = {
    defaults,
    get() {
      return JSON.parse(JSON.stringify(current));
    },
    set(patch) {
      current = Object.assign({}, current, patch);
      persist();
      emit();
    },
    reset() {
      current = JSON.parse(JSON.stringify(defaults));
      persist();
      emit();
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.addEventListener("storage", e => {
    if (e.key === KEY) {
      current = load();
      emit();
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/profile.js", error: String((e && e.message) || e) }); }

// theme/site-chrome.js
try { (() => {
/* ========================================================================
   MARKA SITE CHROME — ONE header + footer for every page. Templates driven by
   MarkaTheme; labels localized by MarkaI18n. Renders into #mk-header /
   #mk-footer and appends a shared mobile overlay. Re-renders live when the
   admin changes a template OR the language changes. Set window.MK_BASE first.
   Requires: theme.js, i18n.js, window.MARKA.
   ======================================================================== */
(function () {
  const BASE = window.MK_BASE || "../../";
  const url = p => BASE + p;
  const brandName = () => window.MARKA && window.MARKA.BRAND_NAME || "Marka";
  const slogan = () => window.MARKA && window.MARKA.BRAND_SLOGAN || "Dijitalde yeni standart.";
  const T = (k, v) => window.MarkaI18n ? window.MarkaI18n.t(k, v) : k;
  const L = {
    home: url("ui_kits/website/index.html"),
    portfolio: url("pages/portfolio.html"),
    project: url("pages/project.html"),
    blog: url("pages/blog.html"),
    academy: url("pages/academy.html"),
    market: url("pages/market.html"),
    about: url("pages/about.html"),
    contact: url("pages/contact.html"),
    cv: url("pages/profile.html")
  };
  const PRIMARY = [["nav.partners", L.about], ["nav.academy", L.academy], ["nav.blog", L.blog], ["nav.market", L.market]];
  const MEGA = [["mega.works", [["mega.allProjects", L.portfolio], ["mega.featured", L.portfolio], ["mega.byCategory", L.portfolio]]], ["mega.services", [["mega.webDesign", L.about], ["mega.development", L.about], ["mega.branding", L.about], ["mega.uiux", L.about]]], ["mega.inspiration", [["mega.collections", L.blog], ["nav.blog", L.blog]]]];
  const GLOBE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>`;
  const brand = cls => `<a class="brand ${cls || ""}" href="${L.home}" aria-label="${brandName()}">${brandName()}<span class="dot">.</span></a>`;
  const themeBtn = () => `<button class="iconbtn" data-action="toggle-theme" aria-label="Tema">${window.MarkaTheme.get().mode === "dark" ? "☀" : "☾"}</button>`;
  const cta = size => `<button class="btn btn--primary ${size ? "btn--" + size : ""}" data-magnetic data-action="open-booking">${T("cta.quote")} <span class="arr">→</span></button>`;
  const bookSlots = date => {
    const taken = window.MarkaBookings ? window.MarkaBookings.takenSlots(date) : [];
    const slots = window.MarkaBookings ? window.MarkaBookings.SLOTS : [];
    return slots.map(s => `<button type="button" class="bookm__slot" data-slot="${s}" ${taken.indexOf(s) >= 0 ? "disabled" : ""}>${s}</button>`).join("");
  };
  function bookingModalHTML() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const def = d.toISOString().slice(0, 10);
    const min = new Date().toISOString().slice(0, 10);
    const u = member();
    return `<div class="authm__scrim" data-action="close-booking"></div>
      <div class="authm__box bookm__box" role="dialog" aria-modal="true" aria-label="Görüşme planla">
        <button class="authm__x" data-action="close-booking" aria-label="Kapat">✕</button>
        <span class="eyebrow">Ücretsiz Tanışma</span>
        <h3 class="bookm__title">Görüşme planla</h3>
        <p class="bookm__sub">30 dakikalık keşif görüşmesi. Sana en uygun günü ve saati seç.</p>
        <form class="authm__form" data-bookform style="margin-top:var(--space-4)">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
            <label>Ad Soyad<input name="name" required value="${u ? esc(u.name) : ""}"></label>
            <label>E-posta<input name="email" type="email" required value="${u ? esc(u.email) : ""}"></label>
          </div>
          <label>Konu
            <select name="topic"><option>Marka & ürün</option><option>Web tasarım</option><option>Geliştirme</option><option>Akademi / eğitim</option><option>Diğer</option></select>
          </label>
          <label>Tarih<input name="date" type="date" value="${def}" min="${min}" data-book-date></label>
          <div class="bookm__slots" data-book-slots>${bookSlots(def)}</div>
          <input type="hidden" name="slot" data-book-slot-input>
          <p class="authm__err" hidden></p>
          <button class="btn btn--primary" type="submit">Görüşmeyi onayla <span class="arr">→</span></button>
        </form>
      </div>`;
  }
  const menuBtn = always => `<button class="iconbtn menu-toggle ${always ? "menu-toggle--always" : ""}" data-action="open-menu" aria-label="Menü">≡</button>`;
  const socialList = () => window.MARKA && window.MARKA.BRAND_SOCIAL || [];
  const socSlug = s => s.slug || String(s.label || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const SOC_LOCAL = {
    linkedin: 1
  }; // slugs not served by the CDN — self-hosted in assets/social/
  const socUrl = slug => SOC_LOCAL[slug] ? url("assets/social/" + slug + ".svg") : "https://cdn.simpleicons.org/" + slug;
  const socIcon = (s, cls) => {
    const u = socUrl(socSlug(s));
    return `<a class="${cls}" href="${s.href || "#"}" target="_blank" rel="noopener" aria-label="${s.label}" data-cursor title="${s.label}"><span class="soc__i" style="-webkit-mask-image:url(${u});mask-image:url(${u})"></span></a>`;
  };
  const social = cls => `<div class="hdr__social">${socialList().map(s => socIcon(s, "soc" + (cls ? " " + cls : ""))).join("")}</div>`;
  const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const initialsOf = n => (n || "").split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
  const member = () => window.MarkaMembers ? window.MarkaMembers.current() : null;
  const account = () => {
    const u = member();
    if (u) {
      return `<div class="acct" data-acct-wrap>
        <button class="acct__btn" data-action="toggle-acct" aria-label="Hesap">${u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : `<span>${esc(initialsOf(u.name))}</span>`}</button>
        <div class="acct__pop" data-acct-pop hidden>
          <div class="acct__head"><b>${esc(u.name)}</b><span>${esc(u.email)}</span></div>
          <a href="${L.cv}" data-cursor>Profilim / CV</a>
          <a href="${L.home}#rozetler" data-cursor>Rozetlerim</a>
          <a href="${L.academy}" data-cursor>Kurslarım</a>
          <button class="acct__logout" data-action="logout">Çıkış yap</button>
        </div></div>`;
    }
    return `<button class="acct-login" data-action="open-auth" aria-label="${T("nav.login")}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0114 0"/></svg><span>${T("nav.login")}</span></button>`;
  };
  function authModalHTML() {
    return `<div class="authm__scrim" data-action="close-auth"></div>
      <div class="authm__box" role="dialog" aria-modal="true" aria-label="Hesap">
        <button class="authm__x" data-action="close-auth" aria-label="Kapat">✕</button>
        <div class="authm__brand">${brandName()}<span class="dot">.</span></div>
        <div class="authm__tabs"><button class="on" data-authtab="login">Giriş Yap</button><button data-authtab="register">Kayıt Ol</button></div>
        <form class="authm__form" data-authform="login">
          <label>E-posta<input type="email" name="email" required placeholder="ad@ornek.com"></label>
          <label>Şifre<input type="password" name="password" placeholder="••••••••"></label>
          <p class="authm__err" hidden></p>
          <button class="btn btn--primary" type="submit">Giriş yap <span class="arr">→</span></button>
          <p class="authm__hint">Demo: herhangi bir hesapla kayıt olup giriş yapabilirsin.</p>
        </form>
        <form class="authm__form" data-authform="register" hidden>
          <label>Ad Soyad<input type="text" name="name" required placeholder="Adınız"></label>
          <label>E-posta<input type="email" name="email" required placeholder="ad@ornek.com"></label>
          <label>Şifre<input type="password" name="password" placeholder="En az 4 karakter"></label>
          <p class="authm__err" hidden></p>
          <button class="btn btn--primary" type="submit">Hesap oluştur <span class="arr">→</span></button>
        </form>
      </div>`;
  }
  const navLinks = () => PRIMARY.map(([k, h]) => `<a href="${h}" class="hdr__links">${T(k)}</a>`).join("");
  const discover = () => `<button class="navlink mega-trigger" data-mega-trigger aria-expanded="false">${T("nav.discover")} <span class="chev" aria-hidden="true">⌄</span></button>`;
  const langSwitch = () => {
    if (!window.MarkaI18n) return "";
    const cur = window.MarkaI18n.current(),
      langs = window.MarkaI18n.LANGS;
    return `<div class="lang-switch" data-lang-wrap>
      <button class="lang-switch__btn" data-action="toggle-lang" aria-label="Dil / Language">${GLOBE}<span>${cur.short}</span><span class="chev" aria-hidden="true">⌄</span></button>
      <div class="lang-switch__pop" data-lang-pop hidden>
        ${langs.map(l => `<button data-lang="${l.id}" class="${l.id === cur.id ? "on" : ""}"><span>${l.flag}</span> ${l.label} <span class="lc">${l.short}</span></button>`).join("")}
      </div>
    </div>`;
  };
  const megaPanel = () => `
    <div class="mega" data-mega-panel>
      <div class="wrap mega__grid">
        ${MEGA.map(([title, items]) => `
          <div class="mega__col"><h4>${T(title)}</h4>
            <ul>${items.map(([k, h]) => `<li><a href="${h}" data-cursor>${T(k)} <span aria-hidden="true">→</span></a></li>`).join("")}</ul>
          </div>`).join("")}
        <a class="mega__feat" href="${L.project}" data-cursor="${T("mega.featured")}">
          <div class="ph" style="aspect-ratio:4/3"><div class="ph__in"></div><span class="ph__tag">${T("mega.featuredLabel")}</span></div>
          <h5>${T("mega.featuredTitle")}</h5><p>${T("mega.featuredText")}</p>
        </a>
      </div>
    </div>`;
  function headerHTML(tpl) {
    if (tpl === "minimal") return `<div class="wrap hdr__row">${brand()}<div class="hdr__right">${langSwitch()}${themeBtn()}${cta()}${menuBtn(true)}</div></div>`;
    if (tpl === "centered") return `<div class="wrap hdr__stack"><div class="hdr__crow"><div style="display:flex;gap:8px;align-items:center">${langSwitch()}${themeBtn()}</div>${brand("brand--center")}${cta()}</div>
        <nav class="nav nav__primary hdr__cnav" aria-label="Birincil">${discover()}${navLinks()}</nav></div>${megaPanel()}`;
    if (tpl === "split") return `<div class="wrap hdr__row">${brand()}<nav class="nav nav__primary hdr__splitnav" aria-label="Birincil">${discover()}${navLinks()}</nav>
        <div class="hdr__right">${langSwitch()}${themeBtn()}${cta()}${menuBtn()}</div></div>${megaPanel()}`;
    return `<div class="wrap hdr__row">${brand()}<nav class="nav nav__primary" aria-label="Birincil">${discover()}${navLinks()}</nav>
      <div class="hdr__right">${social()}${langSwitch()}${themeBtn()}${account()}${cta()}${menuBtn()}</div></div>${megaPanel()}`;
  }
  function footerHTML(tpl) {
    const cols = [["footer.work", [["footer.portfolio", L.portfolio], ["footer.categories", L.portfolio], ["mega.featured", L.portfolio]]], ["footer.inspiration", [["mega.collections", L.blog], ["nav.blog", L.blog]]], ["footer.academy", [["footer.allCourses", L.academy], ["footer.instructors", L.academy]]], ["footer.corporate", [["nav.aboutMe", L.cv], ["footer.about", L.about], ["footer.contact", L.contact], ["footer.faq", L.about]]]];
    if (tpl === "compact") {
      return `<div class="wrap ftr__compact">
        <div class="ftr__compactL">${brand()}<span class="ftr__slogan">${slogan()}</span></div>
        <nav class="ftr__compactNav">${[["footer.work", L.portfolio], ["nav.academy", L.academy], ["nav.blog", L.blog], ["nav.market", L.market], ["footer.about", L.about], ["footer.contact", L.contact]].map(([k, h]) => `<a href="${h}" data-cursor>${T(k)}</a>`).join("")}</nav>
        <div class="ftr__bottom" style="border:0;padding:0"><span>© 2026 ${brandName()}.</span>
          <div class="ftr__social">${socialList().map(s => socIcon(s, "soc soc--ftr")).join("")}</div></div>
      </div>`;
    }
    return `<div class="wrap">
      <div class="ftr__cta reveal"><h2>${T("footer.cta")}</h2>
        <a href="${L.contact}" class="btn btn--primary btn--lg" data-magnetic data-cursor="${T("footer.contact")}">${T("cta.contact")} <span class="arr">→</span></a></div>
      <div class="ftr__cols">
        <div class="ftr__brandcol">${brand()}<p>${slogan()}</p></div>
        ${cols.map(([t, items]) => `<div><h4>${T(t)}</h4><ul>${items.map(([k, h]) => `<li><a href="${h}" data-cursor>${T(k)}</a></li>`).join("")}</ul></div>`).join("")}
      </div>
    </div>
    <div class="ftr__giant" aria-hidden="true" data-parallax-x>${brandName()}<span class="dot">.</span></div>
    <div class="wrap ftr__bottom">
      <span>© 2026 ${brandName()}. ${T("footer.rights")}</span>
      <div class="ftr__social">${socialList().map(s => socIcon(s, "soc soc--ftr")).join("")}</div>
      <div style="display:flex;gap:var(--space-4)"><a href="#">${T("footer.privacy")}</a><a href="#">${T("footer.terms")}</a></div>
    </div>`;
  }
  const overlayAccount = () => {
    const u = member();
    if (u) return `<div class="overlay__acct"><div class="overlay__acctAva">${u.avatar ? `<img src="${esc(u.avatar)}" alt="">` : `<span>${esc(initialsOf(u.name))}</span>`}</div><div class="overlay__acctMeta"><b>${esc(u.name)}</b><a href="${L.cv}">Profilim / CV</a></div><button class="overlay__logout" data-action="logout">Çıkış</button></div>`;
    return `<button class="btn btn--ghost btn--lg overlay__login" data-action="open-auth">${T("nav.login")}</button>`;
  };
  const overlayLang = () => {
    if (!window.MarkaI18n) return "";
    const cur = window.MarkaI18n.current(),
      langs = window.MarkaI18n.LANGS;
    return `<div class="overlay__lang">${langs.map(l => `<button data-lang="${l.id}" class="${l.id === cur.id ? "on" : ""}">${l.short}</button>`).join("")}</div>`;
  };
  function overlayHTML() {
    const links = [["nav.aboutMe", L.cv], ["footer.work", L.portfolio], ["mega.services", L.about], ["footer.inspiration", L.blog], ["nav.academy", L.academy], ["nav.blog", L.blog], ["nav.market", L.market]];
    return `<div class="overlay__top">${brand()}<button class="iconbtn" data-action="close-menu" aria-label="Kapat">✕</button></div>
      <nav class="overlay__links" aria-label="Mobil">${links.map(([k, h], i) => `<a href="${h}" style="transition-delay:${120 + i * 60}ms">${T(k)}</a>`).join("")}</nav>
      <div class="overlay__foot">${overlayAccount()}${cta("lg")}</div>
      ${overlayLang()}
      <div class="overlay__social">${socialList().map(s => socIcon(s, "soc soc--overlay")).join("")}</div>`;
  }
  function render() {
    const t = window.MarkaTheme.get();
    const h = document.getElementById("mk-header"),
      f = document.getElementById("mk-footer");
    if (h) h.innerHTML = `<header id="site-header" class="hdr hdr--${t.headerTemplate}" data-mega="false">${headerHTML(t.headerTemplate)}</header>`;
    if (f) f.innerHTML = `<footer class="ftr ftr--${t.footerTemplate}">${footerHTML(t.footerTemplate)}</footer>`;
    let ov = document.querySelector(".overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.className = "overlay";
      document.body.appendChild(ov);
    }
    ov.innerHTML = overlayHTML();
    let am = document.querySelector(".authm");
    if (!am) {
      am = document.createElement("div");
      am.className = "authm";
      am.hidden = true;
      document.body.appendChild(am);
    }
    am.innerHTML = authModalHTML();
    let bm = document.querySelector(".bookm");
    if (!bm) {
      bm = document.createElement("div");
      bm.className = "authm bookm";
      bm.hidden = true;
      document.body.appendChild(bm);
    }
    bm.innerHTML = bookingModalHTML();
    bindHeaderHover();
    if (window.MarkaMotion) window.MarkaMotion.init();
  }
  function bindHeaderHover() {
    const h = document.getElementById("site-header");
    if (!h) return;
    const trigger = h.querySelector("[data-mega-trigger]");
    if (trigger) {
      trigger.addEventListener("mouseenter", () => h.setAttribute("data-mega", "true"));
      trigger.addEventListener("click", e => {
        e.preventDefault();
        h.setAttribute("data-mega", h.getAttribute("data-mega") === "true" ? "false" : "true");
      });
    }
    h.addEventListener("mouseleave", () => h.setAttribute("data-mega", "false"));
    const onScroll = () => h.classList.toggle("is-stuck", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
  }
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-action]");
    const ov = document.querySelector(".overlay");
    if (a) {
      const act = a.getAttribute("data-action");
      if (act === "open-menu" && ov) ov.classList.add("is-open");
      if (act === "close-menu" && ov) ov.classList.remove("is-open");
      if (act === "toggle-theme") window.MarkaTheme.set({
        mode: window.MarkaTheme.get().mode === "dark" ? "light" : "dark"
      });
      if (act === "toggle-lang") {
        const pop = a.parentElement.querySelector("[data-lang-pop]");
        if (pop) pop.hidden = !pop.hidden;
      }
      if (act === "open-auth") {
        const am = document.querySelector(".authm");
        if (am) {
          am.hidden = false;
          document.body.style.overflow = "hidden";
          const fi = am.querySelector('[data-authform="login"] input');
          if (fi) setTimeout(() => fi.focus(), 30);
        }
        if (ov) ov.classList.remove("is-open");
      }
      if (act === "close-auth") {
        const am = document.querySelector(".authm");
        if (am) am.hidden = true;
        document.body.style.overflow = "";
      }
      if (act === "toggle-acct") {
        const pop = a.parentElement.querySelector("[data-acct-pop]");
        if (pop) pop.hidden = !pop.hidden;
      }
      if (act === "logout") {
        window.MarkaMembers && window.MarkaMembers.logout();
      }
      if (act === "open-booking") {
        const bm = document.querySelector(".bookm");
        if (bm) {
          bm.hidden = false;
          document.body.style.overflow = "hidden";
        }
        if (ov) ov.classList.remove("is-open");
      }
      if (act === "close-booking") {
        const bm = document.querySelector(".bookm");
        if (bm) bm.hidden = true;
        document.body.style.overflow = "";
      }
    }
    const slot = e.target.closest("[data-slot]");
    if (slot && !slot.disabled) {
      const form = slot.closest("[data-bookform]");
      form.querySelectorAll("[data-slot]").forEach(s => s.classList.toggle("on", s === slot));
      form.querySelector("[data-book-slot-input]").value = slot.getAttribute("data-slot");
    }
    const tab = e.target.closest("[data-authtab]");
    if (tab) {
      const am = tab.closest(".authm");
      const which = tab.getAttribute("data-authtab");
      am.querySelectorAll("[data-authtab]").forEach(b => b.classList.toggle("on", b === tab));
      am.querySelectorAll("[data-authform]").forEach(f => {
        f.hidden = f.getAttribute("data-authform") !== which;
      });
    }
    if (!e.target.closest("[data-acct-wrap]")) document.querySelectorAll("[data-acct-pop]").forEach(p => p.hidden = true);
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn && window.MarkaI18n) {
      window.MarkaI18n.set(langBtn.getAttribute("data-lang"));
    } else if (!e.target.closest("[data-lang-wrap]")) {
      document.querySelectorAll("[data-lang-pop]").forEach(p => p.hidden = true);
    }
    if (e.target.closest(".overlay__links a") && ov) ov.classList.remove("is-open");
  });

  // auth form submit (login / register)
  document.addEventListener("change", e => {
    const dt = e.target.closest("[data-book-date]");
    if (dt) {
      const form = dt.closest("[data-bookform]");
      const cont = form.querySelector("[data-book-slots]");
      if (cont) cont.innerHTML = bookSlots(dt.value);
      form.querySelector("[data-book-slot-input]").value = "";
    }
  });
  document.addEventListener("submit", e => {
    const bf = e.target.closest("[data-bookform]");
    if (bf && window.MarkaBookings) {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(bf).entries());
      const err = bf.querySelector(".authm__err");
      if (!d.name || !d.email || !d.date) {
        if (err) {
          err.textContent = "Ad, e-posta ve tarih gerekli.";
          err.hidden = false;
        }
        return;
      }
      if (!d.slot) {
        if (err) {
          err.textContent = "Lütfen bir saat seç.";
          err.hidden = false;
        }
        return;
      }
      window.MarkaBookings.book({
        name: d.name,
        email: d.email,
        topic: d.topic,
        date: d.date,
        slot: d.slot
      });
      const bm = document.querySelector(".bookm");
      if (bm) bm.innerHTML = `<div class="authm__scrim" data-action="close-booking"></div><div class="authm__box bookm__box" style="text-align:center"><div class="gres__emoji">✓</div><h3 class="bookm__title">Görüşmen planlandı!</h3><p class="bookm__sub">${esc(d.date)} · ${esc(d.slot)} — onay e-postası ${esc(d.email)} adresine gönderilecek.</p><button class="btn btn--primary" data-action="close-booking" style="margin-top:var(--space-4)">Tamam</button></div>`;
      return;
    }
    const form = e.target.closest("[data-authform]");
    if (!form || !window.MarkaMembers) return;
    e.preventDefault();
    const kind = form.getAttribute("data-authform");
    const data = Object.fromEntries(new FormData(form).entries());
    const err = form.querySelector(".authm__err");
    const res = kind === "register" ? window.MarkaMembers.register(data) : window.MarkaMembers.login(data.email, data.password);
    if (res && res.error) {
      if (err) {
        err.textContent = res.error;
        err.hidden = false;
      }
      return;
    }
    if (err) err.hidden = true;
    const am = document.querySelector(".authm");
    if (am) am.hidden = true;
    document.body.style.overflow = "";
  });
  if (window.MarkaMembers) window.MarkaMembers.subscribe(() => render());
  let lastTpl = null,
    lastFtr = null;
  window.MarkaTheme.subscribe(cfg => {
    if (cfg.headerTemplate !== lastTpl || cfg.footerTemplate !== lastFtr) {
      lastTpl = cfg.headerTemplate;
      lastFtr = cfg.footerTemplate;
      render();
    } else {
      const tb = document.querySelector('[data-action="toggle-theme"]');
      if (tb) tb.textContent = cfg.mode === "dark" ? "☀" : "☾";
    }
  });
  if (window.MarkaI18n) window.MarkaI18n.subscribe(() => render());

  /* ---- Entry pop-up (campaign) — config from MarkaTheme.popup ---- */
  let popupTimer = null;
  function popupSeenKey() {
    return "mk-popup-seen";
  }
  function closePopup() {
    const p = document.querySelector(".mk-popup");
    if (p) p.classList.remove("is-open");
  }
  function showPopup(cfg) {
    const pc = cfg.popup || {};
    let p = document.querySelector(".mk-popup");
    if (!p) {
      p = document.createElement("div");
      p.className = "mk-popup";
      document.body.appendChild(p);
      p.addEventListener("click", e => {
        if (e.target === p || e.target.closest("[data-popup-close]")) {
          closePopup();
          try {
            sessionStorage.setItem(popupSeenKey(), "1");
          } catch (e) {}
        }
      });
    }
    p.innerHTML = `<div class="mk-popup__box" role="dialog" aria-modal="true" aria-label="${(pc.title || "Kampanya").replace(/"/g, "&quot;")}">
        <button class="mk-popup__x" data-popup-close aria-label="Kapat">✕</button>
        ${pc.image ? `<div class="mk-popup__media"><img src="${pc.image}" alt=""></div>` : ""}
        <div class="mk-popup__body">
          ${pc.title ? `<h3 class="mk-popup__title">${pc.title}</h3>` : ""}
          ${pc.text ? `<p class="mk-popup__text">${pc.text}</p>` : ""}
          ${pc.ctaText ? `<a class="btn btn--primary" href="${pc.ctaUrl || "#"}">${pc.ctaText} <span class="arr">→</span></a>` : ""}
        </div>
      </div>`;
    requestAnimationFrame(() => p.classList.add("is-open"));
  }
  function schedulePopup() {
    const cfg = window.MarkaTheme.get();
    const pc = cfg.popup || {};
    if (popupTimer) {
      clearTimeout(popupTimer);
      popupTimer = null;
    }
    closePopup();
    if (!pc.enabled) return;
    let seen = false;
    try {
      seen = pc.freqOncePerSession !== false && sessionStorage.getItem(popupSeenKey()) === "1";
    } catch (e) {}
    if (seen) return;
    popupTimer = setTimeout(() => showPopup(cfg), Math.max(0, (pc.delaySec || 0) * 1000));
  }
  // live: re-schedule when admin toggles/edits the popup (preview reflects changes)
  window.MarkaTheme.subscribe(() => {
    try {
      sessionStorage.removeItem(popupSeenKey());
    } catch (e) {}
    schedulePopup();
  });
  function boot() {
    lastTpl = window.MarkaTheme.get().headerTemplate;
    lastFtr = window.MarkaTheme.get().footerTemplate;
    render();
    schedulePopup();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);else boot();
  window.MarkaChrome = {
    render
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/site-chrome.js", error: String((e && e.message) || e) }); }

// theme/theme.js
try { (() => {
/* ========================================================================
   MARKA THEME RUNTIME — single source of truth for live appearance.
   The /admin Görünüm module writes here; every site page reads + applies it.
   Persisted in localStorage('mk-theme'); changes broadcast across tabs.
   Load this as a CLASSIC script in <head> on every page (before chrome).
   ======================================================================== */
(function () {
  const KEY = "mk-theme";

  // --- Option catalogs (the admin renders pickers from these) ---
  const ACCENTS = [{
    id: "green",
    label: "Elektrik Yeşili",
    value: "#16D17F"
  }, {
    id: "violet",
    label: "Gece Moru",
    value: "#6C5CE7"
  }, {
    id: "orange",
    label: "Sıcak Turuncu",
    value: "#FF5C35"
  }, {
    id: "blue",
    label: "Okyanus Mavisi",
    value: "#2A6FDB"
  }, {
    id: "ink",
    label: "Monokrom",
    value: "#0A0A0A"
  }];
  const FONTS = [{
    id: "general",
    label: "General Sans",
    family: '"General Sans", sans-serif',
    link: "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
  }, {
    id: "space",
    label: "Space Grotesk",
    family: '"Space Grotesk", sans-serif',
    link: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
  }, {
    id: "schibsted",
    label: "Schibsted Grotesk",
    family: '"Schibsted Grotesk", sans-serif',
    link: "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&display=swap"
  }, {
    id: "hanken",
    label: "Hanken Grotesk",
    family: '"Hanken Grotesk", sans-serif',
    link: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
  }];
  const HEADER_TEMPLATES = [{
    id: "classic",
    label: "Klasik",
    desc: "Logo sol, menü, sosyal + CTA sağ"
  }, {
    id: "centered",
    label: "Ortalanmış",
    desc: "Logo ortada, menü altta"
  }, {
    id: "minimal",
    label: "Minimal",
    desc: "Sadece logo + CTA + menü düğmesi"
  }, {
    id: "split",
    label: "Bölünmüş",
    desc: "Logo sol, menü sağa hizalı, CTA en sağda"
  }];
  const FOOTER_TEMPLATES = [{
    id: "columns",
    label: "Sütunlu",
    desc: "Çok sütun + dev kelime-logo"
  }, {
    id: "compact",
    label: "Kompakt",
    desc: "Tek satır, sade"
  }];
  const HERO_VARIANTS = [{
    id: "full",
    label: "Tam",
    desc: "Tam ekran kapak + büyük başlık"
  }, {
    id: "split",
    label: "Bölünmüş",
    desc: "Sol metin, sağ görsel"
  }, {
    id: "center",
    label: "Merkez",
    desc: "Ortalanmış editoryal"
  }];
  const defaults = {
    headerTemplate: "classic",
    footerTemplate: "columns",
    heroVariant: "full",
    accent: "#16D17F",
    mode: "light",
    font: "general",
    radius: 10,
    popup: {
      enabled: false,
      delaySec: 5,
      title: "Yeni sezon kampanyası",
      text: "Tüm dijital ürünlerde bu haftaya özel %20 indirim.",
      image: null,
      ctaText: "Keşfet",
      ctaUrl: "market.html",
      freqOncePerSession: true
    }
  };
  const subs = new Set();
  let current = load();
  function load() {
    try {
      return Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || "{}"));
    } catch (e) {
      return Object.assign({}, defaults);
    }
  }

  // luminance → choose readable text color on the accent
  function onAccent(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16),
      g = parseInt(h.slice(2, 4), 16),
      b = parseInt(h.slice(4, 6), 16);
    const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return L > 0.62 ? "#0A0A0A" : "#FFFFFF";
  }
  function fontById(id) {
    return FONTS.find(f => f.id === id) || FONTS[0];
  }
  function ensureFontLink(font) {
    const id = "mk-font-" + font.id;
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href = font.link;
    document.head.appendChild(l);
  }
  function apply(cfg) {
    cfg = cfg || current;
    const root = document.documentElement;
    // accent + derived
    root.style.setProperty("--accent", cfg.accent);
    root.style.setProperty("--accent-hover", `color-mix(in srgb, ${cfg.accent} 82%, #000)`);
    root.style.setProperty("--accent-tint", `color-mix(in srgb, ${cfg.accent} 14%, transparent)`);
    root.style.setProperty("--on-accent", onAccent(cfg.accent));
    root.style.setProperty("--focus-ring", cfg.accent);
    // re-map the whole accent ramp so every --green-* reference follows the theme
    root.style.setProperty("--green-500", cfg.accent);
    root.style.setProperty("--green-600", `color-mix(in srgb, ${cfg.accent} 82%, #000)`);
    root.style.setProperty("--green-700", `color-mix(in srgb, ${cfg.accent} 60%, #000)`);
    root.style.setProperty("--green-400", `color-mix(in srgb, ${cfg.accent} 72%, #fff)`);
    root.style.setProperty("--green-200", `color-mix(in srgb, ${cfg.accent} 34%, #fff)`);
    root.style.setProperty("--green-100", `color-mix(in srgb, ${cfg.accent} 14%, #fff)`);
    // font
    const font = fontById(cfg.font);
    ensureFontLink(font);
    root.style.setProperty("--font-sans", font.family);
    // radius — derive the WHOLE scale from the base so every token responds
    if (cfg.radius != null) {
      const r = Math.max(0, cfg.radius);
      root.style.setProperty("--radius-xs", Math.max(0, r - 4) + "px");
      root.style.setProperty("--radius-sm", Math.max(0, r - 2) + "px");
      root.style.setProperty("--radius", r + "px");
      root.style.setProperty("--radius-lg", r + 2 + "px");
      root.style.setProperty("--radius-xl", r + 6 + "px");
      // pill-shaped controls (search, segmented toggles, badges, switches):
      // scale with the slider, snapping to a true pill only near the top of the range
      root.style.setProperty("--radius-pill", (r >= 16 ? 999 : r * 2) + "px");
    }
    // theme mode
    root.setAttribute("data-theme", cfg.mode === "dark" ? "dark" : "light");
    // template hooks (chrome reads these)
    root.setAttribute("data-header-tpl", cfg.headerTemplate);
    root.setAttribute("data-footer-tpl", cfg.footerTemplate);
  }
  const MarkaTheme = {
    ACCENTS,
    FONTS,
    HEADER_TEMPLATES,
    FOOTER_TEMPLATES,
    HERO_VARIANTS,
    defaults,
    get() {
      return Object.assign({}, current);
    },
    set(patch) {
      current = Object.assign({}, current, patch);
      try {
        localStorage.setItem(KEY, JSON.stringify(current));
      } catch (e) {}
      apply(current);
      subs.forEach(fn => {
        try {
          fn(current);
        } catch (e) {}
      });
    },
    reset() {
      this.set(Object.assign({}, defaults));
    },
    apply,
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };

  // cross-tab: admin in one tab updates the live site in another
  window.addEventListener("storage", e => {
    if (e.key !== KEY) return;
    current = load();
    apply(current);
    subs.forEach(fn => {
      try {
        fn(current);
      } catch (e) {}
    });
  });
  window.MarkaTheme = MarkaTheme;
  // apply immediately to avoid flash of default theme
  apply(current);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/theme.js", error: String((e && e.message) || e) }); }

// theme/votes.js
try { (() => {
/* ========================================================================
   MARKA VOTES — community "Vote" (beğeni) for portfolio projects.
   One vote per project per identity (member id, or a guest browser id).
   Seeded counts so the ranking looks alive. Persisted in localStorage('mk-votes').
   Load as a CLASSIC script in <head> after members.js.
   ======================================================================== */
(function () {
  const KEY = "mk-votes",
    GKEY = "mk-voter-guest";
  const subs = new Set();
  const SEED = {
    "nova-spor-uygulamasi": 218,
    "pera-galeri-kimligi": 164,
    "venta-e-ticaret": 192,
    "atlas-finans-yeniden-markalasma": 301
  };
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s && s.counts) return s;
    } catch (e) {}
    return {
      counts: Object.assign({}, SEED),
      voters: {}
    };
  }
  let state = load();
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function emit() {
    subs.forEach(fn => {
      try {
        fn();
      } catch (e) {}
    });
  }
  function voterKey() {
    const u = window.MarkaMembers && window.MarkaMembers.current();
    if (u) return "u:" + u.id;
    let g;
    try {
      g = localStorage.getItem(GKEY);
      if (!g) {
        g = "g" + Date.now() + Math.random().toString(36).slice(2, 6);
        localStorage.setItem(GKEY, g);
      }
    } catch (e) {
      g = "g";
    }
    return "g:" + g;
  }
  window.MarkaVotes = {
    slug(s) {
      return String(s || "").toLowerCase().replace(/[^a-z0-9ğüşöçı\s-]/gi, "").trim().replace(/\s+/g, "-").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").replace(/ı/g, "i");
    },
    count(id) {
      return state.counts[id] || 0;
    },
    hasVoted(id) {
      return (state.voters[voterKey()] || []).includes(id);
    },
    toggle(id) {
      const k = voterKey();
      const mine = state.voters[k] || [];
      if (mine.includes(id)) {
        state.voters[k] = mine.filter(x => x !== id);
        state.counts[id] = Math.max(0, (state.counts[id] || 1) - 1);
      } else {
        state.voters[k] = mine.concat([id]);
        state.counts[id] = (state.counts[id] || 0) + 1;
      }
      persist();
      emit();
      return this.hasVoted(id);
    },
    top(n) {
      return Object.entries(state.counts).sort((a, b) => b[1] - a[1]).slice(0, n || 5).map(([id, c]) => ({
        id,
        count: c
      }));
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    }
  };
  window.addEventListener("storage", e => {
    if (e.key === KEY) {
      state = load();
      emit();
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "theme/votes.js", error: String((e && e.message) || e) }); }

// ui_kits/admin/admin-core.jsx
try { (() => {
/* Admin shared atoms — Icon set, Card, StatCard, Field, Switch, Seg, Badge,
   Modal. Exposed on window for the module files. */

const ICONS = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  ai: "M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z",
  blog: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h8",
  projects: "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  courses: "M22 9L12 5 2 9l10 4 10-4zM6 11v5c0 1 3 2 6 2s6-1 6-2v-5",
  market: "M6 7h12l1 13H5zM9 7a3 3 0 016 0",
  media: "M3 5h18v14H3zM3 15l5-5 4 4 3-3 6 6",
  appearance: "M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-1.5 1-2 2-2h1a4 4 0 004-4c0-5-4-8-9-8zM7.5 12a1 1 0 100-2 1 1 0 000 2zM12 8a1 1 0 100-2 1 1 0 000 2zM16.5 12a1 1 0 100-2 1 1 0 000 2z",
  users: "M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M17 11a4 4 0 000-8M22 21c0-2.7-1.5-5-3.7-6.2",
  seo: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  settings: "M12 9a3 3 0 100 6 3 3 0 000-6zM19.4 13l1.5 2.6-2 3.4-2.9-.8a7 7 0 01-1.7 1l-.6 3H10.3l-.6-3a7 7 0 01-1.7-1l-2.9.8-2-3.4L4.6 13a7 7 0 010-2L3.1 8.4l2-3.4 2.9.8a7 7 0 011.7-1l.6-3h3.4l.6 3a7 7 0 011.7 1l2.9-.8 2 3.4L19.4 11a7 7 0 010 2z",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M6 6l12 12M18 6L6 18",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3",
  plus: "M12 5v14M5 12h14",
  edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  external: "M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5",
  chevron: "M6 9l6 6 6-6",
  link: "M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1",
  pages: "M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5M9 13h6M9 17h6",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  tablet: "M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
  mobile: "M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1zM11 19h2",
  grip: "M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01"
};
function Icon({
  name,
  size = 20,
  stroke = 1.8,
  fill = false
}) {
  const d = ICONS[name] || "";
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
function AdmCard({
  title,
  desc,
  action,
  children,
  className = ""
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: `adm-card ${className}`
  }, (title || action) && /*#__PURE__*/React.createElement("div", {
    className: "adm-card__h"
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h3", null, title), desc && /*#__PURE__*/React.createElement("p", null, desc)), action), children);
}
function StatCard({
  label,
  val,
  delta,
  dir
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-card__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "stat-card__val"
  }, val), delta && /*#__PURE__*/React.createElement("span", {
    className: `stat-card__delta ${dir}`
  }, dir === "up" ? "▲" : "▼", " ", delta));
}
function Field({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", null, label), children);
}
function Switch({
  on,
  onChange
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `adm-switch ${on ? "on" : ""}`,
    "aria-pressed": on,
    onClick: () => onChange(!on)
  });
}
function Seg({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-seg"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    className: value === o.value ? "on" : "",
    onClick: () => onChange(o.value)
  }, o.label)));
}
function Badge({
  children,
  tone = "muted"
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `adm-badge adm-badge--${tone}`
  }, children);
}
function Modal({
  title,
  onClose,
  children,
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__scrim",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-modal",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__h"
  }, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: onClose,
    "aria-label": "Kapat"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__b"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "adm-modal__f"
  }, footer)));
}

/* Custom select popup — design-system styled, replaces native <select>. */
function MkSelect({
  value,
  onChange,
  options = [],
  placeholder = "Seçin",
  width,
  searchable,
  multi
}) {
  const [open, setOpen] = React.useState(false);
  const [up, setUp] = React.useState(false);
  const [q, setQ] = React.useState("");
  const ref = React.useRef();
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const sel = multi ? Array.isArray(value) ? value : [] : value;
  const cur = multi ? null : opts.find(o => o.value === value);
  const isOn = v => multi ? sel.includes(v) : v === value;
  const btnLabel = multi ? sel.length === 0 ? placeholder : sel.length <= 2 ? opts.filter(o => sel.includes(o.value)).map(o => o.label).join(", ") : `${sel.length} hizmet seçili` : cur ? cur.label : placeholder;
  const showSearch = searchable || opts.length > 10;
  const filtered = q ? opts.filter(o => o.label.toLowerCase().includes(q.toLowerCase())) : opts;
  React.useEffect(() => {
    if (!open) {
      setQ("");
      return;
    }
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const toggle = () => {
    if (!open && ref.current) {
      const r = ref.current.getBoundingClientRect();
      setUp(window.innerHeight - r.bottom < 280);
    }
    setOpen(o => !o);
  };
  const choose = v => {
    if (multi) {
      onChange(sel.includes(v) ? sel.filter(x => x !== v) : [...sel, v]);
    } else {
      onChange(v);
      setOpen(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `mk-select ${open ? "open" : ""}`,
    ref: ref,
    style: width ? {
      width
    } : null
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mk-select__btn",
    onClick: toggle,
    "aria-haspopup": "listbox",
    "aria-expanded": open
  }, /*#__PURE__*/React.createElement("span", {
    className: `mk-select__val ${(multi ? sel.length : cur) ? "" : "placeholder"}`
  }, btnLabel), /*#__PURE__*/React.createElement("span", {
    className: "mk-select__chev",
    "aria-hidden": "true"
  }, "\u2304")), open && /*#__PURE__*/React.createElement("div", {
    className: `mk-select__pop ${up ? "up" : ""}`,
    role: "listbox"
  }, showSearch && /*#__PURE__*/React.createElement("input", {
    className: "mk-select__search",
    autoFocus: true,
    placeholder: "Ara\u2026",
    value: q,
    onChange: e => setQ(e.target.value),
    onClick: e => e.stopPropagation()
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "mk-select__empty"
  }, "Sonu\xE7 yok"), filtered.map((o, i) => {
    const header = o.group && o.group !== (filtered[i - 1] && filtered[i - 1].group) ? /*#__PURE__*/React.createElement("div", {
      key: "g" + o.group,
      className: "mk-select__group"
    }, o.group) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: o.value
    }, header, /*#__PURE__*/React.createElement("button", {
      type: "button",
      role: "option",
      "aria-selected": isOn(o.value),
      className: `mk-select__opt ${isOn(o.value) ? "on" : ""} ${o.group ? "is-sub" : ""}`,
      onClick: () => choose(o.value)
    }, multi && /*#__PURE__*/React.createElement("span", {
      className: `mk-select__box ${isOn(o.value) ? "on" : ""}`
    }, isOn(o.value) && /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 11
    })), /*#__PURE__*/React.createElement("span", null, o.label), !multi && isOn(o.value) && /*#__PURE__*/React.createElement("span", {
      className: "ck"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 13
    }))));
  })));
}

/* Right-side slide-in drawer. */
function Drawer({
  title,
  subtitle,
  onClose,
  children,
  footer
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "drawer-scrim",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "drawer",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer__h"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, title), subtitle && /*#__PURE__*/React.createElement("p", null, subtitle)), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: onClose,
    "aria-label": "Kapat"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "drawer__b"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "drawer__f"
  }, footer)));
}
Object.assign(window, {
  Icon,
  AdmCard,
  StatCard,
  Field,
  Switch,
  Seg,
  Badge,
  Modal,
  MkSelect,
  Drawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/admin-core.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/admin-data.js
try { (() => {
/* Admin mock data + AI helper. Classic script → window.MK_ADMIN.
   ai() uses the live Claude helper when available, else a graceful simulation
   so the panel works in any environment (downloaded, offline, etc.). */
(function () {
  const stats = [{
    label: "Ziyaretçi (30g)",
    val: "48.2K",
    delta: "+12.4%",
    dir: "up"
  }, {
    label: "Aktif Proje",
    val: "24",
    delta: "+3",
    dir: "up"
  }, {
    label: "Kurs Satışı",
    val: "₺182K",
    delta: "+8.1%",
    dir: "up"
  }, {
    label: "Dönüşüm",
    val: "3.8%",
    delta: "-0.3%",
    dir: "down"
  }];
  const posts = [{
    id: 1,
    title: "2026'da editoryal grid'ler neden geri döndü?",
    cat: "Görüş",
    status: "Yayında",
    date: "12 Haz 2026",
    author: "Deniz Arı",
    views: "4.2K"
  }, {
    id: 2,
    title: "Bir marka kimliğini nasıl kurguluyoruz",
    cat: "Süreç",
    status: "Yayında",
    date: "03 Haz 2026",
    author: "Ece Kaya",
    views: "2.8K"
  }, {
    id: 3,
    title: "Smooth scroll ve performans dengesi",
    cat: "Teknik",
    status: "Taslak",
    date: "—",
    author: "Mert Su",
    views: "—"
  }, {
    id: 4,
    title: "Stüdyoda bir hafta",
    cat: "Kültür",
    status: "Zamanlandı",
    date: "20 Haz 2026",
    author: "Su Demir",
    views: "—"
  }];
  const services = [
  // ── Ana hizmetler (parent: null) ──
  {
    id: "dev",
    name: "Geliştirme",
    desc: "Headless CMS, animasyon ve ölçeklenebilir yazılım.",
    active: true,
    parent: null
  }, {
    id: "design",
    name: "Tasarım",
    desc: "Marka, arayüz ve hareket tasarımı.",
    active: true,
    parent: null
  }, {
    id: "growth",
    name: "Büyüme & Pazarlama",
    desc: "Dönüşüm, performans ve görünürlük.",
    active: true,
    parent: null
  },
  // ── Geliştirme alt hizmetleri ──
  {
    id: "web",
    name: "Web Sitesi Geliştirme",
    desc: "Editoryal, performanslı ve erişilebilir web siteleri.",
    active: true,
    parent: "dev"
  }, {
    id: "mobile",
    name: "Mobil Uygulama",
    desc: "iOS & Android için native ve cross-platform uygulamalar.",
    active: true,
    parent: "dev"
  }, {
    id: "tool",
    name: "Yazılım Aracı",
    desc: "Panel, dashboard ve özel yazılım araçları.",
    active: true,
    parent: "dev"
  },
  // ── Tasarım alt hizmetleri ──
  {
    id: "uiux",
    name: "UI/UX Tasarım",
    desc: "Araştırma, akış kurgusu ve arayüz tasarımı.",
    active: true,
    parent: "design"
  }, {
    id: "brand",
    name: "Markalaşma",
    desc: "Strateji, isimlendirme ve marka kimlik sistemleri.",
    active: true,
    parent: "design"
  }, {
    id: "motion",
    name: "Motion & Etkileşim",
    desc: "Hareket tasarımı ve mikro etkileşimler.",
    active: true,
    parent: "design"
  },
  // ── Büyüme alt hizmetleri ──
  {
    id: "ecom",
    name: "E-ticaret",
    desc: "Dönüşüm odaklı mağaza ve ödeme deneyimleri.",
    active: true,
    parent: "growth"
  }, {
    id: "seo",
    name: "SEO & Performans",
    desc: "Teknik SEO, Core Web Vitals ve hız optimizasyonu.",
    active: false,
    parent: "growth"
  }];
  const projects = [{
    id: 1,
    title: "Atlas Finans",
    client: "Atlas Bank",
    cat: "Marka · Web",
    year: 2026,
    status: "Yayında",
    fields: {
      category: "MARKA · WEB",
      title: "Atlas Finans",
      client: "Atlas Bank",
      year: "2026",
      serviceIds: ["brand", "web", "uiux"],
      role: "Strateji & Tasarım",
      duration: "14 hafta",
      problem: "Atlas Bank, dijital bankacılığa geçişte güven veren ama hantal bir arayüzle anılıyordu. Yeni nesil kullanıcılar için marka fazla kurumsal, akışlar fazla karmaşıktı; mobil dönüşüm sektör ortalamasının altındaydı.",
      solution: "Markayı sıfırdan kurguladık: sade bir kelime-logo, net bir tipografik hiyerarşi ve tek bir güçlü vurgu rengi. Açılış akışını 11 adımdan 4 adıma indirdik, kritik işlemleri tek ekranda topladık.",
      body: "## Yaklaşım\nEditoryal bir grid ve bol negatif alanla güveni görünür kıldık. Her ekran tek bir işe odaklandı.\n\n## Sonuç\nLansman sonrası ilk çeyrekte mobil dönüşüm iki katına çıktı, destek talepleri belirgin biçimde azaldı.",
      metrics: [{
        id: "m1",
        label: "Mobil dönüşüm",
        before: "%1,9",
        after: "%4,3"
      }, {
        id: "m2",
        label: "Onboarding süresi",
        before: "6,2 dk",
        after: "2,1 dk"
      }, {
        id: "m3",
        label: "App Store puanı",
        before: "3,4",
        after: "4,8"
      }],
      quote: "Marka, dijital kimliğimizi tamamen yeniden tanımladı. Sonuçlar ilk aydan itibaren konuştu.",
      quoteAuthor: "Selin Demir",
      quoteRole: "Atlas Bank · Dijital Direktörü"
    }
  }, {
    id: 2,
    title: "Nova Spor Uygulaması",
    client: "Nova",
    cat: "UI/UX",
    year: 2026,
    status: "Yayında"
  }, {
    id: 3,
    title: "Pera Galeri",
    client: "Pera Sanat",
    cat: "Web",
    year: 2025,
    status: "Arşiv"
  }, {
    id: 4,
    title: "Venta E-ticaret",
    client: "Venta",
    cat: "E-ticaret",
    year: 2026,
    status: "Taslak"
  }];
  const courses = [{
    id: 1,
    title: "Sıfırdan Tasarım Sistemi",
    instructor: "Deniz Arı",
    students: 214,
    price: "₺1.299",
    rating: 4.9,
    status: "Yayında",
    fields: {
      title: "Sıfırdan Tasarım Sistemi",
      tagline: "Ölçeklenebilir bir tasarım sistemini adım adım kurun.",
      instructor: "Deniz Arı",
      category: "Tasarım",
      level: "Orta",
      lang: "Türkçe",
      currency: "₺",
      price: "1.299",
      salePrice: "899",
      rating: 4.9,
      desc: "Token'lardan bileşenlere, dokümantasyondan devir teslime kadar gerçek bir tasarım sistemi kurmayı öğreten uygulamalı kurs.\n\n## Kimler için?\nArayüz tasarımcıları ve front-end geliştiriciler için.",
      modules: [{
        id: "cm1",
        title: "Temeller",
        lessons: [{
          id: "l1",
          title: "Tasarım sistemi nedir?",
          dur: "08:30",
          type: "video",
          vsource: "url",
          videoUrl: "https://vimeo.com/000",
          free: true
        }, {
          id: "l2",
          title: "Token mimarisi",
          dur: "12:10",
          type: "video"
        }]
      }, {
        id: "cm2",
        title: "Bileşenler",
        lessons: [{
          id: "l3",
          title: "Buton anatomisi",
          dur: "10:45",
          type: "video"
        }, {
          id: "l4",
          title: "Kaynak dosyalar (Figma)",
          dur: "—",
          type: "link",
          url: "https://figma.com",
          linkLabel: "Figma'da aç"
        }, {
          id: "l5",
          title: "Varyant yönetimi",
          dur: "09:55",
          type: "doc"
        }]
      }, {
        id: "cm3",
        title: "Devir teslim",
        lessons: [{
          id: "l6",
          title: "Dokümantasyon",
          dur: "11:00",
          type: "text"
        }]
      }],
      outcomes: [{
        id: "o1",
        text: "Sıfırdan bir tasarım sistemi kurmak"
      }, {
        id: "o2",
        text: "Token ve değişken mimarisi tasarlamak"
      }, {
        id: "o3",
        text: "Takımca ölçeklenebilir bileşenler üretmek"
      }],
      requirements: [{
        id: "r1",
        text: "Temel Figma bilgisi"
      }, {
        id: "r2",
        text: "Arayüz tasarımına ilgi"
      }]
    }
  }, {
    id: 2,
    title: "Webflow ile Üretim",
    instructor: "Ece Kaya",
    students: 178,
    price: "₺899",
    rating: 4.8,
    status: "Yayında"
  }, {
    id: 3,
    title: "Motion & Etkileşim",
    instructor: "Mert Su",
    students: 96,
    price: "₺1.499",
    rating: 5.0,
    status: "Taslak"
  }];
  const products = [{
    id: 1,
    title: "Grid UI Kit",
    seller: "Marka Studio",
    sales: 312,
    price: "$ 59",
    type: "UI Kit",
    status: "Yayında",
    fields: {
      title: "Grid UI Kit",
      tagline: "Editoryal projeler için eksiksiz bir arayüz kiti.",
      type: "UI Kit",
      seller: "Marka Studio",
      format: "Figma",
      currency: "$",
      price: "59",
      license: "Ticari",
      desc: "240+ bileşen, 60 hazır ekran ve tam token sistemiyle gelen, editoryal projeler için tasarlanmış bir UI kit.",
      includes: [{
        id: "i1",
        text: "240+ bileşen"
      }, {
        id: "i2",
        text: "60 hazır ekran"
      }, {
        id: "i3",
        text: "Karanlık & aydınlık tema"
      }, {
        id: "i4",
        text: "Ücretsiz güncellemeler"
      }],
      specs: [{
        id: "s1",
        k: "Bileşen",
        v: "240+"
      }, {
        id: "s2",
        k: "Ekran",
        v: "60"
      }, {
        id: "s3",
        k: "Format",
        v: "Figma"
      }]
    }
  }, {
    id: 2,
    title: "Portfolyo Şablonu",
    seller: "Nova Labs",
    sales: 188,
    price: "$ 39",
    type: "Şablon",
    status: "Yayında"
  }, {
    id: 3,
    title: "İkon Seti — 240",
    seller: "Form Co.",
    sales: 521,
    price: "$ 29",
    type: "İkon Seti",
    status: "Yayında"
  }];
  const users = [{
    id: 1,
    name: "Deniz Arı",
    email: "deniz@marka.studio",
    role: "Yönetici",
    status: "Aktif"
  }, {
    id: 2,
    name: "Ece Kaya",
    email: "ece@marka.studio",
    role: "Editör",
    status: "Aktif"
  }, {
    id: 3,
    name: "Mert Su",
    email: "mert@marka.studio",
    role: "Yazar",
    status: "Davet edildi"
  }];
  const activity = [{
    who: "Ece Kaya",
    what: "‘Bir marka kimliği…’ yazısını yayınladı",
    when: "2 saat önce"
  }, {
    who: "Deniz Arı",
    what: "Atlas Finans projesini güncelledi",
    when: "5 saat önce"
  }, {
    who: "Sistem",
    what: "Haftalık AI raporu hazır",
    when: "Dün"
  }, {
    who: "Mert Su",
    what: "Yeni kurs taslağı oluşturdu",
    when: "2 gün önce"
  }];

  // ---- AI ----
  const SIM = {
    blog: topic => `# ${topic || "Başlıksız"}: editoryal bir bakış

Dijitalde fark yaratan markalar, sadelikten korkmayanlardır. ${topic || "Bu konu"} özelinde, bol negatif alan ve net bir tipografik hiyerarşi, mesajın önüne geçmeden onu güçlendirir.

## Neden önemli?
Kullanıcı ilk üç saniyede karar verir. Net bir başlık, tek bir çağrı ve ölçülü hareket; güven inşa eder.

## Pratik öneriler
— Tek bir vurgu rengi belirleyin ve tutarlı kullanın.
— Başlıkları kısa ve iddialı tutun.
— Her bölüme nefes alanı bırakın.

Sonuç olarak ${topic || "bu yaklaşım"}, markanızı kalabalıktan ayıran sessiz ama kararlı bir güven duygusu yaratır.`,
    report: () => `Haftalık Performans Özeti

Ziyaretçi trafiği geçen haftaya göre %12,4 arttı; en güçlü kanal organik arama (toplam oturumların %46'sı). Akademi gelirleri %8,1 yükselirken, dönüşüm oranındaki 0,3 puanlık düşüş, ödeme adımındaki sürtünmeye işaret ediyor.

Öne çıkanlar:
• "Sıfırdan Tasarım Sistemi" kursu, kayıtların %38'ini tek başına getirdi.
• Blog trafiği, "editoryal grid" yazısıyla zirve yaptı.

Öneri: Ödeme akışını 2 adıma indirin ve en çok okunan blog yazısının sonuna kurs CTA'sı ekleyin. Tahmini etki: dönüşümde +0,6 puan.`,
    seo: t => `Önerilen başlık: ${t || "Sayfa"} — Marka\nMeta açıklama: ${t || "Bu sayfa"} hakkında net, editoryal ve premium bir özet. 155 karakteri aşmayın.\nAnahtar kelimeler: kreatif ajans, marka tasarımı, ${(t || "dijital").toLowerCase()}.`
  };
  async function ai(prompt, sim) {
    const fallback = typeof sim === "function" ? sim() : sim || SIM.report();
    try {
      if (window.claude && typeof window.claude.complete === "function") {
        const text = await window.claude.complete(prompt);
        return text && text.trim() ? text.trim() : fallback;
      }
    } catch (e) {/* fall through to simulation */}
    // simulate latency
    await new Promise(r => setTimeout(r, 900));
    return fallback;
  }
  window.MK_ADMIN = {
    stats,
    posts,
    projects,
    services,
    courses,
    products,
    users,
    activity,
    ai,
    SIM,
    aiAvailable: !!(window.claude && window.claude.complete)
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/admin-data.js", error: String((e && e.message) || e) }); }

// ui_kits/admin/app.jsx
try { (() => {
/* Admin shell — sidebar nav, topbar, module routing. */
const {
  useState: useShState
} = React;
const NAV = [{
  group: "Genel",
  items: [{
    key: "dashboard",
    label: "Dashboard",
    icon: "dashboard"
  }, {
    key: "reports",
    label: "AI Raporlar",
    icon: "ai",
    tag: "AI"
  }]
}, {
  group: "İçerik",
  items: [{
    key: "content",
    label: "Blog",
    icon: "blog",
    tag: "AI"
  }, {
    key: "leads",
    label: "Talepler",
    icon: "users"
  }, {
    key: "bookings",
    label: "Randevular",
    icon: "appearance"
  }, {
    key: "projects",
    label: "Projeler",
    icon: "projects"
  }, {
    key: "profilecv",
    label: "Ben Kimim — CV",
    icon: "users"
  }, {
    key: "community",
    label: "Oyunlar & Topluluk",
    icon: "courses"
  }, {
    key: "services",
    label: "Hizmetler",
    icon: "settings"
  }, {
    key: "courses",
    label: "Kurslar",
    icon: "courses"
  }, {
    key: "market",
    label: "Market",
    icon: "market"
  }, {
    key: "media",
    label: "Medya",
    icon: "media"
  }]
}, {
  group: "Görünüm",
  items: [{
    key: "appearance",
    label: "Tema & Görünüm",
    icon: "appearance"
  }, {
    key: "pages",
    label: "Sayfalar",
    icon: "pages"
  }]
}, {
  group: "Sistem",
  items: [{
    key: "users",
    label: "Kullanıcılar",
    icon: "users"
  }, {
    key: "seo",
    label: "SEO & Meta",
    icon: "seo",
    tag: "AI"
  }, {
    key: "settings",
    label: "Ayarlar",
    icon: "settings"
  }]
}];
const ROUTES = {
  dashboard: {
    title: "Dashboard",
    sub: "Sitenin genel görünümü",
    comp: go => /*#__PURE__*/React.createElement(Dashboard, {
      go: go
    })
  },
  pages: {
    title: "Sayfalar",
    sub: "Sayfaları ve bölümleri düzenle",
    comp: () => /*#__PURE__*/React.createElement(PagesM, null)
  },
  reports: {
    title: "AI Raporlar",
    sub: "Yapay zekâ ile içgörü ve raporlar",
    comp: () => /*#__PURE__*/React.createElement(Reports, null)
  },
  content: {
    title: "Blog & İçerik",
    sub: "Yazıları yönet, AI ile üret",
    comp: () => /*#__PURE__*/React.createElement(Content, null)
  },
  leads: {
    title: "Talepler / Lead",
    sub: "Teklif ve iletişim talepleri",
    comp: () => /*#__PURE__*/React.createElement(Leads, null)
  },
  bookings: {
    title: "Randevular",
    sub: "Keşif görüşmeleri",
    comp: () => /*#__PURE__*/React.createElement(Bookings, null)
  },
  projects: {
    title: "Projeler",
    sub: "Portfolyo yönetimi",
    comp: () => /*#__PURE__*/React.createElement(Projects, null)
  },
  profilecv: {
    title: "Ben Kimim — CV",
    sub: "Kariyer profili sayfası içeriği",
    comp: () => /*#__PURE__*/React.createElement(ProfileCV, null)
  },
  community: {
    title: "Oyunlar & Topluluk",
    sub: "Oyunları ve koleksiyonları yönet",
    comp: () => /*#__PURE__*/React.createElement(CommunityAdmin, null)
  },
  services: {
    title: "Hizmetler",
    sub: "Sunduğunuz hizmetler — projelere atanır",
    comp: () => /*#__PURE__*/React.createElement(ServicesM, null)
  },
  courses: {
    title: "Akademi — Kurslar",
    sub: "Kursları yönet",
    comp: () => /*#__PURE__*/React.createElement(Courses, null)
  },
  market: {
    title: "Market",
    sub: "Dijital ürünler",
    comp: () => /*#__PURE__*/React.createElement(MarketM, null)
  },
  media: {
    title: "Medya Kütüphanesi",
    sub: "Görseller ve dosyalar",
    comp: () => /*#__PURE__*/React.createElement(Media, null)
  },
  appearance: {
    title: "Tema & Görünüm",
    sub: "Header, renk paleti, font — canlı",
    comp: () => /*#__PURE__*/React.createElement(Appearance, null)
  },
  users: {
    title: "Kullanıcılar & Roller",
    sub: "Ekip erişimi",
    comp: () => /*#__PURE__*/React.createElement(Users, null)
  },
  seo: {
    title: "SEO & Meta",
    sub: "Arama motoru optimizasyonu",
    comp: () => /*#__PURE__*/React.createElement(SEO, null)
  },
  settings: {
    title: "Genel Ayarlar",
    sub: "Site geneli yapılandırma",
    comp: () => /*#__PURE__*/React.createElement(Settings, null)
  }
};
function AdminShell() {
  const [view, setView] = useShState("dashboard");
  const [menu, setMenu] = useShState(false);
  const BRAND = window.MARKA && window.MARKA.BRAND_NAME || "Marka";
  const route = ROUTES[view];
  const go = k => {
    setView(k);
    setMenu(false);
  };
  const toggleTheme = () => window.MarkaTheme.set({
    mode: window.MarkaTheme.get().mode === "dark" ? "light" : "dark"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: `adm ${menu ? "menu-open" : ""}`
  }, menu && /*#__PURE__*/React.createElement("div", {
    className: "adm-scrim",
    onClick: () => setMenu(false),
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("aside", {
    className: "adm-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-side__brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand"
  }, BRAND, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, ".")), /*#__PURE__*/React.createElement("span", {
    className: "adm-side__badge"
  }, "Admin")), /*#__PURE__*/React.createElement("nav", {
    className: "adm-nav"
  }, NAV.map(g => /*#__PURE__*/React.createElement("div", {
    className: "adm-nav__group",
    key: g.group
  }, /*#__PURE__*/React.createElement("h5", null, g.group), g.items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.key,
    className: `adm-nav__item ${view === it.key ? "is-active" : ""}`,
    onClick: () => go(it.key)
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-nav__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 18
  })), it.label, it.tag && /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, it.tag)))))), /*#__PURE__*/React.createElement("div", {
    className: "adm-side__user"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av"
  }, "DA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Deniz Ar\u0131"), /*#__PURE__*/React.createElement("span", null, "Y\xF6netici")))), /*#__PURE__*/React.createElement("div", {
    className: "adm-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-mobilebar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setMenu(m => !m),
    "aria-label": "Men\xFC"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "brand",
    style: {
      fontWeight: 700
    }
  }, BRAND, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "."))), /*#__PURE__*/React.createElement("header", {
    className: "adm-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-top__title"
  }, route.title), /*#__PURE__*/React.createElement("div", {
    className: "adm-top__sub"
  }, route.sub)), /*#__PURE__*/React.createElement("div", {
    className: "adm-top__search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Ara\u2026"
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: toggleTheme,
    "aria-label": "Tema",
    style: {
      width: 38,
      height: 38
    }
  }, window.MarkaTheme.get().mode === "dark" ? "☀" : "☾"), /*#__PURE__*/React.createElement("a", {
    className: "adm-btn adm-btn--ghost",
    href: "../website/index.html",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 15
  }), " Siteyi G\xF6r")), /*#__PURE__*/React.createElement("main", {
    className: "adm-body"
  }, route.comp(go))), /*#__PURE__*/React.createElement(MediaPicker, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(AdminShell, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/blog-editor.jsx
try { (() => {
/* Comprehensive blog editor — pick a layout template, fill blocks (text +
   images), see a live preview, publish. Real cover + inline + gallery images. */
const {
  useState: useBState
} = React;
const AD = () => window.MK_ADMIN;
const BLOG_TPLS = [{
  id: "standart",
  label: "Standart Makale",
  desc: "Kapak, spot, gövde ve araya görsel",
  vis: ["img", "bar", "bar"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Kapak görseli"
  }, {
    k: "kicker",
    t: "kicker",
    label: "Kategori / üst başlık"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Spot / giriş"
  }, {
    k: "body",
    t: "rich",
    label: "Gövde metni",
    ai: true
  }, {
    k: "image",
    t: "image",
    label: "Araya görsel"
  }, {
    k: "body2",
    t: "rich",
    label: "Devam metni"
  }]
}, {
  id: "foto",
  label: "Foto Hikâye",
  desc: "Görsel ağırlıklı, galeri düzeni",
  vis: ["img", "row2"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Büyük kapak"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Giriş"
  }, {
    k: "gallery",
    t: "gallery",
    label: "Foto galerisi"
  }, {
    k: "body",
    t: "rich",
    label: "Kapanış notu",
    ai: true
  }]
}, {
  id: "roportaj",
  label: "Röportaj",
  desc: "Soru–cevap düzeni",
  vis: ["bar", "qa", "qa"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Kapak görseli"
  }, {
    k: "kicker",
    t: "kicker",
    label: "Konuk"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Giriş"
  }, {
    k: "qa",
    t: "qa",
    label: "Soru & Cevaplar"
  }]
}, {
  id: "rehber",
  label: "Liste / Rehber",
  desc: "Numaralı adımlar",
  vis: ["bar", "step", "step"],
  blocks: [{
    k: "cover",
    t: "cover",
    label: "Kapak görseli"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "lead",
    t: "lead",
    label: "Giriş"
  }, {
    k: "list",
    t: "list",
    label: "Adımlar / maddeler"
  }]
}, {
  id: "minimal",
  label: "Minimal Deneme",
  desc: "Yalnızca tipografi, kapaksız",
  vis: ["bar", "bar", "bars"],
  blocks: [{
    k: "kicker",
    t: "kicker",
    label: "Üst başlık"
  }, {
    k: "title",
    t: "title",
    label: "Başlık"
  }, {
    k: "body",
    t: "rich",
    label: "Metin",
    ai: true
  }]
}];
function renderRich(text) {
  if (!text) return null;
  return text.split(/\n{2,}/).map((para, i) => {
    const t = para.trim();
    if (/^##\s+/.test(t)) return /*#__PURE__*/React.createElement("h2", {
      key: i
    }, t.replace(/^##\s+/, ""));
    if (/^#\s+/.test(t)) return /*#__PURE__*/React.createElement("h2", {
      key: i
    }, t.replace(/^#\s+/, ""));
    return /*#__PURE__*/React.createElement("p", {
      key: i
    }, t);
  });
}

/* ---- repeatable blocks ---- */
function QARepeater({
  items = [],
  onChange
}) {
  const add = () => onChange([...items, {
    id: Date.now() + Math.random(),
    q: "",
    a: ""
  }]);
  const upd = (id, p) => onChange(items.map(x => x.id === id ? {
    ...x,
    ...p
  } : x));
  return /*#__PURE__*/React.createElement("div", null, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "blk",
    key: it.id
  }, /*#__PURE__*/React.createElement("button", {
    className: "blk__x",
    onClick: () => onChange(items.filter(x => x.id !== it.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 12
  })), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    placeholder: `Soru ${i + 1}`,
    value: it.q,
    onChange: e => upd(it.id, {
      q: e.target.value
    })
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "4rem"
    },
    placeholder: "Cevap",
    value: it.a,
    onChange: e => upd(it.id, {
      a: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost blk-add",
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Soru ekle"));
}
function ListRepeater({
  items = [],
  onChange
}) {
  const add = () => onChange([...items, {
    id: Date.now() + Math.random(),
    h: "",
    text: "",
    img: null
  }]);
  const upd = (id, p) => onChange(items.map(x => x.id === id ? {
    ...x,
    ...p
  } : x));
  return /*#__PURE__*/React.createElement("div", null, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "blk",
    key: it.id
  }, /*#__PURE__*/React.createElement("button", {
    className: "blk__x",
    onClick: () => onChange(items.filter(x => x.id !== it.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 12
  })), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    placeholder: `${i + 1}. başlık`,
    value: it.h,
    onChange: e => upd(it.id, {
      h: e.target.value
    })
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "3.5rem"
    },
    placeholder: "A\xE7\u0131klama",
    value: it.text,
    onChange: e => upd(it.id, {
      text: e.target.value
    })
  }), /*#__PURE__*/React.createElement(ImageUpload, {
    ratio: "16/9",
    value: it.img,
    onChange: v => upd(it.id, {
      img: v
    }),
    label: "G\xF6rsel (ops.)"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost blk-add",
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Madde ekle"));
}

/* ---- form + preview per block ---- */
function BlockForm({
  block,
  value,
  setVal,
  onAI,
  aiBusy
}) {
  const t = block.t;
  if (t === "cover") return /*#__PURE__*/React.createElement(ImageUpload, {
    label: block.label,
    ratio: "21/9",
    value: value,
    onChange: setVal,
    hint: "\xF6neri 2000\xD7860"
  });
  if (t === "image") return /*#__PURE__*/React.createElement(ImageUpload, {
    label: block.label,
    ratio: "16/9",
    value: value,
    onChange: setVal
  });
  if (t === "gallery") return /*#__PURE__*/React.createElement(GalleryUpload, {
    label: block.label,
    items: value || [],
    onChange: setVal
  });
  if (t === "qa") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement(QARepeater, {
    items: value || [],
    onChange: setVal
  }));
  if (t === "list") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement(ListRepeater, {
    items: value || [],
    onChange: setVal
  }));
  if (t === "title") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    style: {
      fontSize: "1.1rem",
      fontWeight: 600
    },
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "Etkileyici bir ba\u015Fl\u0131k\u2026"
  }));
  if (t === "kicker") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "\xF6rn. G\xF6r\xFC\u015F"
  }));
  if (t === "lead") return /*#__PURE__*/React.createElement(Field, {
    label: block.label
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "4rem"
    },
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "Tek paragrafl\u0131k \xE7arp\u0131c\u0131 giri\u015F\u2026"
  }));
  // rich
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, block.label, block.ai && /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: ".3rem .7rem"
    },
    disabled: aiBusy,
    onClick: onAI
  }, aiBusy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderTopColor: "transparent",
      borderColor: "var(--accent)"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI ile yaz"))), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "11rem"
    },
    value: value || "",
    onChange: e => setVal(e.target.value),
    placeholder: "Paragraflar\u0131 bo\u015F sat\u0131rla ay\u0131r\u0131n. Alt ba\u015Fl\u0131k i\xE7in sat\u0131r ba\u015F\u0131na ## yaz\u0131n."
  }));
}
function BlockPreview({
  block,
  value
}) {
  const t = block.t;
  if (t === "cover") return /*#__PURE__*/React.createElement("div", {
    className: "pv__cover"
  }, value ? /*#__PURE__*/React.createElement("img", {
    src: value,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "KAPAK G\xD6RSEL\u0130"));
  if (t === "kicker") return value ? /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, value) : null;
  if (t === "title") return /*#__PURE__*/React.createElement("h1", null, value || "Yazı başlığı buraya");
  if (t === "lead") return value ? /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, value) : null;
  if (t === "rich") return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem"
    }
  }, renderRich(value));
  if (t === "image") return /*#__PURE__*/React.createElement("figure", null, value ? /*#__PURE__*/React.createElement("img", {
    className: "inl",
    src: value,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "ARAYA G\xD6RSEL"));
  if (t === "gallery") return value && value.length ? /*#__PURE__*/React.createElement("div", {
    className: "pv__gal"
  }, value.map(g => /*#__PURE__*/React.createElement("figure", {
    key: g.id
  }, /*#__PURE__*/React.createElement("img", {
    src: g.src,
    alt: ""
  }), g.caption && /*#__PURE__*/React.createElement("figcaption", null, g.caption)))) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "FOTO GALER\u0130S\u0130");
  if (t === "qa") return value && value.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.1rem"
    }
  }, value.map(x => /*#__PURE__*/React.createElement("div", {
    className: "pv__qa",
    key: x.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "q"
  }, x.q || "Soru?"), /*#__PURE__*/React.createElement("span", {
    className: "a"
  }, x.a || "Cevap…")))) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "SORU & CEVAP");
  if (t === "list") return value && value.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.3rem"
    }
  }, value.map((x, i) => /*#__PURE__*/React.createElement("div", {
    className: "pv__step",
    key: x.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: ".5rem"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, x.h || "Adım"), x.text && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, x.text), x.img && /*#__PURE__*/React.createElement("img", {
    className: "inl",
    src: x.img,
    alt: ""
  }))))) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "ADIMLAR");
  return null;
}
function BlogEditor({
  post,
  onClose,
  onSave
}) {
  const init = post && post.fields ? post : post && post.title ? {
    id: post.id,
    template: "standart",
    status: post.status || "Taslak",
    fields: {
      title: post.title,
      kicker: post.cat,
      lead: post.excerpt || ""
    }
  } : {
    id: post && post.id,
    template: null,
    status: "Taslak",
    fields: {}
  };
  const [data, setData] = useBState(init);
  const [aiBusy, setAiBusy] = useBState(false);
  const tpl = BLOG_TPLS.find(t => t.id === data.template);
  const setField = (k, v) => setData(d => ({
    ...d,
    fields: {
      ...d.fields,
      [k]: v
    }
  }));
  const aiWrite = async () => {
    setAiBusy(true);
    const topic = data.fields.title || data.fields.kicker || "kreatif tasarım";
    const out = await AD().ai(`"${topic}" konusunda Türkçe, premium editoryal tonda bir blog gövdesi yaz. Paragrafları boş satırla ayır, alt başlık için "## " kullan. Sonunda yeni satırda "ÖZET:" ve tek cümle ekle.`, () => AD().SIM.blog(topic));
    let body = out,
      lead = data.fields.lead;
    const m = out.split(/ÖZET\s*:/i);
    if (m.length > 1) {
      body = m[0].trim();
      lead = m[1].trim();
    }
    const tm = body.match(/^#\s*(.+)$/m);
    if (tm) body = body.replace(/^#\s*.+$/m, "").trim();
    setData(d => ({
      ...d,
      fields: {
        ...d.fields,
        body,
        lead: d.fields.lead || lead,
        title: d.fields.title || (tm ? tm[1] : topic)
      }
    }));
    setAiBusy(false);
  };
  const save = status => {
    const f = data.fields;
    onSave({
      id: data.id,
      template: data.template,
      status,
      fields: f,
      title: f.title || "Başlıksız",
      cat: f.kicker || "Görüş",
      cover: f.cover || null,
      date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) : "—",
      author: "Sen",
      views: "—"
    });
  };

  // template picker
  if (!tpl) {
    return /*#__PURE__*/React.createElement(AdmCard, {
      title: "Yeni yaz\u0131 \u2014 \u015Fablon se\xE7",
      desc: "Konseptine uygun bir d\xFCzenle ba\u015Fla",
      action: /*#__PURE__*/React.createElement("button", {
        className: "ed-back",
        onClick: onClose
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "close",
        size: 15
      }), " Kapat")
    }, /*#__PURE__*/React.createElement("div", {
      className: "btpl-grid"
    }, BLOG_TPLS.map(t => /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: "btpl",
      onClick: () => setData(d => ({
        ...d,
        template: t.id
      }))
    }, /*#__PURE__*/React.createElement("div", {
      className: "btpl__vis"
    }, t.vis.map((v, i) => v === "img" ? /*#__PURE__*/React.createElement("b", {
      key: i,
      className: "img"
    }) : v === "row2" ? /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "row"
    }, /*#__PURE__*/React.createElement("b", {
      className: "img"
    }), /*#__PURE__*/React.createElement("b", {
      className: "img"
    })) : v === "qa" ? /*#__PURE__*/React.createElement("i", {
      key: i,
      className: "bar",
      style: {
        width: "60%"
      }
    }) : v === "step" ? /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "row",
      style: {
        flex: "none",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "bar",
      style: {
        width: 18,
        height: 18,
        borderRadius: 9
      }
    }), /*#__PURE__*/React.createElement("i", {
      className: "bar",
      style: {
        flex: 1
      }
    })) : v === "bars" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
      key: i,
      className: "bar"
    }), /*#__PURE__*/React.createElement("i", {
      className: "bar",
      style: {
        width: "80%"
      }
    })) : /*#__PURE__*/React.createElement("i", {
      key: i,
      className: "bar",
      style: {
        width: i ? "70%" : "100%"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "btpl__b"
    }, /*#__PURE__*/React.createElement("h4", null, t.label), /*#__PURE__*/React.createElement("p", null, t.desc))))));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: () => setData(d => ({
      ...d,
      template: null
    }))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " \u015Eablonu de\u011Fi\u015Ftir"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, tpl.label), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement(MkSelect, {
    width: "160px",
    value: data.status,
    onChange: v => setData(d => ({
      ...d,
      status: v
    })),
    options: ["Taslak", "Zamanlandı", "Yayında"]
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => save("Taslak")
  }, "Tasla\u011Fa kaydet"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => save("Yayında")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  }), " Yay\u0131nla")), /*#__PURE__*/React.createElement("div", {
    className: "editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor__form"
  }, tpl.blocks.map(b => /*#__PURE__*/React.createElement(BlockForm, {
    key: b.k,
    block: b,
    value: data.fields[b.k],
    setVal: v => setField(b.k, v),
    onAI: aiWrite,
    aiBusy: aiBusy
  }))), /*#__PURE__*/React.createElement("div", {
    className: "editor__preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "canl\u0131 \xF6nizleme \u2014 blog yaz\u0131s\u0131")), /*#__PURE__*/React.createElement("div", {
    className: "prev-scroll"
  }, /*#__PURE__*/React.createElement("article", {
    className: "pv"
  }, tpl.blocks.map(b => /*#__PURE__*/React.createElement(BlockPreview, {
    key: b.k,
    block: b,
    value: data.fields[b.k]
  }))))))));
}
function BlogWizard({
  onClose,
  onSave
}) {
  const [step, setStep] = useBState(1);
  const [topic, setTopic] = useBState("");
  const [custom, setCustom] = useBState("");
  const [steer, setSteer] = useBState("");
  const [sugs, setSugs] = useBState(["2026'da editoryal tasarım trendleri", "Marka kimliğinde tipografinin rolü", "Web'de mikro etkileşimlerin gücü", "Tasarım sistemleri nasıl ölçeklenir?", "Kreatif ekiplerde süreç yönetimi"]);
  const [data, setData] = useBState(null);
  const [busy, setBusy] = useBState(false);
  const genImg = hue => {
    const c = document.createElement("canvas");
    c.width = 480;
    c.height = 360;
    const x = c.getContext("2d");
    const h = ((150 + hue) % 360 + 360) % 360;
    const g = x.createLinearGradient(0, 0, 480, 360);
    g.addColorStop(0, `hsl(${h} 62% 72%)`);
    g.addColorStop(1, `hsl(${(h + 40) % 360} 30% 90%)`);
    x.fillStyle = g;
    x.fillRect(0, 0, 480, 360);
    x.fillStyle = "rgba(255,255,255,.45)";
    x.beginPath();
    x.arc(360, 110, 64, 0, 7);
    x.fill();
    return c.toDataURL("image/png");
  };
  const suggest = async () => {
    setBusy(true);
    const out = await AD().ai(`"${steer || "kreatif ajans, tasarım, marka"}" temasında bir blog için 5 özgün Türkçe başlık öner. Her satıra bir başlık yaz; numara veya işaret koyma.`, () => sugs.join("\n"));
    const list = out.split("\n").map(s => s.replace(/^[-•\d.\)\s]+/, "").trim()).filter(Boolean).slice(0, 6);
    if (list.length) setSugs(list);
    setBusy(false);
  };
  const generate = async tplId => {
    setStep(3);
    setBusy(true);
    setData(null);
    const t = BLOG_TPLS.find(x => x.id === tplId);
    const out = await AD().ai(`"${topic}" konusunda Türkçe, premium ve editoryal tonda bir blog yazısı yaz. TAM olarak şu formatta yanıt ver:\nKICKER: <tek kelimelik kategori>\nLEAD: <tek cümlelik çarpıcı giriş>\nBODY:\n<gövde metni, paragrafları boş satırla ayır, alt başlık için ## kullan>`, () => `KICKER: Görüş\nLEAD: ${topic} üzerine kısa bir giriş.\nBODY:\n${AD().SIM.blog(topic)}`);
    const kicker = ((out.match(/KICKER\s*:\s*(.+)/i) || [])[1] || "Görüş").trim();
    const lead = ((out.match(/LEAD\s*:\s*(.+)/i) || [])[1] || "").trim();
    const body = (out.split(/BODY\s*:/i)[1] || out).replace(/^#\s*.+$/m, "").trim();
    const f = {};
    t.blocks.forEach((b, i) => {
      if (b.t === "title") f[b.k] = topic;else if (b.t === "kicker") f[b.k] = kicker;else if (b.t === "lead") f[b.k] = lead;else if (b.t === "rich") f[b.k] = body;else if (b.t === "cover" || b.t === "image") f[b.k] = genImg(i * 60 + 20);else if (b.t === "gallery") f[b.k] = [0, 1, 2, 3].map(g => ({
        id: Date.now() + g + Math.random(),
        src: genImg(g * 70),
        caption: ""
      }));else if (b.t === "qa") f[b.k] = [{
        id: 1,
        q: `${topic} nedir?`,
        a: lead || "…"
      }, {
        id: 2,
        q: "Neden önemli?",
        a: "Markanın dijitalde fark yaratması için kritik."
      }];else if (b.t === "list") f[b.k] = [{
        id: 1,
        h: "Net bir yön belirleyin",
        text: lead,
        img: genImg(30)
      }, {
        id: 2,
        h: "Tutarlı uygulayın",
        text: "Tek bir vurgu ve ritim.",
        img: null
      }];
    });
    setData({
      template: tplId,
      status: "Taslak",
      fields: f
    });
    setBusy(false);
  };
  const save = status => {
    const f = data.fields;
    onSave({
      template: data.template,
      status,
      fields: f,
      title: f.title || topic,
      cat: f.kicker || "Görüş",
      cover: f.cover || null,
      date: status === "Yayında" ? new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) : "—",
      author: "AI",
      views: "—"
    });
  };
  const Steps = () => /*#__PURE__*/React.createElement("div", {
    className: "wiz-steps"
  }, [["1", "Konu"], ["2", "Şablon"], ["3", "Üret & önizle"]].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: `wiz-step ${+n === step ? "on" : ""} ${+n < step ? "done" : ""}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "wiz-step__n"
  }, +n < step ? "✓" : n), l)));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " Kapat"), /*#__PURE__*/React.createElement("span", {
    className: "ai-chip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 12,
    fill: true
  }), " AI Yaz\u0131 Sihirbaz\u0131"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement(Steps, null)), step === 1 && /*#__PURE__*/React.createElement(AdmCard, {
    title: "Konu se\xE7",
    desc: "AI'\u0131n \xF6nerdi\u011Fi konulardan se\xE7 ya da y\xF6nlendir"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ai-row",
    style: {
      marginBottom: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "AI'\u0131 y\xF6nlendir (tema/anahtar kelime)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: steer,
    onChange: e => setSteer(e.target.value),
    placeholder: "\xF6rn. motion tasar\u0131m, SaaS markala\u015Fma",
    onKeyDown: e => e.key === "Enter" && suggest()
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    disabled: busy,
    onClick: suggest,
    style: {
      marginBottom: 16
    }
  }, busy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14
  }), " Konu \xF6ner"))), /*#__PURE__*/React.createElement("div", {
    className: "wiz-chips"
  }, sugs.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "wiz-chip",
    onClick: () => {
      setTopic(s);
      setStep(2);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " ", s))), /*#__PURE__*/React.createElement("div", {
    className: "pick-sep"
  }, "veya kendi konunu yaz"), /*#__PURE__*/React.createElement("div", {
    className: "ai-row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: custom,
    onChange: e => setCustom(e.target.value),
    placeholder: "Kendi ba\u015Fl\u0131k fikrin\u2026",
    onKeyDown: e => e.key === "Enter" && custom.trim() && (setTopic(custom.trim()), setStep(2))
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    disabled: !custom.trim(),
    onClick: () => {
      setTopic(custom.trim());
      setStep(2);
    }
  }, "Devam ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192")))), step === 2 && /*#__PURE__*/React.createElement(AdmCard, {
    title: "\u015Eablon se\xE7",
    desc: `Konu: “${topic}” · düzene uygun bir şablon seç`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "ed-back",
      onClick: () => setStep(1)
    }, "\u2190 Konu")
  }, /*#__PURE__*/React.createElement("div", {
    className: "btpl-grid"
  }, BLOG_TPLS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: "btpl",
    onClick: () => generate(t.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "btpl__vis"
  }, t.vis.map((v, i) => v === "img" ? /*#__PURE__*/React.createElement("b", {
    key: i,
    className: "img"
  }) : v === "row2" ? /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row"
  }, /*#__PURE__*/React.createElement("b", {
    className: "img"
  }), /*#__PURE__*/React.createElement("b", {
    className: "img"
  })) : v === "qa" ? /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "bar",
    style: {
      width: "60%"
    }
  }) : v === "step" ? /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "row",
    style: {
      flex: "none",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bar",
    style: {
      width: 18,
      height: 18,
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "bar",
    style: {
      flex: 1
    }
  })) : v === "bars" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "bar"
  }), /*#__PURE__*/React.createElement("i", {
    className: "bar",
    style: {
      width: "80%"
    }
  })) : /*#__PURE__*/React.createElement("i", {
    key: i,
    className: "bar",
    style: {
      width: i ? "70%" : "100%"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "btpl__b"
  }, /*#__PURE__*/React.createElement("h4", null, t.label), /*#__PURE__*/React.createElement("p", null, t.desc)))))), step === 3 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: () => setStep(2)
  }, "\u2190 \u015Eablon"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, (BLOG_TPLS.find(t => t.id === (data && data.template)) || {}).label || "Üretiliyor"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--danger",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }), " Sil"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    disabled: busy || !data,
    onClick: () => save("Taslak")
  }, "Tasla\u011Fa kaydet"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    disabled: busy || !data,
    onClick: () => save("Yayında")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  }), " Yay\u0131nla")), busy || !data ? /*#__PURE__*/React.createElement("div", {
    className: "adm-empty"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 12
    }
  }, "AI i\xE7erik ve g\xF6rseller \xFCretiliyor\u2026"), /*#__PURE__*/React.createElement("p", null, "\u201C", topic, "\u201D i\xE7in metinler ve g\xF6rsel alanlar\u0131 dolduruluyor.")) : /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI \xF6nizleme \u2014 yay\u0131na haz\u0131r"), /*#__PURE__*/React.createElement("div", {
    className: "prev-scroll"
  }, /*#__PURE__*/React.createElement("article", {
    className: "pv"
  }, BLOG_TPLS.find(t => t.id === data.template).blocks.map(b => /*#__PURE__*/React.createElement(BlockPreview, {
    key: b.k,
    block: b,
    value: data.fields[b.k]
  })))))));
}
Object.assign(window, {
  BlogEditor,
  BlogWizard,
  BLOG_TPLS,
  renderRich
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/blog-editor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/bookings.jsx
try { (() => {
/* Admin "Randevular" — discovery-call bookings list. Reads window.MarkaBookings. */
const {
  useState: useBkState,
  useEffect: useBkEffect
} = React;
const BK = () => window.MarkaBookings;
const BK_TONE = {
  "Onaylı": "green",
  "Bekliyor": "warn",
  "İptal": "muted"
};
function bkDate(d) {
  try {
    return new Date(d + "T00:00").toLocaleDateString("tr-TR", {
      weekday: "short",
      day: "2-digit",
      month: "long"
    });
  } catch (e) {
    return d;
  }
}
function Bookings() {
  const [, force] = useBkState(0);
  useBkEffect(() => {
    if (!BK()) return;
    return BK().subscribe(() => force(n => n + 1));
  }, []);
  if (!BK()) return null;
  const list = BK().list();
  const upcoming = list.filter(b => b.date >= new Date().toISOString().slice(0, 10) && b.status !== "İptal");
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Randevular",
    desc: `${upcoming.length} yaklaşan görüşme · ${list.length} toplam`
  }, !list.length ? /*#__PURE__*/React.createElement("div", {
    className: "adm-empty"
  }, /*#__PURE__*/React.createElement("p", null, "Hen\xFCz randevu yok.")) : /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Tarih & Saat"), /*#__PURE__*/React.createElement("th", null, "Ki\u015Fi"), /*#__PURE__*/React.createElement("th", null, "Konu"), /*#__PURE__*/React.createElement("th", null, "Durum"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, list.map(b => /*#__PURE__*/React.createElement("tr", {
    key: b.id,
    className: `bk-row bk-row--${b.status === "Onaylı" ? "ok" : b.status === "İptal" ? "no" : "wait"}`
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "bk-when"
  }, /*#__PURE__*/React.createElement("b", null, bkDate(b.date)), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, b.slot))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "bk-who"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ti"
  }, b.name), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${b.email}`,
    className: "mono"
  }, b.email))), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, b.topic), /*#__PURE__*/React.createElement("td", {
    style: {
      minWidth: 130
    }
  }, /*#__PURE__*/React.createElement(MkSelect, {
    width: "130px",
    value: b.status,
    onChange: v => BK().update(b.id, {
      status: v
    }),
    options: BK().STATUSES
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => BK().remove(b.id),
    "aria-label": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))))))));
}
Object.assign(window, {
  Bookings
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/bookings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/community-admin.jsx
try { (() => {
/* Admin "Oyunlar & Topluluk" — toggle homepage games on/off, set daily play
   limit, and manage collections. Reads window.MarkaCommunity. */
const {
  useState: useCmaState,
  useEffect: useCmaEffect
} = React;
const CMA = () => window.MarkaCommunity;
const GAME_LABELS = {
  memory: "Hafıza Eşleştirme",
  sequence: "Sıralı Dikkat",
  reaction: "Refleks"
};
function CommunityAdmin() {
  const [cfg, setCfg] = useCmaState(CMA() ? CMA().get() : null);
  useCmaEffect(() => {
    if (!CMA()) return;
    return CMA().subscribe(() => setCfg(CMA().get()));
  }, []);
  if (!cfg) return null;
  const save = patch => {
    CMA().set(patch);
    setCfg(CMA().get());
  };
  const setGame = (id, on) => save({
    games: Object.assign({}, cfg.games, {
      [id]: on
    })
  });
  const setColl = (id, patch) => save({
    collections: cfg.collections.map(c => c.id === id ? Object.assign({}, c, patch) : c)
  });
  const addColl = () => save({
    collections: cfg.collections.concat([{
      id: "k" + Date.now(),
      title: "Yeni Koleksiyon",
      count: 0,
      hue: 0,
      base: 0
    }])
  });
  const delColl = id => save({
    collections: cfg.collections.filter(c => c.id !== id)
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-stack",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Zihin Oyunlar\u0131",
    desc: "Anasayfadaki oyunlar\u0131 y\xF6net"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, Object.keys(GAME_LABELS).map(id => /*#__PURE__*/React.createElement("label", {
    key: id,
    className: "swrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swrow__txt"
  }, /*#__PURE__*/React.createElement("b", null, GAME_LABELS[id]), /*#__PURE__*/React.createElement("span", null, "Anasayfada g\xF6ster")), /*#__PURE__*/React.createElement(Switch, {
    on: cfg.games[id] !== false,
    onChange: v => setGame(id, v)
  })))), /*#__PURE__*/React.createElement(Field, {
    label: `Günlük oynama hakkı: ${cfg.dailyLimit}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg seg--wrap"
  }, [1, 2, 3, 5].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    className: `seg__btn ${cfg.dailyLimit === n ? "on" : ""}`,
    onClick: () => save({
      dailyLimit: n
    })
  }, n, "/g\xFCn"))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Koleksiyonlar",
    desc: `${cfg.collections.length} koleksiyon`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: addColl
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " Ekle")
  }, /*#__PURE__*/React.createElement("div", {
    className: "cvrep"
  }, cfg.collections.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "cvrep-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cvrep-item__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cvrep-item__n"
  }, "#", c.id), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => delColl(c.id),
    "aria-label": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 90px 90px 100px",
      gap: ".5rem"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: c.title,
    onChange: e => setColl(c.id, {
      title: e.target.value
    }),
    placeholder: "Ba\u015Fl\u0131k"
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    type: "number",
    value: c.count,
    onChange: e => setColl(c.id, {
      count: +e.target.value
    }),
    placeholder: "Proje"
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    type: "number",
    value: c.base,
    onChange: e => setColl(c.id, {
      base: +e.target.value
    }),
    placeholder: "Takip\xE7i"
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    type: "number",
    value: c.hue,
    onChange: e => setColl(c.id, {
      hue: +e.target.value
    }),
    placeholder: "Renk"
  })))))));
}
Object.assign(window, {
  CommunityAdmin
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/community-admin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/course-editor.jsx
try { (() => {
/* Comprehensive course (Akademi) editor — cover, meta, pricing, curriculum
   builder (modules → lessons), learning outcomes & requirements, with a live
   course-detail preview. Reuses FormSection/uid/renderRich from sibling files. */
const {
  useState: useCoState
} = React;
const CO = () => window.MK_ADMIN;
const LEVELS = ["Başlangıç", "Orta", "İleri", "Tüm seviyeler"];
const CO_CATS = ["Tasarım", "Geliştirme", "Markalaşma", "Motion", "Strateji"];

/* curriculum: modules, each with lessons */
const LESSON_TYPES = [{
  id: "video",
  label: "Video",
  icon: "media"
}, {
  id: "image",
  label: "Görsel",
  icon: "media"
}, {
  id: "doc",
  label: "Doküman",
  icon: "pages"
}, {
  id: "link",
  label: "Dış bağlantı",
  icon: "link"
}, {
  id: "text",
  label: "Metin / okuma",
  icon: "courses"
}];
const lessonTypeMeta = id => LESSON_TYPES.find(t => t.id === id) || LESSON_TYPES[0];
function LessonContent({
  lesson,
  onChange
}) {
  const t = lesson.type || "video";
  const set = (k, v) => onChange({
    ...lesson,
    [k]: v
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "lesson-body"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u0130\xE7erik t\xFCr\xFC"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg seg--wrap"
  }, LESSON_TYPES.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.id,
    className: `seg__btn ${t === opt.id ? "on" : ""}`,
    onClick: () => set("type", opt.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: opt.icon,
    size: 13
  }), " ", opt.label)))), t === "video" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Video kayna\u011F\u0131"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg",
    style: {
      marginBottom: ".6rem"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `seg__btn ${lesson.vsource !== "url" ? "on" : ""}`,
    onClick: () => set("vsource", "upload")
  }, "Y\xFCkle"), /*#__PURE__*/React.createElement("button", {
    className: `seg__btn ${lesson.vsource === "url" ? "on" : ""}`,
    onClick: () => set("vsource", "url")
  }, "Embed/URL")), lesson.vsource === "url" ? /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: lesson.videoUrl || "",
    onChange: e => set("videoUrl", e.target.value),
    placeholder: "YouTube / Vimeo / .mp4 ba\u011Flant\u0131s\u0131"
  }) : /*#__PURE__*/React.createElement(FileDrop, {
    value: lesson.file,
    onChange: v => set("file", v),
    accept: "video/*",
    hint: "mp4, webm",
    icon: "media"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\xD6nizleme g\xF6rseli (poster)"
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    value: lesson.poster,
    onChange: v => set("poster", v),
    ratio: "16/9"
  }))), t === "image" && /*#__PURE__*/React.createElement(Field, {
    label: "G\xF6rsel"
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    value: lesson.img,
    onChange: v => set("img", v),
    ratio: "16/9",
    hint: "ders g\xF6rseli"
  })), t === "doc" && /*#__PURE__*/React.createElement(FileDrop, {
    label: "Dok\xFCman",
    value: lesson.file,
    onChange: v => set("file", v),
    accept: ".pdf,.doc,.docx,.ppt,.pptx,.zip",
    hint: "pdf, docx, zip\u2026",
    icon: "pages"
  }), t === "link" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Ba\u011Flant\u0131 URL'si"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: lesson.url || "",
    onChange: e => set("url", e.target.value),
    placeholder: "https://www.udemy.com/course/..."
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ba\u011Flant\u0131 etiketi"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: lesson.linkLabel || "",
    onChange: e => set("linkLabel", e.target.value),
    placeholder: "\xF6rn. Udemy'de izle"
  }))), t === "text" && /*#__PURE__*/React.createElement(Field, {
    label: "Ders metni"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "7rem"
    },
    value: lesson.body || "",
    onChange: e => set("body", e.target.value),
    placeholder: "Okuma i\xE7eri\u011Fi, notlar, kaynaklar\u2026"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "A\xE7\u0131klama (opsiyonel)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: lesson.note || "",
    onChange: e => set("note", e.target.value),
    placeholder: "Ders hakk\u0131nda k\u0131sa not"
  })), /*#__PURE__*/React.createElement("label", {
    className: "lesson-free"
  }, /*#__PURE__*/React.createElement(Switch, {
    on: !!lesson.free,
    onChange: v => set("free", v)
  }), " ", /*#__PURE__*/React.createElement("span", null, "\xDCcretsiz \xF6nizleme (kay\u0131ts\u0131z izlenebilir)")));
}
function Curriculum({
  modules = [],
  onChange
}) {
  const [open, setOpen] = useCoState({});
  const toggle = id => setOpen(o => ({
    ...o,
    [id]: !o[id]
  }));
  const setMod = (id, k, v) => onChange(modules.map(m => m.id === id ? {
    ...m,
    [k]: v
  } : m));
  const addMod = () => onChange([...modules, {
    id: uid(),
    title: "",
    lessons: []
  }]);
  const delMod = id => onChange(modules.filter(m => m.id !== id));
  const addLesson = mid => {
    const nid = uid();
    onChange(modules.map(m => m.id === mid ? {
      ...m,
      lessons: [...m.lessons, {
        id: nid,
        title: "",
        dur: "",
        type: "video"
      }]
    } : m));
    setOpen(o => ({
      ...o,
      [nid]: true
    }));
  };
  const updLesson = (mid, lesson) => onChange(modules.map(m => m.id === mid ? {
    ...m,
    lessons: m.lessons.map(l => l.id === lesson.id ? lesson : l)
  } : m));
  const delLesson = (mid, lid) => onChange(modules.map(m => m.id === mid ? {
    ...m,
    lessons: m.lessons.filter(l => l.id !== lid)
  } : m));
  return /*#__PURE__*/React.createElement("div", {
    className: "curr"
  }, modules.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: "curr-mod"
  }, /*#__PURE__*/React.createElement("div", {
    className: "curr-mod__h"
  }, /*#__PURE__*/React.createElement("span", {
    className: "curr-mod__n"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: m.title,
    onChange: e => setMod(m.id, "title", e.target.value),
    placeholder: `Modül ${i + 1} başlığı`
  }), /*#__PURE__*/React.createElement("span", {
    className: "curr-mod__c"
  }, m.lessons.length, " ders"), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => delMod(m.id),
    "aria-label": "Mod\xFCl\xFC sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    className: "curr-lessons"
  }, m.lessons.map(l => {
    const meta = lessonTypeMeta(l.type);
    const isOpen = !!open[l.id];
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      className: `curr-lesson-wrap ${isOpen ? "open" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "curr-lesson"
    }, /*#__PURE__*/React.createElement("button", {
      className: "curr-lesson__caret",
      onClick: () => toggle(l.id),
      "aria-label": "A\xE7/kapat"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron",
      size: 14
    })), /*#__PURE__*/React.createElement("span", {
      className: "curr-lesson__type",
      title: meta.label
    }, /*#__PURE__*/React.createElement(Icon, {
      name: meta.icon,
      size: 13
    })), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: l.title,
      onChange: e => updLesson(m.id, {
        ...l,
        title: e.target.value
      }),
      placeholder: "Ders ad\u0131"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input curr-lesson__dur",
      value: l.dur,
      onChange: e => updLesson(m.id, {
        ...l,
        dur: e.target.value
      }),
      placeholder: "08:30"
    }), /*#__PURE__*/React.createElement("button", {
      className: "adm-iconbtn",
      onClick: () => delLesson(m.id, l.id),
      "aria-label": "Dersi sil"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "close",
      size: 13
    }))), isOpen && /*#__PURE__*/React.createElement(LessonContent, {
      lesson: l,
      onChange: nl => updLesson(m.id, nl)
    }));
  }), /*#__PURE__*/React.createElement("button", {
    className: "curr-addlesson",
    onClick: () => addLesson(m.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " Ders ekle")))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      alignSelf: "flex-start"
    },
    onClick: addMod
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Mod\xFCl ekle"));
}

/* simple editable bullet list */
function BulletList({
  items = [],
  onChange,
  placeholder
}) {
  const set = (id, v) => onChange(items.map(it => it.id === id ? {
    ...it,
    text: v
  } : it));
  const add = () => onChange([...items, {
    id: uid(),
    text: ""
  }]);
  const del = id => onChange(items.filter(it => it.id !== id));
  return /*#__PURE__*/React.createElement("div", {
    className: "blist"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    className: "blist__row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "blist__dot"
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: it.text,
    onChange: e => set(it.id, e.target.value),
    placeholder: placeholder
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => del(it.id),
    "aria-label": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 13
  })))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      alignSelf: "flex-start"
    },
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Madde ekle"));
}
function CourseEditor({
  course,
  onClose,
  onSave
}) {
  const init = course && course.fields ? course : {
    id: course && course.id,
    status: course && course.status || "Taslak",
    fields: course ? {
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      rating: course.rating
    } : {
      level: "Başlangıç",
      currency: "₺"
    }
  };
  const [data, setData] = useCoState(init);
  const [aiBusy, setAiBusy] = useCoState(false);
  const f = data.fields;
  const set = (k, v) => setData(d => ({
    ...d,
    fields: {
      ...d.fields,
      [k]: v
    }
  }));
  const modules = f.modules || [];
  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);
  const aiWrite = async () => {
    setAiBusy(true);
    const out = await CO().ai(`"${f.title || "Kurs"}" başlıklı, ${f.level || "tüm seviyeler"} seviyesindeki bir online tasarım/geliştirme kursu için Türkçe, satışa yönelik kısa bir açıklama yaz. 1–2 paragraf, abartısız ve net.`, () => CO().SIM.blog(f.title || "Kurs"));
    set("desc", out.replace(/^#.*$/m, "").replace(/ÖZET[\s\S]*$/i, "").trim());
    setAiBusy(false);
  };
  const save = status => {
    onSave({
      id: data.id,
      status,
      fields: f,
      title: f.title || "Başlıksız kurs",
      instructor: f.instructor || "—",
      students: course && course.students ? course.students : 0,
      price: f.price ? (f.currency || "₺") + f.price : "—",
      rating: f.rating || 0,
      cover: f.cover || null
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " Kurslara d\xF6n"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, "Kurs d\xFCzenleyici"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement(MkSelect, {
    width: "150px",
    value: data.status,
    onChange: v => setData(d => ({
      ...d,
      status: v
    })),
    options: ["Taslak", "Arşiv", "Yayında"]
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => save("Taslak")
  }, "Tasla\u011Fa kaydet"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => save("Yayında")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  }), " Yay\u0131nla")), /*#__PURE__*/React.createElement("div", {
    className: "editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor__form"
  }, /*#__PURE__*/React.createElement(FormSection, {
    title: "K\xFCnye",
    hint: "kapak + temel bilgiler"
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    label: "Kurs kapa\u011F\u0131",
    ratio: "16/9",
    value: f.cover,
    onChange: v => set("cover", v),
    hint: "\xF6neri 1600\xD7900"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Kurs ad\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    style: {
      fontSize: "1.1rem",
      fontWeight: 600
    },
    value: f.title || "",
    onChange: e => set("title", e.target.value),
    placeholder: "\xF6rn. S\u0131f\u0131rdan Tasar\u0131m Sistemi"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "K\u0131sa tan\u0131t\u0131m (alt ba\u015Fl\u0131k)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.tagline || "",
    onChange: e => set("tagline", e.target.value),
    placeholder: "Tek c\xFCmlelik vaat"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "E\u011Fitmen"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.instructor || "",
    onChange: e => set("instructor", e.target.value),
    placeholder: "Ad Soyad"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Kategori"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: f.category || "",
    onChange: v => set("category", v),
    placeholder: "Se\xE7in\u2026",
    options: CO_CATS
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Seviye"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: f.level || "Başlangıç",
    onChange: v => set("level", v),
    options: LEVELS
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Dil"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.lang || "Türkçe",
    onChange: e => set("lang", e.target.value)
  })))), /*#__PURE__*/React.createElement(FormSection, {
    title: "Fiyatland\u0131rma"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "80px 1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Para"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: f.currency || "₺",
    onChange: v => set("currency", v),
    options: ["₺", "$", "€"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Fiyat"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.price || "",
    onChange: e => set("price", e.target.value),
    placeholder: "1.299"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u0130ndirimli fiyat (ops.)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.salePrice || "",
    onChange: e => set("salePrice", e.target.value),
    placeholder: "899"
  })))), /*#__PURE__*/React.createElement(FormSection, {
    title: "A\xE7\u0131klama",
    hint: "kursun sat\u0131\u015F metni"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, "Kurs a\xE7\u0131klamas\u0131", /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: ".3rem .7rem"
    },
    disabled: aiBusy,
    onClick: aiWrite
  }, aiBusy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI ile yaz"))), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "9rem"
    },
    value: f.desc || "",
    onChange: e => set("desc", e.target.value),
    placeholder: "Bu kursta ne \xF6\u011Fretiliyor, kimler i\xE7in? Bo\u015F sat\u0131rla paragraf, ## ile alt ba\u015Fl\u0131k."
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "M\xFCfredat",
    hint: `${modules.length} modül · ${lessonCount} ders`
  }, /*#__PURE__*/React.createElement(Curriculum, {
    modules: modules,
    onChange: v => set("modules", v)
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Kazan\u0131mlar",
    hint: "kursu bitirince neler yapabilecekler?"
  }, /*#__PURE__*/React.createElement(BulletList, {
    items: f.outcomes || [],
    onChange: v => set("outcomes", v),
    placeholder: "\xF6rn. S\u0131f\u0131rdan bir tasar\u0131m sistemi kurmak"
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Gereksinimler"
  }, /*#__PURE__*/React.createElement(BulletList, {
    items: f.requirements || [],
    onChange: v => set("requirements", v),
    placeholder: "\xF6rn. Temel Figma bilgisi"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "editor__preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "canl\u0131 \xF6nizleme \u2014 kurs detay\u0131")), /*#__PURE__*/React.createElement("div", {
    className: "prev-scroll"
  }, /*#__PURE__*/React.createElement("article", {
    className: "pv"
  }, f.category && /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, f.category, f.level ? ` · ${f.level}` : ""), /*#__PURE__*/React.createElement("h1", null, f.title || "Kurs adı"), f.tagline && /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, f.tagline), /*#__PURE__*/React.createElement("div", {
    className: "pv__cover"
  }, f.cover ? /*#__PURE__*/React.createElement("img", {
    src: f.cover,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "KURS KAPA\u011EI")), /*#__PURE__*/React.createElement("div", {
    className: "pv-course__bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-course__price"
  }, f.salePrice ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "now"
  }, (f.currency || "₺") + f.salePrice), /*#__PURE__*/React.createElement("span", {
    className: "was"
  }, (f.currency || "₺") + (f.price || ""))) : /*#__PURE__*/React.createElement("span", {
    className: "now"
  }, f.price ? (f.currency || "₺") + f.price : "Ücretsiz")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    style: {
      pointerEvents: "none"
    }
  }, "Kay\u0131t Ol")), /*#__PURE__*/React.createElement("dl", {
    className: "pv__meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "E\u011Fitmen"), /*#__PURE__*/React.createElement("dd", null, f.instructor || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Seviye"), /*#__PURE__*/React.createElement("dd", null, f.level || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Ders"), /*#__PURE__*/React.createElement("dd", null, lessonCount || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Puan"), /*#__PURE__*/React.createElement("dd", null, f.rating ? `★ ${f.rating}` : "—"))), f.desc && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem"
    }
  }, renderRich(f.desc)), (f.outcomes || []).filter(o => o.text).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pv__block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Kazan\u0131mlar"), /*#__PURE__*/React.createElement("ul", {
    className: "pv-checklist"
  }, f.outcomes.filter(o => o.text).map(o => /*#__PURE__*/React.createElement("li", {
    key: o.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ck"
  }, "\u2713"), o.text)))), modules.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pv__block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "M\xFCfredat"), /*#__PURE__*/React.createElement("div", {
    className: "pv-curr"
  }, modules.map((m, i) => /*#__PURE__*/React.createElement("details", {
    key: m.id,
    className: "pv-curr__mod",
    open: i === 0
  }, /*#__PURE__*/React.createElement("summary", null, /*#__PURE__*/React.createElement("span", null, String(i + 1).padStart(2, "0"), " \xB7 ", m.title || "Modül"), /*#__PURE__*/React.createElement("span", {
    className: "c"
  }, m.lessons.length, " ders")), m.lessons.map(l => {
    const lm = lessonTypeMeta(l.type);
    return /*#__PURE__*/React.createElement("div", {
      key: l.id,
      className: "pv-curr__lesson"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: lm.icon,
      size: 12
    })), " ", l.title || "Ders", l.free && /*#__PURE__*/React.createElement("span", {
      className: "pv-free"
    }, "\xFCcretsiz")), /*#__PURE__*/React.createElement("span", {
      className: "d"
    }, l.dur));
  }))))), (f.requirements || []).filter(r => r.text).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pv__block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Gereksinimler"), /*#__PURE__*/React.createElement("ul", {
    className: "pv-checklist pv-checklist--plain"
  }, f.requirements.filter(r => r.text).map(r => /*#__PURE__*/React.createElement("li", {
    key: r.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ck"
  }, "\u2014"), r.text))))))))));
}
Object.assign(window, {
  CourseEditor
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/course-editor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/leads.jsx
try { (() => {
/* Admin "Talepler" — lead/quote pipeline. Kanban-style columns by stage with
   per-card stage move + detail drawer. Reads window.MarkaLeads. */
const {
  useState: useLdState,
  useEffect: useLdEffect
} = React;
const LD = () => window.MarkaLeads;
const PRI_TONE = {
  "Yüksek": "green",
  "Orta": "warn",
  "Düşük": "muted"
};
function fmtDate(ts) {
  return new Date(ts).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short"
  });
}
function LeadDrawer({
  lead,
  onClose
}) {
  const [l, setL] = useLdState(lead);
  const set = (k, v) => {
    const n = Object.assign({}, l, {
      [k]: v
    });
    setL(n);
    LD().update(l.id, {
      [k]: v
    });
  };
  return /*#__PURE__*/React.createElement(Drawer, {
    title: l.name,
    subtitle: l.email,
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--danger",
      onClick: () => {
        LD().remove(l.id);
        onClose();
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 14
    }), " Sil"), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: onClose
    }, "Bitti"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Durum"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: l.status,
    onChange: v => set("status", v),
    options: LD().STAGES
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\xD6ncelik"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: l.priority,
    onChange: v => set("priority", v),
    options: ["Yüksek", "Orta", "Düşük"]
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "B\xFCt\xE7e"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: l.budget || "",
    onChange: e => set("budget", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Kaynak"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: l.source || "",
    readOnly: true
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Mesaj"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lead-msg"
  }, l.message || "—")), /*#__PURE__*/React.createElement(Field, {
    label: "Notlar"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    value: l.notes || "",
    onChange: e => set("notes", e.target.value),
    placeholder: "Dahili notlar\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: ".6rem",
      marginTop: ".4rem"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "adm-btn adm-btn--ghost",
    href: `mailto:${l.email}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14
  }), " E-posta g\xF6nder")));
}
function Leads() {
  const [, force] = useLdState(0);
  const [open, setOpen] = useLdState(null);
  const [dragId, setDragId] = useLdState(null);
  useLdEffect(() => {
    if (!LD()) return;
    return LD().subscribe(() => force(n => n + 1));
  }, []);
  if (!LD()) return null;
  const counts = LD().counts();
  const editing = open && LD().list().find(l => l.id === open);
  const drop = stage => {
    if (dragId) {
      LD().update(dragId, {
        status: stage
      });
      setDragId(null);
    }
  };
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Talepler / Lead",
    desc: `${LD().list().length} talep · sürükleyerek aşamayı değiştir`
  }, /*#__PURE__*/React.createElement("div", {
    className: "pipe"
  }, LD().STAGES.map(stage => /*#__PURE__*/React.createElement("div", {
    key: stage,
    className: "pipe__col",
    onDragOver: e => e.preventDefault(),
    onDrop: () => drop(stage)
  }, /*#__PURE__*/React.createElement("div", {
    className: "pipe__colh"
  }, /*#__PURE__*/React.createElement("span", null, stage), /*#__PURE__*/React.createElement("b", null, counts[stage] || 0)), /*#__PURE__*/React.createElement("div", {
    className: "pipe__cards"
  }, LD().byStage(stage).map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    className: "leadcard",
    draggable: true,
    onDragStart: () => setDragId(l.id),
    onDragEnd: () => setDragId(null),
    onClick: () => setOpen(l.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "leadcard__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "leadcard__name"
  }, l.name), /*#__PURE__*/React.createElement(Badge, {
    tone: PRI_TONE[l.priority] || "muted"
  }, l.priority)), /*#__PURE__*/React.createElement("p", {
    className: "leadcard__msg"
  }, l.message), /*#__PURE__*/React.createElement("div", {
    className: "leadcard__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, l.budget), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, fmtDate(l.date))))), !LD().byStage(stage).length && /*#__PURE__*/React.createElement("div", {
    className: "pipe__empty"
  }, "\u2014"))))), editing && /*#__PURE__*/React.createElement(LeadDrawer, {
    lead: editing,
    onClose: () => setOpen(null)
  }));
}
Object.assign(window, {
  Leads
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/leads.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/media-picker.jsx
try { (() => {
/* Shared image picker popup. Any upload zone calls window.openImagePicker(cb);
   the user imports from computer OR browses the organized media library
   (nested folders + breadcrumb, mirroring the Media page); cb(dataURL) fires
   with the chosen image. Mounted once by AdminShell. */
const {
  useState: usePickState,
  useRef: usePickRef,
  useEffect: usePickEffect
} = React;
const PICK_FOLDERS = [{
  id: "projects",
  name: "Projeler",
  parent: null
}, {
  id: "p-atlas",
  name: "Atlas Finans",
  parent: "projects"
}, {
  id: "p-atlas-web",
  name: "Web",
  parent: "p-atlas"
}, {
  id: "p-nova",
  name: "Nova",
  parent: "projects"
}, {
  id: "blog",
  name: "Blog",
  parent: null
}, {
  id: "logos",
  name: "Logolar",
  parent: null
}, {
  id: "covers",
  name: "Kapaklar",
  parent: null
}, {
  id: "uploads",
  name: "Yüklemeler",
  parent: null
}];
const PICK_FILES = [{
  id: "f1",
  name: "atlas-hero.jpg",
  folder: "covers",
  hue: 0,
  type: "JPG"
}, {
  id: "f2",
  name: "atlas-grid-01.jpg",
  folder: "p-atlas-web",
  hue: 30,
  type: "JPG"
}, {
  id: "f3",
  name: "atlas-grid-02.jpg",
  folder: "p-atlas-web",
  hue: 60,
  type: "JPG"
}, {
  id: "f4",
  name: "marka-logo.svg",
  folder: "logos",
  hue: 140,
  type: "SVG"
}, {
  id: "f5",
  name: "favicon-512.png",
  folder: "logos",
  hue: 140,
  type: "PNG"
}, {
  id: "f6",
  name: "blog-editorial.jpg",
  folder: "blog",
  hue: 200,
  type: "JPG"
}, {
  id: "f7",
  name: "nova-cover.jpg",
  folder: "p-nova",
  hue: -40,
  type: "JPG"
}, {
  id: "f8",
  name: "pera-cover.jpg",
  folder: "covers",
  hue: 90,
  type: "JPG"
}, {
  id: "f9",
  name: "venta-cover.jpg",
  folder: "covers",
  hue: -80,
  type: "JPG"
}, {
  id: "f10",
  name: "blog-process.jpg",
  folder: "blog",
  hue: 250,
  type: "JPG"
}, {
  id: "f11",
  name: "blog-studio.jpg",
  folder: "blog",
  hue: 320,
  type: "JPG"
}, {
  id: "f12",
  name: "team-photo.jpg",
  folder: "uploads",
  hue: 170,
  type: "JPG"
}, {
  id: "f13",
  name: "atlas-app-01.jpg",
  folder: "p-atlas",
  hue: 15,
  type: "JPG"
}, {
  id: "f14",
  name: "nova-brand.jpg",
  folder: "p-nova",
  hue: -20,
  type: "JPG"
}];

// render a library placeholder to a real dataURL so the chosen value previews everywhere
function hueDataURL(hue) {
  const c = document.createElement("canvas");
  c.width = 480;
  c.height = 360;
  const x = c.getContext("2d");
  const h = ((150 + hue) % 360 + 360) % 360;
  const g = x.createLinearGradient(0, 0, 480, 360);
  g.addColorStop(0, `hsl(${h} 62% 72%)`);
  g.addColorStop(1, `hsl(${(h + 40) % 360} 30% 90%)`);
  x.fillStyle = g;
  x.fillRect(0, 0, 480, 360);
  x.fillStyle = "rgba(255,255,255,.5)";
  x.beginPath();
  x.arc(360, 120, 70, 0, 7);
  x.fill();
  return c.toDataURL("image/png");
}
function MediaPicker() {
  const [open, setOpen] = usePickState(false);
  const [q, setQ] = usePickState("");
  const [cwd, setCwd] = usePickState(null); // current folder id, null = root
  const [drag, setDrag] = usePickState(false);
  const cbRef = usePickRef(null);
  const fileRef = usePickRef(null);
  usePickEffect(() => {
    window.openImagePicker = cb => {
      cbRef.current = cb;
      setQ("");
      setCwd(null);
      setOpen(true);
    };
  }, []);
  const pick = src => {
    if (cbRef.current) cbRef.current(src);
    setOpen(false);
  };
  const onFile = file => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => pick(e.target.result);
    r.readAsDataURL(file);
  };
  if (!open) return null;
  const searching = q.trim().length > 0;
  const ql = q.toLowerCase();

  // breadcrumb chain for cwd
  const crumbs = [];
  let walk = cwd;
  while (walk) {
    const f = PICK_FOLDERS.find(x => x.id === walk);
    if (!f) break;
    crumbs.unshift(f);
    walk = f.parent;
  }
  const subfolders = searching ? [] : PICK_FOLDERS.filter(f => f.parent === cwd);
  const files = searching ? PICK_FILES.filter(f => f.name.toLowerCase().includes(ql)) : PICK_FILES.filter(f => f.folder === cwd);
  const folderName = id => (PICK_FOLDERS.find(f => f.id === id) || {}).name || "Kütüphane";
  const countIn = id => {
    // direct files + files in any descendant folder
    const desc = new Set([id]);
    let added = true;
    while (added) {
      added = false;
      PICK_FOLDERS.forEach(f => {
        if (f.parent && desc.has(f.parent) && !desc.has(f.id)) {
          desc.add(f.id);
          added = true;
        }
      });
    }
    return PICK_FILES.filter(f => desc.has(f.folder)).length;
  };
  return /*#__PURE__*/React.createElement(Modal, {
    title: "G\xF6rsel ekle",
    onClose: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: `pick-import ${drag ? "drag" : ""}`,
    onClick: () => fileRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      onFile(e.dataTransfer.files[0]);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pi-ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 22
  })), /*#__PURE__*/React.createElement("b", null, "Bu bilgisayardan i\xE7e aktar"), /*#__PURE__*/React.createElement("small", null, "PNG, JPG, SVG \xB7 t\u0131klay\u0131n ya da buraya s\xFCr\xFCkleyin"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => onFile(e.target.files[0])
  })), /*#__PURE__*/React.createElement("div", {
    className: "pick-sep"
  }, "veya medya k\xFCt\xFCphanesinden se\xE7in"), /*#__PURE__*/React.createElement("div", {
    className: "pick-lib"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pick-lib__bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "media-crumb"
  }, /*#__PURE__*/React.createElement("button", {
    className: !cwd && !searching ? "on" : "",
    onClick: () => {
      setCwd(null);
      setQ("");
    }
  }, "K\xFCt\xFCphane"), !searching && crumbs.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: c.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("button", {
    className: i === crumbs.length - 1 ? "on" : "",
    onClick: () => setCwd(c.id)
  }, c.name))), searching && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("button", {
    className: "on"
  }, "\u201C", q, "\u201D aramas\u0131"))), /*#__PURE__*/React.createElement("div", {
    className: "pick-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "T\xFCm k\xFCt\xFCphanede ara\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pick-scroll"
  }, subfolders.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pick-folders"
  }, subfolders.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "pick-folder",
    onClick: () => setCwd(f.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "pick-folder__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "projects",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "pick-folder__nm"
  }, f.name), /*#__PURE__*/React.createElement("span", {
    className: "pick-folder__ct"
  }, countIn(f.id))))), files.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "media-grid",
    style: {
      gridTemplateColumns: "repeat(auto-fill,minmax(124px,1fr))"
    }
  }, files.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "file-card",
    onClick: () => pick(hueDataURL(f.hue))
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      aspectRatio: "1/1",
      borderRadius: "var(--radius-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph__in",
    style: {
      filter: `hue-rotate(${f.hue}deg)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "ph__tag"
  }, f.type)), /*#__PURE__*/React.createElement("div", {
    className: "file-card__nm"
  }, f.name), searching && /*#__PURE__*/React.createElement("div", {
    className: "file-card__loc"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "projects",
    size: 11
  }), " ", folderName(f.folder))))), subfolders.length === 0 && files.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "adm-empty"
  }, /*#__PURE__*/React.createElement("p", null, searching ? "Eşleşen dosya yok" : "Bu klasör boş")))));
}
Object.assign(window, {
  MediaPicker
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/media-picker.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/media.jsx
try { (() => {
/* Modular media library — nested folders (subfolders), grid/list, drag-drop
   upload, search, detail drawer (rename, move, copy URL, delete). */
const {
  useState: useMedState,
  useRef: useMedRef
} = React;
const MEDIA_FOLDERS_INIT = [{
  id: "projects",
  name: "Projeler",
  parent: null
}, {
  id: "p-atlas",
  name: "Atlas Finans",
  parent: "projects"
}, {
  id: "p-atlas-web",
  name: "Web",
  parent: "p-atlas"
}, {
  id: "p-nova",
  name: "Nova",
  parent: "projects"
}, {
  id: "blog",
  name: "Blog",
  parent: null
}, {
  id: "logos",
  name: "Logolar",
  parent: null
}, {
  id: "covers",
  name: "Kapaklar",
  parent: null
}, {
  id: "uploads",
  name: "Yüklemeler",
  parent: null
}];
const MEDIA_FILES_INIT = [{
  id: "f1",
  name: "atlas-hero.jpg",
  folder: "covers",
  hue: 0,
  size: "842 KB",
  type: "JPG",
  date: "12 Haz"
}, {
  id: "f2",
  name: "atlas-grid-01.jpg",
  folder: "p-atlas-web",
  hue: 30,
  size: "1.2 MB",
  type: "JPG",
  date: "12 Haz"
}, {
  id: "f3",
  name: "atlas-grid-02.jpg",
  folder: "p-atlas-web",
  hue: 60,
  size: "980 KB",
  type: "JPG",
  date: "12 Haz"
}, {
  id: "f4",
  name: "marka-logo.svg",
  folder: "logos",
  hue: 140,
  size: "12 KB",
  type: "SVG",
  date: "01 Haz"
}, {
  id: "f5",
  name: "favicon-512.png",
  folder: "logos",
  hue: 140,
  size: "8 KB",
  type: "PNG",
  date: "01 Haz"
}, {
  id: "f6",
  name: "blog-editorial.jpg",
  folder: "blog",
  hue: 200,
  size: "640 KB",
  type: "JPG",
  date: "03 Haz"
}, {
  id: "f7",
  name: "nova-cover.jpg",
  folder: "p-nova",
  hue: -40,
  size: "1.1 MB",
  type: "JPG",
  date: "28 May"
}, {
  id: "f8",
  name: "pera-cover.jpg",
  folder: "covers",
  hue: 90,
  size: "760 KB",
  type: "JPG",
  date: "25 May"
}, {
  id: "f9",
  name: "venta-cover.jpg",
  folder: "covers",
  hue: -80,
  size: "910 KB",
  type: "JPG",
  date: "20 May"
}, {
  id: "f10",
  name: "blog-process.jpg",
  folder: "blog",
  hue: 250,
  size: "580 KB",
  type: "JPG",
  date: "18 May"
}, {
  id: "f11",
  name: "blog-studio.jpg",
  folder: "blog",
  hue: 320,
  size: "700 KB",
  type: "JPG",
  date: "10 May"
}, {
  id: "f12",
  name: "atlas-brand.jpg",
  folder: "p-atlas",
  hue: 170,
  size: "1.4 MB",
  size2: "",
  type: "JPG",
  date: "08 May"
}];
function Thumb({
  f,
  big
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      aspectRatio: big ? "4/3" : "1/1",
      borderRadius: "var(--radius-sm)"
    }
  }, f.src ? /*#__PURE__*/React.createElement("img", {
    src: f.src,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "var(--radius-sm)"
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ph__in",
    style: {
      filter: `hue-rotate(${f.hue}deg)`
    }
  }), !f.src && /*#__PURE__*/React.createElement("span", {
    className: "ph__tag"
  }, f.type));
}
function Media() {
  const [folders, setFolders] = useMedState(MEDIA_FOLDERS_INIT);
  const [files, setFiles] = useMedState(MEDIA_FILES_INIT);
  const [active, setActive] = useMedState("all");
  const [view, setView] = useMedState("grid");
  const [q, setQ] = useMedState("");
  const [sel, setSel] = useMedState(null);
  const [adding, setAdding] = useMedState(false);
  const [newName, setNewName] = useMedState("");
  const [drag, setDrag] = useMedState(false);
  const [expanded, setExpanded] = useMedState(() => new Set(MEDIA_FOLDERS_INIT.map(f => f.id)));
  const inputRef = useMedRef();
  const childrenOf = pid => folders.filter(f => (f.parent || null) === (pid === "all" ? null : pid));
  const fileCount = id => id === "all" ? files.length : files.filter(f => f.folder === id).length;
  const folderName = id => id === "all" ? "Tüm medya" : (folders.find(f => f.id === id) || {}).name || "—";
  const pathOf = id => {
    const out = [];
    let cur = folders.find(f => f.id === id);
    while (cur) {
      out.unshift(cur);
      cur = cur.parent ? folders.find(f => f.id === cur.parent) : null;
    }
    return out;
  };
  const indentedLabel = id => pathOf(id).map(f => f.name).join("  ›  ");
  const subfolders = childrenOf(active);
  const visible = files.filter(f => (active === "all" || f.folder === active) && (!q || f.name.toLowerCase().includes(q.toLowerCase())));
  const addFiles = list => {
    [...list].filter(f => f.type.startsWith("image/")).forEach(file => {
      const r = new FileReader();
      r.onload = e => setFiles(p => [{
        id: Date.now() + Math.random(),
        name: file.name,
        folder: active === "all" ? "uploads" : active,
        src: e.target.result,
        size: (file.size / 1024).toFixed(0) + " KB",
        type: (file.type.split("/")[1] || "img").toUpperCase(),
        date: "şimdi"
      }, ...p]);
      r.readAsDataURL(file);
    });
  };
  const addFolder = () => {
    if (!newName.trim()) {
      setAdding(false);
      return;
    }
    const id = "fld" + Date.now();
    setFolders(p => [...p, {
      id,
      name: newName.trim(),
      parent: active === "all" ? null : active
    }]);
    setExpanded(s => new Set(s).add(active));
    setNewName("");
    setAdding(false);
  };
  const toggle = id => setExpanded(s => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  // recursive sidebar tree
  const Tree = ({
    pid,
    depth
  }) => childrenOf(pid).map(f => {
    const kids = childrenOf(f.id);
    const open = expanded.has(f.id);
    return /*#__PURE__*/React.createElement("div", {
      key: f.id
    }, /*#__PURE__*/React.createElement("div", {
      className: `media-fld ${active === f.id ? "on" : ""}`,
      style: {
        paddingLeft: 8 + depth * 16
      },
      onClick: () => setActive(f.id)
    }, kids.length > 0 ? /*#__PURE__*/React.createElement("span", {
      className: "media-fld__tw",
      onClick: e => {
        e.stopPropagation();
        toggle(f.id);
      }
    }, open ? "▾" : "▸") : /*#__PURE__*/React.createElement("span", {
      className: "media-fld__tw",
      style: {
        opacity: 0
      }
    }, "\u25B8"), /*#__PURE__*/React.createElement(Icon, {
      name: "projects",
      size: 15
    }), " ", /*#__PURE__*/React.createElement("span", {
      className: "media-fld__nm"
    }, f.name), " ", /*#__PURE__*/React.createElement("span", {
      className: "c"
    }, fileCount(f.id))), open && kids.length > 0 && /*#__PURE__*/React.createElement(Tree, {
      pid: f.id,
      depth: depth + 1
    }));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "media"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "media-side"
  }, /*#__PURE__*/React.createElement("button", {
    className: `media-fld ${active === "all" ? "on" : ""}`,
    onClick: () => setActive("all")
  }, /*#__PURE__*/React.createElement("span", {
    className: "media-fld__tw",
    style: {
      opacity: 0
    }
  }, "\u25B8"), /*#__PURE__*/React.createElement(Icon, {
    name: "media",
    size: 16
  }), " ", /*#__PURE__*/React.createElement("span", {
    className: "media-fld__nm"
  }, "T\xFCm medya"), " ", /*#__PURE__*/React.createElement("span", {
    className: "c"
  }, fileCount("all"))), /*#__PURE__*/React.createElement("div", {
    className: "media-side__lbl"
  }, "Klas\xF6rler"), /*#__PURE__*/React.createElement(Tree, {
    pid: "all",
    depth: 0
  }), adding ? /*#__PURE__*/React.createElement("div", {
    className: "media-newfld"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    autoFocus: true,
    placeholder: active === "all" ? "Kök klasör adı" : `${folderName(active)} altına…`,
    value: newName,
    onChange: e => setNewName(e.target.value),
    onKeyDown: e => e.key === "Enter" ? addFolder() : e.key === "Escape" ? setAdding(false) : null
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: addFolder
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14
  }))) : /*#__PURE__*/React.createElement("button", {
    className: "media-fld media-fld--add",
    onClick: () => setAdding(true)
  }, /*#__PURE__*/React.createElement("span", {
    className: "media-fld__tw",
    style: {
      opacity: 0
    }
  }, "\u25B8"), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " ", active === "all" ? "Yeni klasör" : "Alt klasör ekle")), /*#__PURE__*/React.createElement("div", {
    className: "media-main"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "media-crumb"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActive("all")
  }, "T\xFCm medya"), pathOf(active).map(f => /*#__PURE__*/React.createElement(React.Fragment, {
    key: f.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\u203A"), /*#__PURE__*/React.createElement("button", {
    className: f.id === active ? "on" : "",
    onClick: () => setActive(f.id)
  }, f.name)))), /*#__PURE__*/React.createElement("div", {
    className: "media-bar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, folderName(active)), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)"
    }
  }, "\xB7 ", subfolders.length, " klas\xF6r \xB7 ", visible.length, " dosya")), /*#__PURE__*/React.createElement("div", {
    className: "media-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Dosya ara\u2026",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-seg"
  }, /*#__PURE__*/React.createElement("button", {
    className: view === "grid" ? "on" : "",
    onClick: () => setView("grid")
  }, "Izgara"), /*#__PURE__*/React.createElement("button", {
    className: view === "list" ? "on" : "",
    onClick: () => setView("list")
  }, "Liste")), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => setAdding(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Klas\xF6r"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => inputRef.current.click()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Y\xFCkle"), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: "image/*",
    multiple: true,
    style: {
      display: "none"
    },
    onChange: e => addFiles(e.target.files)
  })), /*#__PURE__*/React.createElement("div", {
    className: `media-drop ${drag ? "drag" : ""}`,
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      addFiles(e.dataTransfer.files);
    }
  }, subfolders.length > 0 && !q && /*#__PURE__*/React.createElement("div", {
    className: "media-grid",
    style: {
      marginBottom: "var(--space-5)"
    }
  }, subfolders.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "folder-card",
    onClick: () => setActive(f.id),
    onDoubleClick: () => setActive(f.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "folder-card__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "projects",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "file-card__nm"
  }, f.name), /*#__PURE__*/React.createElement("div", {
    className: "file-card__meta"
  }, childrenOf(f.id).length, " klas\xF6r \xB7 ", fileCount(f.id), " dosya")))), visible.length === 0 && subfolders.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "adm-empty"
  }, /*#__PURE__*/React.createElement("h3", null, "Bu klas\xF6r bo\u015F"), /*#__PURE__*/React.createElement("p", null, "Alt klas\xF6r ekleyin ya da dosyalar\u0131 buraya s\xFCr\xFCkleyip b\u0131rak\u0131n.")) : view === "grid" ? /*#__PURE__*/React.createElement("div", {
    className: "media-grid"
  }, visible.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: "file-card",
    onClick: () => setSel(f)
  }, /*#__PURE__*/React.createElement(Thumb, {
    f: f
  }), /*#__PURE__*/React.createElement("div", {
    className: "file-card__nm"
  }, f.name), /*#__PURE__*/React.createElement("div", {
    className: "file-card__meta"
  }, f.type, " \xB7 ", f.size)))) : /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Dosya"), /*#__PURE__*/React.createElement("th", null, "Klas\xF6r"), /*#__PURE__*/React.createElement("th", null, "T\xFCr"), /*#__PURE__*/React.createElement("th", null, "Boyut"), /*#__PURE__*/React.createElement("th", null, "Tarih"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, visible.map(f => /*#__PURE__*/React.createElement("tr", {
    key: f.id,
    onClick: () => setSel(f),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      width: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38
    }
  }, /*#__PURE__*/React.createElement(Thumb, {
    f: f
  }))), /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, f.name), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-xs)"
    }
  }, indentedLabel(f.folder)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)"
    }
  }, f.type), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)"
    }
  }, f.size), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)"
    }
  }, f.date), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: e => {
      e.stopPropagation();
      setFiles(p => p.filter(x => x.id !== f.id));
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }))))))))), sel && /*#__PURE__*/React.createElement(MediaDetail, {
    file: sel,
    folders: folders,
    pathLabel: indentedLabel,
    onClose: () => setSel(null),
    onChange: u => {
      setFiles(p => p.map(x => x.id === u.id ? u : x));
      setSel(u);
    },
    onDelete: () => {
      setFiles(p => p.filter(x => x.id !== sel.id));
      setSel(null);
    }
  }));
}
function MediaDetail({
  file,
  folders,
  pathLabel,
  onClose,
  onChange,
  onDelete
}) {
  const [copied, setCopied] = useMedState(false);
  return /*#__PURE__*/React.createElement(Drawer, {
    title: "Dosya detay\u0131",
    subtitle: file.type + " · " + file.size,
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      onClick: onClose
    }, "Kapat"), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--danger",
      onClick: onDelete
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 14
    }), " Sil"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius)",
      overflow: "hidden",
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement(Thumb, {
    f: file,
    big: true
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Dosya ad\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: file.name,
    onChange: e => onChange({
      ...file,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Klas\xF6r (ta\u015F\u0131)"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: file.folder,
    onChange: v => onChange({
      ...file,
      folder: v
    }),
    options: folders.map(f => ({
      value: f.id,
      label: pathLabel(f.id)
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "T\xFCr"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: file.type,
    readOnly: true
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Boyut"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: file.size,
    readOnly: true
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Genel URL"
  }, /*#__PURE__*/React.createElement("div", {
    className: "key-input"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    readOnly: true,
    value: `https://cdn.marka.studio/${file.folder}/${file.name}`
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, copied ? "Kopyalandı" : "Kopyala"))));
}
Object.assign(window, {
  Media
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/media.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/modules-main.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Admin core modules: Dashboard, Appearance, Content (AI blog), Reports (AI). */
const {
  useState: useMState,
  useEffect: useMEffect,
  useRef: useMRef
} = React;
const A = () => window.MK_ADMIN;

/* ----------------------------- DASHBOARD ----------------------------- */
function Dashboard({
  go
}) {
  const week = [42, 55, 48, 63, 71, 58, 80];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--4"
  }, A().stats.map((s, i) => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: i
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--3"
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Haftal\u0131k trafik",
    desc: "Son 7 g\xFCn",
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 10,
      height: 140,
      paddingTop: 10
    }
  }, week.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: h * 1.5,
      background: "var(--accent)",
      borderRadius: "6px 6px 0 0",
      opacity: .35 + i * 0.09
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-muted)"
    }
  }, ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"][i]))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "H\u0131zl\u0131 AI i\u015Flemleri"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => go("reports")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 16
  }), " Haftal\u0131k rapor olu\u015Ftur"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => go("content")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "blog",
    size: 16
  }), " AI ile blog yaz\u0131s\u0131 yaz"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => go("appearance")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "appearance",
    size: 16
  }), " G\xF6r\xFCn\xFCm\xFC d\xFCzenle")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)",
      marginTop: 14
    }
  }, "AI ", A().aiAvailable ? "bağlı — gerçek üretim aktif." : "bağlı değil — simülasyon modu.")), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Son hareketler"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, A().activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      fontSize: "var(--fs-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--accent)",
      marginTop: 6,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, a.who), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, a.what), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-subtle)"
    }
  }, a.when))))))));
}

/* ----------------------------- APPEARANCE ---------------------------- */
function MiniHeader({
  id
}) {
  const logo = /*#__PURE__*/React.createElement("span", {
    className: "m-logo"
  });
  const nav = /*#__PURE__*/React.createElement("span", {
    className: "m-nav"
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("i", {
    key: i
  })));
  const cta = /*#__PURE__*/React.createElement("span", {
    className: "m-cta"
  });
  if (id === "centered") return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m-row"
  }, cta, logo, cta), /*#__PURE__*/React.createElement("div", {
    className: "m-row"
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      width: 14,
      height: 4,
      borderRadius: 2,
      background: "var(--ink-300)"
    }
  }))));
  if (id === "minimal") return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini"
  }, logo, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), cta);
  if (id === "split") return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini"
  }, logo, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), nav, cta);
  return /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini"
  }, logo, nav, cta);
}
function Appearance() {
  const [cfg, setCfg] = useMState(window.MarkaTheme.get());
  const T = window.MarkaTheme;
  const previewRef = useMRef(null);
  const update = patch => {
    T.set(patch);
    setCfg(T.get());
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--2",
    style: {
      alignItems: "start",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Header \u015Fablonu",
    desc: "T\xFCm sayfalarda an\u0131nda ge\xE7erli olur"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-grid"
  }, T.HEADER_TEMPLATES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tpl-card ${cfg.headerTemplate === t.id ? "on" : ""}`,
    onClick: () => update({
      headerTemplate: t.id
    })
  }, /*#__PURE__*/React.createElement(MiniHeader, {
    id: t.id
  }), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__name"
  }, t.label, " ", cfg.headerTemplate === t.id && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF")), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__desc"
  }, t.desc))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Footer \u015Fablonu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-grid"
  }, T.FOOTER_TEMPLATES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tpl-card ${cfg.footerTemplate === t.id ? "on" : ""}`,
    onClick: () => update({
      footerTemplate: t.id
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini",
    style: {
      alignItems: "flex-end"
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: t.id === "compact" ? 8 : 22,
      background: "var(--ink-200)",
      borderRadius: 3
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__name"
  }, t.label), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__desc"
  }, t.desc))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Hero d\xFCzeni",
    desc: "Anasayfa kahraman alan\u0131n\u0131n g\xF6r\xFCn\xFCm\xFC (m\xFC\u015Fteriye switcher g\xF6r\xFCnmez)"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-grid",
    style: {
      gridTemplateColumns: "repeat(3,1fr)"
    }
  }, T.HERO_VARIANTS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tpl-card ${cfg.heroVariant === t.id ? "on" : ""}`,
    onClick: () => update({
      heroVariant: t.id
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "tpl-mini",
    style: t.id === "center" ? {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    } : t.id === "split" ? {} : {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 4
    }
  }, t.id === "split" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 30,
      background: "var(--ink-200)",
      borderRadius: 4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 30,
      background: "var(--accent)",
      opacity: .5,
      borderRadius: 4
    }
  })) : t.id === "center" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    style: {
      width: "70%",
      height: 7,
      borderRadius: 2,
      background: "var(--text)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      width: "45%",
      height: 5,
      borderRadius: 2,
      background: "var(--ink-300)"
    }
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("i", {
    style: {
      width: "85%",
      height: 9,
      borderRadius: 2,
      background: "var(--text)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      width: "55%",
      height: 5,
      borderRadius: 2,
      background: "var(--ink-300)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__name"
  }, t.label, " ", cfg.heroVariant === t.id && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF")), /*#__PURE__*/React.createElement("div", {
    className: "tpl-card__desc"
  }, t.desc))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Renk paleti & font"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Vurgu rengi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swatches"
  }, T.ACCENTS.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    className: `swatch ${cfg.accent === a.value ? "on" : ""}`,
    style: {
      background: a.value
    },
    title: a.label,
    onClick: () => update({
      accent: a.value
    })
  })), /*#__PURE__*/React.createElement("label", {
    className: "swatch",
    style: {
      background: "conic-gradient(red,orange,yellow,lime,cyan,blue,magenta,red)",
      display: "grid",
      placeItems: "center"
    },
    title: "\xD6zel renk"
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: cfg.accent,
    onChange: e => update({
      accent: e.target.value
    }),
    style: {
      opacity: 0,
      width: 1,
      height: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      mixBlendMode: "difference",
      fontSize: 12
    }
  }, "\uFF0B")))), /*#__PURE__*/React.createElement(Field, {
    label: "Font ailesi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-list"
  }, T.FONTS.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    className: `font-opt ${cfg.font === f.id ? "on" : ""}`,
    onClick: () => update({
      font: f.id
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm",
    style: {
      fontFamily: f.family
    }
  }, f.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: f.family,
      color: "var(--text-muted)"
    }
  }, "Aa Bb 123"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      marginTop: 4,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Tema modu"
  }, /*#__PURE__*/React.createElement(Seg, {
    value: cfg.mode,
    onChange: v => update({
      mode: v
    }),
    options: [{
      value: "light",
      label: "Açık"
    }, {
      value: "dark",
      label: "Koyu"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: `Köşe yuvarlaklığı — ${cfg.radius}px`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "20",
    step: "1",
    value: cfg.radius,
    onChange: e => update({
      radius: +e.target.value
    }),
    style: {
      accentColor: "var(--accent)",
      width: 180
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      marginTop: 10
    },
    onClick: () => {
      T.reset();
      setCfg(T.get());
    }
  }, "Varsay\u0131lana s\u0131f\u0131rla")), /*#__PURE__*/React.createElement(AdmCard, {
    title: "A\xE7\u0131l\u0131\u015F pop-up'\u0131",
    desc: "Siteye giren ziyaret\xE7iye g\xF6sterilecek kampanya penceresi",
    action: /*#__PURE__*/React.createElement(Switch, {
      on: !!(cfg.popup && cfg.popup.enabled),
      onChange: v => update({
        popup: Object.assign({}, cfg.popup, {
          enabled: v
        })
      })
    })
  }, cfg.popup && cfg.popup.enabled ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    label: "G\xF6rsel",
    ratio: "16/9",
    value: cfg.popup.image,
    onChange: v => update({
      popup: Object.assign({}, cfg.popup, {
        image: v
      })
    }),
    hint: "opsiyonel"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Ba\u015Fl\u0131k"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: cfg.popup.title || "",
    onChange: e => update({
      popup: Object.assign({}, cfg.popup, {
        title: e.target.value
      })
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Metin"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "5rem"
    },
    value: cfg.popup.text || "",
    onChange: e => update({
      popup: Object.assign({}, cfg.popup, {
        text: e.target.value
      })
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Buton metni"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: cfg.popup.ctaText || "",
    onChange: e => update({
      popup: Object.assign({}, cfg.popup, {
        ctaText: e.target.value
      })
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Buton ba\u011Flant\u0131s\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: cfg.popup.ctaUrl || "",
    onChange: e => update({
      popup: Object.assign({}, cfg.popup, {
        ctaUrl: e.target.value
      })
    }),
    placeholder: "market.html"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: `Açılma gecikmesi — ${cfg.popup.delaySec}sn`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "20",
    step: "1",
    value: cfg.popup.delaySec,
    onChange: e => update({
      popup: Object.assign({}, cfg.popup, {
        delaySec: +e.target.value
      })
    }),
    style: {
      accentColor: "var(--accent)",
      width: "100%"
    }
  })), /*#__PURE__*/React.createElement("label", {
    className: "lesson-free"
  }, /*#__PURE__*/React.createElement(Switch, {
    on: cfg.popup.freqOncePerSession !== false,
    onChange: v => update({
      popup: Object.assign({}, cfg.popup, {
        freqOncePerSession: v
      })
    })
  }), " ", /*#__PURE__*/React.createElement("span", null, "Oturum ba\u015F\u0131na yaln\u0131zca bir kez g\xF6ster")), /*#__PURE__*/React.createElement("p", {
    className: "seclist__hint"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " \xD6nizlemede pop-up ", cfg.popup.delaySec, " saniye sonra a\xE7\u0131l\u0131r. Test i\xE7in \xF6nizlemeyi yenileyin.")) : /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-sm)"
    }
  }, "Pop-up kapal\u0131. A\xE7mak i\xE7in sa\u011Fdaki anahtar\u0131 kullan\u0131n; kampanya g\xF6rseli, metni, butonu ve a\xE7\u0131lma s\xFCresini buradan ayarlay\u0131n."))), /*#__PURE__*/React.createElement(AdmCard, {
    className: "appr-preview",
    title: "Canl\u0131 \xF6nizleme",
    desc: "De\u011Fi\u015Fiklikler ger\xE7ek siteye an\u0131nda yans\u0131r",
    action: /*#__PURE__*/React.createElement("a", {
      className: "adm-btn adm-btn--ghost",
      href: "../website/index.html",
      target: "_blank",
      rel: "noopener"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external",
      size: 15
    }), " Sekmede a\xE7")
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-preview__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "marka.studio"), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    style: {
      marginLeft: "auto"
    },
    onClick: () => {
      if (previewRef.current) previewRef.current.src = previewRef.current.src;
    },
    "aria-label": "Yenile"
  }, "\u27F3")), /*#__PURE__*/React.createElement("iframe", {
    ref: previewRef,
    src: "../website/index.html",
    title: "\xD6nizleme"
  }))));
}

/* ------------------------------ CONTENT ------------------------------ */
function Content() {
  const [posts, setPosts] = useMState(A().posts);
  const [editing, setEditing] = useMState(null); // null=list, {}=new, post=edit
  const [wizard, setWizard] = useMState(false);
  const addPost = p => setPosts(prev => p.id ? prev.map(x => x.id === p.id ? {
    ...x,
    ...p
  } : x) : [{
    id: Date.now(),
    views: "—",
    ...p
  }, ...prev]);
  if (wizard) return /*#__PURE__*/React.createElement(BlogWizard, {
    onClose: () => setWizard(false),
    onSave: p => {
      addPost(p);
      setWizard(false);
    }
  });
  if (editing !== null) {
    return /*#__PURE__*/React.createElement(BlogEditor, {
      post: editing,
      onClose: () => setEditing(null),
      onSave: p => {
        addPost(p);
        setEditing(null);
      }
    });
  }
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Blog yaz\u0131lar\u0131",
    desc: `${posts.length} yazı`,
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: ".6rem"
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      style: {
        borderRadius: "8px",
        height: "38px"
      },
      onClick: () => setWizard(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 15
    }), " AI ile \xDCret"), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      style: {
        borderRadius: "8px"
      },
      onClick: () => setEditing({})
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Yeni Yaz\u0131"))
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Ba\u015Fl\u0131k"), /*#__PURE__*/React.createElement("th", null, "Kategori"), /*#__PURE__*/React.createElement("th", null, "Durum"), /*#__PURE__*/React.createElement("th", null, "Tarih"), /*#__PURE__*/React.createElement("th", null, "G\xF6r\xFCnt\xFClenme"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, posts.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      width: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      width: 48,
      height: 32,
      borderRadius: 6
    }
  }, p.cover ? /*#__PURE__*/React.createElement("img", {
    src: p.cover,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 6
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ph__in"
  }))), /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, p.title, p.template && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "var(--text-subtle)"
    }
  }, "\xB7 ", p.template)), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, p.cat), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: p.status === "Yayında" ? "green" : p.status === "Taslak" ? "muted" : "warn"
  }, p.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)"
    }
  }, p.date), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)"
    }
  }, p.views), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(p)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setPosts(prev => prev.filter(x => x.id !== p.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))))))));
}

/* ------------------------------ REPORTS ------------------------------ */
/* ------------------------------ REPORTS ------------------------------ */
function repInlineBold(s) {
  return s.split(/\*\*(.+?)\*\*/g).map((p, i) => i % 2 ? /*#__PURE__*/React.createElement("strong", {
    key: i
  }, p) : p);
}
function repRenderMD(text) {
  const lines = (text || "").split("\n");
  const out = [];
  let bul = [];
  const flush = () => {
    if (bul.length) {
      out.push(/*#__PURE__*/React.createElement("ul", {
        key: "u" + out.length,
        className: "rep-ul"
      }, bul.map((b, i) => /*#__PURE__*/React.createElement("li", {
        key: i
      }, repInlineBold(b)))));
      bul = [];
    }
  };
  lines.forEach((ln, idx) => {
    const t = ln.trim();
    if (!t || /^---+$/.test(t)) {
      flush();
      return;
    }
    if (/^#{1,3}\s+/.test(t)) {
      flush();
      out.push(/*#__PURE__*/React.createElement("h4", {
        key: idx,
        className: "rep-h"
      }, repInlineBold(t.replace(/^#{1,3}\s+/, ""))));
      return;
    }
    if (/^[-•*]\s+/.test(t)) {
      bul.push(t.replace(/^[-•*]\s+/, ""));
      return;
    }
    flush();
    out.push(/*#__PURE__*/React.createElement("p", {
      key: idx,
      className: "rep-p"
    }, repInlineBold(t)));
  });
  flush();
  return out;
}
function Reports() {
  const [report, setReport] = useMState(null);
  const [busy, setBusy] = useMState(false);
  const week = [42, 55, 48, 63, 71, 58, 80];
  const channels = [["Organik arama", 46], ["Sosyal medya", 24], ["Doğrudan", 18], ["Referans", 12]];
  const days = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
  const maxW = Math.max(...week);
  const run = async () => {
    setBusy(true);
    const data = A().stats.map(s => `${s.label}: ${s.val} (${s.delta})`).join(", ");
    const text = await A().ai(`Bir kreatif ajansın yönetim paneli için, şu metriklere dayanarak Türkçe, SADE ve eyleme dönük kısa bir haftalık performans yorumu yaz: ${data}. "## Yönetici özeti" ve "## Öneriler" başlıklarını kullan, maddeler ekle. Markdown başlık ve madde işareti kullan, emoji kullanma.`, () => A().SIM.report());
    setBusy(false);
    setReport({
      date: new Date().toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      narrative: text
    });
  };
  if (!report && !busy) {
    return /*#__PURE__*/React.createElement(AdmCard, {
      title: "AI \u0130\xE7g\xF6r\xFC & Raporlar",
      desc: A().aiAvailable ? "Gerçek zamanlı AI analizi" : "Simülasyon modu"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ai-panel"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ai-chip"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 12,
      fill: true
    }), " Marka AI Analist"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "var(--fs-sm)",
        color: "var(--text-muted)",
        margin: "10px 0 14px"
      }
    }, "G\xFCncel metriklerden grafiklerle zenginle\u015Ftirilmi\u015F, sade dilli bir haftal\u0131k rapor \xFCret."), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: run
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "ai",
      size: 15
    }), " Haftal\u0131k rapor olu\u015Ftur")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "rep"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rep-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rep-kicker"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13,
    fill: true
  }), " Marka AI \xB7 Haftal\u0131k Rapor"), /*#__PURE__*/React.createElement("h2", {
    className: "rep-title"
  }, "Performans \xF6zeti"), /*#__PURE__*/React.createElement("div", {
    className: "rep-date"
  }, report ? report.date : "…")), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    disabled: busy,
    onClick: run
  }, busy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " Yenileniyor\u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 15
  }), " Yeniden olu\u015Ftur"))), /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--4"
  }, A().stats.map((s, i) => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: i
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "adm-grid adm-grid--2",
    style: {
      gridTemplateColumns: "1.3fr 1fr"
    }
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Haftal\u0131k trafik",
    desc: "Son 7 g\xFCn \xB7 oturum"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rep-chart"
  }, week.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rep-bar-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rep-bar-val"
  }, h), /*#__PURE__*/React.createElement("div", {
    className: "rep-bar",
    style: {
      height: `${h / maxW * 130}px`,
      opacity: .45 + i * 0.08
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rep-bar-day"
  }, days[i]))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Trafik kaynaklar\u0131",
    desc: "Kanala g\xF6re da\u011F\u0131l\u0131m"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      marginTop: 4
    }
  }, channels.map(([name, pct]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    className: "chan-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chan-top"
  }, /*#__PURE__*/React.createElement("span", null, name), /*#__PURE__*/React.createElement("b", null, pct, "%")), /*#__PURE__*/React.createElement("div", {
    className: "chan-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chan-fill",
    style: {
      width: pct + "%"
    }
  }))))))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "",
    desc: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "rep-doc"
  }, busy && !report ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " AI analiz ediyor\u2026") : repRenderMD(report && report.narrative))));
}
Object.assign(window, {
  Dashboard,
  Appearance,
  Content,
  Reports
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/modules-main.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/modules-skel.jsx
try { (() => {
/* Admin secondary modules — data-backed tables + lite SEO AI + settings. */
const {
  useState: useSkState
} = React;
const D = () => window.MK_ADMIN;
function TableModule({
  cols,
  rows,
  render,
  title,
  addLabel
}) {
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: title,
    desc: `${rows.length} kayıt`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " ", addLabel)
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, cols.map(c => /*#__PURE__*/React.createElement("th", {
    key: c
  }, c)), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, render(r), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))))))));
}
function Projects() {
  const [rows, setRows] = useSkState(D().projects);
  const [editing, setEditing] = useSkState(null);
  if (editing !== null) {
    return /*#__PURE__*/React.createElement(ProjectEditor, {
      project: editing,
      onClose: () => setEditing(null),
      onSave: p => {
        setRows(prev => p.id ? prev.map(x => x.id === p.id ? {
          ...x,
          ...p
        } : x) : [{
          id: Date.now(),
          ...p
        }, ...prev]);
        setEditing(null);
      }
    });
  }
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Projeler",
    desc: `${rows.length} proje`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: () => setEditing({})
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Yeni Proje")
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Proje"), /*#__PURE__*/React.createElement("th", null, "M\xFC\u015Fteri"), /*#__PURE__*/React.createElement("th", null, "Kategori"), /*#__PURE__*/React.createElement("th", null, "Y\u0131l"), /*#__PURE__*/React.createElement("th", null, "Durum"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      width: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      width: 48,
      height: 32,
      borderRadius: 6
    }
  }, p.cover ? /*#__PURE__*/React.createElement("img", {
    src: p.cover,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 6
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ph__in"
  }))), /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, p.title), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, p.client), /*#__PURE__*/React.createElement("td", null, p.cat), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, p.year), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: p.status === "Yayında" ? "green" : p.status === "Taslak" ? "warn" : "muted"
  }, p.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(p)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setRows(prev => prev.filter(x => x.id !== p.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))))))));
}
function Courses() {
  const [rows, setRows] = useSkState(D().courses);
  const [editing, setEditing] = useSkState(null);
  if (editing !== null) {
    return /*#__PURE__*/React.createElement(CourseEditor, {
      course: editing,
      onClose: () => setEditing(null),
      onSave: c => {
        setRows(prev => c.id ? prev.map(x => x.id === c.id ? {
          ...x,
          ...c
        } : x) : [{
          id: Date.now(),
          ...c
        }, ...prev]);
        setEditing(null);
      }
    });
  }
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Kurslar",
    desc: `${rows.length} kurs`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: () => setEditing({})
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Yeni Kurs")
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "Kurs"), /*#__PURE__*/React.createElement("th", null, "E\u011Fitmen"), /*#__PURE__*/React.createElement("th", null, "\xD6\u011Frenci"), /*#__PURE__*/React.createElement("th", null, "Puan"), /*#__PURE__*/React.createElement("th", null, "Fiyat"), /*#__PURE__*/React.createElement("th", null, "Durum"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      width: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      width: 48,
      height: 32,
      borderRadius: 6
    }
  }, c.cover ? /*#__PURE__*/React.createElement("img", {
    src: c.cover,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 6
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ph__in"
  }))), /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, c.title), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, c.instructor), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, c.students), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, c.rating ? `★ ${c.rating}` : "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, c.price), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: c.status === "Yayında" ? "green" : c.status === "Taslak" ? "warn" : "muted"
  }, c.status || "Yayında")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(c)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setRows(prev => prev.filter(x => x.id !== c.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))))))));
}
function MarketM() {
  const [rows, setRows] = useSkState(D().products);
  const [editing, setEditing] = useSkState(null);
  if (editing !== null) {
    return /*#__PURE__*/React.createElement(ProductEditor, {
      product: editing,
      onClose: () => setEditing(null),
      onSave: p => {
        setRows(prev => p.id ? prev.map(x => x.id === p.id ? {
          ...x,
          ...p
        } : x) : [{
          id: Date.now(),
          ...p
        }, ...prev]);
        setEditing(null);
      }
    });
  }
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Market \u2014 \xDCr\xFCnler",
    desc: `${rows.length} ürün`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: () => setEditing({})
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Yeni \xDCr\xFCn")
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "\xDCr\xFCn"), /*#__PURE__*/React.createElement("th", null, "T\xFCr"), /*#__PURE__*/React.createElement("th", null, "Sat\u0131c\u0131"), /*#__PURE__*/React.createElement("th", null, "Sat\u0131\u015F"), /*#__PURE__*/React.createElement("th", null, "Fiyat"), /*#__PURE__*/React.createElement("th", null, "Durum"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      width: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      width: 48,
      height: 32,
      borderRadius: 6
    }
  }, p.cover ? /*#__PURE__*/React.createElement("img", {
    src: p.cover,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 6
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "ph__in"
  }))), /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, p.title), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, p.type || "—"), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, p.seller), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, p.sales), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, p.price), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: p.status === "Yayında" ? "green" : p.status === "Taslak" ? "warn" : "muted"
  }, p.status || "Yayında")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(p)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setRows(prev => prev.filter(x => x.id !== p.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))))))));
}
/* ---------------- USERS · ROLES · PERMISSIONS ---------------- */
const PERM_GROUPS = [{
  g: "Sayfalar (panel erişimi)",
  items: [{
    k: "dashboard",
    l: "Dashboard"
  }, {
    k: "content",
    l: "Blog & İçerik"
  }, {
    k: "projects",
    l: "Projeler"
  }, {
    k: "courses",
    l: "Kurslar"
  }, {
    k: "market",
    l: "Market"
  }, {
    k: "media",
    l: "Medya"
  }, {
    k: "appearance",
    l: "Tema & Görünüm"
  }, {
    k: "seo",
    l: "SEO & Meta"
  }, {
    k: "users",
    l: "Kullanıcılar"
  }, {
    k: "settings",
    l: "Ayarlar"
  }]
}, {
  g: "İşlemler (buton & alan yetkileri)",
  items: [{
    k: "create",
    l: "Oluştur",
    d: "Yeni kayıt ekleme butonları"
  }, {
    k: "edit",
    l: "Düzenle"
  }, {
    k: "delete",
    l: "Sil",
    d: "Silme butonları"
  }, {
    k: "publish",
    l: "Yayınla",
    d: "Taslağı yayına alma"
  }]
}, {
  g: "Hassas alanlar",
  items: [{
    k: "ai",
    l: "AI özelliklerini kullan"
  }, {
    k: "apikeys",
    l: "API anahtarları"
  }, {
    k: "billing",
    l: "Faturalandırma & bütçe"
  }]
}];
const ALL_PERMS = PERM_GROUPS.flatMap(g => g.items.map(i => i.k));
const DEFAULT_ROLES = [{
  id: 1,
  name: "Yönetici",
  desc: "Tam yetki",
  users: 1,
  perms: [...ALL_PERMS]
}, {
  id: 2,
  name: "Editör",
  desc: "İçerik üretimi & yayın",
  users: 1,
  perms: ["dashboard", "content", "projects", "media", "seo", "create", "edit", "publish", "ai"]
}, {
  id: 3,
  name: "Yazar",
  desc: "Yalnızca taslak",
  users: 1,
  perms: ["dashboard", "content", "media", "create", "edit", "ai"]
}];
function Users() {
  const [tab, setTab] = useSkState("users");
  const [users, setUsers] = useSkState(D().users);
  const [roles, setRoles] = useSkState(DEFAULT_ROLES);
  const [drawer, setDrawer] = useSkState(null);
  const [roleEdit, setRoleEdit] = useSkState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === "users" ? "on" : "",
    onClick: () => setTab("users")
  }, "Kullan\u0131c\u0131lar"), /*#__PURE__*/React.createElement("button", {
    className: tab === "roles" ? "on" : "",
    onClick: () => setTab("roles")
  }, "Roller & Yetkiler")), tab === "users" ? /*#__PURE__*/React.createElement(AdmCard, {
    title: "Kullan\u0131c\u0131lar",
    desc: `${users.length} kişi`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: () => setDrawer({})
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Kullan\u0131c\u0131 ekle")
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Ad"), /*#__PURE__*/React.createElement("th", null, "E-posta"), /*#__PURE__*/React.createElement("th", null, "Rol"), /*#__PURE__*/React.createElement("th", null, "Durum"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, users.map(u => /*#__PURE__*/React.createElement("tr", {
    key: u.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "avatar-cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av"
  }, u.photo ? /*#__PURE__*/React.createElement("img", {
    src: u.photo,
    alt: ""
  }) : (u.name || "?").split(" ").map(w => w[0]).slice(0, 2).join("")), /*#__PURE__*/React.createElement("span", {
    className: "ti"
  }, u.name))), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)"
    }
  }, u.email), /*#__PURE__*/React.createElement("td", null, u.role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: u.status === "Aktif" ? "green" : u.status === "Pasif" ? "muted" : "warn"
  }, u.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setDrawer(u)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setUsers(p => p.filter(x => x.id !== u.id))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }))))))))) : /*#__PURE__*/React.createElement(RolesPanel, {
    roles: roles,
    onAdd: () => setRoleEdit({
      name: "",
      perms: []
    }),
    onEdit: r => setRoleEdit(r),
    onSave: r => {
      setRoles(p => r.id ? p.map(x => x.id === r.id ? {
        ...x,
        ...r
      } : x) : [...p, {
        id: Date.now(),
        users: 0,
        desc: r.desc || "Özel rol",
        ...r
      }]);
      setRoleEdit(null);
    },
    editing: roleEdit,
    onCancel: () => setRoleEdit(null)
  }), drawer && /*#__PURE__*/React.createElement(UserDrawer, {
    user: drawer,
    roles: roles,
    onClose: () => setDrawer(null),
    onSave: u => {
      setUsers(p => u.id ? p.map(x => x.id === u.id ? {
        ...x,
        ...u
      } : x) : [...p, {
        id: Date.now(),
        status: u.status || "Davet edildi",
        ...u
      }]);
      setDrawer(null);
    }
  }));
}
function RolesPanel({
  roles,
  onAdd,
  onEdit,
  onSave,
  editing,
  onCancel
}) {
  const [r, setR] = useSkState(editing || {
    name: "",
    perms: []
  });
  React.useEffect(() => {
    setR(editing || {
      name: "",
      perms: []
    });
  }, [editing]);
  if (editing) {
    const toggle = k => setR(x => ({
      ...x,
      perms: x.perms.includes(k) ? x.perms.filter(p => p !== k) : [...x.perms, k]
    }));
    return /*#__PURE__*/React.createElement(AdmCard, {
      title: editing.id ? "Rolü düzenle" : "Yeni rol",
      desc: "Her sayfa, buton ve alan i\xE7in yetkiyi a\xE7/kapat",
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: ".5rem"
        }
      }, /*#__PURE__*/React.createElement("button", {
        className: "adm-btn adm-btn--ghost",
        onClick: onCancel
      }, "Vazge\xE7"), /*#__PURE__*/React.createElement("button", {
        className: "adm-btn adm-btn--primary",
        onClick: () => onSave(r)
      }, "Rol\xFC kaydet"))
    }, /*#__PURE__*/React.createElement("div", {
      className: "set-row",
      style: {
        marginBottom: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Rol ad\u0131"
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: r.name,
      onChange: e => setR(x => ({
        ...x,
        name: e.target.value
      })),
      placeholder: "\xF6rn. \u0130\xE7erik Edit\xF6r\xFC"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "A\xE7\u0131klama"
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: r.desc || "",
      onChange: e => setR(x => ({
        ...x,
        desc: e.target.value
      })),
      placeholder: "K\u0131sa a\xE7\u0131klama"
    }))), PERM_GROUPS.map(grp => /*#__PURE__*/React.createElement("div", {
      className: "perm-group",
      key: grp.g
    }, /*#__PURE__*/React.createElement("div", {
      className: "perm-group__h"
    }, grp.g, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      style: {
        padding: ".25rem .7rem"
      },
      onClick: () => setR(x => {
        const ks = grp.items.map(i => i.k);
        const allOn = ks.every(k => x.perms.includes(k));
        return {
          ...x,
          perms: allOn ? x.perms.filter(p => !ks.includes(p)) : [...new Set([...x.perms, ...ks])]
        };
      })
    }, "T\xFCm\xFCn\xFC de\u011Fi\u015Ftir")), grp.items.map(it => /*#__PURE__*/React.createElement("div", {
      className: "perm-row",
      key: it.k
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "pl"
    }, it.l), it.d && /*#__PURE__*/React.createElement("span", {
      className: "pd"
    }, " \xB7 ", it.d)), /*#__PURE__*/React.createElement(Switch, {
      on: r.perms.includes(it.k),
      onChange: () => toggle(it.k)
    }))))));
  }
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Roller",
    desc: `${roles.length} rol`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: onAdd
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Yeni rol")
  }, roles.map(role => /*#__PURE__*/React.createElement("div", {
    className: "role-card",
    key: role.id
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, role.name), /*#__PURE__*/React.createElement("div", {
    className: "role-card__meta"
  }, role.perms.length, " yetki \xB7 ", role.users, " kullan\u0131c\u0131 \xB7 ", role.desc)), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => onEdit(role)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  }), " D\xFCzenle"))));
}
function UserDrawer({
  user,
  roles,
  onClose,
  onSave
}) {
  const [u, setU] = useSkState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    role: roles[0] && roles[0].name,
    status: "Davet edildi",
    ...user
  });
  const set = (k, v) => setU(x => ({
    ...x,
    [k]: v
  }));
  const onPhoto = file => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => set("photo", e.target.result);
    r.readAsDataURL(file);
  };
  const photoRef = React.useRef();
  return /*#__PURE__*/React.createElement(Drawer, {
    title: user.id ? "Kullanıcıyı düzenle" : "Yeni kullanıcı",
    subtitle: "Profil, giri\u015F bilgileri ve rol",
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      onClick: onClose
    }, "Vazge\xE7"), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: () => onSave(u)
    }, user.id ? "Kaydet" : "Kullanıcı oluştur"))
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer__avatar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "img-up has",
    style: {
      aspectRatio: "1/1"
    },
    onClick: () => {
      if (window.openImagePicker) window.openImagePicker(src => set("photo", src));else photoRef.current.click();
    }
  }, u.photo ? /*#__PURE__*/React.createElement("img", {
    src: u.photo,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "img-up__ph",
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 22
  })), /*#__PURE__*/React.createElement("input", {
    ref: photoRef,
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => onPhoto(e.target.files[0])
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, "Profil foto\u011Fraf\u0131"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-xs)"
    }
  }, "Kare g\xF6rsel \xB7 t\u0131kla ve y\xFCkle"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Ki\u015Fisel bilgiler"), /*#__PURE__*/React.createElement(Field, {
    label: "Ad Soyad"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: u.name,
    onChange: e => set("name", e.target.value),
    placeholder: "Ada Y\u0131lmaz"
  })), /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "E-posta"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: u.email,
    onChange: e => set("email", e.target.value),
    placeholder: "ada@marka.studio"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Telefon"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: u.phone,
    onChange: e => set("phone", e.target.value),
    placeholder: "+90 5xx"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginTop: 4
    }
  }, "Panel giri\u015F bilgileri"), /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Kullan\u0131c\u0131 ad\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: u.username,
    onChange: e => set("username", e.target.value),
    placeholder: "ada"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ge\xE7ici \u015Fifre"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    type: "password",
    value: u.password,
    onChange: e => set("password", e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Rol"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: u.role,
    onChange: v => set("role", v),
    options: roles.map(r => r.name)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Durum"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: u.status,
    onChange: v => set("status", v),
    options: ["Aktif", "Davet edildi", "Pasif"]
  }))));
}
function Media() {
  return null; // replaced by the modular media.jsx (window.Media)
}

/* ---------------- SEO · all pages + per-page meta ---------------- */
const SITE_PAGES = [{
  id: "home",
  name: "Anasayfa",
  url: "/",
  title: "Marka — Dijitalde yeni standart",
  desc: "Markaları geleceğe taşıyan ödüllü kreatif stüdyo. Strateji, tasarım ve teknoloji.",
  indexed: true
}, {
  id: "portfolio",
  name: "İşler / Portfolyo",
  url: "/isler",
  title: "İşler — Ödüllü projeler · Marka",
  desc: "Web, marka ve dijital ürün projelerimizden seçkiler.",
  indexed: true
}, {
  id: "project",
  name: "Proje Detay",
  url: "/isler/atlas-finans",
  title: "Atlas Finans — Vaka çalışması · Marka",
  desc: "Atlas Bank için uçtan uca marka ve ürün deneyimi.",
  indexed: true
}, {
  id: "blog",
  name: "Blog",
  url: "/blog",
  title: "Blog — Stüdyodan notlar · Marka",
  desc: "Tasarım, süreç ve kültür üzerine yazılar.",
  indexed: true
}, {
  id: "academy",
  name: "Akademi",
  url: "/akademi",
  title: "Akademi — En iyilerden öğren · Marka",
  desc: "Sektörün önde gelen tasarımcılarından kurslar.",
  indexed: true
}, {
  id: "market",
  name: "Market",
  url: "/market",
  title: "Market — Şablonlar & dijital ürünler · Marka",
  desc: "UI kit, şablon ve ikon setleri.",
  indexed: true
}, {
  id: "about",
  name: "Hakkımızda",
  url: "/hakkimizda",
  title: "Hakkımızda · Marka",
  desc: "Ekibimiz, manifestomuz ve rakamlarla biz.",
  indexed: true
}, {
  id: "contact",
  name: "İletişim",
  url: "/iletisim",
  title: "İletişim — Birlikte çalışalım · Marka",
  desc: "Projenizi konuşalım. 48 saat içinde dönüş.",
  indexed: false
}];
function SEO() {
  const [pages, setPages] = useSkState(SITE_PAGES);
  const [editing, setEditing] = useSkState(null);
  if (editing) return /*#__PURE__*/React.createElement(SeoEditor, {
    page: editing,
    onClose: () => setEditing(null),
    onSave: p => {
      setPages(prev => prev.map(x => x.id === p.id ? p : x));
      setEditing(null);
    }
  });
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "SEO & Meta \u2014 Site haritas\u0131",
    desc: `${pages.length} sayfa · meta verilerini düzenle`
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Sayfa"), /*#__PURE__*/React.createElement("th", null, "URL"), /*#__PURE__*/React.createElement("th", null, "Meta ba\u015Fl\u0131k"), /*#__PURE__*/React.createElement("th", null, "\u0130ndeksleme"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, pages.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, p.name), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)"
    }
  }, p.url), /*#__PURE__*/React.createElement("td", {
    style: {
      color: "var(--text-muted)",
      maxWidth: 280,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, p.title), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: p.indexed ? "green" : "muted"
  }, p.indexed ? "İndeksli" : "Gizli")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(p)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })))))))));
}
function SeoEditor({
  page,
  onClose,
  onSave
}) {
  const [p, setP] = useSkState({
    og: null,
    ...page
  });
  const [busy, setBusy] = useSkState(false);
  const set = (k, v) => setP(x => ({
    ...x,
    [k]: v
  }));
  const ai = async () => {
    setBusy(true);
    const out = await D().ai(`"${p.name}" sayfası için Türkçe SEO üret. Tam olarak şu formatta yanıt ver:\nBAŞLIK: <60 karakteri aşmayan başlık>\nAÇIKLAMA: <155 karakteri aşmayan meta açıklama>`, () => `BAŞLIK: ${p.name} — Marka\nAÇIKLAMA: ${p.name} hakkında premium, editoryal ve net bir özet.`);
    const tm = out.match(/BAŞLIK\s*:\s*(.+)/i),
      dm = out.match(/AÇIKLAMA\s*:\s*([\s\S]+)/i);
    setP(x => ({
      ...x,
      title: tm ? tm[1].trim() : x.title,
      desc: dm ? dm[1].trim().split("\n")[0] : x.desc
    }));
    setBusy(false);
  };
  const onOg = file => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => set("og", e.target.result);
    r.readAsDataURL(file);
  };
  const ogRef = React.useRef();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " T\xFCm sayfalar"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, page.name), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    disabled: busy,
    onClick: ai
  }, busy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14
  }), " AI ile \xF6ner")), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => onSave(p)
  }, "Kaydet")), /*#__PURE__*/React.createElement("div", {
    className: "editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor__form"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "URL / slug"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: p.url,
    onChange: e => set("url", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, "Meta ba\u015Fl\u0131k ", /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: p.title.length > 60 ? "var(--signal-err)" : "var(--text-subtle)"
    }
  }, p.title.length, "/60")), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: p.title,
    onChange: e => set("title", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, "Meta a\xE7\u0131klama ", /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: p.desc.length > 155 ? "var(--signal-err)" : "var(--text-subtle)"
    }
  }, p.desc.length, "/155")), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "5rem"
    },
    value: p.desc,
    onChange: e => set("desc", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "set-logo"
  }, /*#__PURE__*/React.createElement("label", {
    className: "adm-field",
    style: {
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-label)",
      letterSpacing: ".1em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Sosyal payla\u015F\u0131m g\xF6rseli (OG \xB7 1200\xD7630)")), /*#__PURE__*/React.createElement("div", {
    className: `img-up ${p.og ? "has" : ""}`,
    style: {
      aspectRatio: "1200 / 630"
    },
    onClick: () => {
      if (window.openImagePicker) window.openImagePicker(v => set("og", v));else ogRef.current.click();
    }
  }, p.og ? /*#__PURE__*/React.createElement("img", {
    src: p.og,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "img-up__ph"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "media",
    size: 22
  }), /*#__PURE__*/React.createElement("span", null, "G\xF6rsel y\xFCkle")), /*#__PURE__*/React.createElement("input", {
    ref: ogRef,
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => onOg(e.target.files[0])
  }))), /*#__PURE__*/React.createElement("div", {
    className: "perm-row",
    style: {
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "pl"
  }, "Arama motorlar\u0131nda g\xF6ster"), /*#__PURE__*/React.createElement("span", {
    className: "pd"
  }, " \xB7 index / noindex")), /*#__PURE__*/React.createElement(Switch, {
    on: p.indexed,
    onChange: v => set("indexed", v)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "editor__preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 13
  }), " Google \xF6nizleme"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "#202124"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "marka.studio"), " ", p.url), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#1a0dab",
      fontSize: 19,
      margin: ".2rem 0",
      lineHeight: 1.2
    }
  }, p.title || "Sayfa başlığı"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#4d5156",
      fontSize: 13.5,
      lineHeight: 1.5
    }
  }, p.desc || "Meta açıklama burada görünecek."), p.og && /*#__PURE__*/React.createElement("div", {
    className: "pv__cover",
    style: {
      aspectRatio: "1200 / 630",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.og,
    alt: ""
  })))))));
}
Object.assign(window, {
  Projects,
  Courses,
  MarketM,
  Users,
  Media,
  SEO
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/modules-skel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/pages.jsx
try { (() => {
/* Admin "Sayfalar" module — every page opens in a split workspace: a LIVE
   preview on the left (click any highlighted text to edit it in place) and a
   side panel on the right. The homepage panel also manages sections (reorder,
   show/hide, add Image/Video/Text blocks). Drives the live site via
   window.MarkaPages + postMessage two-way text sync. */
const {
  useState: usePgState,
  useRef: usePgRef,
  useEffect: usePgEffect
} = React;
const PG = () => window.MarkaPages;
function previewURL(meta) {
  return (meta.id === "home" ? "../website/index.html" : "../../pages/" + meta.path) + "?edit=1";
}
function PagesM() {
  const [page, setPage] = usePgState(null);
  if (page) return /*#__PURE__*/React.createElement(PageWorkspace, {
    meta: PG().getPage(page),
    onBack: () => setPage(null)
  });
  return /*#__PURE__*/React.createElement(AdmCard, {
    title: "Sayfalar",
    desc: `${PG().PAGES.length} sayfa · canlı önizleme ile düzenle`
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Sayfa"), /*#__PURE__*/React.createElement("th", null, "URL"), /*#__PURE__*/React.createElement("th", null, "D\xFCzenleme"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, PG().PAGES.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "ti"
  }, p.label), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "/", p.path), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: p.editable === "sections" ? "green" : "muted"
  }, p.editable === "sections" ? "Bölümler + metin" : "Metin")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => setPage(p.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  }), " T\xFCm b\xF6l\xFCmleri d\xFCzenle"))))))));
}
const DEVICES = [{
  id: "desk",
  label: "Masaüstü",
  icon: "monitor",
  w: "100%"
}, {
  id: "tab",
  label: "Tablet",
  icon: "tablet",
  w: "820px"
}, {
  id: "mob",
  label: "Mobil",
  icon: "mobile",
  w: "390px"
}];
function PageWorkspace({
  meta,
  onBack
}) {
  const iframeRef = usePgRef(null);
  const [fields, setFields] = usePgState([]);
  const [device, setDevice] = usePgState("desk");
  const [tab, setTab] = usePgState(meta.id === "home" ? "sections" : "text");
  const [, force] = usePgState(0);
  const rerender = () => force(n => n + 1);
  usePgEffect(() => {
    const onMsg = e => {
      const d = e.data || {};
      if (d.type === "mk-fields" && d.pageId === meta.id) setFields(d.fields);else if (d.type === "mk-field-change") setFields(fs => fs.map(f => f.key === d.key ? {
        ...f,
        text: d.text
      } : f));
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [meta.id]);
  const enterEdit = () => {
    const w = iframeRef.current && iframeRef.current.contentWindow;
    if (w) {
      w.postMessage("mk-edit-on", "*");
      w.postMessage({
        type: "mk-request-fields"
      }, "*");
    }
  };
  const setField = (key, value) => {
    setFields(fs => fs.map(f => f.key === key ? {
      ...f,
      text: value
    } : f));
    const w = iframeRef.current && iframeRef.current.contentWindow;
    if (w) w.postMessage({
      type: "mk-set",
      key,
      value
    }, "*");
  };
  const dev = DEVICES.find(d => d.id === device);
  return /*#__PURE__*/React.createElement("div", {
    className: "pw"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 14,
    style: {
      transform: "rotate(90deg)"
    }
  }), " Sayfalar"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, meta.label), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement("div", {
    className: "adm-seg pw-dev"
  }, DEVICES.map(d => /*#__PURE__*/React.createElement("button", {
    key: d.id,
    className: device === d.id ? "on" : "",
    onClick: () => setDevice(d.id),
    "data-tip": d.label,
    "aria-label": d.label
  }, /*#__PURE__*/React.createElement(Icon, {
    name: d.icon,
    size: 16
  })))), /*#__PURE__*/React.createElement("a", {
    className: "adm-btn adm-btn--ghost",
    href: previewURL(meta).replace("?edit=1", ""),
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 15
  }), " Canl\u0131 g\xF6r")), /*#__PURE__*/React.createElement("div", {
    className: "pw-split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-frame",
    style: {
      maxWidth: dev.w
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    ref: iframeRef,
    src: previewURL(meta),
    title: "\xD6nizleme",
    onLoad: enterEdit
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "pw-panel"
  }, meta.id === "home" && /*#__PURE__*/React.createElement("div", {
    className: "pw-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === "sections" ? "on" : "",
    onClick: () => setTab("sections")
  }, "B\xF6l\xFCmler"), /*#__PURE__*/React.createElement("button", {
    className: tab === "text" ? "on" : "",
    onClick: () => setTab("text")
  }, "Metinler")), meta.id === "home" && tab === "sections" ? /*#__PURE__*/React.createElement(SectionPanel, {
    onChanged: rerender
  }) : /*#__PURE__*/React.createElement(TextPanel, {
    meta: meta,
    fields: fields,
    onSet: setField,
    onRefresh: enterEdit
  }))));
}

/* ---- text fields panel (all pages) ---- */
function TextPanel({
  meta,
  fields,
  onSet,
  onRefresh
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "pw-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-hint"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14
  }), " \xD6nizlemede ", /*#__PURE__*/React.createElement("b", null, "vurgulanan"), " metne t\u0131klay\u0131p do\u011Frudan yazabilir, ya da a\u015Fa\u011F\u0131daki alanlardan d\xFCzenleyebilirsin. De\u011Fi\u015Fiklikler canl\u0131 sitede an\u0131nda g\xF6r\xFCn\xFCr."), fields.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "adm-empty",
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("p", null, "\xD6nizleme y\xFCkleniyor\u2026"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      marginTop: 10
    },
    onClick: onRefresh
  }, "Yenile")) : /*#__PURE__*/React.createElement("div", {
    className: "pw-fields"
  }, fields.map(f => /*#__PURE__*/React.createElement(Field, {
    key: f.key,
    label: f.label
  }, f.text.length > 60 ? /*#__PURE__*/React.createElement("textarea", {
    className: "adm-input",
    style: {
      minHeight: "4.5rem",
      resize: "vertical"
    },
    value: f.text,
    onChange: e => onSet(f.key, e.target.value)
  }) : /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.text,
    onChange: e => onSet(f.key, e.target.value)
  })))));
}

/* ---- homepage section manager (reorder / hide / add) ---- */
const SECTION_TYPES = [{
  type: "image",
  label: "Görsel bölümü",
  icon: "media",
  desc: "Tam genişlik görsel"
}, {
  type: "video",
  label: "Video bölümü",
  icon: "media",
  desc: "Yükle veya embed (YouTube/Vimeo)"
}, {
  type: "text",
  label: "Metin bölümü",
  icon: "pages",
  desc: "Başlık + paragraf"
}];
function SectionPanel({
  onChanged
}) {
  const [, force] = usePgState(0);
  const [addOpen, setAddOpen] = usePgState(false);
  const [editing, setEditing] = usePgState(null);
  const [dragId, setDragId] = usePgState(null);
  const [overIdx, setOverIdx] = usePgState(null);
  const act = fn => {
    fn();
    force(n => n + 1);
    onChanged && onChanged();
  };
  const sections = PG().homeSections();
  const editSec = sections.find(s => s.id === editing && s.kind === "custom");
  const onDrop = toIdx => {
    if (dragId == null) return;
    act(() => PG().reorder(dragId, toIdx));
    setDragId(null);
    setOverIdx(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "pw-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-section__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pw-section__title"
  }, "B\xF6l\xFCmler"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    style: {
      padding: ".4rem .8rem"
    },
    onClick: () => setAddOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Ekle")), /*#__PURE__*/React.createElement("ul", {
    className: "seclist",
    onDragOver: e => e.preventDefault()
  }, sections.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.id,
    className: `seclist__row ${s.hidden ? "is-hidden" : ""} ${dragId === s.id ? "is-dragging" : ""} ${overIdx === i && dragId != null && dragId !== s.id ? "is-over" : ""}`,
    draggable: true,
    onDragStart: e => {
      setDragId(s.id);
      e.dataTransfer.effectAllowed = "move";
      try {
        e.dataTransfer.setData("text/plain", s.id);
      } catch (err) {}
    },
    onDragEnter: () => setOverIdx(i),
    onDragOver: e => {
      e.preventDefault();
      setOverIdx(i);
    },
    onDrop: e => {
      e.preventDefault();
      onDrop(i);
    },
    onDragEnd: () => {
      setDragId(null);
      setOverIdx(null);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "seclist__handle",
    "aria-label": "S\xFCr\xFCkle"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grip",
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    className: "seclist__order"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: `seclist__ic ${s.kind === "custom" ? "is-custom" : ""}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.kind === "custom" ? s.type === "video" ? "media" : s.type === "text" ? "pages" : "media" : "projects",
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    className: "seclist__meta"
  }, /*#__PURE__*/React.createElement("b", null, s.kind === "custom" ? s.title || "Özel bölüm" : s.label), /*#__PURE__*/React.createElement("span", null, s.kind === "custom" ? `Özel · ${s.type === "video" ? "Video" : s.type === "text" ? "Metin" : "Görsel"}` : "Yerleşik", s.locked ? " · sabit" : "")), /*#__PURE__*/React.createElement("div", {
    className: "seclist__actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    disabled: i === 0,
    onClick: () => act(() => PG().move(s.id, -1)),
    "aria-label": "Yukar\u0131",
    "data-tip": "Yukar\u0131"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 13,
    style: {
      transform: "rotate(180deg)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    disabled: i === sections.length - 1,
    onClick: () => act(() => PG().move(s.id, 1)),
    "aria-label": "A\u015Fa\u011F\u0131",
    "data-tip": "A\u015Fa\u011F\u0131"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 13
  })), !s.locked && /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => act(() => PG().toggleHidden(s.id)),
    "aria-label": "Gizle/G\xF6ster",
    "data-tip": s.hidden ? "Göster" : "Gizle",
    style: {
      opacity: s.hidden ? .5 : 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 13
  })), s.kind === "custom" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(s.id),
    "aria-label": "D\xFCzenle",
    "data-tip": "D\xFCzenle"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => act(() => PG().removeCustom(s.id)),
    "aria-label": "Sil",
    "data-tip": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13
  }))))))), /*#__PURE__*/React.createElement("p", {
    className: "pw-hint",
    style: {
      marginTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grip",
    size: 13
  }), " B\xF6l\xFCmleri ", /*#__PURE__*/React.createElement("b", null, "s\xFCr\xFCkleyip b\u0131rakarak"), " s\u0131ralayabilir, oklarla da ta\u015F\u0131yabilirsin. Metinleri d\xFCzenlemek i\xE7in soldaki \xF6nizlemede ilgili yaz\u0131ya t\u0131kla."), addOpen && /*#__PURE__*/React.createElement(Modal, {
    title: "B\xF6l\xFCm ekle",
    onClose: () => setAddOpen(false)
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-sm)",
      marginBottom: "var(--space-4)"
    }
  }, "Yeni b\xF6l\xFCm sona eklenir; ard\u0131ndan s\xFCr\xFCkleyerek istedi\u011Fin yere ta\u015F\u0131."), /*#__PURE__*/React.createElement("div", {
    className: "addsec-grid"
  }, SECTION_TYPES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.type,
    className: "addsec",
    onClick: () => {
      const id = PG().addCustom(t.type);
      setAddOpen(false);
      setEditing(id);
      force(n => n + 1);
      onChanged && onChanged();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "addsec__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("b", null, t.label), /*#__PURE__*/React.createElement("span", null, t.desc))))), editSec && /*#__PURE__*/React.createElement(CustomSectionEditor, {
    section: editSec,
    onClose: () => setEditing(null),
    onChange: patch => act(() => PG().updateCustom(editSec.id, patch))
  }));
}

/* small segmented control for the editor */
function Seg({
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "seg seg--wrap"
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    className: `seg__btn ${value === o.value ? "on" : ""}`,
    onClick: () => onChange(o.value)
  }, o.label)));
}
/* labelled on/off switch row */
function SwitchRow({
  label,
  hint,
  on,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "swrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swrow__txt"
  }, /*#__PURE__*/React.createElement("b", null, label), hint && /*#__PURE__*/React.createElement("span", null, hint)), /*#__PURE__*/React.createElement(Switch, {
    on: !!on,
    onChange: onChange
  }));
}
function CustomSectionEditor({
  section,
  onClose,
  onChange
}) {
  const s = section;
  const isVideo = s.type === "video",
    isImage = s.type === "image",
    isText = s.type === "text";
  return /*#__PURE__*/React.createElement(Drawer, {
    title: "B\xF6l\xFCm\xFC d\xFCzenle",
    subtitle: isVideo ? "Video bölümü" : isText ? "Metin bölümü" : "Görsel bölümü",
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: onClose
    }, "Bitti")
  }, /*#__PURE__*/React.createElement(FormSection, {
    title: "\u0130\xE7erik"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Ba\u015Fl\u0131k"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.title || "",
    onChange: e => onChange({
      title: e.target.value
    }),
    placeholder: "B\xF6l\xFCm ba\u015Fl\u0131\u011F\u0131 (bo\u015F b\u0131rak\u0131labilir)"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "A\xE7\u0131klama metni"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: isText ? "9rem" : "5rem"
    },
    value: s.text || "",
    onChange: e => onChange({
      text: e.target.value
    }),
    placeholder: "K\u0131sa a\xE7\u0131klama (opsiyonel)"
  })), isImage && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ImageUpload, {
    label: "G\xF6rsel",
    ratio: "16/9",
    value: s.src,
    onChange: v => onChange({
      src: v
    }),
    hint: "ana g\xF6rsel"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Alt yaz\u0131 (caption)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.caption || "",
    onChange: e => onChange({
      caption: e.target.value
    }),
    placeholder: "G\xF6rsel alt\u0131 k\xFC\xE7\xFCk not (opsiyonel)"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ba\u011Flant\u0131 (t\u0131klan\u0131nca gider)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.link || "",
    onChange: e => onChange({
      link: e.target.value
    }),
    placeholder: "https://\u2026 (opsiyonel)"
  }))), isVideo && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Video ba\u011Flant\u0131s\u0131 (YouTube / Vimeo / .mp4)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.url || "",
    onChange: e => onChange({
      url: e.target.value
    }),
    placeholder: "https://youtu.be/\u2026"
  })), /*#__PURE__*/React.createElement(ImageUpload, {
    label: "Kapak g\xF6rseli (poster)",
    ratio: "16/9",
    value: s.src,
    onChange: v => onChange({
      src: v
    })
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "Yerle\u015Fim & g\xF6r\xFCn\xFCm"
  }, /*#__PURE__*/React.createElement(SwitchRow, {
    label: "Tam ekran\u0131 kapla",
    hint: "Kenardan kenara, hero gibi tam geni\u015Flik",
    on: s.full,
    onChange: v => onChange({
      full: v
    })
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Ba\u015Fl\u0131k hizalama"
  }, /*#__PURE__*/React.createElement(Seg, {
    value: s.align || "left",
    onChange: v => onChange({
      align: v
    }),
    options: [{
      value: "left",
      label: "Sola"
    }, {
      value: "center",
      label: "Ortala"
    }]
  })), !s.full && (isVideo || isImage) && /*#__PURE__*/React.createElement(Field, {
    label: "En-boy oran\u0131"
  }, /*#__PURE__*/React.createElement(Seg, {
    value: s.ratio || (isVideo ? "16/9" : "auto"),
    onChange: v => onChange({
      ratio: v
    }),
    options: (isImage ? [{
      value: "auto",
      label: "Orijinal"
    }] : []).concat([{
      value: "16/9",
      label: "16:9"
    }, {
      value: "4/3",
      label: "4:3"
    }, {
      value: "1/1",
      label: "1:1"
    }, {
      value: "21/9",
      label: "21:9"
    }])
  })), isImage && /*#__PURE__*/React.createElement(SwitchRow, {
    label: "K\xF6\u015Feleri yuvarlat",
    on: s.rounded !== false,
    onChange: v => onChange({
      rounded: v
    })
  }), isText && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Metin boyutu"
  }, /*#__PURE__*/React.createElement(Seg, {
    value: s.size || "normal",
    onChange: v => onChange({
      size: v
    }),
    options: [{
      value: "normal",
      label: "Normal"
    }, {
      value: "large",
      label: "Büyük"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Metin geni\u015Fli\u011Fi"
  }, /*#__PURE__*/React.createElement(Seg, {
    value: s.maxWidth || "narrow",
    onChange: v => onChange({
      maxWidth: v
    }),
    options: [{
      value: "narrow",
      label: "Dar"
    }, {
      value: "wide",
      label: "Geniş"
    }, {
      value: "full",
      label: "Tam"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Arka plan"
  }, /*#__PURE__*/React.createElement(Seg, {
    value: s.bg || "none",
    onChange: v => onChange({
      bg: v
    }),
    options: [{
      value: "none",
      label: "Yok"
    }, {
      value: "tint",
      label: "Açık"
    }, {
      value: "dark",
      label: "Koyu"
    }]
  })))), isVideo && /*#__PURE__*/React.createElement(FormSection, {
    title: "Oynat\u0131c\u0131 ayarlar\u0131"
  }, /*#__PURE__*/React.createElement(SwitchRow, {
    label: "Oynat\u0131c\u0131y\u0131 g\xF6ster",
    hint: "Durdur / ses / tam ekran kontrolleri",
    on: s.controls,
    onChange: v => onChange({
      controls: v
    })
  }), /*#__PURE__*/React.createElement(SwitchRow, {
    label: "Otomatik oynatma",
    hint: "A\xE7\u0131l\u0131\u015Fta kendili\u011Finden ba\u015Flar",
    on: s.autoplay,
    onChange: v => onChange({
      autoplay: v,
      muted: v ? true : s.muted
    })
  }), /*#__PURE__*/React.createElement(SwitchRow, {
    label: "D\xF6ng\xFC",
    hint: "Bitince ba\u015Ftan tekrar oynar",
    on: s.loop,
    onChange: v => onChange({
      loop: v
    })
  }), /*#__PURE__*/React.createElement(SwitchRow, {
    label: "Sessiz ba\u015Flat",
    hint: "Otomatik oynatma i\xE7in gerekli",
    on: s.muted,
    onChange: v => onChange({
      muted: v
    })
  }), s.autoplay && !s.muted && /*#__PURE__*/React.createElement("p", {
    className: "pw-hint",
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " Taray\u0131c\u0131lar sesli videoda otomatik oynatmay\u0131 engeller \u2014 \"Sessiz ba\u015Flat\" a\xE7\u0131k olmal\u0131.")));
}
Object.assign(window, {
  PagesM
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/product-editor.jsx
try { (() => {
/* Comprehensive market product editor — cover + gallery, type/format, pricing,
   description, "what's included" list, specs (format/compatibility/license),
   with a live product-detail preview. Reuses FormSection/uid/renderRich. */
const {
  useState: usePrState
} = React;
const PR = () => window.MK_ADMIN;
const PR_TYPES = ["UI Kit", "Şablon", "İkon Seti", "Font", "Eklenti", "Mockup"];
const PR_FORMATS = ["Figma", "Sketch", "HTML/CSS", "React", "PNG/SVG", "PSD"];
const PR_LICENSES = ["Kişisel", "Ticari", "Genişletilmiş"];

/* key → value spec rows */
function SpecRows({
  items = [],
  onChange
}) {
  const set = (id, k, v) => onChange(items.map(s => s.id === id ? {
    ...s,
    [k]: v
  } : s));
  const add = () => onChange([...items, {
    id: uid(),
    k: "",
    v: ""
  }]);
  const del = id => onChange(items.filter(s => s.id !== id));
  return /*#__PURE__*/React.createElement("div", {
    className: "specs"
  }, items.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "specs__row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.k,
    onChange: e => set(s.id, "k", e.target.value),
    placeholder: "\xD6zellik (\xF6rn. Bile\u015Fen)"
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.v,
    onChange: e => set(s.id, "v", e.target.value),
    placeholder: "De\u011Fer (\xF6rn. 240+)"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => del(s.id),
    "aria-label": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 13
  })))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      alignSelf: "flex-start"
    },
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " \xD6zellik ekle"));
}
function ProductEditor({
  product,
  onClose,
  onSave
}) {
  const init = product && product.fields ? product : {
    id: product && product.id,
    status: product && product.status || "Taslak",
    fields: product ? {
      title: product.title,
      seller: product.seller,
      price: product.price
    } : {
      currency: "$",
      type: "UI Kit"
    }
  };
  const [data, setData] = usePrState(init);
  const [aiBusy, setAiBusy] = usePrState(false);
  const f = data.fields;
  const set = (k, v) => setData(d => ({
    ...d,
    fields: {
      ...d.fields,
      [k]: v
    }
  }));
  const aiWrite = async () => {
    setAiBusy(true);
    const out = await PR().ai(`"${f.title || "Dijital ürün"}" adlı bir ${f.type || "dijital ürün"} için Türkçe, satışa yönelik kısa bir ürün açıklaması yaz. 1–2 paragraf, net ve abartısız.`, () => PR().SIM.blog(f.title || "Ürün"));
    set("desc", out.replace(/^#.*$/m, "").replace(/ÖZET[\s\S]*$/i, "").trim());
    setAiBusy(false);
  };
  const save = status => {
    onSave({
      id: data.id,
      status,
      fields: f,
      title: f.title || "Başlıksız ürün",
      seller: f.seller || "—",
      sales: product && product.sales ? product.sales : 0,
      price: f.price ? (f.currency || "$") + " " + f.price : "—",
      type: f.type || "Dijital Ürün",
      cover: f.cover || null
    });
  };
  const incl = f.includes || [];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " Market'e d\xF6n"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, "\xDCr\xFCn d\xFCzenleyici"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement(MkSelect, {
    width: "150px",
    value: data.status,
    onChange: v => setData(d => ({
      ...d,
      status: v
    })),
    options: ["Taslak", "Arşiv", "Yayında"]
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => save("Taslak")
  }, "Tasla\u011Fa kaydet"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => save("Yayında")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  }), " Yay\u0131nla")), /*#__PURE__*/React.createElement("div", {
    className: "editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor__form"
  }, /*#__PURE__*/React.createElement(FormSection, {
    title: "K\xFCnye",
    hint: "kapak + temel bilgiler"
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    label: "\xDCr\xFCn kapa\u011F\u0131",
    ratio: "4/3",
    value: f.cover,
    onChange: v => set("cover", v),
    hint: "\xF6neri 1600\xD71200"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\xDCr\xFCn ad\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    style: {
      fontSize: "1.1rem",
      fontWeight: 600
    },
    value: f.title || "",
    onChange: e => set("title", e.target.value),
    placeholder: "\xF6rn. Grid UI Kit"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "K\u0131sa tan\u0131t\u0131m"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.tagline || "",
    onChange: e => set("tagline", e.target.value),
    placeholder: "Tek c\xFCmlelik vaat"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "T\xFCr"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: f.type || "UI Kit",
    onChange: v => set("type", v),
    options: PR_TYPES
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Sat\u0131c\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.seller || "",
    onChange: e => set("seller", e.target.value),
    placeholder: "Sat\u0131c\u0131 / st\xFCdyo"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Format"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: f.format || "",
    onChange: v => set("format", v),
    placeholder: "Se\xE7in\u2026",
    options: PR_FORMATS
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "Fiyatland\u0131rma & lisans"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "80px 1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Para"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: f.currency || "$",
    onChange: v => set("currency", v),
    options: ["$", "₺", "€"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Fiyat"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.price || "",
    onChange: e => set("price", e.target.value),
    placeholder: "59"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Lisans"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: f.license || "Ticari",
    onChange: v => set("license", v),
    options: PR_LICENSES
  })))), /*#__PURE__*/React.createElement(FormSection, {
    title: "A\xE7\u0131klama",
    hint: "\xFCr\xFCn\xFCn sat\u0131\u015F metni"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, "\xDCr\xFCn a\xE7\u0131klamas\u0131", /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: ".3rem .7rem"
    },
    disabled: aiBusy,
    onClick: aiWrite
  }, aiBusy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI ile yaz"))), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "9rem"
    },
    value: f.desc || "",
    onChange: e => set("desc", e.target.value),
    placeholder: "\xDCr\xFCn ne i\u015Fe yarar, kimler i\xE7in? Bo\u015F sat\u0131rla paragraf, ## ile alt ba\u015Fl\u0131k."
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "Pakette neler var?",
    hint: "\xFCr\xFCnle birlikte gelenler"
  }, /*#__PURE__*/React.createElement(BulletList, {
    items: incl,
    onChange: v => set("includes", v),
    placeholder: "\xF6rn. 48 haz\u0131r bile\u015Fen"
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Teknik \xF6zellikler"
  }, /*#__PURE__*/React.createElement(SpecRows, {
    items: f.specs || [],
    onChange: v => set("specs", v)
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Galeri"
  }, /*#__PURE__*/React.createElement(GalleryUpload, {
    label: "\xD6nizleme g\xF6rselleri",
    items: f.gallery || [],
    onChange: v => set("gallery", v)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "editor__preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "canl\u0131 \xF6nizleme \u2014 \xFCr\xFCn detay\u0131")), /*#__PURE__*/React.createElement("div", {
    className: "prev-scroll"
  }, /*#__PURE__*/React.createElement("article", {
    className: "pv"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, f.type || "Dijital Ürün", f.format ? ` · ${f.format}` : ""), /*#__PURE__*/React.createElement("h1", null, f.title || "Ürün adı"), f.tagline && /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, f.tagline), /*#__PURE__*/React.createElement("div", {
    className: "pv__cover",
    style: {
      aspectRatio: "4/3"
    }
  }, f.cover ? /*#__PURE__*/React.createElement("img", {
    src: f.cover,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "\xDCR\xDCN KAPA\u011EI")), /*#__PURE__*/React.createElement("div", {
    className: "pv-course__bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-course__price"
  }, /*#__PURE__*/React.createElement("span", {
    className: "now"
  }, f.price ? (f.currency || "$") + " " + f.price : "Ücretsiz")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    style: {
      pointerEvents: "none"
    }
  }, "Sat\u0131n Al")), /*#__PURE__*/React.createElement("dl", {
    className: "pv__meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Sat\u0131c\u0131"), /*#__PURE__*/React.createElement("dd", null, f.seller || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Format"), /*#__PURE__*/React.createElement("dd", null, f.format || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Lisans"), /*#__PURE__*/React.createElement("dd", null, f.license || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "T\xFCr"), /*#__PURE__*/React.createElement("dd", null, f.type || "—"))), f.desc && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem"
    }
  }, renderRich(f.desc)), incl.filter(i => i.text).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pv__block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Pakette"), /*#__PURE__*/React.createElement("ul", {
    className: "pv-checklist"
  }, incl.filter(i => i.text).map(i => /*#__PURE__*/React.createElement("li", {
    key: i.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ck"
  }, "\u2713"), i.text)))), (f.specs || []).filter(s => s.k).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pv__block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "\xD6zellikler"), /*#__PURE__*/React.createElement("dl", {
    className: "pv-specs"
  }, f.specs.filter(s => s.k).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id
  }, /*#__PURE__*/React.createElement("dt", null, s.k), /*#__PURE__*/React.createElement("dd", null, s.v))))), f.gallery && f.gallery.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pv__gal"
  }, f.gallery.map(g => /*#__PURE__*/React.createElement("img", {
    key: g.id,
    src: g.src,
    alt: ""
  })))))))));
}
Object.assign(window, {
  ProductEditor
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/product-editor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/profile-cv.jsx
try { (() => {
/* Admin "Profil / CV" module — edits the founder "Ben Kimim" page content via
   window.MarkaProfile. Split workspace: live preview (left) + modular form
   (right). Edits broadcast to the live page through the storage event. */
const {
  useState: useCvState,
  useRef: useCvRef
} = React;
const CVP = () => window.MarkaProfile;

/* generic repeatable list of objects */
function Repeater({
  items,
  onChange,
  makeNew,
  addLabel,
  render
}) {
  const list = items || [];
  const set = (id, patch) => onChange(list.map(it => it.id === id ? Object.assign({}, it, patch) : it));
  const add = () => onChange([...list, Object.assign({
    id: "r" + Date.now() + Math.random().toString(36).slice(2, 5)
  }, makeNew)]);
  const del = id => onChange(list.filter(it => it.id !== id));
  const move = (id, dir) => {
    const a = [...list];
    const i = a.findIndex(x => x.id === id);
    const j = i + dir;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cvrep"
  }, list.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    className: "cvrep-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cvrep-item__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cvrep-item__n"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    disabled: i === 0,
    onClick: () => move(it.id, -1),
    "aria-label": "Yukar\u0131",
    "data-tip": "Yukar\u0131"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 13,
    style: {
      transform: "rotate(180deg)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    disabled: i === list.length - 1,
    onClick: () => move(it.id, 1),
    "aria-label": "A\u015Fa\u011F\u0131",
    "data-tip": "A\u015Fa\u011F\u0131"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => del(it.id),
    "aria-label": "Sil",
    "data-tip": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13
  })))), render(it, patch => set(it.id, patch)))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      alignSelf: "flex-start"
    },
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " ", addLabel));
}
function TagEditor({
  tags,
  onChange
}) {
  const [val, setVal] = useCvState("");
  const add = () => {
    const t = val.trim();
    if (!t) return;
    onChange([...(tags || []), t]);
    setVal("");
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cvtags"
  }, (tags || []).map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "cvtag"
  }, t, /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(tags.filter((_, j) => j !== i)),
    "aria-label": "Kald\u0131r"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 11
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "ai-row",
    style: {
      marginTop: ".6rem"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: val,
    onChange: e => setVal(e.target.value),
    onKeyDown: e => e.key === "Enter" && (e.preventDefault(), add()),
    placeholder: "Yetenek ekle ve Enter"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }))));
}
function ProfileCV() {
  const iframeRef = useCvRef(null);
  const [p, setP] = useCvState(CVP().get());
  const upd = patch => {
    const next = Object.assign({}, p, patch);
    setP(next);
    CVP().set(patch);
  };
  const I = ({
    k,
    ph,
    area
  }) => area ? /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "7rem"
    },
    value: p[k] || "",
    onChange: e => upd({
      [k]: e.target.value
    }),
    placeholder: ph
  }) : /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: p[k] || "",
    onChange: e => upd({
      [k]: e.target.value
    }),
    placeholder: ph
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "pw"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, "Ben Kimim \u2014 CV"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => {
      if (confirm("Tüm CV içeriği varsayılana dönsün mü?")) {
        CVP().reset();
        setP(CVP().get());
      }
    }
  }, "S\u0131f\u0131rla"), /*#__PURE__*/React.createElement("a", {
    className: "adm-btn adm-btn--ghost",
    href: "../../pages/profile.html",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 15
  }), " Canl\u0131 g\xF6r")), /*#__PURE__*/React.createElement("div", {
    className: "pw-split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-frame"
  }, /*#__PURE__*/React.createElement("iframe", {
    ref: iframeRef,
    src: "../../pages/profile.html",
    title: "CV \xF6nizleme"
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "pw-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-section"
  }, /*#__PURE__*/React.createElement(FormSection, {
    title: "K\xFCnye",
    hint: "foto\u011Fraf + temel bilgiler"
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    label: "Profil foto\u011Fraf\u0131",
    ratio: "1/1",
    value: p.avatar,
    onChange: v => upd({
      avatar: v
    }),
    hint: "kare \xF6neri"
  }), /*#__PURE__*/React.createElement(ImageUpload, {
    label: "Kapak g\xF6rseli",
    ratio: "21/9",
    value: p.cover,
    onChange: v => upd({
      cover: v
    }),
    hint: "opsiyonel"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Ad Soyad"
  }, I({
    k: "name",
    ph: "Adınız"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Unvan / Rol"
  }, I({
    k: "role",
    ph: "örn. Kurucu & Kreatif Direktör"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Slogan"
  }, I({
    k: "tagline",
    ph: "Tek cümlelik vaat"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Konum"
  }, I({
    k: "location",
    ph: "İstanbul, Türkiye"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\u0130leti\u015Fim e-postas\u0131"
  }, I({
    k: "contactEmail",
    ph: "ad@marka.studio"
  }))), /*#__PURE__*/React.createElement("label", {
    className: "swrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "swrow__txt"
  }, /*#__PURE__*/React.createElement("b", null, "Yeni projelere a\xE7\u0131k"), /*#__PURE__*/React.createElement("span", null, "Profilde rozet g\xF6sterir")), /*#__PURE__*/React.createElement(Switch, {
    on: p.available,
    onChange: v => upd({
      available: v
    })
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "Hakk\u0131mda"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Biyografi / manifesto"
  }, I({
    k: "bio",
    ph: "Kendini anlat… (boş satırla paragraf)",
    area: true
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "\xD6ne \xE7\u0131kan say\u0131lar",
    hint: "animasyonlu saya\xE7lar"
  }, /*#__PURE__*/React.createElement(Repeater, {
    items: p.stats,
    onChange: v => upd({
      stats: v
    }),
    addLabel: "Say\u0131 ekle",
    makeNew: {
      num: 0,
      suffix: "",
      label: ""
    },
    render: (it, set) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 70px 1.4fr",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      type: "number",
      value: it.num,
      onChange: e => set({
        num: +e.target.value
      }),
      placeholder: "240"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.suffix,
      onChange: e => set({
        suffix: e.target.value
      }),
      placeholder: "+"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.label,
      onChange: e => set({
        label: e.target.value
      }),
      placeholder: "Etiket"
    }))
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Deneyim",
    hint: "kariyer zaman t\xFCneli"
  }, /*#__PURE__*/React.createElement(Repeater, {
    items: p.experience,
    onChange: v => upd({
      experience: v
    }),
    addLabel: "Deneyim ekle",
    makeNew: {
      role: "",
      company: "",
      period: "",
      desc: "",
      current: false
    },
    render: (it, set) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.role,
      onChange: e => set({
        role: e.target.value
      }),
      placeholder: "Rol / unvan"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.company,
      onChange: e => set({
        company: e.target.value
      }),
      placeholder: "\u015Eirket"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.period,
      onChange: e => set({
        period: e.target.value
      }),
      placeholder: "2019 \u2014 Bug\xFCn"
    })), /*#__PURE__*/React.createElement("textarea", {
      className: "adm-textarea",
      style: {
        minHeight: "3.5rem"
      },
      value: it.desc,
      onChange: e => set({
        desc: e.target.value
      }),
      placeholder: "K\u0131sa a\xE7\u0131klama"
    }), /*#__PURE__*/React.createElement("label", {
      className: "cvmini-check"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!it.current,
      onChange: e => set({
        current: e.target.checked
      })
    }), " G\xFCncel pozisyon"))
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Giri\u015Fimler"
  }, /*#__PURE__*/React.createElement(Repeater, {
    items: p.ventures,
    onChange: v => upd({
      ventures: v
    }),
    addLabel: "Giri\u015Fim ekle",
    makeNew: {
      name: "",
      role: "",
      period: "",
      desc: "",
      url: ""
    },
    render: (it, set) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.name,
      onChange: e => set({
        name: e.target.value
      }),
      placeholder: "\u0130sim"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.role,
      onChange: e => set({
        role: e.target.value
      }),
      placeholder: "Rol"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.period,
      onChange: e => set({
        period: e.target.value
      }),
      placeholder: "Y\u0131l"
    })), /*#__PURE__*/React.createElement("textarea", {
      className: "adm-textarea",
      style: {
        minHeight: "3rem"
      },
      value: it.desc,
      onChange: e => set({
        desc: e.target.value
      }),
      placeholder: "A\xE7\u0131klama"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.url,
      onChange: e => set({
        url: e.target.value
      }),
      placeholder: "Ba\u011Flant\u0131 (opsiyonel)"
    }))
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "\xD6d\xFCller & ba\u015Far\u0131lar"
  }, /*#__PURE__*/React.createElement(Repeater, {
    items: p.awards,
    onChange: v => upd({
      awards: v
    }),
    addLabel: "\xD6d\xFCl ekle",
    makeNew: {
      title: "",
      org: "",
      year: ""
    },
    render: (it, set) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 70px",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.title,
      onChange: e => set({
        title: e.target.value
      }),
      placeholder: "\xD6d\xFCl ad\u0131"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.org,
      onChange: e => set({
        org: e.target.value
      }),
      placeholder: "Kurum"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.year,
      onChange: e => set({
        year: e.target.value
      }),
      placeholder: "2025"
    }))
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Yetenekler"
  }, /*#__PURE__*/React.createElement(TagEditor, {
    tags: p.skills,
    onChange: v => upd({
      skills: v
    })
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "\xD6ne \xE7\u0131kan projeler"
  }, /*#__PURE__*/React.createElement(Repeater, {
    items: p.featured,
    onChange: v => upd({
      featured: v
    }),
    addLabel: "Proje ekle",
    makeNew: {
      title: "",
      year: "",
      href: "project.html"
    },
    render: (it, set) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.6fr 70px 1fr",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.title,
      onChange: e => set({
        title: e.target.value
      }),
      placeholder: "Proje ad\u0131"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.year,
      onChange: e => set({
        year: e.target.value
      }),
      placeholder: "2026"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.href,
      onChange: e => set({
        href: e.target.value
      }),
      placeholder: "ba\u011Flant\u0131"
    }))
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "Bas\u0131nda"
  }, /*#__PURE__*/React.createElement(Repeater, {
    items: p.press,
    onChange: v => upd({
      press: v
    }),
    addLabel: "Yaz\u0131 ekle",
    makeNew: {
      title: "",
      outlet: "",
      year: "",
      url: ""
    },
    render: (it, set) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.title,
      onChange: e => set({
        title: e.target.value
      }),
      placeholder: "Ba\u015Fl\u0131k"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 70px 1fr",
        gap: ".5rem"
      }
    }, /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.outlet,
      onChange: e => set({
        outlet: e.target.value
      }),
      placeholder: "Yay\u0131n"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.year,
      onChange: e => set({
        year: e.target.value
      }),
      placeholder: "2025"
    }), /*#__PURE__*/React.createElement("input", {
      className: "adm-input",
      value: it.url,
      onChange: e => set({
        url: e.target.value
      }),
      placeholder: "ba\u011Flant\u0131"
    })))
  }))))));
}
Object.assign(window, {
  ProfileCV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/profile-cv.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/project-editor.jsx
try { (() => {
/* Comprehensive project / case-study editor — cover + gallery + full narrative
   (problem → solution → impact metrics → testimonial), services multi-select
   pulled from the admin Hizmetler list, with a live project-detail preview. */
const {
  useState: usePState
} = React;
const PD = () => window.MK_ADMIN;
function uid() {
  return "x" + Math.random().toString(36).slice(2, 9);
}

/* small section divider inside the form */
function FormSection({
  title,
  hint,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ed-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ed-section__h"
  }, /*#__PURE__*/React.createElement("h4", null, title), hint && /*#__PURE__*/React.createElement("span", null, hint)), children);
}

/* before → after impact metrics */
function MetricsRepeater({
  items = [],
  onChange
}) {
  const set = (id, k, v) => onChange(items.map(m => m.id === id ? {
    ...m,
    [k]: v
  } : m));
  const add = () => onChange([...items, {
    id: uid(),
    label: "",
    before: "",
    after: ""
  }]);
  const del = id => onChange(items.filter(m => m.id !== id));
  return /*#__PURE__*/React.createElement("div", {
    className: "metrics"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metrics__head"
  }, /*#__PURE__*/React.createElement("span", null, "Metrik"), /*#__PURE__*/React.createElement("span", null, "\xD6nce"), /*#__PURE__*/React.createElement("span", null, "Sonra"), /*#__PURE__*/React.createElement("span", null)), items.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: "metrics__row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: m.label,
    onChange: e => set(m.id, "label", e.target.value),
    placeholder: "\xF6rn. D\xF6n\xFC\u015F\xFCm oran\u0131"
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: m.before,
    onChange: e => set(m.id, "before", e.target.value),
    placeholder: "%1,9"
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: m.after,
    onChange: e => set(m.id, "after", e.target.value),
    placeholder: "%4,3"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => del(m.id),
    "aria-label": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      alignSelf: "flex-start"
    },
    onClick: add
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Metrik ekle"));
}
function ProjectEditor({
  project,
  onClose,
  onSave
}) {
  const allSvc = PD().services || [];
  const mainName = id => (allSvc.find(s => s.id === id) || {}).name;
  // selectable services = active sub-services, grouped under their main service
  const serviceOptions = allSvc.filter(s => s.parent && s.active).map(s => ({
    value: s.id,
    label: s.name,
    group: mainName(s.parent) || "Diğer"
  })).sort((a, b) => (a.group + a.label).localeCompare(b.group + b.label, "tr"));
  const nameToId = name => allSvc.find(s => s.name === name || s.name.toLowerCase() === String(name).toLowerCase());
  const init = project && project.fields ? project : {
    id: project && project.id,
    status: project && project.status || "Taslak",
    fields: project ? {
      title: project.title,
      client: project.client,
      year: String(project.year || 2026),
      // derive serviceIds from the legacy "cat" string ("Marka · Web") by matching names
      serviceIds: project.cat ? project.cat.split("·").map(t => {
        const s = nameToId(t.trim());
        return s && s.id;
      }).filter(Boolean) : []
    } : {}
  };
  const [data, setData] = usePState(init);
  const [aiBusy, setAiBusy] = usePState(false);
  const f = data.fields;
  const set = (k, v) => setData(d => ({
    ...d,
    fields: {
      ...d.fields,
      [k]: v
    }
  }));
  const serviceIds = f.serviceIds || [];
  const serviceNames = serviceIds.map(id => (allSvc.find(s => s.id === id) || {}).name).filter(Boolean);
  const aiWrite = async () => {
    setAiBusy(true);
    const ctx = `${f.title || "Proje"} — müşteri: ${f.client || "—"}, hizmetler: ${serviceNames.join(", ") || "tasarım"}. Problem: ${f.problem || "—"}`;
    const out = await PD().ai(`Bir kreatif ajans vaka çalışması için "${ctx}" projesinin Türkçe, premium tonda çözüm anlatımını yaz. Kısa, somut, 1–2 paragraf. Markdown alt başlık için "## " kullan.`, () => PD().SIM.blog(f.title || "Proje"));
    set("solution", out.replace(/^#.*$/m, "").replace(/ÖZET[\s\S]*$/i, "").trim());
    setAiBusy(false);
  };
  const save = status => {
    onSave({
      id: data.id,
      status,
      fields: f,
      title: f.title || "Başlıksız proje",
      client: f.client || "—",
      cat: serviceNames.join(" · ") || f.category || "Web",
      year: +(f.year || 2026),
      cover: f.cover || null
    });
  };
  const metrics = f.metrics || [];

  // existing projects to choose "next project" from (exclude the one being edited)
  const allProjects = PD().projects || [];
  const otherProjects = allProjects.filter(p => p.id !== data.id);
  // auto-pick: the project created right after this one (ordered by id = creation order), wrapping
  const ordered = [...allProjects].sort((a, b) => a.id - b.id);
  const curIdx = ordered.findIndex(p => p.id === data.id);
  const autoNext = ordered.length > 1 ? ordered[(curIdx >= 0 ? curIdx + 1 : 0) % ordered.length] : null;
  const autoNextTitle = autoNext && autoNext.id !== data.id ? autoNext.title : (ordered.find(p => p.id !== data.id) || {}).title;
  const nextTitle = f.next || autoNextTitle;
  const nextIsAuto = !f.next;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ed-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ed-back",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }), " Projelere d\xF6n"), /*#__PURE__*/React.createElement("span", {
    className: "adm-badge adm-badge--green"
  }, "Vaka \xE7al\u0131\u015Fmas\u0131 d\xFCzenleyici"), /*#__PURE__*/React.createElement("span", {
    className: "sp"
  }), /*#__PURE__*/React.createElement(MkSelect, {
    width: "150px",
    value: data.status,
    onChange: v => setData(d => ({
      ...d,
      status: v
    })),
    options: ["Taslak", "Arşiv", "Yayında"]
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => save("Taslak")
  }, "Tasla\u011Fa kaydet"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: () => save("Yayında")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  }), " Yay\u0131nla")), /*#__PURE__*/React.createElement("div", {
    className: "editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor__form"
  }, /*#__PURE__*/React.createElement(FormSection, {
    title: "K\xFCnye",
    hint: "hero + temel bilgiler"
  }, /*#__PURE__*/React.createElement(ImageUpload, {
    label: "Kapak g\xF6rseli (hero)",
    ratio: "21/9",
    value: f.cover,
    onChange: v => set("cover", v),
    hint: "\xF6neri 2100\xD7900"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Kategori / \xFCst etiket"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.category || "",
    onChange: e => set("category", e.target.value),
    placeholder: "\xF6rn. MARKA \xB7 WEB"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Proje ad\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    style: {
      fontSize: "1.1rem",
      fontWeight: 600
    },
    value: f.title || "",
    onChange: e => set("title", e.target.value),
    placeholder: "Proje ad\u0131"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "M\xFC\u015Fteri"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.client || "",
    onChange: e => set("client", e.target.value),
    placeholder: "M\xFC\u015Fteri / marka"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Y\u0131l"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.year || "",
    onChange: e => set("year", e.target.value),
    placeholder: "2026"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Verilen hizmetler"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    multi: true,
    searchable: true,
    value: serviceIds,
    onChange: v => set("serviceIds", v),
    placeholder: "Hizmet se\xE7in\u2026",
    options: serviceOptions
  })), /*#__PURE__*/React.createElement(Field, {
    label: "S\xFCre"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.duration || "",
    onChange: e => set("duration", e.target.value),
    placeholder: "\xF6rn. 14 hafta"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Rol\xFCm\xFCz"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.role || "",
    onChange: e => set("role", e.target.value),
    placeholder: "Strateji & Tasar\u0131m"
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "Problem",
    hint: "m\xFC\u015Fteri bize geldi\u011Finde nas\u0131l bir konumdayd\u0131?"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    value: f.problem || "",
    onChange: e => set("problem", e.target.value),
    placeholder: "M\xFC\u015Fterinin kar\u015F\u0131la\u015Ft\u0131\u011F\u0131 zorluk, ba\u015Flang\u0131\xE7 noktas\u0131, k\u0131s\u0131tlar\u2026"
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "\xC7\xF6z\xFCm & Yakla\u015F\u0131m",
    hint: "ne t\xFCr bir \xE7\xF6z\xFCm yolu sunduk?"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, "\xC7\xF6z\xFCm anlat\u0131m\u0131", /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: ".3rem .7rem"
    },
    disabled: aiBusy,
    onClick: aiWrite
  }, aiBusy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " \u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13
  }), " AI ile yaz"))), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    value: f.solution || "",
    onChange: e => set("solution", e.target.value),
    placeholder: "Stratejimiz ve uygulad\u0131\u011F\u0131m\u0131z \xE7\xF6z\xFCm\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", null, "S\xFCre\xE7 & detay (opsiyonel)"), /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "8rem"
    },
    value: f.body || "",
    onChange: e => set("body", e.target.value),
    placeholder: "Daha uzun anlat\u0131m. Bo\u015F sat\u0131rla paragraf, ## ile alt ba\u015Fl\u0131k."
  }))), /*#__PURE__*/React.createElement(FormSection, {
    title: "Etki & Sonu\xE7lar",
    hint: "hangi oranda b\xFCy\xFCme / ba\u015Far\u0131 sa\u011Flad\u0131k?"
  }, /*#__PURE__*/React.createElement(MetricsRepeater, {
    items: metrics,
    onChange: v => set("metrics", v)
  })), /*#__PURE__*/React.createElement(FormSection, {
    title: "M\xFC\u015Fteri yorumu",
    hint: "opsiyonel referans"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "5rem"
    },
    value: f.quote || "",
    onChange: e => set("quote", e.target.value),
    placeholder: "\u201CMarka ile \xE7al\u0131\u015Fmak\u2026\u201D"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Yorumu yapan"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.quoteAuthor || "",
    onChange: e => set("quoteAuthor", e.target.value),
    placeholder: "Ad Soyad"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "\xDCnvan / \u015Firket"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: f.quoteRole || "",
    onChange: e => set("quoteRole", e.target.value),
    placeholder: "CEO \xB7 \u015Eirket"
  })))), /*#__PURE__*/React.createElement(FormSection, {
    title: "G\xF6rseller & navigasyon"
  }, /*#__PURE__*/React.createElement(GalleryUpload, {
    label: "Proje g\xF6rselleri (tam geni\u015Flik)",
    items: f.gallery || [],
    onChange: v => set("gallery", v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Sonraki proje"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    searchable: true,
    value: f.next || "",
    onChange: v => set("next", v),
    placeholder: "Otomatik \u2014 tarihe g\xF6re s\u0131radaki",
    options: [{
      value: "",
      label: "Otomatik (tarihe göre sıradaki)"
    }, ...otherProjects.map(p => ({
      value: p.title,
      label: p.title
    }))]
  }), nextIsAuto && nextTitle && /*#__PURE__*/React.createElement("span", {
    className: "set-hint",
    style: {
      display: "block",
      marginTop: ".4rem",
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)"
    }
  }, "Se\xE7im yap\u0131lmad\u0131 \u2014 sistem otomatik olarak ", /*#__PURE__*/React.createElement("b", null, nextTitle), " projesini g\xF6sterecek.")))), /*#__PURE__*/React.createElement("div", {
    className: "editor__preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prev-frame__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-preview__dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "canl\u0131 \xF6nizleme \u2014 proje detay\u0131")), /*#__PURE__*/React.createElement("div", {
    className: "prev-scroll"
  }, /*#__PURE__*/React.createElement("article", {
    className: "pv"
  }, f.category && /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, f.category), /*#__PURE__*/React.createElement("h1", null, f.title || "Proje adı"), /*#__PURE__*/React.createElement("div", {
    className: "pv__cover"
  }, f.cover ? /*#__PURE__*/React.createElement("img", {
    src: f.cover,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "pv__placeholder"
  }, "KAPAK G\xD6RSEL\u0130")), /*#__PURE__*/React.createElement("dl", {
    className: "pv__meta"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "M\xFC\u015Fteri"), /*#__PURE__*/React.createElement("dd", null, f.client || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Y\u0131l"), /*#__PURE__*/React.createElement("dd", null, f.year || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Hizmetler"), /*#__PURE__*/React.createElement("dd", null, serviceNames.join(", ") || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "S\xFCre"), /*#__PURE__*/React.createElement("dd", null, f.duration || "—")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Rol"), /*#__PURE__*/React.createElement("dd", null, f.role || "—"))), f.problem && /*#__PURE__*/React.createElement("div", {
    className: "pv__block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Problem"), /*#__PURE__*/React.createElement("p", null, f.problem)), (f.solution || f.body) && /*#__PURE__*/React.createElement("div", {
    className: "pv__block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "\xC7\xF6z\xFCm"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".9rem"
    }
  }, renderRich([f.solution, f.body].filter(Boolean).join("\n\n")))), metrics.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pv__metrics"
  }, metrics.filter(m => m.label).map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: "pv__metric"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv__metric-lbl"
  }, m.label), /*#__PURE__*/React.createElement("span", {
    className: "pv__metric-val"
  }, /*#__PURE__*/React.createElement("span", {
    className: "b"
  }, m.before || "—"), /*#__PURE__*/React.createElement("span", {
    className: "ar"
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    className: "a"
  }, m.after || "—"))))), f.quote && /*#__PURE__*/React.createElement("blockquote", {
    className: "pv__quote"
  }, /*#__PURE__*/React.createElement("p", null, "\u201C", f.quote, "\u201D"), (f.quoteAuthor || f.quoteRole) && /*#__PURE__*/React.createElement("footer", null, f.quoteAuthor, f.quoteRole ? ` · ${f.quoteRole}` : "")), f.gallery && f.gallery.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: ".8rem"
    }
  }, f.gallery.map(g => /*#__PURE__*/React.createElement("figure", {
    key: g.id
  }, /*#__PURE__*/React.createElement("img", {
    className: "inl",
    src: g.src,
    alt: ""
  }), g.caption && /*#__PURE__*/React.createElement("figcaption", null, g.caption)))), nextTitle && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border)",
      paddingTop: "1.2rem",
      marginTop: ".5rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Sonraki Proje", nextIsAuto ? " · otomatik" : ""), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: ".4rem"
    }
  }, nextTitle, " \u2192"))))))));
}
Object.assign(window, {
  ProjectEditor
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/project-editor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/services.jsx
try { (() => {
/* Admin Hizmetler (Services) module — main services with nested sub-services.
   Each main service (parent: null) groups its sub-services. Projects pull from
   this list (grouped). Create/edit via a right slide-in drawer. */
const {
  useState: useSvState
} = React;
const SV = () => window.MK_ADMIN;
function ServicesM() {
  const [rows, setRows] = useSvState(SV().services);
  const [editing, setEditing] = useSvState(null); // null | {parent?} (new) | service

  const sync = next => {
    setRows(next);
    SV().services = next;
  };
  const save = svc => {
    const exists = svc.id && rows.some(x => x.id === svc.id);
    const next = exists ? rows.map(x => x.id === svc.id ? {
      ...x,
      ...svc
    } : x) : [...rows, {
      ...svc,
      id: svc.id || "svc" + Date.now(),
      parent: svc.parent || null
    }];
    sync(next);
    setEditing(null);
  };
  const remove = id => {
    // removing a main service also removes its children
    sync(rows.filter(x => x.id !== id && x.parent !== id));
  };
  const mains = rows.filter(s => !s.parent);
  const subsOf = id => rows.filter(s => s.parent === id);
  const SvcCard = ({
    s
  }) => /*#__PURE__*/React.createElement("div", {
    className: "svc-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-card__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: `svc-dot ${s.active ? "on" : ""}`
  }), /*#__PURE__*/React.createElement("h4", null, s.name), /*#__PURE__*/React.createElement("div", {
    className: "adm-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => setEditing(s),
    "aria-label": "D\xFCzenle"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => remove(s.id),
    "aria-label": "Sil"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  })))), /*#__PURE__*/React.createElement("p", null, s.desc), /*#__PURE__*/React.createElement(Badge, {
    tone: s.active ? "green" : "muted"
  }, s.active ? "Aktif" : "Pasif"));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Hizmetler",
    desc: `${mains.length} ana hizmet · ${rows.length - mains.length} alt hizmet`,
    action: /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      onClick: () => setEditing({
        parent: null
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Yeni Ana Hizmet")
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-groups"
  }, mains.map(m => {
    const subs = subsOf(m.id);
    return /*#__PURE__*/React.createElement("section", {
      key: m.id,
      className: "svc-group"
    }, /*#__PURE__*/React.createElement("header", {
      className: "svc-group__h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "svc-group__title"
    }, /*#__PURE__*/React.createElement("span", {
      className: `svc-dot ${m.active ? "on" : ""}`
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, m.name, " ", /*#__PURE__*/React.createElement("span", {
      className: "svc-group__count"
    }, subs.length, " alt hizmet")), m.desc && /*#__PURE__*/React.createElement("p", null, m.desc))), /*#__PURE__*/React.createElement("div", {
      className: "svc-group__actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      onClick: () => setEditing({
        parent: m.id
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " Alt hizmet"), /*#__PURE__*/React.createElement("button", {
      className: "adm-iconbtn",
      onClick: () => setEditing(m),
      "aria-label": "Ana hizmeti d\xFCzenle"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      className: "adm-iconbtn",
      onClick: () => remove(m.id),
      "aria-label": "Sil"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 14
    })))), subs.length > 0 ? /*#__PURE__*/React.createElement("div", {
      className: "svc-grid"
    }, subs.map(s => /*#__PURE__*/React.createElement(SvcCard, {
      key: s.id,
      s: s
    }))) : /*#__PURE__*/React.createElement("button", {
      className: "svc-empty",
      onClick: () => setEditing({
        parent: m.id
      })
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 14
    }), " \u0130lk alt hizmeti ekle"));
  }))), editing !== null && /*#__PURE__*/React.createElement(ServiceEditor, {
    service: editing,
    mains: mains,
    onClose: () => setEditing(null),
    onSave: save
  }));
}
function ServiceEditor({
  service,
  mains,
  onClose,
  onSave
}) {
  const [s, setS] = useSvState({
    name: "",
    desc: "",
    active: true,
    parent: null,
    ...service
  });
  const set = (k, v) => setS(p => ({
    ...p,
    [k]: v
  }));
  const isMain = !s.parent;
  // can't reparent a main service that itself has children into another (keep one level)
  const parentOpts = [{
    value: "",
    label: "— Ana hizmet (üst yok)"
  }, ...mains.filter(m => m.id !== s.id).map(m => ({
    value: m.id,
    label: m.name
  }))];
  return /*#__PURE__*/React.createElement(Drawer, {
    title: service && service.id ? "Hizmeti düzenle" : s.parent ? "Yeni alt hizmet" : "Yeni ana hizmet",
    subtitle: isMain ? "Ana hizmet — altına alt hizmetler eklenebilir" : "Alt hizmet — bir ana hizmete bağlı",
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      onClick: onClose
    }, "Vazge\xE7"), /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--primary",
      disabled: !s.name.trim(),
      onClick: () => onSave(s)
    }, "Kaydet"))
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\xDCst hizmet"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: s.parent || "",
    onChange: v => set("parent", v || null),
    options: parentOpts
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Hizmet ad\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.name,
    onChange: e => set("name", e.target.value),
    placeholder: isMain ? "örn. Geliştirme" : "örn. Mobil Uygulama",
    autoFocus: true
  })), /*#__PURE__*/React.createElement(Field, {
    label: "K\u0131sa a\xE7\u0131klama"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "6rem"
    },
    value: s.desc,
    onChange: e => set("desc", e.target.value),
    placeholder: "Bu hizmette ne sunuyorsunuz?"
  })), /*#__PURE__*/React.createElement("div", {
    className: "set-row",
    style: {
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600,
      fontSize: "var(--fs-sm)"
    }
  }, "Aktif"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--fs-xs)",
      color: "var(--text-muted)"
    }
  }, "Pasif hizmetler projelerde se\xE7ilemez")), /*#__PURE__*/React.createElement(Switch, {
    on: s.active,
    onChange: v => set("active", v)
  })));
}
Object.assign(window, {
  ServicesM
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/settings.jsx
try { (() => {
/* Comprehensive, modular Genel Ayarlar — tabbed: Marka & Kimlik, Logolar &
   Favicon, AI & API, SEO & Sosyal, Bölge & Dil, Gelişmiş. */
const {
  useState: useSetState
} = React;
const TIMEZONES = (() => {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch (e) {
    return ["Europe/Istanbul", "Europe/London", "UTC", "America/New_York", "America/Los_Angeles", "Asia/Dubai", "Asia/Tokyo", "Australia/Sydney"];
  }
})();
const LANG_OPTS = window.MarkaI18n ? window.MarkaI18n.LANGS.map(l => ({
  value: l.id,
  label: `${l.flag}  ${l.label}`
})) : [{
  value: "tr",
  label: "Türkçe"
}, {
  value: "en",
  label: "English"
}];
const SET_KEY = "mk-settings";
function setDefaults() {
  return {
    brandName: window.MARKA && window.MARKA.BRAND_NAME || "Marka",
    slogan: window.MARKA && window.MARKA.BRAND_SLOGAN || "Dijitalde yeni standart.",
    email: "merhaba@marka.studio",
    phone: "+90 212 000 00 00",
    address: "Bomonti, İstanbul",
    logos: {},
    // dataURLs, not persisted
    aiProvider: "anthropic",
    aiModel: "claude-haiku-4-5",
    aiMaxTokens: 1024,
    aiTemp: 0.7,
    aiBudget: "500",
    metaTitle: "Marka — Dijitalde yeni standart",
    metaDesc: "Markaları geleceğe taşıyan ödüllü kreatif stüdyo.",
    analytics: "",
    ogImage: null,
    lang: window.MarkaI18n ? window.MarkaI18n.get() : "tr",
    tz: "Europe/Istanbul",
    currency: "TRY",
    dateFmt: "DD MMM YYYY",
    maintenance: false,
    comments: true,
    indexing: true
  };
}
function setLoad() {
  try {
    return Object.assign(setDefaults(), JSON.parse(localStorage.getItem(SET_KEY) || "{}"));
  } catch (e) {
    return setDefaults();
  }
}
function setPersist(s) {
  const {
    logos,
    ogImage,
    apiKey,
    ...rest
  } = s;
  try {
    localStorage.setItem(SET_KEY, JSON.stringify(rest));
  } catch (e) {}
}
const SET_TABS = [{
  id: "brand",
  label: "Marka & Kimlik",
  icon: "settings"
}, {
  id: "logos",
  label: "Logolar & Favicon",
  icon: "media"
}, {
  id: "ai",
  label: "AI & API",
  icon: "ai"
}, {
  id: "seo",
  label: "SEO & Sosyal",
  icon: "seo"
}, {
  id: "regional",
  label: "Bölge & Dil",
  icon: "dashboard"
}, {
  id: "advanced",
  label: "Gelişmiş",
  icon: "settings"
}];
const LOGO_SLOTS = [{
  k: "wordmark",
  label: "Ana logo",
  hint: "Yatay wordmark · SVG/PNG",
  wide: true
}, {
  k: "dark",
  label: "Koyu zemin logosu",
  hint: "Açık renkli sürüm",
  wide: true
}, {
  k: "light",
  label: "Açık zemin logosu",
  hint: "Koyu renkli sürüm",
  wide: true
}, {
  k: "favicon",
  label: "Favicon",
  hint: "32×32 / 64×64",
  wide: false
}, {
  k: "appicon",
  label: "Uygulama ikonu",
  hint: "512×512 (PWA)",
  wide: false
}, {
  k: "og",
  label: "Sosyal paylaşım (OG)",
  hint: "1200×630",
  wide: true
}];
function LogoSlot({
  slot,
  value,
  onChange
}) {
  const ref = React.useRef();
  const onFile = file => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => onChange(e.target.result);
    r.readAsDataURL(file);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "set-logo"
  }, /*#__PURE__*/React.createElement("div", {
    className: `img-up ${value ? "has" : ""} ${slot.wide ? "wide" : ""}`,
    style: {
      aspectRatio: slot.wide ? "16 / 6" : "1 / 1"
    },
    onClick: () => {
      if (window.openImagePicker) window.openImagePicker(onChange);else ref.current.click();
    },
    onDragOver: e => e.preventDefault(),
    onDrop: e => {
      e.preventDefault();
      onFile(e.dataTransfer.files[0]);
    }
  }, value ? /*#__PURE__*/React.createElement("img", {
    src: value,
    alt: "",
    style: {
      objectFit: "contain",
      padding: 8
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "img-up__ph"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "media",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "Y\xFCkle")), value && /*#__PURE__*/React.createElement("button", {
    className: "img-up__x",
    onClick: e => {
      e.stopPropagation();
      onChange(null);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 13
  })), /*#__PURE__*/React.createElement("input", {
    ref: ref,
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => onFile(e.target.files[0])
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: "var(--fs-sm)",
      fontWeight: 600
    }
  }, slot.label), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", null, slot.hint)));
}
function Settings() {
  const [tab, setTab] = useSetState("brand");
  const [s, setS] = useSetState(setLoad());
  const [toast, setToast] = useSetState(false);
  const [showKey, setShowKey] = useSetState(false);
  const [conn, setConn] = useSetState(null); // null|'testing'|'ok'
  const set = (k, v) => setS(x => ({
    ...x,
    [k]: v
  }));
  const setLogo = (k, v) => setS(x => ({
    ...x,
    logos: {
      ...x.logos,
      [k]: v
    }
  }));
  const save = () => {
    setPersist(s);
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };
  const testConn = () => {
    setConn("testing");
    setTimeout(() => setConn("ok"), 1100);
  };
  const Brand = /*#__PURE__*/React.createElement("div", {
    className: "set-stack"
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Marka kimli\u011Fi",
    desc: "brand/brand.js ile senkron \u2014 tek noktadan y\xF6netim"
  }, /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Marka ad\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.brandName,
    onChange: e => set("brandName", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Slogan"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.slogan,
    onChange: e => set("slogan", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u0130leti\u015Fim e-postas\u0131"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.email,
    onChange: e => set("email", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Telefon"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.phone,
    onChange: e => set("phone", e.target.value)
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Adres"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.address,
    onChange: e => set("address", e.target.value)
  }))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "Sosyal hesaplar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, ["Instagram", "LinkedIn", "X", "YouTube", "Dribbble", "Behance"].map(n => /*#__PURE__*/React.createElement(Field, {
    key: n,
    label: n
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    placeholder: `marka.studio/${n.toLowerCase()}`,
    defaultValue: ""
  }))))));
  const Logos = /*#__PURE__*/React.createElement(AdmCard, {
    title: "Logolar & Favicon",
    desc: "T\xFCm logo \xE7e\u015Fitlerini ve ikonlar\u0131 buradan y\xF6net"
  }, /*#__PURE__*/React.createElement("div", {
    className: "set-logos"
  }, LOGO_SLOTS.map(slot => /*#__PURE__*/React.createElement(LogoSlot, {
    key: slot.k,
    slot: slot,
    value: s.logos[slot.k],
    onChange: v => setLogo(slot.k, v)
  }))), /*#__PURE__*/React.createElement("span", {
    className: "adm-skeleton-note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "media",
    size: 12
  }), " \xD6nerilen: vekt\xF6r (SVG) logo + 512px PNG favicon. Y\xFCklenenler bu oturumda saklan\u0131r."));
  const AI = /*#__PURE__*/React.createElement("div", {
    className: "set-stack"
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "AI Sa\u011Flay\u0131c\u0131 & API",
    desc: window.MK_ADMIN.aiAvailable ? "Yerleşik AI aktif — anahtar gerekmeden çalışır" : "Simülasyon modu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Sa\u011Flay\u0131c\u0131"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: s.aiProvider,
    onChange: v => set("aiProvider", v),
    options: [{
      value: "anthropic",
      label: "Anthropic (Claude)"
    }, {
      value: "openai",
      label: "OpenAI"
    }, {
      value: "custom",
      label: "Özel uç nokta"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Model"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: s.aiModel,
    onChange: v => set("aiModel", v),
    options: ["claude-haiku-4-5", "claude-sonnet-4-5", "gpt-4o-mini"]
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "API anahtar\u0131"
  }, /*#__PURE__*/React.createElement("div", {
    className: "key-input"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    type: showKey ? "text" : "password",
    placeholder: "sk-\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: s.apiKey || "",
    onChange: e => set("apiKey", e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => setShowKey(v => !v)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: testConn
  }, conn === "testing" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ai-spinner",
    style: {
      borderColor: "var(--accent)",
      borderTopColor: "transparent"
    }
  }), " Test\u2026") : "Bağlantıyı test et"))), conn === "ok" && /*#__PURE__*/React.createElement("span", {
    className: "conn-ok"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 13,
    fill: true
  }), " Ba\u011Flant\u0131 ba\u015Far\u0131l\u0131 \u2014 model yan\u0131t veriyor"), /*#__PURE__*/React.createElement("div", {
    className: "set-row",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: `Yaratıcılık (temperature) — ${s.aiTemp}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "range-row"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "1",
    step: "0.1",
    value: s.aiTemp,
    onChange: e => set("aiTemp", +e.target.value),
    style: {
      accentColor: "var(--accent)",
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("output", null, s.aiTemp))), /*#__PURE__*/React.createElement(Field, {
    label: "Maks. token"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    type: "number",
    value: s.aiMaxTokens,
    onChange: e => set("aiMaxTokens", +e.target.value)
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Ayl\u0131k b\xFCt\xE7e (USD)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.aiBudget,
    onChange: e => set("aiBudget", e.target.value)
  }))), /*#__PURE__*/React.createElement(AdmCard, {
    title: "AI \xF6zellikleri"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, [["Blog yazı asistanı", true], ["SEO meta üretimi", true], ["Haftalık raporlar", true], ["Görsel alt-metin (alt text)", false]].map(([l, d]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-sm)"
    }
  }, l), /*#__PURE__*/React.createElement(Switch, {
    on: d,
    onChange: () => {}
  }))))));
  const SEOt = /*#__PURE__*/React.createElement(AdmCard, {
    title: "SEO & Sosyal varsay\u0131lanlar\u0131"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Varsay\u0131lan ba\u015Fl\u0131k (title)"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    value: s.metaTitle,
    onChange: e => set("metaTitle", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Varsay\u0131lan a\xE7\u0131klama (meta description)"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "adm-textarea",
    style: {
      minHeight: "4rem"
    },
    value: s.metaDesc,
    onChange: e => set("metaDesc", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Analytics ID"
  }, /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    placeholder: "G-XXXXXXX",
    value: s.analytics,
    onChange: e => set("analytics", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Arama motoru indeksleme"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    on: s.indexing,
    onChange: v => set("indexing", v)
  })))), /*#__PURE__*/React.createElement(LogoSlot, {
    slot: {
      k: "og",
      label: "Varsayılan paylaşım görseli (OG)",
      hint: "1200×630",
      wide: true
    },
    value: s.ogImage,
    onChange: v => set("ogImage", v)
  }));
  const Regional = /*#__PURE__*/React.createElement(AdmCard, {
    title: "B\xF6lge & Dil"
  }, /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Dil"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: s.lang,
    onChange: v => {
      set("lang", v);
      if (window.MarkaI18n) window.MarkaI18n.set(v);
    },
    options: LANG_OPTS
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Saat dilimi"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: s.tz,
    onChange: v => set("tz", v),
    options: TIMEZONES,
    searchable: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "set-row"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Para birimi"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: s.currency,
    onChange: v => set("currency", v),
    options: [{
      value: "TRY",
      label: "₺ TRY"
    }, {
      value: "USD",
      label: "$ USD"
    }, {
      value: "EUR",
      label: "€ EUR"
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Tarih format\u0131"
  }, /*#__PURE__*/React.createElement(MkSelect, {
    value: s.dateFmt,
    onChange: v => set("dateFmt", v),
    options: ["DD MMM YYYY", "DD.MM.YYYY", "YYYY-MM-DD"]
  }))));
  const Advanced = /*#__PURE__*/React.createElement("div", {
    className: "set-stack"
  }, /*#__PURE__*/React.createElement(AdmCard, {
    title: "Sistem"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600,
      fontSize: "var(--fs-sm)"
    }
  }, "Bak\u0131m modu"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-xs)"
    }
  }, "Ziyaret\xE7ilere bak\u0131m sayfas\u0131 g\xF6sterilir")), /*#__PURE__*/React.createElement(Switch, {
    on: s.maintenance,
    onChange: v => set("maintenance", v)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600,
      fontSize: "var(--fs-sm)"
    }
  }, "Yorumlara izin ver"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-xs)"
    }
  }, "Blog yaz\u0131lar\u0131nda yorum b\xF6l\xFCm\xFC")), /*#__PURE__*/React.createElement(Switch, {
    on: s.comments,
    onChange: v => set("comments", v)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: ".6rem",
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, "\xD6nbelle\u011Fi temizle"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, "Veriyi d\u0131\u015Fa aktar (JSON)"))), /*#__PURE__*/React.createElement("div", {
    className: "danger"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Tehlikeli b\xF6lge"), /*#__PURE__*/React.createElement("p", null, "T\xFCm tema ve ayarlar\u0131 fabrika de\u011Ferlerine d\xF6nd\xFCr\xFCr.")), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--danger",
    onClick: () => {
      window.MarkaTheme.reset();
      localStorage.removeItem(SET_KEY);
      setS(setDefaults());
      setToast(true);
      setTimeout(() => setToast(false), 2200);
    }
  }, "Her \u015Feyi s\u0131f\u0131rla")));
  const PANES = {
    brand: Brand,
    logos: Logos,
    ai: AI,
    seo: SEOt,
    regional: Regional,
    advanced: Advanced
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "set"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "set-nav"
  }, SET_TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: tab === t.id ? "on" : "",
    onClick: () => setTab(t.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-nav__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 17
  })), t.label))), /*#__PURE__*/React.createElement("div", null, PANES[tab], /*#__PURE__*/React.createElement("div", {
    className: "set-save"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "De\u011Fi\u015Fiklikler otomatik saklanmaz \u2014 kaydetmeyi unutmay\u0131n"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    onClick: () => setS(setLoad())
  }, "Geri al"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary",
    onClick: save
  }, "De\u011Fi\u015Fiklikleri kaydet")))), toast && /*#__PURE__*/React.createElement("div", {
    className: "set-toast"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ai",
    size: 14,
    fill: true
  })), " Ayarlar kaydedildi"));
}
Object.assign(window, {
  Settings
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/settings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/uploader.jsx
try { (() => {
/* Image upload controls — real file → dataURL preview, drag & drop. */
const {
  useState: useUpState,
  useRef: useUpRef
} = React;
function readImg(file, cb) {
  if (!file || !file.type.startsWith("image/")) return;
  const r = new FileReader();
  r.onload = e => cb(e.target.result);
  r.readAsDataURL(file);
}

/* generic file picker — returns { name, size, src? } (src only for small files) */
function FileDrop({
  value,
  onChange,
  accept,
  label,
  hint,
  icon = "media"
}) {
  const ref = useUpRef();
  const [drag, setDrag] = useUpState(false);
  const take = file => {
    if (!file) return;
    const meta = {
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + " MB",
      type: file.type
    };
    if (file.size < 4 * 1024 * 1024) {
      const r = new FileReader();
      r.onload = e => onChange({
        ...meta,
        src: e.target.result
      });
      r.readAsDataURL(file);
    } else onChange(meta);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, label && /*#__PURE__*/React.createElement("label", null, label, hint && /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: "var(--text-subtle)",
      marginLeft: 6
    }
  }, "\xB7 ", hint)), value ? /*#__PURE__*/React.createElement("div", {
    className: "file-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "file-chip__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "file-chip__meta"
  }, /*#__PURE__*/React.createElement("b", null, value.name), value.size && /*#__PURE__*/React.createElement("span", null, value.size)), /*#__PURE__*/React.createElement("button", {
    className: "adm-iconbtn",
    onClick: () => onChange(null),
    "aria-label": "Kald\u0131r"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }))) : /*#__PURE__*/React.createElement("div", {
    className: `file-drop ${drag ? "drag" : ""}`,
    onClick: () => {
      if (window.openImagePicker) window.openImagePicker(m => onChange({
        name: m && m.name || "Medya dosyası",
        src: m && m.src || m
      }));else ref.current && ref.current.click();
    },
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      take(e.dataTransfer.files[0]);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20
  }), /*#__PURE__*/React.createElement("span", null, "Dosya y\xFCkle veya buraya s\xFCr\xFCkle")), /*#__PURE__*/React.createElement("input", {
    ref: ref,
    type: "file",
    accept: accept,
    style: {
      display: "none"
    },
    onChange: e => take(e.target.files[0])
  }));
}
function ImageUpload({
  value,
  onChange,
  label,
  ratio = "16/9",
  hint
}) {
  const ref = useUpRef();
  const [drag, setDrag] = useUpState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, label && /*#__PURE__*/React.createElement("label", null, label, hint && /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: "var(--text-subtle)",
      marginLeft: 6
    }
  }, "\xB7 ", hint)), /*#__PURE__*/React.createElement("div", {
    className: `img-up ${value ? "has" : ""} ${drag ? "drag" : ""}`,
    style: {
      aspectRatio: ratio.replace("/", " / ")
    },
    onClick: () => {
      if (window.openImagePicker) window.openImagePicker(onChange);else ref.current && ref.current.click();
    },
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      readImg(e.dataTransfer.files[0], onChange);
    }
  }, value ? /*#__PURE__*/React.createElement("img", {
    src: value,
    alt: ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "img-up__ph"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "media",
    size: 26
  }), /*#__PURE__*/React.createElement("span", null, "G\xF6rsel y\xFCkle veya buraya s\xFCr\xFCkle")), value && /*#__PURE__*/React.createElement("button", {
    className: "img-up__x",
    onClick: e => {
      e.stopPropagation();
      onChange(null);
    },
    "aria-label": "Kald\u0131r"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  })), /*#__PURE__*/React.createElement("input", {
    ref: ref,
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: e => readImg(e.target.files[0], onChange)
  })));
}
function GalleryUpload({
  items = [],
  onChange,
  label = "Galeri görselleri"
}) {
  const ref = useUpRef();
  const add = files => {
    const list = [...files].filter(f => f.type.startsWith("image/"));
    let pending = list.length,
      acc = [];
    if (!pending) return;
    list.forEach(f => readImg(f, src => {
      acc.push({
        id: Date.now() + Math.random(),
        src,
        caption: ""
      });
      if (--pending === 0) onChange([...items, ...acc]);
    }));
  };
  const update = (id, patch) => onChange(items.map(i => i.id === id ? {
    ...i,
    ...patch
  } : i));
  const remove = id => onChange(items.filter(i => i.id !== id));
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-field"
  }, /*#__PURE__*/React.createElement("label", null, label, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: "var(--text-subtle)"
    }
  }, "\xB7 ", items.length, " g\xF6rsel")), /*#__PURE__*/React.createElement("div", {
    className: "gal-grid"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    className: "gal-item",
    key: it.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "img-up has",
    style: {
      aspectRatio: "1 / 1"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: it.src,
    alt: ""
  }), /*#__PURE__*/React.createElement("button", {
    className: "img-up__x",
    onClick: () => remove(it.id),
    "aria-label": "Kald\u0131r"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 14
  }))), /*#__PURE__*/React.createElement("input", {
    className: "gal-cap",
    placeholder: "A\xE7\u0131klama (ops.)",
    value: it.caption,
    onChange: e => update(it.id, {
      caption: e.target.value
    })
  }))), /*#__PURE__*/React.createElement("button", {
    className: "img-up",
    style: {
      aspectRatio: "1 / 1"
    },
    onClick: () => {
      if (window.openImagePicker) window.openImagePicker(src => onChange([...items, {
        id: Date.now() + Math.random(),
        src,
        caption: ""
      }]));else ref.current && ref.current.click();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "img-up__ph"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, "Ekle")))), /*#__PURE__*/React.createElement("input", {
    ref: ref,
    type: "file",
    accept: "image/*",
    multiple: true,
    style: {
      display: "none"
    },
    onChange: e => add(e.target.files)
  }));
}
Object.assign(window, {
  ImageUpload,
  GalleryUpload
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/uploader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Community.jsx
try { (() => {
/* Faz 3 — Topluluk: "Haftanın İşi" (votes ranking), Koleksiyonlar (curated lists
   with follow) and a visitor Rozet (badge) strip. Tied to MarkaVotes + MarkaMembers.
   Registered as home sections (window.WeeklyWork, window.Collections). */
const {
  useState: useCmState,
  useEffect: useCmEffect
} = React;
const PROJECT_META = {
  "atlas-finans-yeniden-markalasma": {
    title: "Atlas Finans yeniden markalaşma",
    client: "Atlas Bank · 2026",
    cat: "MARKA",
    hue: 20,
    href: "../../pages/project.html"
  },
  "nova-spor-uygulamasi": {
    title: "Nova Spor Uygulaması",
    client: "Nova · 2026",
    cat: "UI/UX",
    hue: 0,
    href: "#"
  },
  "venta-e-ticaret": {
    title: "Venta e-ticaret",
    client: "Venta · 2026",
    cat: "E-TİCARET",
    hue: -50,
    href: "#"
  },
  "pera-galeri-kimligi": {
    title: "Pera Galeri kimliği",
    client: "Pera Sanat · 2025",
    cat: "MARKA",
    hue: 40,
    href: "#"
  }
};
const cmAuthed = () => window.MarkaMembers && window.MarkaMembers.isAuthed();
function cmUseVotes() {
  const [, f] = useCmState(0);
  useCmEffect(() => {
    if (!window.MarkaVotes) return;
    return window.MarkaVotes.subscribe(() => f(n => n + 1));
  }, []);
}

/* ----------------- Haftanın İşi ----------------- */
function VoteHeart({
  id
}) {
  const voted = window.MarkaVotes && window.MarkaVotes.hasVoted(id);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `vote vote--static ${voted ? "is-voted" : ""}`,
    "aria-pressed": !!voted,
    "aria-label": "Vote",
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      window.MarkaVotes.toggle(id);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: voted ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z"
  })), /*#__PURE__*/React.createElement("span", {
    className: "vote__n"
  }, window.MarkaVotes ? window.MarkaVotes.count(id) : 0));
}
function WeeklyWork() {
  cmUseVotes();
  if (!window.MarkaVotes) return null;
  const ranked = window.MarkaVotes.top(4).filter(r => PROJECT_META[r.id]);
  if (!ranked.length) return null;
  const top = ranked[0],
    rest = ranked.slice(1);
  const m = PROJECT_META[top.id];
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap weekly",
    "aria-label": "Haftan\u0131n i\u015Fi"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Topluluk",
    title: "Haftan\u0131n \u0130\u015Fi",
    sub: "Toplulu\u011Fun oylar\u0131yla \xF6ne \xE7\u0131kan projeler. Sen de be\u011Fen, s\u0131ralamay\u0131 belirle.",
    linkText: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "weekly__grid"
  }, /*#__PURE__*/React.createElement("a", {
    className: "weekly__hero reveal",
    href: m.href,
    "data-cursor": "Projeyi G\xF6r"
  }, /*#__PURE__*/React.createElement("div", {
    className: "weekly__cover"
  }, /*#__PURE__*/React.createElement(Ph, {
    ratio: "16/10",
    tag: "PROJE G\xD6RSEL\u0130",
    hue: m.hue
  }), /*#__PURE__*/React.createElement("span", {
    className: "weekly__crown"
  }, "\uD83C\uDFC6 Haftan\u0131n \u0130\u015Fi"), /*#__PURE__*/React.createElement("span", {
    className: "weekly__votes"
  }, /*#__PURE__*/React.createElement(VoteHeart, {
    id: top.id
  }))), /*#__PURE__*/React.createElement("div", {
    className: "weekly__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card__meta mono"
  }, m.cat), /*#__PURE__*/React.createElement("h3", null, m.title), /*#__PURE__*/React.createElement("span", {
    className: "card__meta"
  }, m.client))), /*#__PURE__*/React.createElement("ol", {
    className: "weekly__list"
  }, rest.map((r, i) => {
    const pm = PROJECT_META[r.id];
    return /*#__PURE__*/React.createElement("li", {
      key: r.id,
      className: "weekly__row reveal",
      style: {
        transitionDelay: i * 70 + "ms"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "weekly__rank"
    }, i + 2), /*#__PURE__*/React.createElement("div", {
      className: "weekly__rowMedia"
    }, /*#__PURE__*/React.createElement(Ph, {
      ratio: "1/1",
      tag: "",
      hue: pm.hue
    })), /*#__PURE__*/React.createElement("div", {
      className: "weekly__rowMeta"
    }, /*#__PURE__*/React.createElement("h4", null, pm.title), /*#__PURE__*/React.createElement("span", {
      className: "card__meta mono"
    }, pm.cat)), /*#__PURE__*/React.createElement(VoteHeart, {
      id: r.id
    }));
  }))));
}

/* ----------------- Koleksiyonlar + Rozetler ----------------- */
const COLLECTIONS = [{
  id: "k1",
  title: "Editöryel Web",
  count: 18,
  hue: 0,
  base: 1240
}, {
  id: "k2",
  title: "Cesur Tipografi",
  count: 24,
  hue: 40,
  base: 980
}, {
  id: "k3",
  title: "Minimal E-ticaret",
  count: 15,
  hue: -50,
  base: 1530
}, {
  id: "k4",
  title: "Hareket & Etkileşim",
  count: 12,
  hue: 200,
  base: 760
}];
function getFollows() {
  try {
    return JSON.parse(localStorage.getItem("mk-follows") || "[]");
  } catch (e) {
    return [];
  }
}
function toggleFollow(id) {
  const f = getFollows();
  const n = f.includes(id) ? f.filter(x => x !== id) : f.concat([id]);
  try {
    localStorage.setItem("mk-follows", JSON.stringify(n));
  } catch (e) {}
  return n;
}
function demoAvatars() {
  const ms = (window.MarkaMembers ? window.MarkaMembers.members() : []).slice(0, 3);
  return ms.length ? ms.map(m => (m.name || "?")[0]) : ["E", "M", "L"];
}
const BADGE_ICONS = {
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM5 21a7 7 0 0114 0",
  play: "M8 5v14l11-7z",
  heart: "M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z",
  bookmark: "M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z",
  trophy: "M7 4h10v3a5 5 0 01-10 0zM7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3M9 14h6l-1 4h-4z"
};
function playedAny() {
  try {
    if (Object.keys(JSON.parse(localStorage.getItem("mk-games-played") || "{}")).length) return true;
  } catch (e) {}
  const u = cmAuthed() && window.MarkaMembers.current();
  return !!(u && u.scores && Object.keys(u.scores).length);
}
function votedAny() {
  return window.MarkaVotes && Object.keys(PROJECT_META).some(id => window.MarkaVotes.hasVoted(id));
}
function championAny() {
  if (!cmAuthed()) return false;
  const cfg = [["memory", false], ["sequence", false], ["reaction", true]];
  return cfg.some(([g, low]) => {
    const r = window.MarkaMembers.rank(g, low);
    return r && r.rank === 1;
  });
}
function Badges() {
  cmUseVotes();
  const [, f] = useCmState(0);
  useCmEffect(() => {
    if (!window.MarkaMembers) return;
    return window.MarkaMembers.subscribe(() => f(n => n + 1));
  }, []);
  const list = [{
    id: "uye",
    name: "Üye",
    desc: "Hesap oluştur",
    icon: "user",
    earned: cmAuthed()
  }, {
    id: "oyuncu",
    name: "Oyuncu",
    desc: "Bir oyun oyna",
    icon: "play",
    earned: playedAny()
  }, {
    id: "oy",
    name: "Oy Verdi",
    desc: "Bir projeye oy ver",
    icon: "heart",
    earned: votedAny()
  }, {
    id: "koleksiyon",
    name: "Koleksiyoncu",
    desc: "Bir koleksiyon takip et",
    icon: "bookmark",
    earned: getFollows().length > 0
  }, {
    id: "sampiyon",
    name: "Şampiyon",
    desc: "Bir oyunda 1. ol",
    icon: "trophy",
    earned: championAny()
  }];
  const earned = list.filter(b => b.earned).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "badges reveal",
    id: "rozetler"
  }, /*#__PURE__*/React.createElement("div", {
    className: "badges__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Rozetlerin"), /*#__PURE__*/React.createElement("span", {
    className: "badges__count"
  }, earned, "/", list.length)), /*#__PURE__*/React.createElement("div", {
    className: "badges__row"
  }, list.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    className: `badge3 ${b.earned ? "is-earned" : ""}`,
    title: b.desc
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge3__ic"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: BADGE_ICONS[b.icon]
  }))), /*#__PURE__*/React.createElement("span", {
    className: "badge3__nm"
  }, b.name), /*#__PURE__*/React.createElement("span", {
    className: "badge3__desc"
  }, b.earned ? "Kazanıldı" : b.desc)))));
}
function CollectionCard({
  c
}) {
  const [follows, setFollows] = useCmState(getFollows());
  const on = follows.includes(c.id);
  const avs = demoAvatars();
  return /*#__PURE__*/React.createElement("div", {
    className: "collcard reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "collcard__cover"
  }, /*#__PURE__*/React.createElement(Ph, {
    ratio: "16/10",
    tag: "KOLEKS\u0130YON",
    hue: c.hue
  }), /*#__PURE__*/React.createElement("span", {
    className: "collcard__count"
  }, c.count, " proje")), /*#__PURE__*/React.createElement("div", {
    className: "collcard__b"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "collcard__title"
  }, c.title), /*#__PURE__*/React.createElement("div", {
    className: "collcard__foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "collcard__people"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avstack"
  }, avs.map((a, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "avstack__a"
  }, a))), /*#__PURE__*/React.createElement("span", {
    className: "collcard__followers"
  }, (c.base + (on ? 1 : 0)).toLocaleString("tr-TR"), " takip\xE7i")), /*#__PURE__*/React.createElement("button", {
    className: `followbtn ${on ? "is-on" : ""}`,
    onClick: () => setFollows(toggleFollow(c.id))
  }, on ? "Takiptesin" : "Takip Et"))));
}
function Collections() {
  cmUseVotes();
  const cols = window.MarkaCommunity ? window.MarkaCommunity.collections() : COLLECTIONS;
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap collections",
    "aria-label": "Koleksiyonlar"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u0130lham",
    title: "Koleksiyonlar",
    sub: "K\xFCrat\xF6rl\xFC proje koleksiyonlar\u0131n\u0131 takip et, ilham ak\u0131\u015F\u0131n\u0131 ki\u015Fiselle\u015Ftir.",
    linkText: "T\xFCm\xFCn\xFC G\xF6r"
  }), /*#__PURE__*/React.createElement(Badges, null), /*#__PURE__*/React.createElement("div", {
    className: "grid-4 collections__grid"
  }, cols.map(c => /*#__PURE__*/React.createElement(CollectionCard, {
    key: c.id,
    c: c
  }))));
}
Object.assign(window, {
  WeeklyWork,
  Collections
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Community.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Games.jsx
try { (() => {
/* Homepage "Zihin Oyunları" — mind-training games section + slide-up game stage.
   Three games (memory match · sequential attention trail · reflex) with a daily
   one-play limit and a leaderboard tied to MarkaMembers. Registered as the
   "games" home section (window.Games). Load as text/babel before app.jsx. */
const {
  useState: useGState,
  useEffect: useGEffect,
  useRef: useGRef
} = React;
const GAMES = [{
  id: "memory",
  name: "Hafıza Eşleştirme",
  lower: false,
  unit: "puan",
  tag: "Hafıza",
  desc: "Kartları eşleştir; daha az hamle ve süre daha çok puan.",
  icon: "M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z"
}, {
  id: "sequence",
  name: "Sıralı Dikkat",
  lower: false,
  unit: "puan",
  tag: "Dikkat",
  desc: "1'den 12'ye sayıları sırayla, hızlıca bul ve dokun.",
  icon: "M4 6h4v4H4zM16 6h4v4h-4zM10 14h4v4h-4zM7 10l4 4M17 10l-3 4"
}, {
  id: "reaction",
  name: "Refleks",
  lower: true,
  unit: "ms",
  tag: "Reaksiyon",
  desc: "Yeşili gör, hemen dokun. Reaksiyon süreni ölç.",
  icon: "M13 2L4 14h7l-1 8 9-12h-7z"
}];
const gmeta = id => GAMES.find(g => g.id === id);
const today = () => new Date().toISOString().slice(0, 10);
const authed = () => window.MarkaMembers && window.MarkaMembers.isAuthed();
function dailyLimit() {
  return window.MarkaCommunity ? window.MarkaCommunity.dailyLimit() : 1;
}
function playsToday(gid) {
  if (authed()) {
    const u = window.MarkaMembers.current();
    const p = u.scores && u.scores[gid] && u.scores[gid].plays || [];
    return p.filter(x => x.date === today()).length;
  }
  try {
    const o = JSON.parse(localStorage.getItem("mk-games-played") || "{}")[gid];
    return o && o.date === today() ? o.count || 0 : 0;
  } catch (e) {
    return 0;
  }
}
function playedToday(gid) {
  return playsToday(gid) >= dailyLimit();
}
function markGuestPlayed(gid) {
  try {
    const o = JSON.parse(localStorage.getItem("mk-games-played") || "{}");
    const cur = o[gid] && o[gid].date === today() ? o[gid].count : 0;
    o[gid] = {
      date: today(),
      count: cur + 1
    };
    localStorage.setItem("mk-games-played", JSON.stringify(o));
  } catch (e) {}
}
function bestScore(gid) {
  const u = authed() && window.MarkaMembers.current();
  return u && u.scores && u.scores[gid] ? u.scores[gid].best : null;
}
function finishScore(gid, score, lower) {
  if (authed()) return window.MarkaMembers.submitScore(gid, score, lower);
  markGuestPlayed(gid);
  const board = window.MarkaMembers ? window.MarkaMembers.leaderboard(gid, lower) : [];
  const arr = board.map(b => b.best).concat([score]).sort((a, b) => lower ? a - b : b - a);
  return {
    rank: arr.indexOf(score) + 1,
    total: arr.length,
    best: score,
    guest: true
  };
}
function dailyAvg(gid) {
  const g = gmeta(gid);
  const b = window.MarkaMembers ? window.MarkaMembers.leaderboard(gid, g.lower) : [];
  if (!b.length) return null;
  return Math.round(b.reduce((a, r) => a + r.best, 0) / b.length);
}

/* per-game illustration banner */
function GameArt({
  id
}) {
  if (id === "memory") return /*#__PURE__*/React.createElement("svg", {
    className: "gart",
    viewBox: "0 0 240 130",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "240",
    height: "130",
    fill: "var(--accent-tint)"
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(46 26)"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "40",
    height: "36",
    rx: "7",
    fill: "#fff",
    stroke: "var(--border)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "0",
    width: "40",
    height: "36",
    rx: "7",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "72",
    y: "25",
    fontSize: "20",
    textAnchor: "middle",
    fill: "#fff"
  }, "\u2605"), /*#__PURE__*/React.createElement("rect", {
    x: "104",
    y: "0",
    width: "40",
    height: "36",
    rx: "7",
    fill: "#fff",
    stroke: "var(--border)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "46",
    width: "40",
    height: "36",
    rx: "7",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "71",
    fontSize: "20",
    textAnchor: "middle",
    fill: "#fff"
  }, "\u2605"), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "46",
    width: "40",
    height: "36",
    rx: "7",
    fill: "#fff",
    stroke: "var(--border)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "104",
    y: "46",
    width: "40",
    height: "36",
    rx: "7",
    fill: "#fff",
    stroke: "var(--border)"
  })));
  if (id === "sequence") return /*#__PURE__*/React.createElement("svg", {
    className: "gart",
    viewBox: "0 0 240 130",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "240",
    height: "130",
    fill: "var(--accent-tint)"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "70,40 150,40 150,92 96,92",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "8",
    strokeLinejoin: "round",
    strokeLinecap: "round",
    opacity: "0.35"
  }), /*#__PURE__*/React.createElement("g", {
    fontFamily: "var(--font-mono)",
    fontWeight: "600",
    fontSize: "15"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "40",
    r: "15",
    fill: "var(--ink-900)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "45",
    textAnchor: "middle",
    fill: "#fff"
  }, "1"), /*#__PURE__*/React.createElement("circle", {
    cx: "150",
    cy: "40",
    r: "15",
    fill: "var(--ink-900)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "45",
    textAnchor: "middle",
    fill: "#fff"
  }, "2"), /*#__PURE__*/React.createElement("circle", {
    cx: "150",
    cy: "92",
    r: "15",
    fill: "var(--ink-900)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "97",
    textAnchor: "middle",
    fill: "#fff"
  }, "3"), /*#__PURE__*/React.createElement("circle", {
    cx: "96",
    cy: "92",
    r: "15",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "96",
    y: "97",
    textAnchor: "middle",
    fill: "#fff"
  }, "4")));
  return /*#__PURE__*/React.createElement("svg", {
    className: "gart",
    viewBox: "0 0 240 130",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "240",
    height: "130",
    fill: "var(--accent-tint)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "65",
    r: "44",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "3",
    opacity: "0.3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "65",
    r: "30",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "3",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "65",
    r: "16",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M122 56l-9 13h7l-1 9 9-13h-7z",
    fill: "#fff"
  }));
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
const MEM_GLYPHS = [{
  s: "✦",
  c: "#16D17F"
}, {
  s: "●",
  c: "#2A6FDB"
}, {
  s: "■",
  c: "#E0567C"
}, {
  s: "▲",
  c: "#F2A93B"
}, {
  s: "◆",
  c: "#9B5CF6"
}, {
  s: "★",
  c: "#E8643C"
}, {
  s: "⬢",
  c: "#23B5B5"
}, {
  s: "♦",
  c: "#7A8794"
}];
function MemoryGame({
  onFinish
}) {
  const [cards, setCards] = useGState(() => {
    const deck = MEM_GLYPHS.concat(MEM_GLYPHS).map((g, i) => ({
      id: i,
      g,
      flipped: false,
      matched: false
    }));
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  });
  const [sel, setSel] = useGState([]);
  const [tries, setTries] = useGState(0);
  const [lock, setLock] = useGState(false);
  const [running, setRunning] = useGState(true);
  const [ms] = useTimer(running);
  const flip = i => {
    if (lock || cards[i].flipped || cards[i].matched) return;
    const nc = cards.slice();
    nc[i] = {
      ...nc[i],
      flipped: true
    };
    setCards(nc);
    const ns = sel.concat([i]);
    setSel(ns);
    if (ns.length === 2) {
      setTries(t => t + 1);
      setLock(true);
      const [a, b] = ns;
      if (nc[a].g.s === nc[b].g.s && nc[a].g.c === nc[b].g.c) {
        setTimeout(() => {
          const x = nc.slice();
          x[a] = {
            ...x[a],
            matched: true
          };
          x[b] = {
            ...x[b],
            matched: true
          };
          setCards(x);
          setSel([]);
          setLock(false);
          if (x.every(c => c.matched)) {
            setRunning(false);
            const secs = ms / 1000;
            const score = Math.max(10, Math.round(120 - (tries + 1) * 3 - secs));
            onFinish(score);
          }
        }, 360);
      } else {
        setTimeout(() => {
          const x = nc.slice();
          x[a] = {
            ...x[a],
            flipped: false
          };
          x[b] = {
            ...x[b],
            flipped: false
          };
          setCards(x);
          setSel([]);
          setLock(false);
        }, 760);
      }
    }
  };
  const matched = cards.filter(c => c.matched).length / 2;
  return /*#__PURE__*/React.createElement("div", {
    className: "gm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm__hud"
  }, /*#__PURE__*/React.createElement("span", null, "E\u015Fle\u015Fme ", /*#__PURE__*/React.createElement("b", null, matched, "/8")), /*#__PURE__*/React.createElement("span", null, "Hamle ", /*#__PURE__*/React.createElement("b", null, tries)), /*#__PURE__*/React.createElement("span", {
    className: "gm__time"
  }, (ms / 1000).toFixed(1), "s")), /*#__PURE__*/React.createElement("div", {
    className: "mem-grid"
  }, cards.map((c, i) => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    className: `mem-card ${c.flipped || c.matched ? "is-up" : ""} ${c.matched ? "is-matched" : ""}`,
    onClick: () => flip(i),
    "aria-label": "kart"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mem-card__in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mem-card__back"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mem-card__face",
    style: {
      color: c.g.c
    }
  }, c.g.s))))));
}

/* ======================= SEQUENCE (trail) ======================= */
const SEQ_N = 12,
  SEQ_COLS = 6,
  SEQ_CELLS = 36;
function SequenceGame({
  onFinish
}) {
  const [placement] = useGState(() => {
    const cells = Array.from({
      length: SEQ_CELLS
    }, (_, i) => i);
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    const map = {};
    for (let n = 1; n <= SEQ_N; n++) map[cells[n - 1]] = n;
    return map;
  });
  const [next, setNext] = useGState(1);
  const [wrong, setWrong] = useGState(0);
  const [flash, setFlash] = useGState(null);
  const [started, setStarted] = useGState(false);
  const [running, setRunning] = useGState(false);
  const [ms] = useTimer(running);
  const path = useGRef([]);
  const [, force] = useGState(0);
  const cellXY = cell => ({
    x: cell % SEQ_COLS + 0.5,
    y: Math.floor(cell / SEQ_COLS) + 0.5
  });
  const tap = cell => {
    const val = placement[cell];
    if (!val) return;
    if (val === next) {
      if (!started) {
        setStarted(true);
        setRunning(true);
      }
      path.current = path.current.concat([cellXY(cell)]);
      force(n => n + 1);
      if (val === SEQ_N) {
        setRunning(false);
        const secs = ms / 1000;
        const score = Math.max(10, Math.round(120 - secs * 4 - wrong * 6));
        setNext(val + 1);
        onFinish(score);
      } else setNext(val + 1);
    } else {
      setWrong(w => w + 1);
      setFlash(cell);
      setTimeout(() => setFlash(null), 280);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "gm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm__hud"
  }, /*#__PURE__*/React.createElement("span", null, "S\u0131radaki ", /*#__PURE__*/React.createElement("b", null, next > SEQ_N ? "✓" : next)), /*#__PURE__*/React.createElement("span", null, "Hata ", /*#__PURE__*/React.createElement("b", null, wrong)), /*#__PURE__*/React.createElement("span", {
    className: "gm__time"
  }, (ms / 1000).toFixed(1), "s")), /*#__PURE__*/React.createElement("div", {
    className: "seq-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "seq-trail",
    viewBox: `0 0 ${SEQ_COLS} ${SEQ_CELLS / SEQ_COLS}`,
    preserveAspectRatio: "none",
    "aria-hidden": "true"
  }, path.current.length > 1 && /*#__PURE__*/React.createElement("polyline", {
    points: path.current.map(p => `${p.x},${p.y}`).join(" "),
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "0.16",
    strokeLinejoin: "round",
    strokeLinecap: "round",
    opacity: "0.5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "seq-grid"
  }, Array.from({
    length: SEQ_CELLS
  }, (_, cell) => {
    const val = placement[cell];
    const done = val && val < next;
    return /*#__PURE__*/React.createElement("button", {
      key: cell,
      className: `seq-cell ${val ? "has" : ""} ${done ? "done" : ""} ${flash === cell ? "wrong" : ""}`,
      onClick: () => tap(cell),
      disabled: !val
    }, val || "");
  }))), !started && /*#__PURE__*/React.createElement("p", {
    className: "gm__hint"
  }, "\u0130lk say\u0131ya (1) dokununca s\xFCre ba\u015Flar."));
}

/* ======================= REFLEX ======================= */
const RX_ROUNDS = 5;
function ReflexGame({
  onFinish
}) {
  const [phase, setPhase] = useGState("idle"); // idle | wait | go | early
  const [round, setRound] = useGState(0);
  const [times, setTimes] = useGState([]);
  const [last, setLast] = useGState(null);
  const goAt = useGRef(0);
  const timer = useGRef(null);
  const arm = () => {
    setPhase("wait");
    setLast(null);
    timer.current = setTimeout(() => {
      goAt.current = performance.now();
      setPhase("go");
    }, 900 + Math.random() * 2200);
  };
  useGEffect(() => () => clearTimeout(timer.current), []);
  const click = () => {
    if (phase === "idle") {
      arm();
      return;
    }
    if (phase === "wait") {
      clearTimeout(timer.current);
      setPhase("early");
      return;
    }
    if (phase === "early") {
      arm();
      return;
    }
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
  return /*#__PURE__*/React.createElement("div", {
    className: "gm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm__hud"
  }, /*#__PURE__*/React.createElement("span", null, "Tur ", /*#__PURE__*/React.createElement("b", null, Math.min(round + 1, RX_ROUNDS), "/", RX_ROUNDS)), /*#__PURE__*/React.createElement("span", null, "Son ", /*#__PURE__*/React.createElement("b", null, last != null ? last + "ms" : "—")), /*#__PURE__*/React.createElement("span", {
    className: "gm__time"
  }, times.length ? "ort " + Math.round(times.reduce((a, b) => a + b, 0) / times.length) + "ms" : "")), /*#__PURE__*/React.createElement("button", {
    className: `rx rx--${phase}`,
    onClick: phase === "between" ? () => arm() : click
  }, phase === "idle" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Ba\u015Fla"), /*#__PURE__*/React.createElement("span", null, "Dokun ve haz\u0131r ol")), phase === "wait" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Bekle\u2026"), /*#__PURE__*/React.createElement("span", null, "Ye\u015Fili bekle")), phase === "go" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "DOKUN!")), phase === "early" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "\xC7ok erken!"), /*#__PURE__*/React.createElement("span", null, "Tekrar denemek i\xE7in dokun")), phase === "between" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, last, "ms"), /*#__PURE__*/React.createElement("span", null, "Sonraki tur i\xE7in dokun")), phase === "done" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Bitti \u2713"))));
}

/* ======================= RESULTS + LEADERBOARD ======================= */
function tierMessage(rank, total) {
  if (rank === 1) return {
    emoji: "🔥🔥🔥",
    title: "Zirvedesin!",
    text: "Birinci sıradasın — resmen alev aldın. Bu zihin seninle gurur duyuyor."
  };
  if (rank <= 3) return {
    emoji: "✨",
    title: "Çok yeteneklisin!",
    text: "Podyumdasın. Bir dahakine zirve kesinlikle senin — buna çok az kaldı."
  };
  if (rank <= 8) return {
    emoji: "💪",
    title: "İyi gidiyorsun!",
    text: "İlk sekiztesin. Biraz daha pratikle üst sıralara rahatça çıkarsın."
  };
  return {
    emoji: "🌱",
    title: "Gelişim yolundasın",
    text: "Daha sık zihin egzersizi yap; düzenli oynayanlar kısa sürede fark atıyor."
  };
}
function GameResults({
  gid,
  score,
  rank,
  onClose
}) {
  const g = gmeta(gid);
  const board = (window.MarkaMembers ? window.MarkaMembers.leaderboard(gid, g.lower) : []).slice(0, 8);
  const me = authed() && window.MarkaMembers.current();
  const t = rank ? tierMessage(rank.rank, rank.total) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "gres"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gres__hero"
  }, t && /*#__PURE__*/React.createElement("div", {
    className: "gres__emoji"
  }, t.emoji), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, g.name), /*#__PURE__*/React.createElement("div", {
    className: "gres__score"
  }, score, /*#__PURE__*/React.createElement("span", {
    className: "u"
  }, g.unit)), rank && /*#__PURE__*/React.createElement("div", {
    className: "gres__rank"
  }, rank.total, " ki\u015Fi i\xE7inde ", /*#__PURE__*/React.createElement("b", null, "#", rank.rank)), t && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: "gres__title"
  }, t.title), /*#__PURE__*/React.createElement("p", {
    className: "gres__text"
  }, t.text)), rank && rank.guest && /*#__PURE__*/React.createElement("p", {
    className: "gres__guest"
  }, "Skorun s\u0131ralamaya kaydedilmedi. ", /*#__PURE__*/React.createElement("button", {
    className: "gres__login",
    "data-action": "open-auth"
  }, "Giri\u015F yap"), " ve listede yer al.")), /*#__PURE__*/React.createElement("div", {
    className: "gres__board"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gres__board-h"
  }, /*#__PURE__*/React.createElement("span", null, "Bug\xFCn\xFCn S\u0131ralamas\u0131"), /*#__PURE__*/React.createElement("span", null, g.unit)), board.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: `gres__row ${me && r.id === me.id ? "is-me" : "is-blur"}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "gres__pos"
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    className: "gres__ava"
  }, r.avatar ? /*#__PURE__*/React.createElement("img", {
    src: r.avatar,
    alt: ""
  }) : (r.name || "?")[0]), /*#__PURE__*/React.createElement("span", {
    className: "gres__nm"
  }, me && r.id === me.id ? r.name + " (sen)" : r.name), /*#__PURE__*/React.createElement("span", {
    className: "gres__val"
  }, r.best))), !board.length && /*#__PURE__*/React.createElement("p", {
    className: "gm__hint"
  }, "Hen\xFCz skor yok \u2014 ilk sen ol!")), /*#__PURE__*/React.createElement("div", {
    className: "gres__cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary",
    onClick: onClose
  }, "Kapat ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192")), /*#__PURE__*/React.createElement("span", {
    className: "gres__again"
  }, "G\xFCnde 1 hak \xB7 yar\u0131n tekrar gel")));
}

/* ======================= STAGE (slide-up) ======================= */
function GameStage({
  gid,
  onClose
}) {
  const [open, setOpen] = useGState(false);
  const [phase, setPhase] = useGState(playedToday(gid) ? "done-already" : "play");
  const [result, setResult] = useGState(null);
  useGEffect(() => {
    const t = setTimeout(() => setOpen(true), 30);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, []);
  const close = () => {
    setOpen(false);
    setTimeout(onClose, 380);
  };
  const g = gmeta(gid);
  const finish = score => {
    const rank = finishScore(gid, score, g.lower);
    setResult({
      score,
      rank
    });
    setPhase("result");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `gstage ${open ? "is-open" : ""}`,
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gstage__scrim",
    onClick: close
  }), /*#__PURE__*/React.createElement("div", {
    className: "gstage__sheet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gstage__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gstage__tag"
  }, g.tag), /*#__PURE__*/React.createElement("h2", {
    className: "gstage__title"
  }, g.name), /*#__PURE__*/React.createElement("button", {
    className: "gstage__x",
    onClick: close,
    "aria-label": "Kapat"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "gstage__body"
  }, phase === "play" && gid === "memory" && /*#__PURE__*/React.createElement(MemoryGame, {
    onFinish: finish
  }), phase === "play" && gid === "sequence" && /*#__PURE__*/React.createElement(SequenceGame, {
    onFinish: finish
  }), phase === "play" && gid === "reaction" && /*#__PURE__*/React.createElement(ReflexGame, {
    onFinish: finish
  }), phase === "result" && /*#__PURE__*/React.createElement(GameResults, {
    gid: gid,
    score: result.score,
    rank: result.rank,
    onClose: close
  }), phase === "done-already" && /*#__PURE__*/React.createElement(GameResults, {
    gid: gid,
    score: bestScore(gid) != null ? bestScore(gid) : "—",
    rank: window.MarkaMembers && authed() ? window.MarkaMembers.rank(gid, g.lower) : null,
    onClose: close
  }))));
}

/* ======================= HOME SECTION ======================= */
function Games() {
  const [active, setActive] = useGState(null);
  const [, force] = useGState(0);
  useGEffect(() => {
    if (!window.MarkaMembers) return;
    return window.MarkaMembers.subscribe(() => force(n => n + 1));
  }, []);
  useGEffect(() => {
    if (!window.MarkaCommunity) return;
    return window.MarkaCommunity.subscribe(() => force(n => n + 1));
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap games",
    id: "oyunlar"
  }, /*#__PURE__*/React.createElement("header", {
    className: "games__head reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Zihin Oyunlar\u0131"), /*#__PURE__*/React.createElement("h2", {
    className: "games__title"
  }, "Zihnine bir mola, bir meydan okuma."), /*#__PURE__*/React.createElement("p", {
    className: "games__lead"
  }, "\u0130nsan zihni egzersizle keskinle\u015Fir. Haf\u0131za, dikkat ve reaksiyonunu g\xFC\xE7lendiren k\u0131sa oyunlar haz\u0131rlad\u0131k \u2014 her g\xFCn bir kez oyna, s\u0131ralamada y\xFCksel.")), /*#__PURE__*/React.createElement("div", {
    className: "games__grid"
  }, GAMES.filter(g => !window.MarkaCommunity || window.MarkaCommunity.gameOn(g.id)).map((g, i) => {
    const played = playedToday(g.id);
    const best = bestScore(g.id);
    const avg = dailyAvg(g.id);
    return /*#__PURE__*/React.createElement("button", {
      key: g.id,
      className: "gcard reveal",
      style: {
        transitionDelay: i * 80 + "ms"
      },
      onClick: () => setActive(g.id),
      "data-cursor": played ? "Sıralama" : "Oyna"
    }, /*#__PURE__*/React.createElement(GameArt, {
      id: g.id
    }), /*#__PURE__*/React.createElement("div", {
      className: "gcard__b"
    }, /*#__PURE__*/React.createElement("span", {
      className: "gcard__tag"
    }, g.tag), /*#__PURE__*/React.createElement("h3", {
      className: "gcard__name"
    }, g.name), /*#__PURE__*/React.createElement("p", {
      className: "gcard__desc"
    }, g.desc), /*#__PURE__*/React.createElement("div", {
      className: "gcard__foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: `gcard__status ${played ? "is-done" : ""}`
    }, played ? "Bugün oynandı" : "Bugün oynanabilir"), /*#__PURE__*/React.createElement("div", {
      className: "gcard__stats"
    }, avg != null && /*#__PURE__*/React.createElement("span", {
      className: "gcard__avg"
    }, "G\xFCn ort. ", /*#__PURE__*/React.createElement("b", null, avg, g.unit === "ms" ? "ms" : "")), best != null && /*#__PURE__*/React.createElement("span", {
      className: "gcard__best"
    }, "En iyi ", /*#__PURE__*/React.createElement("b", null, best, g.unit === "ms" ? "ms" : ""))))));
  })), active && /*#__PURE__*/React.createElement(GameStage, {
    gid: active,
    onClose: () => {
      setActive(null);
      force(n => n + 1);
    }
  }));
}
Object.assign(window, {
  Games
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Games.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Hero — "Ayın İşi". Three explorable directions (full / split / center) via
   a discreet switcher. Headline uses per-line mask-reveal. */
const {
  useState: useHState
} = React;
function MaskTitle({
  lines,
  id
}) {
  return /*#__PURE__*/React.createElement("h1", null, lines.map((ln, i) => /*#__PURE__*/React.createElement("span", {
    className: "mask reveal-mask",
    key: i,
    style: {
      "--rd": `${i * 90}ms`
    }
  }, /*#__PURE__*/React.createElement("span", null, ln))));
}
function Hero({
  variant
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    "data-variant": variant,
    "aria-label": "\xD6ne \xE7\u0131kan i\u015F"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__media",
    "data-parallax": true
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph__in"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero__scrim"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "\xD6ne \xC7\u0131kan \u0130\u015F \u2014 Haziran 2026"), /*#__PURE__*/React.createElement("span", {
    className: "hero__score"
  }, "Awwwards skoru ", /*#__PURE__*/React.createElement("b", null, "9.2"), " / 10")), /*#__PURE__*/React.createElement(MaskTitle, {
    lines: ["Atlas Finans", "yeniden", "markalaşma"]
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__meta"
  }, /*#__PURE__*/React.createElement("span", null, "M\xFC\u015Fteri / ", /*#__PURE__*/React.createElement("strong", null, "Atlas Bank")), /*#__PURE__*/React.createElement("span", null, "Hizmet / ", /*#__PURE__*/React.createElement("strong", null, "Marka \xB7 Web \xB7 \xDCr\xFCn"))), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "lg",
    arrow: true,
    magnetic: true,
    "data-cursor": "Projeyi \u0130ncele"
  }, "Projeyi \u0130ncele"))));
}
function HeroSwitch({
  variant,
  setVariant
}) {
  const opts = [["full", "Tam"], ["split", "Bölünmüş"], ["center", "Merkez"]];
  return /*#__PURE__*/React.createElement("div", {
    className: "heroswitch",
    role: "group",
    "aria-label": "Hero varyant\u0131"
  }, /*#__PURE__*/React.createElement("span", null, "Hero"), opts.map(([v, label]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: variant === v ? "on" : "",
    onClick: () => setVariant(v)
  }, label)));
}
Object.assign(window, {
  Hero,
  HeroSwitch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Home page sections: Latest Works, Partners, Services, Academy, Collections,
   Blog, Market, Stats, CTA. Content is brand-appropriate Turkish sample copy. */

function SectionHead({
  eyebrow,
  title,
  sub,
  linkText = "Tümünü Gör"
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "reveal",
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "2rem",
      flexWrap: "wrap",
      paddingBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      maxWidth: "46ch"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-h1)",
      fontWeight: 600,
      letterSpacing: "var(--ls-heading)"
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--fs-lead)"
    }
  }, sub)), linkText && /*#__PURE__*/React.createElement("a", {
    className: "btn btn--ghost",
    href: "#",
    "data-cursor": true
  }, linkText, " ", /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2192")));
}
function LatestWorks() {
  const works = [{
    title: "Nova Spor Uygulaması",
    client: "Nova · 2026",
    category: "UI/UX",
    hue: 0
  }, {
    title: "Pera Galeri kimliği",
    client: "Pera Sanat · 2025",
    category: "MARKA",
    hue: 40
  }, {
    title: "Venta e-ticaret",
    client: "Venta · 2026",
    category: "E-TİCARET",
    hue: -50
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": "Son projeler"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Son Projeler",
    title: "Yak\u0131n zamanda teslim ettiklerimiz"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, works.map((w, i) => /*#__PURE__*/React.createElement(ProjectCard, _extends({
    key: i
  }, w)))));
}
function Partners() {
  const brands = ["ATLAS", "NOVA", "KÖK", "VENTA", "ORBİT", "FORM", "PERA", "LUMA"];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    "aria-label": "\u0130\u015F ortaklar\u0131"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap reveal",
    style: {
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Bize G\xFCvenen Markalar")), /*#__PURE__*/React.createElement("div", {
    className: "marquee reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee__track"
  }, [...brands, ...brands].map((b, i) => /*#__PURE__*/React.createElement("span", {
    className: "marquee__item",
    key: i
  }, b)))));
}
function Services() {
  const {
    useState
  } = React;
  const groups = [{
    n: "01",
    name: "Geliştirme",
    desc: "Headless CMS, animasyon ve ölçeklenebilir yazılım.",
    subs: [["Web Sitesi Geliştirme", "Editoryal, performanslı ve erişilebilir web siteleri."], ["Mobil Uygulama", "iOS & Android için native ve cross-platform uygulamalar."], ["Yazılım Aracı", "Panel, dashboard ve özel yazılım araçları."]]
  }, {
    n: "02",
    name: "Tasarım",
    desc: "Marka, arayüz ve hareket tasarımı.",
    subs: [["UI/UX Tasarım", "Araştırma, akış kurgusu ve arayüz tasarımı."], ["Markalaşma", "Strateji, isimlendirme ve marka kimlik sistemleri."], ["Motion & Etkileşim", "Hareket tasarımı ve mikro etkileşimler."]]
  }, {
    n: "03",
    name: "Büyüme & Pazarlama",
    desc: "Dönüşüm, performans ve görünürlük.",
    subs: [["E-ticaret", "Dönüşüm odaklı mağaza ve ödeme deneyimleri."], ["SEO & Performans", "Teknik SEO, Core Web Vitals ve hız optimizasyonu."]]
  }];
  const [open, setOpen] = useState(null);
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": "Hizmetler"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Hizmetler",
    title: "Ne yap\u0131yoruz",
    linkText: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "svc reveal"
  }, groups.map(g => {
    const isOpen = open === g.n;
    return /*#__PURE__*/React.createElement("div", {
      className: `svc__group ${isOpen ? "is-open" : ""}`,
      key: g.n
    }, /*#__PURE__*/React.createElement("button", {
      className: "svc__row",
      type: "button",
      "aria-expanded": isOpen,
      onClick: () => setOpen(isOpen ? null : g.n)
    }, /*#__PURE__*/React.createElement("span", {
      className: "svc__num"
    }, g.n), /*#__PURE__*/React.createElement("span", {
      className: "svc__name"
    }, g.name), /*#__PURE__*/React.createElement("span", {
      className: "svc__desc"
    }, g.desc), /*#__PURE__*/React.createElement("span", {
      className: "svc__toggle",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null))), /*#__PURE__*/React.createElement("div", {
      className: "svc__panel",
      style: {
        gridTemplateRows: isOpen ? "1fr" : "0fr"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "svc__panel-in"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "svc__subs"
    }, g.subs.map(([name, desc], i) => /*#__PURE__*/React.createElement("li", {
      className: "svc__sub",
      key: i,
      "data-cursor": true
    }, /*#__PURE__*/React.createElement("span", {
      className: "svc__sub-name",
      style: {
        width: "556px"
      }
    }, name), /*#__PURE__*/React.createElement("span", {
      className: "svc__sub-desc",
      style: {
        width: "414px"
      }
    }, desc)))))));
  })));
}
function Academy() {
  const courses = [{
    title: "Sıfırdan Tasarım Sistemi",
    instructor: "Deniz Arı",
    rating: 4.9,
    reviews: 214,
    price: "₺1.299",
    level: "Orta",
    hue: 0
  }, {
    title: "Webflow ile Üretim",
    instructor: "Ece Kaya",
    rating: 4.8,
    reviews: 178,
    price: "₺899",
    level: "Başlangıç",
    hue: 30
  }, {
    title: "Motion & Etkileşim",
    instructor: "Mert Su",
    rating: 5.0,
    reviews: 96,
    price: "₺1.499",
    level: "İleri",
    hue: -40
  }, {
    title: "Marka Stratejisi",
    instructor: "Lale Yön",
    rating: 4.7,
    reviews: 132,
    price: "₺1.099",
    level: "Orta",
    hue: 70
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": "Akademi"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Akademi",
    title: "En iyilerden \xF6\u011Fren",
    sub: "Sekt\xF6r\xFCn \xF6nde gelen tasar\u0131mc\u0131lar\u0131ndan kurslar.",
    linkText: "T\xFCm Kurslar\u0131 G\xF6r"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-4"
  }, courses.map((c, i) => /*#__PURE__*/React.createElement(CourseCard, _extends({
    key: i
  }, c)))));
}
function Blog() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": "Blog"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "G\xFCncel Yaz\u0131lar",
    title: "St\xFCdyodan notlar",
    linkText: "T\xFCm Yaz\u0131lar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: "var(--space-6)",
      alignItems: "start"
    },
    className: "blog-grid"
  }, /*#__PURE__*/React.createElement(BlogCard, {
    featured: true,
    category: "G\xF6r\xFC\u015F",
    date: "12 Haz 2026",
    readTime: "6 dk okuma",
    title: "2026'da editoryal grid'ler neden geri d\xF6nd\xFC?",
    excerpt: "Bol negatif alan, ince \xE7izgiler ve b\xFCy\xFCk tipografi: \xF6d\xFCll\xFC sitelerin ortak dili.",
    hue: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(BlogCard, {
    category: "S\xFCre\xE7",
    date: "03 Haz",
    readTime: "4 dk",
    title: "Bir marka kimli\u011Fini nas\u0131l kurguluyoruz",
    hue: 40
  }), /*#__PURE__*/React.createElement(BlogCard, {
    category: "Teknik",
    date: "28 May",
    readTime: "7 dk",
    title: "Smooth scroll ve performans dengesi",
    hue: -40
  }), /*#__PURE__*/React.createElement(BlogCard, {
    category: "K\xFClt\xFCr",
    date: "19 May",
    readTime: "3 dk",
    title: "St\xFCdyoda bir hafta",
    hue: 70
  }))));
}
function Market() {
  const products = [{
    title: "Grid UI Kit",
    seller: "Marka Studio",
    format: "Figma",
    price: "59 USD",
    hue: 0
  }, {
    title: "Portfolyo Şablonu",
    seller: "Nova Labs",
    format: "Webflow",
    price: "39 USD",
    hue: 40
  }, {
    title: "Ikon Seti — 240",
    seller: "Form Co.",
    format: "SVG",
    price: "29 USD",
    hue: -40
  }, {
    title: "Sunum Sistemi",
    seller: "Pera",
    format: "Keynote",
    price: "49 USD",
    hue: 70
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": "Market"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "\u015Eablonlar & Dijital \xDCr\xFCnler",
    title: "Market",
    linkText: "Market'e Git"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-4"
  }, products.map((p, i) => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: i
  }, p)))));
}
function Stats() {
  const stats = [["240", "+", "Tamamlanan proje"], ["98", "%", "Mutlu müşteri"], ["31", "", "Kazanılan ödül"]];
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": "\u0130statistikler"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stats reveal"
  }, stats.map(([n, u, label], i) => /*#__PURE__*/React.createElement("div", {
    className: "stat",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat__num",
    "data-count": n
  }, n, /*#__PURE__*/React.createElement("span", {
    className: "u"
  }, u)), /*#__PURE__*/React.createElement("div", {
    className: "stat__label"
  }, label)))));
}
function CTABlocks() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": "Ba\u015Fla"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta2"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cta cta--dark reveal",
    href: "#",
    "data-cursor": "Teklif Al"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: "rgba(255,255,255,.6)"
    }
  }, "St\xFCdyo"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Projeni bizimle ba\u015Flat"), /*#__PURE__*/React.createElement("span", {
    className: "btn btn--secondary",
    style: {
      marginTop: "var(--space-5)",
      "--_fg": "#fff",
      "--_bd": "rgba(255,255,255,.3)"
    }
  }, "Teklif Al ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192"))), /*#__PURE__*/React.createElement("span", {
    className: "cta__big",
    "aria-hidden": "true"
  }, "\u2197")), /*#__PURE__*/React.createElement("a", {
    className: "cta cta--accent reveal",
    href: "#",
    "data-cursor": "\xDCye Ol"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: "rgba(10,10,10,.55)"
    }
  }, "Topluluk"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Toplulu\u011Fa kat\u0131l, Pro ol"), /*#__PURE__*/React.createElement("span", {
    className: "btn",
    style: {
      marginTop: "var(--space-5)",
      "--_bg": "var(--ink-900)",
      "--_fg": "#fff"
    }
  }, "\xDCye Ol ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192"))), /*#__PURE__*/React.createElement("span", {
    className: "cta__big",
    "aria-hidden": "true"
  }, "+"))));
}
Object.assign(window, {
  LatestWorks,
  Partners,
  Services,
  Academy,
  Blog,
  Market,
  Stats,
  CTABlocks,
  SectionHead,
  CustomSection
});
function csVideoEl(s) {
  const isEmbed = s.url && /youtube\.com|youtu\.be|vimeo\.com/.test(s.url);
  if (isEmbed) {
    let src = toEmbed(s.url);
    const ytId = (src.match(/embed\/([^?]+)/) || [])[1];
    const p = [];
    if (s.autoplay) p.push("autoplay=1");
    if (s.muted || s.autoplay) {
      p.push("mute=1", "muted=1");
    }
    if (s.loop) {
      p.push("loop=1");
      if (ytId) p.push("playlist=" + ytId);
    }
    if (!s.controls) p.push("controls=0");
    if (p.length) src += (src.indexOf("?") >= 0 ? "&" : "?") + p.join("&");
    return /*#__PURE__*/React.createElement("iframe", {
      className: "cs__embed",
      src: src,
      title: s.title || "video",
      allow: "autoplay; fullscreen; picture-in-picture",
      allowFullScreen: true
    });
  }
  if (s.url) {
    return /*#__PURE__*/React.createElement("video", {
      className: "cs__video",
      src: s.url,
      poster: s.src || undefined,
      controls: !!s.controls,
      autoPlay: !!s.autoplay,
      loop: !!s.loop,
      muted: !!s.muted || !!s.autoplay,
      playsInline: true
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "cs__ph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs__ph-ic",
    "aria-hidden": "true"
  }, "\u25B6"), /*#__PURE__*/React.createElement("span", null, "Video ba\u011Flant\u0131s\u0131 ekleyin"));
}
function CustomSection({
  section
}) {
  const s = section || {};
  const full = !!s.full;
  const align = s.align === "center" ? "center" : "left";
  const isVideo = s.type === "video",
    isImage = s.type === "image",
    isText = s.type === "text";
  const ratioStyle = s.ratio && s.ratio !== "auto" ? {
    aspectRatio: s.ratio.replace("/", " / ")
  } : undefined;

  /* ---- TEXT section ---- */
  if (isText) {
    return /*#__PURE__*/React.createElement("section", {
      className: `section cs-text cs-text--bg-${s.bg || "none"} ${full ? "cs-text--full" : ""}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: `cs-text__inner cs-text--w-${s.maxWidth || "narrow"} cs__head--${align} reveal`
    }, s.title && /*#__PURE__*/React.createElement("h2", {
      className: "cs__title"
    }, s.title), s.text && /*#__PURE__*/React.createElement("p", {
      className: `cs-text__body cs-text--${s.size || "normal"}`
    }, s.text))));
  }
  const head = (s.title || s.text) && /*#__PURE__*/React.createElement("header", {
    className: `cs__head cs__head--${align}`
  }, s.title && /*#__PURE__*/React.createElement("h2", {
    className: "cs__title"
  }, s.title), s.text && /*#__PURE__*/React.createElement("p", {
    className: "cs__text"
  }, s.text));
  const mediaInner = isVideo ? csVideoEl(s) : s.src ? /*#__PURE__*/React.createElement("img", {
    src: s.src,
    alt: s.title || ""
  }) : /*#__PURE__*/React.createElement("div", {
    className: "cs__ph"
  }, /*#__PURE__*/React.createElement("span", null, "G\xF6rsel ekleyin"));
  const mediaClass = `cs__media cs__media--${isVideo ? "video" : "image"} ${full ? "cs__media--full" : ""} ${isImage && s.rounded === false ? "cs__media--sharp" : ""} ${isImage && ratioStyle ? "cs__media--cover" : ""}`;
  const media = isImage && s.link ? /*#__PURE__*/React.createElement("a", {
    className: mediaClass,
    href: s.link,
    style: !full ? ratioStyle : undefined,
    "data-cursor": "A\xE7 \u2192"
  }, mediaInner) : /*#__PURE__*/React.createElement("div", {
    className: mediaClass,
    style: !full ? ratioStyle : undefined
  }, mediaInner);

  /* ---- FULL-BLEED image/video ---- */
  if (full) {
    return /*#__PURE__*/React.createElement("section", {
      className: "section cs-section cs-section--full",
      "aria-label": s.title || "Bölüm"
    }, head && /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, head), media, isImage && s.caption && /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("figcaption", {
      className: "cs__caption"
    }, s.caption)));
  }

  /* ---- CONTAINED image/video ---- */
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    "aria-label": s.title || "Bölüm"
  }, /*#__PURE__*/React.createElement("div", {
    className: `cs cs--${align} reveal`
  }, head, media, isImage && s.caption && /*#__PURE__*/React.createElement("figcaption", {
    className: "cs__caption"
  }, s.caption)));
}
function toEmbed(url) {
  try {
    if (/youtu\.be\//.test(url)) return "https://www.youtube.com/embed/" + url.split("youtu.be/")[1].split(/[?&]/)[0];
    if (/youtube\.com\/watch/.test(url)) {
      const v = new URL(url).searchParams.get("v");
      return "https://www.youtube.com/embed/" + v;
    }
    if (/vimeo\.com\/(\d+)/.test(url)) return "https://player.vimeo.com/video/" + url.match(/vimeo\.com\/(\d+)/)[1];
  } catch (e) {}
  return url;
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* App root — composes the homepage BODY only. The header + footer come from
   the shared site-chrome (theme.js + site-chrome.js), identical on every page.
   Section order/visibility + custom (image/video) sections are driven live by
   the /admin "Sayfalar" module via window.MarkaPages. */
const {
  useState: useAppState,
  useEffect: useAppEffect
} = React;
function App() {
  const [variant, setVariant] = useAppState(() => (window.MarkaTheme ? window.MarkaTheme.get().heroVariant : "full") || "full");
  const [layout, setLayout] = useAppState(() => window.MarkaPages ? window.MarkaPages.homeLayout() : null);

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
  useAppEffect(() => {
    const t = setTimeout(() => window.MarkaMotion && window.MarkaMotion.init(), 80);
    return () => clearTimeout(t);
  }, []);
  useAppEffect(() => {
    const t = setTimeout(() => {
      if (!window.MarkaMotion) return;
      window.MarkaMotion.reveal();
      window.MarkaMotion.cursor();
      window.MarkaMotion.magnetic();
    }, 80);
    if (window.MarkaInlineEdit) {
      window.MarkaInlineEdit.apply();
      setTimeout(() => window.MarkaInlineEdit.apply(), 120);
    }
    return () => clearTimeout(t);
  }, [variant, layout]);
  const COMPS = {
    Hero: () => /*#__PURE__*/React.createElement(Hero, {
      variant: variant
    }),
    LatestWorks,
    WeeklyWork,
    Partners,
    Services,
    Academy,
    Collections,
    Games,
    Blog,
    Market,
    Stats,
    CTABlocks
  };
  const sections = layout || [{
    id: "hero",
    kind: "builtin",
    comp: "Hero"
  }, {
    id: "works",
    kind: "builtin",
    comp: "LatestWorks"
  }, {
    id: "partners",
    kind: "builtin",
    comp: "Partners"
  }, {
    id: "services",
    kind: "builtin",
    comp: "Services"
  }, {
    id: "works",
    kind: "builtin",
    comp: "LatestWorks"
  }, {
    id: "weekly",
    kind: "builtin",
    comp: "WeeklyWork"
  }, {
    id: "partners",
    kind: "builtin",
    comp: "Partners"
  }, {
    id: "services",
    kind: "builtin",
    comp: "Services"
  }, {
    id: "academy",
    kind: "builtin",
    comp: "Academy"
  }, {
    id: "collections",
    kind: "builtin",
    comp: "Collections"
  }, {
    id: "games",
    kind: "builtin",
    comp: "Games"
  }, {
    id: "blog",
    kind: "builtin",
    comp: "Blog"
  }, {
    id: "market",
    kind: "builtin",
    comp: "Market"
  }, {
    id: "stats",
    kind: "builtin",
    comp: "Stats"
  }, {
    id: "cta",
    kind: "builtin",
    comp: "CTABlocks"
  }];
  return /*#__PURE__*/React.createElement("main", null, sections.map(s => {
    if (s.kind === "custom") return /*#__PURE__*/React.createElement(CustomSection, {
      key: s.id,
      section: s
    });
    const C = COMPS[s.comp];
    return C ? /*#__PURE__*/React.createElement(C, {
      key: s.id
    }) : null;
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/motion.js
try { (() => {
/* Interaction layer — vanilla JS, framework-agnostic. Call MarkaMotion.init()
   after the React tree has mounted. Re-runnable (idempotent).
   Scroll-position based (no IntersectionObserver) for max portability.
   Honours prefers-reduced-motion. */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const REVEAL_SEL = ".reveal:not([data-seen]), .reveal-mask:not([data-seen])";
  let pending = []; // reveal elements awaiting view
  let counters = []; // counter elements awaiting view
  let bound = false; // scroll listeners attached once

  function header() {
    const h = document.getElementById("site-header");
    if (!h) return;
    const onScroll = () => h.classList.toggle("is-stuck", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
  }
  function collect() {
    const fresh = [...document.querySelectorAll(REVEAL_SEL)];
    fresh.forEach(el => {
      el.setAttribute("data-seen", "");
      // stagger within a grid/group
      const sibs = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains("reveal") || c.classList.contains("reveal-mask")) : [el];
      const idx = sibs.indexOf(el);
      if (idx > 0 && !el.style.getPropertyValue("--rd")) el.style.setProperty("--rd", `${idx * 80}ms`);
    });
    if (reduced) {
      fresh.forEach(e => e.classList.add("is-in"));
    } else pending.push(...fresh);
    const freshC = [...document.querySelectorAll("[data-count]:not([data-counted])")];
    freshC.forEach(c => c.setAttribute("data-counted", ""));
    if (!reduced) counters.push(...freshC);
  }
  function inView(el, frac = 0.88) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * frac && r.bottom > 0;
  }
  function runCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const dur = 1200,
      start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.firstChild.nodeValue = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  function check() {
    pending = pending.filter(el => {
      if (inView(el)) {
        el.classList.add("is-in");
        return false;
      }
      return true;
    });
    counters = counters.filter(el => {
      if (inView(el, 0.7)) {
        runCounter(el);
        return false;
      }
      return true;
    });
  }
  function parallax() {
    if (reduced) return;
    const media = document.querySelectorAll("[data-parallax]");
    const giants = document.querySelectorAll("[data-parallax-x]");
    const update = () => {
      media.forEach(m => {
        const r = m.getBoundingClientRect();
        const inner = m.querySelector(".ph__in");
        const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        if (inner) inner.style.transform = `translateY(${(prog - 0.5) * 56}px) scale(${1 + Math.min(Math.max(prog, 0), 1) * 0.06})`;
      });
      giants.forEach(g => {
        const r = g.getBoundingClientRect();
        const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        g.style.transform = `translateX(${(0.5 - prog) * 120}px)`;
      });
    };
    window.addEventListener("scroll", update, {
      passive: true
    });
    window.addEventListener("resize", update, {
      passive: true
    });
    update();
  }
  function cursor() {
    if (reduced || window.matchMedia("(pointer:coarse)").matches) return;
    let c = document.querySelector(".cursor");
    if (!c) {
      c = document.createElement("div");
      c.className = "cursor";
      const label = document.createElement("span");
      label.className = "cursor__label";
      c.appendChild(label);
      document.body.appendChild(c);
      let x = innerWidth / 2,
        y = innerHeight / 2,
        cx = x,
        cy = y;
      document.addEventListener("mousemove", e => {
        x = e.clientX;
        y = e.clientY;
      });
      const loop = () => {
        cx += (x - cx) * 0.2;
        cy += (y - cy) * 0.2;
        c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
        requestAnimationFrame(loop);
      };
      loop();
    }
    const label = c.querySelector(".cursor__label");
    document.querySelectorAll("[data-cursor]").forEach(el => {
      if (el.__cur) return;
      el.__cur = true;
      el.addEventListener("mouseenter", () => {
        c.classList.add("is-hover");
        label.textContent = el.getAttribute("data-cursor") || "";
      });
      el.addEventListener("mouseleave", () => {
        c.classList.remove("is-hover");
        label.textContent = "";
      });
    });
  }
  function magnetic() {
    if (reduced) return;
    document.querySelectorAll("[data-magnetic]").forEach(el => {
      if (el.__mag) return;
      el.__mag = true;
      el.style.transition = "transform .3s cubic-bezier(0.16,1,0.3,1)";
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.3}px, ${(e.clientY - (r.top + r.height / 2)) * 0.4}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }
  function refresh() {
    collect();
    check();
    cursor();
    magnetic();
  }
  function paintProbe() {
    // If the rendering loop is frozen (offscreen/throttled preview) rAF never
    // advances — fall back to showing everything instantly so nothing is stuck
    // hidden. A live, visible browser fires rAF in ~16ms and keeps animations.
    const site = document.querySelector(".mk-site");
    if (!site) return;
    let alive = false;
    requestAnimationFrame(() => {
      alive = true;
    });
    setTimeout(() => {
      if (!alive) site.classList.add("no-anim");
    }, 450);
  }
  function init() {
    header();
    parallax();
    collect();
    check();
    cursor();
    magnetic();
    paintProbe();
    if (!bound) {
      bound = true;
      window.addEventListener("scroll", check, {
        passive: true
      });
      window.addEventListener("resize", check, {
        passive: true
      });
    }
  }
  window.MarkaMotion = {
    init,
    refresh,
    reveal: refresh,
    cursor,
    magnetic
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/motion.js", error: String((e && e.message) || e) }); }

// ui_kits/website/parts.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Shared primitives for the website UI kit (placeholder media, button,
   badge, rating, and the four card types). Exposed on window. */

function Ph({
  ratio = "4/3",
  tag,
  className = "",
  style,
  children,
  hue = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `ph ${className}`,
    style: {
      aspectRatio: ratio.replace("/", " / "),
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph__in",
    style: hue ? {
      filter: `hue-rotate(${hue}deg)`
    } : undefined
  }), tag && /*#__PURE__*/React.createElement("span", {
    className: "ph__tag"
  }, tag), children);
}
function Btn({
  children,
  variant = "primary",
  size = "",
  href = "#",
  arrow,
  magnetic,
  ...rest
}) {
  const cls = `btn btn--${variant} ${size ? "btn--" + size : ""}`;
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: cls,
    "data-magnetic": magnetic ? "" : undefined
  }, rest), children, arrow && /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2192"));
}
function Badge({
  children,
  variant = "outline",
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `badge badge--${variant}`,
    style: style
  }, children);
}
function Rating({
  value = 4.9,
  count
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "rating"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stars",
    "aria-hidden": "true"
  }, "\u2605\u2605\u2605\u2605\u2605"), /*#__PURE__*/React.createElement("b", null, value.toFixed(1)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "(", count, ")"));
}
function VoteButton({
  id,
  label = "Vote"
}) {
  const {
    useState: uVS,
    useEffect: uVE
  } = React;
  const [, force] = uVS(0);
  uVE(() => {
    if (!window.MarkaVotes) return;
    return window.MarkaVotes.subscribe(() => force(n => n + 1));
  }, []);
  if (!window.MarkaVotes) return null;
  const voted = window.MarkaVotes.hasVoted(id);
  const count = window.MarkaVotes.count(id);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `vote ${voted ? "is-voted" : ""}`,
    "aria-pressed": voted,
    "aria-label": label,
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      window.MarkaVotes.toggle(id);
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: voted ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-7.5-4.6-10-9.2C.4 8.5 2 5 5.5 5 7.7 5 9.2 6.3 12 9c2.8-2.7 4.3-4 6.5-4C22 5 23.6 8.5 22 11.8 19.5 16.4 12 21 12 21z"
  })), /*#__PURE__*/React.createElement("span", {
    className: "vote__n"
  }, count));
}
function ProjectCard({
  title,
  client,
  category = "WEB",
  tag = "PROJE",
  hue
}) {
  const id = window.MarkaVotes ? window.MarkaVotes.slug(title) : "";
  return /*#__PURE__*/React.createElement("a", {
    className: "card reveal",
    href: "#",
    "data-cursor": "Projeyi G\xF6r"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    ratio: "4/3",
    tag: "PROJE G\xD6RSEL\u0130",
    hue: hue
  }), /*#__PURE__*/React.createElement("span", {
    className: "cardlabel"
  }, "Projeyi G\xF6r \u2192"), /*#__PURE__*/React.createElement(VoteButton, {
    id: id
  })), /*#__PURE__*/React.createElement("div", {
    className: "card__top"
  }, /*#__PURE__*/React.createElement(Badge, null, tag), /*#__PURE__*/React.createElement("span", {
    className: "card__meta mono"
  }, category)), /*#__PURE__*/React.createElement("h3", {
    className: "card__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "card__meta"
  }, client));
}
function CourseCard({
  title,
  instructor,
  rating,
  reviews,
  price,
  level,
  hue
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "card card--course card--sm reveal",
    href: "#",
    "data-cursor": "Kursu A\xE7"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    ratio: "16/10",
    tag: "KURS",
    hue: hue
  }), level && /*#__PURE__*/React.createElement("span", {
    className: "badge badge--invert",
    style: {
      position: "absolute",
      top: 12,
      left: 12
    }
  }, level)), /*#__PURE__*/React.createElement("h3", {
    className: "card__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "card__meta"
  }, instructor), /*#__PURE__*/React.createElement("div", {
    className: "card__top",
    style: {
      marginTop: ".2rem"
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: rating,
    count: reviews
  }), /*#__PURE__*/React.createElement("span", {
    className: "card__price"
  }, price)));
}
function BlogCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  featured,
  hue
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: `card card--blog ${featured ? "" : "card--sm"} reveal`,
    href: "#",
    "data-cursor": "Oku"
  }, /*#__PURE__*/React.createElement(Ph, {
    ratio: "16/9",
    tag: "YAZI",
    hue: hue
  }), /*#__PURE__*/React.createElement("div", {
    className: "card__meta mono"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-hover)"
    }
  }, category), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, date), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, readTime)), /*#__PURE__*/React.createElement("h3", {
    className: "card__title",
    style: featured ? {
      fontSize: "var(--fs-h2)"
    } : undefined
  }, title), excerpt && /*#__PURE__*/React.createElement("p", {
    className: "card__excerpt"
  }, excerpt));
}
function ProductCard({
  title,
  seller,
  price,
  format,
  hue
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "card card--sm reveal",
    href: "#",
    "data-cursor": "\xDCr\xFCn\xFC G\xF6r"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Ph, {
    ratio: "4/3",
    tag: "\xDCR\xDCN G\xD6RSEL\u0130",
    hue: hue
  }), /*#__PURE__*/React.createElement("span", {
    className: "badge badge--invert",
    style: {
      position: "absolute",
      top: 12,
      left: 12
    }
  }, "Dijital \xDCr\xFCn")), /*#__PURE__*/React.createElement("h3", {
    className: "card__title"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "card__meta"
  }, seller), /*#__PURE__*/React.createElement("div", {
    className: "card__top",
    style: {
      marginTop: ".2rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "card__meta mono"
  }, format), /*#__PURE__*/React.createElement("span", {
    className: "card__price"
  }, price, /*#__PURE__*/React.createElement("small", null, "'den"))));
}
Object.assign(window, {
  Ph,
  Btn,
  Badge,
  Rating,
  ProjectCard,
  CourseCard,
  BlogCard,
  ProductCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/parts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BRAND_NAME = __ds_scope.BRAND_NAME;

__ds_ns.BRAND_SLOGAN = __ds_scope.BRAND_SLOGAN;

__ds_ns.BRAND_SOCIAL = __ds_scope.BRAND_SOCIAL;

__ds_ns.BlogCard = __ds_scope.BlogCard;

__ds_ns.CourseCard = __ds_scope.CourseCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.Media = __ds_scope.Media;

})();
