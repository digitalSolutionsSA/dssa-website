import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    text: "We get to know your business, your customers and what a win looks like for you — before anything gets designed.",
    tags: ["Goals", "Audience", "Scope"],
  },
  {
    n: "02",
    title: "Design",
    text: "Wireframes first, then polished designs you can click through and sign off before a single line of code is written.",
    tags: ["Wireframes", "UI design", "Feedback"],
  },
  {
    n: "03",
    title: "Build",
    text: "Hand-built, fast and mobile-first, with search visibility baked in. You see it take shape along the way.",
    tags: ["Development", "SEO", "Testing"],
  },
  {
    n: "04",
    title: "Launch & grow",
    text: "We go live, then keep improving — campaigns, content and updates that keep the momentum going.",
    tags: ["Go live", "Marketing", "Support"],
  },
];

// A loose wave that passes behind every step
const WAVE = "M0,120 C150,20 250,220 400,120 S650,20 800,120 S1050,220 1200,120 S1450,20 1600,120 S1850,220 2000,120";

/**
 * How we work — desktop pins the section and scroll drives the steps sideways while the signal line
 * draws itself through them; each step's hollow number floods with colour as it reaches the centre.
 * Phones get a vertical list revealed by ScrollReveal.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(el, { x: () => -distance() }, 0).fromTo("[data-wave]", { drawSVG: "0%" }, { drawSVG: "100%" }, 0);

        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          const st = { trigger: step, containerAnimation: tl, start: "left 75%", end: "center center", scrub: true };
          gsap.fromTo(step.querySelector("[data-step-fill]"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none", scrollTrigger: st });
          gsap.from(step.querySelectorAll("[data-step-in]"), { y: 60, opacity: 0, stagger: 0.1, ease: "none", scrollTrigger: st });
          gsap.fromTo(step.querySelector("[data-step-node]"), { scale: 0 }, { scale: 1, ease: "back.out(3)", scrollTrigger: st });
        });
      });
      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="relative overflow-hidden border-y border-white/10 bg-ink-2 lg:h-[100svh]">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

      <div ref={track} className="relative flex h-full flex-col gap-16 px-5 py-28 sm:px-8 lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-0">
        {/* Wave behind the steps (desktop) */}
        <svg
          aria-hidden
          className="pointer-events-none absolute left-[38vw] top-1/2 hidden h-[240px] w-[calc(100%-38vw)] -translate-y-1/2 lg:block"
          viewBox="0 0 2000 240"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-grad" x1="0" x2="1">
              <stop offset="0" stopColor="#ff66c4" />
              <stop offset="1" stopColor="#01ffff" />
            </linearGradient>
          </defs>
          <path d={WAVE} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path data-wave d={WAVE} fill="none" stroke="url(#wave-grad)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Intro panel */}
        <div className="relative shrink-0 lg:w-[38vw] lg:pl-14 lg:pr-16">
          <p className="label mb-8 flex items-center gap-3 text-pink">
            <span className="h-px w-10 bg-current" />
            <span data-scramble>How we work</span>
          </p>
          <h2 data-glitch className="display text-[clamp(3rem,6.5vw,6.5rem)] text-white">
            Idea in.
            <br />
            <span className="text-signal">Results out.</span>
          </h2>
          <p data-sr="rise" className="mt-8 max-w-sm leading-relaxed text-white/55">
            A clear, four-step process — so you always know what's happening, what's next and when you'll see it.
          </p>
          <p className="label mt-10 hidden items-center gap-3 text-white/35 lg:flex">
            Keep scrolling <span className="inline-block h-px w-16 bg-signal" />
          </p>
        </div>

        {STEPS.map((s) => (
          <div
            key={s.n}
            data-step
            // ScrollReveal only on the vertical (phone) layout — on desktop GSAP drives the steps sideways
            {...(desktop ? {} : { "data-sr": "rise" })}
            className="relative shrink-0 lg:flex lg:h-full lg:w-[34vw] lg:flex-col lg:justify-center lg:px-[3vw]"
          >
            <span data-step-node aria-hidden className="absolute left-[3vw] top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full border-2 border-black bg-signal shadow-[0_0_20px_#ff66c4] lg:block" />
            <div className="relative lg:-translate-y-[34%]">
              <span className="display text-stroke-dim block text-[clamp(6rem,12vw,11rem)] leading-none">{s.n}</span>
              <span data-step-fill aria-hidden className="display text-signal absolute inset-0 block text-[clamp(6rem,12vw,11rem)] leading-none lg:[clip-path:inset(100%_0_0_0)]">
                {s.n}
              </span>
            </div>
            <div className="relative mt-4 lg:mt-0 lg:translate-y-[28%]">
              <h3 data-step-in className="display text-[clamp(2rem,3vw,3rem)] text-white">
                {s.title}
              </h3>
              <p data-step-in className="mt-4 max-w-xs leading-relaxed text-white/55">
                {s.text}
              </p>
              <div data-step-in className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-cyan/80">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div aria-hidden className="hidden w-[10vw] shrink-0 lg:block" />
      </div>
    </section>
  );
}
