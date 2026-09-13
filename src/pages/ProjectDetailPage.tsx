import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Clock, Target, Flag, Activity } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  state: AppState;
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetailPage({ state, projectId, onBack }: Props) {
  const project = state.projects.find(p => p.id === projectId);
  if (!project) return null;

  const isFocus = state.focus?.projectId === project.id;
  const projectSessions = state.sessions.filter(s => s.projectId === projectId && s.status === 'completed');
  const projectMissions = state.missions.filter(m => m.projectId === projectId);
  const projectMilestones = state.milestones.filter(m => m.projectId === projectId);

  const totalMinutes = projectSessions.reduce((acc, s) => acc + s.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const recentSessions = projectSessions
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen pb-32 pt-10 px-6">
      <div className="max-w-lg mx-auto">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 text-sm mb-6 hover:text-indigo-400 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Proyectos
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">{project.name}</h1>
            {isFocus && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-bold rounded-full uppercase tracking-wider border border-indigo-500/20">
                <Zap size={10} />
                Focus
              </span>
            )}
          </div>
          <p className="text-zinc-500">{project.description}</p>
        </motion.div>

        {/* Stats - Bento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="glass-card p-4 text-center">
            <Activity size={16} className="text-indigo-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-mono">{projectSessions.length}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Sesiones</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Clock size={16} className="text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white font-mono">{hours}h<span className="text-sm text-zinc-500">{mins > 0 ? ` ${mins}m` : ''}</span></p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Total</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Flag size={16} className="text-emerald-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-white capitalize">{project.status}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Estado</p>
          </div>
        </motion.div>

        {/* Missions */}
        {projectMissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-4">Misiones</p>
            <div className="space-y-2">
              {projectMissions.map(mission => (
                <div key={mission.id} className="glass-card p-4 group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Target size={12} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200 text-sm">{mission.title}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{mission.description}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium shrink-0 ${
                      mission.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      mission.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {mission.status === 'completed' ? '✓' : `~${mission.estimatedHours}h`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Milestones */}
        {projectMilestones.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-4">Hitos</p>
            <div className="space-y-2">
              {projectMilestones.map(milestone => (
                <div key={milestone.id} className="glass-card p-4 flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    milestone.achieved 
                      ? 'bg-emerald-500/10 border border-emerald-500/30' 
                      : 'bg-zinc-800 border border-zinc-700'
                  }`}>
                    {milestone.achieved ? (
                      <span className="text-emerald-400 text-xs">✓</span>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    )}
                  </div>
                  <span className={`font-medium text-sm ${milestone.achieved ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                    {milestone.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-4">Sesiones recientes</p>
            <div className="space-y-2">
              {recentSessions.map(session => (
                <div key={session.id} className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        {new Date(session.startTime).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">{session.duration} min</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.energy && (
                        <span className="text-base">
                          {session.energy === 'excellent' ? '😀' :
                           session.energy === 'good' ? '🙂' :
                           session.energy === 'normal' ? '😐' : '😞'}
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        session.result === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                        session.result === 'partial' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {session.result === 'completed' ? 'Sí' :
                         session.result === 'partial' ? 'Parcial' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
