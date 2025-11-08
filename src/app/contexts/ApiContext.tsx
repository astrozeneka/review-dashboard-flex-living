"use client";

import { createContext, useContext } from "react";
import { Review } from "../types/review";
import { useAuth } from "./AuthContext";

interface ApiContextType {
    fetchHostawayReviews: () => Promise<{status: string; result: Review[]}>;
    approveHostawayReview: (reviewId: number) => Promise<{status: string, message: string, result: Review|null}>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useApi must be used within an ApiProvider");
    }
    return context;
};

interface ApiProviderProps {
    children: React.ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
    const { token } = useAuth();

    /**
     * Fetch Hostaway Reviews from the API
     * @returns A promise that resolves to an object containing status and result (array of reviews)
     */
    const fetchHostawayReviews = async (): Promise<{status: string; result: Review[]}> => {
        const response = await fetch('/api/reviews/hostaway', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch hostaway reviews, status: ' + response.status);
        }
        const data = await response.json();
        return data as {status: string; result: Review[]};
    };

    const approveHostawayReview = async (reviewId: number): Promise<{status: string, message: string, result: Review|null}> => {
        const response = await fetch(`/api/reviews/hostaway/approve/${reviewId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'approved' }),
        });
        if (!response.ok) {
            throw new Error('Failed to approve hostaway review, status: ' + response.status);
        }
        const data = await response.json();
        return data as {status: string, message: string, result: Review|null};
    };

    return (
        <ApiContext.Provider value={{ fetchHostawayReviews, approveHostawayReview }}>
            {children}
        </ApiContext.Provider>
    );
};