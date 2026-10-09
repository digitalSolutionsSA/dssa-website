import type { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger, SplitText, prefersReducedMotion, SCRAMBLE_CHARS } from "@/lib/gsap";
import { introReady } from "@/lib/intro";

/**
 * The site's GSAP scroll language, driven by data attributes inside `scope`:
 *
 *   [data-glitch]          heading chars rise in from random order with a pink/cyan RGB split that snaps shut
 *   [data-scramble]        mono text decodes from random glyphs when it enters
 *   [data-light]           paragraph words light up one by one as you scroll through it (scrubbed)
 *   [data-clip]            panel is uncovered by a diagonal wipe
 *   [data-draw]            SVG strokes draw themselves in (value "scrub" ties them to scroll)
 *   [data-count="24"]      number counts up (optional data-suffix)
 *   [data-float="12"]      drifts ±N% vertically while scrolling past (scrubbed parallax)
 *
 * Simple fades and slides are left to ScrollReveal (data-sr — see useScrollRevealPresets).
 */
export function useSignalReveal(scope: RefObject<HTMLElement>) {
  useGSAP(
    (_, contextSafe) => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Text splitting must wait for the real fonts, or lines are measured with the fallback face
      const splitAll = contextSafe!(() => {
        q("[data-glitch]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines,chars", mask: "lines", linesClass: "split-line", charsClass: "split-char" });
          gsap.from(split.chars, {
            yPercent: 115,
            opacity: 0,
            textShadow: "-0.14em 0 0 #ff66c4, 0.14em 0 0 #01ffff",
            duration: 1.1,
            stagger: { each: 0.022, from: "random" },
            ease: "signal",
            clearProps: "textShadow",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        q("[data-light]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: 0.6 },
            },
          );
        });
        ScrollTrigger.refresh();
      });
      let alive = true;
      Promise.all([introReady, document.fonts?.ready]).then(() => alive && splitAll());

      q("[data-scramble]").forEach((el) => {
        const text = el.textContent ?? "";
        gsap.set(el, { opacity: 0 });
        gsap.to(el, {
          opacity: 1,
          duration: 1.3,
          ease: "none",
          scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.6, revealDelay: 0.25 },
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      q("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.4,
            ease: "expo.inOut",
            clearProps: "clipPath",
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      });

      q("[data-draw]").forEach((el) => {
        const scrub = (el as HTMLElement).dataset.draw === "scrub";
        gsap.from(el.querySelectorAll("path, line, polyline, circle, rect"), {
          drawSVG: 0,
          duration: 1.8,
          stagger: 0.1,
          ease: scrub ? "none" : "power2.inOut",
          scrollTrigger: scrub
            ? { trigger: el, start: "top 80%", end: "bottom 40%", scrub: true }
            : { trigger: el, start: "top 85%" },
        });
      });

      q("[data-count]").forEach((el) => {
        const node = el as HTMLElement;
        const to = Number(node.dataset.count);
        const suffix = node.dataset.suffix ?? "";
        const n = { v: 0 };
        node.textContent = `0${suffix}`;
        gsap.to(n, {
          v: to,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%" },
          onUpdate: () => (node.textContent = `${Math.round(n.v)}${suffix}`),
        });
      });

      q("[data-float]").forEach((el) => {
        const amt = Number((el as HTMLElement).dataset.float) || 10;
        gsap.fromTo(
          el,
          { yPercent: amt },
          {
            yPercent: -amt,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      return () => {
        alive = false;
      };
    },
    { scope },
  );
}
