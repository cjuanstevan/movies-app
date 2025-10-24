'use client';

import { useParams } from "next/navigation";
import { useGetItem } from "@/hooks/useGetItem";
import MovieHeader from "@/components/movie-header";
import CastList from "@/components/cast-list";
import DetailSkeleton from '@/components/detail-skeleton';
import { ErrorAlert } from "@workspace/ui/components/error-alert";

export default function Page() {
    const params = useParams();
    const id = params?.id as string;

    const { data, isLoading, error } = useGetItem(id);

    return (
        <>
            <div className="">
                {isLoading && <DetailSkeleton />}
                {error && <ErrorAlert key={`error`} message={`${error.message}`} />}
            </div>

            {data && (
                <>
                    <MovieHeader movie={data.item} />
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                        <h3 className="font-bold text-2xl my-5">Reparto principal</h3>
                    </div>
                    <div className="w-full mx-auto flex flex-col md:flex-row gap-8">
                        <CastList key={`cast-${data.item.id}`} cast={data.item.cast} />
                    </div>
                </>
            )}
        </>
    );
}