import { useEffect } from 'react';

export function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-full bg-bittersweet text-white text-sm px-5 py-3 shadow-lg">
      {message}
    </div>
  );
}
