"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import type { MessageTag } from "@prisma/client";

export async function updateMessage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const tag = String(formData.get("tag") ?? "GENERAL") as MessageTag;
  const isRead = formData.get("isRead") === "on";

  await prisma.contactMessage.update({
    where: { id },
    data: { tag, isRead },
  });
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.contactMessage.delete({ where: { id } });
}
