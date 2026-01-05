import React, { useState, useEffect } from 'react';
import { UserData, IntelligenceState, RoadmapPhase, SystemRecommendation } from '../types';

interface StepProps {
  data: UserData;
  updateData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  intelligence: IntelligenceState;
}

export const Step1: React.FC<StepProps> = ({ data, updateData, nextStep, intelligence }) => {
  const industries = ["Luxury Goods", "B2B SaaS", "Professional Services", "Real Estate", "E-commerce", "Hospitality", "FinTech", "Creative Agency"];
  
  const isComplete = data.fullName && data.companyName && data.industry && data.description;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Tell us about your business</h1>
        <p className="text-lg text-[#666] font-light font-body-serif">We use this to understand your business and design a practical AI plan.</p>
      </header>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg"
              value={data.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
              placeholder="Full Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Company Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg"
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              placeholder="Company Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Website URL (Optional)</label>
          <input 
            type="text" 
            className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            placeholder="https://"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Industry Sector</label>
          <select 
            className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors appearance-none text-lg"
            value={data.industry}
            onChange={(e) => updateData({ industry: e.target.value })}
          >
            <option value="">Select Sector</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Business Description</label>
          <textarea 
            rows={5}
            className="w-full bg-transparent border border-[#D1C7BD] p-6 outline-none focus:border-[#1A1A1A] transition-colors resize-none text-lg font-light leading-relaxed"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="What do you sell, who is your primary customer, and what is slowing growth today?"
          />
        </div>
      </div>

      <button 
        disabled={!isComplete}
        onClick={nextStep}
        className={`w-full py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        Continue to Diagnostics →
      </button>
    </div>
  );
};

export const Step2: React.FC<StepProps & { industryContent: any }> = ({ data, updateData, nextStep, industryContent }) => {
  const isComplete = data.blocker && data.manualWork && data.speed && data.priority;

  return (
    <div className="space-y-16 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          {industryContent?.dynamicTitle || `Where is growth being restricted?`}
        </h1>
        <p className="text-lg text-[#666] font-light italic font-body-serif">“We must identify the primary friction points before designing the system.”</p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Revenue & Acquisition</h2>
          <p className="text-base text-[#666] font-body-serif">Which area is currently the biggest blocker to growing your business?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(industryContent?.salesOptions || ["Scaling leads", "Sales efficiency", "Market positioning", "Conversion velocity"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ blocker: opt })}
                className={`text-left p-6 border transition-all text-sm font-medium tracking-wide ${data.blocker === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Operational Drag</h2>
          <p className="text-base text-[#666] font-body-serif">Where does your team spend the most time on repetitive work?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(industryContent?.manualWorkOptions || ["Client reporting", "Document creation", "Data orchestration", "Support handling"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ manualWork: opt })}
                className={`text-left p-6 border transition-all text-sm font-medium tracking-wide ${data.manualWork === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Execution Speed</h2>
          <p className="text-base text-[#666] font-body-serif">How long does it usually take to complete a key client action?</p>
          <div className="flex flex-wrap gap-4">
            {["< 24 Hours", "2-3 Days", "1 Week", "2 Weeks+"].map((opt) => (
              <button 
                key={opt}
                onClick={() => updateData({ speed: opt })}
                className={`px-8 py-3 border transition-all rounded-full text-xs uppercase tracking-widest font-bold ${data.speed === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A1A] border-l-2 border-amber-400 pl-4">Executive Priority</h2>
          <p className="text-base text-[#666] font-body-serif">If you could fix one thing right now, what would have the most impact?</p>
          <div className="grid grid-cols-1 gap-4">
            {(industryContent?.priorityOptions || ["Increasing Net Revenue", "Time Reclaiming", "Unit Cost Reduction", "Client Experience"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ priority: opt })}
                className={`text-left p-6 border transition-all text-sm font-medium tracking-wide ${data.priority === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] bg-white hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>
      </div>

      <button 
        disabled={!isComplete}
        onClick={nextStep}
        className={`w-full py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        View Recommended Systems →
      </button>
    </div>
  );
};

export const Step3: React.FC<StepProps & { recommendations: SystemRecommendation[] }> = ({ data, updateData, nextStep, recommendations }) => {
  const toggleSystem = (name: string) => {
    const current = data.selectedSystems;
    if (current.includes(name)) {
      updateData({ selectedSystems: current.filter(s => s !== name) });
    } else if (current.length < 3) {
      updateData({ selectedSystems: [...current, name] });
    }
  };

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Recommended systems for your business</h1>
        <p className="text-lg text-[#666] font-light font-body-serif">Based on your diagnostics, we recommend the following strategic systems. Select up to 3.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((s) => (
          <button 
            key={s.id}
            onClick={() => toggleSystem(s.name)}
            className={`text-left p-8 border transition-all relative group ${data.selectedSystems.includes(s.name) ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
          >
            {s.recommended && !data.selectedSystems.includes(s.name) && (
              <span className="absolute top-4 right-8 text-[9px] uppercase tracking-[0.2em] text-amber-600 font-bold bg-amber-50 px-3 py-1 border border-amber-200">Highly Recommended</span>
            )}
            <h3 className="text-2xl font-serif mb-4">{s.name}</h3>
            <p className={`text-sm leading-relaxed mb-4 ${data.selectedSystems.includes(s.name) ? 'text-gray-300' : 'text-[#777]'}`}>{s.description}</p>
            <div className={`text-[11px] font-bold uppercase tracking-widest ${data.selectedSystems.includes(s.name) ? 'text-amber-400' : 'text-amber-600'}`}>
              Impact: {s.whyItMatters}
            </div>
          </button>
        ))}
      </div>

      <button 
        disabled={data.selectedSystems.length === 0}
        onClick={nextStep}
        className={`w-full py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all ${data.selectedSystems.length > 0 ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        Assess Execution Readiness →
      </button>
    </div>
  );
};

export const Step4: React.FC<StepProps & { assessment: any }> = ({ data, nextStep, assessment }) => {
  return (
    <div className="space-y-12 text-center py-12 animate-fade-enter-active">
      <header className="space-y-6">
        <h1 className="text-5xl font-serif">Assessment Complete</h1>
        <div className="flex justify-center py-12">
          <div className="relative w-56 h-56 flex items-center justify-center">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-[#EFE9E4]" />
              <circle 
                cx="112" 
                cy="112" 
                r="100" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - (assessment?.score || 0) / 100)}
                className="text-[#1A1A1A] transition-all duration-1000" 
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-7xl font-serif leading-none">{(assessment?.score || 0)}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mt-2">Readiness Score</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-xl mx-auto space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif italic text-[#333] leading-relaxed">
            {assessment?.score > 75 ? "“A clear path to execution.”" : "“Gaps in data infrastructure.”"}
          </h2>
          <p className="text-lg font-light text-[#555] leading-relaxed font-body-serif">
            {assessment?.feedback || "Calculating strategic operational maturity..."}
          </p>
        </div>

        {assessment?.criticalGaps?.length > 0 && (
          <div className="text-left bg-[#FAF8F6] p-8 border border-[#EFE9E4]">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mb-4">Gaps to Address</h4>
            <ul className="space-y-3">
              {assessment.criticalGaps.map((gap: string, i: number) => (
                <li key={i} className="text-sm font-medium flex gap-3 text-[#444]">
                  <span className="text-amber-500">•</span> {gap}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button 
        onClick={nextStep}
        className="w-full mt-12 py-6 text-sm uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all"
      >
        View Strategic Roadmap →
      </button>
    </div>
  );
};

export const Step5: React.FC<StepProps & { onLaunch: () => void }> = ({ data, onLaunch }) => {
  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Your recommended execution plan</h1>
        <p className="text-lg text-[#666] font-light font-body-serif">A structured 90-day roadmap designed for {data.companyName}.</p>
      </header>

      <div className="space-y-12">
        {data.roadmap?.map((phase, idx) => (
          <div key={idx} className="relative pl-12 border-l border-[#D1C7BD] pb-12 last:pb-0 group">
            <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-[#1A1A1A] transition-transform group-hover:scale-125" />
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold mb-2 block">Phase {idx + 1} — {phase.duration}</span>
              <h3 className="text-2xl font-serif">{phase.title}</h3>
            </div>
            <ul className="space-y-4">
              {phase.outcomes.map((outcome, oIdx) => (
                <li key={oIdx} className="flex items-start gap-4 text-[#555] font-light font-body-serif text-base leading-relaxed">
                  <span className="text-amber-500 mt-1.5 text-xs">→</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button 
        onClick={onLaunch}
        className="w-full py-6 text-sm uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
      >
        Launch Strategy Dashboard
      </button>
    </div>
  );
};
