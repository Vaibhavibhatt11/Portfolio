"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function updateAbout(formData: FormData) {
  await requireAdmin();
  const headline = String(formData.get("headline") ?? "");
  const bio = String(formData.get("bio") ?? "");
  const location = String(formData.get("location") ?? "");
  const email = String(formData.get("email") ?? "");

  const existing = await prisma.about.findFirst();
  if (existing) {
    await prisma.about.update({
      where: { id: existing.id },
      data: { headline, bio, location, email },
    });
  } else {
    await prisma.about.create({
      data: { headline, bio, location, email },
    });
  }
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "");
  const category = String(formData.get("category") ?? "");
  const level = String(formData.get("level") ?? "");
  const order = Number(formData.get("order") ?? 0);
  const visible = formData.get("visible") !== "off";

  await prisma.skill.create({
    data: {
      name,
      category: category || null,
      level: level || null,
      order,
      visible,
    },
  });
}

export async function updateSkill(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "");
  const category = String(formData.get("category") ?? "");
  const level = String(formData.get("level") ?? "");
  const order = Number(formData.get("order") ?? 0);
  const visible = formData.get("visible") !== "off";

  await prisma.skill.update({
    where: { id },
    data: {
      name,
      category: category || null,
      level: level || null,
      order,
      visible,
    },
  });
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.skill.delete({ where: { id } });
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "");
  const order = Number(formData.get("order") ?? 0);
  const visible = formData.get("visible") !== "off";

  await prisma.service.create({
    data: { title, description, order, visible },
  });
}

export async function updateService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "");
  const order = Number(formData.get("order") ?? 0);
  const visible = formData.get("visible") !== "off";

  await prisma.service.update({
    where: { id },
    data: { title, description, order, visible },
  });
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.service.delete({ where: { id } });
}

export async function createExperience(formData: FormData) {
  await requireAdmin();
  const company = String(formData.get("company") ?? "");
  const role = String(formData.get("role") ?? "");
  const description = String(formData.get("description") ?? "");
  const startDate = new Date(String(formData.get("startDate")));
  const endDateRaw = String(formData.get("endDate") ?? "");
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const order = Number(formData.get("order") ?? 0);

  await prisma.experience.create({
    data: { company, role, description, startDate, endDate, order },
  });
}

export async function updateExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const company = String(formData.get("company") ?? "");
  const role = String(formData.get("role") ?? "");
  const description = String(formData.get("description") ?? "");
  const startDate = new Date(String(formData.get("startDate")));
  const endDateRaw = String(formData.get("endDate") ?? "");
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const order = Number(formData.get("order") ?? 0);

  await prisma.experience.update({
    where: { id },
    data: { company, role, description, startDate, endDate, order },
  });
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.experience.delete({ where: { id } });
}

export async function createEducation(formData: FormData) {
  await requireAdmin();
  const school = String(formData.get("school") ?? "");
  const program = String(formData.get("program") ?? "");
  const description = String(formData.get("description") ?? "");
  const startDate = new Date(String(formData.get("startDate")));
  const endDateRaw = String(formData.get("endDate") ?? "");
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const order = Number(formData.get("order") ?? 0);

  await prisma.education.create({
    data: { school, program, description, startDate, endDate, order },
  });
}

export async function updateEducation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const school = String(formData.get("school") ?? "");
  const program = String(formData.get("program") ?? "");
  const description = String(formData.get("description") ?? "");
  const startDate = new Date(String(formData.get("startDate")));
  const endDateRaw = String(formData.get("endDate") ?? "");
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const order = Number(formData.get("order") ?? 0);

  await prisma.education.update({
    where: { id },
    data: { school, program, description, startDate, endDate, order },
  });
}

export async function deleteEducation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.education.delete({ where: { id } });
}
