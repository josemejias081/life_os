// LifeOS Domain Types

export interface User {
  name: string;
  identity: string;
  purpose: string;
}

export interface Vision {
  statement: string;
  values: string[];
}

export interface Area {
  id: string;
  name: string;
  color: string;
}

export interface Mountain {
  id: string;
  name: string;
  areaId: string;
}

export interface Goal {
  id: string;
  title: string;
  mountainId: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  areaId: string;
  mountainId: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'planned';
  createdAt: string;
  totalSessions: number;
  totalHours: number;
  lastSessionDate: string | null;
}

export interface Focus {
  id: string;
  projectId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'active' | 'completed' | 'expired';
}

export interface Mission {
  id: string;
  projectId: string;
  title: string;
  description: string;
  estimatedHours: number;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface Session {
  id: string;
  projectId: string;
  missionId: string | null;
  startTime: string;
  endTime: string | null;
  duration: number; // minutes
  status: 'active' | 'paused' | 'completed';
  result: 'completed' | 'partial' | 'not-completed' | null;
  energy: 'excellent' | 'good' | 'normal' | 'low' | null;
  notes: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  achieved: boolean;
  achievedDate: string | null;
}

export interface Review {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date: string;
  proud: string;
  blocked: string;
  change: string;
  completed: boolean;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: string;
}

// App State
export interface AppState {
  user: User;
  vision: Vision;
  areas: Area[];
  mountains: Mountain[];
  goals: Goal[];
  projects: Project[];
  focus: Focus | null;
  missions: Mission[];
  sessions: Session[];
  milestones: Milestone[];
  reviews: Review[];
  metrics: Metric[];
  hasSeenDawn: boolean;
}
