import PQueue from "p-queue";
import pRetry from "p-retry";
import { ImdbMovieSchema } from "@/server/models/external/imdb-movie";
import { ImdbMovieDetailSchema } from "@/server/models/external/imdb-movie-detail";
import type { Movie } from "@/server/models/domain/movie";
import { MovieDetail } from "@/server/models/domain/movie-detail";
import { mapImdbMovieToMovie } from "./mappers/movie-mapper";
import { mapImdbMovieDetailToMovieDetail } from "./mappers/movie-mapper";

type Config = {
    key: string;
    host?: string;
    baseUrl: string;
};

const queue = new PQueue({ concurrency: 5 });

function ensureTrailingSlash(s: string) {
    return s.endsWith('/') ? s : s + '/';
}

export class RapidApiClient {
    private key: string;
    private host?: string;
    private baseUrl: string;

    constructor(cfg: Config) {
        if (!cfg.key) throw new Error('RAPIDAPI_KEY required');
        if (!cfg.baseUrl) throw new Error('RAPIDAPI_BASE_URL required and must include scheme (https://...)');

        this.key = cfg.key;
        this.baseUrl = ensureTrailingSlash(cfg.baseUrl);

        if (cfg.host && cfg.host.length > 0) {
            this.host = cfg.host;
        } else {
            try {
                const u = new URL(this.baseUrl);
                this.host = u.hostname;
            } catch (err) {
                throw new Error(
                    'RAPIDAPI_BASE_URL is invalid. Provide a valid URL with scheme (e.g. https://example-api.p.rapidapi.com/imdb/), or set RAPIDAPI_HOST explicitly.'
                );
            }
        }
    }

    private buildHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'X-RapidAPI-Key': this.key,
            Accept: 'application/json'
        };

        if (this.host) headers['X-RapidAPI-Host'] = this.host;

        return headers;
    }

    private async rawFetch(relativePath: string, params?: Record<string, any>) {
        const url = new URL(relativePath, this.baseUrl);
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
            });
        }

        const headers = this.buildHeaders();

        return queue.add(() =>
            pRetry(
                async () => {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 7000);

                    try {
                        const res = await fetch(url.toString(), {
                            method: 'GET',
                            headers,
                            signal: controller.signal
                        });

                        console.log("RESPONSE: ", res.headers.get('x-ratelimit-requests-remaining'));

                        if (res.status === 429) {
                            const e: any = new Error('Error al consultar la API externa (Rate limit)');
                            e.code = res.status;
                            throw e;
                        }
                        if (!res.ok) {
                            const body = await res.text().catch(() => '');
                            const e: any = new Error(`External API error ${res.status}`);
                            e.code = res.status;
                            e.body = body;
                            throw e;
                        }
                        return res.json();
                    } finally {
                        clearTimeout(timeoutId);
                    }
                },
                { retries: 1, factor: 2, minTimeout: 300, maxTimeout: 2000 }
            )
        );
    }


    async searchMovies(q?: string, page = 1): Promise<Movie[]> {
        const params: Record<string, any> = {
            type: 'movie',
            rows: 20,
            sortOrder: 'ASC',
            sortField: 'id'
        };

        if (q && q.trim()) {
            params.primaryTitle = q.trim();
        }

        const data: any = await this.rawFetch('search', params);
        const list = data ?? {};

        const parsed = ImdbMovieSchema.array().parse(list.results);
        const movies = parsed.map(mapImdbMovieToMovie);

        // Filtro solamente por motivos de Api con poca información
        return movies.filter((m => m.rating > 0));
    }

    async getItemById(id: string): Promise<MovieDetail> {
        const data: any = await this.rawFetch(`${encodeURIComponent(id)}`);
        const parsed = ImdbMovieDetailSchema.parse(data);
        const movieDetail = mapImdbMovieDetailToMovieDetail(parsed);
        return movieDetail;
    }
}