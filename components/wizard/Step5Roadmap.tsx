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
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Your 90-day execution plan</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">“Phased initialization prioritized for maximum ROI.”</p>
      </header>

      {isLoading ? (
        <RoadmapSkeleton />
      ) : (
        <div className="space-y-12">
          {data.roadmap?.map((phase, idx) => (
            <div key={idx} className="relative pl-12 border-l border-[#D1C7BD] pb-12 last:pb-0 group">
              <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-[#1A1A1A] transition-transform group-hover:scale-125" />
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold mb-2 block">Phase {idx + 1} — {phase.duration}</span>
                <h3 className="text-3xl font-serif">{phase.title}</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {phase.outcomes.map((outcome, oIdx) => (
                  <li key={oIdx} className="p-6 border border-[#EFE9E4] bg-[#FAF8F6] flex items-start gap-4 text-[#1A1A1A] font-medium text-sm leading-relaxed transition-all hover:border-amber-200">
                    <span className="text-amber-500 mt-0.5">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-12 border-t border-[#EFE9E4]">
             <button 
              onClick={onLaunch}
              className="w-full py-6 text-sm uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
            >
              Initialize Strategic Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
