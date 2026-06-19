import { prisma } from "@/lib/prisma";
import { UsersClient } from "./client";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <UsersClient initialUsers={users} />;
}
