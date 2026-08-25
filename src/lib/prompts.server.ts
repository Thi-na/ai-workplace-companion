export type ToolId = "email" | "meetings" | "tasks" | "research";

const SHARED_RULES = `Rules:
- Return clean, ready-to-use text in markdown-free plain prose unless a list is genuinely clearer.
- Never invent names, numbers, dates or sources that were not supplied.
- If a detail is missing, use a clearly marked placeholder in [square brackets].
- Do not add commentary about yourself or about being an AI.`;

export function buildPrompt(tool: ToolId, fields: Record<string, string>) {
  const f = (k: string, fallback = "not specified") => fields[k]?.trim() || fallback;

  switch (tool) {
    case "email":
      return {
        system: `You are a senior workplace communication editor drafting professional emails.\n${SHARED_RULES}`,
        prompt: [
          `Write a workplace email.`,
          `Context and goal: ${f("context")}`,
          `Recipient / audience: ${f("audience")}`,
          `Tone: ${f("tone", "warm and professional")}`,
          `Length: ${f("length", "medium")}`,
          `Key points to cover: ${f("keyPoints", "infer from the context")}`,
          `Output a subject line on the first line prefixed with "Subject:", then the email body.`,
        ].join("\n"),
      };
    case "meetings":
      return {
        system: `You are a meticulous meeting analyst who turns raw notes into structured summaries.\n${SHARED_RULES}`,
        prompt: [
          `Summarize the following meeting.`,
          `Meeting title: ${f("title")}`,
          `Attendees: ${f("attendees")}`,
          `Raw notes or transcript:\n${f("notes")}`,
          `Structure the output with these sections, each on its own line as a heading: Overview, Key Decisions, Action Items (owner + due date when stated), Open Questions, Risks.`,
        ].join("\n"),
      };
    case "tasks":
      return {
        system: `You are an executive planning partner who builds realistic, prioritized work plans.\n${SHARED_RULES}`,
        prompt: [
          `Build a work plan.`,
          `Objective: ${f("goal")}`,
          `Timeframe: ${f("timeframe", "this week")}`,
          `Available hours per day: ${f("hours", "not specified")}`,
          `Known constraints or dependencies: ${f("constraints", "none stated")}`,
          `Output a prioritized, time-blocked plan grouped by day or phase. For each item give a short title, why it matters, and an effort estimate. End with a short "Watch out for" section.`,
        ].join("\n"),
      };
    case "research":
      return {
        system: `You are a research analyst producing balanced briefings for busy professionals.\n${SHARED_RULES}
- Clearly separate what is well established from what is uncertain.
- Do not fabricate citations. If you cannot cite something reliably, say what the reader should verify.`,
        prompt: [
          `Produce a research briefing.`,
          `Topic or question: ${f("topic")}`,
          `Depth: ${f("depth", "standard")}`,
          `Perspective to prioritize: ${f("angle", "neutral business perspective")}`,
          `Structure the output as: Summary, What We Know, Trade-offs, Recommended Next Steps, What To Verify.`,
        ].join("\n"),
      };
  }
}
