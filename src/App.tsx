import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { introReady } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/gsap";
import Index from "./pages/Index";
import Preloader from "./components/layout/Preloader";
import ScrollManager from "./components/layout/ScrollManager";
import Cursor from "./components/layout/Cursor";

// Not needed for the first paint, so they load separately
const NotFound = lazy(() => import("./pages/NotFound"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));

const App = () => {
  const [introDone, setIntroDone] = useState(false);

  // Smooth scroll is held while the preloader runs, then released with the curtain
  useEffect(() => {
    let alive = true;
    const lenis = prefersReducedMotion() ? null : initLenis();
    lenis?.stop();
    introReady.then(() => {
      if (!alive) return;
      lenis?.start();
      setIntroDone(true);
    });
    return () => {
      alive = false;
      destroyLenis();
    };
  }, []);

  return (
    <>
      <Preloader />
      <ScrollManager />
      <Cursor />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {introDone && <CookieConsent />}
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
