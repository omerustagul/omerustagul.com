import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatTRY } from "@/lib/format";
import { Badge, Media } from "@/components/ui";
import { EnrollButton } from "@/components/academy/EnrollButton";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { modules: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" } } } } },
  });
  if (!course) notFound();

  const session = await auth();
  let owned = false;
  if (session?.user?.id) {
    const enr = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
    });
    owned = !!enr;
  }

  const lessonCount = course.modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <main className="u-container" style={{ paddingBlock: "clamp(2rem, 6vw, 5rem)" }}>
      <Link href="/academy" className="u-label" style={{ display: "inline-block", marginBottom: "2rem" }}>
        ← Akademi
      </Link>

      <div style={{ display: "grid", gap: "3rem", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))" }}>
        <div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            {course.title}
          </h1>
          <p style={{ marginTop: "1rem", color: "var(--text-muted)" }}>
            {course.modules.length} modül · {lessonCount} ders
          </p>

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", fontWeight: 600 }}>
              {formatTRY(course.price)}
            </span>
            <EnrollButton courseId={course.id} courseSlug={course.slug} owned={owned} authed={!!session?.user} />
          </div>

          {/* curriculum */}
          <div style={{ marginTop: "3rem" }}>
            <p className="u-label" style={{ marginBottom: "1rem" }}>
              MÜFREDAT
            </p>
            {course.modules.map((m) => (
              <div key={m.id} style={{ borderTop: "1px solid var(--border)", padding: "1rem 0" }}>
                <h3 style={{ fontSize: "var(--fs-h4)" }}>{m.title}</h3>
                <ul style={{ listStyle: "none", marginTop: ".5rem", display: "grid", gap: ".4rem" }}>
                  {m.lessons.map((l) => (
                    <li key={l.id} style={{ color: "var(--text-muted)", display: "flex", gap: ".75rem" }}>
                      <Badge variant="muted">{l.kind}</Badge>
                      {owned ? <Link href={`/academy/${course.slug}/learn`}>{l.title}</Link> : <span>{l.title}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Media ratio="16/10" label="KURS" alt={course.title} />
        </div>
      </div>
    </main>
  );
}
