'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface User { }

interface AuthContextType {
    user: User | null;
    token: string | null;
    // refreshToken: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    // refreshAuthToken: () => Promise<boolean>;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initial loading useEffect hook
    // This will load authentication data from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedToken && storedRefreshToken) {
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
            fetchUser(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    // An async function to safely fetch user from localStorage and API
    const fetchUser = async (authToken: string) => {
        try {
            let locallySavedUser = localStorage.getItem('userData');
            if (!locallySavedUser) throw new Error("No user data in localStorage");
            const response = await fetch(`/api/users/${JSON.parse(locallySavedUser).id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser({
                    ...JSON.parse(locallySavedUser),
                    ...data.user
                });
            } else {
                console.error('Failed to fetch user, logging out');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userData');
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                setToken(null);
                setRefreshToken(null);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            setToken(null);
            setRefreshToken(null);
        } finally {
            setLoading(false);
        }
    };

    /**
     * The login function (used by context consumers)
     * @param email - User's email
     * @param password - User's password
     * @returns A promise that resolves to an object indicating success or failure
     */
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);                                               // Not yet tested
                setRefreshToken(data.refreshToken);                                 // Not yet tested
                localStorage.setItem('token', data.token);                          // Not yet tested
                localStorage.setItem('refreshToken', data.refreshToken);            // Not yet tested
                localStorage.setItem('userData', JSON.stringify(data.user));        // Not yet tested
                setUser(data.user);                                                 // Not yet tested

                // Store token in cookie for middleware access
                document.cookie = `token=${data.token}; path=/; SameSite=Lax`;
                document.cookie = `refreshToken=${data.refreshToken}; path=/; SameSite=Lax`;

                setLoading(false);
                return { success: true };                                         // Not yet tested
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
                return { success: false, error: errorData.error || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed');
            return { success: false, error: 'Login failed' };
        } finally {
            setLoading(false);
        }
    }

    // The register function (used by context consumers)
    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setRefreshToken(data.refreshToken);                                 // Not yet tested
                localStorage.setItem('token', data.token);                          // Not yet tested
                localStorage.setItem('refreshToken', data.refreshToken);            // Not yet tested
                localStorage.setItem('userData', JSON.stringify(data.user));        // Not yet tested
                setUser(data.user);

                // Store token in cookie for middleware access
                document.cookie = `token=${data.token}; path=/; SameSite=Lax`;
                document.cookie = `refreshToken=${data.refreshToken}; path=/; SameSite=Lax`;

                setLoading(false);
                return { success: true };
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed');
                return { success: false, error: errorData.error || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed');
            return { success: false, error: 'Registration failed' };
        } finally {
            setLoading(false);
        }
    };

    /**
     * The logout function (used by context consumers)
     * This will clear user data from state and localStorage
     */
    const logout = () => {
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');

        // Clear cookies
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    }

  const value = {
    user,
    token,
    // refreshToken,
    login,
    register,
    logout,
    // refreshAuthToken,
    loading,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}