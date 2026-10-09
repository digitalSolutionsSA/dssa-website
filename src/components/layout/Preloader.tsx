import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion, SCRAMBLE_CHARS } from "@/lib/gsap";
import { assetsSettled, markIntroDone } from "@/lib/intro";
import BrandLogo from "@/components/BrandLogo";

const BOOT = [
  ["init", "digital_solutions_sa"],
  ["load", "web.development"],
  ["load", "app.development"],
  ["load", "digital.marketing"],
];

/**
 * Boot sequence: mono lines decode one by one while a counter and a pink→cyan bar run to 100,
 * then a signal line flashes across the middle and the screen splits open top and bottom.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(() => prefersReducedMotion());

  useGSAP(
    (_, contextSafe) => {
      if (done) {
        markIntroDone();
        return;
      }
      document.documentElement.style.overflow = "hidden";
      const progress = { v: 0 };
      const paint = () => {
        if (count.current) count.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
        gsap.set("[data-boot-bar]", { scaleX: progress.v / 100 });
      };

      const intro = gsap.timeline();
      intro.from("[data-boot-logo]", { opacity: 0, y: -10, duration: 0.8 }, 0);
      gsap.utils.toArray<HTMLElement>("[data-boot-line]").forEach((line, i) => {
        const at = 0.25 + i * 0.32;
        intro
          .set(line, { opacity: 1 }, at)
          .to(line.querySelector("[data-boot-cmd]"), {
            duration: 0.5,
            ease: "none",
            scrambleText: { text: line.dataset.bootLine!, chars: SCRAMBLE_CHARS, speed: 1 },
          }, at)
          .fromTo(line.querySelector("[data-boot-ok]"), { opacity: 0 }, { opacity: 1, duration: 0.01 }, at + 0.45);
      });
      intro.to(progress, { v: 90, duration: 1.7, ease: "power1.inOut", onUpdate: paint }, 0.2);

      const finish = contextSafe!(() => {
        gsap
          .timeline({
            onComplete: () => {
              document.documentElement.style.overflow = "";
              setDone(true);
              ScrollTrigger.refresh();
            },
          })
          .to(progress, { v: 100, duration: 0.4, onUpdate: paint })
          .to("[data-boot-content]", { opacity: 0, y: -24, filter: "blur(6px)", duration: 0.5, ease: "power2.in" })
          .fromTo("[data-boot-seam]", { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.55, ease: "expo.inOut" }, "-=0.15")
          .add(markIntroDone)
          .to("[data-boot-top]", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "+=0.05")
          .to("[data-boot-bottom]", { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
          .to("[data-boot-seam]", { opacity: 0, scaleY: 6, duration: 0.6 }, "<");
      });

      let alive = true;
      // Fonts must be in before the hero splits its headline into characters
      Promise.all([new Promise((r) => intro.eventCallback("onComplete", r)), document.fonts?.ready])
        .then(() => assetsSettled(2500))
        .then(() => alive && finish());
      return () => {
        alive = false;
        document.documentElement.style.overflow = "";
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[300]" aria-hidden>
      <div data-boot-top className="absolute inset-x-0 top-0 h-1/2 bg-ink-2" />
      <div data-boot-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-2" />
      <div data-boot-seam className="absolute inset-x-0 top-1/2 h-px origin-center scale-x-0 bg-signal shadow-[0_0_24px_#ff66c4]" />

      <div data-boot-content className="relative flex h-full flex-col justify-between p-6 sm:p-10">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div data-boot-logo className="relative self-start">
          <BrandLogo eager className="h-10 sm:h-12" />
        </div>

        <div className="relative font-mono text-[0.7rem] leading-loose text-white/60 sm:text-xs">
          {BOOT.map(([verb, what]) => (
            <div key={what} data-boot-line={what} className="flex gap-3 opacity-0">
              <span className="text-pink">&gt;</span>
              <span>{verb}</span>
              <span data-boot-cmd className="text-white" />
              <span data-boot-ok className="ml-auto text-cyan">
                [ ok ]
              </span>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="flex items-end justify-between">
            <span className="label text-white/40">Booting studio</span>
            <span ref={count} className="display text-signal text-[clamp(4rem,14vw,10rem)] leading-none tabular-nums">
              000
            </span>
          </div>
          <div className="mt-4 h-px w-full bg-white/10">
            <div data-boot-bar className="h-full origin-left scale-x-0 bg-signal" />
          </div>
        </div>
      </div>
    </div>
  );
}
