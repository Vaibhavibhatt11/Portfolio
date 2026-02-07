"use client";

import { useTransition } from "react";

type FreelanceCTAProps = {
  label: string;
  href: string;
};

export default function FreelanceCTA({ label, href }: FreelanceCTAProps) {
  const [, startTransition] = useTransition();

  return (
    <a
      href={href}
      onClick={() => {
        startTransition(() => {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "cta_click", path: href }),
          }).catch(() => {});
        });
      }}
      className="cta-primary inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:opacity-90"
    >
      {label}
    </a>
  );
}
