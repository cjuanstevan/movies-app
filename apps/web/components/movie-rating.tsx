export default function MovieRating({ averageRating }: { averageRating: number }) {
    const rating = Math.max(0, Math.min(10, averageRating ?? 0));
    const ratio = rating / 10;
    const viewBoxSize = 64;
    const radius = 28;
    const stroke = 4;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - ratio);

    const colorClass = rating <= 3.9
        ? 'text-red-500'
        : rating >= 7.0
            ? 'text-green-600'
            : 'text-yellow-500';

    return (
        <div className={`relative w-16 h-16 ${colorClass}`}>
            <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="w-16 h-16 -rotate-90">
                {/* track */}
                <circle
                    cx={viewBoxSize / 2}
                    cy={viewBoxSize / 2}
                    r={radius}
                    stroke="#071520"
                    strokeWidth={stroke}
                    fill="none"
                />
                {/* progress */}
                <circle
                    cx={viewBoxSize / 2}
                    cy={viewBoxSize / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 350ms ease' }}
                />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${colorClass}`}>{rating.toFixed(1)}</span>
            </div>
        </div>

    );
}