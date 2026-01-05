import { useState, useRef } from 'react';
import { IntelligenceState } from '../types';
import { streamConsultantResponse } from '../services/gemini/client';

export function useIntelligence() {
  const [intelligence, setIntelligence] = useState<IntelligenceState>({
    status: 'idle',
    observations: [],
    notes: 'Sun AI is initializing its strategic assessment protocols...',
    citations: [],
  });

  const activeStreamRef = useRef<number>(0);

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

  return {
    intelligence,
    setIntelligence,
    handleStreamingNotes
  };
}
