// apps/web/src/server/trpc/context.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { RapidApiClient } from '../clients/rapid-api/rapid-api.client';

type CreateContextArgs = {
    req: NextApiRequest;
    res: NextApiResponse;
};

export async function createContext({ req, res }: CreateContextArgs) {
    const key = process.env.RAPIDAPI_KEY;
    const baseUrl = process.env.RAPIDAPI_BASE_URL;
    const envHost = process.env.RAPIDAPI_HOST;

    if (!key) {
        throw new Error(
            'RAPIDAPI_KEY no está definido. Añade RAPIDAPI_KEY en .env.local (solo en servidor).'
        );
    }

    if (!baseUrl) {
        throw new Error(
            'RAPIDAPI_BASE_URL no está definido. Añade RAPIDAPI_BASE_URL en .env.local (ej: https://example-api.p.rapidapi.com/imdb/).'
        );
    }

    // Determinar host: prioridad envHost, si no existe derivar de baseUrl
    let host: string | undefined;
    if (envHost && envHost.trim().length > 0) {
        host = envHost.trim();
    } else {
        try {
            const u = new URL(baseUrl);
            host = u.hostname;
        } catch {
            throw new Error(
                'RAPIDAPI_BASE_URL no es una URL válida. Debe incluir esquema (ej: https://example-api.p.rapidapi.com/imdb/).'
            );
        }
    }

    const rapidApi = new RapidApiClient({
        key,
        host,
        baseUrl
    });

    return {
        req,
        res,
        rapidApi
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
