import React, { useEffect } from 'react';

export default function Notification({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const base =
    'fixed top-6 left-1/2 -translate-x-1/2 z-50 min-w-[320px] max-w-[90vw] px-8 py-3 rounded-lg border shadow text-base flex items-center gap-2 transition-opacity duration-500 opacity-100 animate-fade-in-out';

  const color =
    type === 'error' || type === 'delete'
      ? 'bg-red-100 text-red-700 border-red-200'
      : type === 'success' || type === 'copy'
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-blue-100 text-blue-700 border-blue-200';

  return (
    <div className={base + ' ' + color}>
      {(type === 'error' || type === 'delete') && <span>❌</span>}
      {(type === 'success' || type === 'copy') && <span>✅</span>}
      <span>{message}</span>
    </div>
  );
}

// Animación fade-in-out para Tailwind (agrega en tailwind.config si no existe):
// 'animate-fade-in-out': {
//   '0%,100%': { opacity: 0 },
//   '10%,90%': { opacity: 1 },
// }
