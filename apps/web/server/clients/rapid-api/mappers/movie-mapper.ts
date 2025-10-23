import { ImdbMovie } from "@/server/models/external/imdb-movie";
import { Movie } from "@/server/models/domain/movie";

export function mapImdbMovieToMovie(external: ImdbMovie): Movie {
    return {
        id: external.id,
        title: external.primaryTitle ?? external.originalTitle,
        posterUrl: external.primaryImage ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg',
        description: external.description ?? '',
        trailerUrl: external.trailer ?? '',
        rating: external.averageRating ?? 0.0
    };
}