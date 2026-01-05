
import React from 'react';

interface ThreePanelLayoutProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({ left, center, right }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FDFCFB]">
      {/* LEFT PANEL - Context (20%) */}
      <aside className="lg:w-1/5 border-b lg:border-b-0 lg:border-r border-[#EFE9E4] p-8 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-[#999] font-medium">Sun AI Agency</span>
          </div>
          <div className="flex-1">
            {left}
          </div>
        </div>
      </aside>

      {/* CENTER PANEL - Work (50%) */}
      <main className="lg:w-1/2 p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          {center}
        </div>
      </main>

      {/* RIGHT PANEL - Intelligence (30%) */}
      <aside className="lg:w-[30%] bg-[#FAF8F6] p-8 lg:p-12 lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-t lg:border-t-0 lg:border-l border-[#EFE9E4]">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-xs uppercase tracking-widest text-[#777] font-semibold">Sun Intelligence</span>
          </div>
          <div className="flex-1 font-body-serif text-[#444] leading-relaxed">
            {right}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ThreePanelLayout;
