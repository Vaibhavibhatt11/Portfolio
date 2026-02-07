"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";

export default function ContactForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get("message") ?? "");
    if (message.trim().length < 100) {
      setStatus("error");
      return;
    }

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message,
      sourcePath: pathname,
    };

    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Request failed");
        }

        setStatus("success");
        form.reset();
      } catch {
        setStatus("error");
      }
    });
  };

  const retry = () => {
    setStatus("idle");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Name
        </label>
        <input
          name="name"
          required
          className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
          placeholder="Your name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
          placeholder="you@company.com"
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Company (Optional)
        </label>
        <input
          name="company"
          className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
          placeholder="Company or project"
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Project Details
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
          placeholder="Tell me a bit about your project (at least 5 characters)."
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <button
          type="submit"
          disabled={isPending || status === "sending"}
          className="cta-primary inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Inquiry"}
        </button>
        {status === "error" && (
          <button
            type="button"
            onClick={retry}
            className="w-fit rounded-full border border-[var(--border)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Try Again
          </button>
        )}
        {status === "success" && (
          <p className="text-sm text-[var(--accent)]">
            Thanks! I'll reply within 1-2 business days.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            Please enter at least 100 characters and try again.
          </p>
        )}
      </div>
    </form>
  );
}
