import React, { useState, useEffect } from 'react';
import ThreePanelLayout from './components/ThreePanelLayout';
import { Step1Context } from './components/wizard/Step1Context';
import { Step2Diagnostics } from './components/wizard/Step2Diagnostics';
import { Step3Systems } from './components/wizard/Step3Systems';
import { Step4Readiness } from './components/wizard/Step4Readiness';
import { Step5Roadmap } from './components/wizard/Step5Roadmap';
import { ClientDashboard } from './components/dashboard/ClientDashboard';
import { useWizard } from './hooks/useWizard';
import { useIntelligence } from './hooks/useIntelligence';
import { SystemRecommendation } from './types';
import { getBusinessIntelligence, getIndustrySpecificQuestions } from './services/gemini/discovery';
import { getReadinessAssessment, getRoadmap, getSystemRecommendations } from './services/gemini/strategy';

const App: React.FC = () => {
  const { step, setStep, userData, updateUserData, nextStep, resetWizard } = useWizard();
  const { intelligence, setIntelligence, handleStreamingNotes } = useIntelligence();

  const [industryContent, setIndustryContent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<SystemRecommendation[]>([]);
  const [assessment, setAssessment] = useState<any>(null);
  const [isKeySelecting, setIsKeySelecting] = useState(false);

  // Requirement: API Key Selection for Pro models
  useEffect(() => {
    const checkKey = async () => {
      if (typeof window.aistudio !== 'undefined') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey && step > 2) {
          // If we are at Step 3 (Pro model requirement), force selection
          await window.aistudio.openSelectKey();
        }
      }
    };
    checkKey();
  }, [step]);

  const handleKeySelection = async () => {
    if (typeof window.aistudio !== 'undefined') {
      setIsKeySelecting(true);
      await window.aistudio.openSelectKey();
      setIsKeySelecting(false);
      // Proceeding immediately as per instructions to avoid race conditions
    }
  };

  // Phase 1: Context Research (Grounding + Analysis)
  useEffect(() => {
    if (step === 1 && userData.industry && userData.description.length > 30) {
      const research = async () => {
        setIntelligence(prev => ({ 
          ...prev, 
          status: 'analyzing', 
          notes: 'Initiating global market research and context verification...' 
        }));
        
        try {
          const res = await getBusinessIntelligence(userData.industry, userData.description, userData.companyName);
          setIntelligence(prev => ({
            ...prev,
            status: 'complete',
            notes: res.text,
            observations: [
              "Verified digital footprint through real-time research",
              "Identified sector-specific competitive moats",
              "Established baseline AI readiness parameters"
            ],
            citations: res.citations
          }));
        } catch (error) {
          console.error("Discovery error:", error);
        }
      };
      research();
    }
  }, [step, userData.industry, userData.description.length]);

  // Phase 2: Diagnostics Explanation (Streaming)
  useEffect(() => {
    if (step === 2) {
      const prompt = `We are moving into diagnostics for ${userData.companyName}. We are identifying friction in the ${userData.industry} sector. Explain why a deep diagnostic of sales blockers and manual labor is critical for a high-growth organization, especially in the current economic climate.`;
      handleStreamingNotes(prompt);

      if (userData.industry && !industryContent) {
        getIndustrySpecificQuestions(userData.industry, "Executive Model")
          .then(setIndustryContent)
          .catch(console.error);
      }
      
      setIntelligence(prev => ({
        ...prev,
        observations: [
          `Auditing ${userData.industry} specific friction points`,
          "Mapping operational bottlenecks to revenue velocity",
          "Identifying hidden labor costs"
        ]
      }));
    }
  }, [step]);

  // Phase 3: System Architecture (Pro Model + Thinking)
  useEffect(() => {
    if (step === 3) {
      const prompt = `Architecting strategic AI systems for ${userData.companyName}. Based on identified blockers in ${userData.blocker} and repetitive work in ${userData.manualWork}, explain the methodology of selecting specific high-ROI systems over generic tools.`;
      handleStreamingNotes(prompt);

      if (recommendations.length === 0) {
        getSystemRecommendations(userData)
          .then(res => {
            setRecommendations(res);
            setIntelligence(prev => ({ 
              ...prev, 
              observations: [
                "Prioritizing modular architectural integrity",
                "Aligning systems with executive growth targets",
                "Optimizing for 90-day time-to-value"
              ] 
            }));
          })
          .catch(err => {
            if (err.message?.includes("not found")) handleKeySelection();
          });
      }
    }
  }, [step]);

  // Phase 4: Readiness Assessment (Pro Model + High Thinking Budget)
  useEffect(() => {
    if (step === 4) {
      const prompt = `Conducting a multi-dimensional implementation readiness audit for ${userData.companyName}. Explain the correlation between data maturity and the success of ${userData.selectedSystems.join(', ')}.`;
      handleStreamingNotes(prompt);

      getReadinessAssessment(userData)
        .then(res => {
          setAssessment(res);
          updateUserData({ 
            readinessScore: res.score, 
            readinessFeedback: res.feedback,
            readinessAreas: res.areaScores
          });
          setIntelligence(prev => ({ 
            ...prev, 
            observations: [
              "Calculated operational maturity coefficient",
              "Identified structural implementation risks",
              "Synthesized remediation priorities"
            ] 
          }));
        })
        .catch(err => {
          if (err.message?.includes("not found")) handleKeySelection();
        });
    }
  }, [step]);

  // Phase 5: Roadmap Strategy (Pro Model + Complex Reasoning)
  useEffect(() => {
    if (step === 5) {
      const prompt = `Synthesizing the final execution roadmap for ${userData.companyName}. Focus on the transition from ${userData.blocker} to a high-velocity automated growth engine. Summarize why this specific sequence is the path of least resistance.`;
      handleStreamingNotes(prompt);

      getRoadmap(userData)
        .then(res => {
          updateUserData({ roadmap: res });
          setIntelligence(prev => ({ 
            ...prev, 
            observations: [
              "Sequenced foundation-first milestones",
              "Mapped reclaimed time to growth reinvestment",
              "Finalizing executive implementation checklist"
            ] 
          }));
        })
        .catch(err => {
          if (err.message?.includes("not found")) handleKeySelection();
        });
    }
  }, [step]);

  if (step === 6) {
    return <ClientDashboard userData={userData} resetWizard={resetWizard} />;
  }

  const renderLeft = () => (
    <div className="space-y-10">
      <div>
        <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA] mb-3">
          <span>Strategic Alignment</span>
          <span>{Math.round((step / 5) * 100)}%</span>
        </div>
        <div className="h-0.5 bg-[#EFE9E4] w-full">
          <div className="h-full bg-[#1A1A1A] transition-all duration-700 ease-out" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>
      <div className="space-y-8 pt-8 border-t border-[#EFE9E4]">
        {step > 1 && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Organization</span>
            <p className="text-xs font-bold tracking-wider uppercase text-[#1A1A1A]">{userData.companyName}</p>
          </div>
        )}
        {step > 1 && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Sector</span>
            <p className="text-xs font-bold tracking-wider uppercase text-[#1A1A1A]">{userData.industry}</p>
          </div>
        )}
        {step > 2 && userData.priority && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Core Focus</span>
            <p className="text-xs font-bold tracking-wider uppercase text-[#1A1A1A]">{userData.priority}</p>
          </div>
        )}
        {step > 3 && userData.selectedSystems.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Architected Systems</span>
            <div className="space-y-1">
              {userData.selectedSystems.map(s => (
                <p key={s} className="text-[10px] font-bold text-[#444] uppercase tracking-widest">• {s}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderRight = () => (
    <div className="space-y-12">
      <div className="relative">
        <p className="text-xl leading-relaxed text-[#333] font-body-serif font-light min-h-[120px] whitespace-pre-wrap">
          {intelligence.notes}
          {intelligence.status === 'analyzing' && <span className="inline-block w-1 h-5 ml-1 bg-amber-400 animate-pulse align-middle"></span>}
        </p>
      </div>

      {intelligence.citations && intelligence.citations.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-[#EFE9E4]">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Verified Research Sources</h4>
          <div className="space-y-2">
            {intelligence.citations.map((cite, i) => (
              <a key={i} href={cite.uri} target="_blank" rel="noopener noreferrer" className="block text-xs text-amber-700 hover:text-amber-900 transition-colors font-medium underline decoration-amber-200">
                [{i+1}] {cite.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {intelligence.observations.length > 0 && (
        <div className="space-y-8 pt-10 border-t border-[#EFE9E4]">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Consultant Observations</h4>
          <ul className="space-y-6">
            {intelligence.observations.map((obs, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span className="text-amber-500 font-serif text-2xl leading-none italic opacity-50">0{i+1}</span>
                <span className="text-sm leading-relaxed text-[#555] font-body-serif">{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step > 2 && (
        <div className="pt-8 border-t border-[#EFE9E4]">
          <button 
            onClick={handleKeySelection}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-600 hover:text-amber-800 transition-colors"
          >
            Update Strategic API Key
          </button>
        </div>
      )}
    </div>
  );

  return (
    <ThreePanelLayout
      left={renderLeft()}
      center={
        <div className="transition-all duration-700 ease-in-out">
          {step === 1 && <Step1Context data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} />}
          {step === 2 && <Step2Diagnostics data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} industryContent={industryContent} />}
          {step === 3 && <Step3Systems data={userData} updateData={updateUserData} nextStep={nextStep} recommendations={recommendations} />}
          {step === 4 && <Step4Readiness data={userData} nextStep={nextStep} assessment={assessment} />}
          {step === 5 && <Step5Roadmap data={userData} onLaunch={() => setStep(6)} />}
        </div>
      }
      right={renderRight()}
    />
  );
};

export default App;
