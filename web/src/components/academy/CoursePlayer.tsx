"use client";

import { useMemo, useState, useTransition } from "react";
import { Badge } from "@/components/ui";
import { toggleLesson } from "@/lib/actions/learn";

type Lesson = { id: string; title: string; kind: string; content: string | null };
type Module = { id: string; title: string; lessons: Lesson[] };

export function CoursePlayer({
  courseId,
  courseTitle,
  modules,
  initialDone,
  userName,
}: {
  courseId: string;
  courseTitle: string;
  modules: Module[];
  initialDone: string[];
  userName: string;
}) {
  const lessons = useMemo(() => modules.flatMap((m) => m.lessons), [modules]);
  const [done, setDone] = useState<Set<string>>(new Set(initialDone));
  const [activeId, setActiveId] = useState<string>(lessons[0]?.id ?? "");
  const [pending, start] = useTransition();

  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const pct = lessons.length ? Math.round((done.size / lessons.length) * 100) : 0;
  const complete = pct === 100;

  function toggle(lessonId: string, value: boolean) {
    setDone((prev) => {
      const next = new Set(prev);
      if (value) next.add(lessonId);
      else next.delete(lessonId);
      return next;
    });
    start(() => {
      void toggleLesson(courseId, lessonId, value);
    });
  }

  return (
    <div style={{ display: "grid", gap: "2.5rem", gridTemplateColumns: "minmax(0,1fr) 18rem" }}>
      {/* main */}
      <div>
        {active && (
          <>
            <Badge variant="muted">{active.kind}</Badge>
            <h2 style={{ fontSize: "var(--fs-h2)", letterSpacing: "-0.02em", margin: "1rem 0 1.5rem" }}>
              {active.title}
            </h2>
            <div
              style={{
                aspectRatio: "16 / 9",
                borderRadius: "var(--radius-lg)",
                background: "var(--placeholder)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-subtle)",
              }}
              className="u-label"
            >
              DERS İÇERİĞİ
            </div>
            <p style={{ marginTop: "1.5rem", color: "var(--text-muted)" }}>
              {active.content ?? "Bu dersin içeriği yakında eklenecek."}
            </p>
            <label style={{ display: "flex", gap: ".6rem", alignItems: "center", marginTop: "1.5rem" }}>
              <input
                type="checkbox"
                checked={done.has(active.id)}
                onChange={(e) => toggle(active.id, e.target.checked)}
                disabled={pending}
              />
              Bu dersi tamamladım
            </label>
          </>
        )}

        {complete && (
          <div
            style={{
              marginTop: "2.5rem",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-lg)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <p className="u-label" style={{ marginBottom: ".5rem" }}>
              SERTİFİKA
            </p>
            <h3 style={{ fontSize: "var(--fs-h3)" }}>Tebrikler, {userName}! 🎓</h3>
            <p style={{ color: "var(--text-muted)", marginTop: ".5rem" }}>
              “{courseTitle}” kursunu %100 tamamladın.
            </p>
          </div>
        )}
      </div>

      {/* sidebar */}
      <aside>
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ height: 6, background: "var(--surface-muted)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)" }} />
          </div>
          <p className="u-label" style={{ marginTop: ".5rem" }}>
            %{pct} tamamlandı
          </p>
        </div>

        {modules.map((m) => (
          <div key={m.id} style={{ marginBottom: "1.25rem" }}>
            <p className="u-label" style={{ marginBottom: ".5rem" }}>
              {m.title}
            </p>
            <ul style={{ listStyle: "none", display: "grid", gap: ".25rem" }}>
              {m.lessons.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(l.id)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: ".5rem .65rem",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "var(--fs-sm)",
                      background: l.id === activeId ? "var(--surface-muted)" : "transparent",
                      color: "var(--text)",
                      display: "flex",
                      gap: ".5rem",
                    }}
                  >
                    <span style={{ color: done.has(l.id) ? "var(--accent)" : "var(--text-subtle)" }}>
                      {done.has(l.id) ? "✓" : "○"}
                    </span>
                    {l.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </div>
  );
}
