import { z } from 'zod';

export const ThumbnailSchema = z.object({
    "url": z.string().optional(),
    "width": z.number().optional(),
    "height": z.number().optional(),
});
export type Thumbnail = z.infer<typeof ThumbnailSchema>;

export const DirectorSchema = z.object({
    "id": z.string().optional(),
    "url": z.string().optional(),
    "fullName": z.string().optional(),
});
export type Director = z.infer<typeof DirectorSchema>;

export const ProductionCompanySchema = z.object({
    "id": z.string().optional(),
    "name": z.string().optional(),
});
export type ProductionCompany = z.infer<typeof ProductionCompanySchema>;

export const CastSchema = z.object({
    "id": z.string().optional(),
    "url": z.string().optional(),
    "fullName": z.string().optional(),
    "primaryImage": z.union([z.null(), z.string()]).optional(),
    "thumbnails": z.array(ThumbnailSchema).optional(),
    "job": z.string().optional(),
    "characters": z.array(z.string()).optional(),
});
export type Cast = z.infer<typeof CastSchema>;

export const ImdbMovieDetailSchema = z.object({
    "id": z.string(),
    "url": z.string().optional(),
    "primaryTitle": z.string().optional(),
    "originalTitle": z.string().optional(),
    "type": z.string().optional(),
    "description": z.string().nullable(),
    "primaryImage": z.string().optional(),
    "thumbnails": z.array(ThumbnailSchema).optional(),
    "trailer": z.string().nullable(),
    "startYear": z.number().optional(),
    "endYear": z.null().nullable(),
    "releaseDate": z.string().nullable(),
    "interests": z.array(z.string()).optional(),
    "countriesOfOrigin": z.array(z.string()).optional(),
    "externalLinks": z.array(z.any()).optional(),
    "spokenLanguages": z.array(z.string()).optional(),
    "filmingLocations": z.array(z.any()).optional(),
    "productionCompanies": z.array(ProductionCompanySchema).optional(),
    "grossWorldwide": z.number().nullable(),
    "genres": z.array(z.string()).optional(),
    "isAdult": z.boolean().optional(),
    "runtimeMinutes": z.number().nullable(),
    "averageRating": z.number().optional(),
    "numVotes": z.number().optional(),
    "directors": z.array(DirectorSchema).optional(),
    "writers": z.array(DirectorSchema).optional(),
    "cast": z.array(CastSchema).optional(),
});
export type ImdbMovieDetail = z.infer<typeof ImdbMovieDetailSchema>;
