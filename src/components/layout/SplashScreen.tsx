import React from "react";

interface SplashProps {
  isLoading: boolean;
}

const SplashScreen: React.FC<SplashProps> = ({ isLoading }) => {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center bg-bg-main
        transition-opacity duration-1000 ease-out
        ${isLoading ? "opacity-100" : "opacity-0 invisible"}
      `}
      aria-hidden={!isLoading}
    >
      <div className="flex items-center justify-center space-x-2">
        <div
          className="h-4 w-4 rounded-full bg-brand-brown animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="h-4 w-4 rounded-full bg-brand-brown animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="h-4 w-4 rounded-full bg-brand-brown animate-bounce"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
