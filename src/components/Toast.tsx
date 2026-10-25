import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

type ToastContextValue = { showToast: (message: string) => void };

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const showToast = useCallback((nextMessage: string) => setMessage(nextMessage), []);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(''), 3000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="toast" role="status" aria-live="polite" data-testid="toast">
          <span>{message}</span>
          <button
            className="toast-dismiss"
            type="button"
            aria-label="Dismiss notification"
            data-testid="toast-dismiss"
            onClick={() => setMessage('')}
          >
            ×
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
