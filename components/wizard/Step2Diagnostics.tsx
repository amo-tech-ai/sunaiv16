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

  const renderOptionPair = (
    category: 'blocker' | 'manualWork' | 'speed' | 'priority', 
    label: string, 
    question: string,
    options: string[] = [], 
    aiSolutions: string[] = [],
    whyText: string
  ) => (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">{label}</h2>
        <p className="text-lg font-serif text-[#1A1A1A]">{question}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {options.map((opt, idx) => {
          const isSelected = data[category] === opt;
          const solution = aiSolutions[idx];

          return (
            <div key={opt} className="space-y-2">
              <button 
                onClick={() => updateData({ [category]: opt })}
                className={`w-full text-left p-6 border transition-all text-base font-normal flex justify-between items-center group ${isSelected ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                <span className="font-body-serif leading-relaxed">{opt}</span>
                {isSelected && <span className="text-amber-400 text-lg">●</span>}
              </button>
              
              {isSelected && solution && (
                <div className="p-6 bg-[#FAF8F6] border border-amber-100 animate-fade-enter-active">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-amber-800">The Proposed Fix</span>
                  </div>
                  <p className="text-sm text-[#444] font-body-serif italic leading-relaxed">
                    {solution}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-[#FDFCFB] p-5 border-l border-[#EFE9E4] mt-4">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#999] block mb-1">Why it matters</span>
        <p className="text-xs text-[#666] font-body-serif leading-relaxed italic">{whyText}</p>
      </div>
    </section>
  );

  return (
    <div className="space-y-16 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          {industryContent?.dynamicTitle || `Diagnostic Assessment`}
        </h1>
        <p className="text-lg text-[#666] font-light italic font-body-serif">“We identify the money leaks so we can plug them with automation.”</p>
      </header>

      <div className="space-y-20">
        {renderOptionPair(
          'blocker', 
          'Sales & Revenue Growth', 
          industryContent?.salesQuestion || "Where are you losing sales right now?",
          industryContent?.salesOptions, 
          industryContent?.salesAIFeatures,
          industryContent?.salesWhy
        )}

        {renderOptionPair(
          'manualWork', 
          'Online Presence & Content', 
          industryContent?.contentQuestion || "What is slowing down your content production?",
          industryContent?.contentOptions, 
          industryContent?.contentAIFeatures,
          industryContent?.contentWhy
        )}

        {renderOptionPair(
          'speed', 
          'Speed to Market', 
          "How can we speed up your launch cycle?",
          industryContent?.speedOptions, 
          industryContent?.speedAIFeatures,
          industryContent?.speedWhy
        )}

        {renderOptionPair(
          'priority', 
          'Executive Priority', 
          industryContent?.priorityQuestion || "What is your #1 goal this year?",
          industryContent?.priorityOptions, 
          industryContent?.priorityAIFeatures,
          industryContent?.priorityWhy
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-12 border-t border-[#EFE9E4]">
        <button 
          onClick={prevStep}
          className="flex-1 py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
        >
          ← Adjust Context
        </button>
        <button 
          disabled={!isComplete}
          onClick={nextStep}
          className={`flex-[2] py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all shadow-xl shadow-amber-900/5 ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
        >
          Architect My Solution →
        </button>
      </div>
    </div>
  );
};