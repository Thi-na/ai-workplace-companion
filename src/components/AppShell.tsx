import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import avatar from "@/assets/avatar-thina.jpg";
import { NAV_ITEMS } from "@/lib/nav";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="mt-3 space-y-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-sage/10"
          activeProps={{ className: "bg-sage/10 text-ink" }}
        >
          <span className="grid size-6 place-items-center rounded-md bg-sage/15 text-[13px]">
            {item.glyph}
          </span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-9 place-items-center rounded-lg bg-sage-deep font-display text-lg font-medium text-mist">
        R
      </div>
      <div>
        <div className="font-display text-lg leading-none">AI Workplace Companion</div>
        <div className="text-[11px] tracking-wide text-ink/45">AI Workplace Assistant</div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mist font-body text-ink antialiased selection:bg-sage/20">
      <div className="mx-auto max-w-[1560px] lg:flex">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-line bg-white/60 px-6 py-8 lg:sticky lg:top-0 lg:flex lg:h-screen">
          <Brand />
          <div className="mt-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
            Workspace
          </div>
          <NavLinks />
          <div className="mt-auto space-y-4">
            <div className="rounded-xl border border-line bg-white/70 p-4">
              <div className="font-display text-base">Responsible AI</div>
              <p className="mt-1 text-xs leading-relaxed text-ink/55">
                Outputs are generated suggestions. Always verify before sharing with colleagues or
                clients.
              </p>
            </div>
            <div className="flex items-center gap-3 px-1">
              <img
                src={avatar}
                alt="Thina"
                loading="lazy"
                width={512}
                height={512}
                className="size-9 rounded-full object-cover outline-1 -outline-offset-1 outline-black/5"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">Thina</div>
                <div className="truncate text-xs text-ink/45">Product Lead</div>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:hidden">
          <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-mist/95 px-5 py-3 backdrop-blur">
            <Brand />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="rounded-lg border border-line bg-white/70 px-3 py-2 text-sm text-ink/60"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
          {open ? (
            <div className="border-b border-line bg-white/70 px-4 py-3">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          ) : null}
        </div>

        <main className="min-w-0 flex-1 px-5 py-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
