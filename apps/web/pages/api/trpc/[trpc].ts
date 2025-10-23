import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/trpc/router';
import { createContext } from '../../../server/trpc/context';

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
    onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            console.error('tRPC internal error:', error);
        } else {
            console.error('tRPC error:', error);
        }
    }
});
