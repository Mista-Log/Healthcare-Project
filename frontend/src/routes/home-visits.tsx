import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { doctors as seedDoctors, type Doctor } from "@/data/hospital";

export const Route = createFileRoute("/home-visits")({
  component: HomeVisits,
  head: () => ({
    meta: [
      { title: "Home Visits — Doctor Onboarding & Booking | Sanguine" },
      {
        name: "description",
        content: "Onboard verified doctors and book in-home consultations with real availability slots.",
      },
      { property: "og:title", content: "Home Visits — Doctor Onboarding & Booking" },
      {
        property: "og:description",
        content: "Onboard verified doctors and book in-home consultations.",
      },
    ],
  }),
});

type Booking = { doctor: string; slot: string; address: string };

function HomeVisits() {
  const [doctors, setDoctors] = useState<Doctor[]>(seedDoctors);
  const [activeId, setActiveId] = useState(seedDoctors[0]!.id);
  const [slot, setSlot] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [form, setForm] = useState({ name: "", specialty: "", area: "", fee: "" });

  const active = doctors.find((d) => d.id === activeId) ?? doctors[0]!;

  const confirm = () => {
    if (!slot) return;
    setBooking({ doctor: active.name, slot, address: address || "address on file" });
  };

  const onboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.specialty.trim()) return;
    const doctor: Doctor = {
      id: `D-${String(doctors.length + 1).padStart(2, "0")}`,
      name: form.name.startsWith("Dr.") ? form.name : `Dr. ${form.name}`,
      specialty: form.specialty,
      rating: 0,
      visits: 0,
      area: form.area || "Area pending",
      fee: Number(form.fee) || 0,
      slots: ["09:00", "13:00", "17:00"],
      verified: false,
    };
    setDoctors((all) => [...all, doctor]);
    setForm({ name: "", specialty: "", area: "", fee: "" });
    setActiveId(doctor.id);
  };

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Panel className="p-5">
          <PanelHeader label="Network" title="Doctors available for home visits" />
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {doctors.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(d.id);
                    setSlot(null);
                    setBooking(null);
                  }}
                  className={`w-full rounded-xl border p-4 text-left transition-colors ${
                    d.id === activeId
                      ? "border-primary/40 bg-primary/8"
                      : "border-border bg-white/50 hover:bg-white/80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base">{d.name}</span>
                    {d.verified ? (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                        verified
                      </span>
                    ) : (
                      <span className="rounded-full bg-vital/10 px-2 py-0.5 font-mono text-[10px] text-vital">
                        pending review
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {d.specialty} · {d.area}
                  </div>
                  <div className="mt-2 flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-primary">${d.fee}/visit</span>
                    <span className="text-muted-foreground">
                      {d.rating ? `${d.rating}★ · ${d.visits} visits` : "new to the network"}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-5" delay={80}>
          <PanelHeader label={`Home visit · ${active.name}`} title="Book a house call" />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {active.slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`rounded-md px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                  slot === s
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-white/60 hover:bg-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Visit address"
            className="mt-3 h-9 w-full rounded-md border border-border bg-white/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={confirm}
            disabled={!slot}
            className="mt-3 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground disabled:opacity-40"
          >
            Confirm visit
          </button>
          {booking ? (
            <p className="mt-3 rounded-lg border border-border bg-white/60 p-3 text-xs leading-relaxed">
              Booked — {booking.doctor} at {booking.slot}, {booking.address}. You'll get a reminder an
              hour before.
            </p>
          ) : null}
        </Panel>
      </section>

      <Panel className="p-5" delay={140}>
        <PanelHeader label="Onboarding" title="Join the home-visit network" />
        <form onSubmit={onboard} className="mt-4 grid gap-3 md:grid-cols-5">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="h-9 rounded-md border border-border bg-white/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring md:col-span-2"
          />
          <input
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            placeholder="Specialty"
            className="h-9 rounded-md border border-border bg-white/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            placeholder="Coverage area"
            className="h-9 rounded-md border border-border bg-white/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2">
            <input
              value={form.fee}
              onChange={(e) => setForm({ ...form, fee: e.target.value })}
              placeholder="Fee"
              inputMode="numeric"
              className="h-9 w-20 rounded-md border border-border bg-white/60 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="h-9 flex-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground"
            >
              Add
            </button>
          </div>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          New doctors join as pending review until credentials are checked by the clinical director.
        </p>
      </Panel>
    </>
  );
}
