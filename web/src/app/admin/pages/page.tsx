import { getHomeLayout } from "@/lib/home-layout-server";
import { HOME_BUILTINS } from "@/lib/home-layout";
import { PagesClient } from "./client";

export const dynamic = "force-dynamic";

export default async function PagesPage() {
  const layout = await getHomeLayout();
  return <PagesClient builtins={HOME_BUILTINS} initialLayout={layout} />;
}
