import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { CoursePlayer } from "@/components/academy/CoursePlayer";

export const dynamic = "force-dynamic";

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect(`/login?callbackUrl=/academy/${slug}/learn`);

  const course = await prisma.course.findUnique({
    where: { slug },
    include: { modules: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" } } } } },
  });
  if (!course) notFound();

  // must be enrolled
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
  });
  if (!enrollment) redirect(`/academy/${slug}`);

  const progress = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id, courseId: course.id },
    select: { lessonId: true },
  });

  return (
    <main className="u-container" style={{ paddingBlock: "clamp(2rem, 5vw, 4rem)" }}>
      <Link href={`/academy/${slug}`} className="u-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← {course.title}
      </Link>
      <CoursePlayer
        courseId={course.id}
        courseTitle={course.title}
        modules={course.modules.map((m) => ({
          id: m.id,
          title: m.title,
          lessons: m.lessons.map((l) => ({ id: l.id, title: l.title, kind: l.kind, content: l.content })),
        }))}
        initialDone={progress.map((p) => p.lessonId)}
        userName={session.user.name ?? "Öğrenci"}
      />
    </main>
  );
}
