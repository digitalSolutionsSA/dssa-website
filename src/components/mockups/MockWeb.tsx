import { ArrowRight, Lock, Sparkles, Smartphone, Zap } from "lucide-react";

/** Grey wireframe bar */
const Bar = ({ w, h = "0.55cqw", className = "" }: { w: string; h?: string; className?: string }) => (
  <span className={`block rounded-full bg-white/15 ${className}`} style={{ width: w, height: h }} />
);

/** Dashed placeholder box with the classic "image goes here" cross */
const Placeholder = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`relative rounded-[1.2cqw] border border-dashed border-white/25 ${className}`}>
    <svg className="absolute inset-0 h-full w-full text-white/15" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
      <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" vectorEffect="non-scaling-stroke" />
    </svg>
    <span className="absolute bottom-[1cqw] left-[1.2cqw] font-mono text-[1.5cqw] text-white/35">{label}</span>
  </div>
);

/**
 * A website in a browser window. `live` = the finished build; otherwise the wireframe.
 * Both variants share exact geometry so the flashlight reads as one page turning real.
 */
export default function MockWeb({ live = false }: { live?: boolean }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[2cqw] border [container-type:inline-size] ${
        live ? "border-white/15 bg-[#07070a]" : "border-white/15 bg-ink-3"
      }`}
    >
      {/* Browser chrome */}
      <div className="flex h-[6cqw] shrink-0 items-center gap-[1cqw] border-b border-white/10 px-[2cqw]">
        {live ? (
          <>
            <span className="h-[1.3cqw] w-[1.3cqw] rounded-full bg-pink" />
            <span className="h-[1.3cqw] w-[1.3cqw] rounded-full bg-white/70" />
            <span className="h-[1.3cqw] w-[1.3cqw] rounded-full bg-cyan" />
          </>
        ) : (
          [0, 1, 2].map((i) => <span key={i} className="h-[1.3cqw] w-[1.3cqw] rounded-full border border-white/30" />)
        )}
        <div
          className={`mx-auto flex h-[3.4cqw] w-[45%] items-center justify-center gap-[0.8cqw] rounded-full font-mono text-[1.5cqw] ${
            live ? "bg-white/5 text-white/70" : "border border-white/15 text-white/30"
          }`}
        >
          {live && <Lock className="h-[1.5cqw] w-[1.5cqw] text-cyan" />}
          yourbrand.co.za
        </div>
      </div>

      {/* Nav */}
      <div className="flex h-[7cqw] shrink-0 items-center justify-between px-[3cqw]">
        {live ? (
          <span className="display text-[2.4cqw] tracking-tight text-white">
            <span className="text-pink">◆</span> yourbrand
          </span>
        ) : (
          <Bar w="14cqw" h="2cqw" className="rounded-[0.4cqw]" />
        )}
        <div className="flex items-center gap-[2.4cqw]">
          {["Work", "About", "Services"].map((l) =>
            live ? (
              <span key={l} className="text-[1.6cqw] text-white/60">
                {l}
              </span>
            ) : (
              <Bar key={l} w="6cqw" />
            ),
          )}
          <span
            className={`flex h-[4cqw] items-center rounded-full px-[2cqw] text-[1.5cqw] font-bold ${
              live ? "bg-pink text-black" : "border border-white/25 font-mono text-white/35"
            }`}
          >
            {live ? "Book now" : "CTA"}
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-[3cqw] px-[3cqw] py-[2cqw]">
        <div className="flex flex-col justify-center">
          {live ? (
            <>
              <span className="mb-[1.5cqw] font-mono text-[1.4cqw] uppercase tracking-widest text-cyan">New · 2026</span>
              <span className="display text-[5.6cqw] leading-[0.95] text-white">
                Grow online,
                <br />
                <span className="text-signal">your way.</span>
              </span>
              <span className="mt-[2cqw] max-w-[90%] text-[1.6cqw] leading-relaxed text-white/55">
                A fast, beautiful site that turns visitors into customers.
              </span>
              <div className="mt-[3cqw] flex gap-[1.5cqw]">
                <span className="flex h-[4.6cqw] items-center gap-[0.8cqw] rounded-full bg-pink px-[2.4cqw] text-[1.5cqw] font-bold text-black">
                  Get started <ArrowRight className="h-[1.6cqw] w-[1.6cqw]" />
                </span>
                <span className="flex h-[4.6cqw] items-center rounded-full border border-white/25 px-[2.4cqw] text-[1.5cqw] text-white">
                  Learn more
                </span>
              </div>
            </>
          ) : (
            <>
              <Bar w="10cqw" className="mb-[2cqw]" />
              <Bar w="90%" h="3.6cqw" className="mb-[1.2cqw] rounded-[0.6cqw]" />
              <Bar w="70%" h="3.6cqw" className="rounded-[0.6cqw]" />
              <Bar w="85%" className="mt-[2.6cqw]" />
              <Bar w="60%" className="mt-[1cqw]" />
              <div className="mt-[3cqw] flex gap-[1.5cqw]">
                <span className="h-[4.6cqw] w-[14cqw] rounded-full border border-white/25" />
                <span className="h-[4.6cqw] w-[12cqw] rounded-full border border-dashed border-white/20" />
              </div>
            </>
          )}
        </div>

        {live ? (
          <div className="relative overflow-hidden rounded-[1.2cqw] bg-[radial-gradient(circle_at_30%_30%,#ff66c4,transparent_55%),radial-gradient(circle_at_75%_70%,#01ffff,transparent_55%)] bg-black">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute bottom-[8%] left-[10%] right-[10%] rounded-[1cqw] border border-white/20 bg-black/60 p-[1.6cqw] backdrop-blur">
              <div className="flex items-center gap-[1cqw] text-[1.4cqw] text-white">
                <Sparkles className="h-[1.8cqw] w-[1.8cqw] text-pink" /> Enquiry received
              </div>
              <span className="mt-[1cqw] block h-[0.6cqw] w-[70%] rounded-full bg-signal" />
            </div>
          </div>
        ) : (
          <Placeholder label="image 1200×900" />
        )}
      </div>

      {/* Feature cards */}
      <div className="grid shrink-0 grid-cols-3 gap-[2cqw] px-[3cqw] pb-[3cqw]">
        {[Zap, Smartphone, Sparkles].map((Icon, i) => (
          <div
            key={i}
            className={`flex h-[11cqw] flex-col justify-between rounded-[1.2cqw] p-[1.6cqw] ${
              live ? "border border-white/10 bg-white/[0.04]" : "border border-white/15"
            }`}
          >
            {live ? (
              <>
                <span
                  className={`grid h-[3.6cqw] w-[3.6cqw] place-items-center rounded-[0.8cqw] ${
                    i === 1 ? "bg-cyan text-black" : "bg-pink text-black"
                  }`}
                >
                  <Icon className="h-[2cqw] w-[2cqw]" />
                </span>
                <span className="text-[1.5cqw] font-semibold text-white">{["Lightning fast", "Mobile-first", "Built to convert"][i]}</span>
              </>
            ) : (
              <>
                <span className="h-[3.6cqw] w-[3.6cqw] rounded-full border border-white/25" />
                <Bar w="70%" />
              </>
            )}
          </div>
        ))}
      </div>

      {!live && (
        <>
          <span className="absolute left-[3cqw] top-[14cqw] font-mono text-[1.3cqw] text-white/30">&lt;hero&gt;</span>
          <span className="absolute bottom-[15cqw] left-[3cqw] font-mono text-[1.3cqw] text-white/30">&lt;section.features&gt;</span>
        </>
      )}
    </div>
  );
}
