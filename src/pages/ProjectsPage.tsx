import { AppState } from '../types';

interface Props {
  state: AppState;
  onOpenProject: (projectId: string) => void;
}

export default function ProjectsPage({ state, onOpenProject }: Props) {
  const activeProjects = state.projects.filter(p => p.status === 'active');
  const otherProjects = state.projects.filter(p => p.status !== 'active');

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Proyectos</h1>
          <p className="text-gray-400 text-sm mt-1">¿Cómo va cada proyecto?</p>
        </div>

        {/* Active Projects */}
        {activeProjects.length > 0 && (
          <div className="mb-8">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Activos</p>
            <div className="space-y-3">
              {activeProjects.map(project => {
                const isFocus = state.focus?.projectId === project.id;
                return (
                  <button
                    key={project.id}
                    onClick={() => onOpenProject(project.id)}
                    className="w-full bg-white rounded-xl border border-gray-100 p-5 text-left hover:shadow-sm transition-all active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                          {isFocus && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-full uppercase">
                              Focus
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                      </div>
                      <span className="text-gray-300">→</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400">
                        <span className="font-semibold text-gray-600">{project.totalSessions}</span> sesiones
                      </span>
                      <span className="text-xs text-gray-400">
                        <span className="font-semibold text-gray-600">{Math.round(project.totalHours)}h</span>
                      </span>
                      {project.lastSessionDate && (
                        <span className="text-xs text-gray-400">
                          Última: {formatRelativeDate(project.lastSessionDate)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Otros</p>
            <div className="space-y-3">
              {otherProjects.map(project => (
                <button
                  key={project.id}
                  onClick={() => onOpenProject(project.id)}
                  className="w-full bg-white rounded-xl border border-gray-100 p-5 text-left hover:shadow-sm transition-all active:scale-[0.99] opacity-70"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">{project.name}</h3>
                      <p className="text-sm text-gray-400">{project.description}</p>
                    </div>
                    <span className="text-gray-300">→</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400 capitalize">{project.status}</span>
                    <span className="text-xs text-gray-400">
                      {project.totalSessions} sesiones
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
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
  if (diffDays < 7) return `Hace ${diffDays} días`;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}
