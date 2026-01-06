
import React from 'react';
import { UserData, IntelligenceState } from '../../types';
import { DiagnosticSkeleton } from '../ui/SkeletonLoading';

interface StepProps {
  data: UserData;
  updateData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  intelligence: IntelligenceState;
  industryContent: any;
}

export const Step2Diagnostics: React.FC<StepProps> = ({ data, updateData, nextStep, prevStep, industryContent }) => {
  const isComplete = data.blocker && data.manualWork && data.speed && data.priority;
  const isLoading = !industryContent;

  if (isLoading) return <DiagnosticSkeleton />;

  const renderDiagnosticSection = (
    category: 'blocker' | 'manualWork' | 'speed' | 'priority', 
    label: string, 
    question: string,
    options: string[] = [], 
    aiSolutions: string[] = [],
    whyText: string
  ) => (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA] border-l-2 border-amber-400 pl-4">{label}</h2>
        <h3 className="text-2xl font-serif text-[#1A1A1A] leading-tight">{question}</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {(options || []).map((opt, idx) => {
          const isSelected = data[category] === opt;
          const solution = aiSolutions?.[idx];

          return (
            <div key={opt} className="space-y-3">
              <button 
                onClick={() => updateData({ [category]: opt })}
                className={`w-full text-left p-6 border transition-all duration-300 flex justify-between items-center group ${isSelected ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg shadow-amber-900/5' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                <span className="text-base font-medium tracking-tight leading-relaxed">{opt}</span>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isSelected ? 'bg-amber-400 scale-125' : 'bg-[#EFE9E4] group-hover:bg-[#D1C7BD]'}`}></div>
              </button>
              
              {isSelected && solution && (
                <div className="p-8 bg-[#FAF8F6] border border-amber-100/50 animate-fade-enter-active relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-amber-800">Proposed Strategic Fix</span>
                  </div>
                  <p className="text-base text-[#444] font-body-serif italic leading-relaxed">
                    “{solution}”
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#FDFCFB] p-6 border-l border-[#EFE9E4] mt-6">
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#CCC] block mb-2">Architect's Note</span>
        <p className="text-xs text-[#888] font-body-serif leading-relaxed italic">{whyText}</p>
      </div>
    </section>
  );

  return (
    <div className="space-y-20 animate-fade-enter-active pb-24">
      <header className="space-y-6">
        <h1 className="text-5xl font-serif leading-[1.15]">
          {industryContent?.dynamicTitle || `Operational Diagnostic`}
        </h1>
        <div className="max-w-md h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
        <p className="text-lg text-[#666] font-light font-body-serif italic max-w-lg">
          We identify the specific friction points in your current model to map the precise AI engines required for scale.
        </p>
      </header>

      <div className="space-y-24">
        {renderDiagnosticSection(
          'blocker', 
          'Revenue & Acquisition', 
          industryContent?.salesQuestion || "Which area represents your primary revenue bottleneck?",
          industryContent?.salesOptions, 
          industryContent?.salesAIFeatures,
          industryContent?.salesWhy
        )}

        {renderDiagnosticSection(
          'manualWork', 
          'Brand Presence & Content', 
          industryContent?.contentQuestion || "Where is manual content production slowing your speed-to-market?",
          industryContent?.contentOptions, 
          industryContent?.contentAIFeatures,
          industryContent?.contentWhy
        )}

        {renderDiagnosticSection(
          'speed', 
          'Execution Velocity', 
          "What is the current target for your operational launch cycle?",
          industryContent?.speedOptions || ["< 24 Hours", "2-3 Days", "1 Week", "2 Weeks+"], 
          industryContent?.speedAIFeatures || [],
          industryContent?.speedWhy || "Velocity is the primary indicator of operational drag."
        )}

        {renderDiagnosticSection(
          'priority', 
          'Executive Outcome', 
          industryContent?.priorityQuestion || "What is your single most important objective for the next 90 days?",
          industryContent?.priorityOptions, 
          industryContent?.priorityAIFeatures,
          industryContent?.priorityWhy
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-16 border-t border-[#EFE9E4]">
        <button 
          onClick={prevStep}
          className="flex-1 py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
        >
          Adjust Context
        </button>
        <button 
          disabled={!isComplete}
          onClick={nextStep}
          className={`flex-[2] py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all shadow-2xl shadow-amber-900/10 ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
        >
          Architect Strategic Engine →
        </button>
      </div>
    </div>
  );
};
