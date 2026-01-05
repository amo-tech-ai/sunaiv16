
import { useState, useEffect } from 'react';
import { UserData } from '../types';

const STORAGE_KEY = 'sun_ai_wizard_state';

export function useWizard() {
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_data', JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEY + '_step', step.toString());
  }, [userData, step]);

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const resetWizard = () => {
    localStorage.removeItem(STORAGE_KEY + '_data');
    localStorage.removeItem(STORAGE_KEY + '_step');
    window.location.reload();
  };

  return {
    step,
    setStep,
    userData,
    updateUserData,
    nextStep,
    prevStep,
    resetWizard
  };
}
