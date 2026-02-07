import React from "react";
import { MessageSquarePlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

const FloatingWhatsApp = () => {
  const phoneNumber = "+27639034514";
  const message = "Hello! I'm interested in Digital Solutions SA services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const handleClick = (e) => {
    e.preventDefault();
    
    // Check if we're on the homepage and if the contact section exists
    const isHomepage = location.pathname === "/";
    const contactSection = document.getElementById('contact');
    
    if (isHomepage && contactSection) {
      // If on homepage with contact section, scroll to it
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise, open WhatsApp
      window.open(whatsappUrl, "_blank");
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'} z-[9999] bg-green-500 text-white ${isMobile ? 'p-3' : 'p-4'} rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center animate-pulse-soft`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquarePlus size={isMobile ? 24 : 28} />
    </button>
  );
};

export default FloatingWhatsApp;
