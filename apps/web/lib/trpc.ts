import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../server/trpc/router';

export const trpc: CreateTRPCReact<AppRouter, unknown> = createTRPCReact<AppRouter, unknown>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: '/api/trpc',
            transformer: superjson,
        }),
    ],
});
