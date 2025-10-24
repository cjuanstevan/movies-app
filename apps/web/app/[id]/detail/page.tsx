'use client';

import { useParams } from "next/navigation";
import { useGetItem } from "@/hooks/useGetItem";
import MovieHeader from "@/components/movie-header";
import CastList from "@/components/cast-list";
import DetailSkeleton from '@/components/detail-skeleton';

export default function Page() {
    const params = useParams();
    const id = params?.id as string;

    const { data, isLoading, error } = useGetItem(id);

    return (
        <>
            <div className="">
                {isLoading && <DetailSkeleton />}
                {error && <p className="mt-4 text-red-600">Error: {error.message}</p>}
            </div>

            <div className="">
                {data && (
                    <>
                        <MovieHeader movie={data.item} />
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                            <h3 className="font-bold text-2xl mx-2 mt-5">Reparto principal</h3>
                        </div>
                        <div className="w-full mx-auto flex flex-col md:flex-row gap-8">
                            <CastList key={`cast-${data.id}`} cast={data.item.cast} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}