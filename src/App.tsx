import { useState, useEffect, useCallback } from 'react';
import { AppState, Session } from './types';
import {
  loadState, saveState, resetDawnFlag, markDawnSeen,
  startSession, endSession, getActiveSession,
} from './store';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderOpen, Clock, RotateCcw, Settings } from 'lucide-react';

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

const STORAGE_KEY = 'lifeos-data';

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.3 } }
};

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

  const navItems = [
    { icon: Home, label: 'Inicio', page: 'home' as Page },
    { icon: FolderOpen, label: 'Proyectos', page: 'projects' as Page },
    { icon: Clock, label: 'Sesiones', page: 'sessions' as Page },
    { icon: RotateCcw, label: 'Revisiones', page: 'reviews' as Page },
    { icon: Settings, label: 'Ajustes', page: 'settings' as Page },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Ambient background */}
      <div className="ambient-bg" />
      <div className="noise-overlay" />

      {/* Page content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <AnimatePresence>
        {showNav && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="glass-card-static px-2 py-2 flex items-center gap-1 rounded-2xl">
              {navItems.map(({ icon: Icon, label, page }) => {
                const isActive = currentPage === page || (page === 'projects' && currentPage === 'project-detail');
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'text-indigo-400' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-indigo-500/10 rounded-xl border border-indigo-500/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} className="relative z-10" />
                    <span className="text-[9px] font-medium relative z-10 tracking-wide">{label}</span>
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
