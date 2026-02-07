import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const debugToken = process.env.DEBUG_TOKEN;

  if (!debugToken || token !== debugToken) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();

  try {
    const admin = adminEmail
      ? await prisma.user.findUnique({ where: { email: adminEmail } })
      : null;

    return NextResponse.json({
      ok: true,
      adminEmailSet: Boolean(adminEmail),
      adminUserExists: Boolean(admin),
      adminHasPassword: Boolean(admin?.passwordHash),
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "DB_ERROR" }, { status: 500 });
  }
}
