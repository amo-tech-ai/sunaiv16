import React, { useState, useEffect, useCallback } from 'react';
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
import { getReadinessAssessment, getRoadmap, getSystemRecommendations, getArchitectureBlueprint } from './services/gemini/strategy';

const App: React.FC = () => {
  const { step, setStep, userData, updateUserData, nextStep, prevStep, resetWizard } = useWizard();
  const { intelligence, setIntelligence, handleStreamingNotes } = useIntelligence();

  const [industryContent, setIndustryContent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<SystemRecommendation[]>([]);
  const [assessment, setAssessment] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Unified error handler for production stability
  const handleError = useCallback((err: any, context: string) => {
    console.error(`Error in ${context}:`, err);
    setIntelligence(prev => ({
      ...prev,
      notes: "Our intelligence protocols encountered a temporary interruption. Re-establishing secure link...",
      status: 'idle'
    }));
  }, [setIntelligence]);

  // Step 1: Initial Research & Grounding
  useEffect(() => {
    const shouldResearch = step === 1 && userData.industry && userData.description.length > 50;
    
    if (shouldResearch) {
      const research = async () => {
        setIsProcessing(true);
        setIntelligence(prev => ({ 
          ...prev, 
          status: 'analyzing', 
          notes: 'Synthesizing market intelligence and verifying digital footprint...' 
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
            observations: res.observations,
            citations: res.citations
          }));
        } catch (error) {
          handleError(error, 'Step 1 Discovery');
        } finally {
          setIsProcessing(false);
        }
      };
      
      const timer = setTimeout(research, 1500); 
      return () => clearTimeout(timer);
    }
  }, [step, userData.industry, userData.description, userData.companyName, userData.website, handleError, setIntelligence]);

  // Step 2-5 Strategic Orchestration
  useEffect(() => {
    const runStepLogic = async () => {
      switch (step) {
        case 2:
          // Regenerate diagnostics if context changed significantly or if null
          if (!industryContent && userData.industry) {
            handleStreamingNotes(`Connecting your ${userData.industry} challenges to specific strategic solutions. We are identifying the exact friction points in your current revenue funnel.`);
            try {
              // Pass the narrative brief (intelligence.notes) to ensure S2 is built on S1 findings
              const content = await getIndustrySpecificQuestions(userData.industry, userData, intelligence.notes);
              setIndustryContent(content);
            } catch (err) {
              handleError(err, 'Step 2 Diagnostics');
            }
          }
          break;
        case 3:
          if (recommendations.length === 0) {
            handleStreamingNotes(`Mapping your unique friction points to a modular AI architecture. We are selecting high-impact engines that prioritize speed-to-market.`);
            try {
              const res = await getSystemRecommendations(userData);
              setRecommendations(res);
            } catch (err) {
              handleError(err, 'Step 3 Recommendations');
            }
          }
          break;
        case 4:
          if (!assessment && userData.selectedSystems.length > 0) {
            handleStreamingNotes(`Conducting a multi-dimensional operational audit. We are measuring the distance between your current data maturity and automated scale.`);
            try {
              const res = await getReadinessAssessment(userData);
              setAssessment(res);
              updateUserData({ 
                readinessScore: res.score, 
                readinessFeedback: res.feedback,
                readinessAreas: res.areaScores,
                confidence: res.confidence
              });
            } catch (err) {
              handleError(err, 'Step 4 Audit');
            }
          }
          break;
        case 5:
          if (!userData.roadmap && assessment) {
            handleStreamingNotes(`Sequencing your 90-day execution plan. Phases are architected to clear operational clutter first, followed by rapid AI deployment.`);
            try {
              const res = await getRoadmap(userData);
              updateUserData({ roadmap: res });
            } catch (err) {
              handleError(err, 'Step 5 Roadmap');
            }
          }
          break;
      }
    };
    runStepLogic();
  }, [step, userData.blocker, userData.manualWork, userData.priority, userData.industry, handleStreamingNotes, handleError, assessment, recommendations.length, industryContent, updateUserData, userData, intelligence.notes]);

  // Architecture Blueprint (SVG) Generation Loop
  useEffect(() => {
    if (step === 3 && userData.selectedSystems.length > 0 && !userData.svgArchitecture) {
      getArchitectureBlueprint(userData)
        .then(svg => updateUserData({ svgArchitecture: svg }))
        .catch(err => console.warn("Architecture visualization deferred:", err));
    }
  }, [userData.selectedSystems, step, userData.svgArchitecture, updateUserData]);

  // Global "Launch" Transition
  if (step === 6) {
    return (
      <div className="animate-fade-enter-active">
        <ClientDashboard userData={userData} updateUserData={updateUserData} resetWizard={resetWizard} />
      </div>
    );
  }

  return (
    <ThreePanelLayout
      left={
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.5em] font-bold text-[#AAA]">
              <span>Strategy Progress</span>
              <span className="text-amber-600">{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-[2px] bg-[#F2F0EE] w-full overflow-hidden">
              <div 
                className="h-full bg-[#1A1A1A] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {step > 1 && (
            <div className="space-y-10 pt-10 border-t border-[#EFE9E4] animate-fade-enter-active">
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#CCC] font-bold">Organization</span>
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#1A1A1A] truncate">{userData.companyName}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#CCC] font-bold">Mandate</span>
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-[#1A1A1A]">{userData.industry}</p>
              </div>
              {userData.priority && (
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#CCC] font-bold">Primary Target</span>
                  <p className="text-xs font-bold tracking-[0.1em] uppercase text-amber-600 leading-relaxed">{userData.priority}</p>
                </div>
              )}
            </div>
          )}
        </div>
      }
      center={
        <div className="min-h-[70vh]">
          {step === 1 && <Step1Context data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} />}
          {step === 2 && <Step2Diagnostics data={userData} updateData={updateUserData} nextStep={nextStep} prevStep={prevStep} intelligence={intelligence} industryContent={industryContent} />}
          {step === 3 && <Step3Systems data={userData} updateData={updateUserData} nextStep={nextStep} prevStep={prevStep} recommendations={recommendations} />}
          {step === 4 && <Step4Readiness data={userData} nextStep={nextStep} prevStep={prevStep} assessment={assessment} />}
          {step === 5 && <Step5Roadmap data={userData} prevStep={prevStep} onLaunch={() => setStep(6)} />}
        </div>
      }
      right={
        <div className="space-y-16">
          <div className="min-h-[160px] relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-xs uppercase tracking-widest text-[#777] font-semibold">Sun Intelligence</span>
              {intelligence.detectedModel && (
                <span className="ml-auto text-[9px] uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-2 py-0.5 border border-amber-200">
                  {intelligence.detectedModel}
                </span>
              )}
            </div>
            <div className="text-xl leading-[1.65] text-[#1A1A1A] font-body-serif font-light whitespace-pre-wrap transition-all duration-500">
              {intelligence.notes}
              {intelligence.status === 'analyzing' && (
                <span className="inline-block w-[3px] h-6 ml-3 bg-amber-400 animate-pulse align-middle"></span>
              )}
            </div>
          </div>

          {intelligence.citations && intelligence.citations.length > 0 && (
            <div className="space-y-6 pt-10 border-t border-[#EFE9E4] animate-fade-enter-active">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA]">Market Sources</h4>
              <div className="space-y-4">
                {intelligence.citations.map((cite, i) => (
                  <a key={i} href={cite.uri} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[11px] text-[#444] hover:text-[#1A1A1A] transition-colors font-medium group">
                    <span className="text-amber-600 font-bold opacity-40 group-hover:opacity-100">0{i+1}</span>
                    <span className="underline decoration-amber-200 decoration-1 underline-offset-4 truncate">{cite.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {intelligence.observations && intelligence.observations.length > 0 && (
            <div className="space-y-10 pt-10 border-t border-[#EFE9E4] animate-fade-enter-active">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA]">Strategic Brief</h4>
              <ul className="space-y-10">
                {intelligence.observations.map((obs, i) => (
                  <li key={i} className="flex gap-5 items-start group">
                    <span className="text-amber-500 font-serif text-2xl leading-none italic opacity-25 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                    <span className="text-sm leading-relaxed text-[#444] font-body-serif font-light">{obs}</span>
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
