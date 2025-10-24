export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    description: string;
    trailerUrl: string;
    rating: number;
    startYear?: number | null;
}