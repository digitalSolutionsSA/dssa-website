import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { introReady } from "@/lib/intro";
import { waLink } from "@/config/site";
import Button from "@/components/motion/Button";

/**
 * Pinned "portal": a point of signal colour in the middle of the black grows into a circle that
 * swallows the whole screen as you scroll. Inside it the headline's letters fall into place and
 * then lean away from the cursor.
 */
export default function CtaPortal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      const build = contextSafe!(() => {
        const split = SplitText.create("[data-portal-title]", { type: "chars", charsClass: "split-char" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=140%", scrub: 1, pin: true, anticipatePin: 1 },
        });
        tl.fromTo("[data-portal]", { clipPath: "circle(0.5% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 1 }, 0)
          .fromTo("[data-portal-ring]", { scale: 0.02, opacity: 1 }, { scale: 2.4, opacity: 0, duration: 0.9 }, 0)
          .to("[data-portal-tease]", { opacity: 0, scale: 0.8, duration: 0.25 }, 0.1)
          .from(split.chars, { yPercent: -140, rotate: () => gsap.utils.random(-40, 40), opacity: 0, stagger: 0.015, duration: 0.35, ease: "back.out(2)" }, 0.55)
          .from("[data-portal-fade]", { y: 40, opacity: 0, stagger: 0.06, duration: 0.25 }, 0.8);

        // Letters lean away from the pointer (desktop)
        if (matchMedia("(hover: hover)").matches) {
          const chars = split.chars as HTMLElement[];
          const move = (e: PointerEvent) => {
            chars.forEach((c) => {
              const r = c.getBoundingClientRect();
              const dx = r.left + r.width / 2 - e.clientX;
              const dy = r.top + r.height / 2 - e.clientY;
              const dist = Math.hypot(dx, dy);
              const push = Math.max(0, 1 - dist / 220);
              gsap.to(c, { x: (dx / (dist || 1)) * push * 26, y: (dy / (dist || 1)) * push * 26, duration: 0.5, ease: "power3", overwrite: "auto" });
            });
          };
          const leave = () => gsap.to(chars, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
        }
      });

      let alive = true;
      Promise.all([introReady, document.fonts?.ready]).then(() => alive && build());
      return () => {
        alive = false;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Start a project" className="relative h-[100svh] overflow-hidden bg-black">
      {/* What you see before the portal opens */}
      <div data-portal-tease className="absolute inset-0 grid place-items-center">
        <p className="label text-white/40">Ready when you are</p>
      </div>
      <div data-portal-ring aria-hidden className="absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50" />

      <div
        data-portal
        className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#ff66c4,transparent_60%),radial-gradient(circle_at_75%_75%,#01ffff,transparent_60%)] bg-[#ff9ee0] px-5 text-center text-black"
        style={{ clipPath: "circle(75% at 50% 50%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-30 mix-blend-multiply" />
        <p data-portal-fade className="label relative text-black/60">
          Got an idea?
        </p>
        <h2 data-portal-title className="display relative mt-6 text-[clamp(3.2rem,11vw,11rem)] leading-[0.88]">
          Let's make
          <br />
          it real.
        </h2>
        <p data-portal-fade className="relative mt-8 max-w-md text-lg text-black/70">
          Tell us about your project — we'll be in touch within 24 hours.
        </p>
        <div data-portal-fade className="relative mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={waLink()} variant="dark" size="lg">
            WhatsApp us <ArrowRight size={16} />
          </Button>
          <Button href="#contact" variant="outlineDark" size="lg">
            Send a brief
          </Button>
        </div>
      </div>
    </section>
  );
}
