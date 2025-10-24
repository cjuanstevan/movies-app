import ActingCard from "@/components/acting-card";
import type { Cast } from "@/server/models/domain/movie-detail";

export default function CastList({ cast }: { cast: Cast[] }) {

    const actors = cast.filter((x => x.job == 'actor' || x.job == 'actress'));

   return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:scroll-smooth md:whitespace-nowrap md:gap-4">
        {actors?.map((c, index) => (
          <div key={`${c.id}-${index}`} className="md:flex-shrink-0 md:inline-block">
            <ActingCard cast={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
