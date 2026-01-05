
import React, { useState, useEffect, useCallback } from 'react';
import ThreePanelLayout from './components/ThreePanelLayout';
import { Step1, Step2, Step3, Step4, Step5 } from './components/WizardSteps';
import { UserData, IntelligenceState, RoadmapPhase } from './types';
import { getBusinessIntelligence, getIndustrySpecificQuestions, getReadinessAssessment, getRoadmap } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    companyName: '',
    website: '',
    industry: '',
    description: '',
    blocker: '',
    manualWork: '',
    speed: '',
    priority: '',
    selectedSystems: [],
  });

  const [intelligence, setIntelligence] = useState<IntelligenceState>({
    status: 'idle',
    observations: [],
    notes: 'Sun AI is initializing...',
  });

  const [industryContent, setIndustryContent] = useState<any>(null);

  // Update logic
  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  // Trigger intelligence calls when moving through steps
  useEffect(() => {
    if (step === 1 && userData.industry && userData.description.length > 20) {
      setIntelligence(prev => ({ ...prev, status: 'analyzing', notes: 'Reviewing your information...' }));
      getBusinessIntelligence(userData.industry, userData.description)
        .then(res => {
          setIntelligence({
            status: 'complete',
            observations: res.observations,
            notes: `We've identified your model as ${res.businessModel}. This profile allows us to tailor the next stage of our analysis.`,
            detectedModel: res.businessModel
          });
        })
        .catch(err => console.error(err));
    }

    if (step === 2 && userData.industry && !industryContent) {
      getIndustrySpecificQuestions(userData.industry)
        .then(setIndustryContent);
    }

    if (step === 4) {
      setIntelligence({ status: 'analyzing', observations: [], notes: 'Evaluating operational readiness...' });
      getReadinessAssessment(userData)
        .then(res => {
          updateUserData({ readinessScore: res.score, readinessFeedback: res.feedback });
          setIntelligence({
            status: 'complete',
            observations: ["High potential for automation impact", "Data structure requires minor alignment"],
            notes: res.consultantNote
          });
        });
    }

    if (step === 5) {
      setIntelligence({ status: 'analyzing', observations: [], notes: 'Synthesizing your execution strategy...' });
      getRoadmap(userData)
        .then(res => {
          updateUserData({ roadmap: res });
          setIntelligence({
            status: 'complete',
            observations: ["90-day focus on core outcomes", "Phased implementation to minimize disruption"],
            notes: "This roadmap is designed for speed of execution. We focus on outcomes, not tools, to ensure your systems remain scalable and human-centric."
          });
        });
    }
  }, [step, userData.industry, userData.description.length === 50]); // Minimal triggers

  // Specific triggers for Step 2 intelligence
  useEffect(() => {
    if (step === 2) {
      setIntelligence({
        status: 'complete',
        observations: [
          `Focusing on ${userData.industry} metrics`,
          "Identifying performance bottlenecks"
        ],
        notes: `Because you operate in ${userData.industry || 'this sector'}, we’re focusing on how information moves between departments—this directly impact revenue.`
      });
    }
  }, [step]);

  // Specific triggers for Step 3 intelligence
  useEffect(() => {
    if (step === 3) {
      setIntelligence({
        status: 'complete',
        observations: [
          "Cross-referencing problems with system architecture",
          "Optimizing for maximum ROI"
        ],
        notes: "We have selected these systems based on your current growth blockers. Implementing these will create a foundation for intelligent scaling."
      });
    }
  }, [step]);

  // Navigation
  const nextStep = () => setStep(prev => prev + 1);

  // Final Placeholder Dashboard
  if (step === 6) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCFB] p-8">
        <div className="max-w-4xl w-full space-y-12">
          <header className="flex justify-between items-center border-b border-[#EFE9E4] pb-8">
            <div>
              <h1 className="text-3xl font-serif">Hello, {userData.fullName}</h1>
              <p className="text-[#888]">{userData.companyName} Strategic Hub</p>
            </div>
            <div className="px-4 py-2 border border-[#1A1A1A] text-xs uppercase tracking-widest">Active Partner</div>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#EFE9E4] bg-white space-y-4">
              <h3 className="uppercase text-[10px] tracking-widest text-[#999] font-bold">Systems Overview</h3>
              <div className="space-y-2">
                {userData.selectedSystems.map(s => (
                  <div key={s} className="flex justify-between text-sm">
                    <span>{s}</span>
                    <span className="text-amber-600">Pending</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 border border-[#EFE9E4] bg-white space-y-4">
              <h3 className="uppercase text-[10px] tracking-widest text-[#999] font-bold">Tasks & Roadmap</h3>
              <p className="text-sm text-[#777]">Your first phase begins in 48 hours.</p>
            </div>
            <div className="p-8 border border-[#EFE9E4] bg-white space-y-4">
              <h3 className="uppercase text-[10px] tracking-widest text-[#999] font-bold">AI Recommendations</h3>
              <p className="text-xs italic text-[#888]">“Data cleanup recommended before Phase 1 launch.”</p>
            </div>
          </div>
          
          <button onClick={() => setStep(1)} className="text-xs uppercase tracking-widest text-[#999] hover:text-[#1A1A1A] transition-colors">Restart Discovery</button>
        </div>
      </div>
    );
  }

  // Left panel content generator
  const renderLeft = () => (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA] mb-2">
          <span>Progress</span>
          <span>Step {step} of 5</span>
        </div>
        <div className="h-1 bg-[#EFE9E4] w-full">
          <div className="h-full bg-[#1A1A1A] transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>
      </div>

      <div className="space-y-6 pt-8">
        {step > 1 && (
          <div className="animate-fade-in space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#CCC]">Company</span>
            <p className="text-sm font-medium">{userData.companyName}</p>
          </div>
        )}
        {step > 1 && (
          <div className="animate-fade-in space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#CCC]">Industry</span>
            <p className="text-sm font-medium">{userData.industry}</p>
          </div>
        )}
        {step > 2 && userData.priority && (
          <div className="animate-fade-in space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[#CCC]">Top Priority</span>
            <p className="text-sm font-medium">{userData.priority}</p>
          </div>
        )}
      </div>
    </div>
  );

  // Right panel content generator
  const renderRight = () => (
    <div className="space-y-10">
      <div className="space-y-6">
        <p className="italic text-lg leading-relaxed text-[#555]">
          {intelligence.notes}
        </p>
      </div>

      {intelligence.observations.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-[#EFE9E4]">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#AAA]">Observations</h4>
          <ul className="space-y-4">
            {intelligence.observations.map((obs, i) => (
              <li key={i} className="flex gap-4 items-start group">
                <span className="text-amber-500 font-serif text-xl leading-none">0{i+1}</span>
                <span className="text-sm leading-relaxed text-[#666]">{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <ThreePanelLayout
      left={renderLeft()}
      center={
        <div className="transition-all duration-500 ease-in-out">
          {step === 1 && <Step1 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} />}
          {step === 2 && <Step2 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} industryContent={industryContent} />}
          {step === 3 && <Step3 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} />}
          {step === 4 && <Step4 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} />}
          {step === 5 && <Step5 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} onLaunch={() => setStep(6)} />}
        </div>
      }
      right={renderRight()}
    />
  );
};

export default App;
