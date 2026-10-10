import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl border border-amber-400 no-print">
      <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
      <span>Modo Offline — O Declaração Online continua funcionando normalmente sem internet.</span>
    </div>
  );
};
