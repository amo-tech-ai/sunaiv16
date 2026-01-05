
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
  owner: 'Client' | 'Sun AI' | 'Automated';
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
}

export interface DiagnosticQuestionSet {
  dynamicTitle: string;
  salesOptions: string[];
  salesAIFeatures: string[];
  manualWorkOptions: string[];
  manualWorkAIFeatures: string[];
  priorityOptions: string[];
  priorityAIFeatures: string[];
}
