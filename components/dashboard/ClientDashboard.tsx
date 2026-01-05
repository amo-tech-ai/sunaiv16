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
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-600">Strategic Command Hub</span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-serif leading-tight">{userData.companyName} Architecture</h1>
            <p className="text-lg text-[#666] font-light mt-2 font-body-serif italic">“The blueprint for automated growth and operational excellence.”</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="px-6 py-2 border border-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold">Level: Enterprise Executive</div>
            <div className="text-[10px] text-[#999] font-medium uppercase tracking-widest">Initialization: 48h Window</div>
          </div>
        </header>

        {/* Main Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-16">
          {/* Systems Column */}
          <div className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
                Systems Architecture
                <div className="flex-1 h-px bg-[#EFE9E4]"></div>
              </h3>
              <div className="space-y-4">
                {userData.selectedSystems.map(s => (
                  <div key={s} className="p-8 border border-[#EFE9E4] bg-white group hover:border-[#1A1A1A] transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-serif">{s}</span>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-amber-600 bg-amber-50 px-2 py-1">Pending</span>
                    </div>
                    <p className="text-xs text-[#777] leading-relaxed">System core architected. Ready for data integration.</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Pipeline Column */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
                Execution Pipeline
                <div className="flex-1 h-px bg-[#EFE9E4]"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 border border-[#EFE9E4] bg-white space-y-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-amber-600 font-bold">Current Milestone</span>
                    <h4 className="text-2xl font-serif">Phase 1 Foundation Setup</h4>
                    <p className="text-sm text-[#555] font-body-serif leading-relaxed">Initiating structural data orchestration and infrastructure audit to ensure 3x ROI on automation deployment.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-[#AAA]">
                      <span>Preparation Progress</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full bg-[#EFE9E4] h-1">
                      <div className="w-[5%] h-full bg-[#1A1A1A]"></div>
                    </div>
                  </div>
                </div>

                <div className="p-10 border border-amber-200 bg-amber-50/30 space-y-6 flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-amber-800 font-bold">Executive Insight</span>
                  <p className="text-xl font-serif italic text-[#1A1A1A] leading-relaxed">
                    “Your focus on <span className="underline decoration-amber-400">{userData.priority}</span> will yield the highest immediate reclaimed time for the leadership team.”
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
                90-Day Vision
                <div className="flex-1 h-px bg-[#EFE9E4]"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userData.roadmap?.map((phase, idx) => (
                  <div key={idx} className="p-6 border border-[#EFE9E4] bg-white space-y-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#AAA] font-bold">Phase 0{idx+1}</span>
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
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#CCC]">Sun AI Agency — Confidential Proprietary Strategy</span>
            <div className="px-4 py-1.5 border border-[#EFE9E4] text-[9px] uppercase tracking-widest font-bold text-[#AAA]">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
          </div>
        </footer>
      </div>
    </div>
  );
};
