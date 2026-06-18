import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCourse } from "@/lib/actions/admin";
import { AdminHeader, Table } from "@/components/admin/ui";
import { CourseForm } from "@/components/admin/forms";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
const td = { padding: ".6rem .5rem", borderBottom: "1px solid var(--border)" } as const;

export default async function AdminCourses() {
  const items = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminHeader title="Kurslar" />
      <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-sm)", marginBottom: "1.5rem" }}>
        Modül/ders düzenlemesi sonraki fazda; burada kurs künyesi yönetilir.
      </p>
      <Table head={["Başlık", "Fiyat", ""]}>
        {items.map((c) => (
          <tr key={c.id}>
            <td style={td}>
              <Link href={`/admin/courses/${c.id}`}>{c.title}</Link>
            </td>
            <td style={td}>₺{c.price.toLocaleString("tr-TR")}</td>
            <td style={{ ...td, textAlign: "right" }}>
              <Link href={`/admin/courses/${c.id}`}>Düzenle</Link>{" · "}
              <DeleteButton action={deleteCourse} id={c.id} />
            </td>
          </tr>
        ))}
      </Table>
      <h2 style={{ margin: "2.5rem 0 1rem", fontSize: "var(--fs-h4)" }}>Yeni kurs</h2>
      <CourseForm />
    </div>
  );
}
