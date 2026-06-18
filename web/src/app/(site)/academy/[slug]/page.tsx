import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatTRY } from "@/lib/format";
import { auth } from "@/auth";
import { CoursePage } from "@/components/marka/CoursePage";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) return {};
  return { title: course.title, openGraph: { title: course.title } };
}

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { modules: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" } } } } },
  });
  if (!course) notFound();

  const session = await auth();
  let enrolled = false;
  let done: string[] = [];
  if (session?.user?.id) {
    const [enr, progress] = await Promise.all([
      prisma.enrollment.findUnique({ where: { userId_courseId: { userId: session.user.id, courseId: course.id } } }),
      prisma.lessonProgress.findMany({ where: { userId: session.user.id, courseId: course.id }, select: { lessonId: true } }),
    ]);
    enrolled = !!enr;
    done = progress.map((p) => p.lessonId);
  }

  return (
    <CoursePage
      courseId={course.id}
      courseSlug={course.slug}
      title={course.title}
      level="Orta"
      rating={4.8}
      price={formatTRY(course.price)}
      modules={course.modules.map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => ({ id: l.id, title: l.title, kind: l.kind, content: l.content })),
      }))}
      enrolled={enrolled}
      doneInit={done}
      authed={!!session?.user}
      userName={session?.user?.name ?? "Öğrenci"}
    />
  );
}
