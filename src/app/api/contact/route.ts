import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(100),
  sourcePath: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const payload = ContactSchema.parse(await request.json());

    await prisma.contactMessage.create({
      data: {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        message: payload.message,
        sourcePath: payload.sourcePath,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
