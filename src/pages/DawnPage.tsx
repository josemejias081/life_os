import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { AppState } from '../types';
import { getFocusProject, getTodayMission, getFocusDayNumber } from '../store';

interface Props {
  state: AppState;
  onComplete: () => void;
}

export default function DawnPage({ state, onComplete }: Props) {
  const focusProject = getFocusProject(state);
  const mission = getTodayMission(state);
  const { current, total } = getFocusDayNumber(state);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateStr = today.toLocaleDateString('es-ES', options);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Extra glow for dawn */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-[0.2em]">
            {dateStr}
          </p>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Buenos días, {state.user.name}.
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Hoy no necesitas pensar en diez proyectos.
          </p>
          <p className="text-zinc-200 text-lg font-medium mt-1">
            Solo en uno.
          </p>
        </motion.div>

        {/* Focus Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="glass-card p-8 mb-8 glow-indigo"
        >
          <div className="flex items-center gap-2 mb-5 justify-center">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-[0.2em]">
              Focus
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            {focusProject?.name || 'Sin focus'}
          </h2>

          {current > 0 && (
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-1 flex-1 max-w-[180px] bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (current / total) * 100)}%` }}
                  transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full progress-glow"
                />
              </div>
              <span className="text-xs text-zinc-500 font-mono font-medium">
                {current}/{total}
              </span>
            </div>
          )}

          {mission && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="border-t border-zinc-800/50 pt-5"
            >
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-2">Tu misión</p>
              <p className="text-lg text-zinc-200 font-medium">{mission.title}</p>
              <p className="text-sm text-zinc-500 mt-1 font-mono">
                ~{mission.estimatedHours}h
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          onClick={onComplete}
          className="btn-primary w-full flex items-center justify-center gap-2 text-base"
        >
          <Zap size={18} />
          Empezar
          <ArrowRight size={16} className="ml-1" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 text-[11px] text-zinc-600 italic tracking-wide"
        >
          "No administres tu tiempo. Dirige tu vida."
        </motion.p>
      </div>
    </div>
  );
}
