import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left shape with gradient */}
        <defs>
          <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
        
        {/* Left circle */}
        <circle
          cx="15"
          cy="20"
          r="12"
          fill="url(#leftGradient)"
        />
        
        {/* Right circle */}
        <circle
          cx="25"
          cy="20"
          r="12"
          fill="url(#rightGradient)"
        />
      </svg>
    </div>
  );
};
