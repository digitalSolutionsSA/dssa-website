import { useEffect, useRef } from "react";
import { gsap, SCRAMBLE_CHARS } from "@/lib/gsap";

/**
 * Custom cursor: a white dot in difference blend (it inverts whatever it crosses) that swells over
 * controls and steps aside inside flashlight areas — there the light *is* the cursor. Anything with
 * data-cursor="Label" gets a pink mono tag that decodes to its label. The same pointer listener feeds
 * --sx/--sy to the nearest .spot card for its spotlight glow.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Spotlight cards work for any fine pointer, even with reduced motion (it's just a glow)
    const spot = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".spot");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--sx", `${e.clientX - r.left}px`);
      card.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", spot);

    if (!fine || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("pointermove", spot);
    }

    document.body.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const tx = gsap.quickTo(tag.current, "x", { duration: 0.45, ease: "power3" });
    const ty = gsap.quickTo(tag.current, "y", { duration: 0.45, ease: "power3" });
    let label = "";
    let last = { x: -100, y: -100 };

    // Works out what's under the pointer: hover state, flashlight state and the label tag
    const inspect = (t: HTMLElement | null) => {
      if (!t) return;
      const control = t.closest("a, button, input, textarea, select, label");
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const next = labelled?.dataset.cursor && (!control || control.contains(labelled) || control === labelled) ? labelled.dataset.cursor : "";
      const d = dot.current!;
      d.classList.toggle("is-hot", !!control);
      d.classList.toggle("is-light", !control && !!t.closest("[data-flashlight]"));

      if (next !== label) {
        label = next;
        if (label) {
          gsap.to(tag.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });
          gsap.to(tag.current, { duration: 0.6, ease: "none", scrambleText: { text: label, chars: SCRAMBLE_CHARS, speed: 0.9 } });
        } else {
          gsap.to(tag.current, { opacity: 0, scale: 0.6, duration: 0.25 });
        }
      }
    };

    const move = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      dx(e.clientX);
      dy(e.clientY);
      tx(e.clientX);
      ty(e.clientY);
      inspect(e.target as HTMLElement);
    };
    // Scrolling moves the page under a still pointer, so re-check what it's over
    const rescan = () => inspect(document.elementFromPoint(last.x, last.y) as HTMLElement | null);
    const down = () => dot.current?.classList.add("is-down");
    const up = () => dot.current?.classList.remove("is-down");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("scroll", rescan, { passive: true });
    return () => {
      window.removeEventListener("scroll", rescan);
      window.removeEventListener("pointermove", spot);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={tag} className="cursor-tag" aria-hidden />
    </>
  );
}
