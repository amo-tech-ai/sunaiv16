import React from 'react';
import { UserData } from '../../types';

interface SidebarProps {
  step: number;
  userData: UserData;
  errorState: { context: string, message: string } | null;
  retryStep: () => void;
}

export const WizardSidebar: React.FC<SidebarProps> = ({ step, userData, errorState, retryStep }) => {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.5em] font-bold text-[#AAA]">
          <span>Strategy Progress</span>
          <span className="text-amber-600">{Math.round((step / 5) * 100)}%</span>
        </div>
        <div className="h-[2px] bg-[#F2F0EE] w-full overflow-hidden">
          <div 
            className="h-full bg-[#1A1A1A] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {step > 1 && (
        <div className="space-y-10 pt-10 border-t border-[#EFE9E4] animate-fade-enter-active">
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#CCC] font-bold">Organization</span>
            <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#1A1A1A] truncate">{userData.companyName}</p>
          </div>
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#CCC] font-bold">Industry</span>
            <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#1A1A1A]">{userData.industry}</p>
          </div>
        </div>
      )}

      {errorState && (
        <div className="p-4 bg-red-50 border border-red-100 space-y-3">
          <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Service Alert</p>
          <p className="text-xs text-red-800 leading-relaxed">{errorState.message}</p>
          <button 
            onClick={retryStep}
            className="w-full py-2 bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-widest hover:bg-[#333] transition-colors"
          >
            Retry Analysis
          </button>
        </div>
      )}
    </div>
  );
};
