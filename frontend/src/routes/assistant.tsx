import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/assistant")({
  component: () => <Outlet />,
  head: () => ({
    meta: [
      { title: "AI Assist — Patient Support Chat | Sanguine" },
      {
        name: "description",
        content: "Chat with the Sanguine assistant about symptoms, appointments, results, medication and billing.",
      },
      { property: "og:title", content: "AI Assist — Patient Support Chat" },
      {
        property: "og:description",
        content: "Chat about symptoms, appointments, results, medication and billing.",
      },
    ],
  }),
});
