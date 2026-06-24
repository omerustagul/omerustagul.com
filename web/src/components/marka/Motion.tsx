"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Faithful port of ui_kits/website/motion.js — scroll-reveal, parallax,
   magnetic buttons, custom cursor, count-up stats, sticky header. Honours
   prefers-reduced-motion. Re-runs on route change.

   Reveal & count-up use an IntersectionObserver (instead of a manual
   getBoundingClientRect scroll check) so content is revealed reliably at any
   scroll speed, on anchor/jump scrolls, and for elements already in view on
   load — the old scroll check could leave sections stuck at opacity:0. */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    function runCounter(el: HTMLElement) {
      const target = parseInt(el.getAttribute("data-count") || "0", 10);
      const dur = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        if (el.firstChild) el.firstChild.nodeValue = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    /* Scroll-reveal: stagger siblings, then reveal each element as it enters the
       viewport. `rootMargin` bottom -12% mirrors the prototype's 0.88 threshold
       (reveal slightly before the element is fully in view). */
    function reveal() {
      const els = [
        ...document.querySelectorAll<HTMLElement>(".reveal:not([data-seen]), .reveal-mask:not([data-seen])"),
      ];
      els.forEach((el) => {
        el.setAttribute("data-seen", "");
        const sibs = el.parentElement
          ? [...el.parentElement.children].filter(
              (c) => c.classList.contains("reveal") || c.classList.contains("reveal-mask"),
            )
          : [el];
        const idx = sibs.indexOf(el);
        if (idx > 0 && !el.style.getPropertyValue("--rd")) el.style.setProperty("--rd", `${idx * 80}ms`);
      });

      if (reduced) {
        els.forEach((el) => el.classList.add("is-in"));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io.unobserve(en.target);
            }
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
      );
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());

      // Safety net: instant jumps (anchor links, End key, back/forward scroll
      // restoration) can move an element from below to above the viewport without
      // the observer ever seeing it intersect. Reveal anything already scrolled
      // past so content is never left stuck at opacity:0.
      let raf = 0;
      const catchUp = () => {
        raf = 0;
        for (const el of els) {
          if (el.classList.contains("is-in")) continue;
          if (el.getBoundingClientRect().bottom <= 0) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        }
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(catchUp);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        if (raf) cancelAnimationFrame(raf);
      });
    }

    function counters() {
      const els = [...document.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])")];
      els.forEach((c) => c.setAttribute("data-counted", ""));
      if (reduced) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) {
              runCounter(en.target as HTMLElement);
              io.unobserve(en.target);
            }
          }
        },
        { threshold: 0.6 },
      );
      els.forEach((c) => io.observe(c));
      cleanups.push(() => io.disconnect());
    }

    function header() {
      const h = document.getElementById("site-header");
      if (!h) return;
      const onScroll = () => h.classList.toggle("is-stuck", window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    function parallax() {
      if (reduced) return;
      const media = document.querySelectorAll<HTMLElement>("[data-parallax]");
      const giants = document.querySelectorAll<HTMLElement>("[data-parallax-x]");
      const update = () => {
        media.forEach((m) => {
          const r = m.getBoundingClientRect();
          const inner = m.querySelector<HTMLElement>(".ph__in");
          const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          if (inner) inner.style.transform = `translateY(${(prog - 0.5) * 56}px) scale(${1 + Math.min(Math.max(prog, 0), 1) * 0.06})`;
        });
        giants.forEach((g) => {
          const r = g.getBoundingClientRect();
          const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          g.style.transform = `translateX(${(0.5 - prog) * 120}px)`;
        });
      };
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", update));
      cleanups.push(() => window.removeEventListener("resize", update));
      update();
    }

    let rafCursor = 0;
    function cursor() {
      if (reduced || window.matchMedia("(pointer:coarse)").matches) return;
      let c = document.querySelector<HTMLElement>(".cursor");
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
        const move = (e: MouseEvent) => {
          x = e.clientX;
          y = e.clientY;
        };
        document.addEventListener("mousemove", move);
        cleanups.push(() => document.removeEventListener("mousemove", move));
        const loop = () => {
          cx += (x - cx) * 0.2;
          cy += (y - cy) * 0.2;
          c!.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
          rafCursor = requestAnimationFrame(loop);
        };
        loop();
      }
      const label = c.querySelector<HTMLElement>(".cursor__label");
      document.querySelectorAll<HTMLElement & { __cur?: boolean }>("[data-cursor]").forEach((el) => {
        if (el.__cur) return;
        el.__cur = true;
        el.addEventListener("mouseenter", () => {
          c!.classList.add("is-hover");
          if (label) label.textContent = el.getAttribute("data-cursor") || "";
        });
        el.addEventListener("mouseleave", () => {
          c!.classList.remove("is-hover");
          if (label) label.textContent = "";
        });
      });
    }

    function magnetic() {
      if (reduced) return;
      document.querySelectorAll<HTMLElement & { __mag?: boolean }>("[data-magnetic]").forEach((el) => {
        if (el.__mag) return;
        el.__mag = true;
        el.style.transition = "transform .3s cubic-bezier(0.16,1,0.3,1)";
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.3}px, ${(e.clientY - (r.top + r.height / 2)) * 0.4}px)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "";
        });
      });
    }

    header();
    parallax();
    reveal();
    counters();
    cursor();
    magnetic();

    return () => {
      cleanups.forEach((fn) => fn());
      if (rafCursor) cancelAnimationFrame(rafCursor);
    };
  }, [pathname]);

  return null;
}
