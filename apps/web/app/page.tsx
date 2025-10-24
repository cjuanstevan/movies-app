'use client';

import { useState } from "react";
import SearchBox from "@/components/search-box";
import Search from "@/components/search";

export default function Page() {

  const [query, setQuery] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Películas
          </h1>
          <p className="mt-2 text-sm text-neutral-400">Explora, busca y descubre grandes títulos.</p>

          <div className="w-full mt-6 max-w-xl">
            <Search
              placeholder="Buscar película..."
              debounceMs={500}
              onChange={(v) => setQuery(v.trim())}
            />
          </div>
        </header>

        <section className="w-full mt-10">
          <SearchBox query={query} />
        </section>
      </div>
    </main>
  );
}
