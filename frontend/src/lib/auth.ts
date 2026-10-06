import { useSyncExternalStore } from "react";

// Demo-only auth: accounts live in this browser's localStorage. Not secure.
export type Role = "doctor" | "patient" | "admin";
export type User = { name: string; email: string; role: Role };
type Account = User & { password: string };

const ACCOUNTS = "sanguine.auth.accounts.v1";
const SESSION = "sanguine.auth.session.v1";
const listeners = new Set<() => void>();

const read = <T,>(k: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

let cached: User | null | undefined;
function getUser(): User | null {
  if (cached === undefined) cached = read<User | null>(SESSION, null);
  return cached;
}
function setSession(u: User | null) {
  cached = u;
  if (u) localStorage.setItem(SESSION, JSON.stringify(u));
  else localStorage.removeItem(SESSION);
  listeners.forEach((l) => l());
}

export function signUp(input: Account) {
  const email = input.email.trim().toLowerCase();
  const accounts = read<Account[]>(ACCOUNTS, []);
  if (accounts.some((a) => a.email === email)) throw new Error("An account with this email already exists.");
  if (input.password.length < 6) throw new Error("Password must be at least 6 characters.");
  const acc = { ...input, email, name: input.name.trim() };
  localStorage.setItem(ACCOUNTS, JSON.stringify([...accounts, acc]));
  setSession({ name: acc.name, email, role: acc.role });
}

export function signIn(emailRaw: string, password: string) {
  const email = emailRaw.trim().toLowerCase();
  const acc = read<Account[]>(ACCOUNTS, []).find((a) => a.email === email);
  if (!acc || acc.password !== password) throw new Error("Incorrect email or password.");
  setSession({ name: acc.name, email, role: acc.role });
}

export const signOut = () => setSession(null);

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** undefined = not yet known (server render), null = signed out */
export function useAuth(): User | null | undefined {
  return useSyncExternalStore(subscribe, getUser, () => undefined);
}

export const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
