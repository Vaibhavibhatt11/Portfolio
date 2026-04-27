"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import { uploadImageFile } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

function parseTechStack(raw: string) {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getUniqueProjectSlug(
  rawSlug: string,
  title: string,
  currentId?: string,
) {
  const baseSlug = toSlug(rawSlug) || toSlug(title) || "project";
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === currentId) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "");
  const slug = await getUniqueProjectSlug(
    String(formData.get("slug") ?? ""),
    title,
  );
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

  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const slug = await getUniqueProjectSlug(
    String(formData.get("slug") ?? ""),
    title,
    id,
  );
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

  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
