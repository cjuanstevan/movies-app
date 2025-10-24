'use client';

import { MovieDetail } from "@/server/models/domain/movie-detail";
import { formatDateToLocal, minutesToHuman } from "@/lib/utils";
import MovieRating from "@/components/movie-rating";

export default function MovieHeader({ movie }: { movie: MovieDetail }) {

    const genres = movie.genres.map((g) => g).join(', ');
    const directors = movie.directors.map(d => d.fullName).join(', ');
    const writers = movie.writers.map(w => w.fullName).join(', ');

    return (
        <section className="bg-gradient-to-r from-[#0d253f] to-[#1c3a52] text-white p-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Poster */}
                <div className="flex-shrink-0">
                    <img
                        src={movie.primaryImage}
                        alt={`${movie.primaryTitle}-poster`}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Detalles */}
                <div className="flex flex-col justify-between">
                    {/* Título y metadata */}
                    <div>
                        <h1 className="text-3xl font-bold">{movie.primaryTitle} <span className="font-normal text-gray-300">({movie.startYear})</span></h1>
                        <p className="text-sm text-gray-300 mt-1">{formatDateToLocal(`${movie.releaseDate}`)} • {genres} • {minutesToHuman(movie.runtimeMinutes)}</p>
                    </div>

                    {/* Puntuación + Botones */}
                    <div className="mt-4 flex items-center gap-6 flex-wrap">

                        {/* Círculo de puntuación */}
                        <MovieRating averageRating={movie.averageRating} />

                        {/* Otros */}
                        <button className="flex items-center border-none text-[#c5d3df] text-sm px-4 py-2 rounded 
                            font-medium hover:bg-black transition cursor-pointer">
                            {/* <PlayIcon className="h-5" /> */}
                            <p>Play trailer</p>
                        </button>
                    </div>

                    {/* Resumen */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Overview</h2>
                        <p className="text-sm text-gray-200 leading-relaxed">
                            {movie.description}
                        </p>
                    </div>

                    {/* Créditos */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300">
                        <div>
                            <p className="text-white font-semibold truncate line-clamp-1">{directors}</p>
                            <p>Directors</p>
                        </div>
                        <div>
                            <p className="text-white font-semibold truncate line-clamp-1">{writers}</p>
                            <p>Writers</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
