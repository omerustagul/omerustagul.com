import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/forms";

export const dynamic = "force-dynamic";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.product.findUnique({ where: { id } });
  if (!record) notFound();
  return (
    <div>
      <Link href="/admin/products" className="u-label" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
        ← Ürünler
      </Link>
      <h1 style={{ fontSize: "var(--fs-h2)", marginBottom: "2rem" }}>{record.title}</h1>
      <ProductForm record={record} />
    </div>
  );
}
