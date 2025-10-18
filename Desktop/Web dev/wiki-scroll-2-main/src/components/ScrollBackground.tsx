import React, { useEffect, useState } from 'react';

export const ScrollBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs */}
      <div 
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl transition-transform duration-1000 ease-out"
        style={{
          background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #1E40AF 100%)',
          transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) scale(${1 + scrollY * 0.0001})`
        }}
      />
      
      <div 
        className="absolute -top-20 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl transition-transform duration-1200 ease-out"
        style={{
          background: 'linear-gradient(225deg, #1E40AF 0%, #3B82F6 50%, #60A5FA 100%)',
          transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.03}px) scale(${1 + scrollY * 0.00008})`
        }}
      />
      
      <div 
        className="absolute top-1/2 -left-20 w-64 h-64 rounded-full opacity-10 blur-2xl transition-transform duration-1400 ease-out"
        style={{
          background: 'linear-gradient(45deg, #3B82F6 0%, #60A5FA 100%)',
          transform: `translate(${scrollY * 0.06}px, ${-scrollY * 0.02}px) scale(${1 + scrollY * 0.00006})`
        }}
      />
      
      <div 
        className="absolute -bottom-32 -right-20 w-72 h-72 rounded-full opacity-12 blur-3xl transition-transform duration-1600 ease-out"
        style={{
          background: 'linear-gradient(315deg, #60A5FA 0%, #1E40AF 50%, #3B82F6 100%)',
          transform: `translate(${-scrollY * 0.04}px, ${-scrollY * 0.06}px) scale(${1 + scrollY * 0.00004})`
        }}
      />

      {/* Subtle overlay for better content readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-white/20 to-gray-50/30" />
    </div>
  );
};
