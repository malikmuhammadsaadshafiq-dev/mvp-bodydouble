"use client";

export function SkeletonCard() {
  return (
    <div className="bg-[#141414] rounded-[20px] border border-white/[0.08] p-6 overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-6 w-3/4 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-1/2 rounded-lg skeleton-shimmer" />
        </div>
        <div className="h-6 w-16 rounded-full skeleton-shimmer" />
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full rounded-lg skeleton-shimmer" />
        <div className="h-4 w-5/6 rounded-lg skeleton-shimmer" />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="h-4 w-20 rounded-lg skeleton-shimmer" />
        <div className="h-4 w-24 rounded-lg skeleton-shimmer" />
        <div className="h-4 w-24 rounded-lg skeleton-shimmer" />
      </div>

      <div className="h-10 w-full rounded-full skeleton-shimmer" />
    </div>
  );
}