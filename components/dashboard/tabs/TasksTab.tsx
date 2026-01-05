
import React from 'react';
import { UserData, DashboardTask } from '../../../types';

interface TabProps {
  userData: UserData;
  updateTasks: (tasks: DashboardTask[]) => void;
}

export const TasksTab: React.FC<TabProps> = ({ userData, updateTasks }) => {
  const tasks = userData.tasks || [];

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(t => 
      t.id === id ? { ...t, status: (t.status === 'completed' ? 'pending' : 'completed') as any } : t
    );
    updateTasks(newTasks);
  };

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header className="space-y-4">
        <h1 className="text-4xl font-serif leading-tight">Action Items</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">
          “Small, consistent adjustments create the massive leverage required for scale.”
        </p>
      </header>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-[#EFE9E4]">
            <p className="text-sm text-[#AAA] uppercase tracking-widest">Generating actionable tasks...</p>
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className={`group p-6 border transition-all cursor-pointer flex items-center gap-6 ${
                task.status === 'completed' ? 'bg-[#FAF8F6] border-transparent opacity-60' : 'bg-white border-[#EFE9E4] hover:border-[#1A1A1A]'
              }`}
            >
              <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                task.status === 'completed' ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'border-[#D1C7BD] group-hover:border-[#1A1A1A]'
              }`}>
                {task.status === 'completed' && <span className="text-white text-[10px]">✓</span>}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 border ${
                    task.owner === 'Client' ? 'border-amber-200 text-amber-700 bg-amber-50' : 'border-gray-200 text-gray-500'
                  }`}>
                    {task.owner}
                  </span>
                  <h4 className={`text-sm font-bold tracking-tight ${task.status === 'completed' ? 'line-through text-[#AAA]' : 'text-[#1A1A1A]'}`}>
                    {task.title}
                  </h4>
                </div>
                <p className="text-xs text-[#777] font-body-serif italic">{task.impact}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
