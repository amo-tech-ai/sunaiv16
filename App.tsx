import React, { useState, useEffect } from 'react';
import ThreePanelLayout from './components/ThreePanelLayout';
import { Step1, Step2, Step3, Step4, Step5 } from './components/WizardSteps';
import { UserData, IntelligenceState, SystemRecommendation } from './types';
import { 
  getBusinessIntelligence, 
  getIndustrySpecificQuestions, 
  getReadinessAssessment, 
  getRoadmap, 
  getSystemRecommendations 
} from './services/geminiService';

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
    notes: 'Sun AI is initializing its strategic assessment protocols...',
  });

  const [industryContent, setIndustryContent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<SystemRecommendation[]>([]);
  const [assessment, setAssessment] = useState<any>(null);

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  // Logic for Step 1 -> Analysis
  useEffect(() => {
    if (step === 1 && userData.industry && userData.description.length > 30) {
      setIntelligence(prev => ({ ...prev, status: 'analyzing', notes: 'Reviewing your information and market context...' }));
      const timer = setTimeout(() => {
        getBusinessIntelligence(userData.industry, userData.description, userData.companyName)
          .then(res => {
            setIntelligence({
              status: 'complete',
              observations: res.observations,
              notes: `Business Model: ${res.businessModel}. ${res.initialReadinessNote}`,
              detectedModel: res.businessModel
            });
          })
          .catch(err => console.error("Analysis Error:", err));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, userData.industry, userData.description.length > 30]);

  // Logic for Step 2 -> Fetch Questions
  useEffect(() => {
    if (step === 2 && userData.industry && !industryContent) {
      getIndustrySpecificQuestions(userData.industry, intelligence.detectedModel || "Standard Business")
        .then(setIndustryContent);
    }
    if (step === 2) {
      setIntelligence({
        status: 'complete',
        observations: [
          `Auditing ${userData.industry} friction points`,
          "Identifying revenue leaks"
        ],
        notes: `We are diagnosing where speed and revenue are currently decoupled. This informs the system architecture.`
      });
    }
  }, [step]);

  // Logic for Step 3 -> AI System Recommendations
  useEffect(() => {
    if (step === 3 && recommendations.length === 0) {
      setIntelligence({ status: 'analyzing', observations: [], notes: 'Architecting your recommended systems...' });
      getSystemRecommendations(userData)
        .then(res => {
          setRecommendations(res);
          setIntelligence({
            status: 'complete',
            observations: [
              "Optimizing for maximum ROI potential",
              "Aligning systems with executive priorities"
            ],
            notes: "These systems are selected to address your specific blockers. They are modular and designed for scalable growth."
          });
        });
    }
  }, [step]);

  // Logic for Step 4 -> Readiness
  useEffect(() => {
    if (step === 4) {
      setIntelligence({ status: 'analyzing', observations: [], notes: 'Executing strategic readiness audit...' });
      getReadinessAssessment(userData)
        .then(res => {
          setAssessment(res);
          updateUserData({ readinessScore: res.score, readinessFeedback: res.feedback });
          setIntelligence({
            status: 'complete',
            observations: ["Identifying data infrastructure gaps", "Evaluating implementation risk"],
            notes: res.consultantNote
          });
        });
    }
  }, [step]);

  // Logic for Step 5 -> Roadmap
  useEffect(() => {
    if (step === 5) {
      setIntelligence({ status: 'analyzing', observations: [], notes: 'Synthesizing 90-day execution plan...' });
      getRoadmap(userData)
        .then(res => {
          updateUserData({ roadmap: res });
          setIntelligence({
            status: 'complete',
            observations: ["Phased foundation-first approach", "Focus on reclaimed time metrics"],
            notes: "This roadmap ensures speed of execution without operational burnout. Each phase provides a tangible outcome."
          });
        });
    }
  }, [step]);

  const nextStep = () => setStep(prev => prev + 1);

  if (step === 6) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFCFB] p-8 animate-fade-enter-active">
        <div className="max-w-5xl w-full space-y-12">
          <header className="flex justify-between items-end border-b border-[#EFE9E4] pb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-600 mb-2 block">Strategic Hub</span>
              <h1 className="text-4xl font-serif leading-none">{userData.companyName} Dashboard</h1>
            </div>
            <div className="px-6 py-3 border border-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold">Client Level: Gold</div>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 border border-[#EFE9E4] bg-white space-y-6 shadow-sm">
              <h3 className="uppercase text-[10px] tracking-[0.3em] text-[#999] font-bold">Systems Pulse</h3>
              <div className="space-y-4">
                {userData.selectedSystems.map(s => (
                  <div key={s} className="flex justify-between items-center text-sm font-medium">
                    <span>{s}</span>
                    <span className="text-amber-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 border border-[#EFE9E4] bg-white space-y-6 shadow-sm">
              <h3 className="uppercase text-[10px] tracking-[0.3em] text-[#999] font-bold">Execution Pipeline</h3>
              <p className="text-base text-[#555] font-body-serif italic">Your Phase 1 initialization protocol begins in 48 hours.</p>
              <div className="w-full bg-[#EFE9E4] h-1 mt-4">
                <div className="w-[5%] h-full bg-[#1A1A1A]"></div>
              </div>
            </div>
            <div className="p-10 border border-[#EFE9E4] bg-white space-y-6 shadow-sm">
              <h3 className="uppercase text-[10px] tracking-[0.3em] text-[#999] font-bold">Priority Insight</h3>
              <p className="text-sm font-body-serif leading-relaxed text-[#666]">“Focusing on data cleanup in Phase 1 will yield a 3x higher ROI for the Growth Engine implementation.”</p>
            </div>
          </div>
          
          <div className="pt-12 flex justify-between items-center border-t border-[#EFE9E4]">
            <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#999] hover:text-[#1A1A1A] transition-colors">Restart Discovery</button>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#CCC]">Sun AI Agency — Confidential</div>
          </div>
        </div>
      </div>
    );
  }

  const renderLeft = () => (
    <div className="space-y-10">
      <div>
        <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA] mb-3">
          <span>Alignment</span>
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
            <p className="text-xs font-bold tracking-wider uppercase">{userData.companyName}</p>
          </div>
        )}
        {step > 1 && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Sector</span>
            <p className="text-xs font-bold tracking-wider uppercase">{userData.industry}</p>
          </div>
        )}
        {step > 2 && userData.priority && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Core Focus</span>
            <p className="text-xs font-bold tracking-wider uppercase">{userData.priority}</p>
          </div>
        )}
        {step > 3 && userData.selectedSystems.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#CCC] font-bold">Architected Systems</span>
            <div className="space-y-1">
              {userData.selectedSystems.map(s => <p key={s} className="text-[10px] font-bold text-[#444] uppercase tracking-widest">• {s}</p>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderRight = () => (
    <div className="space-y-12">
      <div className="space-y-8">
        <p className="italic text-xl leading-relaxed text-[#333] font-body-serif font-light">
          {intelligence.notes}
        </p>
      </div>

      {intelligence.observations.length > 0 && (
        <div className="space-y-8 pt-10 border-t border-[#EFE9E4]">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Consultant Notes</h4>
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
      
      {intelligence.status === 'analyzing' && (
        <div className="flex items-center gap-3 py-4">
          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-1 h-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Synthesizing Analysis</span>
        </div>
      )}
    </div>
  );

  return (
    <ThreePanelLayout
      left={renderLeft()}
      center={
        <div className="transition-all duration-700 ease-in-out">
          {step === 1 && <Step1 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} />}
          {step === 2 && <Step2 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} industryContent={industryContent} />}
          {step === 3 && <Step3 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} recommendations={recommendations} />}
          {step === 4 && <Step4 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} assessment={assessment} />}
          {step === 5 && <Step5 data={userData} updateData={updateUserData} nextStep={nextStep} intelligence={intelligence} onLaunch={() => setStep(6)} />}
        </div>
      }
      right={renderRight()}
    />
  );
};

export default App;
