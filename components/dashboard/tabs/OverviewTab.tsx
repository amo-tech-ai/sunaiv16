import React from 'react';
import { UserData } from '../../../types';

interface TabProps {
  userData: UserData;
}

export const OverviewTab: React.FC<TabProps> = ({ userData }) => {
  const currentPhase = userData.roadmap?.[0];
  const completedTasks = userData.tasks?.filter(t => t.status === 'completed').length || 0;
  const totalTasks = userData.tasks?.length || 0;
  const velocity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-4">
        <h1 className="text-5xl font-serif leading-tight">Strategic Hub</h1>
        <p className="text-xl text-[#666] font-light font-body-serif italic">
          “Vision is a commodity. Execution is an asset.”
        </p>
      </header>

      {/* Strategic North Star Hero Card */}
      <section className="relative p-10 border border-[#1A1A1A] bg-[#1A1A1A] text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-bold">Strategic Mandate</span>
          <h2 className="text-3xl font-serif leading-snug">
            Establishing a high-velocity {userData.industry} infrastructure optimized for {userData.priority.toLowerCase()}.
          </h2>
          <div className="pt-4 flex flex-wrap gap-8">
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Target Horizon</span>
              <span className="text-sm font-medium">90 Days to Full Autonomy</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Active Architecture</span>
              <span className="text-sm font-medium">{userData.selectedSystems.length} Core Systems</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 border border-[#EFE9E4] bg-white text-center space-y-2 group hover:border-amber-400 transition-colors">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#999] font-bold">Maturity Baseline</span>
          <div className="text-4xl font-serif">{userData.readinessScore || 0}%</div>
          <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase">Scale Index</p>
        </div>
        <div className="p-8 border border-[#EFE9E4] bg-white text-center space-y-2 group hover:border-amber-400 transition-colors">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#999] font-bold">Execution Velocity</span>
          <div className="text-4xl font-serif">{velocity}%</div>
          <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase">Roadmap Progress</p>
        </div>
        <div className="p-8 border border-[#EFE9E4] bg-white text-center space-y-2 group hover:border-amber-400 transition-colors">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#999] font-bold">Confidence Score</span>
          <div className="text-4xl font-serif capitalize">{userData.confidence?.level || 'Medium'}</div>
          <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase">Auditor Reliability</p>
        </div>
      </section>

      {/* Weekly Focus Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
            Critical Executive Actions
            <div className="flex-1 h-px bg-[#EFE9E4] w-24"></div>
          </h3>
          <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">3 Items Pending</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {userData.tasks?.filter(t => t.owner === 'client' && t.status === 'pending').slice(0, 3).map((task, i) => (
            <div key={i} className="p-6 bg-white border border-[#EFE9E4] flex justify-between items-center group hover:border-[#1A1A1A] transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span className="text-[8px] uppercase tracking-widest font-bold text-amber-700">Priority {i + 1}</span>
                </div>
                <p className="text-base font-bold text-[#1A1A1A] font-serif">{task.title}</p>
                <p className="text-xs text-[#777] font-body-serif italic leading-relaxed">{task.impact}</p>
              </div>
              <div className="text-right">
                <button className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors">
                  Resolve →
                </button>
              </div>
            </div>
          ))}
          {(!userData.tasks || userData.tasks.filter(t => t.owner === 'client' && t.status === 'pending').length === 0) && (
            <div className="text-center py-16 border border-dashed border-[#EFE9E4] bg-[#FAF8F6]">
              <p className="text-sm text-[#999] font-body-serif italic">Operational baseline cleared. All systems nominal.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
