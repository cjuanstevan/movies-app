import { LRUCache } from "lru-cache";

const MAX_ITEMS = Number(process.env.CACHE_MAX_ITEMS ?? 200);
const TTL_SEARCH = Number(process.env.CACHE_TTL_SEARCH_MS ?? 1000 * 60 * 5);
const TTL_DETAIL = Number(process.env.CACHE_TTL_DETAIL_MS ?? 1000 * 60 * 30);

const cache = new LRUCache<string, any>({
  max: 100,
  ttl: 1000 * 60 * 10
});

const searchCache = new LRUCache<string, any>({
  max: MAX_ITEMS,
  ttl: TTL_SEARCH,
});

const detailCache = new LRUCache<string, any>({
  max: MAX_ITEMS,
  ttl: TTL_DETAIL,
});

export function getFromCache<T>(key: string, type: "search" | "detail"): T | undefined {
  const cache = type === "search" ? searchCache : detailCache;
  const data = cache.get(key);
  if (data && process.env.NODE_ENV === "development") {
    console.log(`[GET CACHE][${type}] ${key}`);
  }
  return data;
}

export function setToCache<T>(key: string, value: T, type: "search" | "detail") {
  const cache = type === "search" ? searchCache : detailCache;
  cache.set(key, value);
  if (process.env.NODE_ENV === "development") {
    console.log(`[SET CACHE][${type}] ${key}`);
  }
}