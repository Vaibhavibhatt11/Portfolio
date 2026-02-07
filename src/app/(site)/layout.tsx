import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.siteSettings.findFirst();
  const socials = await prisma.socialLink.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <SiteHeader
        name={settings?.name ?? "Portfolio"}
        openForFreelance={settings?.openForFreelance ?? false}
      />
      {children}
      <SiteFooter
        name={settings?.name ?? "Portfolio"}
        socials={socials.map((link) => ({
          label: link.label,
          url: link.url,
        }))}
      />
      <AnalyticsTracker />
    </>
  );
}
