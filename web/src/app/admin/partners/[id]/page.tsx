import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PartnerForm } from "@/components/admin/forms";

export const dynamic = "force-dynamic";

export default async function EditPartner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.partner.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <Link href="/admin/partners" className="u-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Partnerler
      </Link>
      <h1 style={{ fontSize: "var(--fs-h2)", marginBottom: "2rem" }}>{record.name}</h1>
      <PartnerForm record={record} />
    </div>
  );
}
