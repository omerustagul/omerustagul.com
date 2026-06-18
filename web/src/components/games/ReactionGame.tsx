"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitScore } from "@/lib/actions/games";

type Phase = "idle" | "waiting" | "ready" | "result" | "tooSoon";

export function ReactionGame({ authed, remaining: initialRemaining }: { authed: boolean; remaining: number }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(initialRemaining);
  const [msg, setMsg] = useState<string | null>(null);
  const startRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function begin() {
    if (!authed) {
      router.push("/login?callbackUrl=/oyunlar");
      return;
    }
    if (remaining <= 0) {
      setMsg("Günlük hakkın doldu, yarın tekrar gel.");
      return;
    }
    setMsg(null);
    setPhase("waiting");
    const delay = 1000 + Math.floor(performance.now() % 2000); // 1–3s, no Math.random needed
    timer.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("ready");
    }, delay);
  }

  function click() {
    if (phase === "waiting") {
      if (timer.current) clearTimeout(timer.current);
      setPhase("tooSoon");
      return;
    }
    if (phase === "ready") {
      const score = Math.round(performance.now() - startRef.current);
      setMs(score);
      setPhase("result");
      submitScore("reaction", score).then((res) => {
        if (res?.ok) {
          setRemaining(res.remaining);
          router.refresh();
        } else if (res?.error) {
          setMsg(res.error);
        }
      });
    }
  }

  const bg =
    phase === "ready"
      ? "var(--accent)"
      : phase === "waiting"
        ? "color-mix(in srgb, var(--text) 8%, transparent)"
        : "var(--surface-muted)";

  return (
    <div>
      <div
        onClick={phase === "waiting" || phase === "ready" ? click : begin}
        role="button"
        tabIndex={0}
        style={{
          height: "16rem",
          borderRadius: "var(--radius-lg)",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
          color: phase === "ready" ? "var(--on-accent)" : "var(--text)",
          transition: "background .1s",
        }}
      >
        <div>
          {phase === "idle" && <strong style={{ fontSize: "var(--fs-h4)" }}>Başlamak için tıkla</strong>}
          {phase === "waiting" && <span className="u-label">Yeşili bekle…</span>}
          {phase === "ready" && <strong style={{ fontSize: "var(--fs-h3)" }}>ŞİMDİ!</strong>}
          {phase === "tooSoon" && (
            <div>
              <strong>Çok erken!</strong>
              <p className="u-label" style={{ marginTop: ".5rem" }}>
                tekrar denemek için tıkla
              </p>
            </div>
          )}
          {phase === "result" && (
            <div>
              <strong style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-h2)" }}>{ms} ms</strong>
              <p className="u-label" style={{ marginTop: ".5rem" }}>
                tekrar oynamak için tıkla
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="u-label" style={{ marginTop: ".75rem" }}>
        Kalan hak: {remaining}/3 · düşük süre daha iyi
      </p>
      {msg && <p style={{ color: "var(--text-muted)", marginTop: ".5rem" }}>{msg}</p>}
    </div>
  );
}
