import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Metric, Panel, PanelHeader, StatusChip } from "@/components/ui/panel";
import { labOrders } from "@/data/hospital";

export const Route = createFileRoute("/labs")({
  component: Labs,
  head: () => ({
    meta: [
      { title: "Labs — Laboratory Management | Sanguine" },
      {
        name: "description",
        content: "Track sample collection, panels, turnaround times and flagged diagnostic results.",
      },
      { property: "og:title", content: "Labs — Laboratory Management" },
      {
        property: "og:description",
        content: "Sample collection, panels, turnaround times and flagged diagnostic results.",
      },
    ],
  }),
});

const filters = ["all", "critical", "flagged", "pending", "normal"] as const;

function Labs() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const rows = labOrders.filter((o) => filter === "all" || o.status === filter);

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric label="Open orders" value="8" note="2 awaiting collection" />
        <Metric label="Median turnaround" value="2.4" unit="h" note="−0.6h vs target" delay={60} />
        <Metric label="Critical flags" value="2" note="Escalated to Ward 4C" noteTone="vital" delay={120} />
        <Metric label="Analysers online" value="6/7" note="Haematology B in service" delay={180} />
      </section>

      <Panel className="overflow-hidden">
        <PanelHeader
          label="Diagnostics"
          title="Lab orders"
          className="border-b border-border px-5 py-3"
          aside={
            <div className="flex gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-md px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-white/50 text-muted-foreground hover:bg-white/80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="label-mono text-left">
                <th className="px-5 py-2 font-normal">Order</th>
                <th className="px-3 py-2 font-normal">Panel</th>
                <th className="px-3 py-2 font-normal">Patient</th>
                <th className="px-3 py-2 font-normal">Collected</th>
                <th className="px-3 py-2 font-normal">Turnaround</th>
                <th className="px-3 py-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-white/60">
                  <td className="px-5 py-2.5 font-mono text-xs">{o.id}</td>
                  <td className="px-3 py-2.5">{o.panel}</td>
                  <td className="px-3 py-2.5">
                    {o.patient} <span className="font-mono text-xs text-muted-foreground">{o.patientId}</span>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-xs">{o.collected}</td>
                  <td className="px-3 py-2.5 font-mono text-xs">{o.turnaround}</td>
                  <td className="px-3 py-2.5">
                    <StatusChip status={o.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-muted-foreground">
                    No orders with that status right now.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
