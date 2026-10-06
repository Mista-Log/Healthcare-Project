import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthCard, Field, submitCls } from "@/components/AuthCard";
import { signIn, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — SyncareX Hospital Cloud" },
      { name: "description", content: "Sign in to the SyncareX hospital console." },
      { property: "og:title", content: "Sign in — SyncareX Hospital Cloud" },
      { property: "og:description", content: "Sign in to the SyncareX hospital console." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const user = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate({ to: "/core", replace: true });
  }, [user, navigate]);

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to open the Atlas console."
      footer={<>New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link></>}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            signIn(email, password);
          } catch (err) {
            setError((err as Error).message);
          }
        }}
      >
        <Field label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <Field label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        {error && <p className="text-sm text-vital">{error}</p>}
        <button className={submitCls}>Sign in</button>
      </form>
    </AuthCard>
  );
}
