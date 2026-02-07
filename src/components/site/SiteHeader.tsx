import Link from "next/link";

type SiteHeaderProps = {
  name: string;
  openForFreelance: boolean;
};

export default function SiteHeader({ name, openForFreelance }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-[var(--font-display)] text-lg font-semibold text-[var(--text)]">
          {name}
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] md:flex">
          <a href="#about" className="transition hover:text-[var(--text)]">
            About
          </a>
          <a href="#skills" className="transition hover:text-[var(--text)]">
            Skills
          </a>
          <a href="#services" className="transition hover:text-[var(--text)]">
            Services
          </a>
          <a href="#projects" className="transition hover:text-[var(--text)]">
            Projects
          </a>
          <a href="#experience" className="transition hover:text-[var(--text)]">
            Experience
          </a>
          <a href="#contact" className="transition hover:text-[var(--text)]">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          {openForFreelance ? (
            <span className="badge">Open for Freelance</span>
          ) : (
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
              Not taking new projects
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
