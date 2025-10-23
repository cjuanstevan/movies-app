// import { StarIcon } from '@heroicons/react/16/solid';
import { Movie } from '../server/models/domain/movie.js';
import Link from 'next/link.js';

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <>
            <Link href={`/${movie.id}/details`}>
                <div key={`movie-card-${movie.id}`} className="inline-block p-0 bg-blue-200 m-2 w-40 h-60 rounded-lg">
                    <div className="bg-white rounded-lg border p-1 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <div className="relative w-full h-48 overflow-hidden rounded-md">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-full object-fill"
                            />
                            <div className="absolute left-0 bottom-0 bg-black bg-opacity-60 text-white text-xs px-0 py-1 rounded flex items-center gap-1">
                                <span className="px-1">{movie.rating.toFixed(1)}</span>
                                {/* <StarIcon className="w-4 h-4 text-yellow-400" /> */}
                            </div>
                        </div>

                        <div className="px-1 py-1">
                            <div title={movie.title} className="text-blue-950 font-stretch-50% font-semibold text-shadow-md mb-1 line-clamp-1">
                                {movie.title}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
