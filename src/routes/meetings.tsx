import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Relay" },
      {
        name: "description",
        content:
          "Turn messy meeting notes into decisions, action items with owners, open questions and risks.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Relay" },
      {
        property: "og:description",
        content: "Structured meeting summaries with decisions, owners and follow-ups.",
      },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <AppShell>
      <ToolWorkspace
        tool="meetings"
        eyebrow="Meeting Notes Summarizer"
        title="From messy notes to clear decisions."
        intro="Paste raw notes or a transcript and get a structured summary with owners, dates and open questions."
        cta="Summarize meeting"
        fields={[
          { name: "title", label: "Meeting title", kind: "text", placeholder: "Q3 Roadmap Sync" },
          {
            name: "attendees",
            label: "Attendees",
            kind: "text",
            placeholder: "Maya, Priya, Daniel, Jordan",
          },
          {
            name: "notes",
            label: "Raw notes or transcript",
            kind: "textarea",
            rows: 10,
            placeholder:
              "Paste your notes here — bullet fragments, half sentences and side comments are fine.",
          },
        ]}
      />
    </AppShell>
  );
}
