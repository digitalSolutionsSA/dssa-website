import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { introReady } from "@/lib/intro";
import { prefersReducedMotion } from "@/lib/gsap";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Preloader from "./components/layout/Preloader";
import ScrollManager from "./components/layout/ScrollManager";
import Cursor from "./components/layout/Cursor";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes — prevents redundant refetches
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Preloader />
        <ScrollManager />
        <Cursor />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {introDone && <CookieConsent />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
