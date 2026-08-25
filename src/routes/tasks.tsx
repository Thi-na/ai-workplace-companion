import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Relay" },
      {
        name: "description",
        content:
          "Turn an objective into a prioritized, time-blocked plan with effort estimates and dependency warnings.",
      },
      { property: "og:title", content: "AI Task Planner — Relay" },
      {
        property: "og:description",
        content: "Prioritized, realistic work plans generated from your objective and constraints.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <AppShell>
      <ToolWorkspace
        tool="tasks"
        eyebrow="AI Task Planner"
        title="A plan that fits the week you actually have."
        intro="Give the objective and your real constraints. You get a prioritized, time-blocked plan you can edit."
        cta="Build plan"
        fields={[
          {
            name: "goal",
            label: "Objective",
            kind: "textarea",
            rows: 3,
            placeholder: "Ship the mobile onboarding flow and prepare the Q3 stakeholder deck.",
          },
          {
            name: "timeframe",
            label: "Timeframe",
            kind: "chips",
            options: ["Today", "This week", "Two weeks", "This month"],
            value: "This week",
          },
          {
            name: "hours",
            label: "Focus hours per day",
            kind: "text",
            placeholder: "4",
          },
          {
            name: "constraints",
            label: "Constraints and dependencies",
            kind: "textarea",
            rows: 3,
            placeholder: "QA pass blocked until Thursday; design review is Tuesday morning.",
          },
        ]}
      />
    </AppShell>
  );
}
