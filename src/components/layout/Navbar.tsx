import { useRef, useState, type MouseEvent } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion, SCRAMBLE_CHARS } from "@/lib/gsap";
import { introReady } from "@/lib/intro";
import { scrollToId } from "@/lib/lenis";
import { NAV_LINKS, waLink } from "@/config/site";
import Button from "@/components/motion/Button";
import BrandLogo from "@/components/BrandLogo";
import MobileMenu from "./MobileMenu";

/**
 * Floating pill nav: links decode on hover, a pink capsule slides under whichever section is in
 * view, and the bar drops in from above once the preloader opens.
 */
export default function Navbar() {
  const header = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => setScrolled(self.scroll() > 60) });

      // Slide the capsule to the active link (or tuck it away when no section is active)
      const slideTo = (id: string) => {
        const link = header.current?.querySelector<HTMLElement>(`[data-nav="${id}"]`);
        if (!link) {
          gsap.to(pill.current, { opacity: 0, scaleX: 0.4, duration: 0.3 });
          return;
        }
        gsap.to(pill.current, {
          x: link.offsetLeft,
          width: link.offsetWidth,
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "expo.out",
        });
      };
      let active = "";
      NAV_LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          refreshPriority: -1, // measured after the pinned sections above have added their spacing
          onToggle: (self) => {
            if (self.isActive) active = id;
            else if (active === id) active = "";
            slideTo(active);
          },
        });
      });

      if (!prefersReducedMotion()) {
        gsap.set("[data-nav-bar]", { yPercent: -160 });
        introReady.then(() => gsap.to("[data-nav-bar]", { yPercent: 0, duration: 1.2, ease: "expo.out", delay: 0.5 }));
      }
    },
    { scope: header },
  );

  const decode = contextSafe((e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion()) return;
    const label = e.currentTarget.querySelector("[data-nav-label]");
    if (!label) return;
    gsap.to(label, {
      duration: 0.5,
      ease: "none",
      overwrite: true,
      scrambleText: { text: label.getAttribute("data-nav-label")!, chars: SCRAMBLE_CHARS, speed: 1 },
    });
  });

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <>
      <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          data-nav-bar
          className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 pl-5 transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled ? "border-white/10 bg-black/70 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" onClick={go("top")} aria-label="Digital Solutions SA — back to top" className="shrink-0">
            <BrandLogo eager className="h-10 sm:h-12" />
          </a>

          <nav className="relative hidden items-center md:flex" aria-label="Main">
            <span ref={pill} aria-hidden className="absolute left-0 top-0 h-full w-0 rounded-full border border-pink/70 bg-pink/10 opacity-0" />
            {NAV_LINKS.map(({ label, id }, i) => (
              <a
                key={id}
                href={`#${id}`}
                data-nav={id}
                onClick={go(id)}
                onMouseEnter={decode}
                className="relative z-10 rounded-full px-4 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
              >
                <span className="mr-1.5 text-white/35">0{i + 1}</span>
                <span data-nav-label={label}>{label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href={waLink()} size="sm">
                Start a project
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              data-menu-button
              className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className="flex w-4 flex-col gap-1.5">
                <span className="h-px w-full bg-white" />
                <span className="h-px w-2/3 bg-pink transition-[width] group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
