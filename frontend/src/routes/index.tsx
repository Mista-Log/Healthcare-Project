import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Sanguine — Cloud Hospital Management" },
      {
        name: "description",
        content:
          "One cloud console for the whole hospital: patients, labs, pharmacy, billing, analytics, blood group registry, doctor home visits and AI patient support.",
      },
      { property: "og:title", content: "Sanguine — Cloud Hospital Management" },
      {
        property: "og:description",
        content:
          "Patients, diagnostics, pharmacy, billing, analytics, home visits and AI patient support in one clinical console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const features = [
  {
    to: "/core",
    code: "01",
    name: "Core",
    tag: "Patient & Hospital Management",
    desc: "Ward census, admissions, vitals and an interactive anatomical body map for every patient chart.",
  },
  {
    to: "/labs",
    code: "02",
    name: "Labs",
    tag: "Laboratory Management",
    desc: "Order panels, track samples from collection to result, and flag critical values the moment they land.",
  },
  {
    to: "/rx",
    code: "03",
    name: "Rx",
    tag: "Pharmacy & Inventory",
    desc: "Live stock levels, low-supply alerts and dispensing records across every formulary shelf.",
  },
  {
    to: "/pay",
    code: "04",
    name: "Pay",
    tag: "Billing & Payments",
    desc: "Invoices, insurance claims and payment tracking — from admission deposit to final settlement.",
  },
  {
    to: "/insights",
    code: "05",
    name: "Insights",
    tag: "Analytics & Reporting",
    desc: "Occupancy, turnaround and revenue trends rendered as clinical-grade reports for leadership.",
  },
  {
    to: "/assistant",
    code: "06",
    name: "AI Assist",
    tag: "Patient Companion",
    desc: "A conversational assistant that guides patients through symptoms, bookings and care questions.",
  },
  {
    to: "/home-visits",
    code: "07",
    name: "Home Visits",
    tag: "Doctor Onboarding & Booking",
    desc: "Onboard visiting doctors and let patients book home consultations in a few taps.",
  },
  {
    to: "/blood-group",
    code: "08",
    name: "Blood Group",
    tag: "Registry & Lookup",
    desc: "Patients can check their blood group and find compatible donors across the registry.",
  },
] as const;

const stats = [
  { value: "142", label: "Admissions today" },
  { value: "2.4h", label: "Avg. lab turnaround" },
  { value: "98.2%", label: "Billing accuracy" },
  { value: "24/7", label: "AI patient support" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
          <span className="grid size-9 place-items-center rounded-[10px] bg-primary font-mono text-sm text-primary-foreground">
            Sx
          </span>
          <span>
            <span className="font-display block text-[17px] leading-none">Sanguine</span>
            <span className="label-mono mt-1 block tracking-[0.2em]">Hospital Cloud</span>
          </span>
          <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
            <a href="#features" className="text-foreground/80 transition-colors hover:text-primary">
              Modules
            </a>
            <a href="#anatomy" className="text-foreground/80 transition-colors hover:text-primary">
              Anatomy
            </a>
            <a href="#visits" className="text-foreground/80 transition-colors hover:text-primary">
              Home visits
            </a>
          </nav>
          <Link
            to="/core"
            className="ml-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:ml-6"
          >
            Open console
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 600">
            <path
              className="ecg-line"
              d="M0 300 H380 L410 300 425 240 445 360 460 300 H760 L790 300 805 250 825 350 840 300 H1200"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="label-mono rise tracking-[0.25em]">
              Cloud-based hospital management system
            </div>
            <h1
              className="font-display rise mt-5 text-5xl leading-[1.05] md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              The whole hospital,
              <br />
              <span className="text-primary italic">one living atlas.</span>
            </h1>
            <p
              className="rise mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Sanguine maps every ward, lab bench, pharmacy shelf and invoice onto a single clinical
              console — with an AI companion for patients and doctors who come to their door.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link
                to="/core"
                className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Enter the console →
              </Link>
              <Link
                to="/assistant"
                className="inline-flex items-center rounded-md border border-border bg-white/50 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/80"
              >
                Ask AI Assist
              </Link>
            </div>

            <dl
              className="rise mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
              style={{ animationDelay: "320ms" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="label-mono">{s.label}</dt>
                  <dd className="font-display mt-1 text-2xl text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Anatomical figure */}
          <div className="rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "200ms" }}>
            <div className="glass rounded-2xl p-6">
              <div className="label-mono mb-3 flex items-center justify-between">
                <span>Fig. 01 — human system</span>
                <span className="text-vital">● live</span>
              </div>
              <AnatomicalFigure />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <VitalPill label="Heart" value="72 bpm" vital />
                <VitalPill label="SpO₂" value="98%" />
                <VitalPill label="Temp" value="36.8°C" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-white/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="label-mono tracking-[0.25em]">Modules</div>
          <h2 className="font-display mt-3 max-w-2xl text-4xl leading-tight">
            Eight organs of one clinical body
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Each module works on its own and beats in rhythm with the rest — admissions feed labs,
            labs feed billing, and every signal surfaces in Insights.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Link
                key={f.code}
                to={f.to}
                className="glass group rise flex flex-col rounded-xl p-5 transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground">{f.code}</span>
                  <span className="size-1.5 rounded-full bg-primary/50 transition-colors group-hover:bg-vital" />
                </div>
                <div className="font-display mt-4 text-xl">{f.name}</div>
                <div className="label-mono mt-1">{f.tag}</div>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                <span className="mt-4 font-mono text-[11px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  open module →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Anatomy strip */}
      <section id="anatomy" className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="label-mono tracking-[0.25em]">Anatomical by design</div>
            <h2 className="font-display mt-3 text-4xl leading-tight">
              Charts that read like a body, not a spreadsheet
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Every patient chart carries an interactive body map. Tap the heart for rhythm, the
              lungs for saturation, the liver for enzymes — the interface speaks anatomy, so
              clinicians read faster and patients finally understand their own charts.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-sm">
              {[
                "Organ-level vitals on every chart",
                "Blood group registry with donor matching",
                "Symptom-aware AI triage for patients",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-vital" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="label-mono mb-3">Fig. 02 — circulatory trace</div>
            <svg viewBox="0 0 400 220" className="w-full">
              <path
                className="ecg-line"
                d="M0 110 H120 L135 110 145 70 160 150 170 110 H260 L275 110 285 80 300 140 310 110 H400"
                fill="none"
                stroke="var(--vital)"
                strokeWidth="2"
              />
              <circle className="beat" cx="145" cy="70" r="4" fill="var(--vital)" />
              <circle className="beat" cx="285" cy="80" r="4" fill="var(--vital)" />
              {[60, 110, 160].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="400"
                  y1={y}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="2 6"
                />
              ))}
            </svg>
            <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>LEAD II · 25 mm/s</span>
              <span className="text-primary">NSR — normal sinus rhythm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Home visits CTA */}
      <section id="visits" className="border-t border-border bg-white/30">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="label-mono tracking-[0.25em]">Beyond the ward</div>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl leading-tight">
            Care that leaves the building
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Onboard doctors for home consulting, let patients book visits from their phone, and keep
            every encounter inside the same clinical record.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/home-visits"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a home visit
            </Link>
            <Link
              to="/blood-group"
              className="inline-flex items-center rounded-md border border-border bg-white/50 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/80"
            >
              Check a blood group
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-8">
          <span className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-lg bg-primary font-mono text-[11px] text-primary-foreground">
              Sx
            </span>
            <span className="font-display text-sm">Sanguine</span>
          </span>
          <span className="label-mono">Hospital Cloud · Atlas Console</span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            © 2026 Sanguine Health Systems
          </span>
        </div>
      </footer>
    </div>
  );
}

function VitalPill({ label, value, vital }: { label: string; value: string; vital?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-white/50 px-2 py-2">
      <div className="label-mono">{label}</div>
      <div className={`mt-0.5 font-mono text-xs ${vital ? "text-vital" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}

function AnatomicalFigure() {
  return (
    <svg viewBox="0 0 200 320" className="mx-auto w-full max-w-[220px]">
      {/* body outline */}
      <g fill="none" stroke="var(--primary)" strokeWidth="1.4" opacity="0.85">
        <circle cx="100" cy="34" r="20" />
        <path d="M100 54 C70 58 62 78 62 104 L62 150 C62 166 70 172 78 174 L84 232 C86 252 82 272 80 296" />
        <path d="M100 54 C130 58 138 78 138 104 L138 150 C138 166 130 172 122 174 L116 232 C114 252 118 272 120 296" />
        <path d="M78 174 C88 180 112 180 122 174" />
        <path d="M62 108 C48 118 42 140 40 162" />
        <path d="M138 108 C152 118 158 140 160 162" />
      </g>
      {/* brain */}
      <path
        d="M88 30 C88 22 96 18 100 22 C104 18 112 22 112 30 C112 38 106 42 100 42 C94 42 88 38 88 30 Z"
        fill="var(--primary)"
        opacity="0.25"
        stroke="var(--primary)"
        strokeWidth="1"
      />
      {/* heart — beating */}
      <path
        className="beat"
        d="M100 108 C94 98 80 100 80 112 C80 122 92 128 100 136 C108 128 120 122 120 112 C120 100 106 98 100 108 Z"
        fill="var(--vital)"
        opacity="0.9"
      />
      {/* lungs */}
      <g fill="var(--primary)" opacity="0.3" stroke="var(--primary)" strokeWidth="1">
        <path d="M72 92 C64 96 62 112 64 128 C66 140 74 142 78 136 C82 128 82 104 78 94 C76 90 74 90 72 92 Z" />
        <path d="M128 92 C136 96 138 112 136 128 C134 140 126 142 122 136 C118 128 118 104 122 94 C124 90 126 90 128 92 Z" />
      </g>
      {/* liver + stomach */}
      <path
        d="M76 148 C88 142 112 142 124 148 C126 156 118 162 100 162 C84 162 74 156 76 148 Z"
        fill="var(--chart-4)"
        opacity="0.45"
        stroke="var(--chart-4)"
        strokeWidth="1"
      />
      {/* intestines */}
      <g fill="none" stroke="var(--primary)" strokeWidth="1.2" opacity="0.55">
        <path d="M82 176 C90 170 110 170 118 176 C124 182 118 190 108 188 C98 186 96 194 104 198 C112 202 120 198 118 192" />
        <path d="M84 182 C92 178 108 178 116 182" />
      </g>
      {/* spine marker */}
      <line
        x1="100"
        y1="56"
        x2="100"
        y2="170"
        stroke="var(--primary)"
        strokeWidth="1"
        strokeDasharray="2 5"
        opacity="0.5"
      />
      {/* reference ticks */}
      <g stroke="var(--border)" strokeWidth="1">
        <line x1="20" y1="34" x2="34" y2="34" />
        <line x1="20" y1="110" x2="34" y2="110" />
        <line x1="20" y1="180" x2="34" y2="180" />
      </g>
      <g className="label-mono" fill="var(--muted-foreground)" fontSize="7" fontFamily="var(--font-mono)">
        <text x="8" y="37">CR</text>
        <text x="8" y="113">TH</text>
        <text x="8" y="183">AB</text>
      </g>
    </svg>
  );
}
