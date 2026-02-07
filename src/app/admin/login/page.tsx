"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error || !result?.ok) {
        setError("Invalid credentials or server configuration.");
        return;
      }

      router.push("/admin");
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-[var(--text)]">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-[var(--font-display)] text-3xl">Admin Login</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Sign in to manage portfolio content and analytics.
        </p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent-strong)] disabled:opacity-60"
          >
            Sign In
          </button>
          {error ? (
            <p className="text-sm text-red-400">{error}</p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
