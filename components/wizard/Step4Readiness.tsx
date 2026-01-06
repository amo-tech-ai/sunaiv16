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
    <div className="space-y-12 animate-fade-enter-active pb-24">
      <header className="space-y-6">
        <h1 className="text-5xl font-serif leading-tight">Operational Audit</h1>
        <div className="max-w-md h-px bg-gradient-to-r from-red-500 to-transparent"></div>
        <p className="text-lg text-[#666] font-light font-body-serif italic max-w-lg leading-relaxed">
          Evaluating implementation risk and the distance between vision and execution.
        </p>
      </header>

      {isLoading ? (
        <ReadinessSkeleton />
      ) : (
        <>
          {/* Main Scoring Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-10">
            {/* Visual Column */}
            <div className="flex flex-col items-center space-y-10 bg-[#FAF8F6] p-12 border border-[#EFE9E4] relative overflow-hidden">
              <RadarChart scores={assessment.areaScores} />
              
              <div className="text-center relative z-10">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA] mb-2 block">Aggregate Scale Score</span>
                <div className="text-8xl font-serif leading-none text-[#1A1A1A]">{assessment.score}</div>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${assessment.confidence.level === 'High' ? 'bg-green-500' : assessment.confidence.level === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">Auditor Confidence: {assessment.confidence.level}</span>
                  </div>
                  <p className="text-[10px] text-[#999] font-body-serif italic max-w-[220px] leading-relaxed">
                    "{assessment.confidence.reason}"
                  </p>
                </div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            {/* Narrative Column */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif italic text-[#1A1A1A] leading-tight border-l-4 border-[#1A1A1A] pl-6">
                  {assessment.score > 75 ? "Strategic Alignment Validated" : "Critical Friction Detected"}
                </h2>
                <p className="text-lg font-light text-[#444] font-body-serif leading-relaxed italic">
                  “{assessment.feedback}”
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA]">Maturity Dimensions</h4>
                <div className="space-y-6">
                  {[
                    { label: 'Data Readiness', value: assessment.areaScores.data },
                    { label: 'Infrastructure', value: assessment.areaScores.infrastructure },
                    { label: 'Team Culture', value: assessment.areaScores.culture }
                  ].map((dim) => (
                    <div key={dim.label} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                        <span>{dim.label}</span>
                        <span>{dim.value}%</span>
                      </div>
                      <div className="h-1 bg-[#EFE9E4] w-full">
                        <div className="h-full bg-[#1A1A1A] transition-all duration-1000" style={{ width: `${dim.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phase 0 vs Wins Split View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 border-t border-[#EFE9E4]">
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-600">Phase 0 Remediation Actions</h4>
              </div>
              <div className="space-y-4">
                {(assessment.phase0Actions || assessment.risks || []).map((action: string, i: number) => (
                  <div key={i} className="p-6 bg-red-50/20 border border-red-100 flex gap-4 items-start">
                    <span className="text-red-600 font-serif text-xl leading-none font-bold">!</span>
                    <p className="text-sm font-medium text-[#444] leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-green-600">Strategic Accelerators</h4>
              </div>
              <div className="space-y-4">
                {(assessment.quickWins || assessment.wins || []).map((win: string, i: number) => (
                  <div key={i} className="p-6 bg-green-50/20 border border-green-100 flex gap-4 items-start">
                    <span className="text-green-500 font-serif text-xl leading-none">✓</span>
                    <p className="text-sm font-medium text-[#444] leading-relaxed">{win}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-6 pt-16">
            <button 
              onClick={prevStep}
              className="flex-1 py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
            >
              ← Adjust Architecture
            </button>
            <button 
              onClick={nextStep}
              className="flex-[2] py-6 text-[10px] uppercase tracking-[0.4em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-2xl shadow-amber-900/10"
            >
              Construct Execution Roadmap →
            </button>
          </div>
        </>
      )}
    </div>
  );
};
