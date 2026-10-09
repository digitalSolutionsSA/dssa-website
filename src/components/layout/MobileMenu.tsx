import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { EMAIL, NAV_LINKS, PHONE_DISPLAY, waLink } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, scrollToId } from "@/lib/lenis";
import Button from "@/components/motion/Button";
import BrandLogo from "@/components/BrandLogo";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Full-screen menu that bursts open as a circle from the menu button; links rise with an RGB split. */
export default function MobileMenu({ open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const first = useRef(true);
  const at = useRef("90% 6%");

  useGSAP(
    () => {
      // Links and footer only; the circular burst is its own tween because its origin changes
      tl.current = gsap
        .timeline({ paused: true })
        .from("[data-mm-link] > span", {
          yPercent: 110,
          textShadow: "-0.1em 0 0 #ff66c4, 0.1em 0 0 #01ffff",
          duration: 0.8,
          stagger: 0.07,
          ease: "signal",
        })
        .from("[data-mm-foot]", { opacity: 0, y: 24, duration: 0.6 }, "-=0.5");
    },
    { scope: root },
  );

  useEffect(() => {
    // Skip the initial closed state, or Lenis would start before the preloader lifts
    if (first.current) {
      first.current = false;
      return;
    }
    const panel = root.current?.querySelector("[data-mm-panel]");
    const full = Math.hypot(window.innerWidth, window.innerHeight);
    if (open) {
      // Burst from wherever the menu button actually is
      const btn = document.querySelector<HTMLElement>("[data-menu-button]")?.getBoundingClientRect();
      at.current = btn ? `${btn.left + btn.width / 2}px ${btn.top + btn.height / 2}px` : "90% 6%";
      gsap.set(root.current, { visibility: "visible" });
      gsap.fromTo(
        panel,
        { clipPath: `circle(0px at ${at.current})` },
        { clipPath: `circle(${full}px at ${at.current})`, duration: 0.9, ease: "expo.inOut", overwrite: true },
      );
      tl.current?.timeScale(1).pause(0);
      gsap.delayedCall(0.45, () => tl.current?.play());
      getLenis()?.stop();
    } else {
      tl.current?.timeScale(2).reverse();
      gsap.to(panel, {
        clipPath: `circle(0px at ${at.current})`,
        duration: 0.7,
        ease: "expo.inOut",
        overwrite: true,
        onComplete: () => void gsap.set(root.current, { visibility: "hidden" }),
      });
      getLenis()?.start();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    window.setTimeout(() => scrollToId(id), 400);
  };

  return (
    <div ref={root} className="invisible fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div data-mm-panel className="absolute inset-0 flex flex-col bg-ink-2 px-6 pb-10 pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-pink/25 blur-[90px]" />
        <div aria-hidden className="pointer-events-none absolute -left-24 bottom-1/4 h-72 w-72 rounded-full bg-cyan/15 blur-[90px]" />

        <BrandLogo className="absolute left-6 top-6 h-10" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>

        <nav className="relative flex flex-col" aria-label="Mobile">
          {NAV_LINKS.map(({ label, id }, i) => (
            <a key={id} href={`#${id}`} onClick={go(id)} data-mm-link className="block overflow-hidden border-b border-white/10 py-4">
              <span className="block">
                <span className="mr-4 align-top font-mono text-xs text-pink">0{i + 1}</span>
                <span className="display text-[clamp(2.6rem,12vw,3.8rem)] text-white">{label}</span>
              </span>
            </a>
          ))}
        </nav>

        <div data-mm-foot className="relative mt-auto flex flex-col gap-6">
          <Button href={waLink()} size="lg" fullWidth onClick={onClose}>
            Start a project
          </Button>
          <div className="flex justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/50">
            <a href={`mailto:${EMAIL}`}>Email us</a>
            <span>{PHONE_DISPLAY}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
