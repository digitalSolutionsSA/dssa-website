
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  // Initialize mouse tracking for logo hover effects
  useEffect(() => {
    const root = document.documentElement;
    
    const handleMouseMove = (evt) => {
      let x = evt.clientX / window.innerWidth;
      let y = evt.clientY / window.innerHeight;
      
      root.style.setProperty('--x', (x - 0.5).toString());
      root.style.setProperty('--y', (y - 0.5).toString());
    };
    
    // Add touch support for mobile
    const handleTouchMove = (evt) => {
      if (evt.touches && evt.touches[0]) {
        let x = evt.touches[0].clientX / window.innerWidth;
        let y = evt.touches[0].clientY / window.innerHeight;
        
        root.style.setProperty('--x', (x - 0.5).toString());
        root.style.setProperty('--y', (y - 0.5).toString());
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
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
