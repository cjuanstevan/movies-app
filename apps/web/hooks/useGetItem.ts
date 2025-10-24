import { trpc } from '../lib/trpc';
import type { UseTRPCQueryResult } from '@trpc/react-query/shared';
import type { AppRouter } from '../server/trpc/router';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { MovieDetail } from '@/server/models/domain/movie-detail';

type ItemResponse = {
    item: MovieDetail;
};

export function useGetItem(
    id: string
): UseTRPCQueryResult<ItemResponse, TRPCClientErrorLike<AppRouter>> {
    return trpc.external.getMovieById.useQuery(
        { id },
        {
            enabled: !!id,
            staleTime: 1000 * 60 * 5,
        }
    );
}
