import type { Patient, Status } from "@/data/hospital";
import { cn } from "@/lib/utils";

const organTone: Record<Status, string> = {
  normal: "bg-primary/70",
  reviewed: "bg-primary/70",
  pending: "bg-primary/40",
  flagged: "bg-vital/60",
  critical: "bg-vital",
};

export function BodyMap({
  patient,
  selected,
  onSelect,
}: {
  patient: Patient;
  selected?: string;
  onSelect?: (organ: string) => void;
}) {
  const organs = [
    { key: "neuro", label: "Neuro", style: "top-1 left-1/2 -translate-x-1/2 size-4" },
    { key: "lungs", label: "Lungs", style: "top-[4.5rem] left-6 size-3.5" },
    { key: "heart", label: "Heart", style: "top-[4rem] left-1/2 -translate-x-1/2 size-5" },
    { key: "liver", label: "Liver", style: "top-[7rem] right-6 size-3.5" },
    { key: "renal", label: "Renal", style: "top-[8.5rem] left-7 size-3" },
  ] as const;

  return (
    <div className="relative grid h-[320px] place-items-center rounded-xl border border-border bg-white/50">
      <div className="relative h-64 w-32">
        <div className="absolute top-0 left-1/2 size-8 -translate-x-1/2 rounded-full bg-primary/25 ring-2 ring-primary/15" />
        <div className="absolute top-8 left-1/2 h-6 w-2 -translate-x-1/2 rounded-full bg-primary/25" />
        <div className="absolute top-12 left-1/2 h-24 w-16 -translate-x-1/2 rounded-[40%] bg-primary/15" />
        <div className="absolute top-14 left-2 h-20 w-3 rotate-6 rounded-full bg-primary/15" />
        <div className="absolute top-14 right-2 h-20 w-3 -rotate-6 rounded-full bg-primary/15" />
        <div className="absolute bottom-0 left-1/2 h-20 w-12 -translate-x-1/2 rounded-b-[40%] bg-primary/12" />
        <div className="absolute bottom-0 left-1/2 h-20 w-0.5 -translate-x-1/2 bg-background/70" />

        {organs.map((o) => {
          const status = patient.organs[o.key];
          return (
            <button
              key={o.key}
              type="button"
              aria-label={`${o.label} — ${status}`}
              onClick={() => onSelect?.(o.key)}
              className={cn(
                "absolute rounded-full transition-transform hover:scale-125",
                o.style,
                organTone[status],
                o.key === "heart" && status === "critical" && "beat",
                selected === o.key && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              )}
            />
          );
        })}
      </div>

      <div className="absolute right-3 bottom-2 left-3 h-6">
        <svg className="h-6 w-full" viewBox="0 0 200 24" fill="none">
          <polyline
            className="ecg-line"
            points="0,12 20,12 26,12 30,4 34,20 38,8 42,12 60,12 66,12 70,3 74,21 78,7 82,12 120,12 130,12 134,5 138,19 142,9 146,12 200,12"
            stroke="var(--vital)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
