
import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="p-8 border border-[#EFE9E4] bg-[#FAF8F6] animate-pulse space-y-4">
    <div className="h-8 bg-[#EFE9E4] w-1/3"></div>
    <div className="h-4 bg-[#EFE9E4] w-full"></div>
    <div className="h-4 bg-[#EFE9E4] w-2/3"></div>
    <div className="h-3 bg-[#EFE9E4] w-1/4 mt-6"></div>
  </div>
);

export const DiagnosticSkeleton: React.FC = () => (
  <div className="space-y-16 animate-pulse">
    <div className="space-y-4">
      <div className="h-12 bg-[#EFE9E4] w-2/3"></div>
      <div className="h-6 bg-[#FAF8F6] w-1/2"></div>
    </div>
    <div className="space-y-12">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-6">
          <div className="h-4 bg-[#EFE9E4] w-32 border-l-2 border-amber-400 pl-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(j => (
              <div key={j} className="h-16 bg-white border border-[#EFE9E4]"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
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
