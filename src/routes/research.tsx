import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Relay" },
      {
        name: "description",
        content:
          "Get a balanced briefing on any work topic: what's known, the trade-offs, next steps and what to verify.",
      },
      { property: "og:title", content: "AI Research Assistant — Relay" },
      {
        property: "og:description",
        content: "Balanced research briefings that separate the established from the uncertain.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell>
      <ToolWorkspace
        tool="research"
        eyebrow="AI Research Assistant"
        title="Get up to speed before the meeting starts."
        intro="Ask a question and receive a structured briefing that flags trade-offs and what still needs verifying."
        cta="Run briefing"
        fields={[
          {
            name: "topic",
            label: "Topic or question",
            kind: "textarea",
            rows: 3,
            placeholder: "How are B2B SaaS teams shortening onboarding to under five minutes?",
          },
          {
            name: "depth",
            label: "Depth",
            kind: "chips",
            options: ["Quick scan", "Standard", "Deep dive"],
            value: "Standard",
          },
          {
            name: "angle",
            label: "Perspective to prioritize",
            kind: "text",
            placeholder: "Product and activation metrics",
          },
        ]}
      />
    </AppShell>
  );
}
