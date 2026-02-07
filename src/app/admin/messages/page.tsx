import { prisma } from "@/lib/db";
import { deleteMessage, updateMessage } from "./actions";
import MessageActions from "@/components/admin/MessageActions";

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
            <MessageActions
              message={message}
              updateAction={updateMessage}
              deleteAction={deleteMessage}
            />
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
