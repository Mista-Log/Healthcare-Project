import { useCallback, useEffect, useState } from "react";
import { loadThreads, newThread, saveThreads, type ChatThread } from "@/lib/chat-store";

export function useThreads() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setThreads(loadThreads());
    setReady(true);
  }, []);

  const update = useCallback((fn: (prev: ChatThread[]) => ChatThread[]) => {
    setThreads((prev) => {
      const next = fn(prev);
      saveThreads(next);
      return next;
    });
  }, []);

  const create = useCallback(() => {
    const t = newThread();
    update((prev) => [t, ...prev]);
    return t;
  }, [update]);

  const remove = useCallback((id: string) => update((prev) => prev.filter((t) => t.id !== id)), [update]);

  return { threads, ready, update, create, remove };
}
