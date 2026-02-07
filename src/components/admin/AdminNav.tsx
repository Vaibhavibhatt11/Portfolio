import Link from "next/link";

type AdminNavProps = {
  name: string;
};

export default function AdminNav({ name }: AdminNavProps) {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
      <Link href="/admin" className="hover:text-[var(--text)]">
        Dashboard
      </Link>
      <Link href="/admin/projects" className="hover:text-[var(--text)]">
        Projects
      </Link>
      <Link href="/admin/content" className="hover:text-[var(--text)]">
        Content
      </Link>
      <Link href="/admin/messages" className="hover:text-[var(--text)]">
        Messages
      </Link>
      <Link href="/admin/settings" className="hover:text-[var(--text)]">
        Settings
      </Link>
      <span className="ml-auto text-[var(--text)]">{name}</span>
    </nav>
  );
}
