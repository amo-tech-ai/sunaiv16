
import React from 'react';
import { UserData, DashboardTab } from '../../types';

interface DashboardShellProps {
  userData: UserData;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  centerContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ 
  userData, 
  activeTab, 
  setActiveTab, 
  centerContent, 
  rightContent 
}) => {
  const tabs: { id: DashboardTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'roadmap', label: 'Strategic Roadmap' },
    { id: 'tasks', label: 'Execution Items' },
    { id: 'systems', label: 'AI Architecture' },
    { id: 'settings', label: 'Settings' }
  ];

  const currentPhaseIdx = 0; // Dynamic based on progress

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FDFCFB]">
      {/* LEFT PANEL - Context & Navigation (20%) */}
      <aside className="lg:w-1/5 border-b lg:border-b-0 lg:border-r border-[#EFE9E4] p-8 lg:sticky lg:top-0 lg:h-screen overflow-y-auto flex flex-col">
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-600 block mb-2">Executive Command</span>
          <h2 className="text-3xl font-serif leading-tight text-[#1A1A1A]">{userData.companyName}</h2>
          <p className="text-[10px] uppercase tracking-widest text-[#999] mt-1 font-bold">{userData.industry}</p>
        </div>

        <nav className="flex-1 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all border-l-2 ${
                activeTab === tab.id 
                  ? 'bg-[#1A1A1A] text-white border-amber-400' 
                  : 'text-[#999] border-transparent hover:text-[#1A1A1A] hover:bg-[#FAF8F6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-[#EFE9E4] space-y-6">
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Mandate</span>
            <p className="text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A] leading-relaxed">
              {userData.priority}
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Operational Status</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
              <p className="text-[11px] font-bold tracking-wider uppercase text-amber-700">
                Phase {currentPhaseIdx + 1}
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              onClick={() => window.aistudio?.openSelectKey()}
              className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#CCC] hover:text-[#1A1A1A] transition-colors"
            >
              Executive Security Key
            </button>
          </div>
        </div>
      </aside>

      {/* CENTER PANEL - Work (50%) */}
      <main className="lg:w-1/2 p-8 md:p-12 lg:p-16 overflow-y-auto bg-white">
        <div className="max-w-3xl mx-auto">
          {centerContent}
        </div>
      </main>

      {/* RIGHT PANEL - Intelligence (30%) */}
      <aside className="lg:w-[30%] bg-[#FAF8F6] p-8 lg:p-12 lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-t lg:border-t-0 lg:border-l border-[#EFE9E4]">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#777] font-bold">Sun Intelligence</span>
          </div>
          <div className="flex-1 font-body-serif text-[#444] leading-relaxed text-base">
            {rightContent}
          </div>
        </div>
      </aside>
    </div>
  );
};
