import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AssistantLayout } from "@/components/AssistantLayout";
import { Panel } from "@/components/ui/panel";
import { useThreads } from "@/lib/use-threads";

export const Route = createFileRoute("/assistant/")({
  component: AssistantHome,
});

function AssistantHome() {
  const { threads, create, remove } = useThreads();
  const navigate = useNavigate();

  const start = () => {
    const t = create();
    void navigate({ to: "/assistant/$threadId", params: { threadId: t.id } });
  };

  return (
    <AssistantLayout threads={threads} onNew={create} onDelete={remove}>
      <Panel className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="label-mono">Sanguine Assist</div>
        <h1 className="font-display text-3xl">How are you feeling today?</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Ask about symptoms, appointments, lab results, medication or billing. For emergencies, call the hospital line
          immediately.
        </p>
        <button
          type="button"
          onClick={start}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
        >
          Start a conversation
        </button>
      </Panel>
    </AssistantLayout>
  );
}
