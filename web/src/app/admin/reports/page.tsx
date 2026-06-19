import { prisma } from "@/lib/prisma";
import { ReportsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const [projects, blogs, leads] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.lead.count(),
  ]);

  const stats = [
    { label: "PROJELER", val: projects, delta: "12%", dir: "up" },
    { label: "BLOG", val: blogs, delta: "2", dir: "up" },
    { label: "TALEPLER", val: leads, delta: "5%", dir: "down" },
    { label: "TRAFİK (HAFTALIK)", val: "417", delta: "18%", dir: "up" },
  ];

  return <ReportsClient stats={stats} />;
}
