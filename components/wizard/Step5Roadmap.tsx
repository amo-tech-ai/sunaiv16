import React from 'react';
import { UserData } from '../../types';
import { RoadmapSkeleton } from '../ui/SkeletonLoading';

interface StepProps {
  data: UserData;
  onLaunch: () => void;
}

export const Step5Roadmap: React.FC<StepProps> = ({ data, onLaunch }) => {
  const isLoading = !data.roadmap;

  return (
    <div className="space-y-16 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Your 90-day execution plan</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">“The calculated sequence for operational transformation.”</p>
      </header>

      {isLoading ? (
        <RoadmapSkeleton />
      ) : (
        <div className="space-y-16">
          {data.roadmap?.map((phase, idx) => (
            <div key={idx} className="relative pl-12 border-l border-[#D1C7BD] pb-16 last:pb-0 group">
              <div className="absolute left-[-7px] top-0 w-3.5 h-3.5 rounded-full bg-[#1A1A1A] transition-transform group-hover:scale-125 ring-4 ring-[#FDFCFB]" />
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Phase 0{idx + 1}</span>
                  <div className="h-px w-12 bg-[#EFE9E4]"></div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#AAA] font-bold">{phase.duration}</span>
                </div>
                <h3 className="text-3xl font-serif">{phase.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {phase.outcomes.map((outcome, oIdx) => (
                  <div key={oIdx} className="p-8 border border-[#EFE9E4] bg-white flex items-start gap-4 transition-all hover:border-[#1A1A1A] group/item">
                    <span className="text-amber-500 font-serif text-xl opacity-40 group-hover/item:opacity-100 transition-opacity">✓</span>
                    <p className="text-sm text-[#1A1A1A] font-medium leading-relaxed font-body-serif">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-12 border-t border-[#EFE9E4] flex flex-col items-center gap-8">
            <p className="text-sm text-[#888] font-body-serif italic max-w-md text-center">
              “This plan is architected to prioritize high-leverage outcomes and foundational data integrity.”
            </p>
             <button 
              onClick={onLaunch}
              className="w-full py-6 text-sm uppercase tracking-[0.4em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
            >
              Launch Client Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
