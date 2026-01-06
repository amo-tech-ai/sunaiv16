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
      updateData({ 
        selectedSystems: current.filter(s => s !== name), 
        svgArchitecture: undefined 
      });
    } else if (current.length < 3) {
      updateData({ 
        selectedSystems: [...current, name], 
        svgArchitecture: undefined 
      });
    }
  };

  const isLoading = recommendations.length === 0;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif leading-tight text-[#1A1A1A]">Design Your Architecture</h1>
        <div className="max-w-md h-px bg-gradient-to-r from-amber-400 to-transparent"></div>
        <p className="text-lg text-[#666] font-light font-body-serif italic max-w-lg leading-relaxed">
          Select up to three core engines. These modular systems will form the digital backbone of your automated operations.
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
              className={`text-left p-10 border transition-all duration-500 relative group ${data.selectedSystems.includes(s.name) ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xl' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
            >
              <div className="flex justify-between items-start mb-6">
                 <h3 className="text-3xl font-serif leading-none">{s.name}</h3>
                 {s.recommended && !data.selectedSystems.includes(s.name) && (
                    <span className="text-[9px] uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-3 py-1 border border-amber-200">Optimal Configuration</span>
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
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Operational Target</span>
                  <p className={`text-xs font-bold uppercase tracking-tight ${data.selectedSystems.includes(s.name) ? 'text-gray-400' : 'text-gray-500'}`}>{s.problem}</p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {data.selectedSystems.length > 0 && (
        <div className="space-y-10 pt-16 border-t border-[#EFE9E4] animate-fade-enter-active">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#1A1A1A]">System Logic Blueprint</h2>
              <p className="text-[10px] text-[#999] font-body-serif italic">Generated mapping of data flow and AI orchestration.</p>
            </div>
          </div>
          <div className="bg-[#FAF8F6] p-12 md:p-20 border border-[#EFE9E4] flex justify-center items-center overflow-hidden min-h-[350px] relative shadow-inner">
            {data.svgArchitecture ? (
              <div 
                dangerouslySetInnerHTML={{ __html: data.svgArchitecture }} 
                className="w-full h-full flex justify-center items-center transition-opacity duration-1000 ease-in"
              />
            ) : (
              <div className="flex flex-col items-center space-y-6 py-12">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA] animate-pulse">Drafting Strategic Architecture...</span>
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
          ← Adjust Diagnostics
        </button>
        <button 
          disabled={data.selectedSystems.length === 0 || isLoading}
          onClick={nextStep}
          className={`flex-[2] py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all shadow-2xl shadow-amber-900/10 ${data.selectedSystems.length > 0 && !isLoading ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
        >
          Proceed to Operational Audit →
        </button>
      </div>
    </div>
  );
};
