'use client';

import { useState } from "react";
import SearchBox from "@/components/SearchBox";
import Search from "@/components/search";

export default function Page() {

  const [query, setQuery] = useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Películas</h1>

        <div className="mt-4 w-full max-w-2xl">
          <Search
            placeholder="Buscar película..."
            debounceMs={500}
            onChange={(v) => setQuery(v.trim())}
          />
        </div>

        <SearchBox query={query} />
      </div>
    </div>
  );
}
