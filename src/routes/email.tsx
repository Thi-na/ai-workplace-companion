import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Relay" },
      {
        name: "description",
        content:
          "Draft professional workplace emails with guided prompts for tone, audience and length. Every draft stays editable.",
      },
      { property: "og:title", content: "Smart Email Generator — Relay" },
      {
        property: "og:description",
        content: "Guided AI email drafting for busy professionals, with editable output.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AppShell>
      <ToolWorkspace
        tool="email"
        eyebrow="Smart Email Generator"
        title="Write the email you've been putting off."
        intro="Describe the situation, pick a tone, and get a send-ready draft you can edit line by line."
        cta="Generate draft"
        fields={[
          {
            name: "context",
            label: "Context and goal",
            kind: "textarea",
            rows: 4,
            placeholder:
              "Follow up after the pilot kickoff and confirm the phase-two scope and onboarding date.",
          },
          {
            name: "audience",
            label: "Recipient / audience",
            kind: "text",
            placeholder: "Jordan Reyes, Procurement Lead",
          },
          {
            name: "tone",
            label: "Tone",
            kind: "chips",
            options: ["Warm & professional", "Concise", "Upbeat", "Formal", "Firm"],
            value: "Warm & professional",
          },
          {
            name: "length",
            label: "Length",
            kind: "chips",
            options: ["Short", "Medium", "Detailed"],
            value: "Medium",
          },
          {
            name: "keyPoints",
            label: "Key points",
            kind: "textarea",
            rows: 3,
            placeholder: "Confirm pilot timeline, share revised pricing, request signature by Friday.",
          },
        ]}
      />
    </AppShell>
  );
}
