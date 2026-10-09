// Single place where GSAP plugins are registered. Import gsap from here, not from 'gsap'.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin, CustomEase, useGSAP);

// Fast attack, long soft landing — the house ease for every reveal
CustomEase.create("signal", "M0,0 C0.12,0.72 0.18,0.96 0.36,1 0.6,1.03 0.8,1 1,1");

gsap.defaults({ ease: "signal", duration: 1 });

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Characters ScrambleText cycles through — glyphs that read as "code compiling". */
export const SCRAMBLE_CHARS = "01<>/{}[]=+*#$%&_ABCDEFGHJKLMNPQRSTUVWXYZ";

export { gsap, ScrollTrigger, SplitText, useGSAP };
