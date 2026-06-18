import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/forms";

export const dynamic = "force-dynamic";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.project.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <Link href="/admin/projects" className="u-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Projeler
      </Link>
      <h1 style={{ fontSize: "var(--fs-h2)", marginBottom: "2rem" }}>{record.title}</h1>
      <ProjectForm record={record} />
    </div>
  );
}
