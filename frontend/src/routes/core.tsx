import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BodyMap } from "@/components/BodyMap";
import { Metric, Panel, PanelHeader, StatusChip } from "@/components/ui/panel";
import { labOrders, patients } from "@/data/hospital";

export const Route = createFileRoute("/core")({
  component: Core,
  head: () => ({
    meta: [
      { title: "Core — Patient & Hospital Management | Sanguine" },
      {
        name: "description",
        content:
          "Ward census, patient charts, vitals and an interactive body map for the Sanguine hospital console.",
      },
      { property: "og:title", content: "Core — Patient & Hospital Management" },
      {
        property: "og:description",
        content: "Ward census, patient charts, vitals and an interactive body map.",
      },
    ],
  }),
});

function Core() {
  const [activeId, setActiveId] = useState(patients[0]!.id);
  const [organ, setOrgan] = useState<string>("heart");
  const patient = patients.find((p) => p.id === activeId) ?? patients[0]!;

  return (
    <>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric label="Admissions" value="142" note="+8 today · 91% occ." />
        <Metric label="Lab turnaround" value="2.4" unit="h" note="−0.6h vs target" delay={60} />
        <Metric label="Rx stock alerts" value="3" note="Amoxicillin low" noteTone="vital" delay={120} />
        <Metric label="Revenue (wk)" value="$284" unit="k" note="+12% MoM" delay={180} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Panel className="p-5">
          <div className="label-mono mb-2">Body map · patient {patient.id}</div>
          <BodyMap patient={patient} selected={organ} onSelect={setOrgan} />
          <div className="mt-3 flex flex-col gap-1 text-xs">
            <Row label="Heart" value={`${patient.vitals.heart} bpm`} vital />
            <Row label="SpO₂" value={`${patient.vitals.spo2}%`} />
            <Row label="Temperature" value={`${patient.vitals.temp}°C`} />
            <Row label="Blood pressure" value={patient.vitals.bp} />
            <Row
              label={organ.charAt(0).toUpperCase() + organ.slice(1)}
              value={patient.organs[organ as keyof typeof patient.organs] ?? "normal"}
            />
          </div>
        </Panel>

        <Panel className="overflow-hidden" delay={80}>
          <PanelHeader
            title="Ward census"
            aside={<span className="label-mono">{patients.length} patients</span>}
            className="border-b border-border px-5 py-3"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="label-mono text-left">
                  <th className="px-5 py-2 font-normal">Patient</th>
                  <th className="px-3 py-2 font-normal">Ref</th>
                  <th className="px-3 py-2 font-normal">Ward</th>
                  <th className="px-3 py-2 font-normal">Condition</th>
                  <th className="px-3 py-2 font-normal">Blood</th>
                  <th className="px-3 py-2 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setActiveId(p.id)}
                    className={`cursor-pointer border-t border-border transition-colors hover:bg-white/60 ${
                      p.id === activeId ? "bg-primary/8" : ""
                    }`}
                  >
                    <td className="px-5 py-2.5">
                      {p.name}
                      <span className="text-muted-foreground"> · {p.age}{p.sex}</span>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-xs">{p.id}</td>
                    <td className="px-3 py-2.5 font-mono text-xs">
                      {p.ward}-{p.bed}
                    </td>
                    <td className="px-3 py-2.5">{p.condition}</td>
                    <td className="px-3 py-2.5 font-mono text-xs text-primary">{p.bloodGroup}</td>
                    <td className="px-3 py-2.5">
                      <StatusChip status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Panel className="p-5 lg:col-span-2" delay={60}>
          <PanelHeader label="Recent activity" title="Diagnostics feed" />
          <ul className="mt-3 flex flex-col gap-2">
            {labOrders.slice(0, 5).map((o) => (
              <li
                key={o.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-white/50 px-3 py-2 text-sm"
              >
                <span className="font-mono text-[11px] text-muted-foreground">{o.collected}</span>
                <span>{o.panel}</span>
                <span className="text-muted-foreground">· {o.patient}</span>
                <span className="ml-auto">
                  <StatusChip status={o.status} />
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-5" delay={120}>
          <PanelHeader label="Chart" title={patient.name} />
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            <Row label="Admitted" value={patient.admitted} />
            <Row label="Bed" value={`${patient.ward}-${patient.bed}`} />
            <Row label="Blood group" value={patient.bloodGroup} />
            <Row label="Primary" value={patient.condition} />
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Select any organ on the body map to focus that system's latest reading. Select a row in
            the census to switch patient.
          </p>
        </Panel>
      </section>
    </>
  );
}

function Row({ label, value, vital }: { label: string; value: string; vital?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-mono text-xs ${vital ? "text-vital" : ""}`}>{value}</span>
    </div>
  );
}
