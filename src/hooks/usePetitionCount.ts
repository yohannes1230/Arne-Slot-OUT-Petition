"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const PETITION_ID = process.env.NEXT_PUBLIC_PETITION_ID;

export function usePetitionCount(initialCount: number) {
    const [count, setCount] = useState(initialCount);
    const [isRealtimeConnected, setRealtimeConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setCount(initialCount);
    }, [initialCount]);

    useEffect(() => {
        const filter = PETITION_ID ? `id=eq.${PETITION_ID}` : undefined;
        const eventConfig: Record<string, unknown> = {
            event: 'UPDATE',
            schema: 'public',
            table: 'petitions'
        };

        if (filter) {
            eventConfig.filter = filter;
        }

        const channel = (supabase as any)
            .channel('petition-count')
            .on(
                'postgres_changes',
                eventConfig,
                (payload: any) => {
                    const updatedCount = Number(payload.new?.total_signatures ?? initialCount);
                    setCount(updatedCount);
                }
            );

        void channel.subscribe();
        setRealtimeConnected(true);

        return () => {
            void supabase.removeChannel(channel);
        };
    }, [initialCount]);

    return { count, setCount, isRealtimeConnected, error };
}
