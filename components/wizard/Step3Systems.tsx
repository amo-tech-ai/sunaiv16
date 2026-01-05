
import React from 'react';
import { UserData, SystemRecommendation } from '../../types';
import { CardSkeleton } from '../ui/SkeletonLoading';

interface StepProps {
  data: UserData;
  updateData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  recommendations: SystemRecommendation[];
}

export const Step3Systems: React.FC<StepProps> = ({ data, updateData, nextStep, prevStep, recommendations }) => {
  const toggleSystem = (name: string) => {
    const current = data.selectedSystems;
    if (current.includes(name)) {
      updateData({ selectedSystems: current.filter(s => s !== name) });
    } else if (current.length < 3) {
      updateData({ selectedSystems: [...current, name] });
    }
  };

  const isLoading = recommendations.length === 0;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Your New Growth Engine</h1>
        <p className="text-lg text-[#666] font-light font-body-serif">Based on the friction we identified, we recommend these three specific solutions. Pick up to 3.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          recommendations.map((s) => (
            <button 
              key={s.id}
              onClick={() => toggleSystem(s.name)}
              className={`text-left p-8 border transition-all relative group ${data.selectedSystems.includes(s.name) ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
            >
              {s.recommended && !data.selectedSystems.includes(s.name) && (
                <span className="absolute top-4 right-8 text-[9px] uppercase tracking-[0.2em] text-amber-600 font-bold bg-amber-50 px-3 py-1 border border-amber-200">Selected Path</span>
              )}
              <h3 className="text-2xl font-serif mb-4">{s.name}</h3>
              <p className={`text-sm leading-relaxed mb-4 ${data.selectedSystems.includes(s.name) ? 'text-gray-300' : 'text-[#777]'}`}>{s.description}</p>
              <div className={`text-[11px] font-bold uppercase tracking-widest ${data.selectedSystems.includes(s.name) ? 'text-amber-400' : 'text-amber-600'}`}>
                Impact: {s.whyItMatters}
              </div>
            </button>
          ))
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-8">
        <button 
          onClick={prevStep}
          className="flex-1 py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
        >
          ← Back to Diagnostics
        </button>
        <button 
          disabled={data.selectedSystems.length === 0 || isLoading}
          onClick={nextStep}
          className={`flex-[2] py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all ${data.selectedSystems.length > 0 && !isLoading ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
        >
          Can you scale this? →
        </button>
      </div>
    </div>
  );
};
