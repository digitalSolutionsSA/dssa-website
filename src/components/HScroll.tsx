import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Horizontal text that drifts left as you scroll down (parallax scrub)
// Row 1 moves left, row 2 moves right — creates a shearing cinematic effect
const ROW1 = "DIGITAL · SOLUTIONS · SA · VAAL TRIANGLE · BUILD · BRAND · AUTOMATE · GROW · ";
const ROW2 = "WEB DEV · APPS · IDENTITY · MARKETING · AI · AUTOMATION · DESIGN · ";

function Row({ text, dir, className }: { text: string; dir: "left" | "right"; className?: string }) {
  const dup = text.repeat(4);
  return (
    <div className={`hs-overflow ${className ?? ""}`}>
      <div className={`hs-track hs-${dir}`}>
        <span className="hs-inner">{dup}</span>
        <span className="hs-inner" aria-hidden>{dup}</span>
      </div>
    </div>
  );
}

export default function HScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Row 1: moves left
      gsap.to(".hs-left", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      // Row 2: moves right (opposite direction)
      gsap.to(".hs-right", {
        xPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="hs-wrap">
      <Row text={ROW1} dir="left" />
      <Row text={ROW2} dir="right" />

      <style>{`
        .hs-wrap{
          overflow:hidden;
          background:#000;
          padding:32px 0;
          border-top:1px solid rgba(255,255,255,0.05);
          border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .hs-overflow{overflow:hidden;padding:8px 0;}
        .hs-track{display:flex;width:max-content;will-change:transform;}
        .hs-inner{
          display:block;
          white-space:nowrap;
          font-family:'Syne','Inter',sans-serif;
          font-weight:800;
          font-size:clamp(1.4rem,3vw,2.6rem);
          letter-spacing:0.04em;
          color:rgba(255,255,255,0.055);
          padding-right:0;
        }
        .hs-inner:nth-child(1){padding-right:40px;}
        @media(prefers-reduced-motion:reduce){.hs-track{transform:none!important;}}
      `}</style>
    </div>
  );
}
