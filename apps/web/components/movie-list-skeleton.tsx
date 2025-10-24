export default function MovieListSkeleton() {
    return (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-2">
                    <div className="h-40 bg-neutral-800 rounded-lg shadow-inner" />
                    <div className="h-4 bg-neutral-800 rounded w-3/4" />
                </div>
            ))}
        </div>
    );
}