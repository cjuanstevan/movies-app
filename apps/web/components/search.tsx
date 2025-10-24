'use client';

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

type Props = {
    placeholder?: string;
    debounceMs?: number;
    onChange?: (value: string) => void;
};

export default function Search({
    placeholder,
    debounceMs = 400,
    onChange,
}: Props) {

    const [value, setValue] = useState('');

    const debounced = useDebouncedCallback((v: string) => {
        onChange?.(v);
    }, debounceMs);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValue(v);
        debounced(v);
    };

    const handleClear = () => {
        setValue('');
        debounced.flush?.();
        onChange?.('');
    };

    useEffect(() => {
        return () => {
            debounced.cancel?.();
        };
    }, [debounced]);

    return (
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
                {/* ícono de búsqueda */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>
                </div>

                <input
                    type="text"
                    className="w-full bg-neutral-800/60 backdrop-blur-sm border border-neutral-700 placeholder-neutral-400 text-white rounded-full px-4 py-3 pl-12 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    aria-label={placeholder}
                />

                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        aria-label="Limpiar búsqueda"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white bg-neutral-700/30 hover:bg-neutral-700/40 rounded-full p-1 transition"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
}
