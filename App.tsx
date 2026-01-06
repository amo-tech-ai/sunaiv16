import React from 'react';
import ThreePanelLayout from './components/ThreePanelLayout';
import { Step1Context } from './components/wizard/Step1Context';
import { Step2Diagnostics } from './components/wizard/Step2Diagnostics';
import { Step3Systems } from './components/wizard/Step3Systems';
import { Step4Readiness } from './components/wizard/Step4Readiness';
import { Step5Roadmap } from './components/wizard/Step5Roadmap';
import { ClientDashboard } from './components/dashboard/ClientDashboard';
import { WizardSidebar } from './components/layout/WizardSidebar';
import { IntelligenceNarrative } from './components/layout/IntelligenceNarrative';
import { useWizard } from './hooks/useWizard';
import { useIntelligence } from './hooks/useIntelligence';
import { useStrategyEngine } from './hooks/useStrategyEngine';

/**
 * Main Orchestrator for Sun AI Agency Experience.
 */
const App: React.FC = () => {
  const { step, setStep, userData, updateUserData, nextStep, prevStep, resetWizard } = useWizard();
  const { intelligence, setIntelligence, handleStreamingNotes } = useIntelligence();

  // The strategy engine orchestrates all AI side-effects
  const { industryContent, recommendations, assessment, errorState, retryStep } = useStrategyEngine({
    step,
    userData,
    updateUserData,
    intelligence,
    setIntelligence,
    handleStreamingNotes
  });

  // Final State: Dashboard
  if (step === 6) {
    return (
      <div className="animate-fade-enter-active">
        <ClientDashboard 
          userData={userData} 
          updateUserData={updateUserData} 
          resetWizard={resetWizard} 
        />
      </div>
    );
  }

  return (
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
        <div className="min-h-[70vh]">
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
              onLaunch={() => setStep(6)} 
            />
          )}
        </div>
      }
      right={
        <IntelligenceNarrative intelligence={intelligence} />
      }
    />
  );
};

export default App;
