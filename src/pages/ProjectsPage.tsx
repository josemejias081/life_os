import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  state: AppState;
  onOpenProject: (projectId: string) => void;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};

export default function ProjectsPage({ state, onOpenProject }: Props) {
  const activeProjects = state.projects.filter(p => p.status === 'active');
  const otherProjects = state.projects.filter(p => p.status !== 'active');

  return (
    <div className="min-h-screen pb-32 pt-8 sm:pt-10 px-5 sm:px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Proyectos</h1>
          <p className="text-zinc-500 text-sm mt-2">¿Cómo va cada proyecto?</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {/* Active Projects */}
          {activeProjects.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-4">Activos</p>
              <div className="space-y-3">
                {activeProjects.map((project, i) => {
                  const isFocus = state.focus?.projectId === project.id;
                  return (
                    <motion.button
                      key={project.id}
                      variants={itemVariants}
                      onClick={() => onOpenProject(project.id)}
                      className="w-full glass-card p-6 text-left group relative overflow-hidden"
                    >
                      {/* Focus indicator */}
                      {isFocus && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                      )}

                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                              {project.name}
                            </h3>
                            {isFocus && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[9px] font-bold rounded-full uppercase tracking-wider border border-indigo-500/20">
                                <Zap size={8} />
                                Focus
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-500 line-clamp-1">{project.description}</p>
                        </div>
                        <ArrowRight size={16} className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all mt-1" />
                      </div>

                      <div className="flex items-center gap-5 mt-4 pt-4 border-t border-zinc-800/50">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          <span className="text-xs text-zinc-400 font-mono">{project.totalSessions}</span>
                          <span className="text-xs text-zinc-600">sesiones</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={10} className="text-zinc-600" />
                          <span className="text-xs text-zinc-400 font-mono">{Math.round(project.totalHours)}h</span>
                        </div>
                        {project.lastSessionDate && (
                          <span className="text-xs text-zinc-600 ml-auto">
                            {formatRelativeDate(project.lastSessionDate)}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold mb-4">Otros</p>
              <div className="space-y-3">
                {otherProjects.map(project => (
                  <motion.button
                    key={project.id}
                    variants={itemVariants}
                    onClick={() => onOpenProject(project.id)}
                    className="w-full glass-card p-5 text-left group opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-medium text-zinc-300 group-hover:text-white transition-colors">{project.name}</h3>
                        <p className="text-xs text-zinc-600 mt-0.5">{project.description}</p>
                      </div>
                      <ArrowRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors mt-1" />
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-800/30">
                      <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">{project.status}</span>
                      <span className="text-xs text-zinc-600 font-mono">{project.totalSessions} sesiones</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}
