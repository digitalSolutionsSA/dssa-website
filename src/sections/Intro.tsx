const STATS = [
  { val: 3, suf: "", label: "Core disciplines" },
  { val: 100, suf: "%", label: "Custom built" },
  { val: 24, suf: "h", label: "Reply time" },
  { val: 0, suf: "", label: "Templates used", zero: true },
];

/**
 * Studio statement: the paragraph's words light up one at a time as you scroll through it
 * ([data-light], scrubbed), then the numbers count up and the rule draws across.
 */
export default function Intro() {
  return (
    <section aria-label="About the studio" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-10 flex items-center gap-3 text-pink">
          <span className="h-px w-10 bg-current" />
          <span data-scramble>Who we are</span>
        </p>

        <p data-light className="display text-[clamp(1.9rem,4.6vw,4.2rem)] leading-[1.06] tracking-[-0.03em] text-white">
          Digital Solutions SA is a <span className="text-pink">boutique digital studio</span>. We build{" "}
          <span className="text-cyan">websites, apps and campaigns</span> for clients{" "}
          <span className="text-pink">across South Africa and around the world</span> — engineered from scratch, designed to be
          remembered, and measured by one thing: <span className="text-signal">your results.</span>
        </p>

        <svg data-draw className="mt-16 h-3 w-full" viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden>
          <path d="M0,6 H1000" stroke="url(#intro-rule)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <defs>
            <linearGradient id="intro-rule" x1="0" x2="1">
              <stop offset="0" stopColor="#ff66c4" />
              <stop offset="1" stopColor="#01ffff" />
            </linearGradient>
          </defs>
        </svg>

        <div data-sr-children="pop" data-sr-interval="120" className="mt-12 grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {STATS.map(({ val, suf, label, zero }) => (
            <div key={label} className="flex flex-col gap-3">
              <span
                {...(zero ? {} : { "data-count": val, "data-suffix": suf })}
                className="display text-[clamp(3rem,6vw,5rem)] leading-none tabular-nums text-white"
              >
                {val}
                {suf}
              </span>
              <span className="label text-white/45" data-sr-scramble>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
