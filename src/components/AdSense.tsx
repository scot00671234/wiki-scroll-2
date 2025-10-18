import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adStyle?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = '',
  responsive = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current && !isInitialized.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isInitialized.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        ref={adRef as any}
        className="adsbygoogle"
        style={adStyle}
        data-ad-client="ca-pub-4669482504741834"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        key={`ad-${adSlot}-${Math.random()}`}
      />
    </div>
  );
};

// Banner Ad Component
export const BannerAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full ${className}`}>
    <AdSense
      adSlot="1234567890" // Replace with your actual ad slot
      adFormat="auto"
      className="w-full"
      responsive={true}
    />
  </div>
);

// Rectangle Ad Component
export const RectangleAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full max-w-sm mx-auto ${className}`}>
    <AdSense
      adSlot="0987654321" // Replace with your actual ad slot
      adFormat="rectangle"
      adStyle={{ display: 'block', width: '300px', height: '250px' }}
      className="w-full"
    />
  </div>
);

// Vertical Ad Component
export const VerticalAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full max-w-xs mx-auto ${className}`}>
    <AdSense
      adSlot="1122334455" // Replace with your actual ad slot
      adFormat="vertical"
      adStyle={{ display: 'block', width: '160px', height: '600px' }}
      className="w-full"
    />
  </div>
);
