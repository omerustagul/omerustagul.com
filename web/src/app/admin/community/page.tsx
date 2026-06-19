import { getCommunityConfig } from "@/lib/community-config-server";
import { CommunityClient } from "./client";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const config = await getCommunityConfig();
  return <CommunityClient initial={config} />;
}
