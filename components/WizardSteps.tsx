
import React, { useState, useEffect } from 'react';
import { UserData, IntelligenceState, RoadmapPhase } from '../types';

interface StepProps {
  data: UserData;
  updateData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  intelligence: IntelligenceState;
}

export const Step1: React.FC<StepProps> = ({ data, updateData, nextStep, intelligence }) => {
  const industries = ["E-commerce", "Fashion", "Real Estate", "Professional Services", "Healthcare", "Technology", "Manufacturing", "Finance"];
  
  const isComplete = data.fullName && data.companyName && data.industry && data.description;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Tell us about your business</h1>
        <p className="text-lg text-[#666] font-light">We use this to understand your business and design a practical AI plan.</p>
      </header>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-[#888]">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-[#D1C7BD] py-2 outline-none focus:border-[#1A1A1A] transition-colors"
              value={data.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
              placeholder="John Smith"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-[#888]">Company Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-[#D1C7BD] py-2 outline-none focus:border-[#1A1A1A] transition-colors"
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              placeholder="Lux Media"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-[#888]">Website URL (Optional)</label>
          <input 
            type="text" 
            className="w-full bg-transparent border-b border-[#D1C7BD] py-2 outline-none focus:border-[#1A1A1A] transition-colors"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            placeholder="https://company.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-[#888]">Industry</label>
          <select 
            className="w-full bg-transparent border-b border-[#D1C7BD] py-2 outline-none focus:border-[#1A1A1A] transition-colors appearance-none"
            value={data.industry}
            onChange={(e) => updateData({ industry: e.target.value })}
          >
            <option value="">Select Industry</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-[#888]">Business Description</label>
          <textarea 
            rows={4}
            className="w-full bg-transparent border border-[#D1C7BD] p-4 outline-none focus:border-[#1A1A1A] transition-colors resize-none"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="What do you sell, who do you sell to, and what is slowing growth today?"
          />
        </div>
      </div>

      <button 
        disabled={!isComplete}
        onClick={nextStep}
        className={`w-full py-5 text-lg font-medium tracking-wide transition-all ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        Continue →
      </button>
    </div>
  );
};

export const Step2: React.FC<StepProps & { industryContent: any }> = ({ data, updateData, nextStep, industryContent }) => {
  const [selectedBlocker, setSelectedBlocker] = useState(data.blocker);
  const [selectedManual, setSelectedManual] = useState(data.manualWork);
  
  const isComplete = data.blocker && data.manualWork && data.speed && data.priority;

  return (
    <div className="space-y-16">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
          {industryContent?.dynamicTitle || `What's holding your growth back right now?`}
        </h1>
        <p className="text-lg text-[#666] font-light italic">“Let’s focus on the biggest issues so we fix the right things first.”</p>
      </header>

      <div className="space-y-12">
        {/* Sales & Growth */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-l-2 border-amber-300 pl-4">Sales & Growth</h2>
          <p className="text-sm text-[#888]">Which area is currently the biggest blocker to growing your business?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(industryContent?.salesOptions || ["Acquisition velocity", "Lead qualification", "Conversion rates", "Sales cycle length"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ blocker: opt })}
                className={`text-left p-4 border transition-all ${data.blocker === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        {/* Manual Work */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-l-2 border-amber-300 pl-4">Manual Work</h2>
          <p className="text-sm text-[#888]">Where does your team spend the most time on repetitive work?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(industryContent?.manualWorkOptions || ["Content production", "Client onboarding", "Data entry & reporting", "Support responses"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ manualWork: opt })}
                className={`text-left p-4 border transition-all ${data.manualWork === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        {/* Speed */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-l-2 border-amber-300 pl-4">Execution Speed</h2>
          <p className="text-sm text-[#888]">How long does it usually take to complete a key action?</p>
          <div className="flex flex-wrap gap-4">
            {["1-2 Days", "3-5 Days", "1-2 Weeks", "1 Month+"].map((opt) => (
              <button 
                key={opt}
                onClick={() => updateData({ speed: opt })}
                className={`px-6 py-3 border transition-all rounded-full ${data.speed === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        {/* Priority */}
        <section className="space-y-6">
          <h2 className="text-xl font-medium border-l-2 border-amber-300 pl-4">Priority</h2>
          <p className="text-sm text-[#888]">If you could fix one thing right now, what would help the most?</p>
          <div className="grid grid-cols-1 gap-4">
            {(industryContent?.priorityOptions || ["Increasing Revenue", "Time Savings", "Cost Reduction", "Customer Experience"]).map((opt: string) => (
              <button 
                key={opt}
                onClick={() => updateData({ priority: opt })}
                className={`text-left p-6 border transition-all ${data.priority === opt ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
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
        className={`w-full py-5 text-lg font-medium tracking-wide transition-all ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        Review Recommended Systems →
      </button>
    </div>
  );
};

export const Step3: React.FC<StepProps> = ({ data, updateData, nextStep }) => {
  const systems = [
    { id: 'growth', name: 'Growth Engine', desc: 'Accelerates lead capture and qualification using dynamic engagement patterns.', recommended: true },
    { id: 'content', name: 'Content Automation', desc: 'Streamlines editorial output and visual marketing at scale.', recommended: true },
    { id: 'ops', name: 'Operations Autopilot', desc: 'Removes bottlenecks in service delivery and client management tasks.', recommended: false },
    { id: 'support', name: 'Customer Support AI', desc: 'Ensures 24/7 high-fidelity resolution for complex client inquiries.', recommended: true },
    { id: 'analytics', name: 'Analytics Dashboard', desc: 'Predictive modeling for revenue forecasting and performance gaps.', recommended: false }
  ];

  const toggleSystem = (name: string) => {
    const current = data.selectedSystems;
    if (current.includes(name)) {
      updateData({ selectedSystems: current.filter(s => s !== name) });
    } else if (current.length < 3) {
      updateData({ selectedSystems: [...current, name] });
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Recommended systems for your business</h1>
        <p className="text-lg text-[#666] font-light">Select up to 3 systems to include in your strategy.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {systems.map((s) => (
          <button 
            key={s.id}
            onClick={() => toggleSystem(s.name)}
            className={`text-left p-8 border transition-all relative group ${data.selectedSystems.includes(s.name) ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
          >
            {s.recommended && !data.selectedSystems.includes(s.name) && (
              <span className="absolute top-4 right-8 text-[10px] uppercase tracking-widest text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">Recommended</span>
            )}
            <h3 className="text-2xl font-serif mb-2">{s.name}</h3>
            <p className={`text-sm ${data.selectedSystems.includes(s.name) ? 'text-gray-300' : 'text-[#777]'}`}>{s.desc}</p>
          </button>
        ))}
      </div>

      <button 
        disabled={data.selectedSystems.length === 0}
        onClick={nextStep}
        className={`w-full py-5 text-lg font-medium tracking-wide transition-all ${data.selectedSystems.length > 0 ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        Assess Readiness →
      </button>
    </div>
  );
};

export const Step4: React.FC<StepProps> = ({ data, nextStep }) => {
  return (
    <div className="space-y-12 text-center py-12">
      <header className="space-y-4">
        <h1 className="text-5xl font-serif">Assessment Complete</h1>
        <div className="flex justify-center py-12">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#EFE9E4]" />
              <circle 
                cx="96" 
                cy="96" 
                r="88" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - (data.readinessScore || 0) / 100)}
                className="text-amber-500 transition-all duration-1000" 
              />
            </svg>
            <span className="text-6xl font-serif">{data.readinessScore || 0}</span>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto space-y-8">
        <h2 className="text-2xl font-serif italic text-[#333] leading-relaxed">
          {data.readinessScore && data.readinessScore > 75 ? "“You're ready for rapid execution.”" : "“Strategic gaps identified.”"}
        </h2>
        <p className="text-lg font-light text-[#555] leading-relaxed">
          {data.readinessFeedback || "Analyzing your operational data for readiness..."}
        </p>
      </div>

      <button 
        onClick={nextStep}
        className="w-full mt-12 py-5 text-lg font-medium tracking-wide bg-[#1A1A1A] text-white hover:bg-[#333] transition-all"
      >
        Review Execution Plan →
      </button>
    </div>
  );
};

export const Step5: React.FC<StepProps & { onLaunch: () => void }> = ({ data, onLaunch }) => {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Your recommended execution plan</h1>
        <p className="text-lg text-[#666] font-light">A structured 90-day roadmap designed for {data.companyName}.</p>
      </header>

      <div className="space-y-12">
        {data.roadmap?.map((phase, idx) => (
          <div key={idx} className="relative pl-12 border-l border-[#D1C7BD] pb-12 last:pb-0">
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-1 block">Phase {idx + 1} — {phase.duration}</span>
              <h3 className="text-2xl font-serif">{phase.title}</h3>
            </div>
            <ul className="space-y-3">
              {phase.outcomes.map((outcome, oIdx) => (
                <li key={oIdx} className="flex items-start gap-3 text-[#555] font-light">
                  <span className="text-amber-500 mt-1">→</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button 
        onClick={onLaunch}
        className="w-full py-5 text-lg font-medium tracking-wide bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
      >
        Launch my dashboard
      </button>
    </div>
  );
};
