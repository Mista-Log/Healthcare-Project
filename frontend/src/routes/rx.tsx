import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Metric, Panel, PanelHeader, StatusChip } from "@/components/ui/panel";
import { drugs as seedDrugs, prescriptions } from "@/data/hospital";

export const Route = createFileRoute("/rx")({
  component: Rx,
  head: () => ({
    meta: [
      { title: "Rx — Pharmacy & Inventory | Sanguine" },
      {
        name: "description",
        content: "Medication stock levels, reorder thresholds, expiry tracking and prescription dispensing.",
      },
      { property: "og:title", content: "Rx — Pharmacy & Inventory" },
      {
        property: "og:description",
        content: "Stock levels, reorder thresholds, expiry tracking and prescription dispensing.",
      },
    ],
  }),
});

function Rx() {
  const [drugs, setDrugs] = useState(seedDrugs);
  const low = drugs.filter((d) => d.stock < d.reorderAt);

  const restock = (id: string) =>
    setDrugs((all) =>
      all.map((d) => (d.id === id ? { ...d, stock: d.stock + d.reorderAt * 2 } : d)),
    );

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric label="SKUs tracked" value={String(drugs.length)} note="Formulary v12" />
        <Metric
          label="Below reorder"
          value={String(low.length)}
          note={low[0] ? `${low[0].name.split(" ")[0]} lowest` : "All stocked"}
          noteTone="vital"
          delay={60}
        />
        <Metric label="Scripts today" value={String(prescriptions.length)} note="1 on hold" delay={120} />
        <Metric label="Expiring < 90d" value="2" note="Ceftriaxone, Insulin" noteTone="vital" delay={180} />
      </section>

      <Panel className="overflow-hidden">
        <PanelHeader label="Inventory" title="Stock ledger" className="border-b border-border px-5 py-3" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="label-mono text-left">
                <th className="px-5 py-2 font-normal">Item</th>
                <th className="px-3 py-2 font-normal">Form</th>
                <th className="px-3 py-2 font-normal">Level</th>
                <th className="px-3 py-2 font-normal">Expiry</th>
                <th className="px-3 py-2 font-normal">Supplier</th>
                <th className="px-3 py-2 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((d) => {
                const pct = Math.min(100, Math.round((d.stock / (d.reorderAt * 3)) * 100));
                const isLow = d.stock < d.reorderAt;
                return (
                  <tr key={d.id} className="border-t border-border hover:bg-white/60">
                    <td className="px-5 py-2.5">{d.name}</td>
                    <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">{d.form}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs ${isLow ? "text-vital" : ""}`}>
                          {d.stock} {d.unit}
                        </span>
                        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-foreground/10">
                          <span
                            className={`block h-full rounded-full ${isLow ? "bg-vital" : "bg-primary"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-xs">{d.expiry}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{d.supplier}</td>
                    <td className="px-3 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => restock(d.id)}
                        className="rounded-md border border-border bg-white/60 px-2.5 py-1 font-mono text-[10px] uppercase hover:bg-white"
                      >
                        Reorder
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel className="p-5" delay={80}>
        <PanelHeader label="Dispensing" title="Prescription queue" />
        <ul className="mt-3 flex flex-col gap-2">
          {prescriptions.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-white/50 px-3 py-2 text-sm"
            >
              <span className="font-mono text-[11px] text-muted-foreground">{p.id}</span>
              <span>{p.drug}</span>
              <span className="font-mono text-xs text-primary">{p.dose}</span>
              <span className="text-muted-foreground">· {p.patient} · {p.prescriber}</span>
              <span className="ml-auto">
                <StatusChip status={p.status} />
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
