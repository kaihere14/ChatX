import React from 'react';

const PageLoader = ({ 
  message = "Loading...", 
  variant = "spinner",
  size = "lg" 
}) => {
  const sizeClasses = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg"
  };

  const variantClasses = {
    spinner: "loading-spinner",
    dots: "loading-dots",
    ring: "loading-ring",
    ball: "loading-ball",
    bars: "loading-bars",
    infinity: "loading-infinity"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100 bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <span className={`loading ${variantClasses[variant]} ${sizeClasses[size]} text-primary`}></span>
        {message && (
          <p className="text-base-content text-lg font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageLoader;