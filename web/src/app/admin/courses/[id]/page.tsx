import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CourseForm } from "@/components/admin/forms";

export const dynamic = "force-dynamic";

export default async function EditCourse({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.course.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <Link href="/admin/courses" className="u-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Kurslar
      </Link>
      <h1 style={{ fontSize: "var(--fs-h2)", marginBottom: "2rem" }}>{record.title}</h1>
      <CourseForm record={record} />
    </div>
  );
}
