
import React from 'react';
import { UserData, IntelligenceState } from '../../types';

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

  const renderOptionPair = (
    category: 'blocker' | 'manualWork' | 'priority', 
    label: string, 
    options: string[] = [], 
    aiSolutions: string[] = []
  ) => (
    <section className="space-y-6">
      <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">{label}</h2>
      <div className="grid grid-cols-1 gap-4">
        {options.map((opt, idx) => {
          const isSelected = data[category] === opt;
          const solution = aiSolutions[idx];

          return (
            <div key={opt} className="space-y-2">
              <button 
                onClick={() => updateData({ [category]: opt })}
                className={`w-full text-left p-6 border transition-all text-sm font-medium tracking-wide flex justify-between items-center ${isSelected ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                <span>{opt}</span>
                {isSelected && <span className="text-amber-400">●</span>}
              </button>
              
              {isSelected && solution && (
                <div className="p-5 bg-amber-50 border-l-2 border-amber-400 animate-fade-enter-active">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-amber-700">Proposed AI Engine Logic</span>
                  </div>
                  <p className="text-xs text-amber-900 font-body-serif italic leading-relaxed">
                    “{solution}”
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
          {industryContent?.dynamicTitle || `Where is the friction?`}
        </h1>
        <p className="text-lg text-[#666] font-light italic font-body-serif">“We must identify exactly where you are losing time and money before we build.”</p>
      </header>

      <div className="space-y-12">
        {renderOptionPair(
          'blocker', 
          'Revenue & Acquisition', 
          industryContent?.salesOptions, 
          industryContent?.salesAIFeatures
        )}

        {renderOptionPair(
          'manualWork', 
          'Team Capacity', 
          industryContent?.manualWorkOptions, 
          industryContent?.manualWorkAIFeatures
        )}

        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Delivery Speed</h2>
          <p className="text-base text-[#666] font-body-serif">How long does it take from 'Hello' to a finished client action?</p>
          <div className="flex flex-wrap gap-4">
            {["Same Day", "2-3 Days", "1 Week", "Multiple Weeks"].map((opt) => (
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
          'Strategic Mandate', 
          industryContent?.priorityOptions, 
          industryContent?.priorityAIFeatures
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-8">
        <button 
          onClick={prevStep}
          className="flex-1 py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
        >
          ← Back to Context
        </button>
        <button 
          disabled={!isComplete}
          onClick={nextStep}
          className={`flex-[2] py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
        >
          View System Architecture →
        </button>
      </div>
    </div>
  );
};
