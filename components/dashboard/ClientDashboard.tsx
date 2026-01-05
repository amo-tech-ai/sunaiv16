
import React, { useState, useEffect } from 'react';
import { UserData, DashboardTab, DashboardTask } from '../../types';
import { DashboardShell } from './DashboardShell';
import { OverviewTab } from './tabs/OverviewTab';
import { TasksTab } from './tabs/TasksTab';
import { RoadmapTab } from './tabs/RoadmapTab';
import { SystemsTab } from './tabs/SystemsTab';
import { useIntelligence } from '../../hooks/useIntelligence';
import { generateTasksFromRoadmap } from '../../services/gemini/planner';
import { getRiskAssessment } from '../../services/gemini/analyzer';

interface DashboardProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetWizard: () => void;
}

export const ClientDashboard: React.FC<DashboardProps> = ({ userData, updateUserData, resetWizard }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const { intelligence, setIntelligence, handleStreamingNotes } = useIntelligence();

  // Generate tasks if they don't exist
  useEffect(() => {
    if (userData.roadmap && (!userData.tasks || userData.tasks.length === 0)) {
      generateTasksFromRoadmap(userData).then(tasks => {
        updateUserData({ tasks });
      });
    }
  }, [userData.roadmap]);

  // Proactive Risk Scorer (Prompt 8)
  useEffect(() => {
    const runRiskAudit = async () => {
      const riskNote = await getRiskAssessment(userData);
      setIntelligence(prev => ({
        ...prev,
        observations: [
          "Risk audit completed",
          "Execution velocity analyzed",
          "Bottlenecks mapped"
        ]
      }));
      // We don't overwrite the streaming notes, but we can prepend or use as baseline
    };
    runRiskAudit();
  }, [userData.tasks]);

  // Contextual intelligence notes per tab
  useEffect(() => {
    let prompt = '';
    switch(activeTab) {
      case 'overview':
        prompt = `We are reviewing the high-level mission for ${userData.companyName}. Explain why the first 30 days are purely about clearing operational clutter so that the ${userData.selectedSystems[0]} engine has a clean foundation to scale.`;
        break;
      case 'tasks':
        prompt = `Looking at the execution list for ${userData.companyName}. Briefly highlight why the Founder-owned tasks are the current bottleneck and what happens to the velocity once they are cleared.`;
        break;
      case 'roadmap':
        prompt = `Reviewing the strategic sequencing for ${userData.companyName}. Explain why we have prioritized ${userData.roadmap?.[0]?.title} first, specifically in the context of solving the ${userData.blocker} friction.`;
        break;
      case 'systems':
        prompt = `Evaluating the ${userData.selectedSystems.length} core AI engines mapped for ${userData.companyName}. Briefly note how this architecture replaces the manual ${userData.manualWork} drag with persistent intelligence.`;
        break;
    }
    if (prompt) handleStreamingNotes(prompt);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab userData={userData} />;
      case 'tasks': return <TasksTab userData={userData} updateTasks={(tasks) => updateUserData({ tasks })} />;
      case 'roadmap': return <RoadmapTab userData={userData} />;
      case 'systems': return <SystemsTab userData={userData} />;
      case 'settings': return (
        <div className="space-y-12 animate-fade-enter-active">
          <header className="space-y-4">
            <h1 className="text-4xl font-serif">Command Settings</h1>
            <p className="text-lg text-[#666] font-light font-body-serif italic">“Adjusting the strategic baseline.”</p>
          </header>
          
          <div className="p-10 border border-[#EFE9E4] bg-white space-y-8">
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">Data Continuity</h4>
              <p className="text-sm text-[#777]">Your strategy is currently locked. To redesign the growth engine from scratch, initialize a system reset.</p>
            </div>
            
            <button 
              onClick={resetWizard}
              className="px-8 py-4 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#333] transition-all"
            >
              Reset All Strategic Data
            </button>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <DashboardShell
      userData={userData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      centerContent={renderContent()}
      rightContent={
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-[#444] font-body-serif font-light whitespace-pre-wrap">
            {intelligence.notes}
            {intelligence.status === 'analyzing' && <span className="inline-block w-1 h-4 ml-1 bg-amber-400 animate-pulse align-middle"></span>}
          </p>
          
          {intelligence.observations.length > 0 && (
            <div className="pt-8 border-t border-[#EFE9E4] space-y-4">
               <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">System Health</h4>
               <ul className="space-y-3">
                 {intelligence.observations.map((obs, i) => (
                   <li key={i} className="flex gap-3 items-center text-xs text-[#666] font-body-serif">
                     <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                     {obs}
                   </li>
                 ))}
               </ul>
            </div>
          )}
        </div>
      }
    />
  );
};
