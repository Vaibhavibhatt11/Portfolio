import { prisma } from "@/lib/db";
import { createProject, deleteProject, updateProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <section className="grid gap-8">
      <div>
        <h1 className="font-[var(--font-display)] text-3xl">Projects</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Add, update, and publish portfolio projects.
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl text-[var(--text)]">Add New Project</h2>
        <form
          action={createProject}
          className="mt-4 grid gap-4 md:grid-cols-2"
        >
          <input
            name="title"
            required
            placeholder="Title"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <input
            name="slug"
            required
            placeholder="Slug (e.g. product-console)"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <textarea
            name="description"
            required
            rows={3}
            placeholder="Short description"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm md:col-span-2"
          />
          <input
            name="imageAlt"
            placeholder="Image alt text"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm md:col-span-2"
          />
          <input
            name="techStack"
            placeholder="Tech stack (comma-separated)"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm md:col-span-2"
          />
          <input
            name="liveUrl"
            placeholder="Live URL"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <input
            name="repoUrl"
            placeholder="GitHub URL"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <input
            name="order"
            type="number"
            defaultValue={0}
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <input type="checkbox" name="featured" /> Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <input type="checkbox" name="visible" defaultChecked /> Visible
          </label>
          <button
            type="submit"
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            Create Project
          </button>
        </form>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="card p-6">
            <form
              action={updateProject}
              className="grid gap-4 md:grid-cols-2"
            >
              <input type="hidden" name="id" value={project.id} />
              <input
                name="title"
                defaultValue={project.title}
                required
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
              />
              <input
                name="slug"
                defaultValue={project.slug}
                required
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
              />
              <textarea
                name="description"
                defaultValue={project.description}
                rows={3}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm md:col-span-2"
              />
              <input
                name="imageAlt"
                defaultValue={project.imageAlt ?? ""}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm md:col-span-2"
              />
              <input
                name="techStack"
                defaultValue={project.techStack.join(", ")}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm md:col-span-2"
              />
              <input
                name="liveUrl"
                defaultValue={project.liveUrl ?? ""}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
              />
              <input
                name="repoUrl"
                defaultValue={project.repoUrl ?? ""}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
              />
              <input
                name="order"
                type="number"
                defaultValue={project.order}
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm"
              />
              <input
                name="image"
                type="file"
                accept="image/*"
                className="rounded-2xl border border-[var(--border)] bg-transparent px-4 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <input type="checkbox" name="featured" defaultChecked={project.featured} />{" "}
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <input type="checkbox" name="visible" defaultChecked={project.visible} />{" "}
                Visible
              </label>
              <div className="flex flex-wrap gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full border border-[var(--border)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
                >
                  Save Changes
                </button>
                <button
                  type="submit"
                  formAction={deleteProject}
                  className="rounded-full border border-red-500/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
