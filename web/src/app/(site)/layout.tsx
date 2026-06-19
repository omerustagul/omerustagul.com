import { auth } from "@/auth";
import { getLocale } from "@/lib/i18n-server";
import { MarkaHeader } from "@/components/marka/MarkaHeader";
import { MarkaFooter } from "@/components/marka/MarkaFooter";
import { Motion } from "@/components/marka/Motion";
import { EntryPopup } from "@/components/marka/EntryPopup";

export const dynamic = "force-dynamic";

// Shared site chrome (faithful port of the prototype's theme/site-chrome.js
// classic header + columns footer) + the motion interaction layer.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  return (
    <div className="mk-site">
      <MarkaHeader locale={locale} userName={session?.user?.name ?? null} />
      {children}
      <MarkaFooter locale={locale} />
      <Motion />
      <EntryPopup />
    </div>
  );
}
