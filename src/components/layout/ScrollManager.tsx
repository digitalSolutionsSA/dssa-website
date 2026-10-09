import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { introReady } from "@/lib/intro";
import { resetToTop } from "@/lib/lenis";

/**
 * Re-measures ScrollTriggers as fonts/images settle, and makes sure the visit opens on the hero:
 * once the boot screen lifts, the page is pinned back to the very top in case anything nudged it.
 */
export default function ScrollManager() {
  useEffect(() => {
    // Fonts and lazy images change the layout after mount.
    const timers = [100, 600, 1500].map((ms) => window.setTimeout(() => ScrollTrigger.refresh(), ms));
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    let alive = true;
    introReady.then(() => {
      if (!alive) return;
      resetToTop();
      ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
