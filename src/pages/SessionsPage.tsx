import { AppState } from '../types';

interface Props {
  state: AppState;
}

export default function SessionsPage({ state }: Props) {
  const completedSessions = state.sessions
    .filter(s => s.status === 'completed')
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  // Group by date
  const grouped: { [key: string]: typeof completedSessions } = {};
  completedSessions.forEach(session => {
    const dateKey = new Date(session.startTime).toLocaleDateString('es-ES', { 
      weekday: 'long', day: 'numeric', month: 'long' 
    });
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(session);
  });

  // Stats
  const totalMinutes = completedSessions.reduce((acc, s) => acc + s.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const avgDuration = completedSessions.length > 0 ? Math.round(totalMinutes / completedSessions.length) : 0;

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Sesiones</h1>
          <p className="text-gray-400 text-sm mt-1">¿En qué has estado trabajando?</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{completedSessions.length}</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{totalHours}h</p>
            <p className="text-xs text-gray-400">Horas</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{avgDuration}m</p>
            <p className="text-xs text-gray-400">Promedio</p>
          </div>
        </div>

        {/* Sessions by date */}
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">⏱️</p>
            <p className="text-gray-400">Aún no hay sesiones registradas</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, sessions]) => (
            <div key={date} className="mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3 capitalize">{date}</p>
              <div className="space-y-2">
                {sessions.map(session => {
                  const project = state.projects.find(p => p.id === session.projectId);
                  return (
                    <div key={session.id} className="bg-white rounded-xl border border-gray-100 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {project?.name || 'Proyecto'}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(session.startTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            {session.endTime && ` — ${new Date(session.endTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-600">{session.duration}m</span>
                          {session.energy && (
                            <span className="text-lg">
                              {session.energy === 'excellent' ? '😀' :
                               session.energy === 'good' ? '🙂' :
                               session.energy === 'normal' ? '😐' : '😞'}
                            </span>
                          )}
                        </div>
                      </div>
                      {session.notes && (
                        <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-50">{session.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
