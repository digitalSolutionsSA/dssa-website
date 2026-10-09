import type { ComponentType } from "react";
import MockWeb from "@/components/mockups/MockWeb";
import MockApp from "@/components/mockups/MockApp";
import MockMarketing from "@/components/mockups/MockMarketing";

export interface Service {
  n: string;
  id: string;
  title: string;
  /** shorter form for tight spaces */
  short: string;
  pitch: string;
  desc: string;
  deliverables: string[];
  accent: "pink" | "cyan";
  Mock: ComponentType<{ live?: boolean }>;
}

export const SERVICES: Service[] = [
  {
    n: "01",
    id: "web",
    title: "Web Development",
    short: "Websites",
    pitch: "Sites that load fast, rank well and sell.",
    desc: "Custom websites and web applications built for speed, search visibility and conversion. No templates — every pixel is designed for your brand and engineered from scratch.",
    deliverables: ["Custom design", "Mobile-first build", "SEO", "React · Next.js", "Tailwind"],
    accent: "pink",
    Mock: MockWeb,
  },
  {
    n: "02",
    id: "apps",
    title: "App Development",
    short: "Apps",
    pitch: "Booking systems, portals and dashboards people enjoy using.",
    desc: "Mobile and web apps built with modern frameworks, from first sketch to launch day. Booking systems, portals and dashboards — built around how your business actually works.",
    deliverables: ["Booking systems", "Portals", "Dashboards", "React Native", "PWA", "Supabase"],
    accent: "cyan",
    Mock: MockApp,
  },
  {
    n: "03",
    id: "marketing",
    title: "Digital Marketing",
    short: "Marketing",
    pitch: "Campaigns that turn scrolling into enquiries.",
    desc: "Social media content, paid ads, Google Business and campaigns that put you in front of the right people — and turn clicks into customers.",
    deliverables: ["Social media", "Google Ads", "Google Business", "Content", "Campaigns"],
    accent: "pink",
    Mock: MockMarketing,
  },
];
