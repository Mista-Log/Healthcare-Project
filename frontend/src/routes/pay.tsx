import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Metric, Panel, PanelHeader, StatusChip } from "@/components/ui/panel";
import { invoices as seedInvoices, revenueMix } from "@/data/hospital";

export const Route = createFileRoute("/pay")({
  component: Pay,
  head: () => ({
    meta: [
      { title: "Pay — Billing & Payments | Sanguine" },
      {
        name: "description",
        content: "Patient invoices, insurance claims, outstanding balances and payment reconciliation.",
      },
      { property: "og:title", content: "Pay — Billing & Payments" },
      {
        property: "og:description",
        content: "Invoices, insurance claims, outstanding balances and reconciliation.",
      },
    ],
  }),
});

const money = (n: number) => `$${n.toLocaleString()}`;

function Pay() {
  const [invoices, setInvoices] = useState(seedInvoices);
  const outstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "overdue").length;

  const markPaid = (id: string) =>
    setInvoices((all) => all.map((i) => (i.id === id ? { ...i, status: "paid" as const } : i)));

  const total = revenueMix.reduce((s, r) => s + r.value, 0);

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric label="Billed (wk)" value="$284" unit="k" note="+12% MoM" />
        <Metric label="Outstanding" value={money(outstanding)} note={`${invoices.length - invoices.filter((i) => i.status === "paid").length} open invoices`} delay={60} />
        <Metric label="Overdue" value={String(overdue)} note="Chase within 48h" noteTone="vital" delay={120} />
        <Metric label="Claim approval" value="93" unit="%" note="Insurer average" delay={180} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Panel className="overflow-hidden">
          <PanelHeader label="Ledger" title="Invoices" className="border-b border-border px-5 py-3" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="label-mono text-left">
                  <th className="px-5 py-2 font-normal">Invoice</th>
                  <th className="px-3 py-2 font-normal">Patient</th>
                  <th className="px-3 py-2 font-normal">Service</th>
                  <th className="px-3 py-2 font-normal">Insurer</th>
                  <th className="px-3 py-2 font-normal">Amount</th>
                  <th className="px-3 py-2 font-normal">Status</th>
                  <th className="px-3 py-2 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id} className="border-t border-border hover:bg-white/60">
                    <td className="px-5 py-2.5 font-mono text-xs">{i.id}</td>
                    <td className="px-3 py-2.5">{i.patient}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{i.service}</td>
                    <td className="px-3 py-2.5">{i.insurer}</td>
                    <td className="px-3 py-2.5 font-mono text-xs">{money(i.amount)}</td>
                    <td className="px-3 py-2.5">
                      <StatusChip status={i.status} />
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {i.status !== "paid" ? (
                        <button
                          type="button"
                          onClick={() => markPaid(i.id)}
                          className="rounded-md bg-primary px-2.5 py-1 font-mono text-[10px] uppercase text-primary-foreground hover:opacity-90"
                        >
                          Settle
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="p-5" delay={80}>
          <PanelHeader label="Mix" title="Revenue source" />
          <ul className="mt-4 flex flex-col gap-3">
            {revenueMix.map((r) => (
              <li key={r.label}>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-mono">${r.value}k</span>
                </div>
                <span className="mt-1 block h-2 overflow-hidden rounded-full bg-foreground/10">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${Math.round((r.value / total) * 100)}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Settling an invoice here updates the ledger for this session only — this build has no
            payment processor connected.
          </p>
        </Panel>
      </section>
    </>
  );
}
