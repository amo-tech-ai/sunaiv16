import React from 'react';
import { UserData } from '../../../types';

interface TabProps {
  userData: UserData;
}

export const SystemsTab: React.FC<TabProps> = ({ userData }) => {
  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-4">
        <h1 className="text-4xl font-serif leading-tight">Core AI Engines</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">
          “Standardization is the prerequisite for automation.”
        </p>
      </header>

      {/* Architecture Visualization Summary */}
      <section className="p-10 bg-[#FAF8F6] border border-[#EFE9E4] relative overflow-hidden">
        <div className="absolute top-4 right-6 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] uppercase tracking-widest font-bold text-green-700">Network Nominal</span>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA]">Architecture Blueprint</h4>
          <div className="h-48 flex items-center justify-center border border-dashed border-[#D1C7BD] bg-white">
            {userData.svgArchitecture ? (
              <div 
                dangerouslySetInnerHTML={{ __html: userData.svgArchitecture }} 
                className="w-full h-full p-4 flex justify-center items-center opacity-80"
              />
            ) : (
              <span className="text-xs text-[#AAA] italic">Syncing technical schema...</span>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {userData.selectedSystems.map((s, idx) => (
          <div key={s} className="p-10 border border-[#EFE9E4] bg-white group hover:border-[#1A1A1A] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400 opacity-[0.03] translate-x-12 -translate-y-12 rotate-45"></div>
            
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-amber-600 font-bold">Module 0{idx + 1}</span>
                  <div className="h-px w-6 bg-[#EFE9E4]"></div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#AAA] font-bold">Active</span>
                </div>
                <h3 className="text-3xl font-serif text-[#1A1A1A]">{s}</h3>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-50 border border-green-100 text-green-700 text-[9px] uppercase tracking-widest font-bold">Deployment: 100%</span>
              </div>
            </div>
            
            <p className="text-sm text-[#555] leading-relaxed mb-10 font-body-serif italic max-w-lg">
              Replacing manual {userData.manualWork.toLowerCase()} workflows with persistent, data-driven intelligence. 
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#FAF8F6]">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#AAA]">Engine Health</span>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-[#FAF8F6] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[94%]"></div>
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A]">94%</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#AAA]">Last Interaction</span>
                <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-tighter">Current Strategy Snapshot</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
