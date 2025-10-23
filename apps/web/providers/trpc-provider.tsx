'use client';

import { trpc, trpcClient } from '../lib/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
