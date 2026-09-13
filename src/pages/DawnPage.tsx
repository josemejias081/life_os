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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF] px-6">
      <div className="max-w-md w-full text-center page-transition">
        {/* Greeting */}
        <div className="mb-12">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">
            {dateStr}
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Buenos días, {state.user.name}.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Hoy no necesitas pensar en diez proyectos.<br />
            <span className="text-gray-700 font-medium">Solo en uno.</span>
          </p>
        </div>

        {/* Focus Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="mb-6">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Focus
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {focusProject?.name || 'Sin focus'}
          </h2>
          
          {current > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (current / total) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 font-medium">
                Día {current} de {total}
              </span>
            </div>
          )}

          {mission && (
            <div className="border-t border-gray-50 pt-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Tu misión</p>
              <p className="text-lg text-gray-700 font-medium">{mission.title}</p>
              <p className="text-sm text-gray-400 mt-1">
                ~{mission.estimatedHours}h estimado
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={onComplete}
          className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-900/10"
        >
          Empezar
        </button>

        <p className="mt-8 text-xs text-gray-300 italic">
          "No administres tu tiempo. Dirige tu vida."
        </p>
      </div>
    </div>
  );
}
