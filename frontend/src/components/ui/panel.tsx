import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("rise glass rounded-2xl", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  label,
  title,
  aside,
  className,
}: {
  label?: string;
  title?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div>
        {label ? <div className="label-mono">{label}</div> : null}
        {title ? <div className="font-display text-lg leading-tight">{title}</div> : null}
      </div>
      {aside ? <div className="ml-auto">{aside}</div> : null}
    </div>
  );
}

const tone: Record<string, string> = {
  normal: "bg-primary/10 text-primary",
  reviewed: "bg-primary/10 text-primary",
  paid: "bg-primary/10 text-primary",
  dispensed: "bg-primary/10 text-primary",
  pending: "bg-foreground/8 text-muted-foreground",
  awaiting: "bg-foreground/8 text-muted-foreground",
  "claim filed": "bg-foreground/8 text-muted-foreground",
  "on hold": "bg-foreground/8 text-muted-foreground",
  flagged: "bg-vital/10 text-vital",
  critical: "bg-vital/15 text-vital",
  overdue: "bg-vital/10 text-vital",
};

export function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide",
        tone[status] ?? "bg-foreground/8 text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

export function Metric({
  label,
  value,
  unit,
  note,
  noteTone = "primary",
  delay = 0,
}: {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  noteTone?: "primary" | "vital";
  delay?: number;
}) {
  return (
    <Panel className="p-4" delay={delay}>
      <div className="label-mono">{label}</div>
      <div className="font-display mt-1 text-3xl leading-none">
        {value}
        {unit ? <span className="text-lg">{unit}</span> : null}
      </div>
      {note ? (
        <div
          className={cn(
            "mt-1.5 font-mono text-[11px]",
            noteTone === "vital" ? "text-vital" : "text-primary",
          )}
        >
          {note}
        </div>
      ) : null}
    </Panel>
  );
}
