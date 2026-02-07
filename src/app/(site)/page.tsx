import FreelanceCTA from "@/components/site/FreelanceCTA";
import ContactForm from "@/components/site/ContactForm";
import Reveal from "@/components/site/Reveal";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDateRange(startDate: Date, endDate?: Date | null) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  });

  const start = formatter.format(startDate);
  const end = endDate ? formatter.format(endDate) : "Present";
  return `${start} · ${end}`;
}

export default async function HomePage() {
  const [settings, about, skills, services, projects, experiences, education] =
    await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.about.findFirst(),
      prisma.skill.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
      prisma.service.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
      prisma.project.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
    ]);

  return (
    <main className="bg-[var(--bg)]">
      <section className="section">
        <Reveal>
          <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-6">
              <span className="badge">
                {settings?.heroBadge ?? "Senior Full-Stack Engineer"}
              </span>
              <h1 className="font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] md:text-6xl">
                {settings?.name ?? "Your Name"} · {settings?.role ?? "Full-Stack Engineer"}
              </h1>
              <p className="max-w-xl text-lg text-[var(--text-muted)]">
                {settings?.tagline ??
                  "I design and build premium digital experiences that move teams faster."}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {settings?.openForFreelance ? (
                  <FreelanceCTA label={settings.ctaLabel} href="#contact" />
                ) : (
                  <span className="rounded-full border border-[var(--border)] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Currently booked
                  </span>
                )}
                {settings?.resumeUrl ? (
                  <a
                    href={settings.resumeUrl}
                    className="rounded-full border border-[var(--border)] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] transition hover:text-[var(--text)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Resume
                  </a>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="pill">Flutter + Full Stack</span>
                <span className="pill">{about?.location ?? "Remote"}</span>
                <span className="pill">
                  {settings?.openForFreelance ? "Open for Work" : "Limited Availability"}
                </span>
              </div>
            </div>
            <div className="card flex flex-col gap-6 p-7">
            {settings?.heroImageUrl ? (
              <div className="flex justify-center">
                <div className="h-40 w-40 overflow-hidden rounded-full border border-[var(--border)]">
                  <img
                    src={encodeURI(settings.heroImageUrl)}
                    alt={`${settings.name ?? "Portfolio"} portrait`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : null}
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Availability
              </div>
              <p className="text-lg text-[var(--text)]">
                {settings?.openForFreelance
                  ? settings?.availabilityNote ?? "Actively accepting new freelance engagements."
                  : "Limited availability. Next opening soon."}
              </p>
              <div className="grid gap-4 text-sm text-[var(--text-muted)]">
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="text-[var(--text)]">{about?.location ?? "Remote"}</span>
                </div>
              <div className="flex items-center justify-between">
                <span>Specialties</span>
                <span className="text-[var(--text)]">
                  {(settings?.specialties ?? "Flutter, Full-Stack")
                    .split(",")
                    .map((item) => item.trim())
                    .filter((item) => item && item.toLowerCase() !== "ui/ux" && item.toLowerCase() !== "uiux")
                    .join(", ")}
                </span>
              </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span className="text-[var(--text)]">
                    {settings?.delivery ?? "Strategy to Launch"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="section-tight">
        <Reveal>
          <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="card p-8">
            <h2 className="section-heading">
              {about?.headline ?? "About"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
              {about?.bio ?? "Update your about section in the admin panel."}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="card p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Focus Areas
              </div>
              <ul className="mt-4 grid gap-3 text-sm text-[var(--text-muted)]">
                {(settings?.focusAreas?.length
                  ? settings.focusAreas
                  : [
                      "Product strategy + UX collaboration",
                      "Full-stack architecture with TypeScript",
                      "Performance and Core Web Vitals",
                    ]
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Freelance Fit
              </div>
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                {settings?.freelanceFit ??
                  "Ideal for startups, agencies, and internal teams looking for a senior engineer who can ship independently and collaborate well."}
              </p>
            </div>
          </div>
          </div>
        </Reveal>
      </section>

      <section id="skills" className="section">
        <Reveal>
          <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <span className="section-kicker">Skills</span>
              <h2 className="mt-3 section-heading">
                {settings?.skillsHeading ?? "Technical Stack"}
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill.id} className="card p-6">
                <div className="text-lg text-[var(--text)]">{skill.name}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {skill.category ?? "Core"}
                </div>
                {skill.level ? (
                  <div className="mt-3 text-sm text-[var(--text-muted)]">
                    {skill.level}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          </div>
        </Reveal>
      </section>

      <section id="services" className="section">
        <Reveal>
          <div className="container">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="section-heading">
                  {settings?.servicesHeading ?? "Services"}
                </h2>
              </div>
            </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.id} className="card p-6">
                <h3 className="text-xl text-[var(--text)]">{service.title}</h3>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          </div>
        </Reveal>
      </section>

      <section id="projects" className="section">
        <Reveal>
          <div className="container">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="section-heading">
                  {settings?.projectsHeading ?? "Projects"}
                </h2>
              </div>
            </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="card overflow-hidden">
                {project.imageUrl ? (
                  <div className="h-48 w-full overflow-hidden border-b border-[var(--border)]">
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt ?? project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="text-xl text-[var(--text)]">{project.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </Reveal>
      </section>

      <section id="experience" className="section">
        <Reveal>
          <div className="container">
            <div className="flex items-end justify-between">
              <div>
              <h2 className="section-heading">
                {settings?.experienceHeading ?? "Experience"}
              </h2>
              </div>
            </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="card p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <h3 className="text-xl text-[var(--text)]">{exp.role}</h3>
                    {exp.role.toLowerCase().includes("lead intern") ? (
                      <span className="badge">Current</span>
                    ) : null}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {exp.company}
                  </div>
                  <p className="mt-3 text-sm text-[var(--text-muted)]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid gap-4">
              {education.map((item) => (
                <div key={item.id} className="card p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {formatDateRange(item.startDate, item.endDate)}
                  </div>
                  <h3 className="mt-2 text-xl text-[var(--text)]">{item.program}</h3>
                  <div className="text-sm text-[var(--text-muted)]">
                    {item.school}
                  </div>
                  {item.description ? (
                    <p className="mt-3 text-sm text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="section">
        <Reveal>
          <div className="container">
          <div className="card grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="section-kicker">
                {settings?.contactBadge ?? "Contact"}
              </span>
              <h2 className="mt-3 section-heading">
                {settings?.contactHeading ?? "Let’s talk about your project"}
              </h2>
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                {settings?.contactBody ??
                  "Share a quick overview and I’ll follow up with next steps, timelines, and a proposal."}
              </p>
            </div>
            <ContactForm />
          </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
