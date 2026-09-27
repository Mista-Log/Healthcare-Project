import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Panel } from "@/components/ui/panel";
import type { ChatThread } from "@/lib/chat-store";

export function AssistantLayout({
  threads,
  activeId,
  onNew,
  onDelete,
  children,
}: {
  threads: ChatThread[];
  activeId?: string;
  onNew: () => { id: string };
  onDelete: (id: string) => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <Panel className="flex flex-col gap-2 p-4">
        <button
          type="button"
          onClick={() => {
            const t = onNew();
            void navigate({ to: "/assistant/$threadId", params: { threadId: t.id } });
          }}
          className="rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground"
        >
          New conversation
        </button>
        <div className="label-mono mt-2">Saved on this device</div>
        <ul className="flex flex-col gap-1">
          {threads.map((t) => (
            <li
              key={t.id}
              className={`group flex items-center gap-1 rounded-lg px-1 ${
                t.id === activeId ? "bg-primary/10" : "hover:bg-white/60"
              }`}
            >
              <Link
                to="/assistant/$threadId"
                params={{ threadId: t.id }}
                className="min-w-0 flex-1 truncate px-2 py-2 text-sm"
              >
                {t.title}
              </Link>
              <button
                type="button"
                aria-label={`Delete ${t.title}`}
                onClick={() => {
                  onDelete(t.id);
                  if (t.id === activeId) void navigate({ to: "/assistant" });
                }}
                className="rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-vital"
              >
                ✕
              </button>
            </li>
          ))}
          {threads.length === 0 ? (
            <li className="px-2 py-2 text-xs text-muted-foreground">No conversations yet.</li>
          ) : null}
        </ul>
      </Panel>

      {children}
    </section>
  );
}
