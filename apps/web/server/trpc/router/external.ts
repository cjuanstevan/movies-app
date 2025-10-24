// apps/web/src/server/trpc/router/external.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const externalRouter = router({
    searchMovies: publicProcedure
        .input(
            z.object({
                q: z.string().optional(),
                page: z.number().int().min(1).optional().default(1)
            })
        )
        .query(async ({ input, ctx }) => {
            try {
                const items = await ctx.rapidApi.searchMovies(input.q, input.page);
                return {
                    ok: true,
                    total: items.length,
                    items
                };
            } catch (err: any) {
                console.error('Error en searchItems:', err);
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: err.message || 'Error al consultar la API externa'
                });
            }
        }),

    getItem: publicProcedure
        .input(z.object({ id: z.string().min(1, 'El id es requerido') }))
        .query(async ({ input, ctx }) => {
            try {
                const item = await ctx.rapidApi.getItemById(input.id);
                if (!item) {
                    throw new TRPCError({ code: 'NOT_FOUND', message: 'Elemento no encontrado' });
                }
                return { ok: true, item };
            } catch (err: any) {
                console.error('Error en getItem:', err);
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: err.message || 'Error al obtener el detalle del item'
                });
            }
        })
});
