// apps/web/src/server/trpc/router/index.ts
import { router } from '../trpc';
import { externalRouter } from './external';

export const appRouter = router({
    external: externalRouter
});

export type AppRouter = typeof appRouter;
