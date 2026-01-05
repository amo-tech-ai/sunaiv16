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
      updateData({ selectedSystems: current.filter(s => s !== name), svgArchitecture: undefined });
    } else if (current.length < 3) {
      updateData({ selectedSystems: [...current, name], svgArchitecture: undefined });
    }
  };

  const isLoading = recommendations.length === 0;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif leading-tight">Your New Growth Engine</h1>
        <div className="max-w-md h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
        <p className="text-lg text-[#666] font-light font-body-serif italic max-w-lg">
          We have mapped your friction points to three specific architectural solutions. Select the engines you wish to prioritize for the 90-day roadmap.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          recommendations.map((s) => (
            <button 
              key={s.id}
              onClick={() => toggleSystem(s.name)}
              className={`text-left p-10 border transition-all relative group ${data.selectedSystems.includes(s.name) ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xl' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
            >
              <div className="flex justify-between items-start mb-6">
                 <h3 className="text-3xl font-serif leading-none">{s.name}</h3>
                 {s.recommended && !data.selectedSystems.includes(s.name) && (
                    <span className="text-[9px] uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-3 py-1 border border-amber-200">Recommended architecture</span>
                 )}
              </div>
              
              <p className={`text-base leading-relaxed mb-8 font-body-serif italic ${data.selectedSystems.includes(s.name) ? 'text-gray-300' : 'text-[#777]'}`}>
                {s.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-current border-opacity-10">
                <div className="space-y-1.5">
                  <span className={`text-[9px] uppercase tracking-[0.3em] font-bold ${data.selectedSystems.includes(s.name) ? 'text-amber-400' : 'text-amber-600'}`}>Business Impact</span>
                  <p className="text-xs font-bold uppercase tracking-tight">{s.business_impact}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Solving</span>
                  <p className={`text-xs font-bold uppercase tracking-tight ${data.selectedSystems.includes(s.name) ? 'text-gray-400' : 'text-gray-500'}`}>{s.problem}</p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {data.selectedSystems.length > 0 && (
        <div className="space-y-8 pt-12 border-t border-[#EFE9E4] animate-fade-enter-active">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA]">Architecture Blueprint</h2>
            <div className="flex-1 h-px bg-[#F2F0EE]"></div>
          </div>
          <div className="bg-[#FAF8F6] p-12 border border-[#EFE9E4] flex justify-center overflow-hidden min-h-[200px] relative">
            {data.svgArchitecture ? (
              <div dangerouslySetInnerHTML={{ __html: data.svgArchitecture }} className="w-full max-w-lg h-auto" />
            ) : (
              <div className="flex flex-col items-center space-y-4 py-8">
                <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#AAA]">Drafting Blueprint...</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 pt-16">
        <button 
          onClick={prevStep}
          className="flex-1 py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#FAF8F6]"
        >
          ← Diagnostics
        </button>
        <button 
          disabled={data.selectedSystems.length === 0 || isLoading}
          onClick={nextStep}
          className={`flex-[2] py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all shadow-2xl shadow-amber-900/10 ${data.selectedSystems.length > 0 && !isLoading ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
        >
          Check Readiness →
        </button>
      </div>
    </div>
  );
};