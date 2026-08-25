export const NAV_ITEMS = [
  { to: "/", glyph: "✦", label: "Dashboard" },
  { to: "/email", glyph: "✉", label: "Email Generator" },
  { to: "/meetings", glyph: "▤", label: "Meeting Summarizer" },
  { to: "/tasks", glyph: "◇", label: "Task Planner" },
  { to: "/research", glyph: "◉", label: "Research Assistant" },
  { to: "/chat", glyph: "❝", label: "Chat" },
] as const;

export const DISCLAIMER =
  "Outputs are AI-generated suggestions and may be inaccurate. Review every detail and verify facts before sharing with colleagues or clients.";
