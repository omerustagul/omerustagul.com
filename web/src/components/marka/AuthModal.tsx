"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { BRAND_NAME } from "@/lib/brand";
import { registerUser } from "@/lib/actions/auth";

/* Faithful port of the prototype's auth modal (theme/site-chrome.js). Wired to
   NextAuth (client signIn, redirect:false) + the registerUser server action. */
export function AuthModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function done() {
    router.refresh();
    onClose();
  }

  function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await signIn("credentials", {
        email: String(fd.get("email") ?? ""),
        password: String(fd.get("password") ?? ""),
        redirect: false,
      });
      if (res?.error) setError("E-posta veya şifre hatalı.");
      else done();
    });
  }

  function onRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    start(async () => {
      const r = await registerUser({ name: String(fd.get("name") ?? ""), email, password });
      if (r?.error) {
        setError(r.error);
        return;
      }
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) setError("Kayıt oldu ama giriş başarısız.");
      else done();
    });
  }

  return (
    <div className="authm">
      <div className="authm__scrim" onClick={onClose} />
      <div className="authm__box" role="dialog" aria-modal="true" aria-label="Hesap">
        <button className="authm__x" onClick={onClose} aria-label="Kapat">
          ✕
        </button>
        <div className="authm__brand">
          {BRAND_NAME}
          <span className="dot">.</span>
        </div>
        <div className="authm__tabs">
          <button className={tab === "login" ? "on" : ""} onClick={() => setTab("login")}>
            Giriş Yap
          </button>
          <button className={tab === "register" ? "on" : ""} onClick={() => setTab("register")}>
            Kayıt Ol
          </button>
        </div>

        <form className="authm__form" hidden={tab !== "login"} onSubmit={onLogin}>
          <label>
            E-posta
            <input type="email" name="email" required placeholder="ad@ornek.com" />
          </label>
          <label>
            Şifre
            <input type="password" name="password" placeholder="••••••••" />
          </label>
          {tab === "login" && error && <p className="authm__err">{error}</p>}
          <button className="btn btn--primary" type="submit" disabled={pending}>
            {pending ? "Giriş yapılıyor…" : "Giriş yap"} <span className="arr">→</span>
          </button>
          <p className="authm__hint">Demo: admin@marka.test / admin1234</p>
        </form>

        <form className="authm__form" hidden={tab !== "register"} onSubmit={onRegister}>
          <label>
            Ad Soyad
            <input type="text" name="name" required placeholder="Adınız" />
          </label>
          <label>
            E-posta
            <input type="email" name="email" required placeholder="ad@ornek.com" />
          </label>
          <label>
            Şifre
            <input type="password" name="password" placeholder="En az 4 karakter" />
          </label>
          {tab === "register" && error && <p className="authm__err">{error}</p>}
          <button className="btn btn--primary" type="submit" disabled={pending}>
            {pending ? "Oluşturuluyor…" : "Hesap oluştur"} <span className="arr">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
