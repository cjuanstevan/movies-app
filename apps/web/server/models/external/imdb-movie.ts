import { z } from 'zod';

export const ImdbMovieSchema = z.object({
    id: z.string(),
    primaryTitle: z.string(),
    originalTitle: z.string(),
    primaryImage: z.string().url().nullable(),
    description: z.string().nullable(),
    trailer: z.string().url().nullable(),
    averageRating: z.number().nullable(),
});

export type ImdbMovie = z.infer<typeof ImdbMovieSchema>;