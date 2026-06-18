import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/forms";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" } as const;

export default async function AdminProducts() {
  const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminHeader title="Ürünler" />
      <Table head={["Başlık", "Fiyat", ""]}>
        {items.map((p) => (
          <tr key={p.id}>
            <td style={td}>
              <Link href={`/admin/products/${p.id}`}>{p.title}</Link>
            </td>
            <td style={td}>{p.price} USD</td>
            <td style={{ ...td, textAlign: "right" }}>
              <Link href={`/admin/products/${p.id}`}>Düzenle</Link>{" · "}
              <DeleteButton action={deleteProduct} id={p.id} />
            </td>
          </tr>
        ))}
      </Table>
      <h2 style={{ margin: "2.5rem 0 1rem", fontSize: "var(--fs-h4)" }}>Yeni ürün</h2>
      <ProductForm />
    </div>
  );
}
