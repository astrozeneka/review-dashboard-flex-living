'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});
    const { login, loading } = useAuth();
    const router = useRouter();

    // Email validation regex
    const isValidEmail = useCallback((email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    // Validate form inputs
    const validateForm = useCallback((): boolean => {
        const errors: { email?: string; password?: string } = {};

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.length < 1) {
            errors.password = 'Password must not be empty';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [email, password, isValidEmail]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setValidationErrors({});

        // Validate before submitting
        if (!validateForm()) {
            return;
        }

        try {
            const result = await login(email.trim(), password);
            if (!result.success) {
                setError(result.error || 'Login failed. Please try again.');
            } else {
                // redirect to dashboard
                router.push('/dashboard');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Login error:', err);
        }
    };

    // Check if form is valid for submission
    const isFormValid = email.trim() && password.trim() && !loading;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Alert */}
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-800 text-sm font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => {
                                    // Validate email on blur for better UX
                                    if (email && !isValidEmail(email)) {
                                        setValidationErrors(prev => ({
                                            ...prev,
                                            email: 'Please enter a valid email address'
                                        }));
                                    }
                                }}
                                className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                    validationErrors.email
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white hover:border-gray-400'
                                }`}
                                disabled={loading}
                                autoComplete="email"
                            />
                            {validationErrors.email && (
                                <p className="mt-1.5 text-red-600 text-sm font-medium">{validationErrors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                    validationErrors.password
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white hover:border-gray-400'
                                }`}
                                disabled={loading}
                                autoComplete="current-password"
                            />
                            {validationErrors.password && (
                                <p className="mt-1.5 text-red-600 text-sm font-medium">{validationErrors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer Note */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Having trouble? <span className="text-indigo-600 font-medium cursor-help">Contact support</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
