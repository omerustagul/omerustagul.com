import { prisma } from "@/lib/prisma";
import { LeadsClient } from "./client";

export const dynamic = "force-dynamic";

const STAGES = ["Yeni", "Görüşülüyor", "Teklif", "Kazanıldı", "Kaybedildi"];

export default async function LeadsPage() {
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const leads = rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    message: r.message ?? "",
    status: STAGES.includes(r.status) ? r.status : "Yeni",
    priority: r.priority ?? "Orta",
    budget: r.budget ?? "",
    source: r.source ?? "Web sitesi",
    notes: r.notes ?? "",
    date: r.createdAt.toISOString(),
  }));
  return <LeadsClient initial={leads} />;
}
