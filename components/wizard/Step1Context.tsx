import React from 'react';
import { UserData, IntelligenceState } from '../../types';

interface StepProps {
  data: UserData;
  updateData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  intelligence: IntelligenceState;
}

export const Step1Context: React.FC<StepProps> = ({ data, updateData, nextStep }) => {
  const industries = ["Luxury Goods", "B2B SaaS", "Professional Services", "Real Estate", "E-commerce", "Hospitality", "FinTech", "Creative Agency"];
  const isComplete = data.fullName && data.companyName && data.industry && data.description;

  return (
    <div className="space-y-12 animate-fade-enter-active">
      <header>
        <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">Tell us about your business</h1>
        <p className="text-lg text-[#666] font-light font-body-serif">We use this to understand your business and design a practical AI plan.</p>
      </header>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg"
              value={data.fullName}
              onChange={(e) => updateData({ fullName: e.target.value })}
              placeholder="Full Name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Company Name</label>
            <input 
              type="text" 
              className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg"
              value={data.companyName}
              onChange={(e) => updateData({ companyName: e.target.value })}
              placeholder="Company Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Website URL (Optional)</label>
          <input 
            type="text" 
            className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg"
            value={data.website}
            onChange={(e) => updateData({ website: e.target.value })}
            placeholder="https://"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Industry Sector</label>
          <select 
            className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors appearance-none text-lg"
            value={data.industry}
            onChange={(e) => updateData({ industry: e.target.value })}
          >
            <option value="">Select Sector</option>
            {industries.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Business Description</label>
          <textarea 
            rows={5}
            className="w-full bg-transparent border border-[#D1C7BD] p-6 outline-none focus:border-[#1A1A1A] transition-colors resize-none text-lg font-light leading-relaxed"
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="What do you sell, who is your primary customer, and what is slowing growth today?"
          />
        </div>
      </div>

      <button 
        disabled={!isComplete}
        onClick={nextStep}
        className={`w-full py-6 text-sm uppercase tracking-[0.3em] font-bold transition-all ${isComplete ? 'bg-[#1A1A1A] text-white hover:bg-[#333]' : 'bg-[#EEE] text-[#AAA] cursor-not-allowed'}`}
      >
        Continue to Diagnostics →
      </button>
    </div>
  );
};
