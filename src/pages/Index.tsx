import { useEffect, useRef, useState } from "react";
import { introReady } from "@/lib/intro";
import { useScrollRevealPresets } from "@/hooks/useScrollRevealPresets";
import { useSignalReveal } from "@/hooks/useSignalReveal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Services from "@/sections/Services";
import VelocityBand from "@/sections/VelocityBand";
import Process from "@/sections/Process";
import Why from "@/sections/Why";
import CtaPortal from "@/sections/CtaPortal";
import Contact from "@/sections/Contact";

const Index = () => {
  const page = useRef<HTMLDivElement>(null);
  useSignalReveal(page);
  useScrollRevealPresets();

  // The floating button sits above everything, so keep it back until the boot screen opens
  const [introDone, setIntroDone] = useState(false);
  useEffect(() => {
    introReady.then(() => setIntroDone(true));
  }, []);

  return (
    <div ref={page} className="relative flex min-h-screen flex-col bg-black text-white">
      <ScrollProgress />
      <Navbar />
      <main className="relative flex-1">
        <Hero />
        <Intro />
        <Services />
        <VelocityBand />
        <Process />
        <Why />
        <CtaPortal />
        <Contact />
      </main>
      <Footer />
      {introDone && <FloatingWhatsApp />}
    </div>
  );
};

export default Index;
