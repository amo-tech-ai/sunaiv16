
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import { LoginPage } from './components/auth/LoginPage';
import { useWizard } from './hooks/useWizard';
import { useIntelligence } from './hooks/useIntelligence';
import { useStrategyEngine } from './hooks/useStrategyEngine';
import { generateTasksFromRoadmap } from './services/gemini/planner';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { step, setStep, userData, updateUserData, resetWizard } = useWizard();
  const { intelligence, setIntelligence, handleStreamingNotes } = useIntelligence();
  const [isLaunching, setIsLaunching] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('sun_ai_session'));

  // The strategy engine orchestrates all AI side-effects
  const { industryContent, recommendations, assessment, errorState, retryStep } = useStrategyEngine({
    step,
    userData,
    updateUserData,
    intelligence,
    setIntelligence,
    handleStreamingNotes
  });

  // Sync route with step state for the wizard
  useEffect(() => {
    if (location.pathname.startsWith('/wizard/')) {
      const routeStep = parseInt(location.pathname.split('/')[2], 10);
      if (routeStep !== step) setStep(routeStep);
    }
  }, [location.pathname, step, setStep]);

  // Handle Authentication
  const handleLogin = (email: string) => {
    localStorage.setItem('sun_ai_session', email);
    setIsAuthenticated(true);
    if (userData.isProjectActive) {
      navigate('/dashboard');
    } else {
      navigate('/wizard/1');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sun_ai_session');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Handle the "Launch Orchestrator" finalization logic
  const handleLaunch = async () => {
    setIsLaunching(true);
    try {
      if (!userData.tasks || userData.tasks.length === 0) {
        const tasks = await generateTasksFromRoadmap(userData);
        updateUserData({ tasks, isProjectActive: true });
      } else {
        updateUserData({ isProjectActive: true });
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/dashboard');
    } catch (err) {
      console.error("Strategic Launch Failure:", err);
      navigate('/dashboard');
    } finally {
      setIsLaunching(false);
    }
  };

  // Route Guard for Wizard
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {isLaunching && <LaunchOverlay />}
      
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        
        <Route path="/dashboard/*" element={
          <div className="animate-fade-enter-active min-h-screen bg-[#FDFCFB]">
            <ClientDashboard 
              userData={userData} 
              updateUserData={updateUserData} 
              resetWizard={() => { resetWizard(); handleLogout(); }} 
            />
          </div>
        } />

        <Route path="/wizard/:stepId" element={
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
                    nextStep={() => navigate('/wizard/2')} 
                    intelligence={intelligence} 
                  />
                )}
                {step === 2 && (
                  <Step2Diagnostics 
                    data={userData} 
                    updateData={updateUserData} 
                    nextStep={() => navigate('/wizard/3')} 
                    prevStep={() => navigate('/wizard/1')} 
                    intelligence={intelligence} 
                    industryContent={industryContent} 
                  />
                )}
                {step === 3 && (
                  <Step3Systems 
                    data={userData} 
                    updateData={updateUserData} 
                    nextStep={() => navigate('/wizard/4')} 
                    prevStep={() => navigate('/wizard/2')} 
                    recommendations={recommendations} 
                  />
                )}
                {step === 4 && (
                  <Step4Readiness 
                    data={userData} 
                    nextStep={() => navigate('/wizard/5')} 
                    prevStep={() => navigate('/wizard/3')} 
                    assessment={assessment} 
                  />
                )}
                {step === 5 && (
                  <Step5Roadmap 
                    data={userData} 
                    prevStep={() => navigate('/wizard/4')} 
                    onLaunch={handleLaunch} 
                  />
                )}
              </div>
            }
            right={
              <IntelligenceNarrative intelligence={intelligence} />
            }
          />
        } />

        <Route path="/" element={
          isAuthenticated ? (
            <Navigate to={userData.isProjectActive ? "/dashboard" : "/wizard/1"} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </>
  );
};

export default App;
