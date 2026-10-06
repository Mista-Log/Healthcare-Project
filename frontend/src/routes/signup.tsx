import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthCard, Field, submitCls } from "@/components/AuthCard";
import { signUp, useAuth, type Role } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — SyncareX Hospital Cloud" },
      { name: "description", content: "Create a SyncareX account as a doctor, patient or admin." },
      { property: "og:title", content: "Create account — SyncareX Hospital Cloud" },
      { property: "og:description", content: "Create a SyncareX account as a doctor, patient or admin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignUp,
});

const roles: Role[] = ["doctor", "patient", "admin"];

function SignUp() {
  const user = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "doctor" as Role });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate({ to: "/core", replace: true });
  }, [user, navigate]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join the clinical console in under a minute."
      footer={<>Already registered? <Link to="/signin" className="text-primary hover:underline">Sign in</Link></>}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            signUp(form);
          } catch (err) {
            setError((err as Error).message);
          }
        }}
      >
        <Field label="Full name" required value={form.name} onChange={set("name")} autoComplete="name" />
        <Field label="Email" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
        <Field label="Password" type="password" required minLength={6} value={form.password} onChange={set("password")} autoComplete="new-password" />
        <div>
          <span className="label-mono">Role</span>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setForm((f) => ({ ...f, role: r }))}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm capitalize transition-colors",
                  form.role === r ? "border-primary bg-primary/10 text-primary" : "border-border bg-background/60 hover:border-primary/50",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        {error && <p className="text-sm text-vital">{error}</p>}
        <button className={submitCls}>Create account</button>
      </form>
    </AuthCard>
  );
}
