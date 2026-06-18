"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enrollCourse } from "@/lib/actions/commerce";
import { toggleLesson } from "@/lib/actions/learn";

type Lesson = { id: string; title: string; kind: string; content: string | null };
type Module = { id: string; title: string; lessons: Lesson[] };

function icon(kind: string) {
  return kind === "video" ? "▷" : kind === "doc" ? "▤" : kind === "link" ? "↗" : "▦";
}

export function CoursePage({
  courseId,
  courseSlug,
  title,
  level,
  rating,
  price,
  modules,
  enrolled: enrolledInit,
  doneInit,
  authed,
  userName,
}: {
  courseId: string;
  courseSlug: string;
  title: string;
  level: string;
  rating: number;
  price: string;
  modules: Module[];
  enrolled: boolean;
  doneInit: string[];
  authed: boolean;
  userName: string;
}) {
  const router = useRouter();
  const lessons = useMemo(() => modules.flatMap((m) => m.lessons), [modules]);
  const [enrolled, setEnrolled] = useState(enrolledInit);
  const [done, setDone] = useState<Set<string>>(new Set(doneInit));
  const [activeId, setActiveId] = useState<string>(() => lessons.find((l) => !doneInit.includes(l.id))?.id ?? lessons[0]?.id ?? "");
  const [pending, start] = useTransition();

  const cur = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const pct = lessons.length ? Math.round((done.size / lessons.length) * 100) : 0;
  const complete = pct === 100 && lessons.length > 0;
  const firstLessonId = lessons[0]?.id;

  function enroll() {
    if (!authed) {
      router.push(`/login?callbackUrl=/academy/${courseSlug}`);
      return;
    }
    start(async () => {
      const res = await enrollCourse(courseId);
      if (res?.ok) {
        setEnrolled(true);
        router.refresh();
      }
    });
  }

  function completeToggle(lessonId: string) {
    const value = !done.has(lessonId);
    setDone((prev) => {
      const n = new Set(prev);
      if (value) n.add(lessonId);
      else n.delete(lessonId);
      return n;
    });
    if (value) {
      const idx = lessons.findIndex((l) => l.id === lessonId);
      if (idx >= 0 && idx < lessons.length - 1) setActiveId(lessons[idx + 1].id);
    }
    start(() => {
      void toggleLesson(courseId, lessonId, value);
    });
  }

  const curLocked = !enrolled && cur?.id !== firstLessonId;

  return (
    <main className="page wrap">
      <Link className="course-back" href="/academy" data-cursor="">
        ← Akademi
      </Link>
      <header className="course-head reveal">
        <span className="eyebrow">Kurs · {level}</span>
        <h1>{title}</h1>
        <p className="course-tagline">Projeye dönüşen, uygulamalı bir program.</p>
        <div className="course-meta">
          <span>
            Eğitmen <b>Marka Akademi</b>
          </span>
          <span>★ {rating}</span>
          <span>{lessons.length} ders</span>
        </div>
      </header>

      <div className="course-prog reveal">
        <div className="course-prog__bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <span className="course-prog__t">
          {done.size}/{lessons.length} ders · %{pct}
        </span>
      </div>

      {complete && (
        <div className="certificate reveal">
          <span className="certificate__seal">✦</span>
          <div>
            <span className="eyebrow">Tamamlandı</span>
            <h3>Tebrikler, kursu bitirdin!</h3>
            <p>
              Bu sertifika <b>{userName}</b> adına, <b>{title}</b> kursunu tamamladığı için verilmiştir.
            </p>
          </div>
          <button className="btn btn--ghost" type="button" onClick={() => window.print()}>
            Sertifikayı indir
          </button>
        </div>
      )}

      <div className="course-layout">
        <div className="course-player reveal">
          {curLocked ? (
            <div className="course-locked">
              <div className="course-locked__ic">🔒</div>
              <h3>Bu derse erişmek için kayıt ol</h3>
              <p>İlk ders ücretsiz önizlemededir. Tüm içeriğe erişmek için kursa kayıt ol.</p>
              <div className="course-price">
                <span className="now">{price}</span>
              </div>
              <button className="btn btn--primary btn--lg" type="button" disabled={pending} onClick={enroll}>
                {authed ? "Kursa kayıt ol" : "Giriş yap & kayıt ol"} <span className="arr">→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="course-stage">
                {cur?.kind === "video" ? (
                  <div className="course-video">
                    <span className="course-video__play">▶</span>
                    <span className="course-video__t">{cur.title}</span>
                  </div>
                ) : (
                  <div className="course-doc">
                    <span className="course-doc__ic">{icon(cur?.kind ?? "doc")}</span>
                  </div>
                )}
              </div>
              <div className="course-lessoninfo">
                <h2>{cur?.title}</h2>
                {cur?.content && <p>{cur.content}</p>}
                <button
                  className={`btn ${cur && done.has(cur.id) ? "btn--ghost" : "btn--primary"}`}
                  type="button"
                  disabled={pending}
                  onClick={() => cur && completeToggle(cur.id)}
                >
                  {cur && done.has(cur.id) ? "✓ Tamamlandı — geri al" : "Dersi tamamla & devam et"}
                </button>
              </div>
            </>
          )}
        </div>

        <aside className="course-curriculum reveal">
          <h3 className="course-curriculum__h">Müfredat</h3>
          {modules.map((mod, mi) => (
            <div className="course-mod" key={mod.id}>
              <div className="course-mod__h">
                {String(mi + 1).padStart(2, "0")} · {mod.title}
              </div>
              {mod.lessons.map((l) => {
                const isDone = done.has(l.id);
                const locked = !enrolled && l.id !== firstLessonId;
                return (
                  <button
                    key={l.id}
                    className={`course-lesson ${l.id === activeId ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                    type="button"
                    onClick={() => (locked ? enroll() : setActiveId(l.id))}
                  >
                    <span className="course-lesson__ic">{isDone ? "✓" : locked ? "🔒" : icon(l.kind)}</span>
                    <span className="course-lesson__t">{l.title}</span>
                    <span className="course-lesson__d">{l.id === firstLessonId && !enrolled ? "Ücretsiz" : l.kind}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}
