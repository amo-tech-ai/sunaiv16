import React, { useState, useEffect, useRef } from 'react';
import ThreePanelLayout from './components/ThreePanelLayout';
import { Step1, Step2, Step3, Step4, Step5 } from './components/WizardSteps';
import { UserData, IntelligenceState, SystemRecommendation } from './types';
import { 
  getBusinessIntelligence, 
  getIndustrySpecificQuestions, 
  getReadinessAssessment, 
  getRoadmap, 
  getSystemRecommendations,
  streamConsultantResponse
} from './services/geminiService';

const STORAGE_KEY = 'sun_ai_wizard_state';

const App: React.FC = () => {
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_step');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_data');
    return saved ? JSON.parse(saved) : {
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
    };
  });

  const [intelligence, setIntelligence] = useState<IntelligenceState>({
    status: 'idle',
    observations: [],
    notes: 'Sun AI is initializing its strategic assessment protocols...',
    citations: [],
  });

  const [industryContent, setIndustryContent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<SystemRecommendation[]>([]);
  const [assessment, setAssessment] = useState<any>(null);

  const activeStreamRef = useRef<number>(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_data', JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEY + '_step', step.toString());
  }, [userData, step]);

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const handleStreamingNotes = async (prompt: string) => {
    const streamId = ++activeStreamRef.current;
    setIntelligence(prev => ({ ...prev, notes: '', status: 'analyzing' }));
    
    try {
      const stream = streamConsultantResponse(prompt);
      let fullText = '';
      for await (const chunk of stream) {
        if (streamId !== activeStreamRef.current) break;
        fullText += chunk;
        setIntelligence(prev => ({ ...prev, notes: fullText }));
      }
      if (streamId === activeStreamRef.current) {
        setIntelligence(prev => ({ ...prev, status: 'complete' }));
      }
    } catch (error) {
      console.error("Streaming error:", error);
    }
  };

  useEffect(() => {
    if (step === 1 && userData.industry && userData.description.length > 30) {
      setIntelligence(prev => ({ ...prev, status: 'analyzing', notes: 'Initiating market research and context verification...' }));
      
      getBusinessIntelligence(userData.industry, userData.description, userData.companyName)
        .then(res => {
          setIntelligence(prev => ({
            ...prev,
            status: 'complete',
            notes: res.text,
            observations: [
              "Verified digital footprint through research",
              "Identified core value drivers in the sector"
            ],
            citations: res.citations
          }));
        });
    }
  }, [step, userData.industry, userData.description.length > 30]);

  useEffect(() => {
    if (step === 2) {
      const prompt = `We are moving into diagnostics for ${userData.companyName}. We are identifying friction in ${userData.industry}. Explain why a deep diagnostic of sales blockers and manual labor is critical for a high-growth organization.`;
      handleStreamingNotes(prompt);

      if (userData.industry && !industryContent) {
        getIndustrySpecificQuestions(userData.industry, intelligence.detectedModel || "Standard Business")
          .then(setIndustryContent);
      }
      
      setIntelligence(prev => ({
        ...prev,
        observations: [
          `Auditing ${userData.industry} friction points`,
          "Identifying revenue leaks"
        ],
        citations: [],
      }));
    }
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      const prompt = `Architecting AI systems for ${userData.companyName}. They are facing ${userData.blocker} and spending too much time on ${userData.manualWork}. Explain the philosophy of choosing systems that reduce drag and increase revenue velocity.`;
      handleStreamingNotes(prompt);

      if (recommendations.length === 0) {
        getSystemRecommendations(userData)
          .then(res => {
            setRecommendations(res);
            setIntelligence(prev => ({
              ...prev,
              observations: [
                "Optimizing for maximum ROI potential",
                "Aligning systems with executive priorities"
              ]
            }));
          });
      }
    }
  }, [step]);

  useEffect(() => {
    if (step === 4) {
      const prompt = `Assessing the operational readiness of ${userData.companyName} for implementing ${userData.selectedSystems.join(', ')}. Mention why data integrity and process clarity are prerequisites for AI success.`;
      handleStreamingNotes(prompt);

      getReadinessAssessment(userData)
        .then(res => {
          setAssessment(res);
          updateUserData({ 
            readinessScore: res.score, 
            readinessFeedback: res.feedback,
            readinessAreas: res.areaScores
          });
          setIntelligence(prev => ({
            ...prev,
            observations: ["Identifying data infrastructure gaps", "Evaluating implementation risk"]
          }));
        });
    }
  }, [step]);

  useEffect(() => {
    if (step === 5) {
      const prompt = `Synthesizing the 90-day execution roadmap for ${userData.companyName}. The focus is on ${userData.priority}. Summarize why a phased approach starting with foundations is the most efficient path to long-term automation.`;
      handleStreamingNotes(prompt);

      getRoadmap(userData)
        .then(res => {
          updateUserData({ roadmap: res });
          setIntelligence(prev => ({
            ...prev,
            observations: ["Phased foundation-first approach", "Focus on reclaimed time metrics"]
          }));
        });
    }
  }, [step]);

  const nextStep = () => setStep(prev => prev + 1);

  const resetState = () => {
    localStorage.clear();
    window.location.reload();
  };

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
            <button onClick={resetState} className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#999] hover:text-[#1A1A1A] transition-colors">Restart Discovery</button>
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
        <p className="text-xl leading-relaxed text-[#333] font-body-serif font-light min-h-[100px] whitespace-pre-wrap">
          {intelligence.notes}
          {intelligence.status === 'analyzing' && <span className="inline-block w-1 h-5 ml-1 bg-amber-400 animate-pulse align-middle"></span>}
        </p>
      </div>

      {intelligence.citations && intelligence.citations.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-[#EFE9E4]">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Verified Sources</h4>
          <div className="space-y-2">
            {intelligence.citations.map((cite, i) => (
              <a 
                key={i} 
                href={cite.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-xs text-amber-700 hover:text-amber-900 transition-colors font-medium underline decoration-amber-200"
              >
                [{i+1}] {cite.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {intelligence.observations.length > 0 && (
        <div className="space-y-8 pt-10 border-t border-[#EFE9E4]">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Observations</h4>
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
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#999]">Thinking</span>
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