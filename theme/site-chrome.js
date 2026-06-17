/* ========================================================================
   MARKA SITE CHROME — ONE header + footer for every page. Templates driven by
   MarkaTheme; labels localized by MarkaI18n. Renders into #mk-header /
   #mk-footer and appends a shared mobile overlay. Re-renders live when the
   admin changes a template OR the language changes. Set window.MK_BASE first.
   Requires: theme.js, i18n.js, window.MARKA.
   ======================================================================== */
(function () {
  const BASE = window.MK_BASE || "../../";
  const url = (p) => BASE + p;
  const brandName = () => (window.MARKA && window.MARKA.BRAND_NAME) || "Marka";
  const slogan = () => (window.MARKA && window.MARKA.BRAND_SLOGAN) || "Dijitalde yeni standart.";
  const T = (k, v) => (window.MarkaI18n ? window.MarkaI18n.t(k, v) : k);

  const L = {
    home: url("ui_kits/website/index.html"), portfolio: url("pages/portfolio.html"),
    project: url("pages/project.html"), blog: url("pages/blog.html"), academy: url("pages/academy.html"),
    market: url("pages/market.html"), about: url("pages/about.html"), contact: url("pages/contact.html"),
    cv: url("pages/profile.html"),
  };
  const PRIMARY = [["nav.partners", L.about], ["nav.academy", L.academy], ["nav.blog", L.blog], ["nav.market", L.market]];
  const MEGA = [
    ["mega.works", [["mega.allProjects", L.portfolio], ["mega.featured", L.portfolio], ["mega.byCategory", L.portfolio]]],
    ["mega.services", [["mega.webDesign", L.about], ["mega.development", L.about], ["mega.branding", L.about], ["mega.uiux", L.about]]],
    ["mega.inspiration", [["mega.collections", L.blog], ["nav.blog", L.blog]]],
  ];
  const GLOBE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>`;

  const brand = (cls) => `<a class="brand ${cls || ""}" href="${L.home}" aria-label="${brandName()}">${brandName()}<span class="dot">.</span></a>`;
  const themeBtn = () => `<button class="iconbtn" data-action="toggle-theme" aria-label="Tema">${(window.MarkaTheme.get().mode === "dark") ? "☀" : "☾"}</button>`;
  const cta = (size) => `<button class="btn btn--primary ${size ? "btn--" + size : ""}" data-magnetic data-action="open-booking">${T("cta.quote")} <span class="arr">→</span></button>`;
  const bookSlots = (date) => {
    const taken = window.MarkaBookings ? window.MarkaBookings.takenSlots(date) : [];
    const slots = window.MarkaBookings ? window.MarkaBookings.SLOTS : [];
    return slots.map(s => `<button type="button" class="bookm__slot" data-slot="${s}" ${taken.indexOf(s) >= 0 ? "disabled" : ""}>${s}</button>`).join("");
  };
  function bookingModalHTML() {
    const d = new Date(); d.setDate(d.getDate() + 1); const def = d.toISOString().slice(0, 10);
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
  const menuBtn = (always) => `<button class="iconbtn menu-toggle ${always ? "menu-toggle--always" : ""}" data-action="open-menu" aria-label="Menü">≡</button>`;
  const socialList = () => (window.MARKA && window.MARKA.BRAND_SOCIAL) || [];
  const socSlug = (s) => s.slug || String(s.label || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const SOC_LOCAL = { linkedin: 1 }; // slugs not served by the CDN — self-hosted in assets/social/
  const socUrl = (slug) => SOC_LOCAL[slug] ? url("assets/social/" + slug + ".svg") : "https://cdn.simpleicons.org/" + slug;
  const socIcon = (s, cls) => { const u = socUrl(socSlug(s)); return `<a class="${cls}" href="${s.href || "#"}" target="_blank" rel="noopener" aria-label="${s.label}" data-cursor title="${s.label}"><span class="soc__i" style="-webkit-mask-image:url(${u});mask-image:url(${u})"></span></a>`; };
  const social = (cls) => `<div class="hdr__social">${socialList().map(s => socIcon(s, "soc" + (cls ? " " + cls : ""))).join("")}</div>`;
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const initialsOf = (n) => (n || "").split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
  const member = () => (window.MarkaMembers ? window.MarkaMembers.current() : null);
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
    const cur = window.MarkaI18n.current(), langs = window.MarkaI18n.LANGS;
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
    if (tpl === "minimal")
      return `<div class="wrap hdr__row">${brand()}<div class="hdr__right">${langSwitch()}${themeBtn()}${cta()}${menuBtn(true)}</div></div>`;
    if (tpl === "centered")
      return `<div class="wrap hdr__stack"><div class="hdr__crow"><div style="display:flex;gap:8px;align-items:center">${langSwitch()}${themeBtn()}</div>${brand("brand--center")}${cta()}</div>
        <nav class="nav nav__primary hdr__cnav" aria-label="Birincil">${discover()}${navLinks()}</nav></div>${megaPanel()}`;
    if (tpl === "split")
      return `<div class="wrap hdr__row">${brand()}<nav class="nav nav__primary hdr__splitnav" aria-label="Birincil">${discover()}${navLinks()}</nav>
        <div class="hdr__right">${langSwitch()}${themeBtn()}${cta()}${menuBtn()}</div></div>${megaPanel()}`;
    return `<div class="wrap hdr__row">${brand()}<nav class="nav nav__primary" aria-label="Birincil">${discover()}${navLinks()}</nav>
      <div class="hdr__right">${social()}${langSwitch()}${themeBtn()}${account()}${cta()}${menuBtn()}</div></div>${megaPanel()}`;
  }

  function footerHTML(tpl) {
    const cols = [
      ["footer.work", [["footer.portfolio", L.portfolio], ["footer.categories", L.portfolio], ["mega.featured", L.portfolio]]],
      ["footer.inspiration", [["mega.collections", L.blog], ["nav.blog", L.blog]]],
      ["footer.academy", [["footer.allCourses", L.academy], ["footer.instructors", L.academy]]],
      ["footer.corporate", [["nav.aboutMe", L.cv], ["footer.about", L.about], ["footer.contact", L.contact], ["footer.faq", L.about]]],
    ];
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
    const cur = window.MarkaI18n.current(), langs = window.MarkaI18n.LANGS;
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
    const h = document.getElementById("mk-header"), f = document.getElementById("mk-footer");
    if (h) h.innerHTML = `<header id="site-header" class="hdr hdr--${t.headerTemplate}" data-mega="false">${headerHTML(t.headerTemplate)}</header>`;
    if (f) f.innerHTML = `<footer class="ftr ftr--${t.footerTemplate}">${footerHTML(t.footerTemplate)}</footer>`;
    let ov = document.querySelector(".overlay");
    if (!ov) { ov = document.createElement("div"); ov.className = "overlay"; document.body.appendChild(ov); }
    ov.innerHTML = overlayHTML();
    let am = document.querySelector(".authm");
    if (!am) { am = document.createElement("div"); am.className = "authm"; am.hidden = true; document.body.appendChild(am); }
    am.innerHTML = authModalHTML();
    let bm = document.querySelector(".bookm");
    if (!bm) { bm = document.createElement("div"); bm.className = "authm bookm"; bm.hidden = true; document.body.appendChild(bm); }
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
      trigger.addEventListener("click", (e) => { e.preventDefault(); h.setAttribute("data-mega", h.getAttribute("data-mega") === "true" ? "false" : "true"); });
    }
    h.addEventListener("mouseleave", () => h.setAttribute("data-mega", "false"));
    const onScroll = () => h.classList.toggle("is-stuck", window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-action]");
    const ov = document.querySelector(".overlay");
    if (a) {
      const act = a.getAttribute("data-action");
      if (act === "open-menu" && ov) ov.classList.add("is-open");
      if (act === "close-menu" && ov) ov.classList.remove("is-open");
      if (act === "toggle-theme") window.MarkaTheme.set({ mode: window.MarkaTheme.get().mode === "dark" ? "light" : "dark" });
      if (act === "toggle-lang") { const pop = a.parentElement.querySelector("[data-lang-pop]"); if (pop) pop.hidden = !pop.hidden; }
      if (act === "open-auth") { const am = document.querySelector(".authm"); if (am) { am.hidden = false; document.body.style.overflow = "hidden"; const fi = am.querySelector('[data-authform="login"] input'); if (fi) setTimeout(() => fi.focus(), 30); } if (ov) ov.classList.remove("is-open"); }
      if (act === "close-auth") { const am = document.querySelector(".authm"); if (am) am.hidden = true; document.body.style.overflow = ""; }
      if (act === "toggle-acct") { const pop = a.parentElement.querySelector("[data-acct-pop]"); if (pop) pop.hidden = !pop.hidden; }
      if (act === "logout") { window.MarkaMembers && window.MarkaMembers.logout(); }
      if (act === "open-booking") { const bm = document.querySelector(".bookm"); if (bm) { bm.hidden = false; document.body.style.overflow = "hidden"; } if (ov) ov.classList.remove("is-open"); }
      if (act === "close-booking") { const bm = document.querySelector(".bookm"); if (bm) bm.hidden = true; document.body.style.overflow = ""; }
    }
    const slot = e.target.closest("[data-slot]");
    if (slot && !slot.disabled) {
      const form = slot.closest("[data-bookform]");
      form.querySelectorAll("[data-slot]").forEach(s => s.classList.toggle("on", s === slot));
      form.querySelector("[data-book-slot-input]").value = slot.getAttribute("data-slot");
    }
    const tab = e.target.closest("[data-authtab]");
    if (tab) {
      const am = tab.closest(".authm"); const which = tab.getAttribute("data-authtab");
      am.querySelectorAll("[data-authtab]").forEach(b => b.classList.toggle("on", b === tab));
      am.querySelectorAll("[data-authform]").forEach(f => { f.hidden = f.getAttribute("data-authform") !== which; });
    }
    if (!e.target.closest("[data-acct-wrap]")) document.querySelectorAll("[data-acct-pop]").forEach(p => p.hidden = true);
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn && window.MarkaI18n) { window.MarkaI18n.set(langBtn.getAttribute("data-lang")); }
    else if (!e.target.closest("[data-lang-wrap]")) { document.querySelectorAll("[data-lang-pop]").forEach(p => p.hidden = true); }
    if (e.target.closest(".overlay__links a") && ov) ov.classList.remove("is-open");
  });

  // auth form submit (login / register)
  document.addEventListener("change", (e) => {
    const dt = e.target.closest("[data-book-date]");
    if (dt) { const form = dt.closest("[data-bookform]"); const cont = form.querySelector("[data-book-slots]"); if (cont) cont.innerHTML = bookSlots(dt.value); form.querySelector("[data-book-slot-input]").value = ""; }
  });

  document.addEventListener("submit", (e) => {
    const bf = e.target.closest("[data-bookform]");
    if (bf && window.MarkaBookings) {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(bf).entries());
      const err = bf.querySelector(".authm__err");
      if (!d.name || !d.email || !d.date) { if (err) { err.textContent = "Ad, e-posta ve tarih gerekli."; err.hidden = false; } return; }
      if (!d.slot) { if (err) { err.textContent = "Lütfen bir saat seç."; err.hidden = false; } return; }
      window.MarkaBookings.book({ name: d.name, email: d.email, topic: d.topic, date: d.date, slot: d.slot });
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
    if (res && res.error) { if (err) { err.textContent = res.error; err.hidden = false; } return; }
    if (err) err.hidden = true;
    const am = document.querySelector(".authm"); if (am) am.hidden = true; document.body.style.overflow = "";
  });

  if (window.MarkaMembers) window.MarkaMembers.subscribe(() => render());

  let lastTpl = null, lastFtr = null;
  window.MarkaTheme.subscribe((cfg) => {
    if (cfg.headerTemplate !== lastTpl || cfg.footerTemplate !== lastFtr) { lastTpl = cfg.headerTemplate; lastFtr = cfg.footerTemplate; render(); }
    else { const tb = document.querySelector('[data-action="toggle-theme"]'); if (tb) tb.textContent = cfg.mode === "dark" ? "☀" : "☾"; }
  });
  if (window.MarkaI18n) window.MarkaI18n.subscribe(() => render());

  /* ---- Entry pop-up (campaign) — config from MarkaTheme.popup ---- */
  let popupTimer = null;
  function popupSeenKey() { return "mk-popup-seen"; }
  function closePopup() { const p = document.querySelector(".mk-popup"); if (p) p.classList.remove("is-open"); }
  function showPopup(cfg) {
    const pc = cfg.popup || {};
    let p = document.querySelector(".mk-popup");
    if (!p) {
      p = document.createElement("div"); p.className = "mk-popup"; document.body.appendChild(p);
      p.addEventListener("click", (e) => { if (e.target === p || e.target.closest("[data-popup-close]")) { closePopup(); try { sessionStorage.setItem(popupSeenKey(), "1"); } catch (e) {} } });
    }
    p.innerHTML =
      `<div class="mk-popup__box" role="dialog" aria-modal="true" aria-label="${(pc.title || "Kampanya").replace(/"/g, "&quot;")}">
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
    if (popupTimer) { clearTimeout(popupTimer); popupTimer = null; }
    closePopup();
    if (!pc.enabled) return;
    let seen = false;
    try { seen = pc.freqOncePerSession !== false && sessionStorage.getItem(popupSeenKey()) === "1"; } catch (e) {}
    if (seen) return;
    popupTimer = setTimeout(() => showPopup(cfg), Math.max(0, (pc.delaySec || 0) * 1000));
  }
  // live: re-schedule when admin toggles/edits the popup (preview reflects changes)
  window.MarkaTheme.subscribe(() => { try { sessionStorage.removeItem(popupSeenKey()); } catch (e) {} schedulePopup(); });

  function boot() { lastTpl = window.MarkaTheme.get().headerTemplate; lastFtr = window.MarkaTheme.get().footerTemplate; render(); schedulePopup(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  window.MarkaChrome = { render };
})();
