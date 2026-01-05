
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
    options: string[] = [], 
    aiSolutions: string[] = []
  ) => (
    <section className="space-y-6">
      <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">{label}</h2>
      <div className="grid grid-cols-1 gap-4">
        {options.map((opt, idx) => {
          const isSelected = data[category] === opt;
          const solution = aiSolutions[idx];

          return (
            <div key={opt} className="space-y-2">
              <button 
                onClick={() => updateData({ [category]: opt })}
                className={`w-full text-left p-6 border transition-all text-base font-normal flex justify-between items-center ${isSelected ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                <span className="font-body-serif">{opt}</span>
                {isSelected && (
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-lg">●</span>
                  </div>
                )}
              </button>
              
              {isSelected && solution && (
                <div className="p-6 bg-[#FAF8F6] border border-[#EFE9E4] animate-fade-enter-active">
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
    </section>
  );

  return (
    <div className="space-y-16 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          {industryContent?.dynamicTitle || `Where is it hurting?`}
        </h1>
        <p className="text-lg text-[#666] font-light italic font-body-serif">“Be honest about the friction. We can't build a shortcut until we know what's blocking the road.”</p>
      </header>

      <div className="space-y-12">
        {renderOptionPair(
          'blocker', 
          'Money & Growth', 
          industryContent?.salesOptions, 
          industryContent?.salesAIFeatures
        )}

        {renderOptionPair(
          'manualWork', 
          'The Daily Grind', 
          industryContent?.manualWorkOptions, 
          industryContent?.manualWorkAIFeatures
        )}

        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Your Speed</h2>
          <p className="text-base text-[#666] font-body-serif">Once a customer says "yes," how long does it take you to deliver?</p>
          <div className="flex flex-wrap gap-4">
            {["Within a day", "A few days", "About a week", "Multiple weeks"].map((opt) => (
              <button 
                key={opt}
                onClick={() => updateData({ speed: opt })}
                className={`px-8 py-3 border transition-all rounded-full text-xs uppercase tracking-widest font-bold ${data.speed === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        {renderOptionPair(
          'priority', 
          'Your #1 Focus', 
          industryContent?.priorityOptions, 
          industryContent?.priorityAIFeatures
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-12">
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
