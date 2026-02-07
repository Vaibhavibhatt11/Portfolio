"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview", path: pathname }),
      signal: controller.signal,
    }).catch(() => {});

    return () => controller.abort();
  }, [pathname]);

  return null;
}
