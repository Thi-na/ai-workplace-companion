import { streamText } from "ai";
import { AI_MODEL, createLovableAiGatewayProvider } from "./ai-gateway.server";
import { buildPrompt, type ToolId } from "./prompts.server";

function gateway() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured for this workspace.");
  return createLovableAiGatewayProvider(key);
}

async function call(system: string, prompt: string) {
  const result = streamText({
    model: gateway()(AI_MODEL),
    system,
    prompt,
  });
  return { text: await result.text };
}

export async function runGeneration(tool: ToolId, fields: Record<string, string>) {
  const { system, prompt } = buildPrompt(tool, fields);
  return call(system, prompt);
}

export async function runChat(messages: { role: "user" | "assistant"; content: string }[]) {
  const transcript = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  return call(
    `You are Relay, an AI workplace productivity assistant. You help professionals draft emails, summarize meetings, plan work and research topics. Be concise, concrete and practical. Never invent facts, names or sources; flag anything the user should verify.`,
    `${transcript}\n\nAssistant:`,
  );
}
