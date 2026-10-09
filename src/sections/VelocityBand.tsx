import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const WORDS = ["Web Development", "App Development", "Digital Marketing"];

/**
 * Two giant bands of type that slide in opposite directions as you scroll (scrubbed to position,
 * not looping) and lean into the scroll — the faster you go, the harder they skew.
 */
export default function VelocityBand() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const scrub = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 };
      gsap.fromTo("[data-band='a']", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: scrub });
      gsap.fromTo("[data-band='b']", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: scrub });

      const skewTo = gsap.quickTo("[data-band]", "skewX", { duration: 0.6, ease: "power3" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => skewTo(gsap.utils.clamp(-14, 14, self.getVelocity() / -260)),
        onLeave: () => skewTo(0),
        onLeaveBack: () => skewTo(0),
      });
    },
    { scope: root },
  );

  const row = (filled: boolean) =>
    [...WORDS, ...WORDS].map((w, i) => (
      <span key={i} className="flex items-center gap-[3vw] pr-[3vw]">
        <span className={`display whitespace-nowrap ${filled ? "text-signal" : "text-stroke"}`}>{w}</span>
        <span className={`text-[0.4em] ${i % 2 ? "text-cyan" : "text-pink"}`}>✦</span>
      </span>
    ));

  return (
    <div ref={root} aria-hidden className="relative select-none overflow-hidden py-16 text-[clamp(3.5rem,9vw,9rem)] leading-[1.05] sm:py-24">
      <div data-band="a" className="flex w-max will-change-transform">
        {row(false)}
      </div>
      <div data-band="b" className="flex w-max will-change-transform">
        {row(true)}
      </div>
    </div>
  );
}
