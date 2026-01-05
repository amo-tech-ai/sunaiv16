
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

  if (isLoading) {
    return <DiagnosticSkeleton />;
  }

  const renderOptionPair = (
    category: 'blocker' | 'manualWork' | 'priority', 
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
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-amber-800">The Fix</span>
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
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#999] block mb-1">Why we ask</span>
        <p className="text-xs text-[#666] font-body-serif leading-relaxed italic">{whyText}</p>
      </div>
    </section>
  );

  return (
    <div className="space-y-16 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          {industryContent?.dynamicTitle || `Where is your business under the most pressure?`}
        </h1>
        <p className="text-lg text-[#666] font-light italic font-body-serif">“Be honest. We can’t grow sales until we understand what’s slowing you down.”</p>
      </header>

      <div className="space-y-20">
        {renderOptionPair(
          'blocker', 
          'Sales & Marketing Growth', 
          industryContent?.salesQuestion || "Where are you losing sales right now?",
          industryContent?.salesOptions, 
          industryContent?.salesAIFeatures,
          industryContent?.salesWhy
        )}

        {renderOptionPair(
          'manualWork', 
          'Online Presence & Content', 
          industryContent?.contentQuestion || "What’s hardest about your current online marketing?",
          industryContent?.contentOptions, 
          industryContent?.contentAIFeatures,
          industryContent?.contentWhy
        )}

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Execution Speed</h2>
            <p className="text-lg font-serif text-[#1A1A1A]">How fast can you launch and promote a new product online?</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {(industryContent?.speedOptions || ["Same day", "A few days", "About a week", "Multiple weeks"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ speed: opt })}
                className={`px-8 py-3 border transition-all rounded-full text-xs uppercase tracking-widest font-bold ${data.speed === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="bg-[#FDFCFB] p-5 border-l border-[#EFE9E4]">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#999] block mb-1">Why we ask</span>
            <p className="text-xs text-[#666] font-body-serif leading-relaxed italic">In fashion and marketing, speed is everything. The brand that launches first usually wins the sale.</p>
          </div>
        </section>

        {renderOptionPair(
          'priority', 
          'Your #1 Focus', 
          industryContent?.priorityQuestion || "If you could fix one thing this year, what would make the biggest difference?",
          industryContent?.priorityOptions, 
          industryContent?.priorityAIFeatures,
          industryContent?.priorityWhy
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-12 border-t border-[#EFE9E4]">
        <button 
          onClick={prevStep}
          className="flex-1 py-6 text-[10px] uppercase tracking-[0.3em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
        >
          ← Go Back
        </button>
        <button 
          disabled={!isComplete}
          onClick={nextStep}
          className={`flex-[2] py-6 text-[10px] uppercase tracking-[0.3em] font-bold transition-all shadow-xl shadow-amber-900/5 ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
        >
          See Your AI Architecture →
        </button>
      </div>
    </div>
  );
};
