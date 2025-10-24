import { ImdbMovie } from "@/server/models/external/imdb-movie";
import { ImdbMovieDetail } from '@/server/models/external/imdb-movie-detail'
import { Movie } from "@/server/models/domain/movie";
import { MovieDetail, Thumbnail } from "@/server/models/domain/movie-detail";

const defaultImage = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';

export function mapImdbMovieToMovie(external: ImdbMovie): Movie {
    return {
        id: external.id,
        title: external.primaryTitle ?? external.originalTitle,
        posterUrl: external.primaryImage ?? defaultImage,
        description: external.description ?? '',
        trailerUrl: external.trailer ?? '',
        rating: external.averageRating ?? 0.0,
        startYear: external.startYear
    };
}


export function mapImdbMovieDetailToMovieDetail(external: ImdbMovieDetail): MovieDetail {
    const safeString = (s?: string | null) => s ?? '';
    const safeNumber = (n?: number | null) => n ?? 0;

    const parseDate = (s?: string) => {
        if (!s) return new Date(0);
        const d = new Date(s);
        return isNaN(d.getTime()) ? new Date(0) : d;
    };

    const mapThumbnail = (t?: { url?: string; width?: number; height?: number }): Thumbnail => ({
        url: t?.url ?? defaultImage,
        width: t?.width ?? 0,
        height: t?.height ?? 0,
    });

    const mapDirector = (d?: { id?: string; url?: string; fullName?: string }) => ({
        id: d?.id ?? '',
        url: d?.url ?? '',
        fullName: d?.fullName ?? '',
    });

    const mapProduction = (p?: { id?: string; name?: string }) => ({
        id: p?.id ?? '',
        name: p?.name ?? '',
    });

    const mapCast = (c?: any) => ({
        id: c?.id ?? '',
        url: c?.url ?? '',
        fullName: c?.fullName ?? '',
        primaryImage: c?.primaryImage ?? defaultImage,
        thumbnails: (c?.thumbnails ?? []).map(mapThumbnail),
        job: c?.job ?? '',
        characters: c?.characters ?? [],
    });

    return {
        id: safeString(external.id),
        url: safeString(external.url),
        primaryTitle: safeString(external.primaryTitle),
        originalTitle: safeString(external.originalTitle),
        type: safeString(external.type),
        description: safeString(external.description ?? ''),
        primaryImage: external.primaryImage ?? defaultImage,
        thumbnails: (external.thumbnails ?? []).map(mapThumbnail),
        trailer: safeString(external.trailer),
        startYear: safeNumber(external.startYear),
        releaseDate: parseDate(external.releaseDate),
        interests: external.interests ?? [],
        countriesOfOrigin: external.countriesOfOrigin ?? [],
        externalLinks: external.externalLinks ?? [],
        spokenLanguages: external.spokenLanguages ?? [],
        filmingLocations: external.filmingLocations ?? [],
        productionCompanies: (external.productionCompanies ?? []).map(mapProduction),
        grossWorldwide: safeNumber(external.grossWorldwide),
        genres: external.genres ?? [],
        isAdult: external.isAdult ?? false,
        runtimeMinutes: safeNumber(external.runtimeMinutes),
        averageRating: safeNumber(external.averageRating),
        numVotes: safeNumber(external.numVotes),
        directors: (external.directors ?? []).map(mapDirector),
        writers: (external.writers ?? []).map(mapDirector),
        cast: (external.cast ?? []).map(mapCast),
    };
}