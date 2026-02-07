import { prisma } from "@/lib/db";
import {
  createSocialLink,
  deleteSocialLink,
  updateSettings,
  updateSocialLink,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findFirst();
  const socials = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="grid gap-8">
      <div>
        <h1 className="font-[var(--font-display)] text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Manage hero copy, resume link, and social profiles.
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl text-[var(--text)]">Site Settings</h2>
        <form action={updateSettings} className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              defaultValue={settings?.name ?? ""}
              placeholder="Full name"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
            <input
              name="role"
              defaultValue={settings?.role ?? ""}
              placeholder="Role"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <textarea
            name="tagline"
            defaultValue={settings?.tagline ?? ""}
            rows={3}
            placeholder="Tagline"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <input
            name="heroBadge"
            defaultValue={settings?.heroBadge ?? ""}
            placeholder="Hero badge"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <textarea
            name="availabilityNote"
            defaultValue={settings?.availabilityNote ?? ""}
            rows={2}
            placeholder="Availability note"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="ctaLabel"
              defaultValue={settings?.ctaLabel ?? ""}
              placeholder="CTA label"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
            <input
              name="resumeUrl"
              defaultValue={settings?.resumeUrl ?? ""}
              placeholder="Resume URL"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <input
            name="heroImageUrl"
            defaultValue={settings?.heroImageUrl ?? ""}
            placeholder="Hero image URL"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="specialties"
              defaultValue={settings?.specialties ?? ""}
              placeholder="Specialties (comma-separated)"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
            <input
              name="delivery"
              defaultValue={settings?.delivery ?? ""}
              placeholder="Delivery line"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <textarea
            name="focusAreas"
            defaultValue={settings?.focusAreas?.join("\n") ?? ""}
            rows={3}
            placeholder="Focus areas (one per line)"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <textarea
            name="freelanceFit"
            defaultValue={settings?.freelanceFit ?? ""}
            rows={2}
            placeholder="Freelance fit copy"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="skillsHeading"
              defaultValue={settings?.skillsHeading ?? ""}
              placeholder="Skills heading"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
            <input
              name="servicesHeading"
              defaultValue={settings?.servicesHeading ?? ""}
              placeholder="Services heading"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="projectsHeading"
              defaultValue={settings?.projectsHeading ?? ""}
              placeholder="Projects heading"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
            <input
              name="experienceHeading"
              defaultValue={settings?.experienceHeading ?? ""}
              placeholder="Experience heading"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <input
            name="contactBadge"
            defaultValue={settings?.contactBadge ?? ""}
            placeholder="Contact badge"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <textarea
            name="contactHeading"
            defaultValue={settings?.contactHeading ?? ""}
            rows={1}
            placeholder="Contact heading"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <textarea
            name="contactBody"
            defaultValue={settings?.contactBody ?? ""}
            rows={2}
            placeholder="Contact body"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <input
              type="checkbox"
              name="openForFreelance"
              defaultChecked={settings?.openForFreelance ?? true}
            />{" "}
            Open for freelance
          </label>
          <button
            type="submit"
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            Save Settings
          </button>
        </form>
      </div>

      <div className="card p-6">
        <h2 className="text-xl text-[var(--text)]">Social Links</h2>
        <form action={createSocialLink} className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            name="label"
            placeholder="Label"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
          />
          <input
            name="url"
            placeholder="URL"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
          />
          <input
            name="order"
            type="number"
            defaultValue={0}
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-full border border-[var(--border)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] md:col-span-3 md:w-fit"
          >
            Add Link
          </button>
        </form>
        <div className="mt-6 grid gap-4">
          {socials.map((link) => (
            <form key={link.id} action={updateSocialLink} className="grid gap-3 md:grid-cols-3">
              <input type="hidden" name="id" value={link.id} />
              <input
                name="label"
                defaultValue={link.label}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
              <input
                name="url"
                defaultValue={link.url}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
              <input
                name="order"
                type="number"
                defaultValue={link.order}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
              <div className="flex gap-3 md:col-span-3">
                <button
                  type="submit"
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
                >
                  Save
                </button>
                <button
                  type="submit"
                  formAction={deleteSocialLink}
                  className="rounded-full border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
                >
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </section>
  );
}
