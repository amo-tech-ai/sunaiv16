import React from 'react';
import { UserData } from '../../types';
import { RadarChart } from '../ui/RadarChart';
import { ReadinessSkeleton } from '../ui/SkeletonLoading';

interface StepProps {
  data: UserData;
  nextStep: () => void;
  assessment: any;
}

export const Step4Readiness: React.FC<StepProps> = ({ data, nextStep, assessment }) => {
  const isLoading = !assessment;

  return (
    <div className="space-y-12 text-center py-6 animate-fade-enter-active">
      <header className="space-y-6">
        <h1 className="text-5xl font-serif">Readiness Audit</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">“Evaluating the friction between vision and execution.”</p>
      </header>

      {isLoading ? (
        <ReadinessSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center space-y-8">
              <RadarChart scores={assessment.areaScores} />
              <div className="flex flex-col items-center">
                <span className="text-7xl font-serif leading-none">{assessment.score}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mt-2">Aggregate Readiness</span>
              </div>
            </div>

            <div className="text-left space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif italic text-[#1A1A1A] leading-tight">
                  {assessment.score > 75 ? "Strategic Alignment Found" : "Structural Friction Detected"}
                </h2>
                <p className="text-base font-light text-[#555] leading-relaxed font-body-serif">
                  {assessment.feedback}
                </p>
              </div>

              <div className="bg-[#FAF8F6] p-8 border border-[#EFE9E4] space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mb-4">Dimension Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase">
                      <span className="text-[#999]">Data Maturity</span>
                      <span className="text-[#1A1A1A]">{assessment.areaScores.data}%</span>
                    </div>
                    <div className="h-1 bg-[#EFE9E4] w-full">
                      <div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.data}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase pt-2">
                      <span className="text-[#999]">Infrastructure</span>
                      <span className="text-[#1A1A1A]">{assessment.areaScores.infrastructure}%</span>
                    </div>
                    <div className="h-1 bg-[#EFE9E4] w-full">
                      <div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.infrastructure}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase pt-2">
                      <span className="text-[#999]">Org. Culture</span>
                      <span className="text-[#1A1A1A]">{assessment.areaScores.culture}%</span>
                    </div>
                    <div className="h-1 bg-[#EFE9E4] w-full">
                      <div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.culture}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 text-left">
            {assessment.criticalGaps?.length > 0 && (
              <div className="border-t border-[#EFE9E4] pt-8">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mb-6">Strategic Gap Remediation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessment.criticalGaps.map((gap: string, i: number) => (
                    <div key={i} className="p-5 border border-[#EFE9E4] bg-white flex items-start gap-4 shadow-sm">
                      <span className="text-amber-500 font-serif text-xl">!</span>
                      <p className="text-sm font-medium text-[#444] leading-relaxed">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={nextStep}
            className="w-full mt-12 py-6 text-sm uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
          >
            Construct Strategic Roadmap →
          </button>
        </>
      )}
    </div>
  );
};
