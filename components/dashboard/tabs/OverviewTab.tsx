
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
        <h1 className="text-5xl font-serif leading-tight">Executive Overview</h1>
        <p className="text-xl text-[#666] font-light font-body-serif italic">
          “Execution is the only differentiator. We are moving from clutter to automated clarity.”
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
          <span className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-bold">Strategic North Star</span>
          <h2 className="text-3xl font-serif leading-snug">
            Establish a high-velocity {userData.industry} engine focused on {userData.priority.toLowerCase()}.
          </h2>
          <div className="pt-4 flex gap-8">
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Target Milestone</span>
              <span className="text-sm font-medium">Phase 1 Completion (30 Days)</span>
            </div>
            <div>
              <span className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">Primary Lever</span>
              <span className="text-sm font-medium">{userData.selectedSystems[0]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 border border-[#EFE9E4] bg-white text-center space-y-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#999] font-bold">Scale Score</span>
          <div className="text-4xl font-serif">{userData.readinessScore || 0}</div>
          <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase">Readiness</p>
        </div>
        <div className="p-8 border border-[#EFE9E4] bg-white text-center space-y-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#999] font-bold">Execution Velocity</span>
          <div className="text-4xl font-serif">{velocity}%</div>
          <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase">90-Day Path</p>
        </div>
        <div className="p-8 border border-[#EFE9E4] bg-white text-center space-y-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#999] font-bold">Active Engines</span>
          <div className="text-4xl font-serif">{userData.selectedSystems.length}</div>
          <p className="text-[10px] text-amber-600 font-bold tracking-widest uppercase">AI Architecture</p>
        </div>
      </section>

      {/* Weekly Focus Section */}
      <section className="space-y-6">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#999] font-bold flex items-center gap-4">
          Focus: Week 01
          <div className="flex-1 h-px bg-[#EFE9E4]"></div>
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Fix: use lowercase 'client' to match DashboardTask owner type */}
          {userData.tasks?.filter(t => t.owner === 'client' && t.status === 'pending').slice(0, 3).map((task, i) => (
            <div key={i} className="p-6 border border-[#EFE9E4] bg-[#FAF8F6] flex justify-between items-center group hover:border-[#1A1A1A] transition-all">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-widest font-bold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-100">Owner: Founder</span>
                <p className="text-sm font-bold text-[#1A1A1A]">{task.title}</p>
              </div>
              <span className="text-xs text-[#AAA] font-body-serif italic">{task.impact}</span>
            </div>
          ))}
          {/* Fix: use lowercase 'client' to match DashboardTask owner type */}
          {(!userData.tasks || userData.tasks.filter(t => t.owner === 'client' && t.status === 'pending').length === 0) && (
            <p className="text-sm text-[#999] italic text-center py-8 border border-dashed border-[#EFE9E4]">All executive focus items are currently clear.</p>
          )}
        </div>
      </section>
    </div>
  );
};
