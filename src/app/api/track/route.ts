import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUtcDateBucket, getVisitorHash } from "@/lib/analytics";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body?.type === "cta_click" ? "CTA_CLICK" : "PAGEVIEW";
    const path = typeof body?.path === "string" ? body.path : "/";

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() ?? null;
    const userAgent = request.headers.get("user-agent");
    const visitorHash = getVisitorHash(ip, userAgent);

    await prisma.analyticsEvent.create({
      data: {
        type,
        path,
        visitorHash,
        userAgent: userAgent ?? undefined,
        date: getUtcDateBucket(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
