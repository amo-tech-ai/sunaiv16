import React, { useState, useEffect } from 'react';
import ThreePanelLayout from './components/ThreePanelLayout';
import { Step1Context } from './components/wizard/Step1Context';
import { Step2Diagnostics } from './components/wizard/Step2Diagnostics';
import { Step3Systems } from './components/wizard/Step3Systems';
import { Step4Readiness } from './components/wizard/Step4Readiness';
import { Step5Roadmap } from './components/wizard/Step5Roadmap';
import { ClientDashboard } from './components/dashboard/ClientDashboard';
import { WizardSidebar } from './components/layout/WizardSidebar';
import { IntelligenceNarrative } from './components/layout/IntelligenceNarrative';
import { LaunchOverlay } from './components/ui/LaunchOverlay';
import { useWizard } from './hooks/useWizard';
import { useIntelligence } from './hooks/useIntelligence';
import { useStrategyEngine } from './hooks/useStrategyEngine';
import { generateTasksFromRoadmap } from './services/gemini/planner';

/**
 * Main Orchestrator for Sun AI Agency Experience.
 */
const App: React.FC = () => {
  const { step, setStep, userData, updateUserData, nextStep, prevStep, resetWizard } = useWizard();
  const { intelligence, setIntelligence, handleStreamingNotes } = useIntelligence();
  const [isLaunching, setIsLaunching] = useState(false);

  // The strategy engine orchestrates all AI side-effects
  const { industryContent, recommendations, assessment, errorState, retryStep } = useStrategyEngine({
    step,
    userData,
    updateUserData,
    intelligence,
    setIntelligence,
    handleStreamingNotes
  });

  // Effect to handle project persistence and auto-routing to dashboard
  useEffect(() => {
    if (userData.isProjectActive && step < 6) {
      setStep(6);
    }
  }, [userData.isProjectActive, step, setStep]);

  // Handle the "Launch Orchestrator" finalization logic
  const handleLaunch = async () => {
    setIsLaunching(true);
    
    try {
      // 1. Generate tasks from the roadmap outcomes using Gemini 3 Pro
      if (!userData.tasks || userData.tasks.length === 0) {
        const tasks = await generateTasksFromRoadmap(userData);
        updateUserData({ 
          tasks, 
          isProjectActive: true 
        });
      } else {
        updateUserData({ isProjectActive: true });
      }

      // 2. Premium "Fade-to-Black" transition duration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 3. Promote session to active dashboard
      setStep(6);
    } catch (err) {
      console.error("Strategic Launch Failure:", err);
      // Resilience fallback: still attempt to open hub
      setStep(6);
    } finally {
      setIsLaunching(false);
    }
  };

  // Final State: Dashboard Hub
  if (step === 6) {
    return (
      <div className="animate-fade-enter-active min-h-screen bg-[#FDFCFB]">
        <ClientDashboard 
          userData={userData} 
          updateUserData={updateUserData} 
          resetWizard={resetWizard} 
        />
      </div>
    );
  }

  return (
    <>
      {isLaunching && <LaunchOverlay />}
      
      <ThreePanelLayout
        left={
          <WizardSidebar 
            step={step} 
            userData={userData} 
            errorState={errorState} 
            retryStep={retryStep} 
          />
        }
        center={
          <div className="min-h-[70vh] pb-32">
            {step === 1 && (
              <Step1Context 
                data={userData} 
                updateData={updateUserData} 
                nextStep={nextStep} 
                intelligence={intelligence} 
              />
            )}
            {step === 2 && (
              <Step2Diagnostics 
                data={userData} 
                updateData={updateUserData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
                intelligence={intelligence} 
                industryContent={industryContent} 
              />
            )}
            {step === 3 && (
              <Step3Systems 
                data={userData} 
                updateData={updateUserData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
                recommendations={recommendations} 
              />
            )}
            {step === 4 && (
              <Step4Readiness 
                data={userData} 
                nextStep={nextStep} 
                prevStep={prevStep} 
                assessment={assessment} 
              />
            )}
            {step === 5 && (
              <Step5Roadmap 
                data={userData} 
                prevStep={prevStep} 
                onLaunch={handleLaunch} 
              />
            )}
          </div>
        }
        right={
          <IntelligenceNarrative intelligence={intelligence} />
        }
      />
    </>
  );
};

export default App;
