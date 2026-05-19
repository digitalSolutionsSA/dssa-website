
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import CookieConsent from "./components/CookieConsent";
// Removed EasterPopup import

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let resolved = false;
    const MIN_DISPLAY = 600; // minimum branding time (ms)
    const MAX_WAIT = 800;    // hard ceiling so slow connections aren't punished

    const startTime = Date.now();

    const done = () => {
      if (resolved) return;
      resolved = true;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY - elapsed);
      setTimeout(() => setLoading(false), remaining);
    };

    const fallback = setTimeout(done, MAX_WAIT);

    if (document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", done, { once: true });
    }

    return () => {
      clearTimeout(fallback);
      window.removeEventListener("load", done);
    };
  }, []);

  return (
    <>
      {/* Hidden SVG filter used by .ds-grunge-heading for the distressed text effect */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="grunge-filter" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.70" numOctaves="4" seed="8" stitchTiles="stitch" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="w-full max-w-full overflow-x-hidden">
          <Toaster />
          <Sonner />
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CookieConsent />
              </BrowserRouter>
              {/* Removed EasterPopup component */}
            </>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
    </>
  );
};

export default App;

