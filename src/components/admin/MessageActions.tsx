"use client";

import type { ContactMessage, MessageTag } from "@prisma/client";
import { useRef } from "react";

type MessageActionsProps = {
  message: ContactMessage;
  updateAction: (formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
};

export default function MessageActions({
  message,
  updateAction,
  deleteAction,
}: MessageActionsProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const submitUpdate = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <form
      ref={formRef}
      action={updateAction}
      className="mt-4 flex flex-wrap items-center gap-3"
    >
      <input type="hidden" name="id" value={message.id} />
      <select
        name="tag"
        defaultValue={message.tag as MessageTag}
        onChange={submitUpdate}
        className="rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
      >
        <option value="FREELANCE">Freelance</option>
        <option value="JOB">Job</option>
        <option value="GENERAL">General</option>
      </select>
      <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <input
          type="checkbox"
          name="isRead"
          defaultChecked={message.isRead}
          onChange={submitUpdate}
        />{" "}
        Mark as read
      </label>
      <button
        type="submit"
        formAction={deleteAction}
        className="rounded-full border border-red-500/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-300"
      >
        Delete
      </button>
    </form>
  );
}
