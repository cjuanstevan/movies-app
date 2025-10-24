import type { NextApiRequest, NextApiResponse } from 'next';
import { RapidApiClient } from '../../server/clients/rapid-api/rapid-api.client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const q = Array.isArray(req.query.q) ? req.query.q[0] : (req.query.q as string | undefined);
        const page = Number(req.query.page ?? 1);

        const client = new RapidApiClient({
            key: process.env.RAPIDAPI_KEY!,
            host: process.env.RAPIDAPI_HOST,
            baseUrl: process.env.RAPIDAPI_BASE_URL!
        });

        const items = await client.searchMovies(q, page);
        res.status(200).json({ ok: true, items, flag: true });
    } catch (err: any) {
        console.error('test-rapid error', err);
        res.status(500).json({ ok: false, message: err.message ?? 'error' });
    }
}
