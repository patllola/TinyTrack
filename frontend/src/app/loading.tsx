export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 mb-3" />
            <div className="h-6 w-16 bg-gray-100 rounded mb-1" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* List skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, g) => (
          <div key={g}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-3 w-12 bg-gray-100 rounded" />
              <div className="flex-1 h-px bg-gray-100" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, c) => (
                <div key={c} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex justify-between mb-4">
                    <div className="h-6 w-20 bg-gray-100 rounded" />
                    <div className="h-8 w-8 bg-gray-100 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {Array.from({ length: 3 }).map((_, s) => (
                      <div key={s} className="text-center">
                        <div className="h-3 w-12 bg-gray-100 rounded mx-auto mb-2" />
                        <div className="h-5 w-16 bg-gray-100 rounded mx-auto" />
                      </div>
                    ))}
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
