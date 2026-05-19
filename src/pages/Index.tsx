
import React, { useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  const rafRef = useRef<number | null>(null);

  // Throttle mouse/touch tracking to one update per animation frame
  useEffect(() => {
    const root = document.documentElement;

    const updateVars = (x: number, y: number) => {
      root.style.setProperty("--x", (x - 0.5).toString());
      root.style.setProperty("--y", (y - 0.5).toString());
      rafRef.current = null;
    };

    const handleMouseMove = (evt: MouseEvent) => {
      if (rafRef.current) return;
      const x = evt.clientX / window.innerWidth;
      const y = evt.clientY / window.innerHeight;
      rafRef.current = requestAnimationFrame(() => updateVars(x, y));
    };

    const handleTouchMove = (evt: TouchEvent) => {
      if (!evt.touches[0] || rafRef.current) return;
      const x = evt.touches[0].clientX / window.innerWidth;
      const y = evt.touches[0].clientY / window.innerHeight;
      rafRef.current = requestAnimationFrame(() => updateVars(x, y));
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
