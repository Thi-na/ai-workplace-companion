import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { generateOutput } from "@/lib/ai.functions";
import { DISCLAIMER } from "@/lib/nav";

export type Field =
  | { name: string; label: string; kind: "text"; placeholder?: string; value?: string }
  | {
      name: string;
      label: string;
      kind: "textarea";
      rows?: number;
      placeholder?: string;
      value?: string;
    }
  | { name: string; label: string; kind: "chips"; options: string[]; value?: string };

type ToolId = "email" | "meetings" | "tasks" | "research";

export function ToolWorkspace({
  tool,
  eyebrow,
  title,
  intro,
  fields,
  cta,
}: {
  tool: ToolId;
  eyebrow: string;
  title: string;
  intro: string;
  fields: Field[];
  cta: string;
}) {
  const run = useServerFn(generateOutput);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.value ?? ""])),
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  async function generate() {
    setLoading(true);
    try {
      const res = await run({ data: { tool, fields: values } });
      setOutput(res.text.trim());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
            {eyebrow}
          </div>
          <h1 className="mt-1 font-display text-3xl leading-tight lg:text-4xl">{title}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/55">{intro}</p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <section className="rounded-2xl border border-line bg-white/80 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Structured prompt</h2>
            <span className="rounded-full bg-sage/12 px-3 py-1 text-xs font-medium text-sage-deep">
              Guided
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="text-xs font-medium text-ink/55" htmlFor={field.name}>
                  {field.label}
                </label>
                {field.kind === "chips" ? (
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {field.options.map((option) => {
                      const active = values[field.name] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => set(field.name, option)}
                          className={
                            active
                              ? "rounded-full bg-ink px-3 py-1.5 text-xs text-mist"
                              : "rounded-full border border-line px-3 py-1.5 text-xs text-ink/60 hover:border-sage/40"
                          }
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                ) : field.kind === "textarea" ? (
                  <textarea
                    id={field.name}
                    rows={field.rows ?? 4}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={(e) => set(field.name, e.target.value)}
                    className="mt-1.5 w-full resize-none rounded-lg border border-line bg-mist/60 p-3 text-sm leading-relaxed text-ink/85 outline-none focus:border-sage/50 focus:bg-white"
                  />
                ) : (
                  <input
                    id={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={(e) => set(field.name, e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-line bg-mist/60 px-3 py-2.5 text-sm text-ink/85 outline-none focus:border-sage/50 focus:bg-white"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-mist disabled:opacity-60"
          >
            {loading ? "Working…" : cta}
          </button>
        </section>

        <section className="rounded-2xl border border-line bg-white/80 p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Generated output</h2>
            <span className="rounded-full bg-sage/12 px-3 py-1 text-xs font-medium text-sage-deep">
              Editable
            </span>
          </div>

          {output || loading ? (
            <>
              <textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                rows={18}
                className="mt-4 w-full resize-y rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-ink/85 outline-none focus:border-sage/50"
                placeholder={loading ? "Generating…" : ""}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                  className="rounded-md bg-sage-deep px-4 py-2 text-xs font-medium text-mist"
                >
                  Copy
                </button>
                <button
                  onClick={generate}
                  disabled={loading}
                  className="rounded-md border border-line px-4 py-2 text-xs font-medium text-ink/70 disabled:opacity-60"
                >
                  Regenerate
                </button>
              </div>
            </>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-line bg-mist/50 p-8 text-center text-sm text-ink/45">
              Fill in the prompt on the left, then generate. Every output stays fully editable.
            </div>
          )}

          <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-ink/45">
            {DISCLAIMER}
          </p>
        </section>
      </div>
    </div>
  );
}
