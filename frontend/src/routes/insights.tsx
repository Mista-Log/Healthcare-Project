import { createFileRoute } from "@tanstack/react-router";
import { Metric, Panel, PanelHeader } from "@/components/ui/panel";
import { admissionTrend, departmentLoad, labOrders, patients } from "@/data/hospital";

export const Route = createFileRoute("/insights")({
  component: Insights,
  head: () => ({
    meta: [
      { title: "Insights — Analytics & Reporting | Sanguine" },
      {
        name: "description",
        content: "Admission trends, department load, diagnostic mix and operational reporting for the hospital.",
      },
      { property: "og:title", content: "Insights — Analytics & Reporting" },
      {
        property: "og:description",
        content: "Admission trends, department load, diagnostic mix and operational reporting.",
      },
    ],
  }),
});

function Insights() {
  const peak = Math.max(...admissionTrend.map((d) => d.value));
  const critical = patients.filter((p) => p.status === "critical").length;

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric label="Avg length of stay" value="4.2" unit="d" note="−0.3d QoQ" />
        <Metric label="Readmission rate" value="6.1" unit="%" note="Below 8% target" delay={60} />
        <Metric label="Critical patients" value={String(critical)} note="Both in Ward 4C" noteTone="vital" delay={120} />
        <Metric label="Panels run (wk)" value={String(labOrders.length * 31)} note="+4% vs last week" delay={180} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <PanelHeader label="Trend" title="Admissions this week" />
          <div className="mt-6 flex h-48 items-end gap-3">
            {admissionTrend.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">{d.value}</span>
                <span
                  className="w-full rounded-t-md bg-primary/70"
                  style={{ height: `${(d.value / peak) * 100}%` }}
                />
                <span className="label-mono">{d.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5" delay={80}>
          <PanelHeader label="Capacity" title="Department load" />
          <ul className="mt-5 flex flex-col gap-4">
            {departmentLoad.map((d) => (
              <li key={d.label}>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className={`font-mono ${d.value > 80 ? "text-vital" : ""}`}>{d.value}%</span>
                </div>
                <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-foreground/10">
                  <span
                    className={`block h-full rounded-full ${d.value > 80 ? "bg-vital" : "bg-primary"}`}
                    style={{ width: `${d.value}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      <Panel className="p-5" delay={140}>
        <PanelHeader label="Report" title="Weekly clinical summary" />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              h: "Throughput",
              b: "142 admissions against 156 beds. Friday remains the peak intake day; consider shifting one discharge round earlier.",
            },
            {
              h: "Diagnostics",
              b: "Median turnaround improved to 2.4h after Haematology B returned to service. Two panels breached the 6h ceiling.",
            },
            {
              h: "Revenue",
              b: "Insurance claims make up 59% of billed value. Overdue self-pay balances are the main collection risk.",
            },
          ].map((c) => (
            <div key={c.h} className="rounded-xl border border-border bg-white/50 p-4">
              <div className="font-display text-base">{c.h}</div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
