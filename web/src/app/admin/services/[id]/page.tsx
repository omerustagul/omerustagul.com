import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/forms";

export const dynamic = "force-dynamic";

export default async function EditService({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.service.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <Link href="/admin/services" className="u-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Hizmetler
      </Link>
      <h1 style={{ fontSize: "var(--fs-h2)", marginBottom: "2rem" }}>{record.title}</h1>
      <ServiceForm record={record} />
    </div>
  );
}
