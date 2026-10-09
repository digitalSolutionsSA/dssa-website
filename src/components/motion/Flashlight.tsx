import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion, canHover } from "@/lib/gsap";
import { introReady } from "@/lib/intro";

interface Props {
  /** What everyone sees */
  base: ReactNode;
  /** What the light uncovers — laid out to match the base so it reads as "underneath" */
  reveal: ReactNode;
  /** Light radius in px */
  radius?: number;
  /** Let the light wander on its own when no pointer is on it (always on touch screens) */
  roam?: boolean;
  className?: string;
  /** Label for the custom cursor while over this area */
  cursorLabel?: string;
  /** Content that sits above both layers (buttons, copy) without breaking the hover */
  children?: ReactNode;
}

/**
 * Flashlight reveal (after the HOH Tattoos hero): a soft circle follows the pointer and uncovers
 * the layer underneath. GSAP eases the light after the pointer, swells it on enter, pulses it on
 * click, and — with `roam` — drifts it around by itself so touch screens get the effect too.
 */
export default function Flashlight({ base, reveal, radius = 200, roam = false, className = "", cursorLabel, children }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const mask = layer.current;
      const ringEl = ring.current;
      if (!el || !mask || !ringEl || prefersReducedMotion()) return;

      const pos = { x: el.clientWidth * 0.5, y: el.clientHeight * 0.5, r: 0 };
      const ringSize = radius * 1.6;
      gsap.set(ringEl, { width: ringSize, height: ringSize, opacity: 0 });

      const paint = () => {
        mask.style.setProperty("--fx", `${pos.x}px`);
        mask.style.setProperty("--fy", `${pos.y}px`);
        mask.style.setProperty("--fr", `${pos.r}px`);
        const s = pos.r / radius;
        gsap.set(ringEl, { x: pos.x - ringSize / 2, y: pos.y - ringSize / 2, scale: s, opacity: Math.min(1, s * 1.4) });
      };
      paint();

      const xTo = gsap.quickTo(pos, "x", { duration: 0.55, ease: "power3", onUpdate: paint });
      const yTo = gsap.quickTo(pos, "y", { duration: 0.55, ease: "power3", onUpdate: paint });
      const grow = (r: number, duration = 0.7, ease = "back.out(1.7)") =>
        gsap.to(pos, { r, duration, ease, overwrite: "auto", onUpdate: paint });

      // Wandering light: hop between random points, slightly smaller than the hover light
      let roamTween: gsap.core.Tween | null = null;
      let hovering = false;
      let inView = false;
      const wander = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        roamTween = gsap.to(pos, {
          x: gsap.utils.random(w * 0.15, w * 0.85),
          y: gsap.utils.random(h * 0.2, h * 0.8),
          duration: gsap.utils.random(1.8, 2.8),
          ease: "sine.inOut",
          onUpdate: paint,
          onComplete: wander,
        });
      };
      // Touch screens have no hover, so for them the wandering light *is* the effect
      const roams = roam || !canHover();
      const startRoam = () => {
        if (!roams || hovering || !inView || roamTween) return;
        grow(radius * 0.75, 1.2, "power2.out");
        wander();
      };
      const stopRoam = () => {
        roamTween?.kill();
        roamTween = null;
      };

      const local = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const enter = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        hovering = true;
        stopRoam();
        const p = local(e);
        // Jump the light to the pointer if it was off, otherwise glide there
        if (pos.r < 2) {
          pos.x = p.x;
          pos.y = p.y;
        }
        grow(radius);
      };
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const p = local(e);
        xTo(p.x);
        yTo(p.y);
      };
      const leave = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        hovering = false;
        if (roams) startRoam();
        else grow(0, 0.5, "power3.in");
      };
      const down = () => {
        gsap
          .timeline({ onUpdate: paint })
          .to(pos, { r: radius * 1.45, duration: 0.25, ease: "power2.out" })
          .to(pos, { r: radius, duration: 0.8, ease: "elastic.out(1, 0.45)" });
      };

      if (canHover()) {
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        el.addEventListener("pointerdown", down);
      }

      // Only roam while on screen — and not before the preloader has lifted
      let ready = false;
      let alive = true;
      introReady.then(() => {
        ready = true;
        if (inView) window.setTimeout(() => alive && startRoam(), 900);
      });
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          inView = self.isActive;
          if (inView && ready) startRoam();
          else stopRoam();
        },
      });

      return () => {
        alive = false;
        stopRoam();
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        el.removeEventListener("pointerdown", down);
      };
    },
    { scope: root, dependencies: [radius, roam] },
  );

  return (
    <div ref={root} data-flashlight data-cursor={cursorLabel} className={`flashlight ${className}`}>
      {base}
      <div ref={layer} className="flashlight__reveal" aria-hidden>
        {reveal}
      </div>
      <div ref={ring} className="flashlight__ring" aria-hidden />
      {children}
    </div>
  );
}
