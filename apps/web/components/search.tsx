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

    useEffect(() => {
        return () => {
            // cancelar debounce si la lib lo expone
            // @ts-ignore
            debounced.cancel?.();
        };
    }, [debounced]);

    return (
        <form className="flex gap-2">
            <input
                type="text"
                className="border rounded px-3 py-2 flex-1"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </form>
    );
}
