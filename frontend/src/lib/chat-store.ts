export type ChatMessage = { id: string; role: "user" | "assistant"; text: string; at: number };
export type ChatThread = { id: string; title: string; updatedAt: number; messages: ChatMessage[] };

const KEY = "sanguine.assistant.threads.v1";

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function loadThreads(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as ChatThread[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads: ChatThread[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(threads));
}

export function newThread(): ChatThread {
  return { id: uid(), title: "New conversation", updatedAt: Date.now(), messages: [] };
}

export function titleFrom(text: string) {
  const t = text.trim().replace(/\s+/g, " ");
  return t.length > 42 ? `${t.slice(0, 42)}…` : t || "New conversation";
}

/** Local, rules-based triage assistant (no backend in this frontend-only build). */
export function assistantReply(input: string): string {
  const q = input.toLowerCase();

  const urgent = ["chest pain", "chest tightness", "can't breathe", "cannot breathe", "bleeding", "unconscious", "stroke", "seizure"];
  if (urgent.some((k) => q.includes(k))) {
    return "That combination can be serious. Please stop what you're doing, sit down, and contact emergency services or the hospital line now. I'm flagging this conversation for the on-call triage nurse so a clinician can reach you.";
  }
  if (q.includes("blood group") || q.includes("blood type")) {
    return "You can check your blood group and see who you can safely donate to or receive from under Blood Group in the sidebar. If your record hasn't been typed yet, a lab technician can confirm it from a small sample in about 20 minutes.";
  }
  if (q.includes("appointment") || q.includes("home visit") || q.includes("book")) {
    return "I can help with that. Open Home Visits to see verified doctors, their consultation fee and the slots they still have open today. Pick a slot and confirm — you'll get a reminder an hour before the visit.";
  }
  if (q.includes("bill") || q.includes("invoice") || q.includes("insurance") || q.includes("pay")) {
    return "Your invoices, insurance claims and outstanding balances live under Pay. If a claim is still marked 'claim filed', the insurer hasn't settled it yet — that's normal for up to 14 days.";
  }
  if (q.includes("result") || q.includes("lab") || q.includes("test")) {
    return "Lab results appear under Labs as soon as they're validated. Anything marked 'flagged' or 'critical' is reviewed by a clinician before you're contacted, so please don't interpret a raw number on your own.";
  }
  if (q.includes("headache") || q.includes("fever") || q.includes("nausea") || q.includes("pain")) {
    return "Thanks for telling me. To narrow this down: how long has it lasted, is it constant or coming in waves, and is there fever above 38°C? Meanwhile, rest and fluids help. If it's worsening or lasts past 48 hours, book a consultation.";
  }
  if (q.includes("medication") || q.includes("drug") || q.includes("prescription") || q.includes("dose")) {
    return "Your active prescriptions and their dosing are under Rx. Never double a dose you've missed — take the next one at its normal time and tell your prescriber at the next review.";
  }
  return "I'm here to help with symptoms, appointments, results, medication and billing. Tell me what you're experiencing and roughly how long it's been going on, and I'll point you to the right part of the hospital.";
}
