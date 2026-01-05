
import React from 'react';
import { UserData } from '../../../types';

interface TabProps {
  userData: UserData;
}

export const SystemsTab: React.FC<TabProps> = ({ userData }) => {
  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-4">
        <h1 className="text-4xl font-serif leading-tight">AI Architecture</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">
          “The digital backbone that replaces manual drag with automated intelligence.”
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {userData.selectedSystems.map((s, idx) => (
          <div key={s} className="p-10 border border-[#EFE9E4] bg-white group hover:border-[#1A1A1A] transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#AAA] font-bold">Engine 0{idx + 1}</span>
                <h3 className="text-2xl font-serif">{s}</h3>
              </div>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[9px] uppercase tracking-widest font-bold">In Deployment</span>
            </div>
            
            <p className="text-sm text-[#777] leading-relaxed mb-8 font-body-serif italic">
              Mapped to solve {userData.blocker.toLowerCase()} and replace {userData.manualWork.toLowerCase()} workflows.
            </p>

            <div className="pt-6 border-t border-[#FAF8F6] flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <div className="w-2 h-2 rounded-full bg-[#EFE9E4]"></div>
                <div className="w-2 h-2 rounded-full bg-[#EFE9E4]"></div>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#AAA]">Configuration Required</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
