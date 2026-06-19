import { prisma } from "@/lib/prisma";
import { ProfileCVClient } from "./client";

export const dynamic = "force-dynamic";

export default async function ProfileCVPage() {
  const row = await prisma.profile.findFirst();
  return <ProfileCVClient initial={row?.data ?? null} />;
}
