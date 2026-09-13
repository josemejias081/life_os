import { AppState } from '../types';
import { getFocusProject, getTodayMission, getWeekSessions, getFocusDayNumber } from '../store';

interface Props {
  state: AppState;
  onStartSession: (missionId: string | null) => void;
}

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
    if (daysSince >= 7) {
      nextReview = 'Hoy';
    } else {
      const daysUntil = 7 - daysSince;
      nextReview = daysUntil === 1 ? 'Mañana' : `En ${daysUntil} días`;
    }
  }

  return (
    <div className="min-h-screen pb-24 pt-8 px-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
            {dateStr}
          </p>
          <h1 className="text-2xl font-semibold text-gray-900">
            Buenos días, {state.user.name}.
          </h1>
        </div>

        {/* Focus Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Focus Actual
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-1">
                {focusProject?.name || 'Sin focus'}
              </h2>
            </div>
            {current > 0 && (
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">{current}</span>
                <span className="text-sm text-gray-400">/{total}</span>
                <p className="text-[10px] text-gray-400 uppercase">días</p>
              </div>
            )}
          </div>

          {current > 0 && (
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (current / total) * 100)}%` }}
              />
            </div>
          )}

          {/* Mission */}
          {mission && (
            <div className="border-t border-gray-50 pt-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Misión de hoy</p>
              <p className="text-lg text-gray-800 font-medium mb-1">{mission.title}</p>
              <p className="text-sm text-gray-400 mb-4">
                ~{mission.estimatedHours}h estimado
              </p>
              <button
                onClick={() => onStartSession(mission.id)}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all active:scale-[0.98]"
              >
                Iniciar sesión
              </button>
            </div>
          )}

          {!mission && focusProject && (
            <div className="border-t border-gray-50 pt-4">
              <button
                onClick={() => onStartSession(null)}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all active:scale-[0.98]"
              >
                Iniciar sesión libre
              </button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sesiones</p>
            <p className="text-2xl font-bold text-gray-900">{weekSessions.length}</p>
            <p className="text-xs text-gray-400">esta semana</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tiempo profundo</p>
            <p className="text-2xl font-bold text-gray-900">
              {hours}h {mins > 0 ? `${mins}m` : ''}
            </p>
            <p className="text-xs text-gray-400">esta semana</p>
          </div>
        </div>

        {/* Next Review */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Próxima revisión</p>
              <p className="text-lg font-semibold text-gray-900">{nextReview}</p>
            </div>
            <div className="text-2xl">🔄</div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-300 italic">
            "Construye la vida que imaginas, una sesión de trabajo a la vez."
          </p>
        </div>
      </div>
    </div>
  );
}
