import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  // Brand palette (match your new DSSA vibe)
  const COLORS = {
    bgA: "#000000",
    bgB: "#061B2D",
    ink: "#071627",
    cyan: "#2BC7D6",
    cyan2: "#6FE9F3",
  };

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      const timer = setTimeout(() => setShowConsent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <AlertDialog open={showConsent} onOpenChange={setShowConsent}>
      <AlertDialogContent
        className={[
          "sm:max-w-md",
          "border border-white/10",
          "text-white",
          "rounded-2xl",
          "backdrop-blur-md",
          "shadow-[0_30px_120px_rgba(0,0,0,0.75)]",
          "overflow-hidden",
        ].join(" ")}
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(6,27,45,0.92) 60%, rgba(7,22,39,0.92) 100%)",
        }}
      >
        {/* Ambient glows */}
        <div
          className="pointer-events-none absolute -top-20 -left-24 h-[260px] w-[260px] rounded-full blur-3xl opacity-25"
          style={{
            background: `radial-gradient(circle at center, ${COLORS.cyan2} 0%, transparent 60%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-28 h-[300px] w-[300px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${COLORS.cyan} 0%, transparent 60%)`,
          }}
        />

        {/* Subtle grid (stable, low opacity) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
          }}
        />

        <div className="relative">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3 text-white">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                style={{
                  boxShadow: "0 0 28px rgba(43,199,214,0.15)",
                }}
              >
                <Cookie
                  className="h-5 w-5"
                  style={{
                    color: COLORS.cyan,
                    filter: "drop-shadow(0 0 10px rgba(43,199,214,0.25))",
                  }}
                />
              </span>
              Cookie Consent
            </AlertDialogTitle>

            <AlertDialogDescription className="text-white/70 mt-2 leading-relaxed">
              We use cookies and similar technologies to improve your experience,
              analyze traffic, and help our services run smoothly. By clicking{" "}
              <span className="text-white/85 font-medium">Accept All</span>, you
              consent to our use of cookies.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="sm:justify-between flex-wrap gap-2 mt-5">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl"
            >
              Decline
            </Button>

            <AlertDialogAction asChild>
              <Button
                onClick={handleAccept}
                className="text-white rounded-xl"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.cyan2} 100%)`,
                }}
              >
                Accept All
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>

          <p className="mt-4 text-xs text-white/45">
            Digital Solutions SA respects your choices. You can change this later
            by clearing your browser storage.
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CookieConsent;
