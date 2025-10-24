import type { Cast } from "@/server/models/domain/movie-detail";

export default function ActingCard({ cast }: { cast: Cast }) {
    return (
    <div className="w-40 md:w-[140px] rounded-lg bg-gradient-to-r from-[#0d253f] to-[#1c3a52] shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
        <img
          src={cast.primaryImage}
          alt={cast.fullName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <h3 className="text-white text-sm font-medium line-clamp-2">{cast.fullName}</h3>
      </div>
    </div>
  );
}