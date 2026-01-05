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
  const { step, setStep, userData, updateUserData, nextStep, prevStep, resetWizard } = useWizard();
  const { intelligence, setIntelligence, handleStreamingNotes } = useIntelligence();

  const [industryContent, setIndustryContent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<SystemRecommendation[]>([]);
  const [assessment, setAssessment] = useState<any>(null);

  // Step 1: Initial Research Loop
  useEffect(() => {
    if (step === 1 && userData.industry && userData.description.length > 30) {
      const research = async () => {
        setIntelligence(prev => ({ 
          ...prev, 
          status: 'analyzing', 
          notes: 'Synthesizing market intelligence and verifying digital presence...' 
        }));
        
        try {
          const res = await getBusinessIntelligence(
            userData.industry, 
            userData.description, 
            userData.companyName, 
            userData.website
          );
          setIntelligence(prev => ({
            ...prev,
            status: 'complete',
            notes: res.text,
            detectedModel: res.detectedModel,
            observations: [
              "Market landscape verified via Google Search",
              `Business model: ${res.detectedModel}`,
              "Verified primary scale bottlenecks for this sector"
            ],
            citations: res.citations
          }));
        } catch (error) {
          console.error("Discovery error:", error);
          if (error.message?.includes("not found")) {
            window.aistudio?.openSelectKey();
          }
        }
      };
      research();
    }
  }, [step, userData.industry, userData.description.length]);

  // Step 2-5 Orchestration
  useEffect(() => {
    const runStepLogic = async () => {
      switch (step) {
        case 2:
          const diagPrompt = `Analyzing ${userData.companyName}'s growth path. Connecting their friction points (${userData.blocker || 'initially identified'}) to AI fixes. Explain why 'The Messy Middle' is where most brands fail and how we restore sanity.`;
          handleStreamingNotes(diagPrompt);
          if (!industryContent && userData.industry) {
            const content = await getIndustrySpecificQuestions(userData.industry, { researchResults: intelligence.notes, ...userData });
            setIndustryContent(content);
          }
          break;
        case 3:
          handleStreamingNotes(`Designing architecture for ${userData.companyName}. Mapping ${userData.blocker} friction to automated growth engines.`);
          if (recommendations.length === 0) {
            const res = await getSystemRecommendations(userData);
            setRecommendations(res);
          }
          break;
        case 4:
          handleStreamingNotes(`Auditing operational readiness for ${userData.companyName}. We are measuring how much weight your current setup can handle before breaking under automated scale.`);
          if (!assessment) {
            const res = await getReadinessAssessment(userData);
            setAssessment(res);
            updateUserData({ 
              readinessScore: res.score, 
              readinessFeedback: res.feedback,
              readinessAreas: res.areaScores
            });
          }
          break;
        case 5:
          handleStreamingNotes(`Constructing the 90-day plan for ${userData.companyName}. Phase 1 is purely about buying back your time so you can design and lead.`);
          if (!userData.roadmap) {
            const res = await getRoadmap(userData);
            updateUserData({ roadmap: res });
          }
          break;
      }
    };
    runStepLogic();
  }, [step, userData.blocker, userData.manualWork, userData.priority]);

  if (step === 6) {
    return <ClientDashboard userData={userData} updateUserData={updateUserData} resetWizard={resetWizard} />;
  }

  return (
    <ThreePanelLayout
      left={
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">
              <span>Strategic Alignment</span>
              <span>{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-1 bg-[#EFE9E4] w-full">
              <div className="h-full bg-[#1A1A1A] transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }}></div>
            </div>
          </div>
          {step > 1 && (
            <div className="space-y-6 pt-8 border-t border-[#EFE9E4]">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Client</span>
                <p className="text-xs font-bold tracking-wider uppercase text-[#1A1A1A] truncate">{userData.companyName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Focus</span>
                <p className="text-xs font-bold tracking-wider uppercase text-[#1A1A1A]">{intelligence.detectedModel || userData.industry}</p>
              </div>
            </div>
          )}
        </div>
      }
      center={
        <div className="transition-all duration-700 ease-in-out">
          {step === 1 && <Step1Context data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} />}
          {step === 2 && <Step2Diagnostics data={userData} updateData={updateUserData} nextStep={nextStep} prevStep={prevStep} intelligence={intelligence} industryContent={industryContent} />}
          {step === 3 && <Step3Systems data={userData} updateData={updateUserData} nextStep={nextStep} prevStep={prevStep} recommendations={recommendations} />}
          {step === 4 && <Step4Readiness data={userData} nextStep={nextStep} prevStep={prevStep} assessment={assessment} />}
          {step === 5 && <Step5Roadmap data={userData} prevStep={prevStep} onLaunch={() => setStep(6)} />}
        </div>
      }
      right={
        <div className="space-y-12">
          <p className="text-xl leading-relaxed text-[#333] font-body-serif font-light min-h-[120px] whitespace-pre-wrap">
            {intelligence.notes}
            {intelligence.status === 'analyzing' && <span className="inline-block w-1 h-5 ml-1 bg-amber-400 animate-pulse align-middle"></span>}
          </p>

          {intelligence.citations && intelligence.citations.length > 0 && (
            <div className="space-y-4 pt-8 border-t border-[#EFE9E4]">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Market Sources</h4>
              <div className="space-y-2">
                {intelligence.citations.map((cite, i) => (
                  <a key={i} href={cite.uri} target="_blank" rel="noopener noreferrer" className="block text-xs text-amber-700 hover:text-amber-900 transition-colors font-medium underline decoration-amber-200 truncate">
                    [{i+1}] {cite.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {intelligence.observations.length > 0 && (
            <div className="space-y-8 pt-10 border-t border-[#EFE9E4]">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Strategic Observations</h4>
              <ul className="space-y-6">
                {intelligence.observations.map((obs, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="text-amber-500 font-serif text-lg leading-none italic opacity-50">0{i+1}</span>
                    <span className="text-sm leading-relaxed text-[#555] font-body-serif">{obs}</span>
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

export default App;