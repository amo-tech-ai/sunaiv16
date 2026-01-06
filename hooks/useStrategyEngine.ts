import { useState, useEffect, useCallback, useRef } from 'react';
import { UserData, SystemRecommendation, IntelligenceState } from '../types';
import { getBusinessIntelligence, getIndustrySpecificQuestions } from '../services/gemini/discovery';
import { getReadinessAssessment, getRoadmap, getSystemRecommendations, getArchitectureBlueprint } from '../services/gemini/strategy';

interface EngineProps {
  step: number;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  intelligence: IntelligenceState;
  setIntelligence: React.Dispatch<React.SetStateAction<IntelligenceState>>;
  handleStreamingNotes: (prompt: string) => Promise<void>;
}

export function useStrategyEngine({ step, userData, updateUserData, intelligence, setIntelligence, handleStreamingNotes }: EngineProps) {
  const [industryContent, setIndustryContent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<SystemRecommendation[]>([]);
  const [assessment, setAssessment] = useState<any>(null);
  const [errorState, setErrorState] = useState<{context: string, message: string} | null>(null);
  
  const lastGeneratedSystems = useRef<string>('');
  const lastResearchDescription = useRef<string>('');

  const handleError = useCallback((err: any, context: string) => {
    console.error(`Error in ${context}:`, err);
    const msg = err?.message?.includes('429') 
      ? "Strategic capacity reached for this hour. Please wait a moment." 
      : "Intelligence protocols encountered a temporary interruption. Re-establishing link...";
    
    setErrorState({ context, message: msg });
    setIntelligence(prev => ({ ...prev, notes: msg, status: 'idle' }));
  }, [setIntelligence]);

  const retryStep = useCallback(() => {
    setErrorState(null);
    if (step === 1) {
      lastResearchDescription.current = ''; // Reset to force re-research
      setIntelligence(prev => ({ ...prev, status: 'idle' }));
    }
    if (step === 2) setIndustryContent(null);
    if (step === 3) setRecommendations([]);
    if (step === 4) setAssessment(null);
  }, [step, setIntelligence]);

  // Step 1: Discovery Logic
  useEffect(() => {
    const hasEnoughSignal = userData.description.trim().length >= 50 && userData.website && userData.website.length > 4;
    const isNewDescription = userData.description !== lastResearchDescription.current;

    if (step === 1 && userData.industry && hasEnoughSignal && isNewDescription && !errorState && (intelligence.status === 'idle' || intelligence.status === 'loading')) {
      const research = async () => {
        lastResearchDescription.current = userData.description;
        setIntelligence(prev => ({ ...prev, status: 'analyzing', notes: 'Connecting to market intelligence protocols...' }));
        try {
          const res = await getBusinessIntelligence(userData.industry, userData.description, userData.companyName, userData.website);
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
        }
      };
      const timer = setTimeout(research, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, userData, handleError, setIntelligence, errorState, intelligence.status]);

  // Step 2-5: Strategic Logic
  useEffect(() => {
    if (errorState || step === 1 || step === 6) return;

    const runStepLogic = async () => {
      switch (step) {
        case 2:
          if (!industryContent && userData.industry) {
            handleStreamingNotes(`Analyzing ${userData.industry} friction points to identify bespoke revenue levers.`);
            try {
              const content = await getIndustrySpecificQuestions(userData.industry, userData, intelligence.notes);
              setIndustryContent(content);
            } catch (err) { handleError(err, 'Step 2 Diagnostics'); }
          }
          break;
        case 3:
          if (recommendations.length === 0) {
            handleStreamingNotes(`Mapping operational gaps to a modular system architecture.`);
            try {
              const res = await getSystemRecommendations(userData);
              setRecommendations(res);
            } catch (err) { handleError(err, 'Step 3 Recommendations'); }
          }
          break;
        case 4:
          if (!assessment && userData.selectedSystems.length > 0) {
            handleStreamingNotes(`Conducting a technical and organizational scale audit.`);
            try {
              const res = await getReadinessAssessment(userData);
              setAssessment(res);
              updateUserData({ readinessScore: res.score, readinessFeedback: res.feedback, readinessAreas: res.areaScores, confidence: res.confidence });
            } catch (err) { handleError(err, 'Step 4 Audit'); }
          }
          break;
        case 5:
          if (!userData.roadmap && assessment) {
            handleStreamingNotes(`Synthesizing your 90-day execution sequence.`);
            try {
              const res = await getRoadmap(userData);
              updateUserData({ roadmap: res });
            } catch (err) { handleError(err, 'Step 5 Roadmap'); }
          }
          break;
      }
    };
    runStepLogic();
  }, [step, userData, handleStreamingNotes, handleError, assessment, recommendations.length, industryContent, updateUserData, intelligence.notes, errorState]);

  // SVG Architecture Logic
  useEffect(() => {
    const systemsKey = userData.selectedSystems.join(',');
    if (step === 3 && userData.selectedSystems.length > 0 && !userData.svgArchitecture && !errorState && lastGeneratedSystems.current !== systemsKey) {
      lastGeneratedSystems.current = systemsKey;
      getArchitectureBlueprint(userData)
        .then(svg => updateUserData({ svgArchitecture: svg }))
        .catch(() => { lastGeneratedSystems.current = ''; });
    }
  }, [userData.selectedSystems, step, userData.svgArchitecture, updateUserData, errorState]);

  return { industryContent, recommendations, assessment, errorState, retryStep };
}
