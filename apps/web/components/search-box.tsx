'use client';

import { useSearchItems } from '../hooks/useSearchItems';
import MovieCard from './movie-card';
import { ErrorAlert } from '@workspace/ui/components/error-alert';
import MovieListSkeleton from '@/components/movie-list-skeleton';

type Props = {
    query?: string;
};

export default function SearchBox({ query = '' }: Props) {
    const { data, isLoading, error } = useSearchItems(query);

    return (
        <div className="w-full">
            {isLoading &&
                <MovieListSkeleton />
            }

            {error && (<ErrorAlert key={`error`} message={`${error.message}`} />)}

            {!isLoading && data && data.items.length === 0 && (
                <p className="mt-6 text-center text-neutral-400">No se encontraron resultados para «{query}»</p>
            )}

            {data && data.items.length > 0 && (
                <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {data.items.map((item) => (
                        <li key={item.id}>
                            <MovieCard movie={item} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}