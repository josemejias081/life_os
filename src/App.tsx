import { useState, useEffect, useCallback } from 'react';
import { AppState, Session } from './types';
import {
  loadState, saveState, resetDawnFlag, markDawnSeen,
  startSession, endSession, getActiveSession, getFocusProject,
  getTodayMission, getWeekSessions, getFocusDayNumber
} from './store';

// Pages
import DawnPage from './pages/DawnPage';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import SessionsPage from './pages/SessionsPage';
import ReviewsPage from './pages/ReviewsPage';
import SettingsPage from './pages/SettingsPage';
import SessionActivePage from './pages/SessionActivePage';
import SessionEndPage from './pages/SessionEndPage';
import ReviewFormPage from './pages/ReviewFormPage';

type Page = 'dawn' | 'home' | 'projects' | 'project-detail' | 'sessions' | 'reviews' | 'settings' | 'session-active' | 'session-end' | 'review-form';

function App() {
  const [state, setState] = useState<AppState>(loadState);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [endingSession, setEndingSession] = useState<Session | null>(null);

  useEffect(() => {
    const newState = resetDawnFlag(state);
    setState(newState);
    if (!newState.hasSeenDawn && localStorage.getItem('lifeos-dawn-seen') !== 'true') {
      setCurrentPage('dawn');
    }
    const session = getActiveSession(newState);
    if (session) {
      setActiveSession(session);
      setCurrentPage('session-active');
    }
  }, []);

  const handleDawnComplete = useCallback(() => {
    markDawnSeen();
    setState(prev => ({ ...prev, hasSeenDawn: true }));
    setCurrentPage('home');
  }, []);

  const handleStartSession = useCallback((missionId: string | null) => {
    const result = startSession(state, missionId);
    setState(result.state);
    setActiveSession(result.session);
    setCurrentPage('session-active');
  }, [state]);

  const handleEndSession = useCallback((sessionId: string, result: Session['result'], energy: Session['energy'], notes: string) => {
    const newState = endSession(state, sessionId, result, energy, notes);
    setState(newState);
    setActiveSession(null);
    setEndingSession(null);
    setCurrentPage('home');
  }, [state]);

  const handleFinishSession = useCallback(() => {
    setEndingSession(activeSession);
    setCurrentPage('session-end');
  }, [activeSession]);

  const handleOpenProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('project-detail');
  }, []);

  const handleStartReview = useCallback(() => {
    setCurrentPage('review-form');
  }, []);

  const handleSaveReview = useCallback((proud: string, blocked: string, change: string) => {
    const review = {
      id: `review-${Date.now()}`,
      type: 'weekly' as const,
      date: new Date().toISOString(),
      proud,
      blocked,
      change,
      completed: true
    };
    const newState = { ...state, reviews: [...state.reviews, review] };
    saveState(newState);
    setState(newState);
    setCurrentPage('reviews');
  }, [state]);

  const STORAGE_KEY = 'lifeos-data';

  const handleResetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('lifeos-dawn-seen');
    localStorage.removeItem('lifeos-dawn-date');
    const newState = loadState();
    setState(newState);
    setCurrentPage('dawn');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dawn':
        return <DawnPage state={state} onComplete={handleDawnComplete} />;
      case 'home':
        return <HomePage state={state} onStartSession={handleStartSession} />;
      case 'projects':
        return <ProjectsPage state={state} onOpenProject={handleOpenProject} />;
      case 'project-detail':
        return <ProjectDetailPage state={state} projectId={selectedProjectId!} onBack={() => setCurrentPage('projects')} />;
      case 'sessions':
        return <SessionsPage state={state} />;
      case 'reviews':
        return <ReviewsPage state={state} onStartReview={handleStartReview} />;
      case 'settings':
        return <SettingsPage state={state} onReset={handleResetData} />;
      case 'session-active':
        return <SessionActivePage state={state} session={activeSession!} onFinish={handleFinishSession} />;
      case 'session-end':
        return <SessionEndPage session={endingSession!} state={state} onEnd={handleEndSession} />;
      case 'review-form':
        return <ReviewFormPage onSave={handleSaveReview} onCancel={() => setCurrentPage('reviews')} />;
      default:
        return <HomePage state={state} onStartSession={handleStartSession} />;
    }
  };

  const showNav = currentPage !== 'dawn' && currentPage !== 'session-active' && currentPage !== 'session-end' && currentPage !== 'review-form';

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <main className="flex-1 page-transition">
        {renderPage()}
      </main>
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-6 py-3 z-50">
          <div className="max-w-lg mx-auto flex justify-between items-center">
            <NavButton icon="☀️" label="Inicio" active={currentPage === 'home'} onClick={() => setCurrentPage('home')} />
            <NavButton icon="📁" label="Proyectos" active={currentPage === 'projects' || currentPage === 'project-detail'} onClick={() => setCurrentPage('projects')} />
            <NavButton icon="⏱️" label="Sesiones" active={currentPage === 'sessions'} onClick={() => setCurrentPage('sessions')} />
            <NavButton icon="🔄" label="Revisiones" active={currentPage === 'reviews'} onClick={() => setCurrentPage('reviews')} />
            <NavButton icon="⚙️" label="Ajustes" active={currentPage === 'settings'} onClick={() => setCurrentPage('settings')} />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all ${
        active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

export default App;
