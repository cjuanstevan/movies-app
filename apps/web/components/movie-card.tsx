// import { StarIcon } from '@heroicons/react/16/solid';
import { Movie } from '../server/models/domain/movie.js';
import Link from 'next/link.js';

export default function MovieCard({ movie }: { movie: Movie }) {

    const hasPoster = Boolean(movie.posterUrl);

    return (
        <Link href={`/${movie.id}/detail`} aria-label={`Ver detalles de ${movie.title}`}>
            <article className="group bg-neutral-900/40 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 ease-out transform hover:-translate-y-1">
                <div className="relative w-full pb-[150%] bg-neutral-800"> {/* 2:3 poster ratio */}
                    {hasPoster ? (
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-neutral-400 bg-neutral-800/60 p-4">
                            <svg className="w-12 h-12 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <rect x="3" y="4" width="18" height="14" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="10.5" r="1.5"></circle>
                                <path d="M21 15l-5-5-3 3-4-4-4 4"></path>
                            </svg>
                            <span className="text-sm font-medium">Poster not available</span>
                        </div>
                    )}

                    <div className="absolute left-3 top-3 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="inline-block w-6 text-center">{isFinite(movie.rating) ? movie.rating.toFixed(1) : 'N/A'}</span>
                    </div>
                </div>

                <div className="px-3 py-2 bg-transparent">
                    <h3 className="text-sm font-semibold text-white truncate" title={movie.title}>
                        {movie.title}
                    </h3>
                    {movie.startYear && (
                        <p className="mt-1 text-xs text-neutral-400">{movie.startYear}</p>
                    )}
                </div>
            </article>
        </Link>
    );
}
