
import React, { useState } from 'react';
import { UserData, DashboardTask } from '../../../types';

interface TabProps {
  userData: UserData;
  updateTasks: (tasks: DashboardTask[]) => void;
}

export const TasksTab: React.FC<TabProps> = ({ userData, updateTasks }) => {
  const [filter, setFilter] = useState<'All' | 'Client' | 'Sun AI'>('All');
  const tasks = userData.tasks || [];

  const filteredTasks = filter === 'All' 
    ? tasks 
    : tasks.filter(t => t.owner === filter || (filter === 'Sun AI' && t.owner === 'Automated'));

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(t => 
      t.id === id ? { ...t, status: (t.status === 'completed' ? 'pending' : 'completed') as any } : t
    );
    updateTasks(newTasks);
  };

  const categories = ['All', 'Client', 'Sun AI'];

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-4">
        <h1 className="text-5xl font-serif leading-tight">Execution Items</h1>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="text-xl text-[#666] font-light font-body-serif italic max-w-lg">
            “Small adjustments create the leverage required for scale.”
          </p>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all ${
                  filter === cat 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                    : 'bg-white text-[#999] border-[#EFE9E4] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {cat === 'Client' ? 'Founder' : cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-[#EFE9E4]">
            <p className="text-sm text-[#AAA] uppercase tracking-widest">No pending items in this category.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`group p-8 border transition-all cursor-pointer flex items-center gap-8 ${
                task.status === 'completed' ? 'bg-[#FAF8F6] border-transparent opacity-60' : 'bg-white border-[#EFE9E4] hover:border-[#1A1A1A]'
              }`}
            >
              <div className={`w-6 h-6 border flex items-center justify-center transition-all ${
                task.status === 'completed' ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'border-[#D1C7BD] group-hover:border-[#1A1A1A] group-hover:bg-[#1A1A1A]'
              }`}>
                {task.status === 'completed' && <span className="text-white text-[10px]">✓</span>}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 border ${
                    task.owner === 'Client' ? 'border-amber-200 text-amber-700 bg-amber-50' : 'border-gray-200 text-gray-400 bg-gray-50'
                  }`}>
                    {task.owner === 'Client' ? 'Executive Signature' : 'Sun AI Execution'}
                  </span>
                  <span className="text-[9px] text-[#CCC] uppercase tracking-widest font-bold">Phase 0{task.phaseIdx + 1}</span>
                </div>
                <h4 className={`text-lg font-serif mb-1 ${task.status === 'completed' ? 'line-through text-[#AAA]' : 'text-[#1A1A1A]'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] uppercase tracking-[0.2em] text-amber-600 font-bold">Business Impact:</span>
                   <p className="text-xs text-[#777] font-body-serif italic">{task.impact}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
