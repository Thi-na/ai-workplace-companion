import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { DISCLAIMER } from "@/lib/nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relay — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Relay drafts emails, summarizes meetings, plans your week and researches topics — with structured prompts and fully editable AI output.",
      },
      { property: "og:title", content: "Relay — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Automate everyday workplace tasks with guided AI prompts and editable outputs you stay in control of.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Drafts this week", value: "27", note: "↑ 12% vs last week" },
  { label: "Meetings summarized", value: "14", note: "↑ 3 this week" },
  { label: "Tasks automated", value: "63", note: "≈ 5.2 hrs saved" },
  { label: "Avg. response time", value: "1.8s", note: "↓ 0.4s faster" },
];

function Dashboard() {
  return (
    <AppShell>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-ink/40">Good morning, Thina</div>
          <h1 className="mt-1 font-display text-3xl leading-tight lg:text-4xl">
            Your productivity, <span className="italic text-sage-deep">amplified.</span>
          </h1>
        </div>
        <Link
          to="/email"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-mist"
        >
          New draft
        </Link>
      </header>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-white/70 p-4">
            <div className="text-xs text-ink/45">{s.label}</div>
            <div className="mt-1 font-display text-2xl">{s.value}</div>
            <div className="text-xs text-sage-deep">{s.note}</div>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white/80 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
                Smart Email Generator
              </div>
              <h2 className="mt-1 font-display text-xl">
                Draft a follow-up to the Meridian client
              </h2>
            </div>
            <span className="rounded-full bg-sage/12 px-3 py-1 text-xs font-medium text-sage-deep">
              Editable
            </span>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-medium text-ink/55">Tone</div>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <span className="rounded-full bg-ink px-3 py-1.5 text-xs text-mist">
                  Warm &amp; professional
                </span>
                <span className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/60">
                  Concise
                </span>
                <span className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/60">
                  Upbeat
                </span>
              </div>
              <div className="mt-4 text-xs font-medium text-ink/55">Key points</div>
              <p className="mt-1.5 rounded-lg border border-line bg-mist/60 p-3 text-sm leading-relaxed text-ink/80">
                Confirm pilot timeline, share revised pricing, request signature by Friday.
              </p>
            </div>
            <div>
              <div className="text-xs font-medium text-ink/55">Last generated draft</div>
              <div className="mt-1.5 rounded-lg border border-line bg-white p-3 text-sm leading-relaxed text-ink/85">
                Hi Jordan,
                <br />
                <br />
                Thank you for a great pilot kickoff. I&apos;ve attached the revised timeline and
                updated pricing. Could you sign off by <span className="text-sage-deep">Friday</span>{" "}
                so we can lock the rollout? Happy to hop on a call if useful.
                <br />
                <br />
                Best,
                <br />
                Thina
              </div>
              <div className="mt-2 flex gap-2">
                <Link
                  to="/email"
                  className="rounded-md bg-sage-deep px-4 py-2 text-xs font-medium text-mist"
                >
                  Open generator
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white/80 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
            Meeting Summarizer
          </div>
          <h3 className="mt-1 font-display text-lg">Q3 Roadmap Sync</h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-mist/60 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-clay">
                Decisions
              </div>
              <p className="mt-1 text-sm text-ink/80">
                Ship the mobile onboarding in week 12; defer dark mode.
              </p>
            </div>
            <div className="rounded-lg bg-mist/60 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-clay">
                Action items
              </div>
              <p className="mt-1 text-sm text-ink/80">
                Thina → draft changelog. Priya → QA pass by Thu.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-ink/45">
              <span>Recorded · 42 min</span>
              <Link to="/meetings" className="font-medium text-sage-deep">
                View notes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white/80 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
            AI Chat
          </div>
          <h3 className="mt-1 font-display text-lg">Ask Relay anything</h3>
          <div className="mt-4 space-y-2">
            <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-sage-deep px-3 py-2 text-sm text-mist">
              Summarize this week&apos;s priorities
            </div>
            <div className="w-fit rounded-2xl rounded-bl-sm border border-line bg-mist/60 px-3 py-2 text-sm text-ink/80">
              Top 3: finalize pricing, hire two engineers, and present the Q3 deck on Wed.
            </div>
          </div>
          <Link
            to="/chat"
            className="mt-4 flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5"
          >
            <span className="text-sm text-ink/40">Ask anything…</span>
            <span className="ml-auto grid size-7 place-items-center rounded-full bg-ink text-xs text-mist">
              ↵
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-line bg-white/80 p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
              Task Planner
            </div>
            <Link to="/tasks" className="text-xs font-medium text-sage-deep">
              + Add
            </Link>
          </div>
          <h3 className="mt-1 font-display text-lg">Today&apos;s plan</h3>
          <div className="mt-4 space-y-2.5">
            <div className="flex items-start gap-3 rounded-lg p-1">
              <span className="mt-0.5 grid size-4 place-items-center rounded border border-sage-deep bg-sage-deep text-[10px] text-mist">
                ✓
              </span>
              <span className="text-sm text-ink/50 line-through">Send Meridian follow-up</span>
            </div>
            <div className="flex items-start gap-3 rounded-lg p-1">
              <span className="mt-0.5 grid size-4 place-items-center rounded border border-line" />
              <span className="text-sm">Review pricing doc with Priya</span>
            </div>
            <div className="flex items-start gap-3 rounded-lg p-1">
              <span className="mt-0.5 grid size-4 place-items-center rounded border border-line" />
              <span className="text-sm">Prep Q3 deck slides 4–9</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white/80 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
            Research Assistant
          </div>
          <h3 className="mt-1 font-display text-lg">Market scan: SaaS onboarding</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Across 12 competitors, teams that cut onboarding to under 5 minutes saw a{" "}
            <span className="text-sage-deep">31% lift</span> in week-1 activation. Mobile-first
            flows outperform desktop-only.
          </p>
          <div className="mt-4 rounded-lg border border-line bg-mist/50 p-3">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">
              Verify before citing
            </div>
            <Link to="/research" className="mt-1 block text-xs text-ink/60">
              Run your own briefing →
            </Link>
          </div>
        </div>
      </section>

      <p className="mt-6 text-center text-xs text-ink/40">{DISCLAIMER}</p>
    </AppShell>
  );
}
