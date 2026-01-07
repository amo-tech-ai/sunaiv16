
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-8 animate-fade-enter-active">
      <div className="w-full max-w-md space-y-12">
        <header className="text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#AAA] font-bold">Strategic Command</span>
          <h1 className="text-5xl font-serif text-[#1A1A1A]">Executive Portal</h1>
          <div className="h-px w-12 bg-amber-400 mx-auto"></div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 border border-[#EFE9E4] shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg font-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="executive@company.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#999] font-bold">Security Key</label>
            <input 
              type="password" 
              required
              className="w-full bg-transparent border-b border-[#D1C7BD] py-3 outline-none focus:border-[#1A1A1A] transition-colors text-lg font-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#333] transition-all shadow-xl shadow-amber-900/5"
          >
            Access Command Center →
          </button>
        </form>

        <footer className="text-center">
          <p className="text-xs text-[#AAA] font-body-serif italic leading-relaxed">
            “Privacy is the ultimate luxury in a data-driven world.”
          </p>
          <div className="mt-8">
             <button className="text-[10px] uppercase tracking-widest text-amber-600 font-bold border-b border-amber-200 pb-1">Initialize New Audit</button>
          </div>
        </footer>
      </div>
    </div>
  );
};
