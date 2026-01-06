
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
  const [errorState, setErrorState] = useState<{context: string, message: string} | null>(null);

  // Unified error handler for production stability
  const handleError = useCallback((err: any, context: string) => {
    console.error(`Error in ${context}:`, err);
    const msg = err?.message?.includes('429') 
      ? "API Rate Limit Exceeded. Please wait a moment or check your quota." 
      : "The strategic link was interrupted. Please retry the current assessment.";
    
    setErrorState({ context, message: msg });
    setIntelligence(prev => ({
      ...prev,
      notes: msg,
      status: 'idle'
    }));
  }, [setIntelligence]);

  const retryStep = () => {
    setErrorState(null);
    // Force re-trigger of useEffects by clearing partial state
    if (step === 2) setIndustryContent(null);
    if (step === 3) setRecommendations([]);
    if (step === 4) setAssessment(null);
  };

  // Step 1: Initial Research & Grounding
  useEffect(() => {
    const shouldResearch = step === 1 && userData.industry && userData.description.length > 50 && !errorState;
    
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
  }, [step, userData.industry, userData.description, userData.companyName, userData.website, handleError, setIntelligence, errorState]);

  // Step 2-5 Strategic Orchestration
  useEffect(() => {
    if (errorState) return;

    const runStepLogic = async () => {
      switch (step) {
        case 2:
          if (!industryContent && userData.industry) {
            handleStreamingNotes(`Connecting your ${userData.industry} challenges to specific strategic solutions.`);
            try {
              const content = await getIndustrySpecificQuestions(userData.industry, userData, intelligence.notes);
              setIndustryContent(content);
            } catch (err) {
              handleError(err, 'Step 2 Diagnostics');
            }
          }
          break;
        case 3:
          if (recommendations.length === 0) {
            handleStreamingNotes(`Mapping your unique friction points to a modular AI architecture.`);
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
            handleStreamingNotes(`Conducting a multi-dimensional operational audit.`);
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
            handleStreamingNotes(`Sequencing your 90-day execution plan.`);
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
  }, [step, userData.blocker, userData.manualWork, userData.priority, userData.industry, handleStreamingNotes, handleError, assessment, recommendations.length, industryContent, updateUserData, userData, intelligence.notes, errorState]);

  // Architecture Blueprint (SVG) Generation Loop
  useEffect(() => {
    if (step === 3 && userData.selectedSystems.length > 0 && !userData.svgArchitecture && !errorState) {
      getArchitectureBlueprint(userData)
        .then(svg => updateUserData({ svgArchitecture: svg }))
        .catch(err => console.warn("Architecture visualization deferred:", err));
    }
  }, [userData.selectedSystems, step, userData.svgArchitecture, updateUserData, errorState]);

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
            </div>
          )}

          {errorState && (
            <div className="p-4 bg-red-50 border border-red-100 space-y-3">
              <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">Service Alert</p>
              <p className="text-xs text-red-800 leading-relaxed">{errorState.message}</p>
              <button 
                onClick={retryStep}
                className="w-full py-2 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                Retry Analysis
              </button>
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
          {/* ... existing observations and citations ... */}
        </div>
      }
    />
  );
};

export default App;
