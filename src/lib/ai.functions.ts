import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GenerateInput = z.object({
  tool: z.enum(["email", "meetings", "tasks", "research"]),
  fields: z.record(z.string()),
});

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

export const generateOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const { runGeneration } = await import("./ai-run.server");
    return runGeneration(data.tool, data.fields);
  });

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const { runChat } = await import("./ai-run.server");
    return runChat(data.messages);
  });
