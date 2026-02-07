
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const LogoIcon = ({ className }: LogoProps) => {
  return (
    <svg 
      className={cn("text-digital-teal", className)} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100"
      fill="currentColor"
    >
      <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm0 80c-19.3 0-35-15.7-35-35s15.7-35 35-35 35 15.7 35 35-15.7 35-35 35z" />
      <path d="M65 35H35c-2.8 0-5 2.2-5 5v20c0 2.8 2.2 5 5 5h30c2.8 0 5-2.2 5-5V40c0-2.8-2.2-5-5-5zm-5 22.5H40c-1.4 0-2.5-1.1-2.5-2.5V45c0-1.4 1.1-2.5 2.5-2.5h20c1.4 0 2.5 1.1 2.5 2.5v10c0 1.4-1.1 2.5-2.5 2.5z" />
    </svg>
  );
};
