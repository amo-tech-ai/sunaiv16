export interface UserData {
  fullName: string;
  companyName: string;
  website: string;
  industry: string;
  description: string;
  blocker: string;
  manualWork: string;
  speed: string;
  priority: string;
  selectedSystems: string[];
  readinessScore?: number;
  readinessFeedback?: string;
  roadmap?: RoadmapPhase[];
  tasks?: DashboardTask[];
  svgArchitecture?: string;
  confidence?: {
    level: 'High' | 'Medium' | 'Low';
    reason: string;
  };
  readinessAreas?: {
    data: number;
    infrastructure: number;
    culture: number;
  };
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  outcomes: string[];
}

export interface DashboardTask {
  id: string;
  title: string;
  owner: 'client' | 'ai';
  effort: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  impact: string;
  phaseIdx: number;
}

export type DashboardTab = 'overview' | 'roadmap' | 'tasks' | 'systems' | 'settings';

export interface IntelligenceState {
  status: 'idle' | 'loading' | 'analyzing' | 'complete';
  observations: string[];
  notes: string;
  detectedModel?: string;
  citations?: Array<{ title: string; uri: string }>;
}

export interface SystemRecommendation {
  id: string;
  name: string;
  description: string;
  whyItMatters: string;
  recommended: boolean;
  problem: string;
  ai_system: string;
  business_impact: string;
}

export interface DiagnosticQuestionSet {
  dynamicTitle: string;
  salesQuestion: string;
  salesOptions: string[];
  salesAIFeatures: string[];
  salesWhy: string;
  contentQuestion: string;
  contentOptions: string[];
  contentAIFeatures: string[];
  contentWhy: string;
  speedOptions: string[];
  speedAIFeatures: string[];
  speedWhy: string;
  priorityQuestion: string;
  priorityOptions: string[];
  priorityAIFeatures: string[];
  priorityWhy: string;
}