
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

  return (
    <div className="space-y-16 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          {industryContent?.dynamicTitle || `Where is the friction?`}
        </h1>
        <p className="text-lg text-[#666] font-light italic font-body-serif">“We must identify exactly where you are losing time and money before we build.”</p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Growth & Revenue</h2>
          <p className="text-base text-[#666] font-body-serif">Where is your current process losing deals or missing opportunities?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(industryContent?.salesOptions || ["Lead follow-up", "Sales pitching", "Market position", "Closing speed"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ blocker: opt })}
                className={`text-left p-6 border transition-all text-sm font-medium tracking-wide ${data.blocker === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Team Capacity</h2>
          <p className="text-base text-[#666] font-body-serif">What is eating most of your team's time every day?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(industryContent?.manualWorkOptions || ["Client reporting", "Document creation", "Task management", "Admin & Support"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ manualWork: opt })}
                className={`text-left p-6 border transition-all text-sm font-medium tracking-wide ${data.manualWork === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

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

        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Strategic Priority</h2>
          <p className="text-base text-[#666] font-body-serif">If you could fix one thing to change the game this year, what would it be?</p>
          <div className="grid grid-cols-1 gap-4">
            {(industryContent?.priorityOptions || ["Increasing Profit", "Buying Back Time", "Lowering Unit Costs", "Better Client Results"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ priority: opt })}
                className={`text-left p-6 border transition-all text-sm font-medium tracking-wide ${data.priority === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>
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
          Design the Growth Engine →
        </button>
      </div>
    </div>
  );
};
