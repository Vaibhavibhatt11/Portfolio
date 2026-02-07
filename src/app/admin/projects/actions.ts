"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { uploadImageFile } from "@/lib/cloudinary";

function parseTechStack(raw: string) {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const description = String(formData.get("description") ?? "");
  const imageAlt = String(formData.get("imageAlt") ?? "");
  const techStack = parseTechStack(String(formData.get("techStack") ?? ""));
  const liveUrl = String(formData.get("liveUrl") ?? "");
  const repoUrl = String(formData.get("repoUrl") ?? "");
  const featured = formData.get("featured") === "on";
  const visible = formData.get("visible") !== "off";
  const order = Number(formData.get("order") ?? 0);
  const imageFile = formData.get("image") as File | null;

  let imageUrl: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const upload = await uploadImageFile(imageFile);
    imageUrl = upload.secure_url;
  }

  await prisma.project.create({
    data: {
      title,
      slug,
      description,
      imageAlt: imageAlt || null,
      techStack,
      liveUrl: liveUrl || null,
      repoUrl: repoUrl || null,
      featured,
      visible,
      order,
      imageUrl,
    },
  });
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const description = String(formData.get("description") ?? "");
  const imageAlt = String(formData.get("imageAlt") ?? "");
  const techStack = parseTechStack(String(formData.get("techStack") ?? ""));
  const liveUrl = String(formData.get("liveUrl") ?? "");
  const repoUrl = String(formData.get("repoUrl") ?? "");
  const featured = formData.get("featured") === "on";
  const visible = formData.get("visible") !== "off";
  const order = Number(formData.get("order") ?? 0);
  const imageFile = formData.get("image") as File | null;

  let imageUrl: string | undefined;
  if (imageFile && imageFile.size > 0) {
    const upload = await uploadImageFile(imageFile);
    imageUrl = upload.secure_url;
  }

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      imageAlt: imageAlt || null,
      techStack,
      liveUrl: liveUrl || null,
      repoUrl: repoUrl || null,
      featured,
      visible,
      order,
      ...(imageUrl ? { imageUrl } : {}),
    },
  });
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.project.delete({ where: { id } });
}
