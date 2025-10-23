import { trpc } from '../lib/trpc';
import type { UseTRPCQueryResult } from '@trpc/react-query/shared';
import type { AppRouter } from '../server/trpc/router';
import type { TRPCClientErrorLike } from '@trpc/client';

type SearchItemsResponse = {
    items: any[];
    total: number;
};

export function useSearchItems(
    q?: string,
    page: number = 1
): UseTRPCQueryResult<SearchItemsResponse, TRPCClientErrorLike<AppRouter>> {
    console.log('query in', q)
    return trpc.external.searchMovies.useQuery(
        { q, page },
        {
            enabled: true,
            staleTime: 1000 * 60 * 5,
        }
    );
}