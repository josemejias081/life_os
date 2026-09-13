import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, Calendar, Target, Sparkles } from 'lucide-react';
import { AppState } from '../types';
import { getFocusProject, getTodayMission, getWeekSessions, getFocusDayNumber } from '../store';

interface Props {
  state: AppState;
  onStartSession: (missionId: string | null) => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};

export default function HomePage({ state, onStartSession }: Props) {
  const focusProject = getFocusProject(state);
  const mission = getTodayMission(state);
  const weekSessions = getWeekSessions(state);
  const { current, total } = getFocusDayNumber(state);

  const totalMinutes = weekSessions.reduce((acc, s) => acc + s.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateStr = today.toLocaleDateString('es-ES', options);

  // Next review
  const lastReview = state.reviews.filter(r => r.type === 'weekly').sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  let nextReview = 'Domingo';
  if (lastReview) {
    const lastDate = new Date(lastReview.date);
    const daysSince = Math.floor((today.getTime() - lastDate.getTime()) / 86400000);
    if (daysSince >= 7) nextReview = 'Hoy';
    else {
      const daysUntil = 7 - daysSince;
      nextReview = daysUntil === 1 ? 'Mañana' : `En ${daysUntil} días`;
    }
  }

  return (
    <div className="min-h-screen pb-32 pt-10 px-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-zinc-500 text-[11px] font-medium uppercase tracking-[0.2em] mb-2">
            {dateStr}
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Buenos días, {state.user.name}
          </h1>
          <p className="text-zinc-500 text-sm mt-2">¿En qué debes invertir tu tiempo hoy?</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {/* Focus Card - Hero */}
          <motion.div variants={itemVariants} className="glass-card p-7 mb-5 relative overflow-hidden group">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">
                  Focus Actual
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
                {focusProject?.name || 'Sin focus'}
              </h2>

              {current > 0 && (
                <div className="flex items-center gap-3 mt-3 mb-5">
                  <div className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (current / total) * 100)}%` }}
                      transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-zinc-400 font-mono font-medium whitespace-nowrap">
                    Día {current} de {total}
                  </span>
                </div>
              )}

              {/* Mission */}
              {mission && (
                <div className="border-t border-zinc-800/50 pt-5 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={12} className="text-zinc-500" />
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.15em]">Misión de hoy</p>
                  </div>
                  <p className="text-lg text-zinc-200 font-medium mb-1">{mission.title}</p>
                  <p className="text-sm text-zinc-500 font-mono mb-5">
                    ~{mission.estimatedHours}h estimado
                  </p>
                  <button
                    onClick={() => onStartSession(mission.id)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    Iniciar sesión
                  </button>
                </div>
              )}

              {!mission && focusProject && (
                <div className="border-t border-zinc-800/50 pt-5 mt-2">
                  <button
                    onClick={() => onStartSession(null)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Zap size={16} />
                    Iniciar sesión libre
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats Grid - Bento style */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <motion.div variants={itemVariants} className="glass-card p-5 group hover:border-emerald-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles size={14} className="text-emerald-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white font-mono">{weekSessions.length}</p>
              <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-wider">Sesiones</p>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-5 group hover:border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Clock size={14} className="text-purple-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white font-mono">
                {hours}<span className="text-lg text-zinc-500">h</span>
                {mins > 0 && <span className="text-lg text-zinc-500">{mins}m</span>}
              </p>
              <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-wider">Tiempo profundo</p>
            </motion.div>
          </div>

          {/* Next Review */}
          <motion.div variants={itemVariants} className="glass-card p-5 flex items-center justify-between group hover:border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Calendar size={16} className="text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Próxima revisión</p>
                <p className="text-base font-semibold text-white">{nextReview}</p>
              </div>
            </div>
            <TrendingUp size={16} className="text-zinc-600 group-hover:text-amber-400 transition-colors" />
          </motion.div>

          {/* Quote */}
          <motion.div variants={itemVariants} className="mt-10 text-center">
            <p className="text-[11px] text-zinc-600 italic tracking-wide">
              "Construye la vida que imaginas, una sesión de trabajo a la vez."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
