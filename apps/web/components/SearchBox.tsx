'use client';

import { useSearchItems } from '../hooks/useSearchItems';
import MovieCard from './movie-card';

type Props = {
    query?: string;
};

export default function SearchBox({ query = '' }: Props) {
    console.log('query', query);
    const { data, isLoading, error } = useSearchItems(query);

    return (
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {isLoading && <p className="mt-4 text-gray-500">Cargando...</p>}
            {error && <p className="mt-4 text-red-600">Error: {error.message}</p>}

            {data && (
                <ul className="mt-4 space-y-2">
                    {data.items.map((item) => (
                        <MovieCard key={item.id} movie={item} />
                    ))}
                </ul>
            )}
        </div>
    );
}