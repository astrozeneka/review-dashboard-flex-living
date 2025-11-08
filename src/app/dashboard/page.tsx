'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        logout();
        // Redirect to login page after logout
        console.log('Logging out and redirecting to login page');
        router.push('/login');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-6">
                <h1 className="text-3xl font-bold">Hello {(user as any)?.name || ''}</h1>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
