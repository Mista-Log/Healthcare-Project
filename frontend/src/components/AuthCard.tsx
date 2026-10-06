import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthCard({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-12 text-foreground">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1200 600">
        <path className="ecg-line" d="M0 300 H380 L410 300 425 240 445 360 460 300 H760 L790 300 805 250 825 350 840 300 H1200" fill="none" stroke="var(--primary)" strokeWidth="1.5" />
      </svg>
      <div className="glass rise relative w-full max-w-md rounded-2xl p-8">
        <Link to="/" className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center overflow-hidden rounded-[10px]">
          <img
            src="/public/logo.png"
            alt="Logo"
            className="size-full object-cover"
          />
        </span>
          <span>
            <span className="font-display block text-[17px] leading-none">SyncareX</span>
            <span className="label-mono mt-1 block tracking-[0.2em]">Hospital Cloud</span>
          </span>
        </Link>
        <h1 className="font-display mt-8 text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </div>
  );
}

export function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="label-mono">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

export const submitCls =
  "w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";
