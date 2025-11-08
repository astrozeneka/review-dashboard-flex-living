'use client';

import Toast, { ToastMessage } from './Toast';

interface ToastContainerProps {
    toasts: ToastMessage[];
    onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50 space-y-3">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    );
}
