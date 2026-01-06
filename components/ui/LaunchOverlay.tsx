import React from 'react';

export const LaunchOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#1A1A1A] flex flex-col items-center justify-center animate-fade-in transition-all duration-1000">
      <div className="space-y-12 text-center max-w-md px-8">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 border border-amber-400/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border border-amber-400/40 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-serif text-white leading-tight">Initializing Strategic Command</h2>
          <div className="h-px w-24 bg-amber-400/50 mx-auto"></div>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-500 animate-pulse">
            Committing Roadmap to Operational Memory
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 opacity-40">
           <div className="h-[1px] bg-white/20"></div>
           <div className="h-[1px] bg-amber-400/40"></div>
           <div className="h-[1px] bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};
