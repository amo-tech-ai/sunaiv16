import React from 'react';
import { UserData } from '../../types';
import { RoadmapSkeleton } from '../ui/SkeletonLoading';

interface StepProps {
  data: UserData;
  prevStep: () => void;
  onLaunch: () => void;
}

export const Step5Roadmap: React.FC<StepProps> = ({ data, prevStep, onLaunch }) => {
  const isLoading = !data.roadmap;

  return (
    <div className="space-y-16 animate-fade-enter-active pb-24">
      <header className="space-y-6">
        <h1 className="text-5xl font-serif leading-tight">Strategy Sequencer</h1>
        <div className="max-w-md h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
        <p className="text-lg text-[#666] font-light font-body-serif italic max-w-lg leading-relaxed">
          The exact flight path to turn vision into operational reality. Phased for maximum ROI.
        </p>
      </header>

      {isLoading ? (
        <RoadmapSkeleton />
      ) : (
        <div className="space-y-20 relative pt-10">
          {/* Main Vertical Timeline Border */}
          <div className="absolute left-[7px] top-10 bottom-0 w-px bg-[#D1C7BD] hidden md:block"></div>

          {data.roadmap?.map((phase, idx) => (
            <div key={idx} className="relative md:pl-16 last:pb-0 group">
              {/* Timeline Node */}
              <div className="hidden md:block absolute left-[-1.5px] top-0 w-4 h-4 rounded-full bg-[#1A1A1A] transition-transform group-hover:scale-125 ring-4 ring-[#FDFCFB]" />
              
              <div className="space-y-10">
                <header className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-amber-600 font-bold">Month 0{idx + 1}</span>
                    <div className="h-px w-8 bg-[#EFE9E4]"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#AAA] font-bold">{phase.duration}</span>
                  </div>
                  <h3 className="text-4xl font-serif text-[#1A1A1A]">{phase.title}</h3>
                  <div className="inline-flex items-center gap-2 bg-[#FAF8F6] px-4 py-2 border border-[#EFE9E4]">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-amber-700">Projected Phase ROI:</span>
                    <span className="text-xs font-bold text-[#1A1A1A] tracking-tight">{phase.roiProjection}</span>
                  </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {phase.outcomes.map((outcome, oIdx) => (
                    <div key={oIdx} className="p-8 border border-[#EFE9E4] bg-white flex items-start gap-5 transition-all hover:border-[#1A1A1A] group/item shadow-sm hover:shadow-md">
                      <div className="w-5 h-5 flex-shrink-0 border border-amber-200 bg-amber-50 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 font-serif text-sm leading-none pt-0.5">✓</span>
                      </div>
                      <p className="text-sm text-[#1A1A1A] font-medium leading-relaxed font-body-serif italic">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-20 border-t border-[#EFE9E4] space-y-10">
             <div className="max-w-xl mx-auto text-center space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA]">The Final Word</h4>
                <p className="text-xl text-[#1A1A1A] font-body-serif italic leading-relaxed">
                  “This plan prioritized stability first. By clearing the operational clutter in Month 1, we ensure the growth engines deployed in Month 2 don't break your business culture.”
                </p>
             </div>

             <div className="flex flex-col md:flex-row gap-6">
                <button 
                  onClick={prevStep}
                  className="flex-1 py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
                >
                  ← Re-audit Readiness
                </button>
                <button 
                  onClick={onLaunch}
                  className="flex-[2] py-6 text-[10px] uppercase tracking-[0.4em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-2xl shadow-amber-900/10"
                >
                  Initialize Strategic Dashboard →
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
