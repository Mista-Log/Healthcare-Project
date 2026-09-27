import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { bloodGroups, compatibility, patients, type BloodGroup } from "@/data/hospital";

export const Route = createFileRoute("/blood-group")({
  component: BloodGroupPage,
  head: () => ({
    meta: [
      { title: "Blood Group — Registry & Compatibility | Sanguine" },
      {
        name: "description",
        content: "Look up a patient's blood group and check safe donation and transfusion compatibility.",
      },
      { property: "og:title", content: "Blood Group — Registry & Compatibility" },
      {
        property: "og:description",
        content: "Look up a blood group and check safe donation and transfusion compatibility.",
      },
    ],
  }),
});

function BloodGroupPage() {
  const [group, setGroup] = useState<BloodGroup>("O+");
  const [ref, setRef] = useState("");
  const [lookup, setLookup] = useState<{ found: boolean; name?: string; group?: string } | null>(null);
  const compat = compatibility[group];

  const runLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const match = patients.find(
      (p) => p.id === ref.trim() || p.name.toLowerCase().includes(ref.trim().toLowerCase()),
    );
    if (match && ref.trim()) {
      setLookup({ found: true, name: match.name, group: match.bloodGroup });
      setGroup(match.bloodGroup as BloodGroup);
    } else {
      setLookup({ found: false });
    }
  };

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Panel className="p-6">
          <PanelHeader label="Registry" title="Check a blood group" />
          <form onSubmit={runLookup} className="mt-4 flex gap-2">
            <input
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="Patient name or ref (e.g. 0412)"
              className="h-9 flex-1 rounded-md border border-border bg-white/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground"
            >
              Look up
            </button>
          </form>

          {lookup ? (
            lookup.found ? (
              <div className="mt-4 rounded-xl border border-border bg-white/60 p-4">
                <div className="label-mono">Record found</div>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-display text-5xl text-primary">
                    {lookup.group?.slice(0, -1)}
                    <span className="text-vital">{lookup.group?.slice(-1)}</span>
                  </span>
                  <span className="text-sm">{lookup.name}</span>
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-xl border border-border bg-white/60 p-4 text-xs text-muted-foreground">
                No typed record under that reference. A technician can confirm a blood group from a
                small sample in about 20 minutes.
              </p>
            )
          ) : null}

          <div className="label-mono mt-6 mb-2">Or pick a group</div>
          <div className="grid grid-cols-4 gap-2">
            {bloodGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={`rounded-lg py-2 font-mono text-sm transition-colors ${
                  g === group
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-white/60 hover:bg-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel className="p-6" delay={80}>
            <PanelHeader label="Compatibility" title={`Group ${group}`} />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-white/60 p-4">
                <div className="label-mono mb-2">Can donate red cells to</div>
                <div className="flex flex-wrap gap-1.5">
                  {compat.donate.map((g) => (
                    <span key={g} className="rounded-md bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-white/60 p-4">
                <div className="label-mono mb-2">Can receive red cells from</div>
                <div className="flex flex-wrap gap-1.5">
                  {compat.receive.map((g) => (
                    <span key={g} className="rounded-md bg-vital/10 px-2 py-1 font-mono text-xs text-vital">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Compatibility shown is for red cell transfusion. Plasma compatibility runs the opposite
              way, and every transfusion still requires a crossmatch in the lab.
            </p>
          </Panel>

          <Panel className="p-6" delay={140}>
            <PanelHeader label="Registry" title="Typed patients" />
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {patients.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-white/50 px-3 py-2 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
                  {p.name}
                  <span className="ml-auto font-mono text-sm text-primary">{p.bloodGroup}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>
    </>
  );
}
