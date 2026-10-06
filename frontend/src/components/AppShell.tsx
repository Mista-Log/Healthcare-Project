import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { initials, signOut, useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/core", label: "Core", hint: "Patients" },
  { to: "/labs", label: "Labs", hint: "Diagnostics", badge: "6", alert: true },
  { to: "/rx", label: "Rx", hint: "Pharmacy", badge: "3" },
  { to: "/pay", label: "Pay", hint: "Billing" },
  { to: "/insights", label: "Insights", hint: "Analytics" },
  { to: "/blood-group", label: "Blood Group", hint: "Registry" },
  { to: "/home-visits", label: "Home Visits", hint: "Doctors" },
  { to: "/assistant", label: "AI Assist", hint: "Patient chat", alert: true },
] as { to: "/core" | "/labs" | "/rx" | "/pay" | "/insights" | "/blood-group" | "/home-visits" | "/assistant"; label: string; hint: string; badge?: string; alert?: boolean }[];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate({ to: "/signin", replace: true });
  }, [user, navigate]);

  if (!user) {
    return <div className="grid min-h-screen place-items-center bg-background label-mono">Checking session…</div>;
  }
  const title = user.role === "doctor" ? `Dr. ${user.name}` : user.name;


  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 border-r border-border bg-white/45 p-5 backdrop-blur-xl md:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-[10px] bg-primary font-mono text-sm text-primary-foreground">
            Sx
          </span>
          <span>
            <span className="font-display block text-[17px] leading-none">Sanguine</span>
            <span className="label-mono mt-1 block tracking-[0.2em]">Atlas Console</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-0.5 text-sm">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground/80 hover:bg-white/60",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    active ? "bg-primary" : item.alert ? "bg-vital blink" : "bg-primary/40",
                  )}
                />
                {item.label}
                {item.badge ? (
                  <span
                    className={cn(
                      "ml-auto font-mono text-[10px]",
                      item.alert ? "text-vital" : "text-muted-foreground",
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto font-mono text-[10px] leading-relaxed text-muted-foreground">
          {title}
          <br />
          <span className="capitalize">{user.role}</span> · {user.email}
          <br />
          <span className="text-primary">● signed in</span>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-white/40 px-6 py-4 backdrop-blur-xl md:px-8">
          <div>
            <div className="font-display text-[15px]">Welcome, {title}</div>
            <div className="label-mono tracking-[0.18em]">Ward 4C · 38 beds · 91% occupancy</div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden h-8 w-52 items-center rounded-md border border-border bg-white/50 px-3 font-mono text-[10px] text-muted-foreground lg:flex">
              ⌕ search patients, labs, rx
            </div>
            <span className="grid size-8 place-items-center rounded-full bg-primary/15 font-mono text-xs text-primary">
              {initials(user.name)}
            </span>
            <button
              onClick={() => {
                signOut();
                navigate({ to: "/signin", replace: true });
              }}
              className="rounded-md border border-border bg-white/50 px-3 py-1.5 text-xs transition-colors hover:bg-white/80"
            >
              Sign out
            </button>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-white/30 px-4 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-1.5 font-mono text-[11px] whitespace-nowrap text-foreground/80"
              activeProps={{ className: "bg-primary/10 text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-6 p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
