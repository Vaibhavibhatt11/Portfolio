type SiteFooterProps = {
  name: string;
  socials: { label: string; url: string }[];
};

export default function SiteFooter({ name, socials }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container flex flex-col gap-6 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">
        <div className="grid gap-2">
          <div className="font-[var(--font-display)] text-[var(--text)]">{name}</div>
          <div>Full Stack Developer & Creative Tech Specialist</div>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:vhb1114@gmail.com" className="transition hover:text-[var(--text)]">
              vhb1114@gmail.com
            </a>
            <span>•</span>
            <a href="tel:+919909949320" className="transition hover:text-[var(--text)]">
              9909949320
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {socials.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="transition hover:text-[var(--text)]"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="container mt-6 text-xs text-[var(--text-muted)]">
        © 2026 Vaibhavi Bhatt. All rights reserved.
      </div>
    </footer>
  );
}
