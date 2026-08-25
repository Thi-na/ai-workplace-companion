import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { sendChatMessage } from "@/lib/ai.functions";
import { DISCLAIMER } from "@/lib/nav";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat Assistant — Relay" },
      {
        name: "description",
        content:
          "Ask Relay anything about your work: refine drafts, unpack decisions and plan next steps in conversation.",
      },
      { property: "og:title", content: "AI Chat Assistant — Relay" },
      {
        property: "og:description",
        content: "A conversational AI assistant for everyday workplace tasks.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Summarize this week's priorities",
  "Rewrite my update so it's shorter",
  "What should I ask in the vendor call?",
];

function ChatPage() {
  const send = useServerFn(sendChatMessage);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await send({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.text.trim() }]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Relay couldn't reply. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <header>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
          AI Chat
        </div>
        <h1 className="mt-1 font-display text-3xl leading-tight lg:text-4xl">Ask Relay anything.</h1>
      </header>

      <section className="mt-6 flex min-h-[60vh] flex-col rounded-2xl border border-line bg-white/80 p-6">
        <div className="flex-1 space-y-3">
          {messages.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-ink/55">
                Start with one of these, or type your own question.
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => void submit(s)}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/60 hover:border-sage/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <div
                key={i}
                className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-sage-deep px-3 py-2 text-sm text-mist"
              >
                {m.content}
              </div>
            ) : (
              <div
                key={i}
                className="w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-line bg-mist/60 px-3 py-2 text-sm leading-relaxed text-ink/80"
              >
                {m.content}
              </div>
            ),
          )}

          {loading ? (
            <div className="w-fit rounded-2xl rounded-bl-sm border border-line bg-mist/60 px-3 py-2 text-sm text-ink/45">
              Relay is thinking…
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit(input);
          }}
          className="mt-4 flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything…"
            aria-label="Message Relay"
            className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-ink/40"
          />
          <button
            type="submit"
            disabled={loading}
            aria-label="Send message"
            className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-xs text-mist disabled:opacity-60"
          >
            ↵
          </button>
        </form>

        <p className="mt-4 text-xs leading-relaxed text-ink/45">{DISCLAIMER}</p>
      </section>
    </AppShell>
  );
}
