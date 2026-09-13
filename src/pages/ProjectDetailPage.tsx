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

  // Recent sessions
  const recentSessions = projectSessions
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <div className="max-w-lg mx-auto">
        {/* Back */}
        <button onClick={onBack} className="text-gray-400 text-sm mb-4 hover:text-gray-600 transition-colors">
          ← Proyectos
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            {isFocus && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-full uppercase">
                Focus
              </span>
            )}
          </div>
          <p className="text-gray-500">{project.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{projectSessions.length}</p>
            <p className="text-xs text-gray-400">Sesiones</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{hours}h{mins > 0 ? ` ${mins}m` : ''}</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 capitalize">{project.status}</p>
            <p className="text-xs text-gray-400">Estado</p>
          </div>
        </div>

        {/* Missions */}
        {projectMissions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Misiones</h3>
            <div className="space-y-2">
              {projectMissions.map(mission => (
                <div key={mission.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{mission.title}</p>
                      <p className="text-sm text-gray-400 mt-0.5">{mission.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      mission.status === 'completed' ? 'bg-green-50 text-green-600' :
                      mission.status === 'in-progress' ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {mission.status === 'completed' ? '✓' : `~${mission.estimatedHours}h`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones */}
        {projectMilestones.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Hitos</h3>
            <div className="space-y-2">
              {projectMilestones.map(milestone => (
                <div key={milestone.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    milestone.achieved ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}>
                    {milestone.achieved && <span className="text-green-500 text-xs">✓</span>}
                  </div>
                  <span className={`font-medium ${milestone.achieved ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {milestone.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <div>
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Sesiones recientes</h3>
            <div className="space-y-2">
              {recentSessions.map(session => (
                <div key={session.id} className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(session.startTime).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </p>
                      <p className="text-xs text-gray-400">{session.duration} min</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.energy && (
                        <span className="text-lg">
                          {session.energy === 'excellent' ? '😀' :
                           session.energy === 'good' ? '🙂' :
                           session.energy === 'normal' ? '😐' : '😞'}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        session.result === 'completed' ? 'bg-green-50 text-green-600' :
                        session.result === 'partial' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {session.result === 'completed' ? 'Sí' :
                         session.result === 'partial' ? 'Parcial' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
