
import React from 'react';
import { UserData, IntelligenceState, SystemRecommendation } from '../types';

interface StepProps {
  data: UserData;
  updateData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  intelligence: IntelligenceState;
}

/**
 * Radar Chart Component for Strategic Readiness
 */
const RadarChart: React.FC<{ scores: { data: number, infrastructure: number, culture: number }, size?: number }> = ({ scores, size = 300 }) => {
  const center = size / 2;
  const radius = size * 0.4;
  
  // Vertices for triangle (Data top, Infra bottom right, Culture bottom left)
  const getPoint = (angle: number, score: number) => {
    const r = (score / 100) * radius;
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const p1 = getPoint(0, scores.data);
  const p2 = getPoint(120, scores.infrastructure);
  const p3 = getPoint(240, scores.culture);

  const pointsString = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  
  // Background reference lines
  const ref1 = getPoint(0, 100);
  const ref2 = getPoint(120, 100);
  const ref3 = getPoint(240, 100);

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grids */}
        {[25, 50, 75, 100].map(val => (
          <polygon
            key={val}
            points={`${getPoint(0, val).x},${getPoint(0, val).y} ${getPoint(120, val).x},${getPoint(120, val).y} ${getPoint(240, val).x},${getPoint(240, val).y}`}
            fill="none"
            stroke="#EFE9E4"
            strokeWidth="1"
          />
        ))}
        {/* Axis lines */}
        <line x1={center} y1={center} x2={ref1.x} y2={ref1.y} stroke="#EFE9E4" strokeWidth="1" />
        <line x1={center} y1={center} x2={ref2.x} y2={ref2.y} stroke="#EFE9E4" strokeWidth="1" />
        <line x1={center} y1={center} x2={ref3.x} y2={ref3.y} stroke="#EFE9E4" strokeWidth="1" />
        
        {/* Data Shape */}
        <polygon
          points={pointsString}
          fill="rgba(245, 158, 11, 0.1)"
          stroke="#F59E0B"
          strokeWidth="2"
          className="transition-all duration-1000 ease-out"
        />

        {/* Labels */}
        <text x={ref1.x} y={ref1.y - 15} textAnchor="middle" className="text-[10px] font-bold uppercase tracking-widest fill-[#999]">Data</text>
        <text x={ref2.x + 10} y={ref2.y + 15} textAnchor="start" className="text-[10px] font-bold uppercase tracking-widest fill-[#999]">Infrastructure</text>
        <text x={ref3.x - 10} y={ref3.y + 15} textAnchor="end" className="text-[10px] font-bold uppercase tracking-widest fill-[#999]">Culture</text>
      </svg>
    </div>
  );
};

export const Step1: React.FC<StepProps> = ({ data, updateData, nextStep }) => {
  const industries = ["Fashion", "Retail", "Luxury Goods", "B2B SaaS", "Professional Services", "Real Estate", "E-commerce", "Hospitality", "FinTech", "Creative Agency"];
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

  const isLoading = recommendations.length === 0;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Recommended systems for your business</h1>
        <p className="text-lg text-[#666] font-light font-body-serif">Based on your diagnostics, we recommend the following strategic systems. Select up to 3.</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="p-8 border border-[#EFE9E4] bg-[#FAF8F6] animate-pulse space-y-4">
              <div className="h-8 bg-[#EFE9E4] w-1/3"></div>
              <div className="h-4 bg-[#EFE9E4] w-full"></div>
              <div className="h-4 bg-[#EFE9E4] w-2/3"></div>
              <div className="h-3 bg-[#EFE9E4] w-1/4 mt-6"></div>
            </div>
          ))
        ) : (
          recommendations.map((s) => (
            <button 
              key={s.id}
              onClick={() => toggleSystem(s.name)}
              className={`text-left p-8 border transition-all relative group ${data.selectedSystems.includes(s.name) ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white border-[#EFE9E4] hover:border-[#D1C7BD]'}`}
            >
              {s.recommended && !data.selectedSystems.includes(s.name) && (
                <span className="absolute top-4 right-8 text-[9px] uppercase tracking-[0.2em] text-amber-600 font-bold bg-amber-50 px-3 py-1 border border-amber-200">Recommended Architecture</span>
              )}
              <h3 className="text-2xl font-serif mb-4">{s.name}</h3>
              <p className={`text-sm leading-relaxed mb-4 ${data.selectedSystems.includes(s.name) ? 'text-gray-300' : 'text-[#777]'}`}>{s.description}</p>
              <div className={`text-[11px] font-bold uppercase tracking-widest ${data.selectedSystems.includes(s.name) ? 'text-amber-400' : 'text-amber-600'}`}>
                Business Impact: {s.whyItMatters}
              </div>
            </button>
          ))
        )}
      </div>

      <button 
        disabled={data.selectedSystems.length === 0 || isLoading}
        onClick={nextStep}
        className={`w-full py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all ${data.selectedSystems.length > 0 && !isLoading ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        Assess Execution Readiness →
      </button>
    </div>
  );
};

export const Step4: React.FC<StepProps & { assessment: any }> = ({ data, nextStep, assessment }) => {
  const isLoading = !assessment;

  return (
    <div className="space-y-12 text-center py-6 animate-fade-enter-active">
      <header className="space-y-6">
        <h1 className="text-5xl font-serif">Readiness Audit</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">“Evaluating the friction between vision and execution.”</p>
      </header>

      {isLoading ? (
        <div className="py-24 space-y-8">
          <div className="w-24 h-24 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#AAA]">Synthesizing Operational Audit...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual Column */}
            <div className="flex flex-col items-center space-y-8">
              <RadarChart scores={assessment.areaScores} />
              <div className="flex flex-col items-center">
                <span className="text-7xl font-serif leading-none">{assessment.score}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mt-2">Aggregate Readiness</span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="text-left space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif italic text-[#1A1A1A] leading-tight">
                  {assessment.score > 75 ? "Strategic Alignment Found" : "Structural Friction Detected"}
                </h2>
                <p className="text-base font-light text-[#555] leading-relaxed font-body-serif">
                  {assessment.feedback}
                </p>
              </div>

              <div className="bg-[#FAF8F6] p-8 border border-[#EFE9E4] space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mb-4">Dimension Analysis</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase">
                      <span className="text-[#999]">Data Maturity</span>
                      <span className="text-[#1A1A1A]">{assessment.areaScores.data}%</span>
                    </div>
                    <div className="h-1 bg-[#EFE9E4] w-full">
                      <div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.data}%` }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase pt-2">
                      <span className="text-[#999]">Infrastructure</span>
                      <span className="text-[#1A1A1A]">{assessment.areaScores.infrastructure}%</span>
                    </div>
                    <div className="h-1 bg-[#EFE9E4] w-full">
                      <div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.infrastructure}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase pt-2">
                      <span className="text-[#999]">Org. Culture</span>
                      <span className="text-[#1A1A1A]">{assessment.areaScores.culture}%</span>
                    </div>
                    <div className="h-1 bg-[#EFE9E4] w-full">
                      <div className="h-full bg-amber-400" style={{ width: `${assessment.areaScores.culture}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-8 text-left">
            {assessment.criticalGaps?.length > 0 && (
              <div className="border-t border-[#EFE9E4] pt-8">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mb-6">Strategic Gap Remediation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessment.criticalGaps.map((gap: string, i: number) => (
                    <div key={i} className="p-5 border border-[#EFE9E4] bg-white flex items-start gap-4 shadow-sm">
                      <span className="text-amber-500 font-serif text-xl">!</span>
                      <p className="text-sm font-medium text-[#444] leading-relaxed">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={nextStep}
            className="w-full mt-12 py-6 text-sm uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
          >
            Construct Strategic Roadmap →
          </button>
        </>
      )}
    </div>
  );
};

export const Step5: React.FC<StepProps & { onLaunch: () => void }> = ({ data, onLaunch }) => {
  const isLoading = !data.roadmap;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Your 90-day execution plan</h1>
        <p className="text-lg text-[#666] font-light font-body-serif italic">“Phased initialization prioritized for maximum ROI.”</p>
      </header>

      {isLoading ? (
        <div className="py-24 text-center space-y-8">
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-[#1A1A1A] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#AAA]">Architecting Strategic Sequencing...</p>
        </div>
      ) : (
        <div className="space-y-12">
          {data.roadmap?.map((phase, idx) => (
            <div key={idx} className="relative pl-12 border-l border-[#D1C7BD] pb-12 last:pb-0 group">
              <div className="absolute left-[-6px] top-0 w-3 h-3 rounded-full bg-[#1A1A1A] transition-transform group-hover:scale-125" />
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold mb-2 block">Phase {idx + 1} — {phase.duration}</span>
                <h3 className="text-3xl font-serif">{phase.title}</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {phase.outcomes.map((outcome, oIdx) => (
                  <li key={oIdx} className="p-6 border border-[#EFE9E4] bg-[#FAF8F6] flex items-start gap-4 text-[#1A1A1A] font-medium text-sm leading-relaxed transition-all hover:border-amber-200">
                    <span className="text-amber-500 mt-0.5">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-12 border-t border-[#EFE9E4]">
             <button 
              onClick={onLaunch}
              className="w-full py-6 text-sm uppercase tracking-[0.3em] font-bold bg-[#1A1A1A] text-white hover:bg-[#333] transition-all shadow-xl shadow-amber-900/10"
            >
              Initialize Strategic Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
