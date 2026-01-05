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
      notes: "Our intelligence protocols encountered a temporary interruption. Re-establishing link...",
      status: 'idle'
    }));
  }, [setIntelligence]);

  // Step 1: Initial Research & Grounding
  useEffect(() => {
    const shouldResearch = step === 1 && userData.industry && userData.description.length > 30;
    
    if (shouldResearch) {
      const research = async () => {
        setIsProcessing(true);
        setIntelligence(prev => ({ 
          ...prev, 
          status: 'analyzing', 
          notes: 'Synthesizing market intelligence for your specific sector...' 
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
            observations: [
              "Business model footprint verified",
              "Primary revenue velocity blockers identified",
              "Initial readiness baseline established"
            ],
            citations: res.citations
          }));
        } catch (error) {
          handleError(error, 'Step 1 Discovery');
        } finally {
          setIsProcessing(false);
        }
      };
      
      const timer = setTimeout(research, 800); // Debounce to prevent multiple calls
      return () => clearTimeout(timer);
    }
  }, [step, userData.industry, userData.description, handleError, setIntelligence]);

  // Step 2-5 Strategic Orchestration
  useEffect(() => {
    const runStepLogic = async () => {
      switch (step) {
        case 2:
          if (!industryContent && userData.industry) {
            handleStreamingNotes(`Connecting your ${userData.industry} challenges to specific strategic solutions. Our priority is operational velocity and reclaimed time.`);
            try {
              const content = await getIndustrySpecificQuestions(userData.industry, { ...userData });
              setIndustryContent(content);
            } catch (err) {
              handleError(err, 'Step 2 Diagnostics');
            }
          }
          break;
        case 3:
          if (recommendations.length === 0) {
            handleStreamingNotes(`Mapping your unique friction points to high-impact AI architecture. We are selecting tools that drive immediate ROI.`);
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
            handleStreamingNotes(`Conducting an evidence-based operational audit. We are identifying the distance between your current state and automated scale.`);
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
            handleStreamingNotes(`Architecting your 90-day execution plan. Each phase is sequenced to clear clutter and establish a persistent growth engine.`);
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
  }, [step, userData.blocker, userData.manualWork, userData.priority, userData.industry, handleStreamingNotes, handleError, assessment, recommendations.length, industryContent, updateUserData]);

  // Architecture Blueprint (SVG) Generation Loop
  useEffect(() => {
    if (step === 3 && userData.selectedSystems.length > 0 && !userData.svgArchitecture) {
      getArchitectureBlueprint(userData)
        .then(svg => updateUserData({ svgArchitecture: svg }))
        .catch(err => console.warn("SVG Generation skipped:", err));
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
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] font-bold text-[#AAA]">
              <span>Strategic Alignment</span>
              <span>{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="h-1 bg-[#F2F0EE] w-full overflow-hidden">
              <div 
                className="h-full bg-[#1A1A1A] transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)" 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {step > 1 && (
            <div className="space-y-8 pt-8 border-t border-[#EFE9E4] animate-fade-enter-active">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Client Command</span>
                <p className="text-xs font-bold tracking-wider uppercase text-[#1A1A1A] truncate">{userData.companyName}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Operational Context</span>
                <p className="text-xs font-bold tracking-wider uppercase text-[#1A1A1A]">{userData.industry}</p>
              </div>
              {userData.priority && (
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Primary Lever</span>
                  <p className="text-xs font-bold tracking-wider uppercase text-amber-600">{userData.priority}</p>
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
        <div className="space-y-12">
          <div className="min-h-[140px] relative">
            <p className="text-xl leading-relaxed text-[#1A1A1A] font-body-serif font-light whitespace-pre-wrap transition-all duration-500">
              {intelligence.notes}
              {intelligence.status === 'analyzing' && (
                <span className="inline-block w-1.5 h-6 ml-2 bg-amber-400 animate-pulse align-middle"></span>
              )}
            </p>
          </div>

          {intelligence.citations && intelligence.citations.length > 0 && (
            <div className="space-y-4 pt-8 border-t border-[#EFE9E4] animate-fade-enter-active">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Market Grounding</h4>
              <div className="space-y-3">
                {intelligence.citations.map((cite, i) => (
                  <a key={i} href={cite.uri} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-[11px] text-amber-700 hover:text-amber-900 transition-colors font-medium group">
                    <span className="opacity-40 group-hover:opacity-100">[{i+1}]</span>
                    <span className="underline decoration-amber-200 truncate">{cite.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {intelligence.observations.length > 0 && (
            <div className="space-y-8 pt-10 border-t border-[#EFE9E4] animate-fade-enter-active">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Strategic Observations</h4>
              <ul className="space-y-8">
                {intelligence.observations.map((obs, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <span className="text-amber-500 font-serif text-xl leading-none italic opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                    <span className="text-[13px] leading-relaxed text-[#444] font-body-serif">{obs}</span>
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