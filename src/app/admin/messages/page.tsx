import { prisma } from "@/lib/db";
import { deleteMessage, updateMessage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="grid gap-8">
      <div>
        <h1 className="font-[var(--font-display)] text-3xl">Messages</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Review and tag inbound inquiries.
        </p>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <div key={message.id} className="card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-lg text-[var(--text)]">{message.name}</div>
                <div className="text-sm text-[var(--text-muted)]">
                  {message.email} {message.company ? `· ${message.company}` : ""}
                </div>
                <div className="mt-3 text-sm text-[var(--text-muted)]">
                  {message.message}
                </div>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(message.createdAt)}
              </div>
            </div>
            <form
              action={updateMessage}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <input type="hidden" name="id" value={message.id} />
              <select
                name="tag"
                defaultValue={message.tag}
                className="rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
              >
                <option value="FREELANCE">Freelance</option>
                <option value="JOB">Job</option>
                <option value="GENERAL">General</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <input type="checkbox" name="isRead" defaultChecked={message.isRead} />{" "}
                Mark as read
              </label>
              <button
                type="submit"
                className="rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
              >
                Update
              </button>
              <button
                type="submit"
                formAction={deleteMessage}
                className="rounded-full border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
        {messages.length === 0 ? (
          <div className="card p-6 text-sm text-[var(--text-muted)]">
            No messages yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}
