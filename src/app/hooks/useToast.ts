import { useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '../components/Toast';

/**
 * Custom hook to manage toast notifications.
 * @returns An object containing the current toasts and functions to add and remove toasts.
 */
export function useToast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Date.now().toString();
        const newToast: ToastMessage = { id, message, type };
        setToasts((prev) => [...prev, newToast]);
        return id;
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return { toasts, addToast, removeToast };
}
