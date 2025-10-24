import ActingCard from "@/components/acting-card";
import type { Cast } from "@/server/models/domain/movie-detail";

export default function CastList({ cast }: { cast: Cast[] }) {

    const actors = cast.filter((x => x.job == 'actor' || x.job == 'actress'));

    return (
        <>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                <div className="overflow-x-scroll scroll-smooth whitespace-nowrap">
                    {actors?.map((cast, index) => (
                        <ActingCard key={`${cast.id}-${index}`} cast={cast} />
                    ))}
                </div>
            </div>
        </>
    );
}
