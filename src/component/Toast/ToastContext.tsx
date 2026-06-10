import {createContext, ReactNode, useCallback, useContext, useRef, useState} from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({children}: {children: ReactNode}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = `toast-${++counterRef.current}`;
      setToasts((prev) => [...prev, {id, message, type}]);
      setTimeout(() => removeToast(id), 3000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{toasts, addToast, removeToast}}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({toast, onDismiss}: {toast: Toast; onDismiss: (id: string) => void}) {
  const borderColorMap = {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#7C3AED',
  };

  return (
    <div
      className={`toast-item toast-${toast.type}`}
      style={{borderLeftColor: borderColorMap[toast.type]}}
      onClick={() => onDismiss(toast.id)}>
      <div className="toast-message">{toast.message}</div>
      <div className="toast-progress-bar" />
    </div>
  );
}
