const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    {/* Title skeleton */}
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="skeleton-shimmer h-5 w-2/3 rounded-md"></div>
      <div className="flex items-center gap-1">
        <div className="skeleton-shimmer h-8 w-8 rounded-lg"></div>
        <div className="skeleton-shimmer h-8 w-8 rounded-lg"></div>
      </div>
    </div>
    {/* Description skeleton */}
    <div className="space-y-2 mb-4">
      <div className="skeleton-shimmer h-3 w-full rounded"></div>
      <div className="skeleton-shimmer h-3 w-4/5 rounded"></div>
    </div>
    {/* Badges skeleton */}
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <div className="skeleton-shimmer h-6 w-16 rounded-full"></div>
      <div className="skeleton-shimmer h-6 w-14 rounded-full"></div>
    </div>
    {/* Due date skeleton */}
    <div className="flex items-center gap-1.5">
      <div className="skeleton-shimmer h-4 w-4 rounded"></div>
      <div className="skeleton-shimmer h-4 w-28 rounded"></div>
    </div>
  </div>
);

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonLoader;

