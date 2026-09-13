import { useState, useEffect } from 'react';
import { AppState, Session } from '../types';

interface Props {
  state: AppState;
  session: Session;
  onFinish: () => void;
}

export default function SessionActivePage({ state, session, onFinish }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const project = state.projects.find(p => p.id === session.projectId);
  const mission = session.missionId ? state.missions.find(m => m.id === session.missionId) : null;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        const start = new Date(session.startTime).getTime();
        const now = Date.now();
        setElapsed(Math.floor((now - start) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [session.startTime, isPaused]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  const formatTime = (h: number, m: number, s: number) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center page-transition">
        {/* Project */}
        <div className="mb-8">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Proyecto</p>
          <h2 className="text-xl font-semibold text-white">{project?.name || 'Sesión libre'}</h2>
        </div>

        {/* Mission */}
        {mission && (
          <div className="mb-10">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Objetivo</p>
            <p className="text-lg text-gray-300">{mission.title}</p>
          </div>
        )}

        {/* Timer */}
        <div className="mb-12">
          <div className={`text-6xl font-light text-white tracking-wider font-mono ${!isPaused ? 'pulse-slow' : ''}`}>
            {formatTime(hours, minutes, seconds)}
          </div>
          {isPaused && (
            <p className="text-yellow-400 text-sm mt-3 animate-pulse">Pausado</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-8 py-3 rounded-xl font-medium transition-all active:scale-[0.98] ${
              isPaused 
                ? 'bg-white text-gray-900 hover:bg-gray-100' 
                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {isPaused ? 'Continuar' : 'Pausar'}
          </button>
          <button
            onClick={onFinish}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            Finalizar
          </button>
        </div>

        {/* Bottom info */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-600 text-xs">
            Cada segundo cuenta. Estás construyendo la vida que imaginas.
          </p>
        </div>
      </div>
    </div>
  );
}
