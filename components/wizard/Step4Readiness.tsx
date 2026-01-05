import React from 'react';
import { UserData } from '../../types';
import { RadarChart } from '../ui/RadarChart';
import { ReadinessSkeleton } from '../ui/SkeletonLoading';

interface StepProps {
  data: UserData;
  nextStep: () => void;
  prevStep: () => void;
  assessment: any;
}

export const Step4Readiness: React.FC<StepProps> = ({ data, nextStep, prevStep, assessment }) => {
  const isLoading = !assessment;

  return (
    <div className="space-y-12 text-center py-6 animate-fade-enter-active">
      <header className="space-y-6">
        <h1 className="text-5xl font-serif">Readiness Audit</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">“Measuring the distance between your operations and automated scale.”</p>
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
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mt-2">Scale Score</span>
              </div>
              
              {/* Confidence Labeler (Prompt 08) */}
              <div className="pt-4 border-t border-[#EFE9E4] w-full max-w-xs">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${assessment.confidence.level === 'High' ? 'bg-green-500' : assessment.confidence.level === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">Confidence: {assessment.confidence.level}</span>
                 </div>
                 <p className="text-[10px] text-[#999] font-body-serif italic leading-relaxed">{assessment.confidence.reason}</p>
              </div>
            </div>

            <div className="text-left space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif italic text-[#1A1A1A] leading-tight">
                  Audit Findings
                </h2>
                <p className="text-base font-light text-[#555] font-body-serif leading-relaxed">
                  {assessment.feedback}
                </p>
              </div>

              <div className="bg-[#FAF8F6] p-8 border border-[#EFE9E4] space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA]">Key Dimensions</h4>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>Data Maturity</span>
                        <span>{assessment.areaScores.data}%</span>
                      </div>
                      <div className="h-1 bg-[#EFE9E4] w-full"><div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.data}%` }}></div></div>
                   </div>
                   <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>Systems</span>
                        <span>{assessment.areaScores.infrastructure}%</span>
                      </div>
                      <div className="h-1 bg-[#EFE9E4] w-full"><div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.infrastructure}%` }}></div></div>
                   </div>
                   <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>Culture</span>
                        <span>{assessment.areaScores.culture}%</span>
                      </div>
                      <div className="h-1 bg-[#EFE9E4] w-full"><div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.culture}%` }}></div></div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] border-l-2 border-red-400 pl-4">Critical Risks</h4>
              <div className="space-y-3">
                {assessment.risks.map((risk: string, i: number) => (
                  <div key={i} className="p-4 bg-red-50/30 border border-red-100 flex gap-3 items-start">
                    <span className="text-red-500 font-bold">!</span>
                    <p className="text-sm font-medium text-[#444]">{risk}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] border-l-2 border-green-400 pl-4">Quick Wins</h4>
              <div className="space-y-3">
                {assessment.wins.map((win: string, i: number) => (
                  <div key={i} className="p-4 bg-green-50/30 border border-green-100 flex gap-3 items-start">
                    <span className="text-green-500 font-bold">✓</span>
                    <p className="text-sm font-medium text-[#444]">{win}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-12">
            <button 
              onClick={prevStep}
              className="flex-1 py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
            >
              ← Adjust Architecture
            </button>
            <button 
              onClick={nextStep}
              className="flex-[2] py-6 text-sm uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
            >
              Construct Execution Plan →
            </button>
          </div>
        </>
      )}
    </div>
  );
};