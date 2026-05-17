"use client";

import { useEffect, useState } from 'react';
import { getSignatureCount } from '@/lib/db';
import { hasSupabaseConfig } from '@/lib/supabase';

export function usePetitionCount(initialCount: number) {
    const [count, setCount] = useState(initialCount);
    const [isRealtimeConnected] = useState(false);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        if (!hasSupabaseConfig) {
            return;
        }

        let isMounted = true;

        getSignatureCount().then((latestCount) => {
            if (isMounted && latestCount > 0) {
                setCount(latestCount);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const handleSigned = (e: Event) => {
            const detail = (e as CustomEvent).detail as {
                increment?: number;
                totalSignatures?: number;
            } | undefined;

            if (typeof detail?.totalSignatures === 'number') {
                setCount(detail.totalSignatures);
                return;
            }

            setCount((prev) => prev + (detail?.increment ?? 1));
        };

        window.addEventListener('petitionSigned', handleSigned as EventListener);
        return () => window.removeEventListener('petitionSigned', handleSigned as EventListener);
    }, []);

    return { count, setCount, isRealtimeConnected, error };
}
