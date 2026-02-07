"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AdminLogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/admin/login" });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-[var(--text)]">
      <div className="card w-full max-w-md p-8 text-center">
        <h1 className="font-[var(--font-display)] text-2xl">Signing out…</h1>
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          Redirecting you to the login page.
        </p>
      </div>
    </main>
  );
}
