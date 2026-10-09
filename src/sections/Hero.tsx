import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap, SplitText, prefersReducedMotion, canHover, SCRAMBLE_CHARS } from "@/lib/gsap";
import { introReady } from "@/lib/intro";
import { waLink } from "@/config/site";
import Flashlight from "@/components/motion/Flashlight";
import Button from "@/components/motion/Button";

const LINES = [
  { text: "Websites.", note: "// fast · custom · SEO-ready", indent: "" },
  { text: "Apps.", note: "// bookings · portals · dashboards", indent: "pl-[14vw]" },
  { text: "Marketing.", note: "// social · ads · Google", indent: "pl-[4vw]" },
];

/**
 * One layer of the hero. Both layers share this exact layout so the flashlight lines up:
 * the surface is a clean white headline; underneath, the same words in signal colour with code notes.
 */
function HeroLayer({ live = false }: { live?: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${live ? "bg-[#050207]" : "bg-black"}`}>
      {live ? (
        <>
          <div className="absolute inset-0 bg-grid [background-size:28px_28px] opacity-90" />
          <div className="absolute -left-[10%] top-[10%] h-[70vh] w-[70vh] rounded-full bg-pink/30 blur-[120px]" />
          <div className="absolute -right-[10%] bottom-0 h-[70vh] w-[70vh] rounded-full bg-cyan/20 blur-[120px]" />
          {/* blueprint crosshairs */}
          <div className="absolute inset-y-0 left-[30%] w-px bg-cyan/25" />
          <div className="absolute inset-x-0 top-[62%] h-px bg-pink/25" />
          <span className="label absolute left-[30%] top-28 ml-3 text-cyan/70">x: 30vw</span>
          <span className="label absolute right-6 top-[62%] mt-3 text-pink/80">baseline</span>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_40%_50%,black_10%,transparent_70%)]" />
          <div data-hero-glow className="absolute -left-[15%] top-[5%] h-[60vh] w-[60vh] rounded-full bg-pink/10 blur-[130px]" />
          <div data-hero-glow className="absolute -right-[10%] bottom-[-10%] h-[60vh] w-[60vh] rounded-full bg-cyan/[0.07] blur-[130px]" />
        </>
      )}

      <div className="relative flex h-full flex-col justify-center px-5 pb-20 pt-24 sm:px-8 lg:px-14">
        <div className="display text-[clamp(3rem,11vw,11rem)] leading-[0.86]" aria-hidden={live || undefined}>
          {LINES.map((l, i) => (
            <span key={l.text} data-hero-line={i} className={`block whitespace-nowrap ${l.indent}`}>
              <span className="-mx-[0.12em] -mb-[0.22em] inline-block overflow-hidden px-[0.12em] pb-[0.22em] align-bottom">
                <span data-hero-word className={`inline-block ${live ? "text-signal" : "text-white"}`}>
                  {l.text}
                </span>
              </span>
              {live && (
                <span className="ml-[0.5em] hidden align-middle font-mono text-[0.1em] font-normal tracking-normal text-cyan sm:inline">
                  {l.note}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Flashlight hero: the light follows the cursor (or wanders by itself on phones) and shows the
 * build underneath the brand. Headline characters glitch in after the boot screen; scrolling away
 * shears the three lines apart.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    let alive = true;

    const pre = gsap.context(() => {
      gsap.set("[data-hero-fade], [data-hero-cta] > *", { opacity: 0 });
      gsap.set(".flashlight__reveal", { opacity: 0 });
    }, el);

    Promise.all([introReady, document.fonts?.ready]).then(() => {
      if (!alive) return;
      ctx = gsap.context(() => {
        // Only the visible (base) headline is split; the reveal layer fades in once it has landed
        const base = el.querySelectorAll<HTMLElement>("[data-flashlight] > :first-child [data-hero-word]");
        const split = SplitText.create(base, { type: "chars", charsClass: "split-char" });

        const tl = gsap.timeline({ defaults: { ease: "signal" } });
        tl.from(split.chars, {
          yPercent: 120,
          opacity: 0,
          textShadow: "-0.12em 0 0 #ff66c4, 0.12em 0 0 #01ffff",
          duration: 1.2,
          stagger: { each: 0.035, from: "random" },
          clearProps: "textShadow",
        })
          .to("[data-hero-fade]", { opacity: 1, duration: 1, stagger: 0.12 }, 0.5)
          .fromTo("[data-hero-cta] > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.7)
          .to(".flashlight__reveal", { opacity: 1, duration: 0.6 }, 1.2);

        el.querySelectorAll<HTMLElement>("[data-hero-scramble]").forEach((node, i) => {
          tl.to(node, {
            duration: 1.2,
            ease: "none",
            scrambleText: { text: node.dataset.heroScramble!, chars: SCRAMBLE_CHARS, speed: 0.6 },
          }, 0.4 + i * 0.2);
        });

        // Glows breathe slowly so the surface never sits completely still
        gsap.to("[data-hero-glow]", {
          x: "random(-80, 80)",
          y: "random(-60, 60)",
          scale: "random(0.85, 1.2)",
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });

        // Scroll away: the three lines shear apart (both layers move together, so they stay aligned)
        const scrub = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        [-18, 16, -10].forEach((x, i) => {
          gsap.to(`[data-hero-line="${i}"]`, { xPercent: x, ease: "none", scrollTrigger: scrub });
        });
        gsap.to("[data-hero-overlay]", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: { ...scrub, end: "60% top" } });
      }, el);
    });

    return () => {
      alive = false;
      pre.revert();
      ctx?.revert();
    };
  }, []);

  const hover = typeof window !== "undefined" && canHover();

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[36rem] overflow-hidden bg-black">
      <h1 className="sr-only">Digital Solutions SA — websites, apps and digital marketing in the Vaal Triangle</h1>

      <Flashlight
        className="absolute inset-0"
        radius={hover ? 260 : 170}
        roam
        base={<HeroLayer />}
        reveal={<HeroLayer live />}
      >
        <div data-hero-overlay className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 pb-8 pt-28 sm:px-8 lg:px-14">
          <div className="flex items-start justify-between gap-6">
            <p data-hero-fade className="label flex items-center gap-3 text-white/60">
              <span className="pulse-dot" />
              <span data-hero-scramble="Digital studio — Vaal Triangle, ZA">Digital studio — Vaal Triangle, ZA</span>
            </p>
            <p data-hero-fade className="label hidden text-right text-white/35 md:block">
              <span data-hero-scramble="Web · Apps · Marketing">Web · Apps · Marketing</span>
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md">
              <p data-hero-fade className="text-base leading-relaxed text-white/70 sm:text-lg">
                We design, build and grow the digital side of businesses that refuse to blend in.
              </p>
              <div data-hero-cta className="pointer-events-auto mt-7 flex flex-wrap gap-3">
                <Button href={waLink()} size="lg">
                  Start a project <ArrowRight size={16} />
                </Button>
                <Button href="#services" variant="outline" size="lg">
                  What we do
                </Button>
              </div>
            </div>

            <div data-hero-fade className="flex items-center gap-4 self-start md:self-auto">
              <span className="label max-w-[13rem] text-right text-white/45">
                {hover ? "Move your cursor — there's more underneath" : "Follow the light — there's more underneath"}
              </span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 text-white/70">
                <ArrowDown size={16} className="animate-bounce" />
              </span>
            </div>
          </div>
        </div>
      </Flashlight>
    </section>
  );
}
