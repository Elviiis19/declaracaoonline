import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed' | 'action';
  className?: string;
  label?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId,
  format = 'horizontal',
  className = '',
  label = 'Publicidade'
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Only attempt to push adsbygoogle if the element is in DOM and not already pushed
    if (typeof window !== 'undefined' && adRef.current) {
      try {
        // If adsbygoogle is loaded by script
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch (err) {
        // Safe catch for adblockers or duplicate pushes in React strict mode / SPA navigation
        setHasError(true);
      }
    }
  }, [slotId]);

  // Dimension classes based on format to reserve height (prevent Cumulative Layout Shift - CLS)
  const formatClasses = {
    horizontal: 'min-h-[90px] max-w-5xl mx-auto',
    rectangle: 'min-h-[250px] max-w-[336px] mx-auto',
    'in-feed': 'min-h-[120px] w-full',
    action: 'min-h-[90px] w-full'
  }[format];

  return (
    <div
      className={`no-print my-4 w-full flex flex-col items-center justify-center select-none ${className}`}
      role="complementary"
      aria-label="Publicidade"
    >
      <div className="w-full flex items-center justify-between mb-1 px-1 max-w-full">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </span>
        <span className="text-[9px] text-slate-400 dark:text-slate-500 hidden sm:inline">
          Anúncio Google
        </span>
      </div>

      <div
        className={`w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-1 flex items-center justify-center text-center transition-all ${formatClasses}`}
      >
        <ins
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-3499513777277871"
          data-ad-slot={slotId || 'auto'}
          data-ad-format={format === 'rectangle' ? 'rectangle' : 'auto'}
          data-full-width-responsive="true"
        />

        {/* Fallback placeholder when ad is blocked or loading in local environment */}
        {(!adLoaded || hasError) && (
          <div className="text-[11px] text-slate-400 dark:text-slate-500 flex flex-col items-center gap-1 py-3 px-4">
            <span className="font-medium text-slate-500 dark:text-slate-400">Espaço Reservado para Anúncio Google AdSense</span>
            <span className="text-[10px] text-slate-400">ID Publisher: ca-pub-3499513777277871 • Alta Visibilidade</span>
          </div>
        )}
      </div>
    </div>
  );
};
