
import React from 'react';
import { UserData } from '../../../types';

interface TabProps {
  userData: UserData;
}

export const RoadmapTab: React.FC<TabProps> = ({ userData }) => {
  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-4">
        <h1 className="text-4xl font-serif leading-tight">Strategy Roadmap</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">
          “A structured sequence to move from friction to automated scale.”
        </p>
      </header>

      <div className="space-y-16">
        {userData.roadmap?.map((phase, idx) => (
          <div key={idx} className="relative pl-12 border-l border-[#D1C7BD] pb-12 last:pb-0 group">
            <div className={`absolute left-[-7px] top-0 w-3.5 h-3.5 rounded-full transition-all group-hover:scale-125 ${idx === 0 ? 'bg-amber-400 ring-4 ring-amber-50' : 'bg-[#1A1A1A]'}`} />
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${idx === 0 ? 'text-amber-600' : 'text-[#AAA]'}`}>
                  Phase 0{idx + 1}
                </span>
                <span className="text-[10px] text-[#CCC]">—</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#AAA] font-bold">{phase.duration}</span>
              </div>
              <h3 className="text-3xl font-serif">{phase.title}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {phase.outcomes.map((outcome, oIdx) => (
                <div key={oIdx} className="p-6 border border-[#EFE9E4] bg-white flex items-start gap-4 transition-all hover:border-amber-200">
                  <span className="text-amber-500 font-serif text-xl opacity-40">✓</span>
                  <p className="text-sm text-[#1A1A1A] font-medium leading-relaxed font-body-serif">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
