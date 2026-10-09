import { Code2, Gauge, MapPin, Search, Smartphone, Wrench } from "lucide-react";
import { LOCATION } from "@/config/site";

const REASONS = [
  { icon: Code2, title: "No templates", text: "Every site and app is designed and built from scratch around your brand — nothing off the shelf." },
  { icon: Smartphone, title: "Mobile-first", text: "Designed for the phone in your customer's hand first, then scaled up beautifully to desktop." },
  { icon: Search, title: "Built to be found", text: "Search visibility is part of every build, not an afterthought bolted on at the end." },
  { icon: Gauge, title: "Fast by default", text: "Lean code and optimised assets, so pages load quickly and visitors stay." },
  { icon: MapPin, title: "Local & reachable", text: "Based in Three Rivers, Vereeniging. Real people you can WhatsApp, not a ticket queue." },
  { icon: Wrench, title: "We stick around", text: "Updates, support and marketing after launch — we care about the outcome, not just the handover." },
];

/** Why us: spotlight tiles that tip up into view in sequence (ScrollReveal) and glow under the pointer. */
export default function Why() {
  return (
    <section id="why" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-14">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-pink/10 blur-[140px]" data-float="20" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 grid gap-10 lg:mb-20 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="label mb-8 flex items-center gap-3 text-cyan">
              <span className="h-px w-10 bg-current" />
              <span data-scramble>Why DSSA</span>
            </p>
            <h2 data-glitch className="display text-[clamp(3rem,7vw,6.5rem)] text-white">
              Small studio.
              <br />
              <span className="text-stroke">Big standards.</span>
            </h2>
          </div>
          <div data-sr="left">
            <p className="leading-relaxed text-white/60">
              No templates. No off-the-shelf themes. Every project is conceived, designed and engineered from the ground up by a
              team that cares about your outcome as much as you do.
            </p>
            <p className="label mt-6 flex items-center gap-3 text-white/40">
              <span className="pulse-dot" /> {LOCATION}
            </p>
          </div>
        </div>

        <div data-sr-children="tilt" data-sr-interval="90" className="grid gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="spot group rounded-3xl border border-white/10 bg-ink-3/80 p-7 sm:p-8">
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl border transition-colors duration-500 ${
                    i % 2 ? "border-cyan/30 text-cyan group-hover:bg-cyan group-hover:text-black" : "border-pink/30 text-pink group-hover:bg-pink group-hover:text-black"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className="font-mono text-xs text-white/25">0{i + 1}</span>
              </div>
              <h3 className="display mt-10 text-2xl tracking-[-0.03em] text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
