import React from 'react';
import { IntelligenceState } from '../../types';

interface Props {
  intelligence: IntelligenceState;
}

export const IntelligenceNarrative: React.FC<Props> = ({ intelligence }) => {
  return (
    <div className="space-y-16">
      <div className="min-h-[160px] relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
          <span className="text-xs uppercase tracking-widest text-[#777] font-semibold">Sun Intelligence</span>
          {intelligence.detectedModel && (
            <span className="ml-auto text-[9px] uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-2 py-0.5 border border-amber-200">
              {intelligence.detectedModel}
            </span>
          )}
        </div>
        <div className="text-xl leading-[1.65] text-[#1A1A1A] font-body-serif font-light whitespace-pre-wrap transition-all duration-500">
          {intelligence.notes}
          {intelligence.status === 'analyzing' && (
            <span className="inline-block w-[3px] h-6 ml-3 bg-amber-400 animate-pulse align-middle"></span>
          )}
        </div>
      </div>

      {(intelligence.observations.length > 0 || intelligence.citations?.length > 0) && (
        <div className="space-y-12 pt-12 border-t border-[#EFE9E4] animate-fade-enter-active">
          {intelligence.observations.length > 0 && (
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Market Observations</h4>
              <ul className="space-y-4">
                {intelligence.observations.map((obs, i) => (
                  <li key={i} className="flex gap-4 items-start text-sm text-[#444] font-body-serif italic">
                    <span className="text-amber-500 mt-1">●</span>
                    {obs}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {intelligence.citations && intelligence.citations.length > 0 && (
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#AAA]">Context Verification</h4>
              <div className="flex flex-wrap gap-2">
                {intelligence.citations.map((cite, i) => (
                  <a 
                    key={i} 
                    href={cite.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-widest font-bold text-amber-700 bg-amber-50 px-3 py-1.5 border border-amber-100 hover:bg-amber-100 transition-colors"
                  >
                    {cite.title} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
