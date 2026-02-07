"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("name") ?? "");
  const role = String(formData.get("role") ?? "");
  const tagline = String(formData.get("tagline") ?? "");
  const heroBadge = String(formData.get("heroBadge") ?? "");
  const ctaLabel = String(formData.get("ctaLabel") ?? "");
  const resumeUrl = String(formData.get("resumeUrl") ?? "");
  const heroImageUrl = String(formData.get("heroImageUrl") ?? "");
  const openForFreelance = formData.get("openForFreelance") === "on";
  const availabilityNote = String(formData.get("availabilityNote") ?? "");
  const specialties = String(formData.get("specialties") ?? "");
  const delivery = String(formData.get("delivery") ?? "");
  const focusAreasRaw = String(formData.get("focusAreas") ?? "");
  const freelanceFit = String(formData.get("freelanceFit") ?? "");
  const skillsHeading = String(formData.get("skillsHeading") ?? "");
  const servicesHeading = String(formData.get("servicesHeading") ?? "");
  const projectsHeading = String(formData.get("projectsHeading") ?? "");
  const experienceHeading = String(formData.get("experienceHeading") ?? "");
  const contactBadge = String(formData.get("contactBadge") ?? "");
  const contactHeading = String(formData.get("contactHeading") ?? "");
  const contactBody = String(formData.get("contactBody") ?? "");

  const focusAreas = focusAreasRaw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const existing = await prisma.siteSettings.findFirst();

  if (existing) {
    await prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        name,
        role,
        tagline,
        heroBadge: heroBadge || null,
        ctaLabel: ctaLabel || "Open for Freelance Projects",
        resumeUrl: resumeUrl || null,
        heroImageUrl: heroImageUrl || null,
        openForFreelance,
        availabilityNote: availabilityNote || null,
        specialties: specialties || null,
        delivery: delivery || null,
        focusAreas,
        freelanceFit: freelanceFit || null,
        skillsHeading: skillsHeading || null,
        servicesHeading: servicesHeading || null,
        projectsHeading: projectsHeading || null,
        experienceHeading: experienceHeading || null,
        contactBadge: contactBadge || null,
        contactHeading: contactHeading || null,
        contactBody: contactBody || null,
      },
    });
  } else {
    await prisma.siteSettings.create({
      data: {
        name,
        role,
        tagline,
        heroBadge: heroBadge || null,
        ctaLabel: ctaLabel || "Open for Freelance Projects",
        resumeUrl: resumeUrl || null,
        heroImageUrl: heroImageUrl || null,
        openForFreelance,
        availabilityNote: availabilityNote || null,
        specialties: specialties || null,
        delivery: delivery || null,
        focusAreas,
        freelanceFit: freelanceFit || null,
        skillsHeading: skillsHeading || null,
        servicesHeading: servicesHeading || null,
        projectsHeading: projectsHeading || null,
        experienceHeading: experienceHeading || null,
        contactBadge: contactBadge || null,
        contactHeading: contactHeading || null,
        contactBody: contactBody || null,
      },
    });
  }
}

export async function createSocialLink(formData: FormData) {
  await requireAdmin();
  const label = String(formData.get("label") ?? "");
  const url = String(formData.get("url") ?? "");
  const order = Number(formData.get("order") ?? 0);

  await prisma.socialLink.create({
    data: { label, url, order },
  });
}

export async function updateSocialLink(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "");
  const url = String(formData.get("url") ?? "");
  const order = Number(formData.get("order") ?? 0);

  await prisma.socialLink.update({
    where: { id },
    data: { label, url, order },
  });
}

export async function deleteSocialLink(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.socialLink.delete({ where: { id } });
}
