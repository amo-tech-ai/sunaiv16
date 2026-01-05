
import React from 'react';
import { UserData } from '../../types';

interface DashboardProps {
  userData: UserData;
  resetWizard: () => void;
}

export const ClientDashboard: React.FC<DashboardProps> = ({ userData, resetWizard }) => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] animate-fade-enter-active">
      <div className="max-w-6xl mx-auto px-8 py-12 md:py-24">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#EFE9E4] pb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-600">Executive Command</span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-serif leading-tight">{userData.companyName} Hub</h1>
            <p className="text-lg text-[#666] font-light mt-2 font-body-serif italic">“Your blueprint for a more profitable, less stressful business.”</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="px-6 py-2 border border-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold">Access: Executive Only</div>
            <div className="text-[10px] text-[#999] font-medium uppercase tracking-widest">Live Updates Enabled</div>
          </div>
        </header>

        {/* Main Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-16">
          {/* Systems Column */}
          <div className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
                Active Engines
                <div className="flex-1 h-px bg-[#EFE9E4]"></div>
              </h3>
              <div className="space-y-4">
                {userData.selectedSystems.map(s => (
                  <div key={s} className="p-8 border border-[#EFE9E4] bg-white group hover:border-[#1A1A1A] transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-serif">{s}</span>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-600 bg-amber-50 px-2 py-1">Ready</span>
                    </div>
                    <p className="text-xs text-[#777] leading-relaxed">System mapped and ready to integrate with your data.</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Pipeline Column */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
                The Next 30 Days
                <div className="flex-1 h-px bg-[#EFE9E4]"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 border border-[#EFE9E4] bg-white space-y-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-amber-600 font-bold">Current Priority</span>
                    <h4 className="text-2xl font-serif">Month 1: The Foundation</h4>
                    <p className="text-sm text-[#555] font-body-serif leading-relaxed">We are clearing the clutter and preparing your data so we can buy back your team's time as quickly as possible.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#AAA]">
                      <span>Setup Progress</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full bg-[#EFE9E4] h-1">
                      <div className="w-[5%] h-full bg-[#1A1A1A]"></div>
                    </div>
                  </div>
                </div>

                <div className="p-10 border border-amber-200 bg-amber-50/30 space-y-6 flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-amber-800 font-bold">Strategy Note</span>
                  <p className="text-xl font-serif italic text-[#1A1A1A] leading-relaxed">
                    “Fixing your <span className="underline decoration-amber-400">{userData.priority}</span> is the single fastest way to increase your margins this quarter.”
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
                Full Plan Overview
                <div className="flex-1 h-px bg-[#EFE9E4]"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userData.roadmap?.map((phase, idx) => (
                  <div key={idx} className="p-6 border border-[#EFE9E4] bg-white space-y-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#AAA] font-bold">Month 0{idx+1}</span>
                    <h5 className="text-lg font-serif leading-tight">{phase.title}</h5>
                    <div className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">{phase.duration}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-[#EFE9E4] flex flex-col md:flex-row justify-between items-center gap-8">
          <button 
            onClick={resetWizard}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#999] hover:text-[#1A1A1A] transition-colors"
          >
            Archive Strategy & Restart
          </button>
          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#CCC]">Sun AI Agency — Proprietary Growth Blueprint</span>
            <div className="px-4 py-1.5 border border-[#EFE9E4] text-[9px] uppercase tracking-widest font-bold text-[#AAA]">REF: {Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
          </div>
        </footer>
      </div>
    </div>
  );
};
