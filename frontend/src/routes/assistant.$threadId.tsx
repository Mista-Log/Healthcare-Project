import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AssistantLayout } from "@/components/AssistantLayout";
import { Panel } from "@/components/ui/panel";
import { assistantReply, titleFrom, uid, type ChatMessage } from "@/lib/chat-store";
import { useThreads } from "@/lib/use-threads";

export const Route = createFileRoute("/assistant/$threadId")({
  component: ThreadPage,
});

const suggestions = ["I have a headache and fever", "Book a home visit", "Where are my lab results?", "What's my blood group?"];

function ThreadPage() {
  const { threadId } = Route.useParams();
  const { threads, ready, update, create, remove } = useThreads();
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const thread = threads.find((t) => t.id === threadId);

  // Ensure the route's thread exists (e.g. opened directly after reload of a brand-new id).
  useEffect(() => {
    if (ready && !thread) {
      update((prev) =>
        prev.some((t) => t.id === threadId)
          ? prev
          : [{ id: threadId, title: "New conversation", updatedAt: Date.now(), messages: [] }, ...prev],
      );
    }
  }, [ready, thread, threadId, update]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [threadId, typing]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages.length, typing]);

  const append = (msg: ChatMessage) =>
    update((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              title: t.messages.length === 0 && msg.role === "user" ? titleFrom(msg.text) : t.title,
              updatedAt: Date.now(),
              messages: [...t.messages, msg],
            }
          : t,
      ),
    );

  const send = (value: string) => {
    const v = value.trim();
    if (!v || typing) return;
    append({ id: uid(), role: "user", text: v, at: Date.now() });
    setText("");
    setTyping(true);
    window.setTimeout(() => {
      append({ id: uid(), role: "assistant", text: assistantReply(v), at: Date.now() });
      setTyping(false);
    }, 700);
  };

  const messages = thread?.messages ?? [];

  return (
    <AssistantLayout threads={threads} activeId={threadId} onNew={create} onDelete={remove}>
      <Panel className="flex h-[72vh] flex-col p-0">
        <div className="flex items-center gap-3 border-b border-border px-5 py-3">
          <div className="grid size-8 place-items-center rounded-full bg-vital/15 font-mono text-xs text-vital">♥</div>
          <div>
            <div className="text-sm font-medium">Sanguine Assist</div>
            <div className="label-mono">Guidance only · not a diagnosis</div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs hover:bg-primary/10"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-sm text-primary-foreground">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="max-w-[85%] text-sm leading-relaxed">
                {m.text}
              </div>
            ),
          )}
          {typing ? <div className="font-mono text-xs text-muted-foreground">Assist is typing…</div> : null}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
          className="flex items-end gap-2 border-t border-border p-3"
        >
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(text);
              }
            }}
            rows={1}
            placeholder="Describe what you're experiencing…"
            className="min-h-10 flex-1 resize-none rounded-lg border border-border bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={!text.trim() || typing}
            className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </Panel>
    </AssistantLayout>
  );
}
