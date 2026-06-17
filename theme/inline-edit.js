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
  const SEL = [
    "main .eyebrow", "main h1", "main h2", "main h3",
    "main .lead", "main .cs__text", "main .prose p", "main .page__head p",
  ].join(", ");

  function pageId() {
    const b = document.body.getAttribute("data-page");
    if (b) return b;
    const f = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
    return f === "index" || f === "" ? "home" : f;
  }
  const EXCLUDE = "#mk-header, #mk-footer, .overlay, .mk-popup, [data-no-edit]";
  function editables() {
    return [...document.querySelectorAll(SEL)].filter(el => !el.closest(EXCLUDE) && el.offsetParent !== null || (!el.closest(EXCLUDE)));
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
    const fields = editables().map((el, i) => ({ key: "t" + i, label: shortLabel(el), text: el.textContent.trim() }));
    window.parent.postMessage({ type: "mk-fields", pageId: pid, fields }, "*");
  }

  function enableEdit() {
    if (editMode) { postFields(); return; }
    editMode = true;
    const pid = pageId();
    document.body.classList.add("mk-editing");
    editables().forEach((el, i) => {
      const key = "t" + i;
      el.setAttribute("data-mk-key", key);
      el.setAttribute("contenteditable", "true");
      el.classList.add("mk-editable");
      el.addEventListener("focus", () => el.setAttribute("data-mk-editing", "1"));
      el.addEventListener("input", () => { window.MarkaPages.setText(pid, key, el.textContent); if (window.parent !== window) window.parent.postMessage({ type: "mk-field-change", key, text: el.textContent }, "*"); });
      el.addEventListener("blur", () => { el.removeAttribute("data-mk-editing"); window.MarkaPages.setText(pid, key, el.textContent); });
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" && el.tagName !== "P" && !el.classList.contains("lead")) { e.preventDefault(); el.blur(); } });
    });
    postFields();
  }

  window.addEventListener("message", (e) => {
    const d = e.data || {};
    if (d === "mk-edit-on" || d.type === "mk-edit-on") { enableEdit(); }
    else if (d.type === "mk-request-fields") { postFields(); }
    else if (d.type === "mk-set") {
      const el = document.querySelector('[data-mk-key="' + d.key + '"]');
      if (el) el.textContent = d.value;
      if (window.MarkaPages) window.MarkaPages.setText(pageId(), d.key, d.value);
    }
  });

  function boot() {
    applyOverrides();
    if (/[?&]edit=1/.test(location.search)) enableEdit();
    // re-apply after late content (JS-injected grids, React mount)
    setTimeout(() => { applyOverrides(); if (editMode) { reattach(); postFields(); } }, 300);
    setTimeout(() => { applyOverrides(); if (editMode) { reattach(); postFields(); } }, 900);
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
      el.addEventListener("input", () => { window.MarkaPages.setText(pid, key, el.textContent); });
      el.addEventListener("blur", () => { el.removeAttribute("data-mk-editing"); window.MarkaPages.setText(pid, key, el.textContent); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  if (window.MarkaPages) window.MarkaPages.subscribe(() => { if (!applying) setTimeout(applyOverrides, 0); });

  window.MarkaInlineEdit = { apply: applyOverrides, enable: enableEdit, fields: postFields };
})();
