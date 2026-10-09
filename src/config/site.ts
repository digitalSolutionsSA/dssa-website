export const WHATSAPP_NUMBER = "27639034514";

export const waLink = (text = "Hi! I'd like to start a project with Digital Solutions SA.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const EMAIL = "info@digitalsolutionssa.co.za";
export const PHONE_DISPLAY = "+27 63 903 4514";
export const LOCATION = "Three Rivers, Vereeniging · Gauteng, South Africa";

export const SOCIALS = {
  facebook: "https://www.facebook.com/profile.php?id=61574721767434",
  instagram: "https://www.instagram.com/digitalsolutions.sa",
  tiktok: "https://www.tiktok.com/@digitalsolutionssa",
};

export const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Why us", id: "why" },
  { label: "Contact", id: "contact" },
];
