import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { waLink } from "@/config/site";
import { SERVICES } from "@/data/services";
import Flashlight from "@/components/motion/Flashlight";
import Button from "@/components/motion/Button";

/**
 * Three service cards that stack: each one sticks near the top while the next slides up over it,
 * and the one underneath settles back (scales down, dims). The mockup on each card is a flashlight —
 * the wireframe on top, the finished build underneath.
 */
export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

      // Card contents rise in as each card arrives (all screen sizes)
      cards.forEach((card) => {
        gsap.from(card.querySelectorAll("[data-stack-in]"), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: "top 75%" },
        });
        gsap.from(card.querySelector("[data-stack-mock]"), {
          clipPath: "inset(12% 12% 12% 12% round 1.5rem)",
          scale: 1.08,
          duration: 1.4,
          ease: "expo.out",
          clearProps: "clipPath,scale",
          scrollTrigger: { trigger: card, start: "top 70%" },
        });
      });

      // Desktop stacking: the card underneath recedes as the next one covers it
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        cards.slice(0, -1).forEach((card, i) => {
          gsap.to(card.querySelector("[data-stack-inner]"), {
            scale: 0.9 + i * 0.025,
            filter: "brightness(0.35)",
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 14%", scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="relative px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:px-10">
      <div className="mx-auto mb-16 flex max-w-7xl flex-col gap-8 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="label mb-8 flex items-center gap-3 text-cyan">
            <span className="h-px w-10 bg-current" />
            <span data-scramble>What we do</span>
          </p>
          <h2 data-glitch className="display text-[clamp(3rem,8vw,7.5rem)] text-white">
            Three things.
            <br />
            <span className="text-signal">Done properly.</span>
          </h2>
        </div>
        <p data-sr="right" className="max-w-sm text-base leading-relaxed text-white/55 lg:mb-4">
          Three disciplines under one roof — so your website, your app and your marketing finally pull in the same direction.
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:gap-[12vh]">
        {SERVICES.map((s, i) => {
          const accent = s.accent === "pink" ? "text-pink" : "text-cyan";
          return (
            <article
              key={s.id}
              id={`service-${s.id}`}
              data-stack-card
              className="lg:sticky lg:h-[78vh] lg:min-h-[36rem]"
              style={{ top: `calc(11vh + ${i * 1.25}rem)` }}
            >
              <div
                data-stack-inner
                className="scanlines relative grid h-full origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-ink-3 lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="relative z-10 flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
                  <div>
                    <div data-stack-in className="flex items-center justify-between">
                      <span className="label text-white/40">
                        {s.n} <span className="text-white/20">/ 0{SERVICES.length}</span>
                      </span>
                      <span className={`label ${accent}`}>{s.short}</span>
                    </div>
                    <h3 data-stack-in className="display mt-8 text-[clamp(2.6rem,4.6vw,4.6rem)] text-white">
                      {s.title.split(" ")[0]}
                      <br />
                      <span className="text-stroke">{s.title.split(" ").slice(1).join(" ")}</span>
                    </h3>
                    <p data-stack-in className={`mt-6 text-lg font-medium ${accent}`}>
                      {s.pitch}
                    </p>
                    <p data-stack-in className="mt-4 max-w-md leading-relaxed text-white/55">
                      {s.desc}
                    </p>
                  </div>

                  <div>
                    <ul data-stack-in className="mb-8 flex flex-wrap gap-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/60">
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div data-stack-in>
                      <Button href={waLink(`Hi! I'm interested in ${s.title}.`)} variant={i === 1 ? "outline" : "primary"}>
                        Enquire about {s.short.toLowerCase()} <ArrowUpRight size={14} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative p-4 pt-0 sm:p-6 sm:pt-0 lg:p-8 lg:pl-0">
                  <div data-stack-mock className="relative aspect-[4/3] h-full w-full lg:aspect-auto">
                    <Flashlight
                      className="h-full w-full rounded-[1.5rem]"
                      radius={150}
                      roam
                      cursorLabel="Ship it"
                      base={
                        <div className="absolute inset-0 grid place-items-center bg-black/40 p-[5%]">
                          <s.Mock />
                        </div>
                      }
                      reveal={
                        <div className="absolute inset-0 grid place-items-center bg-[#050207] p-[5%]">
                          <s.Mock live />
                        </div>
                      }
                    >
                      <span className="label pointer-events-none absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-white/60 backdrop-blur">
                        wireframe <span className={accent}>→</span> live
                      </span>
                    </Flashlight>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
