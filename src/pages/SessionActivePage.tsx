import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, StopCircle } from 'lucide-react';
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

  // Calculate progress ring
  const targetSeconds = (mission?.estimatedHours || 2) * 3600;
  const progress = Math.min(elapsed / targetSeconds, 1);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-2xl"
      />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Project */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-2">Proyecto</p>
          <h2 className="text-xl font-semibold text-white">{project?.name || 'Sesión libre'}</h2>
        </motion.div>

        {/* Mission */}
        {mission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-2">Objetivo</p>
            <p className="text-lg text-zinc-300">{mission.title}</p>
          </motion.div>
        )}

        {/* Timer Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-64 h-64 mx-auto mb-10"
        >
          {/* Background ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(63, 63, 70, 0.3)"
              strokeWidth="2"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={754}
              initial={{ strokeDashoffset: 754 }}
              animate={{ strokeDashoffset: 754 - (754 * progress) }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-light text-white tracking-wider font-mono">
              {formatTime(hours, minutes, seconds)}
            </span>
            {isPaused && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-amber-400 text-xs mt-3 uppercase tracking-wider font-medium"
              >
                Pausado
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isPaused
                ? 'bg-white text-zinc-900 hover:bg-zinc-100'
                : 'bg-zinc-800 text-white border border-zinc-700 hover:border-indigo-500/30'
            }`}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <button
            onClick={onFinish}
            className="h-14 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-[0.97]"
          >
            <StopCircle size={18} />
            Finalizar
          </button>
        </motion.div>

        {/* Bottom info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-[11px] text-zinc-600 italic"
        >
          Cada segundo cuenta. Estás construyendo la vida que imaginas.
        </motion.p>
      </div>
    </div>
  );
}
