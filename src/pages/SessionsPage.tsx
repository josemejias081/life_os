import { motion } from 'framer-motion';
import { Clock, BarChart3, Timer } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  state: AppState;
}

export default function SessionsPage({ state }: Props) {
  const completedSessions = state.sessions
    .filter(s => s.status === 'completed')
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const grouped: { [key: string]: typeof completedSessions } = {};
  completedSessions.forEach(session => {
    const dateKey = new Date(session.startTime).toLocaleDateString('es-ES', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(session);
  });

  const totalMinutes = completedSessions.reduce((acc, s) => acc + s.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const avgDuration = completedSessions.length > 0 ? Math.round(totalMinutes / completedSessions.length) : 0;

  return (
    <div className="min-h-screen pb-32 pt-8 sm:pt-10 px-5 sm:px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Sesiones</h1>
          <p className="text-zinc-500 text-sm mt-2">¿En qué has estado trabajando?</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="glass-card p-4 text-center">
            <BarChart3 size={16} className="text-indigo-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-mono">{completedSessions.length}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Total</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Clock size={16} className="text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-mono">{totalHours}h</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Horas</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Timer size={16} className="text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-mono">{avgDuration}m</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Promedio</p>
          </div>
        </motion.div>

        {/* Sessions by date */}
        {Object.keys(grouped).length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-zinc-600" />
            </div>
            <p className="text-zinc-500 text-sm">Aún no hay sesiones registradas</p>
            <p className="text-zinc-600 text-xs mt-1">Inicia tu primera sesión desde el inicio</p>
          </motion.div>
        ) : (
          Object.entries(grouped).map(([date, sessions], i) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
              className="mb-6"
            >
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-3 capitalize">{date}</p>
              <div className="space-y-2">
                {sessions.map(session => {
                  const project = state.projects.find(p => p.id === session.projectId);
                  return (
                    <div key={session.id} className="glass-card p-4 group hover:border-indigo-500/20 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-zinc-200">
                            {project?.name || 'Proyecto'}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                            {new Date(session.startTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            {session.endTime && ` — ${new Date(session.endTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono font-medium text-zinc-300">{session.duration}m</span>
                          {session.energy && (
                            <span className="text-base">
                              {session.energy === 'excellent' ? '😀' :
                               session.energy === 'good' ? '🙂' :
                               session.energy === 'normal' ? '😐' : '😞'}
                            </span>
                          )}
                        </div>
                      </div>
                      {session.notes && (
                        <p className="text-xs text-zinc-500 mt-2 pt-2 border-t border-zinc-800/50">{session.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
