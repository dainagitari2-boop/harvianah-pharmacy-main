import React from 'react';

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle - Optional, but keeping it for consistency with the previous pill icon style */}
        <circle cx="50" cy="50" r="48" fill="white" />
        
        {/* Stylized 'H' Logo */}
        <path 
          d="M30 25V75M70 25V75" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round"
        />
        <path 
          d="M30 50C30 50 40 55 50 50C60 45 70 50 70 50" 
          stroke="currentColor" 
          strokeWidth="12" 
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Logo;
