/* Interaction layer — vanilla JS, framework-agnostic. Call MarkaMotion.init()
   after the React tree has mounted. Re-runnable (idempotent).
   Scroll-position based (no IntersectionObserver) for max portability.
   Honours prefers-reduced-motion. */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const REVEAL_SEL = ".reveal:not([data-seen]), .reveal-mask:not([data-seen])";
  let pending = [];      // reveal elements awaiting view
  let counters = [];     // counter elements awaiting view
  let bound = false;     // scroll listeners attached once

  function header() {
    const h = document.getElementById("site-header");
    if (!h) return;
    const onScroll = () => h.classList.toggle("is-stuck", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function collect() {
    const fresh = [...document.querySelectorAll(REVEAL_SEL)];
    fresh.forEach(el => {
      el.setAttribute("data-seen", "");
      // stagger within a grid/group
      const sibs = el.parentElement
        ? [...el.parentElement.children].filter(c => c.classList.contains("reveal") || c.classList.contains("reveal-mask"))
        : [el];
      const idx = sibs.indexOf(el);
      if (idx > 0 && !el.style.getPropertyValue("--rd")) el.style.setProperty("--rd", `${idx * 80}ms`);
    });
    if (reduced) { fresh.forEach(e => e.classList.add("is-in")); }
    else pending.push(...fresh);

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
    const dur = 1200, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.firstChild.nodeValue = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function check() {
    pending = pending.filter(el => { if (inView(el)) { el.classList.add("is-in"); return false; } return true; });
    counters = counters.filter(el => { if (inView(el, 0.7)) { runCounter(el); return false; } return true; });
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
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
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
      let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
      document.addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
      const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; c.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
      loop();
    }
    const label = c.querySelector(".cursor__label");
    document.querySelectorAll("[data-cursor]").forEach(el => {
      if (el.__cur) return; el.__cur = true;
      el.addEventListener("mouseenter", () => { c.classList.add("is-hover"); label.textContent = el.getAttribute("data-cursor") || ""; });
      el.addEventListener("mouseleave", () => { c.classList.remove("is-hover"); label.textContent = ""; });
    });
  }

  function magnetic() {
    if (reduced) return;
    document.querySelectorAll("[data-magnetic]").forEach(el => {
      if (el.__mag) return; el.__mag = true;
      el.style.transition = "transform .3s cubic-bezier(0.16,1,0.3,1)";
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.3}px, ${(e.clientY - (r.top + r.height / 2)) * 0.4}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  function refresh() { collect(); check(); cursor(); magnetic(); }

  function paintProbe() {
    // If the rendering loop is frozen (offscreen/throttled preview) rAF never
    // advances — fall back to showing everything instantly so nothing is stuck
    // hidden. A live, visible browser fires rAF in ~16ms and keeps animations.
    const site = document.querySelector(".mk-site");
    if (!site) return;
    let alive = false;
    requestAnimationFrame(() => { alive = true; });
    setTimeout(() => { if (!alive) site.classList.add("no-anim"); }, 450);
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
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check, { passive: true });
    }
  }

  window.MarkaMotion = { init, refresh, reveal: refresh, cursor, magnetic };
})();
