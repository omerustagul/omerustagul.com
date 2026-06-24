import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "./client";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      client: true,
      category: true,
      tag: true,
      image: true,
      featured: true,
      order: true,
      data: true,
    },
  });
  return <ProjectsClient initial={projects} />;
}
