import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="p-8 border border-[#EFE9E4] bg-[#FAF8F6] animate-pulse space-y-4">
    <div className="h-8 bg-[#EFE9E4] w-1/3"></div>
    <div className="h-4 bg-[#EFE9E4] w-full"></div>
    <div className="h-4 bg-[#EFE9E4] w-2/3"></div>
    <div className="h-3 bg-[#EFE9E4] w-1/4 mt-6"></div>
  </div>
);

export const RoadmapSkeleton: React.FC = () => (
  <div className="py-24 text-center space-y-8">
    <div className="flex justify-center gap-2">
      <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
      <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce [animation-delay:0.4s]"></div>
    </div>
    <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#AAA]">Architecting Strategic Sequencing...</p>
  </div>
);

export const ReadinessSkeleton: React.FC = () => (
  <div className="py-24 space-y-8 text-center">
    <div className="w-24 h-24 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
    <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#AAA]">Synthesizing Operational Audit...</p>
  </div>
);
