import { AppState, Session, Focus, Project, Mission } from '../types';

const STORAGE_KEY = 'lifeos-data';

// Generate demo data
function generateDemoData(): AppState {
  const today = new Date();
  const focusStart = new Date(today);
  focusStart.setDate(focusStart.getDate() - 12);
  const focusEnd = new Date(today);
  focusEnd.setDate(focusEnd.getDate() + 78);

  return {
    user: {
      name: 'José',
      identity: 'Constructor de sistemas y creador digital',
      purpose: 'Construir herramientas que liberen el potencial humano'
    },
    vision: {
      statement: 'Vivir con propósito, construir con enfoque, descansar sin culpa.',
      values: ['Claridad', 'Enfoque', 'Progreso', 'Equilibrio']
    },
    areas: [
      { id: 'area-1', name: 'Negocio', color: '#3B82F6' },
      { id: 'area-2', name: 'Salud', color: '#10B981' },
      { id: 'area-3', name: 'Creatividad', color: '#8B5CF6' },
      { id: 'area-4', name: 'Relaciones', color: '#F59E0B' }
    ],
    mountains: [
      { id: 'mt-1', name: 'Invertia', areaId: 'area-1' },
      { id: 'mt-2', name: 'Supervivencia', areaId: 'area-2' },
      { id: 'mt-3', name: 'Novela', areaId: 'area-3' }
    ],
    goals: [
      { id: 'g-1', title: 'Primer cliente pagando', mountainId: 'mt-1', completed: false },
      { id: 'g-2', title: 'Bajar 8 kg', mountainId: 'mt-2', completed: false },
      { id: 'g-3', title: 'Terminar primer borrador', mountainId: 'mt-3', completed: false }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'Invertia ERP',
        areaId: 'area-1',
        mountainId: 'mt-1',
        description: 'Sistema ERP modular para pequeñas empresas',
        status: 'active',
        createdAt: '2024-06-01',
        totalSessions: 48,
        totalHours: 102,
        lastSessionDate: new Date(today.getTime() - 86400000).toISOString()
      },
      {
        id: 'proj-2',
        name: 'Novela — El Constructor',
        areaId: 'area-3',
        mountainId: 'mt-3',
        description: 'Novela sobre un emprendedor que descubre el sentido de la vida',
        status: 'active',
        createdAt: '2024-03-15',
        totalSessions: 23,
        totalHours: 46,
        lastSessionDate: new Date(today.getTime() - 3 * 86400000).toISOString()
      },
      {
        id: 'proj-3',
        name: 'Canal YouTube',
        areaId: 'area-3',
        mountainId: 'mt-3',
        description: 'Canal sobre productividad y sistemas personales',
        status: 'planned',
        createdAt: '2024-07-01',
        totalSessions: 0,
        totalHours: 0,
        lastSessionDate: null
      }
    ],
    focus: {
      id: 'focus-1',
      projectId: 'proj-1',
      startDate: focusStart.toISOString(),
      endDate: focusEnd.toISOString(),
      reason: 'Necesito tener la conciliación bancaria lista antes de presentar al primer cliente.',
      status: 'active'
    },
    missions: [
      {
        id: 'mis-1',
        projectId: 'proj-1',
        title: 'Implementar conciliación bancaria',
        description: 'Conectar con API del banco y crear módulo de conciliación automática',
        estimatedHours: 2,
        status: 'pending',
        createdAt: today.toISOString()
      },
      {
        id: 'mis-2',
        projectId: 'proj-1',
        title: 'Diseñar interfaz de reportes',
        description: 'Crear wireframes y prototipo del módulo de reportes financieros',
        estimatedHours: 3,
        status: 'pending',
        createdAt: today.toISOString()
      },
      {
        id: 'mis-3',
        projectId: 'proj-2',
        title: 'Terminar capítulo 27',
        description: 'Completar la escena del encuentro en la montaña',
        estimatedHours: 1.5,
        status: 'pending',
        createdAt: today.toISOString()
      }
    ],
    sessions: generateDemoSessions(today),
    milestones: [
      { id: 'ml-1', projectId: 'proj-1', title: 'ERP v0.5', achieved: false, achievedDate: null },
      { id: 'ml-2', projectId: 'proj-1', title: 'Primer cliente', achieved: false, achievedDate: null },
      { id: 'ml-3', projectId: 'proj-2', title: 'Novela terminada', achieved: false, achievedDate: null }
    ],
    reviews: [],
    metrics: [],
    hasSeenDawn: false
  };
}

function generateDemoSessions(today: Date): Session[] {
  const sessions: Session[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    if (i === 0 || i === 3 || i === 7) continue; // Skip some days
    
    const startHour = 8 + Math.floor(Math.random() * 4);
    const duration = 45 + Math.floor(Math.random() * 90);
    const start = new Date(date);
    start.setHours(startHour, 0, 0, 0);
    const end = new Date(start.getTime() + duration * 60000);

    sessions.push({
      id: `session-demo-${i}`,
      projectId: 'proj-1',
      missionId: 'mis-1',
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      duration,
      status: 'completed',
      result: Math.random() > 0.3 ? 'completed' : 'partial',
      energy: ['excellent', 'good', 'normal', 'low'][Math.floor(Math.random() * 4)] as Session['energy'],
      notes: ''
    });
  }
  return sessions;
}

// State management
export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
  const demo = generateDemoData();
  saveState(demo);
  return demo;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

export function resetDawnFlag(state: AppState): AppState {
  // Check if it's a new day
  const lastSeen = localStorage.getItem('lifeos-dawn-date');
  const today = new Date().toDateString();
  if (lastSeen !== today) {
    localStorage.setItem('lifeos-dawn-date', today);
    return { ...state, hasSeenDawn: false };
  }
  return { ...state, hasSeenDawn: localStorage.getItem('lifeos-dawn-seen') !== 'true' };
}

export function markDawnSeen(): void {
  localStorage.setItem('lifeos-dawn-seen', 'true');
  localStorage.setItem('lifeos-dawn-date', new Date().toDateString());
}

export function startSession(state: AppState, missionId: string | null): { state: AppState; session: Session } {
  const session: Session = {
    id: `session-${Date.now()}`,
    projectId: state.focus?.projectId || '',
    missionId,
    startTime: new Date().toISOString(),
    endTime: null,
    duration: 0,
    status: 'active',
    result: null,
    energy: null,
    notes: ''
  };
  const newState = { ...state, sessions: [...state.sessions, session] };
  saveState(newState);
  return { state: newState, session };
}

export function endSession(state: AppState, sessionId: string, result: Session['result'], energy: Session['energy'], notes: string): AppState {
  const sessions = state.sessions.map(s => {
    if (s.id === sessionId) {
      const endTime = new Date();
      const startTime = new Date(s.startTime);
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
      return {
        ...s,
        endTime: endTime.toISOString(),
        duration,
        status: 'completed' as const,
        result,
        energy,
        notes
      };
    }
    return s;
  });

  // Update project stats
  const session = sessions.find(s => s.id === sessionId);
  let projects = state.projects;
  if (session) {
    projects = projects.map(p => {
      if (p.id === session.projectId) {
        return {
          ...p,
          totalSessions: p.totalSessions + 1,
          totalHours: p.totalHours + (session.duration / 60),
          lastSessionDate: session.endTime
        };
      }
      return p;
    });
  }

  const newState = { ...state, sessions, projects };
  saveState(newState);
  return newState;
}

export function getActiveSession(state: AppState): Session | null {
  return state.sessions.find(s => s.status === 'active') || null;
}

export function getFocusProject(state: AppState): Project | null {
  if (!state.focus) return null;
  return state.projects.find(p => p.id === state.focus!.projectId) || null;
}

export function getTodayMission(state: AppState): Mission | null {
  if (!state.focus) return null;
  return state.missions.find(m => m.projectId === state.focus!.projectId && m.status === 'pending') || null;
}

export function getWeekSessions(state: AppState): Session[] {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);
  return state.sessions.filter(s => {
    const date = new Date(s.startTime);
    return date >= weekAgo && s.status === 'completed';
  });
}

export function getFocusDayNumber(state: AppState): { current: number; total: number } {
  if (!state.focus) return { current: 0, total: 0 };
  const start = new Date(state.focus.startDate);
  const end = new Date(state.focus.endDate);
  const now = new Date();
  const total = Math.ceil((end.getTime() - start.getTime()) / 86400000);
  const current = Math.ceil((now.getTime() - start.getTime()) / 86400000);
  return { current: Math.max(0, current), total: Math.max(0, total) };
}
