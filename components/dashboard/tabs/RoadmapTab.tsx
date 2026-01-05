
import React, { useState } from 'react';
import { UserData } from '../../../types';

interface TabProps {
  userData: UserData;
}

export const RoadmapTab: React.FC<TabProps> = ({ userData }) => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-4">
        <h1 className="text-5xl font-serif leading-tight text-[#1A1A1A]">Strategic Roadmap</h1>
        <p className="text-xl text-[#666] font-light font-body-serif italic">
          “A structured sequence to move from friction to automated scale.”
        </p>
      </header>

      <div className="space-y-4">
        {userData.roadmap?.map((phase, idx) => {
          const isExpanded = expandedPhase === idx;
          const isActive = idx === 0;

          return (
            <div 
              key={idx} 
              className={`border transition-all duration-500 ${
                isActive ? 'border-amber-200' : 'border-[#EFE9E4]'
              } ${isExpanded ? 'bg-white shadow-sm' : 'bg-[#FAF8F6] hover:bg-white'}`}
            >
              <button 
                onClick={() => setExpandedPhase(isExpanded ? null : idx)}
                className="w-full text-left p-8 flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 border flex items-center justify-center font-serif text-lg transition-colors ${
                    isActive ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#999] border-[#EFE9E4] group-hover:border-[#1A1A1A] group-hover:text-[#1A1A1A]'
                  }`}>
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${isActive ? 'text-amber-600' : 'text-[#AAA]'}`}>
                        {phase.duration}
                      </span>
                      {isActive && (
                        <span className="bg-amber-50 text-amber-700 text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 border border-amber-100">
                          Active Focus
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-serif text-[#1A1A1A]">{phase.title}</h3>
                  </div>
                </div>
                <span className={`text-2xl font-light transition-transform duration-300 text-[#CCC] group-hover:text-[#1A1A1A] ${isExpanded ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[1000px] border-t border-[#FAF8F6]' : 'max-h-0'
                }`}
              >
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
                  {phase.outcomes.map((outcome, oIdx) => (
                    <div key={oIdx} className="flex gap-4 items-start p-4 bg-[#FDFCFB] border border-[#F2F0EE]">
                      <span className="text-amber-500 font-serif text-lg leading-none pt-0.5">✓</span>
                      <p className="text-sm font-body-serif leading-relaxed text-[#444]">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
