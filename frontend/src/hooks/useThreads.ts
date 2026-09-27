import { useCallback, useEffect, useState } from "react";
import {
  loadThreads,
  saveThreads,
  newThread,
  titleFrom,
  uid,
  assistantReply,
  type ChatThread,
} from "@/lib/chat-store";

export function useThreads() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setThreads(loadThreads());
    setHydrated(true);
  }, []);

  const update = useCallback((next: ChatThread[]) => {
    setThreads(next);
    saveThreads(next);
  }, []);

  const create = useCallback(() => {
    const thread = newThread();
    update([thread, ...loadThreads()]);
    return thread;
  }, [update]);

  const remove = useCallback(
    (id: string) => {
      update(loadThreads().filter((t) => t.id !== id));
    },
    [update],
  );

  const send = useCallback(
    (id: string, text: string) => {
      const now = Date.now();
      const current = loadThreads();
      const withUser = current.map((t) =>
        t.id === id
          ? {
              ...t,
              title: t.messages.length === 0 ? titleFrom(text) : t.title,
              updatedAt: now,
              messages: [...t.messages, { id: uid(), role: "user" as const, text, at: now }],
            }
          : t,
      );
      update(withUser);

      window.setTimeout(() => {
        const latest = loadThreads().map((t) =>
          t.id === id
            ? {
                ...t,
                updatedAt: Date.now(),
                messages: [
                  ...t.messages,
                  { id: uid(), role: "assistant" as const, text: assistantReply(text), at: Date.now() },
                ],
              }
            : t,
        );
        update(latest);
      }, 700);
    },
    [update],
  );

  return { threads, hydrated, create, remove, send };
}
