import type { Cast } from "@/server/models/domain/movie-detail";

export default function ActingCard({ cast }: { cast: Cast }) {
    return (
        <div key={`acting-card-${cast.id}`} className="inline-block p-0 m-2 w-40 rounded-lg">
            <div className="bg-gradient-to-r from-[#0d253f] to-[#1c3a52] text-white rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative w-full h-48 overflow-hidden rounded-md">
                    <img
                        src={cast.primaryImage}
                        alt={cast.fullName}
                        className="w-full h-full object-fill"
                    />
                </div>
                <div className="px-2 py-1">
                    <div title={cast.fullName} className="text-white font-semibold text-sm text-shadow-md mb-1 line-clamp-2">
                        {cast.fullName}
                    </div>
                </div>
            </div>
        </div>
    );
}