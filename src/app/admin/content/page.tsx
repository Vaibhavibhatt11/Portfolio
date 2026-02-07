import { prisma } from "@/lib/db";
import {
  createEducation,
  createExperience,
  createService,
  createSkill,
  deleteEducation,
  deleteExperience,
  deleteService,
  deleteSkill,
  updateAbout,
  updateEducation,
  updateExperience,
  updateService,
  updateSkill,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const [about, skills, services, experiences, education] = await Promise.all([
    prisma.about.findFirst(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <section className="grid gap-8">
      <div>
        <h1 className="font-[var(--font-display)] text-3xl">Content</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Update about copy, skills, services, and timeline items.
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl text-[var(--text)]">About</h2>
        <form action={updateAbout} className="mt-4 grid gap-4">
          <input
            name="headline"
            defaultValue={about?.headline ?? ""}
            placeholder="Headline"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <textarea
            name="bio"
            defaultValue={about?.bio ?? ""}
            rows={4}
            placeholder="Bio"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="location"
              defaultValue={about?.location ?? ""}
              placeholder="Location"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
            <input
              name="email"
              defaultValue={about?.email ?? ""}
              placeholder="Contact email"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            Save About
          </button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl text-[var(--text)]">Skills</h2>
          <form action={createSkill} className="mt-4 grid gap-3">
            <input
              name="name"
              placeholder="Skill name"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <input
              name="category"
              placeholder="Category"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <input
              name="level"
              placeholder="Level (optional)"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <input
              name="order"
              type="number"
              defaultValue={0}
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <input type="checkbox" name="visible" defaultChecked /> Visible
            </label>
            <button
              type="submit"
              className="rounded-full border border-[var(--border)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              Add Skill
            </button>
          </form>

          <div className="mt-6 grid gap-4">
            {skills.map((skill) => (
              <form key={skill.id} action={updateSkill} className="grid gap-3">
                <input type="hidden" name="id" value={skill.id} />
                <input
                  name="name"
                  defaultValue={skill.name}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    name="category"
                    defaultValue={skill.category ?? ""}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                  <input
                    name="level"
                    defaultValue={skill.level ?? ""}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    name="order"
                    type="number"
                    defaultValue={skill.order}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                  <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <input type="checkbox" name="visible" defaultChecked={skill.visible} />{" "}
                    Visible
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    formAction={deleteSkill}
                    className="rounded-full border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl text-[var(--text)]">Services</h2>
          <form action={createService} className="mt-4 grid gap-3">
            <input
              name="title"
              placeholder="Service title"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <textarea
              name="description"
              rows={3}
              placeholder="Description"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                name="order"
                type="number"
                defaultValue={0}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <input type="checkbox" name="visible" defaultChecked /> Visible
              </label>
            </div>
            <button
              type="submit"
              className="rounded-full border border-[var(--border)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              Add Service
            </button>
          </form>

          <div className="mt-6 grid gap-4">
            {services.map((service) => (
              <form key={service.id} action={updateService} className="grid gap-3">
                <input type="hidden" name="id" value={service.id} />
                <input
                  name="title"
                  defaultValue={service.title}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={service.description}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    name="order"
                    type="number"
                    defaultValue={service.order}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                  <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <input type="checkbox" name="visible" defaultChecked={service.visible} />{" "}
                    Visible
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    formAction={deleteService}
                    className="rounded-full border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl text-[var(--text)]">Experience</h2>
          <form action={createExperience} className="mt-4 grid gap-3">
            <input
              name="company"
              placeholder="Company"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <input
              name="role"
              placeholder="Role"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <textarea
              name="description"
              rows={3}
              placeholder="Summary"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                name="startDate"
                type="date"
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
              <input
                name="endDate"
                type="date"
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
            </div>
            <input
              name="order"
              type="number"
              defaultValue={0}
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-full border border-[var(--border)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              Add Experience
            </button>
          </form>
          <div className="mt-6 grid gap-4">
            {experiences.map((exp) => (
              <form key={exp.id} action={updateExperience} className="grid gap-3">
                <input type="hidden" name="id" value={exp.id} />
                <input
                  name="company"
                  defaultValue={exp.company}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <input
                  name="role"
                  defaultValue={exp.role}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={exp.description}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    name="startDate"
                    type="date"
                    defaultValue={exp.startDate.toISOString().slice(0, 10)}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                  <input
                    name="endDate"
                    type="date"
                    defaultValue={exp.endDate ? exp.endDate.toISOString().slice(0, 10) : ""}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                </div>
                <input
                  name="order"
                  type="number"
                  defaultValue={exp.order}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    formAction={deleteExperience}
                    className="rounded-full border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl text-[var(--text)]">Education</h2>
          <form action={createEducation} className="mt-4 grid gap-3">
            <input
              name="school"
              placeholder="School"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <input
              name="program"
              placeholder="Program"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <textarea
              name="description"
              rows={3}
              placeholder="Description"
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <div className="grid gap-3 md:grid-cols-2">
              <input
                name="startDate"
                type="date"
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
              <input
                name="endDate"
                type="date"
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
            </div>
            <input
              name="order"
              type="number"
              defaultValue={0}
              className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-full border border-[var(--border)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              Add Education
            </button>
          </form>
          <div className="mt-6 grid gap-4">
            {education.map((edu) => (
              <form key={edu.id} action={updateEducation} className="grid gap-3">
                <input type="hidden" name="id" value={edu.id} />
                <input
                  name="school"
                  defaultValue={edu.school}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <input
                  name="program"
                  defaultValue={edu.program}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={edu.description ?? ""}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    name="startDate"
                    type="date"
                    defaultValue={edu.startDate.toISOString().slice(0, 10)}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                  <input
                    name="endDate"
                    type="date"
                    defaultValue={edu.endDate ? edu.endDate.toISOString().slice(0, 10) : ""}
                    className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                  />
                </div>
                <input
                  name="order"
                  type="number"
                  defaultValue={edu.order}
                  className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  >
                    Save
                  </button>
                  <button
                    type="submit"
                    formAction={deleteEducation}
                    className="rounded-full border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
