import AdminNav from "@/components/admin/AdminNav";
import SignOutButton from "@/components/admin/SignOutButton";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-current-path");

  if (pathname?.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6">
          <AdminNav name={settings?.name ?? "Portfolio"} />
          <SignOutButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
