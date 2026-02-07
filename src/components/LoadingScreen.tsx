
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoIcon } from "./Logo";
import { Sparkles, Server, Code } from "lucide-react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing assets...");
  
  useEffect(() => {
    const loadingMessages = [
      "Initializing assets...",
      "Loading resources...",
      "Setting up digital environment...",
      "Preparing your experience...",
      "Almost ready..."
    ];
    
    let messageIndex = 0;
    
    const messageTimer = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 1500);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        const increment = Math.random() * 12 + 3;
        return Math.min(prev + increment, 100);
      });
    }, 200);
    
    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-digital-navy z-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 opacity-5">
          <Code size={100} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-5">
          <Server size={100} />
        </div>
        <div className="absolute top-1/2 left-1/3 opacity-10 animate-pulse">
          <Sparkles size={60} />
        </div>
      </div>
      
      <div className="animate-float text-center max-w-lg">
        <div className="relative">
          <LogoIcon className="h-24 w-24 mx-auto mb-6" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-digital-gradient rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-digital-teal rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-white gradient-text">
          Digital Solutions SA
        </h1>
        <p className="text-digital-teal mb-8">Transforming businesses through innovative technology</p>
      </div>
      
      <div className="w-full max-w-md space-y-4 relative">
        <Progress value={progress} className="h-3 bg-white/10 rounded-lg overflow-hidden" />
        <div className="flex justify-between text-sm text-white/70">
          <span className="font-medium">{Math.round(progress)}%</span>
          <span className="animate-pulse">{loadingText}</span>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-md space-y-3">
        <Skeleton className="h-3 w-3/4 mx-auto bg-white/10 rounded-full" />
        <Skeleton className="h-3 w-1/2 mx-auto bg-white/10 rounded-full" />
        <Skeleton className="h-3 w-2/3 mx-auto bg-white/10 rounded-full" />
      </div>
    </div>
  );
};

export default LoadingScreen;
